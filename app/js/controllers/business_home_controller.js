angular.module("app").controller('BusinessHomeController', function($scope, $location, AuthenticationService, $log) {
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
