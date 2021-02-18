const express = require('express');
const router = express.Router();
const passport = require('passport');
const Mentor = require('../models/mentor');
const MentorJob = require('../models/mentorJob');
const MentorLang = require('../models/mentorLang');
const User = require('../models/user');
const Lang = require('../models/lang');
const Job = require('../models/job');
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
    const userInfo = req.user;    
    try {
      const user = await User.findOne({ // user 반환
        where : {
            id : userInfo.id,
        }
      });      
      const mentor = await Mentor.findOne({ 
            where : {
                user_id : userInfo.id,
            }
      });
      if(mentor){
        res.render('mentor/mentor',{mentor : mentor, user : user});
      }
      res.render('mentor/mentor',{user : user, mentor : ''});
    } catch (err) {
      console.error(err);
      next(err);
    }
});



router.get('/fields', isLoggedIn,  async (req, res, next) => {
    const user = req.user;    
    try {
        const jobs = await Job.findAll({});          
        const langs = await Lang.findAll({});                  
        const mentor = await Mentor.findOne({            
            where : {
                user_id : user.id,
            }
        });  
        
        if(mentor){
            const mentorJobs = await MentorJob.findAll({
                where : {
                    mentor_id : mentor.mentor_id
                }
            });
            const mentorLangs = await MentorLang.findAll({
                where : {
                    mentor_id : mentor.mentor_id
                }
            });
            res.render('mentor/mentorField', {mentorJobs : mentorJobs, mentorLangs : mentorLangs, jobs : jobs, langs : langs });
        }                
        res.render('mentor/mentorField', {jobs : jobs, langs : langs, mentorJobs : '', mentorLangs : ''});
      } catch (err) {
        console.error(err);
        next(err);
      }
})

router.post('/' , upload.single('image'), isLoggedIn, async(req, res, next) => {         
    const {phone, gender ,firm, department, career, intro} = req.body;  
    const userInfo = req.user;                
    
    try{        
        
        if(!req.file){
            await User.update({
                phone, gender, // 칼럼 이름 수정 예정                 
            },{
                where : {id : userInfo.id}
            })  
           
        }else{
            let route = req.file.path;   // 파일 경로
            route = route.substring(6);  
            await User.update({
                phone, gender, // 칼럼 이름 수정 예정
                path : route, 
            },{
                where : {id : userInfo.id}
            })  
        }
        
        const mentor = await Mentor.findOne({ 
            where : {
                user_id : userInfo.id
            }
        });        
        if(mentor){ // 해당 mentor가 있으면              
                await Mentor.update({
                    mentor_firm : firm, 
                    mentor_department : department, 
                    mentor_career : career, 
                    mentor_intro : intro,                                                     
                }, {
                    where : { mentor_id : mentor.mentor_id}
                });                     
        }else{            
            await Mentor.create({
                mentor_firm : firm, 
                mentor_department : department, 
                mentor_career : career, 
                mentor_intro : intro,   
                user_id : userInfo.id,                             
            }); 
        }      
                      
        res.redirect('/register/fields');        
    }catch(err){
        console.error(err);
        return next(err);
    }
});

router.post('/fields' , isLoggedIn, async(req, res, next) => {         
    let {job, lang} = req.body;    
    console.log(job);
    console.log(lang);
    const user = req.user;            
    try{
        const mentor = await Mentor.findOne({ // 여기서 멘토 아이디 가져옴
            where : {user_id : user.id}
        });                          
        const mentorJob = await MentorJob.findOne({
            where : {mentor_id : mentor.mentor_id}
        });

        const mentorLang = await MentorLang.findOne({
            where : {mentor_id : mentor.mentor_id}
        });
        if(mentorJob && mentorLang){
            await MentorJob.destroy({                
                where : {mentor_id : mentor.mentor_id},
            });
            await MentorLang.destroy({                
                where : {mentor_id : mentor.mentor_id},
            });
                  
        }else if(mentorJob && !mentorLang){
            await MentorJob.destroy({                
                where : {mentor_id : mentor.mentor_id},
            })         
        }else if(!mentorJob && mentorLang){
            await MentorLang.destroy({                
                where : {mentor_id : mentor.mentor_id},
            });        
        }

        for(let i =0; i<job.length; i++){
            await MentorJob.create({                
                mentor_id : mentor.mentor_id,
                job_id : job[i]
            });                        
        }                
        for(let i =0; i<lang.length; i++){
            await MentorLang.create({
                mentor_id : mentor.mentor_id,
                lang_id : lang[i],     
            });                        
        }         
            // const jobResult = await Promise.all(
            //     job.map(id => {                    
            //         return Job.findOne({
            //             where : {job_id : id},
            //         })
            //     }),
            // );            
            // const langResult = await Promise.all(
            //     lang.map(id => {                    
            //         return Lang.findOne({
            //             where : {lang_id : id},
            //         })
            //     }),
            // );            
            
            // const jobs = await mentor.addJobs(jobResult.map(r => r.job_id));                                                
            // const langs = await mentor.addLangs(langResult.map(r => r.lang_id));                                                            
            // console.log(jobs);
            res.send(
                "<script>alert('멘토 등록 되었습니다.'); window.location = '/';</script>"
            );                                                 
       
    }catch(err){
        console.error(err);
        return next(err);
    }
})

module.exports = router;