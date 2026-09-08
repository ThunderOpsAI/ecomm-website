import os
from PIL import Image

fitted_dir = '/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/Mousepads/fitted_images'
target_w, target_h = 354, 414
target_ratio = target_w / target_h

for filename in os.listdir(fitted_dir):
    if filename.startswith('Gemini_') and filename.lower().endswith(('.jpg', '.jpeg', '.png')):
        filepath = os.path.join(fitted_dir, filename)
        img = Image.open(filepath)
        w, h = img.size
        
        current_ratio = w / h
        
        if current_ratio < target_ratio:
            # Image is too tall, crop height
            new_w = w
            new_h = int(w / target_ratio)
        else:
            # Image is too wide, crop width
            new_h = h
            new_w = int(h * target_ratio)
            
        left = (w - new_w) / 2
        top = (h - new_h) / 2
        right = (w + new_w) / 2
        bottom = (h + new_h) / 2
        
        cropped_img = img.crop((left, top, right, bottom))
        # Save over the original in fitted_images
        cropped_img.save(filepath, quality=95)
        print(f"Processed {filename}: {w}x{h} -> {new_w}x{new_h}")

print("Done.")
