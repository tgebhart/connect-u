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

var StudentUserProvider = function() {};


StudentUserProvider.prototype.login = function(user, callback) {
  var queryParams = {
    'TableName': 'business_users',
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
      return callback(null, user_collection);
    }
  });
};









module.exports = StudentUserProvider;
