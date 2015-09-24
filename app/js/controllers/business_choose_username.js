angular.module("app").controller('BusinessChooseUsernameController', function($scope, $location, AuthenticationService, $log, BusinessUserService, BusinessUserResource) {

  $scope.user = {};


    var checkUp = function(createParams, callback) {
      _.forEach(createParams.Item, function(value, thing) {
        if(value.S === undefined){
          createParams.Item[thing] = {"S": "null"};
        }
      });
      callback(createParams);
    };

  $scope.login = function() {

    var createParams = BusinessUserService.getPostParams();

    _.forEach(createParams.Item, function(value, thing) {
      console.log(thing);
      if(value.S === undefined){
        createParams.Item[thing] = {"S": "null"};
      }
    });

    createParams.Item["password"] = {"S" : $scope.user.password};
    createParams.Item["username"] = {"S" : $scope.user.username};


    checkUp(createParams, function(createParams) {
      BusinessUserResource = new BusinessUserResource();
      var createUser = BusinessUserResource.create(createParams, function(val) {
        if (val) {
          BusinessUserService.setPostParams(createParams);
          $location.path('/business/home');
        }

      });

    });

  };

});
