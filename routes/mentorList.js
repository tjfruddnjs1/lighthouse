const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const MentorJob = require('../models/mentorJob');
const MentorLang = require('../models/mentorLang');
const Job = require('../models/job');
const Lang = require('../models/lang');
const User = require('../models/user');
const path = require('path');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.use((req,res,next)=>{
    res.locals.user = req.user;
    
    next();
});


router.get('/', async (req, res, next) => {         
    let mentors = {};   
    const user = req.user; 
    let {job} = req.query;   
    let {lang} = req.query;  
    let follows = [];          
    console.log(job);
    console.log(lang);
    
    
    try {
        const jobs = await Job.findAll({});
        const langs = await Lang.findAll({});
        
        if(user){            
            follows = await user.getMentors({attributes : ['follow.mentor_id'], where : parseInt(user.id)});
            if(follows){
                follows = follows.map(f => f.follow.mentor_id);            
            }
            
        }
                      
        if(job && !lang){
            mentors = await Mentor.findAll({
                include : [                    
                    {
                        model : MentorJob,
                        include : [Job],
                        where : {
                            '$MentoJobs.job_id$' : job,
                        }
                    },
                    {
                        model : MentorLang,
                        include : [Lang],
                        
                    },
                    {
                        model : User,
                        attributes : ['path', 'username'],                       
                    }                            
                ], 
                order : [['mentor_id', 'desc']],                               
            });                   
        }else if(!job && lang){
            mentors = await Mentor.findAll({
                include : [
                    {
                        model : MentorJob,
                        include : [Job],
                        
                    },
                    {
                        model : MentorLang,
                        include : [Lang],
                        where : {
                          '$MentoLangs.lang_id$' : lang,
                        }
                    },
                    {
                        model : User,
                        attributes : ['path', 'username'],                       
                    }        
                                        
                ],                
                order : [['mentor_id', 'desc']],
            });           
        }else if(job && lang){
            mentors = await Mentor.findAll({
                include : [
                    {
                        model : MentorJob,
                        include : [Job],
                        where : {
                            '$MentoJobs.job_id$' : job,
                        }
                    },
                    {
                        model : MentorLang,
                        include : [Lang],
                        where : {
                            '$MentoLangs.lang_id$' : lang,
                          }
                        
                    },
                    {
                        model : User,
                        attributes : ['path', 'username'],                       
                    }                   

                ],                
                order : [['mentor_id', 'desc']],
            });             
        }else{                        
            mentors = await Mentor.findAll({
                include : [                    
                    {
                        model : MentorJob,
                        include : [Job],
                    },
                    {
                        model : MentorLang,
                        include : [Lang],
                    },
                    {
                        model : User,
                        attributes : ['path', 'username'],                       
                    }                        
                ],                
                order : [['mentor_id', 'desc']],
            });                        
        }                
        
        // console.log(mentors[0].MentoJobs[0].Job.job);
        // console.log(mentors[0].MentoLangs[0].Lang.language);
      res.render('mentor/mentorList', {mentors : mentors, jobs : jobs, langs : langs, follows : follows});
    } catch (err) {
      console.error(err);
      next(err);
    }
});

router.get('/view/:id', async (req, res, next) => {
    let {id} = req.params;          
    try {            
        
        const mentorInfo = await Mentor.findOne({   
            include : [
               { 
                   model : User, 
                   attributes : ['username', 'path'], // 수정 예정                                       
               }
            ] ,                
            where : { mentor_id : id }
        });       
        const langs = await MentorLang.findAll({
            include : [Lang],
            where : {mentor_id : id}
        });
        const jobs = await MentorJob.findAll({
            include : [Job],
            where : {mentor_id : id}
        });        
        
        mentorInfo.intro = mentorInfo.mentor_intro.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n'); // 출력할 때 필요한 코드
        
        mentorInfo.career = mentorInfo.mentor_career.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n'); // 출력할 때 필요한 코드
        console.log(mentorInfo.intro);
      res.render('mentor/mentorView', {mentorInfo : mentorInfo, langs : langs, jobs : jobs});
    } catch (err) {
      console.error(err);
      next(err);
    }
});



module.exports = router;