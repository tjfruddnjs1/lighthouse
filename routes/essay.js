const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const fs = require('fs');

const router = express.Router();


// 개발자 이야기
router.get('/', async (req, res, next) => {
    try{
        console.log('request essay page')
        res.render('essay/essay_list')
    
    }
    catch(err){
        console.error(err, __dirname);
        next(err)
    }
});

module.exports = router;