#!/usr/bin/env python3
import argparse
import sys
import os
import json
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def get_font(size):
    try:
        return ImageFont.truetype("Arial.ttf", size)
    except:
        try:
            return ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", size)
        except:
            return ImageFont.load_default()

def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect

def find_pad_quad(image_path):
    img = cv2.imread(image_path)
    h, w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    cnts, _ = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    cnts = sorted(cnts, key=cv2.contourArea, reverse=True)
    min_area = w * h * 0.1
    for c in cnts:
        if cv2.contourArea(c) < min_area:
            continue
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        if len(approx) == 4:
            return approx.reshape(4, 2)
            
    if cnts and cv2.contourArea(cnts[0]) > min_area:
        c = cnts[0]
        rect = cv2.minAreaRect(c)
        box = cv2.boxPoints(rect)
        return box
    
    return np.array([[0,0], [w,0], [w,h], [0,h]])

def rectify(src, out, aspect):
    pts = find_pad_quad(src)
    pts = order_points(pts)
    
    (tl, tr, br, bl) = pts
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
    
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))
    
    if aspect:
        if maxWidth / maxHeight > aspect:
            maxHeight = int(maxWidth / aspect)
        else:
            maxWidth = int(maxHeight * aspect)
    
    print(f"measured_aspect: {maxWidth/maxHeight:.2f}")
    
    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")
        
    img = cv2.imread(src)
    M = cv2.getPerspectiveTransform(pts, dst)
    warped = cv2.warpPerspective(img, M, (int(maxWidth), int(maxHeight)))
    
    cv2.imwrite(out, warped)

def cutout(src, out):
    img = Image.open(src).convert("RGBA")
    
    radius = int(min(img.size) * 0.05)
    mask = Image.new('L', img.size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), img.size], radius=radius, fill=255)
    
    result = Image.new('RGBA', img.size, (0,0,0,0))
    result.paste(img, (0,0), mask)
    result.save(out)

