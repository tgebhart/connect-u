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

          $cookies.put('company', callback.Items[0].company.S);
          $cookies.put('company-description', callback.Items[0]['company-description'].S);
          $cookies.put('company-division', callback.Items[0]['company-division'].S);
          $cookies.put('email', callback.Items[0].email.S);
          $cookies.put('firstname', callback.Items[0].firstname.S);
          $cookies.put('lastname', callback.Items[0].lastname.S);
          $cookies.put('password', callback.Items[0].password.S);
          $cookies.put('phone', callback.Items[0].phone.S);
          $cookies.put('title', callback.Items[0].title.S);
          $cookies.put('username', callback.Items[0].username.S);
          $location.path('/business/home');
        }
        if(callback.Items[0].year !== undefined) {
          BusinessUserService.setUser(callback.Items[0]);

          $cookies.put('username', callback.Items[0].username.S);
          $cookies.put('firstname', callback.Items[0].firstname.S);
          $cookies.put('lastname', callback.Items[0].lastname.S);
          $cookies.put('email', callback.Items[0].email.S);
          $cookies.put('year', callback.Items[0].year.S);
          $cookies.put('major', callback.Items[0].major.S);
          $cookies.put('tagline', callback.Items[0].tagline.S);
          $cookies.put('profile_pic_url', callback.Items[0].profile_pic_url.S);

          $location.path('/student/home');
        }
      }
      else {
        $scope.loginUnsuccessful = true;
      }
    });
  };

});
