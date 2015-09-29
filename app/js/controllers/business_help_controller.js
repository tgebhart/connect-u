angular.module("app").controller('BusinessHelpController', function($scope, $timeout, $cookies, $http, $location, AuthenticationService, $log, $templateCache, BusinessUserService, JobResource) {
  $scope.cookieCompany = '';
  if($cookies.get('company')){
      $scope.cookieCompany = $cookies.get('company');
  }

});
