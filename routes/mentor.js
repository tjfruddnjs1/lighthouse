const express = require('express');
const router = express.Router();
const Mentor = require('../models/mentor');

router.get('/', async (req, res, next) => {
    try {
      res.render('home/mentor');
    } catch (err) {
      console.error(err);
      next(err);
    }
});

router.post('/', async(req, res, next) => {    
    const {username, gender, firm, department, career, field, email, intro, path} = req.body;
    try{
        const mentor = await Mentor.findOne({
            where : {
                username
            }
        });
        if(mentor){
            return res.send("<script>alert('이미 등록된 회원입니다')</script>");
        }
        await Mentor.create({
            username, gender, firm, department, career, field, email, intro, path
        });        
        return res.redirect('/home/');
    }catch(err){
        console.error(err);
        return next(err);
    }
})

module.exports = router;