angular.module("app").controller('StudentChooseUsernameController', function($scope, $location, $cookies, AuthenticationService, $log, StudentUserService, StudentUserResource) {

  $scope.cookieCompany = '';
  if($cookies.get('company')){
      $scope.cookieCompany = $cookies.get('company');
  }
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

    var createParams = StudentUserService.getPostParams();

    _.forEach(createParams.Item, function(value, thing) {
      console.log(thing);
      if(value.S === undefined){
        createParams.Item[thing] = {"S": "null"};
      }
    });

    createParams.Item["password"] = {"S" : $scope.user.password};
    createParams.Item["username"] = {"S" : $scope.user.username};


    checkUp(createParams, function(createParams) {
      StudentUserResource = new StudentUserResource();
      var createUser = StudentUserResource.create(createParams, function(val) {
        if (val) {
          StudentUserService.setPostParams(createParams);
          $location.path('/student/home');
        }

      });

    });

  };

});
