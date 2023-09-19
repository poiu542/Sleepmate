<div align="center">
  <br />
  <!-- <img src="./readme_assets/ssafy-mate_logo.png" alt="SLEEP MATE" width="200px" height="200px" /> -->
  <br />
  <h1>슬립 메이트 (SLEEP MATE)</h1>
  <!-- <div>
    <img src="https://img.shields.io/badge/NGINX-Active-2ea04?&logo=nginx&logoColor=white" alt="NGINX" />
    <img src="https://img.shields.io/github/v/release/ssafy-mate/ssafy-mate_front-end?color=%23068fc6" alt="GitHub release (latest by date)" />
  </div> -->
  <br />
</div>

## 목차

1. 웹 서비스 소개

2. 버전 기록

3. 기술 스택

4. 주요 기능
- 수면 자세 분석 서비스를 제공합니다. 적외선 카메라와 openCV를 통해 실시간 자세를 촬영하고 수면 패턴을 분석합니다.

5. 프로젝트 구성도

6. 데모 영상

7. 특이사항

8. 개발 팀 소개

9. 개발 기간 및 일정

10. 실행 방법

## 1. 웹 서비스 소개
- 슬립메이트(SleepMate) 는 유저들의 수면 자세와 생체정보를 이용해 유저들의 수면을 분석하고 올바른 수면습관을 추천해주는 서비스입니다. 적외선 지원 RTSP 연결 카메라, 헬스커넥트를 통한 삼성헬스 데이터, 워치의 심박수와 자이로센서에서 얻어온 정보를 활용하여 통합적인 수면 진단을 제공합니다.    
<br>

## 2. 버전 기록

<br>

## 3. 기술 스택
- 프론트엔드 : React Native, Tailwind, Recoil
- 백엔드 : Spring Boot, Spring Data JPA, FastAPI
- DB : MySQL
- 안드로이드 : Kotlin
- 서버 : AWS EC2, NginX, Jenkins
- AI : OpenCV, Tensorflow

<br>

## 4. 주요 기능

<br>

## 5. 프로젝트 구성도

<br>

## 6. 데모 영상

<br>

## 7. 특이사항

<br>

## 8. 개발 팀 소개

| ![seunghyun](/resources/resized_lsh.png) | picture | picture |
| :---: | :---: | :---: |
| **이승현**<br>백엔드 & 배포<br>이 시대의 참 팀장 | KMS | KYI |


| ![dayoung](https://avatars.githubusercontent.com/u/111489407?s=400&u=e857ddbe8196a56a9f305833ebc6703eebfa545e&v=4) | ![ShinSanha](https://github.com/SahhaShin/DANGDANGHAE/assets/33896511/fd7ca3fe-691b-429c-91f4-5b1380b04e62) | ![wonjun](/resources/wonjun90120.jpg) |
| --- | --- | --- |
| **석다영**<br>프론트엔드 | **신산하**<br>프론트엔드<br>이것은 디자이너인가 개발자인가 | **천원준**<br>백엔드 & ML/DL<br>흘러가는 대로 사는 사람 |


<br>

## 9. 개발 기간 및 일정
2023-08-21 ~ 2023-10-06

<br>

## 10. 실행 방법
- 수집 데이터
  - 실시간 : 심박수, 자이로센서, 수면 자세 분류
  - 기상 이후 : 수면사이클, 키, 몸무게 (헬스커넥트)
