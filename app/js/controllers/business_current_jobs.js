angular.module("app").controller('BusinessCurrentJobsController', function($scope, $location, AuthenticationService, $log, BusinessUserService, JobResource) {

  $scope.user = BusinessUserService.getUser;

  $scope.currentJobs = JobResource.getCurrentJobs($scope.user);

  


});
