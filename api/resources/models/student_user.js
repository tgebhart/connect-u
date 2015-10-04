var AWS = require('aws-sdk');
var dbTypes = require('dynamodb-data-types');

AWS.config.update({
  region: 'us-east-1'
});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:a2ea0582-a643-4139-b974-30264823160b',
});

var db = new AWS.DynamoDB({
  region: 'us-west-2'
});

var bucket = new AWS.S3({ params: { Bucket: 'student-extra-info' } });

var StudentUserProvider = function() {};
var user_collection = {};

StudentUserProvider.prototype.login = function(user, callback) {
  var queryParams = {
    'TableName': 'student_users',
    'IndexName': 'username-index',
    'KeyConditions': {
      'username': {
        'ComparisonOperator': 'EQ',
        'AttributeValueList': [{
          'S': user.username
        }, ],
      },
    },
    'Select': 'ALL_ATTRIBUTES'
  };
  db.query(queryParams, function(error, user_collection) {
    if (error) {
      console.log('aws login error', error);
      return callback(error);
    } else {
      return callback(null,user_collection);
    }
  });
};

StudentUserProvider.prototype.uploadExtraInfo = function(params, callback) {
  var bucket = new AWS.S3({ params: { Bucket: 'student-extra-info' } });
  bucket.putObject(params, function(err, data) {
    if(err){
      console.log('error', err);
      return callback(err);
    }
    else {
      return callback(null);
    }
  });
};

StudentUserProvider.prototype.uploadProfilePic = function(params, callback) {
  var bucket = new AWS.S3({ params: { Bucket: 'student-profile-pics'} });
  bucket.putObject(params, function(err, data) {
    if(err){
      console.log('error', err);
      return callback(err);
    }
    else {
      return callback(null);
    }
  });
};

StudentUserProvider.prototype.getAllUsers = function(scanParams, callback) {
  db.scan(scanParams, function(error, user_collection){
    if(error){
      console.log('error', error);
      return callback(error);
    }
    else {
      return callback(null, user_collection);
    }
  });
};

StudentUserProvider.prototype.createUser = function(info, callback) {
  db.putItem(info, function(err, data) {
    if (err) {
      console.log('aws unable to add', err);
      return callback(err);
    }
    else {
      return callback(null);
    }
  });
};

StudentUserProvider.prototype.editUser = function(user, callback) {
  db.updateItem(params, function(err, data) {
    if(err) {
      console.log('error', err);
      return callback(err);
    }
    else {
      return callback(null);
    }
  });
};

StudentUserProvider.prototype.getUser = function(user, callback) {
  var queryParams = {
    'TableName': 'student_users',
    'IndexName': 'username-index',
    'KeyConditions': {
      'username': {
        'ComparisonOperator': 'EQ',
        'AttributeValueList': [{
          'S': user
        }, ],
      },
    },
    'Select': 'ALL_ATTRIBUTES'
  };
  db.query(queryParams, function(err, data) {
    if(err) {
      console.log('err', err);
      return callback(err);
    }
      else {
      return callback(data);
    }
  });
};

StudentUserProvider.prototype.acceptJob = function(params, callback) {
  console.log('params', params.title);
  var jobParams = {
    "TableName": "jobs",
    "Key": {
      "title" : {"S": params.title},
    },
    "AttributeUpdates": {
      "current_workers": {
      "Action": "PUT",
      "Value": {"M": {
        "job": {"S" : params.position},
        "user": {"S" : params.username},
        "pic" : {"S": params.pic}
      }
    }
  },
},
  };
  db.updateItem(jobParams, function(err, data) {
    if(err) {
      console.log('error', err);
      return callback(err);
    }
    else {
      return callback(true);
    }
  });
};


module.exports = StudentUserProvider;
