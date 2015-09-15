var AWS = require('aws-sdk');
var dbTypes = require('dynamodb-data-types');

AWS.config.update({region:'us-east-1'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:a2ea0582-a643-4139-b974-30264823160b',
});

var db = new AWS.DynamoDB({region:'us-west-2'});

var BusinessUserProvider = function(){
};

var scanParams = {
    TableName: 'test',
        // more conditions ...
    //Select: 'ALL_ATTRIBUTES', // optional (ALL_ATTRIBUTES | ALL_PROJECTED_ATTRIBUTES |
                              //           SPECIFIC_ATTRIBUTES | COUNT)
    AttributesToGet: [ // optional (list of specific attribute names to return)
        'title',
        // ... more attributes ...
    ],
};


var user_collection = {};

BusinessUserProvider.prototype.getAllUsers = function(callback) {
  db.scan(scanParams, function(error, user_collection){
    if(error){
      console.log('error', error);
      return callback(error);
    }
    else {
      console.log('user collection:', user_collection);
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
      console.log('aws succeeded in adding', info.firstname);
      return callback(null);
    }
  });
};

BusinessUserProvider.prototype.editUser = function(user, callback) {



  if(error){
    console.log('editUser error', error);
    return callback(error);
  }
  else {
    console.log('edited user: ', user);
    return callback(null);
  }
};




module.exports = BusinessUserProvider;
