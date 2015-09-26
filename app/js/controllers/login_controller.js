angular.module("app").controller('LoginController', function($scope, $location, AuthenticationService,  $log) {
  $scope.credentials = { username: "", password: "" };
  $scope.loginUnsuccessful = false;
  AuthenticationService = new AuthenticationService();

  var onLoginSuccess = function() {
    $location.path('/business/home');

  };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials, function(callback) {
      console.log('loginscope callback' ,callback);
      if(callback.Items[0] !== undefined) {
        if(callback.Items[0].company !== undefined) {
          $location.path('/business/home');
        }
        if(callback.Items[0].school !== undefined) {
          $location.path('/business/home');
        }
      }
      else {
        $scope.loginUnsuccessful = true;
      }
    });
  };

});
