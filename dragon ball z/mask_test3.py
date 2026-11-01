import cv2
import numpy as np

img = cv2.imread('/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/dragon ball z/DBZ-PAD-2024-D3/Fiery Goku & Bardock_cutout.jpg')
h, w = img.shape[:2]

# Create a mask for floodFill (needs to be h+2, w+2)
ff_mask = np.zeros((h+2, w+2), np.uint8)

# Floodfill from (0,0)
# We want to allow it to fill both the white (255) and gray (190) squares.
# To do this, we could just do a color distance, or simple floodfill on a smoothed image.
# Actually, if we just convert to grayscale, white is 255, gray is ~190.
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Let's threshold everything above 180 to white, everything below to black.
# The black border is very dark (close to 0).
_, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
cv2.imwrite('thresh.jpg', thresh)

# Now in thresh, the checkerboard is entirely white!
# And the black border of the pad is completely black.
# Some parts inside the pad might be white, but we only care about the outside.
# Floodfill the outside white with black.
ff_mask2 = np.zeros((h+2, w+2), np.uint8)
cv2.floodFill(thresh, ff_mask2, (0,0), 0)

# Now the outside is black. Inside is a mix of black and white.
# If we invert it, the outside is white, inside is mix.
# We want the mask of the PAD.
# Let's just find the largest contour of the edge of the pad.
# Or better: before floodfill, the outside was white.
# After floodfill, the outside is black. The difference is the outside mask!
# So outside_mask = (original_thresh == 255) & (after_floodfill == 0)
# Let's just do findContours on the original thresh (inverted).
inv = cv2.bitwise_not(thresh)
contours, _ = cv2.findContours(inv, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
largest = max(contours, key=cv2.contourArea)
print("Largest contour area:", cv2.contourArea(largest))

final_mask = np.zeros((h, w), np.uint8)
cv2.drawContours(final_mask, [largest], -1, 255, cv2.FILLED)
cv2.imwrite('test_mask3.jpg', final_mask)
