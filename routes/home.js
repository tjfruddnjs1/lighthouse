const express = require('express');
const passport = require('passport');
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