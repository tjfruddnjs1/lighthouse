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
        console.log(title)
        fs.readFile('public/asset/front.json', 'utf-8', (err, jsonFile) => {
            // console.log(jsonFile)

            jsonData = JSON.parse(jsonFile)
            console.log(jsonData)

            sendJson = jsonData[title]
            res.render('job_seeking/job_desc', sendJson);

        })

    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;