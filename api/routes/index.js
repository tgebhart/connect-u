var express = require('express');
var router = express.Router();
var parser = require('body-parser');
var busboy = require('connect-busboy');
var ArticleProvider = require('../resources/models/test.js');
var BusinessUserProvider = require('../resources/models/business_user.js');
var JobProvider = require('../resources/models/job.js');

ArticleProvider = new ArticleProvider();
BusinessUserProvider = new BusinessUserProvider();
JobProvider = new JobProvider();

router.use(parser.urlencoded({extended: true }));

var jsonParser = parser.json();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/api/test', function(req, res, next) {
  ArticleProvider.scanTable(function(err, articleCollection) {
    if (err) {
      console.log('index', err);
    } else {
      res.send(articleCollection);

    }

  });
});

router.post('/api/business/edit-profile', function(req, res, next) {
  BusinessUserProvider.editUser(req.createParams, function(err) {
    if (err) {
      console.log('index', err);
    } else {
      res.send('user created');
    }
  });
});

router.post('/api/business/create-profile', function(req, res, next) {
  BusinessUserProvider.createUser(req.body, function(err) {
    if (err) {
      console.log('index', err);
    } else {
      res.send('user created');
    }
  });
});

router.post('/api/business/upload-extra-info', jsonParser, function(req, res, next) {
  JobProvider.extraUpload(req.body, function(err) {
    if (err) {
      console.log('index', err);
    } else {
      res.send('extra info uploaded');
    }
  });
});

router.post('/api/business/upload-new-job', jsonParser, function(req, res, next) {
  console.log('request body',req.body);
  JobProvider.postJob(req.body, function(err) {
    if (err) {
      console.log('index', err);
    } else {
      res.send('job posted');
    }
  });
});

router.get('/api/business/get-current-jobs', jsonParser, function(req, res, next) {
  JobProvider.getCurrentJobs(req.query.user, function(data, err) {
    if(err) {
      console.log('index', err);
    }
    else {
      res.send(data);
    }
  });
});

module.exports = router;
