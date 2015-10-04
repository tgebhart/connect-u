angular.module("app").controller('StudentAcceptJobController', function($scope, $timeout, $cookies, $http, $location, AuthenticationService, $log, $templateCache, StudentUserResource, JobService) {

  $scope.position = '';

  $scope.cookieFirstName = '';
  if($cookies.get('firstname')){
      $scope.cookieFirstName = $cookies.get('firstname');
  }

$scope.job = {};
$scope.clickedJob = JobService.getJob();
$scope.job = $scope.clickedJob;
console.log($scope.job);

$scope.formatDate  = new Date($scope.clickedJob.deadline.S);
$scope.mm = $scope.formatDate.getMonth();
$scope.dd = $scope.formatDate.getDate();
$scope.yyyy = $scope.formatDate.getUTCFullYear();
$scope.job.deadline.S = new Date($scope.clickedJob.deadline.S);

$scope.back = function() {
  $location.path('/student/home');
};

$scope.accept = function() {
  console.log($cookies.get('profile_pic_url'));
  StudentUserResource = new StudentUserResource();
  var acceptParams = {
    "title" : $scope.job.title.S,
    "username" : $cookies.get('username'),
    "position" :  $scope.position,
    "pic" : $cookies.get('profile_pic_url')
  };
  StudentUserResource.acceptJob(acceptParams);
  $location.path('/student/home');
};


});
