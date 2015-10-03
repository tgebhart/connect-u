var express = require('express');
var router = express.Router();
var parser = require('body-parser');
var busboy = require('connect-busboy');
var BusinessUserProvider = require('../resources/models/business_user.js');
var StudentUserProvider = require('../resources/models/student_user.js');
var JobProvider = require('../resources/models/job.js');

BusinessUserProvider = new BusinessUserProvider();
JobProvider = new JobProvider();
StudentUserProvider = new StudentUserProvider();

router.use(parser.urlencoded({extended: true }));

var jsonParser = parser.json();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/api/login', jsonParser, function(req, res, next) {
  console.log('req.body', req.body);
  BusinessUserProvider.login(req.body, function(err, user) {
    if(err) {
      console.log('err', err);
    }
    else {
      if(user.Count === 0){
      StudentUserProvider.login(req.body, function(error, user) {
        if(error) {
          console.log('login err', error);
          res.send('login error');
        }
        else {
          res.send(user);
        }
      });
    }
    else {
      res.send(user);
    }
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

router.post('/api/business/edit-job', jsonParser, function(req, res, next) {
  JobProvider.updateJob(req.body, function(err) {
    if(err) {
      console.log('index', err);
    }
    else {
      res.send('job posted');
    }
  });
});




//==================Student============================//





router.post('/api/student/edit-profile', function(req, res, next) {
  StudentUserProvider.editUser(req.body, function(err) {
    if (err) {
      console.log('index', err);
    } else {
      res.send('user edit successful');
    }
  });
});

router.post('/api/student/create-profile', function(req, res, next) {
  StudentUserProvider.createUser(req.body, function(err) {
    if (err) {
      console.log('index', err);
    } else {
      res.send('user created');
    }
  });
});

router.post('/api/student/upload-extra-info', jsonParser, function(req, res, next) {
  StudentUserProvider.uploadExtraInfo(req.body, function(err) {
    if (err) {
      console.log('index', err);
    } else {
      res.send('extra info uploaded');
    }
  });
});

router.post('/api/student/upload-profile-pic', jsonParser, function(req, res, next) {
  StudentUserProvider.uploadProfilePic(req.body, function(err) {
    if (err) {
      console.log('index', err);
    } else {
      res.send('prof pic uploaded');
    }
  });
});

router.post('/api/student/get-job', jsonParser, function(req, res, next) {
  JobProvider.postJob(req.body, function(err) {
    if (err) {
      console.log('index', err);
    } else {
      res.send('job posted');
    }
  });
});

router.get('/api/get-all-jobs', jsonParser, function(req, res, next) {
  JobProvider.getAllJobs(function(data, err) {
    if(err) {
      console.log('index', err);
    }
    else {
      res.send(data);
    }
  });
});

router.get('/api/student/get-user', jsonParser, function(req, res, next) {
  console.log('reqbody', req.query.user);
  StudentUserProvider.getUser(req.query.user, function(data, err) {
    if(err) {
      console.log('index', err);
    }
    else {
      res.send(data);
    }
  });
});

router.post('/api/student/accept-job', jsonParser, function(req, res, next) {
  StudentUserProvider.acceptJob(req.body, function(err) {
    if (err) {
      console.log('index', err);
    } else {
      res.send('student job accepted');
    }
  });
});




module.exports = router;
