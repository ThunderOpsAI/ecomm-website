import cv2
import numpy as np
import sys

def find_quad(scene_path, ref_path):
    scene = cv2.imread(scene_path)
    # Read with alpha channel
    ref_img = cv2.imread(ref_path, cv2.IMREAD_UNCHANGED)
    if ref_img.shape[2] == 4:
        ref = ref_img[:, :, :3]
        mask = ref_img[:, :, 3]
    else:
        ref = ref_img
        mask = None
        
    sift = cv2.SIFT_create()
    kp1, des1 = sift.detectAndCompute(ref, mask)
    kp2, des2 = sift.detectAndCompute(scene, None)
    
    FLANN_INDEX_KDTREE = 1
    index_params = dict(algorithm=FLANN_INDEX_KDTREE, trees=5)
    search_params = dict(checks=50)
    
    flann = cv2.FlannBasedMatcher(index_params, search_params)
    matches = flann.knnMatch(des1, des2, k=2)
    
    good = []
    for m, n in matches:
        if m.distance < 0.7 * n.distance:
            good.append(m)
            
    if len(good) > 10:
        src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
        dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
        
        M, inliers = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
        h, w = ref.shape[:2]
        pts = np.float32([[0,0], [w-1,0], [w-1,h-1], [0,h-1]]).reshape(-1, 1, 2)
        dst = cv2.perspectiveTransform(pts, M)
        return dst.reshape(4, 2)
    else:
        return None

if __name__ == "__main__":
    quad = find_quad(sys.argv[1], sys.argv[2])
    if quad is not None:
        print(",".join(f"{x:.1f},{y:.1f}" for x, y in quad))
    else:
        print("None")
