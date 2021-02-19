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


router.get('/:id', isLoggedIn, async (req, res, next) => {
    const {id} = req.params;      
    console.log("mentor_id : " + id );
    console.log("user : " + req.user.id );
    try {                                
        const user = await User.findOne(
            {
                include : [Mentor],
                where : {id : req.user.id}
            }
        );        
        if(user){            
            await user.addMentors(parseInt(id));                          
            res.json({result : 'follow'});
        }else{
            res.status(404).send('해당 사용자가 없습니다.');
        }   
    } catch (err) {
      console.error(err);
      next(err);
    }
});

router.get('/unfollow/:id', isLoggedIn, async (req, res, next) => {
    const {id} = req.params;      
    console.log("mentor_id : " + id );
    console.log("user : " + req.user.id );

    try {                                
        const user = await User.findOne(
            {
                include : [Mentor],
                where : {id : req.user.id}
            }
        );        
        if(user){            
            await user.removeMentors(parseInt(id));                          
            res.json({result : 'quit'});
        }else{
            res.status(404).send('해당 사용자가 없습니다.');
        }
    } catch (err) {
      console.error(err);
      next(err);
    }
});



module.exports = router;