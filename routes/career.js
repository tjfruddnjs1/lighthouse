const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const fs = require('fs');

const router = express.Router();


// 직업 설명 페이지

router.get('/job_seeking/:title', async (req, res, next) => {
    try {
        let { title } = req.params;
        fs.readFile('public/asset/job_seeking/job.json', 'utf-8', (err, jsonFile) => {
            // console.log(jsonFile)

            jsonData = JSON.parse(jsonFile)
            // console.log(jsonData)

            sendJson = jsonData[title]

            if (title != 'edu')
                res.render('job_seeking/job_desc', sendJson);
            else
                res.render('job_seeking/job_desc_edu', sendJson);
            // res.render('job_seeking/new_desc', sendJson);

        })

    } catch (err) {
        console.error(err);
        console.log(__dirname)
        next(err);
    }
});

module.exports = router;