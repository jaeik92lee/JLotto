var express = require('express');
var router = express.Router();
var recommendVO = require('./../models/RecommendVO');

/****************************
 *      Recommend DATA      *
 ****************************/
router.post("/getall", function(req, res, next) {
    var params = [
        req.body.sum_start,
        req.body.sum_end,
        req.body.low,
        req.body.high,
        req.body.odd,
        req.body.even
    ];

    console.log("[ RECOMMEND ROUTER ]");
    console.log(params);

    recommendVO.getAll(params, function(err, rows) {
        if(err) res.json(err);
        else res.json(rows);
    });
});


 router.post('/insert', function(req, res, next) { 
    var datas = req.body;
    
    recommendVO.insertRecommend(datas, function(err, rows) { 
        console.log(datas);
        if(err) res.json(err);
        else res.json(rows);
    });
});



module.exports = router;
