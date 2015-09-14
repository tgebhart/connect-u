angular.module("app").controller('BusinessEditProfileController', function($scope, $location, AuthenticationService, $log, TestResource) {

  $scope.awsTest = function() {
    console.log('clicked');
    var testResource = TestResource.get();
    console.log('testResource:',testResource);

  };


});
