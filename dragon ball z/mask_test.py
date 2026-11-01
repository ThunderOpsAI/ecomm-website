import cv2
import numpy as np

img = cv2.imread('/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/dragon ball z/DBZ-PAD-2024-D3/Fiery Goku & Bardock_cutout.jpg')

# The checkerboard is gray/white. We can just look for non-grayish pixels, or run findContours.
# Actually, the mousepad is very colorful.
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV) # white parts become black

# To handle the gray squares (often ~204,204,204), let's just do a color segmentation.
# A better way is to find the largest contour in an edge map.
edges = cv2.Canny(img, 50, 150)
kernel = np.ones((5,5), np.uint8)
edges = cv2.dilate(edges, kernel, iterations=2)
edges = cv2.erode(edges, kernel, iterations=1)

contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
largest = max(contours, key=cv2.contourArea)

mask = np.zeros_like(gray)
cv2.drawContours(mask, [largest], -1, 255, thickness=cv2.FILLED)

# save to check
cv2.imwrite('test_mask.jpg', mask)
