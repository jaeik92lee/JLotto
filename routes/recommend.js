var express = require('express');
var router = express.Router();
var recommendVO = require('./../models/RecommendVO');

/****************************
 *      Recommend DATA      *
 ****************************/
router.post("/getall", function(req, res, next) {
    
    const MIN_RESULT_COUNT = 50;

    var params = [
        req.body.sum_start,
        req.body.sum_end,
        req.body.low,
        req.body.high,
        req.body.odd,
        req.body.even
    ];

    recommendVO.getAll(params, function(err, rows) {
        if(err) res.json(err);
        else {        
            if( rows.length < MIN_RESULT_COUNT ) res.json(rows);
                
            const   SECTION_COUNT = 10,
                    RANDOM_SELECT_COUNT = 5;

            var result      = [],
                section     = [],
                isContain   = [];

            var length = rows.length,
                start_num, end_num, random_idx;

            for( i=0 ; i<SECTION_COUNT ; i++ ) {
                start_num = 0;
                end_num = Math.floor(length / 5);

                section = [];
                for( var j=0 ; j<RANDOM_SELECT_COUNT ; j++ ) {
                    do {
                        random_idx = Math.ceil((Math.random() * end_num) + start_num);
                    } while(isContain.includes(random_idx));
                    
                    isContain.push(random_idx);

                    section.push(rows[random_idx]);
                    start_num += end_num;
                }

                result.push(section);
            }
            
            res.json(result);
        }
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
