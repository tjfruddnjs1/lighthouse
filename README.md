# 프로젝트 명 : 등대(lighthouse)

> **프로젝트 주제** : 멘토링 및 진로 서비스

- 개발자가 되고 싶지만 많은 종류의 개발자 중 진로를 정하지 못한 사람에게 여러 분야를 소개해주고 진로를 정할 수 있게 해주는 서비스
- 이미 개발자로써 진로를 정한 사람들에게는 현업 개발자와의 멘토링 중계 서비스를 통해 올바른 방향 및 미래 발전 가능성에 대한 조언을 받을 수 있는 서비스

## 목차

- [언어,프레임워크,모듈](#언어,-프레임워크,-모듈-선정)
- [개발 기능](#개발-기능)
- [구현 방법](#구현-방법)
- [에러 처리](#에러-처리)
- [개발 규칙](#개발-규칙)

## 언어, 프레임워크, 모듈 선정

> 템플릿 선정

- https://www.free-css.com/free-css-templates/page261/yeinydd
- HTML + CSS + JavaScript & JQuery

> 언어 선정

- Front End : HTML + CSS + JavaScript
- Back End : Node JS

> 프레임 워크 & 사용 모듈(미들웨어) 선정 `(계속 업데이트 예정)`

- Express : 내부에 http 모듈이 내장되어 서버 역할을 해주는 모듈
  - static : Express 내부에 내장되어 정적인 파일들을 제공하는 라우터 역할, 프로젝트에서 `public`폴더로 지정
  - body-parser : 요청의 본문에 있는 데이터를 해석하여 req.body 객체로 만들어주는 미들웨어, **Express 4.16.0**부터 내장되어 사용
  - express-session : 세션 관리용 미들웨어, 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장할때 유용 > 사용자별로 req.session 객체 안에 유지
- Sequelize : DataBase(MySQl, Maria DB 등)을 Node에서 쉽게 할 수 있도록 돕는 라이브러리
  - Sequelize-cli : 시퀄라이즈 명령어를 실행하기 위한 패키지
- Passport : 로그인을 구현하기 위해 세션과 쿠키 처리등 복잡한 작업을 위한 검증된 모듈
  - Passport-local : 로컬 로그인을 위한
  - Passport-kakao : 카카오 로그인을 위한
  - Passport-naver : 네이버 로그인을 위한
- bcrypt : 비밀번호를 암호화(hash)하기 위해 사용
- dotenv : `.env`파일로 유출되면 안되는 비밀키를 관리
- ejs : `embedded javascript templating`, HTML markup과 함께 자바스크립트 코드를 사용하여 서버와 클라이언트 간 데이터 상호작용을 편리하게 해줌
- multer : 이미지, 동영상 등을 비롯한 여러 파일들을 `멀티파트(multipart/form-data)` 형식으로 업로드할 때 사용하는 미들웨어
- nodemon : 소스 코드가 바뀔 때마다 노드를 재실행
- morgan : 사용시 기존 로그외에 추가적인 로그를 확인 가능 > [HTTP 메서드] [주소] [HTTP 상태 코드] [응답 속도]- [응답 바이트] > 요청과 응답을 한눈에 볼수 있어 편리  
- `socket.io` : 비동기 이벤트 처리를 위한 모듈. 페이지 리로드나 `get`, `post`처리 없이 요청에 대한 응답이 가능
- **[package.json](https://github.com/tjfruddnjs1/lighthouse/blob/master/package.json)** : 사용 모듈(미들웨어) 파일

## 개발 기능

> 기능 분리 `(계속 업데이트 예정)` : header navigation를 정하고 해당 기능에 대해 역할 분담

- **header navigation 항목**
  <br>
  <img width=100% src="https://user-images.githubusercontent.com/41010744/105853762-64713b00-6029-11eb-8293-46811b98256c.png">
  <br>
- 진로 탐색 `(계속 업데이트 예정)`

  - 진로 탐색 소개페이지 구현 : ~~페이지 디자인 및 라우팅 처리 `일부 구현 > 2021-01-28 12:38(KST)기준 9개의 직업을 도출하였고, 세부 자료조사는 지속적인 업데이트 필요`~~ -> 210213 구현완료

  - 사용자가 한 직종에 대해 **MORE DETAILS**버튼을 누르면 해당 직종에 대해 자세한 설명이 있는 페이지로 이동. `구현 완료`

  - 관심 분야에 추가 버튼을 누르면 해당 분야가 관심분야로 추가 -> 구현 필요

- 멘토 등록
  - 멘토 등록 페이지 : 기존 멘티 신분인 사용자를 멘토로 만들기 위한 기능 `구현 완료`
  - home 페이지에서 헤더의 `멘토등록` 버튼 클릭시 멘토 등록 페이지로 이동 `구현 완료`
  - 멘토 등록시 이미 등록된 멘토인지 검사 `구현 완료`
  - 멘토 사진 등록 시 이미지 미리보기 기능 추가 `구현 완료`
  - 이미 등록된 멘토일 경우 멘토 등록 페이지에 들어갈 시 전에 작성했던 글들을 출력 `구현 완료`
- 멘토 찾기
- 사용자가 원하는 멘토들을 카테고리별로 찾을 수 있는 기능 `구현 완료`
- `언어`와 `직업` 2개의 카테고리로 분류해 사용자가 원하는 멘토를 자세히 찾을 수 있다.
- 사용자가 원하는 멘토를 클릭할 경우 해당 멘토에 대한 경력과 소개 글에 대한 페이지로 이동 `구현 예정`
- 개발자 이야기

  * 게시글 로드 `구현 완료`
  * 게시글 카테고리화 `구현 완료`
  * 게시글 목록에서 사용할 수 있는 기능들 `지속적인 개발 필요`
  * 게시글 css 스타일링 `구현 중`
  * 게시글 작성 `구현 예정`
- 스터디 공고
- 홍보
- 로그인 `(계속 업데이트 예정)`
  - 로그인/회원가입 페이지 : Local, Kakao, Naver 아이디를 통한 회원 가입 구현 `일부 구현 > Naver 회원가입은 관리자외에 아직 불가`
  - 로그인 시 `header navigation`의 로그인 부분이 `마이페이지`로 변경 `구현 완료`
  - `마이페이지` 항목은 자신의 정보 및 진로탐색결과/멘토링/스터디 상태 및 로그아웃 가능하다. `마이 페이지 항목 > 나의 분야, 나의 멘토, 나의 작성글, 나의 계정, 로그아웃 중 나의 계정 부분 구현 완료`
  - `마이페이지` 항목의 `나의 계정`부분에서 사용자의 이름, 핸드폰 번호, 성별, 사진, 비밀번호 변경 가능 & 회원 탈퇴 & 멘티정보(대학생/취준생 또는 직장인상태) 등록 가능
    `구현 완료`
  - 회원가입시 중복된 email의 User를 검사하고 로그인시 Database에 등록된 User인지 검사한다. `구현 완료`
  - 회원가입시 입력 이메일에 대한 인증번호 발송후 이메일 인증을 필요로 한다 `구현 완료`
  - 비밀번호 찾기 시 해당 이메일에 대해 임시 비밀번호를 발급한다 `구현 완료`

> 페이지 구현 상태 `(계속 업데이트 예정)`

- 메인 페이지
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/105859241-a309f400-602f-11eb-8784-0da84d4c96fc.png">

- 진로 탐색 : `소개 , 해당 직종 설명` 페이지
  <br>
  <img width=40% float:left src="https://user-images.githubusercontent.com/57579709/107813911-67ec1c80-6db4-11eb-9e49-e238ee70b274.png">
  <img width=48% float:right src="https://user-images.githubusercontent.com/57579709/107814040-9e299c00-6db4-11eb-9cb7-ffbb5241ab37.png">
  <br>
  <img width="80%" src="https://user-images.githubusercontent.com/57579709/107814123-c5806900-6db4-11eb-8e43-d033175843a9.png">

- 멘토 등록 : `멘토 등록` 페이지
  <br>
  <img width=43.5% float:left src ="https://user-images.githubusercontent.com/57825856/107779116-44ab7800-6d88-11eb-839f-d43cd174695f.png">
  <img width=40% float:right src = "https://user-images.githubusercontent.com/57825856/107779629-ff3b7a80-6d88-11eb-8c34-2d8dea0cc228.png">
- 멘토 찾기 : `멘토 리스트` 페이지
  <img width=100% float:left src="https://user-images.githubusercontent.com/57825856/107780503-1af35080-6d8a-11eb-8ed3-0f8c0840d024.png">
- 개발자 이야기
  <br>
  <img width=100% float:left src="https://user-images.githubusercontent.com/57579709/109390062-c4be0a00-7952-11eb-9c0f-334263ab212c.png">
  <img width=100% float:left src="https://user-images.githubusercontent.com/57579709/109390089-e4553280-7952-11eb-88c6-57c23fd9c6fe.png">

- 스터디 공고
- 홍보
- 로그인 : `로그인, 회원가입` 페이지
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/108615368-c9605b00-7446-11eb-8d8a-ace23ef9657a.png">
  <img src="https://user-images.githubusercontent.com/41010744/108615386-f01e9180-7446-11eb-8d01-2026c899a08c.png">
- 비밀번호 찾기 : `비밀번호 이메일 인증을 통한 구현` 페이지
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/108615424-44c20c80-7447-11eb-9d9a-563d2713e67a.png">
- 로그인 시 header navigation :
  <br>
  <img src="https://user-images.githubusercontent.com/41010744/107681968-19228200-6ce3-11eb-9d3e-af17894db3d0.png">

- 마이페이지 : `계정 설정, 멘티 정보, 비밀번호설정, 회원탈퇴` 페이지
  <br>
  `계정 설정`
  <img width=100% float:left src="https://user-images.githubusercontent.com/41010744/107676880-f7be9780-6cdc-11eb-9d5d-4201cdc3cb40.png">
  `멘티 정보-대학생/취준생`
  <img src="https://user-images.githubusercontent.com/41010744/107677210-613ea600-6cdd-11eb-94b1-b5612f658562.png">
  <img src="https://user-images.githubusercontent.com/41010744/107677347-80d5ce80-6cdd-11eb-9b1d-7639e890e662.png">
  `멘티 정보-직장인`
  <img src="https://user-images.githubusercontent.com/41010744/107678084-4fa9ce00-6cde-11eb-97d4-9ad902432094.png">
  <br>
  `비밀번호 설정`
  <img src="https://user-images.githubusercontent.com/41010744/107678258-8253c680-6cde-11eb-9eab-5aa41ee158e0.png">
  `회원 탈퇴`
  <img src="https://user-images.githubusercontent.com/41010744/107678337-9d263b00-6cde-11eb-982a-9be500a7a480.png">

## 구현 방법

> 디렉터리 구성 `(계속 업데이트 예정)`

<img src="https://user-images.githubusercontent.com/41010744/107678507-d494e780-6cde-11eb-8ab3-8761f3c30400.png">

- `config, migrations, models, seeders` : Sequelize Module 설치 후, `npx sequelize init` 명령어 실행시 폴더 생성
  - config : `config.json`파일을 통해 id, password 등과 같은 Database 설정
  - models : [models/index.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/index.js)파일을 통해 서버 실행시 MySQL과의 연동
- `passport` : 로그인을 위해 passport 관련 코드 작성
- `public` : 웹 페이지 디자인을 위한 `css,images`, 동적인 웹페이지를 위한 `js`, 중 공통적으로 사용하는 부분을 모아놓은 폴더, 경로 연결을 통한 사용
- `routes` : 라우터를 [index.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/index.js)파일을 통해 연결하면 길어지기 때문에 분리하여 `GET,POST,PUT,DELETE 등`에 대한 라우트 처리
- `events` : `socket.io`모듈을 통한 socket이벤트들을 정의하는 자바스크립트 파일을 분리시켜놓은 폴더
- `uploads` : 멘토 등록시 프로필 사진에 대한 파일들을 저장하는 폴더
- `views` : 실제 웹 페이지에서 클라이언트와 상호작용하는 부분으로 ejs 템플릿을 사용하여 더욱 편리한 동적인 작용하는 폴더
  - [views/home/index.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/home/index.ejs) : 메인 페이지
  - [views/partials](https://github.com/tjfruddnjs1/lighthouse/tree/master/views/partials) : 각 페이지에서 공통적으로 사용하는 `header,footer,navigation` 및 `저작권 상표, 페이지 상단으로 이동시키는 버튼`을 모아 재사용 가능하게 분리
  - [views/job_seeking]() : 사용자에게 직업 탐색을 위한 개발자 직종 정보를 제공하는 view로, 일반적인 직업을 표현할 수 있는 동적 ejs파일인 `job_desc.ejs`파일과 별도의 툭수한 형태로 설명이 필요한 교육자 설명 페이지를 나타내는 `job_desc_edu.ejs`파일이 존재한다.
  - [views/mentor](https://github.com/tjfruddnjs1/lighthouse/tree/master/views/mentor) : 사용자가 멘토 등록을 하기 위한 view  `mentor.ejs`, `mentorField.ejs` 파일과 사용자가 원하는 멘토를 찾기 위한 멘토 리스트 페이지인 `mentorList.ejs`파일이 있다.
  - [views/mypage]() : 사용자의 계정 정보(이메일 제외)를 수정할수 있는 페이지의 view로 수정항목으로는 이름, 핸드폰번호, 성별, 사진이 있다. 또한 회원탈퇴페이지와 멘티정보를 등록할수 있으며 멘티는 대학생/취준생과 직장인으로 분류된다. 또한 비밀번호를 변경가능하며, 회원탈퇴시 사용자의 불편한점을 알아내기 위해 회원탈퇴 사유를 받는다.
  - [views/essay]() : 멘토로 등록한 사용자만 작성할 수 있는 다양한 이야기들이나 개발자들의 동향, 멘토의 주관적인 생각 등 멘티들에게 도움이 될 수 있는 에세이들을 제공하는 페이지가 모여있는 폴더
- `.env` : 유출되면 안되는 비밀키를 관리
- `.gitignore` : Github 업로드 시 유출되면 안되는 `.env, config.json`파일이나 package.json으로 관리되는 `node_modules`을 배재하여 업로드
- `index.js` : `npm install`을 통해 설치한 모듈들을 실제로 연동하고 설정

> 기능에 따른 구현 방법

- 진로 탐색

1. 상단의 `진로 탐색`을 누르면 직종 소개 페이지로 이동
   - `href`속성은 [views/partials/nav.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/partials/nav.ejs)안에 정의
   - `href=/job_seeking/intro`을 요청하면 라우터는 [views/job_seeking/intro.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/job_seeking/intro.ejs)를 렌더링
2. `intro.ejs`단순히 라우터에게 페이지를 요청하는 형태
   - 이 페이지에는 직종별로 `MORE DATAILS`버튼이 존재하며, 이 버튼을 누르면 `.json`을 이용하여 동적으로 설명 페이지로 라우팅
3. `MORE DETAILS` 버튼을 누르면 해당 직종에 대한 자세한 설명 페이지로 이동
   - `JSON`을 사용하여 로컬(또는 데이터베이스로 바뀔 수 있음)의 ~~[public/asset/front.json](https://github.com/tjfruddnjs1/lighthouse/blob/master/public/asset/front.json)~~ [public/asset/job_seeking/job.json](https://github.com/tjfruddnjs1/lighthouse/blob/master/public/asset/job_seeking/job.json)을 읽어오고, 페이지에 표시할 정보들이 키-값으로 저장
   - 해당 버튼에 직종에 대한 정보를 함께 request, 라우터는 그 직종에 맞는 정보를 json으로부터 동적으로 읽어오고 브라우저에게 json 객체형태로 response
4. 한 직종을 클릭하면 라우터에 `job_seeking/(직종)`을 요청, 이후 라우터에서는 `job_desc.ejs`를 렌더링
   - ex) 프론트엔드 개발자 자세히 버튼 클릭시 `job_seeking/front`로 요청, 라우터는 `job.json`파일의 `front`에 해당하는 부분을 `job_desc.ejs`페이지 렌더링 결과와 함께 response
5. 직종 설명 페이지에 `관심 분야에 추가`버튼 프레임을 만들어 두어 이후 마이페이지 기능 구현 후 연동되게 할 예정

- 멘토 등록

1. [models/mentor.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/mentor.js) 를 통해 mentor 테이블 생성
   - `firm, department, carrer, field, intro, path` 컬럼으로 구성
   - [models/index.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/index.js) 에 테이블 연결
2. [routes/mentor.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/routes/mentor.js) 작성
   - 프로필 이미지 저장하기 위해`upload` 폴더 생성
   - 미리 등록된 멘토인지를 판단에 따른 다른 결과 출력
3. [views/mentor/mentor.ejs](https://github.com/tjfruddnjs1/lighthouse/tree/master/views/mentor/mentor.ejs) 작성
   - mentor 등록 페이지를 보여준는 파일
4. [public/css/mentor.css](https://github.com/tjfruddnjs1/lighthouse/blob/master/public/css/mentor.css), [public/js/mentor.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/public/js/mentor.js) 작성
   - `mentor.css` : 멘토 등록 페이지 css 파일
   - `mentor.js` : 멘토 등록 페이지에 처리 파일, 잘못된 입력값이나, 빈 값 전송 시 처리 파일

- 멘토 찾기

1. [models/mentorJob.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/mentorJob.js)
   - `id, mentor_id, job_id` 칼럼들로 구성
2. [models/mentorLangs.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/mentorLang.js)
   - `id, mentor_id, lang_id` 칼럼들로 구성
3. [models/index.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/index.js) 에 테이블 연결
4. [routes/mentorList.js]() 작성
   - 멘토 리스트를 보여주는 페이지로 연결하는 라우터 파일
5. [views/mentor/mentorList.ejs](https://github.com/tjfruddnjs1/lighthouse/tree/master/views/mentor/mentorList.ejs)
   - 사용자들이 멘토 신분으로 등록하면 멘토 찾기 페이지에서 멘토 리스트를 보여주는 파일

- 개발자 이야기

- 스터디 공고

- 홍보

- 로그인

1. [models/user.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/user.js)를 통해 User 테이블 생성
   - `id(PK,PK 미 지정시 자동 생성) ,username, email, password, provider, snsId` 컬럼으로 구성
   - [models/index.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/index.js)에 테이블 연결
2. [passport/kakaoStrategy.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/passport/kakaoStrategy.js),[passport/localStrategy.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/passport/localStrategy.js),[passport/naverStrategy.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/passport/naverStrategy.js) 작성
   - 각각 kakao, local, naver 로그인시 Database에 저장할 방법 명시 및 오류 발생시 처리
3. [routes/home.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/routes/home.js), [routes/auth.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/routes/auth.js), [routes/middleware.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/routes/middlewares.js) 작성
   - `home.js` : 로그인 버튼에 대한 GET/POST 요청 , 회원가입 버튼에 대한 GET 요청, 로그인 상태 session을 유지하기 위한 `res.locals.user`
   - `auth.js` : 회원가입(local,kakao,naver)에 대한 GET/POST 요청, 로그아웃에 대한 GET 요청 처리
   - `middleware.js` : 다른 라우터에서 로그인 상태인지 아닌지를 확인하기 위해 작성, `isLoggedIn`은 로그인 상태임을 알려주고 `isNotLoggedIn`은 로그인이 안된 상태임을 알려준다.
4. [views/home/login.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/home/login.ejs), [views/home/auth.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/home/auth.ejs), [views/home/validate.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/home/validate.ejs)를 통한 client와 상호 작용
   - `views/home/login.ejs` : 로그인 페이지 > 비밀번호 찾기 이메일 인증을 통한 구현
   - `views/home/auth.ejs` : 회원가입 페이지 > 이메일 인증 구현
   - `views/home/validate.ejs` : routes의 `res.locals.user`를 통해 로그인 및 회원가입 시 이미 DataBase에 등록한 사용자일 경우 오류 팝업창
5. [index.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/index.js)를 통해 라우터 및 Database Model 연결, Passport Configuration, Passport-Session 설정

- 회원 가입 > 이메일 인증 (이메일 인증 제외한 나머지 입력부분은 로그인 부분에 설명 작성)

1. [views/auth.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/home/auth.ejs) 기존 회원가입 페이지에서 이메일 인증을 위해 이메일 인증번호를 입력하는 view 부분 생성
2. [routes/auth.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/routes/auth.js) 의 sendEmail Post router를 통해 입력한 이메일에 대해 nodemailer 모듈을 통한 이메일 인증번호 발송
3. 클라이언트 부분에서 해당 인증번호 일치여부를 판단하여 처리

- 비밀번호 찾기

1. [views/searchPassword.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/home/searchPassword.ejs)를 통해 이메일을 입력받는다
2. [routes/home.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/routes/home.js)를 통해 User 테이블에 해당 user가 있는지 확인하여 이메일로 새롭게 바뀐 비밀번호를 전송한다.

- 마이페이지(계정 설정/회원 탙퇴)

1. [views/mypage/account.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/mypage/account.ejs)를 통해 사용자와 상호작용을 한다. 기존 테이블(user.js)를 수정 하였다. gender, phone, path 추가 , 각각 성별, 핸드폰번호, 사용자의 사진이 저장되는 파일 경로를 나타낸다. database에 저장되어 있는 정보가 있다면 불러온다.

2. [routes/mypage.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/routes/mypage.js)를 통해 페이지를 불러오고 사용자의 정보를 갱신한다. 사용자 사진은 [public/images/user_image](https://github.com/tjfruddnjs1/lighthouse/tree/master/public/images) > `해당 폴더는 보안에 의한 gitignore 처리`에 저장되며 미리보기 화면에서는 해당 파일의 경로만 불러와서 클라이언트에 보여준다. 만약 사진을 등록하지 않았다면 해당 router 파일의 path를 제외한 정보만 등록하고 있다면 파일 경로를 포함하여 database에 갱신한다.

3. 회원 탈퇴는 [views/mypage/delete.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/mypage/delete.ejs)를 통해 사용자와 상호작용한다. 새로운 테이블[models/drop.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/drop.js)를 생성하여 기존 user.js와는 1:1관계(정보의 확장)을 가지며 해당 user의 탈퇴사유 및 건의사항을 저장한다.

- 마이페이지(멘티 정보)

1. [views/mypage/mentee.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/mypage/mentee.ejs),[views/mypage/worker.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/mypage/worker.ejs)를 통해 사용자와 상호작용한다. 새로운 테이블[models/mentee.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/mentee.js)를 생성하여 기존 user.js와는 1:1관계(정보의 확장)을 가지며 user가 대학생/취준생 일때와 직장인일 때의 각자 다른 정보가 저장된다. 해당 테이블은 다른 상태를 가질수 있으므로 null을 허용한다.

2. [routes/mypage.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/routes/mypage.js)를 통해 페이지를 불러오고 멘티 정보를 생성한다. 항목은 대학생/취준생인 경우 학교,전공,재학/졸업,학년,스펙,기타 컬럼이 있을수 있으며 직장인인 경우 연차, 출신학교, 최종확력, 주요 경력사항, 기타가 있을수 있다.

- 마이페이지(비밀번호 설정)

1. [views/mypage/password.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/mypage/password.ejs)를 통해 사용자와 상호작용한다. 기존 테이블(user.js)를 통해 비밀번호가 database에 hash형태로 저장되어 있는데 현재비밀번호가 옳은지는 server측에서 변경할 비밀번호와 비밀번호가 같은지 확인하는 부분은 client에서 처리한다.

2. [routes/mypage.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/routes/mypage.js)를 통해 페이지를 불러오고 비밀번호를 수정할수 있다. hash형태로 저장되어있는 비밀번호를 사용자가 현재비밀번호 입력칸에 적은 정보를 바탕으로 같은지 확인하고 틀린 경우 확인 요청 메시지를 보낸다.

- 그외 [views/mypage/mypage_nav](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/mypage/mypage_nav.ejs) 마이페이지에 공통적으로 존재하는 네비게이션 페이지이다. 해당 파일을 include하여 공통적으로 존재하는 네비게이션을 분리하였다.

## 에러 처리

> 로그인 :

- user 확인 : 가입된 user 확인후 존재하지 않다면 alert
- `비밀번호 찾기` 기능의 경우 해당 이메일이 존재하지 않거나 카카오, 네이버 이메일인 경우는 alert 메시지

> 회원가입 :

- 중복 메일 가입 : 중복된 메일로 가입시 alert
- 이메일 인증 번호가 일치하지 않는 경우 alert

> 마이페이지(계정 설정) :

- 이미지는 .png, .img, .jpg 형식의 파일만 등록가능하게 > input의 `accept`속성을 이용하여 사용자 환경변수의 위의 파일 형식만 나타나게
- 이미지가 등록되지 않았다면 기본 이미지가 나타나고 `수정하기`버튼 클릭시 기본이미지 라면 이미지 첨부 alert
- 만약 등록된 이미지가 이미 있다면 `수정하기`버튼 클릭 가능

> 마이페이지(비밀번호 변경) :

- 카카오, 네이버 로그인은 비밀번호를 `등대`에서 관리하지 않아 비밀번호 변경이 불가
- 비밀번호 변경 버튼 클릭시 `새 비밀번호`와 `새 비밀번호 확인` 두 항목이 일치해야 변경 가능 > client에서 확인이 가능하도록 문구(비밀번호 일치여부)를 띄워준다
- 현재 비밀번호 확인시 hash화된 비밀번호는 서버측에서 값 비교후 다를시 alert

> 마이페이지(멘티정보 등록) :

- 멘티의 필수 정보 등록이 안되어있을 경우 input의 `required`속성을 이용하여 전송 제어

> 멘토등록(기본정보 페이지) :

- 사용자가 멘토 정보를 다 채우지 않고 전송 시 alert()문으로 경고문 출력
- 사진은 정해진 파일(.img, .png) 형식이 아닌 경우 전송을 못하게 처리

> 멘토등록(분야등록 페이지) :

- 사용자가 분야를 선택 안하고 등록시 alert() 문으로 경고문 출력

## 개발 규칙

> Github Commit 규칙 및 README.md 작성 , `2021-01-27 적용`

- `각자의 branch 사용`
  - 각자의 기능을 branch 별로 만들어 master branch에 merge시 pull request
  - request 내용은 `commit 규칙`과 동일
- `Commit 규칙` : [기능명] Commit 내용
- ex. [로그인] 로그아웃 기능 오류 수정
- `README.md작성 규칙`
  - 작성법 : 자신이 맡은 기능에 관련한 `설명,사진` 작성
  - 요청 사항 : 이후 회의에서 이야기 해볼만한 사항들이 있다면 상대방이 작성한 부분에 ` ` 을 통해 작성 > 회의후 삭제
  - 작성 기간 : 다음 회의 이전 자신이 구현한 부분에 관해 작성 완료
  - `README.md Commit 규칙` : [README.md] [기능명] Commit 내용
