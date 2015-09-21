var AWS = require('aws-sdk');
var dbTypes = require('dynamodb-data-types');

AWS.config.update({region:'us-east-1'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:a2ea0582-a643-4139-b974-30264823160b',
});


var db = new AWS.DynamoDB({region:'us-west-2'});


var creds = {
bucket: 'job-extra-info',
};

var JobProvider = function(){
};

//AWS.config.update({ accessKeyId: creds.access_key, secretAccessKey: creds.secret_key });
//AWS.config.region = 'us-west-2';
var bucket = new AWS.S3({ params: { Bucket: creds.bucket } });




JobProvider.prototype.extraUpload = function(params, callback) {
  bucket.putObject(params, function(err, data) {
    if(err){
      console.log('error', err);
      return callback(err);
    }
    else {
      console.log('extra upload');
      return callback(null);
    }
  });
};


JobProvider.prototype.postJob = function(params, callback) {
  db.putItem(params, function(err, data) {
    if(err){
      console.log('error', err);
      return callback(err);
    }
    else {
      console.log('postJob');
      return callback(null);
    }
  });
};

JobProvider.prototype.getCurrentJobs = function(params, callback) {
  db.query(params, function(err, data) {
    if(eff) {
      console.log('err', err);
      return callback(err);
    }
    else {
      console.log('gotCurrentJobs on server');
      return callback(null);
    }
  });
};













module.exports = JobProvider;
