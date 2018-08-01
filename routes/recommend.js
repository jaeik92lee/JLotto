var express = require('express');
var router = express.Router();
var recommendVO = require('./../models/RecommendVO');

/****************************
 *      Recommend DATA      *
 ****************************/
router.post('/insert', function(req, res, next) { 
    console.log("[ RECOMMEND ROUTER ]");
    var datas = req.body;
    
    recommendVO.insertRecommend(datas, function(err, rows) { 
        console.log(datas);
        if(err) res.json(err);
        else res.json(rows);
    });
});

module.exports = router;
