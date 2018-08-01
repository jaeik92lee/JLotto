var express = require('express');
var router = express.Router();
var lotto_crawler = require('./lotto_num_crawler');

/* GET home page. */
router.get('/', function(req, res, next) {
  // lotto_crawler.run();  
  res.render('index', { title: 'Express' });
});

var remain = (function(){
  const START_NUM = 1,
        END_NUM = 817;

  const getRemainNum = (orders) => {
    var visited = [],
        result = [];

    for( var i=START_NUM ; i<=END_NUM + 1 ; i++ ) {
      visited.push(0);
    }

    for( var i=0 ; i<orders.length ; i++ ) {
      visited[orders[i]] = 1;
    }

    for( var i=START_NUM ; i<=END_NUM ; i++ ) {
      if(visited[i] == 0 ) result.push(i);
    }

    return result;
  }

  return { getRemainNum }
}());


router.post("/crawler/lotto/num", function(req, res, next) {
  console.log("[ INDEX CRALWER LOTTO NUMS ]");
  var orders = req.body["order[]"];
      result = remain.getRemainNum(orders);
  
  console.log("[ RESULT LENGTH ]");
  console.log(result.length);    

  if( result.length > 10 ) {
    for( var i=0 ; i<10 ; i++ ) {
      lotto_crawler.run(result[i]);
    }    
  } else {
    for( var i=0 ; i<result.length ; i++ ) {
      lotto_crawler.run(result[i]);
    }
  }
  
  // result.map(function(order) {
  //   console.log("[ INSERT ORDER ]: " + order);
  //   setTimeout(function() {
  //     console.log("timeout")
  //     lotto_crawler.run(order);   
  //   }, 100);
     
  // });

  // lotto_crawler.run(774);
  res.json(result);

});
module.exports = router;

