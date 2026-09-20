import os
import sys
import json
import time
import urllib.request
import urllib.parse
from PIL import Image, ImageFilter, ImageDraw, ImageFont

COMFY_URL = "http://127.0.0.1:8188"
REALESRGAN_EXE = r"C:\Users\james\Documents\Workspace\01_Projects\ecomm-website\ai-tools\realesrgan_exe\realesrgan-ncnn-vulkan.exe"

def upload_image(filepath):
    with open(filepath, "rb") as f:
        data = f.read()
    req = urllib.request.Request(f"{COMFY_URL}/upload/image", data=data, method="POST")
    boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW"
    body = (
        f"--{boundary}\r\n"
        f"Content-Disposition: form-data; name=\"image\"; filename=\"{os.path.basename(filepath)}\"\r\n"
        "Content-Type: image/png\r\n\r\n"
    ).encode("utf-8") + data + f"\r\n--{boundary}--\r\n".encode("utf-8")
    
    req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")
    req.data = body
    
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read())['name']

def queue_prompt(prompt_workflow):
    p = {"prompt": prompt_workflow}
    data = json.dumps(p).encode('utf-8')
    req =  urllib.request.Request(f"{COMFY_URL}/prompt", data=data)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read())
    except Exception as e:
        print(e.read().decode('utf-8'))
        raise e

def get_history(prompt_id):
    req =  urllib.request.Request(f"{COMFY_URL}/history/{prompt_id}")
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read())

def get_image(filename, subfolder, folder_type):
    data = {"filename": filename, "subfolder": subfolder, "type": folder_type}
    url_values = urllib.parse.urlencode(data)
    req =  urllib.request.Request(f"{COMFY_URL}/view?{url_values}")
    with urllib.request.urlopen(req) as response:
        return response.read()

def generate_background(prompt, negative, canvas_img, mask_img):
    canvas_img.save("temp_canvas.png")
    mask_img.save("temp_mask.png")
    
    canvas_name = upload_image("temp_canvas.png")
    mask_name = upload_image("temp_mask.png")
    
    workflow = {
      "3": {
        "class_type": "KSampler",
        "inputs": {
          "seed": int(time.time()),
          "steps": 20,
          "cfg": 8,
          "sampler_name": "euler_ancestral",
          "scheduler": "normal",
          "denoise": 1,
          "model": ["4", 0],
          "positive": ["6", 0],
          "negative": ["7", 0],
          "latent_image": ["8", 0]
        }
      },
      "4": {
        "class_type": "CheckpointLoaderSimple",
        "inputs": {
          "ckpt_name": "v1-5-pruned-emaonly.safetensors"
        }
      },
      "6": {
        "class_type": "CLIPTextEncode",
        "inputs": {
          "text": prompt,
          "clip": ["4", 1]
        }
      },
      "7": {
        "class_type": "CLIPTextEncode",
        "inputs": {
          "text": negative,
          "clip": ["4", 1]
        }
      },
      "8": {
        "class_type": "VAEEncodeForInpaint",
        "inputs": {
          "grow_mask_by": 6,
          "pixels": ["9", 0],
          "mask": ["10", 0],
          "vae": ["4", 2]
        }
      },
      "9": {
        "class_type": "LoadImage",
        "inputs": {
          "image": canvas_name
        }
      },
      "10": {
        "class_type": "LoadImageMask",
        "inputs": {
          "image": mask_name,
          "channel": "red"
        }
      },
      "11": {
        "class_type": "VAEDecode",
        "inputs": {
          "samples": ["3", 0],
          "vae": ["4", 2]
        }
      },
      "12": {
        "class_type": "SaveImage",
        "inputs": {
          "filename_prefix": "inpainted",
          "images": ["11", 0]
        }
      }
    }
    
    res = queue_prompt(workflow)
    prompt_id = res['prompt_id']
    
    print(f"Queued prompt {prompt_id}...")
    
    while True:
        hist = get_history(prompt_id)
        if prompt_id in hist:
            outputs = hist[prompt_id]['outputs']
            for node_id in outputs:
                node_output = outputs[node_id]
                if 'images' in node_output:
                    img_info = node_output['images'][0]
                    img_data = get_image(img_info['filename'], img_info['subfolder'], img_info['type'])
                    with open("temp_generated.png", "wb") as f:
                        f.write(img_data)
                    return "temp_generated.png"
        time.sleep(1)

import cv2
import numpy as np

