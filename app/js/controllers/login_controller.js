angular.module("app").controller('LoginController', function($scope, $location, AuthenticationService, $log) {
  $scope.credentials = { username: "", password: "" };

  var onLoginSuccess = function() {
    $location.path('/home');
  };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials).success(onLoginSuccess);
  };

});
