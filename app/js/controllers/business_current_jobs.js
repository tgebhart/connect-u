angular.module("app").controller('BusinessCurrentJobsController', function($scope, $location, AuthenticationService, $log, BusinessUserService, JobResource) {

  var userModel = {
    'user': {
      'name': 'test',
      'company': 'testco'
    }
  };
  BusinessUserService.setUser(userModel);
  JobResource = new JobResource();
  $scope.user = BusinessUserService.getUser();
  console.log('scope.user', $scope.user);

  $scope.currentJobs = JobResource.getCurrentJobs($scope.user, function(callback) {
      console.log('current jobs', callback);
  });






});
