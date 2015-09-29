angular.module("app").controller('AddJobsController', function($scope, $location, $cookies, AuthenticationService, $log, BusinessUserService) {
  $scope.cookieCompany = '';
  if($cookies.get('company')){
      $scope.cookieCompany = $cookies.get('company');
  }
  console.log($scope.cookieUser);
  $scope.hello = function(){
    $location.path('/business/new-job');
  };

});
