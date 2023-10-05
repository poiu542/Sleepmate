import cv2
import tensorflow as tf
import MediapipePoseLandmark as mpl
import numpy as np

class PoseClassification:
    poses = ['정자세', '엎드려', '팔올리기', '왼쪽눕기', '왼쪽새우잠', '오른쪽눕기', '오른쪽새우잠', '기타포즈', 'None']
    model = tf.keras.models.load_model('keras_model_v2.5.h5', compile=False)

    def pose_classification(self, input_image):
        model = tf.keras.models.load_model('keras_model_v2.5.h5', compile=False)

        input_image = input_image[:, 280:1000]
        input_image = cv2.resize(input_image, (224, 224), interpolation=cv2.INTER_AREA)
        # numpy array로 변환
        input_image = np.asarray(input_image, dtype=np.float32).reshape(1, 224, 224, 3)
        # Normalize
        input_image = (input_image / 127.5) - 1

        prediction = model.predict(input_image)
        index = np.argmax(prediction)

        # class의 index 반환
        return index