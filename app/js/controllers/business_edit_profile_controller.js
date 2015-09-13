angular.module("app").controller('BusinessEditProfileController', function($scope, $location, AuthenticationService, $log, testService) {

  var awsTest = function() {
    testService.scanTable();
  };

});
