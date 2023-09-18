## [B103] Sleep Mate
Sleep Mate 프로젝트는 Docker, Docker Compose, 그리고 Jenkins Pipeline을 활용한 CI/CD 자동화 환경을 구성하고 있습니다.
Gitlab의 Webhook 설정으로 인해 Push 또는 Merge 이벤트 발생 시, Jenkins Pipeline을 통해 자동 빌드와 배포가 이루어집니다.
프론트엔드 부분은 npm 환경에서 빌드하고 배포합니다.
백엔드는 Gradle을 사용하여 빌드하며, Docker Compose를 통해 컨테이너를 관리하고 배포합니다.

## Jenkins
```
pipeline {
    agent any
    stages {
        stage('Clone') {
            steps {
                git branch: 'develop', credentialsId: 'jenkins_token', url: 'https://lab.ssafy.com/s09-bigdata-recom-sub2/S09P22B103.git'
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
                docker stop sleep_mate_container
                docker rm -f sleep_mate_container
                docker rmi -f sleep_mate
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
