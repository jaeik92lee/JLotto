var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {  
  res.render("index");
});

router.get("/recommend", function(req, res, next) {
  res.render("recommend");
});


module.exports = router;

