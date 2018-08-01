var express = require('express');
var router = express.Router();
var lotto = require('./../models/LottoVO');

/************************
 *      TOTAL DATA      *
 ************************/
router.get('/sum/total', function(req, res, next) { 
  lotto.getSumTotal([], function(err, rows) {
    if(err) res.json(err);
    else res.json(rows);
  });
});

router.get("/avg/total", function(req, res, next) {
  lotto.getAvgTotal([], function(err, rows) {
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
router.get("/legends/tentimes", function(req, res, next) {
  lotto.getTentimesLegends([], function(err, rows) {
    if(err) res.json(err);
    else res.json(rows);
  });
});

router.get("/oddeven/tentimes", function(req, res, next) {
  lotto.getTentimesOddEven([], function(err, rows) {
    if(err) res.json(err);
    else res.json(rows);
  });
});

router.get("/lowhigh/tentimes", function(req, res, next) {
  lotto.getTenTimesLowHigh([], function(err, rows) {
    if(err) res.json(err);
    else res.json(rows);
  });
});

router.get("/remain/tentimes", function(req, res, next) {
  lotto.getTenTimesRemain([], function(err, rows) {
    if(err) res.json(err);
    else res.json(rows);
  });
});



router.get('/no', function(req, res, next) {
  lotto.getNoOrder([], function(err, rows) {
    if(err) res.json(err);
    else {
      var orders = [],
          lastOrder=1, currentOrder=1;
          
      rows.map(function(order) {
        currentOrder = order.lorder;
        console.log(lastOrder + " / " + currentOrder);
        for( var i=lastOrder ; i<currentOrder ; i++ ) {
          if( i == currentOrder ) {
            break;
          }
          orders.push(i);
        }

        lastOrder = currentOrder + 1;
      });      

      console.log("[ ORDERS ]");      
      // console.log(orders);
    }
  });
});

module.exports = router;
