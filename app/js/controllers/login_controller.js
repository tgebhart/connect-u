angular.module("app").controller('LoginController', function($scope, $location, $cookies, AuthenticationService, BusinessUserService, $log) {
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
          BusinessUserService.setUser(callback.Items[0]);

          _.forEach(callback.Items[0], function(element){
            if(element.S !== undefined){
              $cookies.put(element, element.S);
            }
          });
          $location.path('/business/home');
        }
        if(callback.Items[0].year !== undefined) {
          BusinessUserService.setUser(callback.Items[0]);

          _.forEach(callback.Items[0], function(element){
            if(element.S !== undefined){
              $cookies.put(element, element.S);
            }
          });
          $location.path('/student/home');
        }
      }
      else {
        $scope.loginUnsuccessful = true;
      }
    });
  };

});
