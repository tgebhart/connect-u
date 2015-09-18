var express = require('express');
var router = express.Router();
var ArticleProvider = require('../resources/models/test.js');
var BusinessUserProvider = require('../resources/models/business_user.js');
var JobProvider = require('../resources/models/job.js');

ArticleProvider = new ArticleProvider();
BusinessUserProvider = new BusinessUserProvider();
JobProvider = new JobProvider();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/api/test', function(req, res, next) {
  ArticleProvider.scanTable(function(err, articleCollection) {
    if (err) {
      console.log('Im mr meseeks', err);
    } else {
      console.log('in routes test', articleCollection);
      res.send(articleCollection);

    }

  });
});

router.post('/api/business/edit-profile', function(req, res, next) {
  BusinessUserProvider.editUser(req.createParams, function(err) {
    if (err) {
      console.log('Im mr createrror', err);
    } else {
      console.log('router success user created');
      res.send('user created');
    }
  });
});

router.post('/api/business/create-profile', function(req, res, next) {
  BusinessUserProvider.createUser(req.body, function(err) {
    if (err) {
      console.log('Im mr createrror', err);
    } else {
      console.log('router success user created');
      res.send('user created');
    }
  });
});

router.post('/api/business/upload-extra-info', function(req, res, next) {
  JobProvider.extraUpload(req.body, function(err) {
    if (err) {
      console.log('Im mr createrror', err);
    } else {
      console.log('router success user created');
      res.send('user created');
    }
  });
});


module.exports = router;
