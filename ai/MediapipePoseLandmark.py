import mediapipe as mp
import cv2
import numpy as np

class MediapipePoseLandmark:
    # image = cv2.imread(file)을 통해 받아온 image
    def image_to_pose_landmark(self, image):
        #BG_COLOR = (192, 192, 192)  # 회색
        BG_COLOR = (0, 0, 0)
        mp_drawing = mp.solutions.drawing_utils
        mp_drawing_styles = mp.solutions.drawing_styles
        mp_pose = mp.solutions.pose
        with mp_pose.Pose(
                static_image_mode=True,
                model_complexity=2,
                enable_segmentation=True,
                min_detection_confidence=0.5) as pose:
            image_height, image_width, _ = image.shape
            # BGR to RGB
            results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

            #회색 바탕
            annotated_image = np.zeros(image.shape, dtype=np.uint8)
            annotated_image[:] = BG_COLOR
            # 포즈 포착 못하면, 그냥 회색 바탕 이미지 반환
            if not results.pose_landmarks:
                return annotated_image
            mp_drawing.draw_landmarks(
                annotated_image,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                landmark_drawing_spec=mp_drawing_styles.get_default_pose_landmarks_style()
            )
            return annotated_image


