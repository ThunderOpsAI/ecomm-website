import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

img = cv2.imread('/Users/thunderopsai/Documents/Workspace/01_Projects/ecomm-website/dragon ball z/DBZ-PAD-2024-D3/Fiery Goku & Bardock_infographic.jpg')
h, w, c = img.shape
print("Shape:", img.shape)

# Let's save a copy with grid lines so I can pick coordinates visually
grid = img.copy()
for i in range(0, w, 100):
    cv2.line(grid, (i, 0), (i, h), (0, 0, 0), 1)
    cv2.putText(grid, str(i), (i, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1)
for i in range(0, h, 100):
    cv2.line(grid, (0, i), (w, i), (0, 0, 0), 1)
    cv2.putText(grid, str(i), (0, i+20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1)

cv2.imwrite('grid.jpg', grid)
