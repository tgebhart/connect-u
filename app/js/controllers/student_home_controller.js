angular.module("app").controller('StudentHomeController', function($scope, $location, $cookies, AuthenticationService, $log) {

  $scope.title = "Home";
  $scope.message = "Stuff";

  var onLogoutSuccess = function(response) {
    $location.path('/login');
  };

  $scope.logout = function() {
    AuthenticationService.logout().success(onLogoutSuccess);
  };


  $scope.hello = function(){
    $log.log('hey');
  };
});
