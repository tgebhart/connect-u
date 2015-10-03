angular.module("app").controller('StudentAcceptJobController', function($scope, $timeout, $cookies, $http, $location, AuthenticationService, $log, $templateCache, StudentUserResource) {

  $scope.position = '';

  $scope.cookieFirstName = '';
  if($cookies.get('firstname')){
      $scope.cookieFirstName = $cookies.get('firstname');
  }

  $scope.setPosition = function(position) {
    $scope.position = position;
  };
$scope.job = {};
$scope.clickedJob = JobService.getJob();
$scope.job = $scope.clickedJob;
console.log($scope.job);
$scope.job.deadline.S = new Date($scope.clickedJob.deadline.S);

$scope.back = function() {
  $location.path('/student/home');
};

$scope.accept = function() {
  var acceptParams = {
    "title" : $scope.job.title,
    "username" : $cookies.get('username'),
    "position" :  $scope.position
  };
  StudentUserResource.acceptJob(acceptParams);
  $location.path('/student/accept-job-page');
};


});
