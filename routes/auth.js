const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

//session 유지를 위한 > passport module
router.use((req,res,next)=>{
  res.locals.user = req.user;
  next();
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.render('home/validate',{title:'중복 메일 가입', passAuth:false, passLogin:true});
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      username,
      password: hash,
    });
    return res.render('home/index');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//회원가입 이메일 인증
router.post('/sendEmail', isNotLoggedIn, async(req,res,next)=>{
  
  let email = req.body.email;
  //console.log(email);

  let randomNumber = req.body.randomNumber;
  // if(randomNumber>1000000){
  //   randomNumber -= 100000;
  // }

  console.log(randomNumber);

  let transporter = nodemailer.createTransport({
    service: 'gmail'              //사용하고자 하는 서비스
    , prot: 587
    , host: 'smtp.gmail.com'
    , secure: false
    , requireTLS: true
    , auth: {
        user: process.env.NODEMAIL_USER                       //gmail주소입력
        , pass: process.env.NODEMAIL_PASS                //gmail패스워드 입력
      }
    });

  let info = await transporter.sendMail({   
    from: '등대(lighthouse)',                      //보내는 주소 입력
    to: email,                              //위에서 선언해준 받는사람 이메일
    subject: '[등대] 이메일 인증 요청',                  //메일 제목
    html : "<p>회원 가입을 위한 인증번호 입니다.</p><p>아래의 인증 번호를 입력하여 인증을 완료해주세요.</p><h2>"+randomNumber+"</h2>"                     //내용
  });
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

router.get('/naver', passport.authenticate('naver'));

router.get('/naver/callback', passport.authenticate('naver', {
  failureRedirect: '/',
}), (req, res) => {
  res.redirect('/');
});

module.exports = router;