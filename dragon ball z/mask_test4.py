import cv2
import numpy as np

img = cv2.imread('/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/dragon ball z/DBZ-PAD-2024-D3/Fiery Goku & Bardock_cutout.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Threshold to get checkerboard as white
_, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)

# Floodfill from (0,0) with black
# The checkerboard is white, so this should turn the checkerboard black
h, w = thresh.shape
ff_mask = np.zeros((h+2, w+2), np.uint8)
floodfilled = thresh.copy()
cv2.floodFill(floodfilled, ff_mask, (0,0), 0)
cv2.floodFill(floodfilled, ff_mask, (w-1,0), 0)
cv2.floodFill(floodfilled, ff_mask, (0,h-1), 0)
cv2.floodFill(floodfilled, ff_mask, (w-1,h-1), 0)

# Now, the outside checkerboard is black.
# But parts inside the pad might also be white.
# If we do bitwise XOR between thresh and floodfilled, we get exactly the checkerboard!
# Let's save floodfilled to see
cv2.imwrite('floodfilled.jpg', floodfilled)

# The checkerboard mask is thresh XOR floodfilled
checkerboard = cv2.bitwise_xor(thresh, floodfilled)
cv2.imwrite('checkerboard.jpg', checkerboard)

# Invert to get the pad mask
pad_mask = cv2.bitwise_not(checkerboard)

# Pad mask might have holes if the edge touched. Let's just find the contour
contours, _ = cv2.findContours(pad_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
largest = max(contours, key=cv2.contourArea)

final_mask = np.zeros_like(pad_mask)
cv2.drawContours(final_mask, [largest], -1, 255, cv2.FILLED)
cv2.imwrite('test_mask4.jpg', final_mask)
print("Mask area:", cv2.contourArea(largest))