def apply_transform(img, mode, target_w, target_h):
    if mode == "rotate90":
        return img.rotate(90, expand=True)
    elif mode == "isometric":
        img_np = np.array(img)
        h, w = img_np.shape[:2]
        
        # Add some padding around it so it doesn't get cut off when warping
        out_w = target_w
        out_h = target_h
        
        # We want to warp it to look like it's laying flat on a desk.
        # Top edge shorter, bottom edge longer, squashed vertically.
        src_pts = np.float32([[0, 0], [w, 0], [w, h], [0, h]])
        
        top_w = out_w * 0.6
        bot_w = out_w * 0.95
        top_y = out_h * 0.3
        bot_y = out_h * 0.9
        
        dst_pts = np.float32([
            [out_w/2 - top_w/2, top_y],
            [out_w/2 + top_w/2, top_y],
            [out_w/2 + bot_w/2, bot_y],
            [out_w/2 - bot_w/2, bot_y]
        ])
        
        M = cv2.getPerspectiveTransform(src_pts, dst_pts)
        warped = cv2.warpPerspective(img_np, M, (out_w, out_h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0,0))
        return Image.fromarray(warped)
    elif mode == "banner_isometric":
        # Rotated 90 degrees (landscape) and laying flat
        rotated = img.rotate(90, expand=True)
        img_np = np.array(rotated)
        h, w = img_np.shape[:2]
        
        out_w = target_w
        out_h = target_h
        
        src_pts = np.float32([[0, 0], [w, 0], [w, h], [0, h]])
        
        # It's landscape now, so it's wider
        top_w = out_w * 0.7
        bot_w = out_w * 0.95
        top_y = out_h * 0.4
        bot_y = out_h * 0.9
        
        dst_pts = np.float32([
            [out_w/2 - top_w/2, top_y],
            [out_w/2 + top_w/2, top_y],
            [out_w/2 + bot_w/2, bot_y],
            [out_w/2 - bot_w/2, bot_y]
        ])
        
        M = cv2.getPerspectiveTransform(src_pts, dst_pts)
        warped = cv2.warpPerspective(img_np, M, (out_w, out_h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_CONSTANT, borderValue=(0,0,0,0))
        return Image.fromarray(warped)
        
    return img

def run_shot(shot_name, prompt, negative, cutout_scale=0.8, x_offset=0, y_offset=0, base_res=(512, 640), final_res=(2000, 2400), transform_mode=None):
    print(f"Generating {shot_name}...")
    cutout = Image.open("cutout.png").convert("RGBA")
    
    gen_w, gen_h = base_res
    
    canvas = Image.new("RGB", (gen_w, gen_h), (128, 128, 128))
    
    target_h = int(gen_h * cutout_scale)
    target_w = int(target_h * (5/6))
    
    if transform_mode in ["banner_isometric"]:
        target_w = int(gen_w * cutout_scale)
        target_h = int(gen_h * cutout_scale)
        small_cutout = apply_transform(cutout, transform_mode, target_w, target_h)
        target_w, target_h = small_cutout.size
    elif transform_mode == "isometric":
        # Make the box wider for the perspective transform
        target_w = int(gen_w * cutout_scale * 1.2)
        small_cutout = apply_transform(cutout, transform_mode, target_w, target_h)
        target_w, target_h = small_cutout.size
    else:
        small_cutout = cutout.resize((target_w, target_h), Image.Resampling.LANCZOS)
    
    paste_x = (gen_w - target_w) // 2 + x_offset
    paste_y = (gen_h - target_h) // 2 + y_offset
    
    canvas.paste(small_cutout, (paste_x, paste_y), mask=small_cutout)
    
    mask = Image.new("L", (gen_w, gen_h), 255)
    alpha = small_cutout.split()[3]
    inverted_alpha = Image.eval(alpha, lambda a: 255 - a)
    mask.paste(inverted_alpha, (paste_x, paste_y), mask=alpha)
    
    print("Sending to ComfyUI for inpainting...")
    gen_img_path = generate_background(prompt, negative, canvas, mask)
    
    print("Upscaling with Real-ESRGAN...")
    os.system(f'"{REALESRGAN_EXE}" -i {gen_img_path} -o temp_upscaled.png -n realesrgan-x4plus')
    
    print("Compositing final high-res image...")
    upscaled = Image.open("temp_upscaled.png").convert("RGB")
    upscaled = upscaled.resize(final_res, Image.Resampling.LANCZOS)
    
    hr_target_h = int(final_res[1] * cutout_scale)
    hr_target_w = int(hr_target_h * (5/6))
    
    if transform_mode in ["banner_isometric"]:
        hr_target_w = int(final_res[0] * cutout_scale)
        hr_target_h = int(final_res[1] * cutout_scale)
        hr_cutout = apply_transform(cutout, transform_mode, hr_target_w, hr_target_h)
        hr_target_w, hr_target_h = hr_cutout.size
    elif transform_mode == "isometric":
        hr_target_w = int(final_res[0] * cutout_scale * 1.2)
        hr_cutout = apply_transform(cutout, transform_mode, hr_target_w, hr_target_h)
        hr_target_w, hr_target_h = hr_cutout.size
    else:
        hr_cutout = cutout.resize((hr_target_w, hr_target_h), Image.Resampling.LANCZOS)
    
    hr_paste_x = (final_res[0] - hr_target_w) // 2 + int(x_offset * (final_res[0] / gen_w))
    hr_paste_y = (final_res[1] - hr_target_h) // 2 + int(y_offset * (final_res[1] / gen_h))
    
    shadow = Image.new("RGBA", final_res, (0, 0, 0, 0))
    hr_alpha = hr_cutout.split()[3]
    shadow.paste((0, 0, 0, 150), (hr_paste_x, hr_paste_y + 15), mask=hr_alpha)
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    upscaled.paste(shadow, (0,0), shadow)
    
    upscaled.paste(hr_cutout, (hr_paste_x, hr_paste_y), mask=hr_cutout)
    
    # Add dimensions for shot 6
    if "06" in shot_name:
        draw = ImageDraw.Draw(upscaled)
        try:
            font = ImageFont.truetype("arialbd.ttf", 60)
        except:
            font = ImageFont.load_default()
            
        # Draw 200mm arrow on bottom
        bx_start = hr_paste_x
        bx_end = hr_paste_x + hr_target_w
        by = hr_paste_y + hr_target_h + 80
        draw.line([bx_start, by, bx_end, by], fill="white", width=8)
        draw.line([bx_start, by-20, bx_start, by+20], fill="white", width=8)
        draw.line([bx_end, by-20, bx_end, by+20], fill="white", width=8)
        draw.text((bx_start + (bx_end - bx_start)//2 - 100, by + 20), "200 mm", font=font, fill="white")
        
        # Draw 240mm arrow on left
        ly_start = hr_paste_y
        ly_end = hr_paste_y + hr_target_h
        lx = hr_paste_x - 80
        draw.line([lx, ly_start, lx, ly_end], fill="white", width=8)
        draw.line([lx-20, ly_start, lx+20, ly_start], fill="white", width=8)
        draw.line([lx-20, ly_end, lx+20, ly_end], fill="white", width=8)
        
        # Rotate text for left arrow
        txt = Image.new("RGBA", (300, 100), (255,255,255,0))
        d2 = ImageDraw.Draw(txt)
        d2.text((0, 0), "240 mm", font=font, fill="white")
        txt = txt.rotate(90, expand=True)
        upscaled.paste(txt, (lx - 120, ly_start + (ly_end - ly_start)//2 - 100), txt)

    upscaled.save(shot_name, quality=95)
    print(f"Finished {shot_name}!")

if __name__ == "__main__":
    negative = "text, letters, watermark, logo, extra mousepad, second mat, curved or warped edges, rounded corners, altered artwork, blurry, low resolution, people, hands, vertical room, sideways room."
    style = "Photorealistic commercial e-commerce photograph, accurate perspective, sharp focus, true-to-life. "
    
    run_shot("02_Lifestyle_Desk.jpg", style + "A modern gamer desk with RGB lighting, high-end mechanical keyboard, gaming mouse. Cinematic lighting.", negative, cutout_scale=0.8, base_res=(512, 640), transform_mode="isometric")
    # run_shot("06_Actual_Size_Scale.jpg", style + "A standard computer mouse sitting next to a mousepad on a clean desk for scale comparison.", negative, cutout_scale=0.55, x_offset=-40, base_res=(512, 640))
    run_shot("07_Secondary_Lifestyle.jpg", style + "An aesthetic minimal wooden desk setup with a potted plant, warm lighting, cozy atmosphere.", negative, cutout_scale=0.8, base_res=(512, 640), transform_mode="isometric")
    # Banner uses landscape ratios
    run_shot("08_Website_Banner.jpg", style + "A wide cinematic shot of a gaming desk setup with glowing LEDs, wide angle.", negative, cutout_scale=0.8, base_res=(1024, 512), final_res=(2400, 1200), transform_mode="banner_isometric")

