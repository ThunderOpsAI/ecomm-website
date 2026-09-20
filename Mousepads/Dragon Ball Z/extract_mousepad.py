import cv2
import numpy as np
import sys

def get_mousepad_corners(image_path):
    img = cv2.imread(image_path)
    if img is None:
        print(f"Failed to load image: {image_path}")
        sys.exit(1)
        
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 50, 150)
    
    # Apply morphological operations to close gaps
    kernel = np.ones((5,5), np.uint8)
    edged = cv2.morphologyEx(edged, cv2.MORPH_CLOSE, kernel)

    contours, _ = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if not contours:
        print("No contours found.")
        return None, img
        
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:5]

    screenCnt = None
    for c in contours:
        peri = cv2.arcLength(c, True)
        # Try a range of epsilons
        for eps in np.linspace(0.01, 0.05, 10):
            approx = cv2.approxPolyDP(c, eps * peri, True)
            if len(approx) == 4:
                screenCnt = approx
                break
        if screenCnt is not None:
            break

    if screenCnt is None:
        print("Could not find 4-point contour, falling back to bounding box of largest contour.")
        # Fallback to bounding box of largest contour
        x, y, w, h = cv2.boundingRect(contours[0])
        screenCnt = np.array([[[x, y]], [[x+w, y]], [[x+w, y+h]], [[x, y+h]]])

    return screenCnt.reshape(4, 2), img

def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)] # top-left
    rect[2] = pts[np.argmax(s)] # bottom-right
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)] # top-right
    rect[3] = pts[np.argmax(diff)] # bottom-left
    return rect

def extract_mousepad(image_path, output_path, target_width=2000, target_height=2400):
    corners, img = get_mousepad_corners(image_path)
    
    if corners is None:
        return False
        
    print(f"Corners detected: {corners}")
    rect = order_points(corners)
    
    dst = np.array([
        [0, 0],
        [target_width - 1, 0],
        [target_width - 1, target_height - 1],
        [0, target_height - 1]], dtype="float32")
        
    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(img, M, (target_width, target_height))
    
    # Add alpha channel
    b_channel, g_channel, r_channel = cv2.split(warped)
    alpha_channel = np.ones(b_channel.shape, dtype=b_channel.dtype) * 255
    
    img_BGRA = cv2.merge((b_channel, g_channel, r_channel, alpha_channel))
    cv2.imwrite(output_path, img_BGRA)
    print(f"Successfully extracted to {output_path}")
    return True

if __name__ == "__main__":
    extract_mousepad("dbz4.jpg", "cutout.png")
