var AWS = require('aws-sdk');
var _lodash = require('lodash');
var attr = require('dynamodb-data-types').AttributeValue;
AWS.config.update({region:'us-east-1'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:3a12800b-b3cb-4271-a355-b3c0aa716723',
});

testService = function() {
  this.db = new AWS.DynamoDB({region: 'us-west-2'});
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


testService.prototype.scanTable = function(callback) {
  db.scan(scanParams, function(error, test_return){
    if(error){
      console.log('error', error);
      callback(error);
    }
    else {
      callback(null, test_return);
      console.log('test return', test_return);
    }
  });
};
