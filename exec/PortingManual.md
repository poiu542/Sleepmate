## [B103] Sleep Mate

Sleep Mate 프로젝트는 Docker, Docker Compose, 그리고 Jenkins Pipeline을 활용한 CI/CD 자동화 환경을 구성하고 있습니다.
백엔드의 경우 Gitlab의 Webhook 설정으로 인해 Push 또는 Merge 이벤트 발생 시, Jenkins Pipeline을 통해 자동 빌드와 배포가 이루어집니다.
프론트엔드의 경우 카메라 화면을 위한 용도로 배포가 되었으며 Jenkins Pipeline을 통해 배포가 이루어집니다.
카메라 화면 이외의 프론트엔드 부분은 expo앱으로 빌드되었습니다.
백엔드는 Gradle을 사용하여 빌드하며, Docker Compose를 통해 컨테이너를 관리하고 배포합니다.

## Version

### Frontend

| Type            | Version |
| --------------- | ------- |
| Node.js         | 18.16.1 |
| React.js        | 18.2.0  |
| Axios           | 1.5.1   |
| React-bootstrap | 2.8.0   |
| expo-router     | 2.0.4   |
| VsCode          | 1.8.1   |
| recoil          | 0.7.7   |
| twrnc           | 3.6.4   |

### Backend

| Type              | Version            |
| ----------------- | ------------------ |
| Java              | openjdk : 17.0.8.1 |
| Spring Boot       | 3.0.10             |
| Gradle            | 8.2.1              |
| JPA               | -                  |
| Hibernate         | -                  |
| IntelliJ Ultimate | 2023.2             |

### Database

| Type            | Version |
| --------------- | ------- |
| MySQL           | 8.1.0   |
| MySQL Workbench | 8.0 CE  |

### AI

| Type      | Version  |
| --------- | -------- |
| Python    | 3.7.3    |
| OpenCV    | 4.8.0.76 |
| MediaPipe | 0.9.0.1  |
| Pycharm   | 2023.2   |

### Wear OS

| Type   | Version |
| ------ | ------- |
| Kotlin | 1.9.0   |
| SDK    | 33      |

## Nginx Port forwarding

| Port | Content     |
| ---- | ----------- |
| 22   | SSH         |
| 80   | HTTP        |
| 443  | HTTPS       |
| 3306 | MySQL       |
| 8080 | API Gateway |
| 9090 | Jenkins     |
| 9999 | Html        |
| 554  | Rtsp        |

## Docker And Docker Compose Install

https://docs.docker.com/engine/install/ubuntu/

## Nginx Install

```sh
# Nginx 설치
$ sudo apt update
$ sudo apt install nginx

# Nginx 시작
$ sudo service nginx start
```

## SSL/TSL Install / Apply

### snapd. core

```sh
# snap을 이용하여 core 설치 -> snap을 최신 버전으로 유지하기 위해 설치
$ sudo snap install core

# core를 refresh 해준다.
$ sudo snap refresh core
```

### SSL 설치 및 설정

```sh
# 기존에 잘못된 certbot이 설치되어있을 수도 있으니 삭제 해준다.
$ sudo apt remove certbot

# certbot 설치
$ sudo snap install --classic certbot

# certbot 명령을 로컬에서 실행할 수 있도록 snap의 certbot 파일을 로컬의 cerbot과 링크(연결) 시켜준다. -s 옵션은 심볼릭링크를 하겠다는 것.
$ ln -s /snap/bin/certbot /usr/bin/certbot

# certbot 설정
sudo certbot --nginx
```

### SSL 갱신

```sh
certbot renew
```

## Nginx Config

```sh
server {
        root /var/www/html;

        index index.html index.htm index.nginx-debian.html;
        server_name j9b103.p.ssafy.io; # managed by Certbot


        location /api {
                proxy_pass http://j9b103.p.ssafy.io:8080;

                proxy_pass_header Server;
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Scheme $scheme;
        }

        location /cjsdnjswnsqkdahtmq {
                alias /app;
                index test.html test.htm
                try_files $uri $uri/ /test.html =404;
        }

        location /ws {
                proxy_pass http://j9b103.p.ssafy.io:9999;

                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $http_host;

                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "Upgrade";
        }

        listen [::]:443 ssl; # managed by Certbot
        listen 443 ssl; # managed by Certbot

        ssl_certificate /etc/letsencrypt/live/j9b103.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/j9b103.p.ssafy.io/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
        if ($host = j9b103.p.ssafy.io) {
            return 301 https://$host$request_uri;
        } # managed by Certbot

        listen 80 ;
        listen [::]:80 ;
        server_name j9b103.p.ssafy.io;
        return 404; # managed by Certbot
}
```

## Environment Variables

### Backend

- application.yml 은 aws server 안에서 vim 으로 작성 후 docker-image 와 함께 띄워서 사용

```sh
# application.yml
spring:
  # MySQL
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://j9b103.p.ssafy.io:3306/sleepmate?serverTimezone=Asia/Seoul
    username: root
    password: samjijiksong-parutparut

    jpa:
      hibernate:
        ddl-auto: none

oauth2:
  kakao:
    client-id: 1e4417060773b8517915b413b7a1942d
    grant-type: authorization_code
    redirect-uri: https://j9b103.p.ssafy.io/api/oauth/kakao
    refresh-grant-type: refresh_token

aws:
  access-key: AKIAU2GMA2V4HYR6OKYG
  secret-key: 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
  s3:
    region: ap-northeast-2
    bucket: sleepmate-video
    url: https://sleepmate-video.s3.ap-northeast-2.amazonaws.com/
```

