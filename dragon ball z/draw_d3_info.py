import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

img_path = '/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/dragon ball z/DBZ-PAD-2024-D3/Fiery Goku & Bardock_infographic.jpg'
img = cv2.imread(img_path)
h, w, c = img.shape

# Colors
black = (0, 0, 0)
line_thickness = 2
dot_radius = 5

# --- 1. Draw indicator lines and dots ---
dots_info = [
    (550, 285),  # Micro-weave
    (550, 495),  # Rubber base
    (550, 690)   # Compact gaming
]

for (dx, dy) in dots_info:
    # dot
    cv2.circle(img, (dx, dy), dot_radius, black, -1, cv2.LINE_AA)
    # line to text (text starts at ~610)
    cv2.line(img, (dx, dy), (610, dy), black, line_thickness, cv2.LINE_AA)

# --- 2. Draw Dimension Arrows ---
# Draw bottom horizontal arrow (240mm)
# Pad edges X ~ 50, 575
hx1, hx2, hy = 42, 583, 760
# using cv2.arrowedLine, but we want arrows on both ends. 
# We can draw two arrows that meet in the middle, or draw one full line and add arrowheads.
# Easier to draw one line from center to left, one from center to right
cx = (hx1 + hx2) // 2
cv2.arrowedLine(img, (cx, hy), (hx1, hy), black, line_thickness, cv2.LINE_AA, tipLength=0.03)
cv2.arrowedLine(img, (cx, hy), (hx2, hy), black, line_thickness, cv2.LINE_AA, tipLength=0.03)

# Draw right vertical arrow (200mm)
vx, vy1, vy2 = 600, 250, 730
cy = (vy1 + vy2) // 2
cv2.arrowedLine(img, (vx, cy), (vx, vy1), black, line_thickness, cv2.LINE_AA, tipLength=0.03)
cv2.arrowedLine(img, (vx, cy), (vx, vy2), black, line_thickness, cv2.LINE_AA, tipLength=0.03)

# --- 3. Draw Dimension Text with PIL ---
# Convert to PIL for text
img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
draw = ImageDraw.Draw(img_pil)

# We need a font. The closest standard one is Arial or Helvetica bold.
# Since we are on Mac, we can use Arial Bold or Helvetica Bold.
try:
    font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 26)
except:
    font = ImageFont.load_default()

# 240mm text
text_240 = "240mm"
bbox_240 = draw.textbbox((0,0), text_240, font=font)
w_240 = bbox_240[2] - bbox_240[0]
draw.text((cx - w_240//2, hy + 10), text_240, font=font, fill=(0,0,0))

# 200mm text (rotated 90 deg clockwise)
text_200 = "200mm"
# Create a separate image for rotated text
bbox_200 = draw.textbbox((0,0), text_200, font=font)
w_200, h_200 = bbox_200[2] - bbox_200[0], bbox_200[3] - bbox_200[1]
txt_img = Image.new('RGBA', (w_200, h_200 + 10), (255,255,255,0))
txt_draw = ImageDraw.Draw(txt_img)
txt_draw.text((0,0), text_200, font=font, fill=(0,0,0,255))
txt_rotated = txt_img.rotate(-90, expand=True)

# Paste it near the vertical line
paste_x = vx + 10
paste_y = cy - (w_200 // 2)
img_pil.paste(txt_rotated, (paste_x, paste_y), txt_rotated)

# Save the output
res_cv = cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2BGR)
cv2.imwrite('/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/dragon ball z/DBZ-PAD-2024-D3/Fiery Goku & Bardock_infographic.jpg', res_cv)

print("Infographic updated successfully.")
