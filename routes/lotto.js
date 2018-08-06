var express = require('express');
var router = express.Router();
var lotto = require('./../models/LottoVO');

/************************
 *      TOTAL DATA      *
 ************************/
router.get('/total/datas', function(req, res, next) { 
  lotto.getTotalDatas([], function(err, rows) {
    if(err) res.json(err);
    else res.json(rows);
  });
});
 
router.get("/legends", function(req, res, next) {
  lotto.getLegend([], function(err, rows) {
    if(err) res.json(err);
    else res.json(rows);
  });
});


/************************
 *    TEN TIMES DATA    *
 ************************/
router.get("/tentimes/legends", function(req, res, next) {
  lotto.getTentimesLegends([], function(err, rows) {
    if(err) res.json(err);
    else res.json(rows);
  });
});
 
router.get("/tentimes/datas", function(req, res, next) {
  lotto.getTentimesDatas([], function(err, rows) {
    if(err) res.json(err);
    else res.json(rows);
  });
});

module.exports = router;
