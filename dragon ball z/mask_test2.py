import cv2
import numpy as np

img = cv2.imread('/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/dragon ball z/DBZ-PAD-2024-D3/Fiery Goku & Bardock_cutout.jpg')

# The checkerboard squares look to be about 16x16 or 32x32 pixels.
# Let's blur with a 33x33 kernel.
blurred = cv2.GaussianBlur(img, (33, 33), 0)

# Canny on the blurred image
edges = cv2.Canny(blurred, 30, 100)

# Find contours
contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
if contours:
    largest = max(contours, key=cv2.contourArea)
    mask = np.zeros(img.shape[:2], dtype=np.uint8)
    cv2.drawContours(mask, [largest], -1, 255, cv2.FILLED)
    cv2.imwrite('test_mask2.jpg', mask)
    print("Found contour of area:", cv2.contourArea(largest))
else:
    print("No contours found")

