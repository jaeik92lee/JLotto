var express = require('express');
var router = express.Router();
var lotto_crawler = require('./lotto_num_crawler');

/* GET home page. */
router.get('/', function(req, res, next) {
  // lotto_crawler.run();  
  res.render('index', { title: 'Express' });
});

module.exports = router;
