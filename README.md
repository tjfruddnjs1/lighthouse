# 서비스 명 : 등대(lighthouse)

> **서비스 주제** : 멘토링 및 진로 서비스

- 개발자가 되고 싶지만 많은 종류의 개발자 중 진로를 정하지 못한 사람에게 여러 분야를 소개해주고 진로를 정할 수 있게 해주는 서비스
- 이미 개발자로써 진로를 정한 사람들에게는 현업 개발자와의 멘토링 중계 서비스를 통해 올바른 방향 및 미래 발전 가능성에 대한 조언을 받을 수 있는 서비스

## 목차

- [언어,프레임워크,모듈](#언어,-프레임워크,-모듈-선정)
- [개발 기능](#개발-기능)
- [구현 방법](#구현-방법-및-개발-규칙)

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
- **[package.json]()** : 사용 모듈(미들웨어) 파일

## 개발 기능

> 기능 분리 `(계속 업데이트 예정)` : header navigation를 정하고 해당 기능에 대해 역할 분담

- **header navigation 항목**
  <br>
  <img width=100% src="https://user-images.githubusercontent.com/41010744/105853762-64713b00-6029-11eb-8293-46811b98256c.png">
  <br>
- 진로 탐색 `(임종묵 작성 예정)`
- 멘토 등록 `(문현호 작성 예정)`
- 멘토 찾기
- 개발자 이야기
- 스터디 공고
- 홍보
- 로그인 `(계속 업데이트 예정)`
  - 로그인/회원가입 페이지 : Local, Kakao, Naver 아이디를 통한 회원 가입 구현 `일부 구현 > Naver 회원가입은 관리자외에 아직 불가`
  - 로그인 시 `header navigation`의 로그인 부분이 `마이페이지`로 변경 `구현 완료`
  - `마이페이지` 항목은 자신의 정보 및 진로탐색결과/멘토링/스터디 상태 및 로그아웃 가능하다. `일부 구현 > 로그아웃만 구현`
  - 회원가입시 중복된 email의 User를 검사하고 로그인시 Database에 등록된 User인지 검사한다. `구현 완료`

> 메인 페이지는 header navigation의 일부 항목 및 사이트 소개 페이지로 구성 예정 `현재 소개페이지만 간단하게 구현 상태` > `(계속 업데이트 예정)`

<br>
<img src="https://user-images.githubusercontent.com/41010744/105859241-a309f400-602f-11eb-8784-0da84d4c96fc.png">

> 페이지 구현 상태 `(계속 업데이트 예정)`

- 진로 탐색
- 멘토 등록
- 멘토 찾기
- 개발자 이야기
- 스터디 공고
- 홍보
- 로그인 : `로그인, 회원가입` 페이지
  <br>
  <img width=40% float:left src="https://user-images.githubusercontent.com/41010744/105857370-91bfe800-602d-11eb-834e-6c9cd581740b.png">
  <img width=31% float:right src="https://user-images.githubusercontent.com/41010744/105857768-f24f2500-602d-11eb-86df-2db454eeff3c.png">

## 구현 방법 및 개발 규칙

> 디렉터리 구성 `(계속 업데이트 예정)`

<img src="https://user-images.githubusercontent.com/41010744/105860565-0fd1be00-6031-11eb-97bf-846c448e0256.png">

- `config, migrations, models, seeders` : Sequelize Module 설치 후, `npx sequelize init` 명령어 실행시 폴더 생성
  - config : `config.json`파일을 통해 id, password 등과 같은 Database 설정
  - models : [models/index.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/models/index.js)파일을 통해 서버 실행시 MySQL과의 연동
- `passport` : 로그인을 위해 passport 관련 코드 작성
- `public` : 웹 페이지 디자인을 위한 `css,images`, 동적인 웹페이지를 위한 `js`, 중 공통적으로 사용하는 부분을 모아놓은 폴더, 경로 연결을 통한 사용
- `routes` : 라우터를 [index.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/index.js)파일을 통해 연결하면 길어지기 때문에 분리하여 `GET,POST,PUT,DELETE 등`에 대한 라우트 처리
- `uploads` : `(문현호 작성 예정)`
- `views` : 실제 웹 페이지에서 클라이언트와 상호작용하는 부분으로 ejs 템플릿을 사용하여 더욱 편리한 동적인 작용하는 폴더
  - [views/home/index.ejs](https://github.com/tjfruddnjs1/lighthouse/blob/master/views/home/index.ejs) : 메인 페이지
  - [views/partials](https://github.com/tjfruddnjs1/lighthouse/tree/master/views/partials) : 각 페이지에서 공통적으로 사용하는 `header,footer,navigation` 및 `저작권 상표, 페이지 상단으로 이동시키는 버튼`을 모아 재사용 가능하게 분리
- `.env` : 유출되면 안되는 비밀키를 관리
- `.gitignore` : Github 업로드 시 유출되면 안되는 `.env, config.json`파일이나 package.json으로 관리되는 `node_modules`을 배재하여 업로드
- `index.js` : `npm install`을 통해 설치한 모듈들을 실제로 연동하고 설정

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

> 진로 탐색 `(임종묵 작성 예정)`

> 멘토 등록 `(문현호 작성 예정)`

> 멘토 찾기

> 개발자 이야기

> 스터디 공고

> 홍보

> 로그인

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
   - `views/home/login.ejs` : 로그인 페이지
   - `views/home/auth.ejs` : 회원가입 페이지
   - `views/home/validate.ejs` : routes의 `res.locals.user`를 통해 로그인 및 회원가입 시 이미 DataBase에 등록한 사용자일 경우 오류 팝업창
5. [index.js](https://github.com/tjfruddnjs1/lighthouse/blob/master/index.js)를 통해 라우터 및 Database Model 연결, Passport Configuration, Passport-Session 설정
