import cv2
import numpy as np
import os

def create_mock(name, quad):
    bg = np.zeros((1024, 1024, 3), dtype=np.uint8)
    bg[:] = (40, 40, 40)
    cv2.rectangle(bg, (0, 512), (1024, 1024), (20, 20, 20), -1)
    pts = np.array(quad, np.int32)
    cv2.fillConvexPoly(bg, pts, (128, 128, 128))
    cv2.imwrite(f"{name}_scene.jpg", bg)

create_mock("lifestyle", [[200, 400], [824, 400], [924, 800], [100, 800]])
create_mock("base_reveal", [[200, 300], [824, 300], [924, 800], [100, 800]])
create_mock("floating_packshot", [[100, 200], [924, 200], [924, 800], [100, 800]])
create_mock("edge_macro", [[0, 400], [1024, 400], [1024, 1024], [0, 1024]])
