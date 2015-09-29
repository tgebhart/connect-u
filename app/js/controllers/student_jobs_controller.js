angular.module("app").controller('StudentJobsController', function($scope, $location, $cookies, AuthenticationService, $log, BusinessUserService) {
  $scope.cookieFirstName = '';
  if($cookies.get('firstname')){
      $scope.cookieFirstName = $cookies.get('firstname');
  }

  $scope.hello = function(){
    $location.path('/business/new-job');
  };

});
