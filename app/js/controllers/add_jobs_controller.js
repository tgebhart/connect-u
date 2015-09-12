angular.module("app").controller('AddJobsController', function($scope, $location, AuthenticationService, $log) {

  $scope.hello = function(){
    $location.path('/business/new-job');
  };

});
