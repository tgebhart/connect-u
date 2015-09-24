var AWS = require('aws-sdk');

AWS.config.update({region:'us-east-1'});
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:3a12800b-b3cb-4271-a355-b3c0aa716723',
});

var db = new AWS.DynamoDB({region: 'us-west-2'});

var ArticleProvider = function(){
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


var article_collection = {};

ArticleProvider.prototype.scanTable = function(callback){
  db.scan(scanParams, function(error, article_collection){
    if(error){
      console.log('error', error);
      return callback(error);
    }
    else {
      return callback(null, article_collection);
    }
  });
};


module.exports = ArticleProvider;
