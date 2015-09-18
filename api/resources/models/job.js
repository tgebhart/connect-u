var AWS = require('aws-sdk');

AWS.config.update({region:'us-east-1'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:a2ea0582-a643-4139-b974-30264823160b',
});

var s3bucket = new AWS.S3({params: {Bucket: 'job-extra-info'}});


var JobProvider = function(){

};

JobProvider.prototype.extraUpload = function(params, callback) {
  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to myBucket/myKey");
    }
  });
};

















module.exports = JobProvider;
