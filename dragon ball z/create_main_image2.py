import cv2
import numpy as np

img = cv2.imread('/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/dragon ball z/DBZ-PAD-2024-D3/Fiery Goku & Bardock_cutout.jpg')
h, w = img.shape[:2]

# Inset the bounding box by a few pixels to ensure we don't catch the checkerboard
inset = 3
x1, y1 = 48 + inset, 141 + inset
x2, y2 = 974 - inset, 787 - inset
pad_w = x2 - x1
pad_h = y2 - y1
corner_radius = 50

mask = np.zeros((h, w), dtype=np.uint8)
cv2.rectangle(mask, (x1 + corner_radius, y1), (x2 - corner_radius, y2), 255, -1)
cv2.rectangle(mask, (x1, y1 + corner_radius), (x2, y2 - corner_radius), 255, -1)
cv2.circle(mask, (x1 + corner_radius, y1 + corner_radius), corner_radius, 255, -1)
cv2.circle(mask, (x2 - corner_radius, y1 + corner_radius), corner_radius, 255, -1)
cv2.circle(mask, (x1 + corner_radius, y2 - corner_radius), corner_radius, 255, -1)
cv2.circle(mask, (x2 - corner_radius, y2 - corner_radius), corner_radius, 255, -1)

pad_rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
pad_rgba[:, :, 3] = mask
pad_cropped = pad_rgba[y1:y2, x1:x2]

scale = 2.5
new_w = int(pad_w * scale)
new_h = int(pad_h * scale)
pad_resized = cv2.resize(pad_cropped, (new_w, new_h), interpolation=cv2.INTER_CUBIC)

canvas_w, canvas_h = 3000, 4000
canvas = np.ones((canvas_h, canvas_w, 3), dtype=np.uint8) * 255

offset_x = (canvas_w - new_w) // 2
offset_y = (canvas_h - new_h) // 2

shadow_canvas = np.ones((canvas_h, canvas_w, 3), dtype=np.uint8) * 255
shadow_mask = np.zeros((canvas_h, canvas_w), dtype=np.uint8)

shadow_offset_y = 40
sx1, sy1 = offset_x, offset_y + shadow_offset_y
sx2, sy2 = sx1 + new_w, sy1 + new_h
scaled_radius = int(corner_radius * scale)

cv2.rectangle(shadow_mask, (sx1 + scaled_radius, sy1), (sx2 - scaled_radius, sy2), 255, -1)
cv2.rectangle(shadow_mask, (sx1, sy1 + scaled_radius), (sx2, sy2 - scaled_radius), 255, -1)
cv2.circle(shadow_mask, (sx1 + scaled_radius, sy1 + scaled_radius), scaled_radius, 255, -1)
cv2.circle(shadow_mask, (sx2 - scaled_radius, sy1 + scaled_radius), scaled_radius, 255, -1)
cv2.circle(shadow_mask, (sx1 + scaled_radius, sy2 - scaled_radius), scaled_radius, 255, -1)
cv2.circle(shadow_mask, (sx2 - scaled_radius, sy2 - scaled_radius), scaled_radius, 255, -1)

shadow_blurred = cv2.GaussianBlur(shadow_mask, (151, 151), 0)
shadow_opacity = 0.5
shadow_alpha = (shadow_blurred.astype(float) / 255.0) * shadow_opacity

for c in range(3):
    canvas[:, :, c] = canvas[:, :, c] * (1 - shadow_alpha) + 0 * shadow_alpha

pad_rgb = pad_resized[:, :, :3]
pad_alpha = (pad_resized[:, :, 3].astype(float) / 255.0)

for c in range(3):
    canvas[offset_y:offset_y+new_h, offset_x:offset_x+new_w, c] = \
        pad_rgb[:, :, c] * pad_alpha + canvas[offset_y:offset_y+new_h, offset_x:offset_x+new_w, c] * (1 - pad_alpha)

cv2.imwrite('/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/dragon ball z/DBZ-PAD-2024-D3/Fiery Goku & Bardock.jpg', canvas)
print("Main image updated without checkerboard corners.")

