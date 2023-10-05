import boto3
from config import *
from botocore.exceptions import ClientError
import logging
import os

# 파일 가져올 경로
# file_path = 'C:\\Users\\SSAFY\\Postman\\files\\20230920014118.jpg'
# file_path = './'

class UploadFileModule:
    # S3 파일 업로드 및 url 가져오기
    def upload_file(self, file_path, memberSeq, sleepDate, sleepDateTime):

        # 생성한 bucket 이름
        bucket = BUCKET_NAME

        # s3 파일 객체 이름
        object_name = str(memberSeq)+'/'+str(sleepDate)+'/'+str(sleepDateTime)+'.jpg'

        # aws region
        location = 'ap-northeast-2'

        # 자격 증명
        s3_client = boto3.client(
            's3',
            aws_access_key_id=AWS_ACCESS_KEY,
            aws_secret_access_key=AWS_SECRET_KEY
        )

        # Upload the file
        try:
            s3_client.upload_file(file_path, bucket, object_name, ExtraArgs={'ContentType': 'image/jpg'})
            # s3_client.upload_fileobj(file_path, bucket, object_name, ExtraArgs={'ContentType': 'image/jpg'})
        except ClientError as e:
            print('에러발생')
            logging.error(e)
            return None
        image_url = f'https://{BUCKET_NAME}.s3.{location}.amazonaws.com/{object_name}'
        print(image_url)
        return image_url

# upload_file(file_path)