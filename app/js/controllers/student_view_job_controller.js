angular.module("app").controller('StudentViewJobController', function($scope, $timeout, $cookies, $http, $location, AuthenticationService, $log, $templateCache, JobService, JobResource) {

  $scope.cookieFirstName = '';
  if($cookies.get('firstname')){
      $scope.cookieFirstName = $cookies.get('firstname');
  }
$scope.job = {};
$scope.clickedJob = JobService.getJob();
$scope.job = $scope.clickedJob;
console.log($scope.job);
$scope.job.deadline.S = new Date($scope.clickedJob.deadline.S);

$scope.back = function() {
  $location.path('/student/home');
};

$scope.accept = function() {
  JobService.setJob($scope.job);
  $location.path('/student/accept-job-page');
};

});
