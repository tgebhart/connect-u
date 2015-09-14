var express = require('express');
var router = express.Router();
var ArticleProvider = require('../resources/models/test.js');

/* GET users listing. */
router.get('/test', function(req, res, next) {
  ArticleProvider.scanTable(function(err, articleCollection){
    if (err){
      console.log('Im mr meseeks',err);
    } else {
      console.log('in routes test', articleCollection);
    }
    res.send('joes');
  });
});

module.exports = router;
