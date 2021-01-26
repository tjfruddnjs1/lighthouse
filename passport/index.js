const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const naver = require('./naverStrategy');
const User = require('../models/user');

module.exports = () => {
    //로그인시 실행 > req.session(세션) 객체에 어떤 데이터를 저장할지 정하는 메서드
    //매개변수로 user를 받고 done함수에 두번째 인수로 user.id를 넘긴다
    //사용자 정보가 들어있다고 생각
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

    //매 요청시 실행 > passport.session 미들웨어가 이 메서드를 실행
    //serializeUser의 done의 두번째 인수로 넣었던 데이터가 deserializeUser의 매개변수
    //여기서는 사용자의 아이디
    //serializeUser에서 세션에 저장했던 아이디를 받아 DB에서 사용자 정보 조회
    //조회한 정보를 req.user에 저장하므로 앞으로 req.user를 통해 로그인한 사용자 정보 가져옴
  passport.deserializeUser((id, done) => {
    User.findOne({where : {id}})
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
  kakao();
  naver();
};