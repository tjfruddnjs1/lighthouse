const express = require('express');
const Job = require('../models/job');
const Essay = require('../models/essay')

const router = express.Router();


// 개발자 이야기
router.get('/', async (req, res, next) => {
    let jobs = await Job.findAll({})
    let essays = await Essay.findAll({
        order: [["essay_id", "DESC"]]
    });

    selectedCat = new Array(jobs.length)
    selectedCat = new Array(essays.length)

    for (let i = 0; i < selectedCat.length; i++) {
        selectedCat[i] = false
    }
    try {
        //'cat' means 'category'
        res.render('essay/essay_list', {
            jobs: jobs, selectedCat: selectedCat,
            essays: essays
        })
    }
    catch (err) {
        console.error(err, __dirname);
        next(err)
    }
});

module.exports = router;