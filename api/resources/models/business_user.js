var AWS = require('aws-sdk');
var dbTypes = require('dynamodb-data-types');

AWS.config.update({region:'us-east-1'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:a2ea0582-a643-4139-b974-30264823160b',
});

var db = new AWS.DynamoDB({region:'us-west-2'});

var BusinessUserProvider = function(){
};

var user_collection = {};

BusinessUserProvider.prototype.getAllUsers = function(callback) {
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

BusinessUserProvider.prototype.createUser = function(info, callback) {
  db.putItem(info, function(err, data) {
    if (err) {
      console.log('aws unable to add', err);
      return callback(error);
    }
    else {
      return callback(null);
    }
  });
};

BusinessUserProvider.prototype.editUser = function(user, callback) {
  db.putItem(info, function(err, data) {
    if(error){
      console.log('editUser error', error);
      return callback(error);
    }
    else {
      return callback(null);
    }
  });
};




module.exports = BusinessUserProvider;
