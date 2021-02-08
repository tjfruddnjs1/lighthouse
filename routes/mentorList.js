const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');
const MentorJob = require('../models/mentorJob');
const MentorLang = require('../models/mentorLang');
const Job = require('../models/job');
const Lang = require('../models/lang');
const path = require('path');


router.get('/', async (req, res, next) => {         
    let mentors = {};
    let {job} = req.query;   
    let {lang} = req.query;    
    console.log(job);
    console.log(lang);
    let flag = true;      
    try {
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
                        
                    }                    
                ],                
                order : [['id', 'desc']],
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
                    }                    
                ],                
                order : [['id', 'desc']],
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
                        
                    }                    
                ],                
                order : [['id', 'desc']],
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
                    }                    
                ],                
                order : [['id', 'desc']],
            });                        
        }
        if(!mentors){
            flag = false;
            mentors = "해당되는 멘토가 없습니다.";
        }
        
        // console.log(mentors[0].MentoJobs[0].Job.job);
        // console.log(mentors[0].MentoLangs[0].Lang.language);
      res.render('mentor/mentorList', {mentors : mentors, flag : flag});
    } catch (err) {
      console.error(err);
      next(err);
    }
});

// 현재 안씀
router.get('/:job', async (req, res, next) => {
    let {job} = req.params;
    // let {lang} = req.params;
    // console.log("job 데이터 " + job);          
    // console.log("lang 데이터 " + lang);          
    try {
        const mentors = await Mentor.findAll({
            include : [Field, Language],
            where : {
                '$Fields.field$' : job
            }
        });                             
      res.render('mentor/mentorList', {mentors : mentors});
    } catch (err) {
      console.error(err);
      next(err);
    }
});

module.exports = router;