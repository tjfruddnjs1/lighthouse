const express = require('express');
const router = express.Router();
const passport = require('passport');
const Mentor = require('../models/mentor');
const MentorJob = require('../models/mentorJob');
const MentorLang = require('../models/mentorLang');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');


router.use((req,res,next)=>{
    res.locals.user = req.user;
    
    next();
});

// upload 폴더 생성
try{
    fs.readdirSync('public/images/uploads');        
}catch(error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('public/images/uploads');
}

// 파일 관리 
const upload = multer({
    storage: multer.diskStorage({
        destination(req,file, done){
            done(null, 'public/images/uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits : {fileSize : 5 * 1024 * 1024},
});

router.get('/', isLoggedIn, async (req, res, next) => {
    const user = req.user;    
    try {
      const mentor = await Mentor.findOne({
            where : {
                user_id : user.id,
            }
      });
      if(mentor){
        res.send(
            "<script type='text/javascript'>alert('이미 등록된 회원입니다.'); history.back(-1);</script>"
        );  
      }
      res.render('mentor/mentor',{mentor : mentor});
    } catch (err) {
      console.error(err);
      next(err);
    }
});

router.get('/fields',  isLoggedIn, async (req, res, next) => {
    const user = req.user;    
    try {
        const mentor = await Mentor.findOne({            
            where : {
                user_id : user.id,
            }
        });  
        console.log(mentor);
        res.render('mentor/mentorField');
      } catch (err) {
        console.error(err);
        next(err);
      }
})

router.post('/',  upload.single('image'),isLoggedIn, async(req, res, next) => {            
    const {username, gender, firm, department, career, email, intro} = req.body;        
    let route = req.file.path;   // 파일 경로
    route = route.substring(6);    
    const user = req.user;
    try{
        const mentor = await Mentor.findOne({
            where : {
                username
            }
        });        
        if(mentor){             
            res.send(
                "<script type='text/javascript'>alert('이미 등록된 회원입니다.'); history.back(-1);</script>"
            );            
        }        
        await Mentor.create({
            username, gender, firm, department, career, email, intro, 
            path : route,
            user_id : user.id
        }); 

        res.redirect('/register/fields')        
    }catch(err){
        console.error(err);
        return next(err);
    }
});

router.post('/fields', isLoggedIn, async(req, res, next) => {            
    const {job, lang} = req.body;
    const user = req.user;            
    try{
        const mentor = await Mentor.findOne({ // 여기서 멘토 아이디 가져옴
            where : {
                user_id : user.id,
            }
        });           
        console.log(mentor);
        if(!mentor){
            res.redirect('/');
        }        
        if(lang){
            for(let i =0; i<job.length; i++){
                await MentorJob.create({                
                    mentor_id : mentor.id,
                    job_id : job[i]
                });                        
            }
        }
        
        for(let i =0; i<lang.length; i++){
            await MentorLang.create({
                mentor_id : mentor.id,
                lang_id : lang[i],     
            });                        
        }        
        res.send(
            "<script>alert('멘토 등록 되었습니다.'); window.location = '/';</script>"
        );
    }catch(err){
        console.error(err);
        return next(err);
    }
})

module.exports = router;