angular.module("app").controller('StudentHomeController', function($scope, $location, $cookies, AuthenticationService, $log) {

  $scope.cookieFirstName = '';
  if($cookies.get('firstname')){
      $scope.cookieFirstName = $cookies.get('firstname');
  }

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
