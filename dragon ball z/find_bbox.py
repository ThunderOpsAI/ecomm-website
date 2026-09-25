import cv2
import numpy as np

img = cv2.imread('/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/dragon ball z/DBZ-PAD-2024-D3/Fiery Goku & Bardock_cutout.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
h, w = thresh.shape

ff_mask = np.zeros((h+2, w+2), np.uint8)
floodfilled = thresh.copy()
cv2.floodFill(floodfilled, ff_mask, (0,0), 0)
cv2.floodFill(floodfilled, ff_mask, (w-1,0), 0)
cv2.floodFill(floodfilled, ff_mask, (0,h-1), 0)
cv2.floodFill(floodfilled, ff_mask, (w-1,h-1), 0)

checkerboard = cv2.bitwise_xor(thresh, floodfilled)
pad_mask = cv2.bitwise_not(checkerboard)

# Get bounding box of all white pixels
y_indices, x_indices = np.where(pad_mask == 255)
min_x, max_x = np.min(x_indices), np.max(x_indices)
min_y, max_y = np.min(y_indices), np.max(y_indices)
print(f"Bounding box: x={min_x} to {max_x}, y={min_y} to {max_y}")
print(f"Width={max_x - min_x}, Height={max_y - min_y}")