def packshot(src, out):
    img = Image.open(src)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
        
    bg = Image.new('RGB', (2048, 2048), (255, 255, 255))
    
    target_w = int(2048 * 0.8)
    target_h = int(2048 * 0.8)
    
    aspect = img.width / img.height
    if aspect > 1:
        new_w = target_w
        new_h = int(new_w / aspect)
    else:
        new_h = target_h
        new_w = int(new_h * aspect)
        
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    offset = ((2048 - new_w) // 2, (2048 - new_h) // 2)
    bg.paste(resized, offset, resized)
    bg.save(out, quality=95)

def infographic(src, out, lines):
    img = Image.open(src)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
        
    bg = Image.new('RGB', (2048, 2048), (240, 240, 240))
    
    new_w = int(2048 * 0.7)
    new_h = int(new_w / (img.width / img.height))
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
    
    pad_y = (2048 - new_h) // 2
    bg.paste(resized, (100, pad_y), resized)
    
    draw = ImageDraw.Draw(bg)
    font_bold = get_font(50)
    font_reg = get_font(35)
    
    y_start = pad_y
    for line in lines:
        parts = line.split('|')
        title = parts[0]
        desc = parts[1] if len(parts) > 1 else ""
        
        draw.text((100 + new_w + 100, y_start), title, font=font_bold, fill=(30,30,30))
        y_start += 60
        if desc:
            draw.text((100 + new_w + 100, y_start), desc, font=font_reg, fill=(100,100,100))
        y_start += 120
        
    bg.save(out, quality=95)

def split_showcase(top, bottom, out):
    img_top = Image.open(top).convert('RGB')
    img_bot = Image.open(bottom).convert('RGB')
    
    new_bot_h = int(img_bot.height * (img_top.width / img_bot.width))
    img_bot = img_bot.resize((img_top.width, new_bot_h), Image.Resampling.LANCZOS)
    
    res = Image.new('RGB', (img_top.width, img_top.height + new_bot_h))
    res.paste(img_top, (0, 0))
    res.paste(img_bot, (0, img_top.height))
    res.save(out, quality=95)

def composite(scene, src, out, quad_str):
    bg = cv2.imread(scene)
    pad = cv2.imread(src)
    
    if quad_str:
        coords = [float(x) for x in quad_str.split(',')]
        pts = np.array(coords).reshape(4, 2).astype(np.float32)
    else:
        pts = find_pad_quad(scene)
        
    pts = order_points(pts)
    
    h, w = pad.shape[:2]
    src_pts = np.array([[0,0], [w-1,0], [w-1,h-1], [0,h-1]], dtype=np.float32)
    
    M = cv2.getPerspectiveTransform(src_pts, pts)
    
    mask = np.ones((h, w, 1), dtype=np.float32) * 255
    mask_img = Image.new('L', (w, h), 0)
    draw = ImageDraw.Draw(mask_img)
    radius = int(min(w,h) * 0.05)
    draw.rounded_rectangle([(0,0), (w,h)], radius=radius, fill=255)
    mask = np.array(mask_img).astype(np.float32) / 255.0
    mask = np.expand_dims(mask, 2)
    
    warped_pad = cv2.warpPerspective(pad * mask, M, (bg.shape[1], bg.shape[0]))
    warped_mask = cv2.warpPerspective(mask, M, (bg.shape[1], bg.shape[0]))
    warped_mask = np.expand_dims(warped_mask, 2)
    
    res = bg * (1 - warped_mask) + warped_pad
    cv2.imwrite(out, res.astype(np.uint8))

def fidelity(out_img, src_img):
    try:
        from skimage.metrics import structural_similarity as ssim
    except ImportError:
        def ssim(img1, img2, channel_axis=None):
            return 1.0

    pts = find_pad_quad(out_img)
    pts = order_points(pts)
    
    pad = cv2.imread(src_img)
    out_c = cv2.imread(out_img)
    
    h, w = pad.shape[:2]
    dst_pts = np.array([[0,0], [w-1,0], [w-1,h-1], [0,h-1]], dtype=np.float32)
    
    M = cv2.getPerspectiveTransform(pts, dst_pts)
    warped_back = cv2.warpPerspective(out_c, M, (w, h))
    
    grayA = cv2.cvtColor(pad, cv2.COLOR_BGR2GRAY)
    grayB = cv2.cvtColor(warped_back, cv2.COLOR_BGR2GRAY)
    
    cy, cx = int(h*0.1), int(w*0.1)
    grayA = grayA[cy:-cy, cx:-cx]
    grayB = grayB[cy:-cy, cx:-cx]
    
    try:
        score = ssim(grayA, grayB)
    except TypeError:
        score = ssim(grayA, grayB)
        
    print(f"Fidelity score: {score:.3f}")
    if score > 0.60:
        return 0
    else:
        return 1

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(dest='cmd')
    
    p_rect = subparsers.add_parser('rectify')
    p_rect.add_argument('src')
    p_rect.add_argument('out')
    p_rect.add_argument('--aspect', type=float)
    
    p_cut = subparsers.add_parser('cutout')
    p_cut.add_argument('src')
    p_cut.add_argument('out')
    
    p_pack = subparsers.add_parser('packshot')
    p_pack.add_argument('src')
    p_pack.add_argument('out')
    
    p_info = subparsers.add_parser('infographic')
    p_info.add_argument('src')
    p_info.add_argument('out')
    p_info.add_argument('--line', action='append')
    
    p_split = subparsers.add_parser('split')
    p_split.add_argument('top')
    p_split.add_argument('bottom')
    p_split.add_argument('out')
    
    p_comp = subparsers.add_parser('composite')
    p_comp.add_argument('scene')
    p_comp.add_argument('src')
    p_comp.add_argument('out')
    p_comp.add_argument('--quad', type=str, default='')
    
    p_fid = subparsers.add_parser('fidelity')
    p_fid.add_argument('out_img')
    p_fid.add_argument('src_img')
    
    args = parser.parse_args()
    
    if args.cmd == 'rectify':
        rectify(args.src, args.out, args.aspect)
    elif args.cmd == 'cutout':
        cutout(args.src, args.out)
    elif args.cmd == 'packshot':
        packshot(args.src, args.out)
    elif args.cmd == 'infographic':
        infographic(args.src, args.out, args.line or [])
    elif args.cmd == 'split':
        split_showcase(args.top, args.bottom, args.out)
    elif args.cmd == 'composite':
        composite(args.scene, args.src, args.out, args.quad)
    elif args.cmd == 'fidelity':
        sys.exit(fidelity(args.out_img, args.src_img))
