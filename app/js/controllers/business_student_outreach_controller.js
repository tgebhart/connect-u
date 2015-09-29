angular.module("app").controller('BusinessStudentOutreachController', function($scope, $location, $cookies, AuthenticationService, $log) {
  $scope.cookieCompany = '';
  if($cookies.get('company')){
      $scope.cookieCompany = $cookies.get('company');
  }

});
