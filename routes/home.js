const express = require('express');
const passport = require('passport');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { Mentee } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

//session 유지를 위한 > passport module
router.use((req,res,next)=>{
  res.locals.user = req.user;
  next();
});

//메인 페이지
router.get('/', (req,res)=>{
  try{
  res.render('home/index');
  }catch(err){
    console.error(err);
    next(err);
  }
});

//등 대 버튼 눌렀을때
router.get('/index',async(req,res,next)=>{
  try{
    res.render('home/index');
  }catch(err){
    console.error(err);
    next(err);
  }
});

//로그인 눌렀을 때
router.get('/login', async(req,res,next)=>{
  try{
    res.render('home/login');
  }catch(err){
    console.error(err);
    next(err);
  }
});

//로그인 post 요청
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    //info.message
    if (!user) {
      console.log(info.message);
      return res.render('home/validate',{title:'로그인 에러 정보', passLogin:false, passAuth:true});
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

//비밀번호 찾기
router.get('/searchPassword',isNotLoggedIn,(req,res,next)=>{
  try{
    res.render('home/searchPassword');
  }catch(err){
    console.error(err);
    next(err);
  }
});

router.post('/searchPassword',isNotLoggedIn, async(req,res,next)=>{
  try{
    const email = req.body.email;
    //console.log(email);  
    let random = Math.random().toString(12).slice(2);
    const hash = await bcrypt.hash(random,12);
    const isUser = await User.findOne({where:{email : req.body.email}});

    console.log(isUser);

    if(!isUser){
      res.send(
        "<script>alert('존재하지 않는 이메일입니다.'); history.back();</script>"
        )
    }else{
      if(isUser.provider != 'local'){
        res.send(
          "<script>alert('카카오톡, 네이버 이메일은 비밀번호 찾기가 불가합니다.'); history.back();</script>"
          )
      }else{
        await User.update({
          password : hash,
        },{
          where : {email : req.body.email},
        });
      }
    }
  
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
  
    let info = transporter.sendMail({   
      from: '등대(lighthouse)',                      //보내는 주소 입력
      to: email,                              //위에서 선언해준 받는사람 이메일
      subject: '[등대] 새로운 비밀번호 전송',                  //메일 제목
      html : "<p>새로운 비밀번호 입니다.</p><p>아래의 비밀번호를 통해 로그인 한후 <b>마이페이지 > 나의계정 > 비밀번호 설정</b> 을통해 비밀번호를 변경해주세요</p><h2>"+random+"</h2>"                     //내용
    });

    res.send(
      "<script>alert('새 비밀번호가 전송되었습니다.'); window.location='/login'</script>"
    );
  }catch(err){
    console.error(err);
    next(err);
  }
});

//회원가입 눌렀을 때
router.get('/auth', isNotLoggedIn, async(req,res,next)=>{
  try{ 
    res.render('home/auth');
  }catch(err){
    console.error(err);
    next(err);
  }
});



module.exports = router;