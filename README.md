# 🧅 Yangpa Market

2020학년도 1학기 `Software Engineering` 프로젝트

## 개발 목적

저희 팀은 이번 소프트웨어 공학 프로젝트로 본교 대학생을 위한 중고 거래 사이트를 기획했습니다.

현재 학생들은 학교 수업에서 사용하는 서적이나 회원권 양도 및 기타 상품들을

`에브리타임` 과 같은 커뮤니티 서비스를 통해 거래를 진행하고 있습니다.

명확한 카테고리가 분류되어 있지 않기 때문에 원하는 상품을 찾기 어렵고

판매 시 상품의 가격대를 알기 힘들어 판매자마다 상품 가격이 천차만별인 상황입니다.

이러한 불편함을 해결하고자 기존의 e-커머스 형태의 서비스 데모를 구현하여

사용성이 좋고 활성화된 중고 거래 플랫폼을 만들어보고자 합니다.

## 사용 기술

- Vue 2.x & Typescript
- Scss
- Express.js
- Redis
- Sequelize ORM(MySQL)

## 팀원 소개

Frontend: [손정현](https://github.com/sohnjunior) <br>
Backend: [박민춘](https://github.com/sprical408) & [손정현](https://github.com/sohnjunior)

## 데모 스크린 샷 (리팩토링 이전 ver.)

### 로그인 및 회원가입

![회원가입](https://user-images.githubusercontent.com/37819666/94371180-887e4780-012f-11eb-97ed-6f93326f47af.gif)
![로그인](https://user-images.githubusercontent.com/37819666/94371183-8e742880-012f-11eb-8e30-06992f866d18.gif)

### 상품 업로드

![상품 업로드](https://user-images.githubusercontent.com/37819666/94370930-d09c6a80-012d-11eb-9a13-7133beb3189b.gif)

### 상품 검색

![검색](https://user-images.githubusercontent.com/37819666/94370915-bcf10400-012d-11eb-86ea-93083d05d8c6.gif)

### 상품 상세 페이지(& 댓글)

![비밀 댓글](https://user-images.githubusercontent.com/37819666/94370920-c2e6e500-012d-11eb-85f3-e5109c81b0cf.gif)
![댓글 생성 수정 삭제](https://user-images.githubusercontent.com/37819666/94370923-c8442f80-012d-11eb-9566-5a2a7f4986d2.gif)

### 구매 후기

![구매후기](https://user-images.githubusercontent.com/37819666/94370899-a21e8f80-012d-11eb-86a7-e4b8993fa251.gif)

### 구매 및 판매 관리 & 장바구니

![구매 및 판매관리](https://user-images.githubusercontent.com/37819666/94370771-d3e32680-012c-11eb-98de-a86f4713944e.gif)
![장바구니 담기](https://user-images.githubusercontent.com/37819666/94370798-0856e280-012d-11eb-9182-5f230a361e0d.gif)

## 주요 업데이트 사항

- 2020-09-28 : 코드 리팩토링 및 구매 관련 기능 추가
- 2020-10-11 : express.js 프로젝트 구조 개선
- 2020-11-09 : Vue + Typescript 적용
- 2021-01-02 : Vuetify 의존성 제거 진행
- 2021-01-31 : JWT 토큰 인증 방식 변경 (refresh 토큰 추가)
- 2021-02-04 : Vuetify -> Scss 마이그레이션 & 모바일 반응형 웹 적용
