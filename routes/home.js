const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const fs = require('fs');

const router = express.Router();

//session 유지를 위한 > passport module
router.use((req,res,next)=>{
  res.locals.user = req.user;
  next();
});

router.get('/', (req,res)=>{
  res.render('home/index');
});

//등 대 눌렀을때
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

//직업소개페이지 개요
router.get('/job_seeking/intro', async(req, res, next) => {
  try{
    res.render('job_seeking/intro');

  }catch(err){
    console.error(err);
    next(err);
  }
});

// 직업 설명 페이지
router.get('/job_seeking/:title', async(req, res, next) => {
  try{
    let {title} = req.params;
    console.log(title)
    fs.readFile('public/asset/front.json', 'utf-8', (err, jsonFile) => {
      // console.log(jsonFile)

      jsonData = JSON.parse(jsonFile)
      console.log(jsonData)

      sendJson = jsonData[title]
      res.render('job_seeking/job_desc', sendJson);

    })

  }catch(err){
    console.error(err);
    next(err);
  }
});

module.exports = router;