### Database ERD

link : https://www.erdcloud.com/d/F2qCkJQAdomNFunYR

## Docker : Dockerfile

Dockerfile은 git에 작성하지 않고 aws server 내부에 vim으로 작성 후 사용하였습니다.

### Frontend

```docker
FROM node:18.16.1
WORKDIR /app/rtsp-camera

COPY rtsp-camera/package*.json ./
RUN npm install

RUN apt update && apt install -y sudo
RUN sudo apt install -y ffmpeg

COPY rtsp-camera/ .

COPY mpeg1muxer.js /app/rtsp-camera/node_modules/node-rtsp-stream/mpeg1muxer.js

EXPOSE 9999

CMD ["node", "index.js"]
```

### Backend

```docker
FROM jenkins/jenkins:jdk17

COPY backend/build/libs/backend-0.0.1-SNAPSHOT.jar sleep-mate.jar

COPY application-dev.yml /config/application-dev.yml

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar -Dspring.config.location=/config/application-dev.yml -Dspring.profiles.active=dev sleep-mate.jar"]
```

## Docker Compose : docker-compose.yml

```sh
version: '3'

services:
    jenkins:
        image: jenkins/jenkins:jdk17
        container_name: jenkins
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock
            - /usr/bin/docker:/usr/bin/docker
            - /jenkins:/var/jenkins_home
        ports:
            - "9090:8080"
        user: root

    mysql:
        image: mysql:latest
        container_name: mysql
        restart: always
        ports:
            - 3306:3306
        environment:
            MYSQL_ROOT_PASSWORD: samjijiksong-parutparut
            TZ: Asia/Seoul
        command:
            - --character-set-server=utf8mb4
            - --collation-server=utf8mb4_unicode_ci
        volumes:
            - ./db/mysql/data:/var/lib/mysql
            - ./db/mysql/config:/etc/mysql/conf.d
            - ./db/mysql/init:/docker-entrypoint-initdb.d
```

## Jenkins

jenkins admin ID : sleep-mate
jenkins admin password : samjijiksong-parutparut

### Jenkins Job

- backend
- frontend

### Jenkins file

Jenkins file git에 작성하지 않고, Jenkins 내부에 pipeline을 직접 작성하였다.

### Frontend

- docker container name : sleep_mate_app_container
- docker image name : sleep_mate_app

```docker
pipeline{
    agent any

    stages{
        stage('clone'){
            steps {
                git branch: 'rtsp', credentialsId: 'jenkins_token', url: 'https://lab.ssafy.com/s09-bigdata-recom-sub2/S09P22B103.git'
            }
            post {
                success {
                    sh 'echo "Successfully Cloned Repository"'
                }
                failure {
                    sh 'echo "Failed To Clone Repository"'
                }
            }
        }
        stage('Rm') {
            steps {
                sh '''
                docker stop sleep_mate_app_container || true
                docker rm -f sleep_mate_app_container || true
                docker rmi -f sleep_mate_app || true
                '''
            }
            post {
                success {
                    sh 'echo "Successfully Rm Docker"'
                }
                failure {
                    sh 'echo "Failed to rm Docker"'
                }
            }
        }
        stage('Image') {
            steps {
                sh 'docker build -t sleep_mate_app .'
            }
            post {
                success {
                    sh 'echo "Successfully Bulit Docker Image"'
                }
                failure {
                    sh 'echo "Failed To Bulid Docker Image"'
                }
            }
        }
        stage('Run') {
            steps {
                sh 'docker run -d --name sleep_mate_app_container -p 9999:9999 sleep_mate_app'
            }
            post {
                success {
                    sh 'echo "Successfully Run Docker"'
                }
                failure {
                    sh 'echo "Failed To Run Docker"'
                }
            }
        }
    }
}
```

### Backend

- docker container name : sleep_mate_container
- docker image name : sleep_mate

```
pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git branch: 'Feat/BE', credentialsId: 'jenkins_token', url: 'https://lab.ssafy.com/s09-bigdata-recom-sub2/S09P22B103.git'
            }
            post {
                success {
                    sh 'echo "Successfully Cloned Repository"'
                }
                failure {
                    sh 'echo "Failed To Clone Repository"'
                }
            }
        }
        stage('Build') {
            steps {
                dir("./backend") {
                    sh 'chmod +x gradlew'
                    sh './gradlew clean bootjar'
                }
            }
            post {
                success {
                    sh 'echo "Successfully Built Gradle"'
                }
                 failure {
                    sh 'echo "Failed To Build Gradle"'
                }
            }
        }
        stage('Rm') {
            steps {
                sh '''
                docker stop sleep_mate_container || true
                docker rm -f sleep_mate_container || true
                docker rmi -f sleep_mate || true
                '''
            }
            post {
                success {
                    sh 'echo "Successfully Rm Docker"'
                }
                failure {
                    sh 'echo "Failed to rm Docker"'
                }
            }
        }
        stage('Image') {
            steps {
                sh 'docker build -t sleep_mate .'
            }
            post {
                success {
                    sh 'echo "Successfully Bulit Docker Image"'
                }
                failure {
                    sh 'echo "Failed To Bulid Docker Image"'
                }
            }
        }
        stage('Run') {
            steps {
                sh 'docker run -d --name sleep_mate_container -e TZ=Asia/Seoul -p 8080:8080 sleep_mate'
            }
            post {
                success {
                    sh 'echo "Successfully Run Docker"'
                }
                failure {
                    sh 'echo "Failed To Run Docker"'
                }
            }
        }
    }
}
```
