import cv2
import numpy as np

flat = cv2.imread("out/4-Panel_Super_Saiyan/4-Panel_Super_Saiyan_flat.png")
h, w = flat.shape[:2]
# fabric_macro: crop tight on one face's eye/brow line (the pink or silver panel)
# Let's crop from the right side (pink panel usually on the right, as per "left to right: silver... dark green... dark blue... bright pink")
crop_w = w // 4
crop_h = crop_w
# crop top rightish area
x = w - crop_w
y = int(h * 0.2) # rough guess for eye level
crop = flat[y:y+crop_h, x:x+crop_w]
if crop.size == 0:
    crop = flat[:100, :100] # fallback

crop = cv2.resize(crop, (1024, 1024), interpolation=cv2.INTER_CUBIC)

# weave texture
noise = np.random.randint(0, 25, (1024, 1024, 1), dtype=np.uint8)
# horizontal lines
noise[::2, :, :] = 0
# vertical lines
noise[:, ::2, :] = 0
noise = cv2.GaussianBlur(noise, (3,3), 0)

res = cv2.addWeighted(crop, 0.9, cv2.cvtColor(noise, cv2.COLOR_GRAY2BGR), 0.1, 0)
cv2.imwrite("out/4-Panel_Super_Saiyan/4-Panel_Super_Saiyan_fabric_macro.jpg", res)
