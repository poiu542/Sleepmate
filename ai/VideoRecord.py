import cv2
import UploadFileModule as ufm
import MediapipePoseLandmark as mpl
import PoseClassification as pc
import datetime
import os
import requests

os.environ["OPENCV_FFMPEG_CAPTURE_OPTIONS"] = "rtsp_transport;udp"

memberSeq = 1
def current_time_str(): #현재 시각을 yyyymmddhhmmss 형태의 str로 반환
    cur_time = datetime.datetime.now()
    cur_time = datetime.datetime.strftime(cur_time, "%Y%m%d%H%M%S")

    return cur_time

# 이름은 crop_image이긴한데, 웹캠의 영상으로 포즈 분류 및 s3저장 수행 및 db저장 수행하는 함수임
def crop_image():
    # path = 'rtsp_images'
    # capture = cv2.VideoCapture('rtsp://admin:ssafy9thspecial@192.168.1.105:554/stream_ch00_0')
    capture = cv2.VideoCapture('rtsp://admin:ssafy9thspecial@sleepmate2.iptimecam.com:554/stream_ch00_0')
    _, frame = capture.read()

    width = capture.get(3)  # 현재 비디오 너비
    height = capture.get(4)  # 현재 비디오 높이
    fps = capture.get(5)  # 현재 비디오 fps
    print(width, height, fps)
    global count
    count = 0

    while capture.isOpened():
        _, frame = capture.read()
        # 왼쪽 이미지 표시
        cv2.imshow("image", frame)
        # cv2.imshow("right_image", right_img)
        # 오른쪽 이미지를 표시하려면 아래 줄의 주석을 제거하세요.
        # cv2.imshow("right_image", right_img)
        count += 1
        if count >= 120:
            # cv2.imwrite(path + '\\' + current_time_str() + '.jpg', frame)
            # 1. 따온 프레임을 s3에 저장
            filename = current_time_str()+'.jpg'
            cv2.imwrite(filename, frame)
            #현재 시간으로 파일명, 경로명 지정
            cur_time = datetime.datetime.now()
            cur_date = cur_time.date()
            cur_time = datetime.datetime.strftime(cur_time, "%Y%m%d%H%M%S")
            #s3 url 저장
            s3_url = ufm.UploadFileModule.upload_file(ufm.UploadFileModule, filename, memberSeq, cur_date, cur_time)
            #s3 업로드 완료했다면, 로컬에 저장된 사진 삭제
            os.remove(filename)

            # 2. 따온 프레임을 뼈대 이미지로 변환
            pose_image = mpl.MediapipePoseLandmark.image_to_pose_landmark(mpl.MediapipePoseLandmark, frame)

            # 3. 뼈대 이미지로 어느 포즈인지 분류
            pose_class = pc.PoseClassification.pose_classification(pc.PoseClassification, pose_image)
            pose_class = int(pose_class)
            # 4. 분류된 클래스, s3 url, memberSeq, 등등의 정보 담아 스프링 api 요청(DB에 넣기)
            datas = {
                "memberSeq": memberSeq,
                "capture": s3_url,
                "posture": pose_class
            }
            url = "https://j9b103.p.ssafy.io/api/posture/videoRecord"
            response = requests.post(url, json=datas)

            count = count % 120
        cv2.waitKey(1) #이 부분 없다면 imshow창 업데이트 안됨

        print(count)
        # time.sleep(2)
        # 작은 지연을 추가하고 종료키를 확인하여 루프를 종료합니다.

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    capture.release()
    cv2.destroyAllWindows()

crop_image()