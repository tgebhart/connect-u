angular.module("app").controller('BusinessHomeController', function($scope, $location, $cookies, AuthenticationService, $log) {
  $scope.cookieCompany = '';
  if($cookies.get('company')){
      $scope.cookieCompany = $cookies.get('company');
  }

  $scope.title = "Home";
  $scope.message = "Stuff";
  $scope.profileDropdownState = false;

  var onLogoutSuccess = function(response) {
    $location.path('/login');
  };

  $scope.isToggled = function(){
    console.log($scope.profileDropdownState);
    $scope.profileDropdownState = !$scope.profileDropdownState;
  };

  $scope.logout = function() {
    AuthenticationService.logout().success(onLogoutSuccess);
  };
});
