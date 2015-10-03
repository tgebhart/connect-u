angular.module("app").controller('StudentJobsController', function($scope, $location, $cookies, AuthenticationService, $log, JobService, JobResource) {

  $scope.cookieFirstName = '';
  if($cookies.get('firstname')){
      $scope.cookieFirstName = $cookies.get('firstname');
  }

    $scope.jobsLoaded = false;
    $scope.currentJobs = {};
    $scope.jobTitle = [];
    $scope.uploadCompany = [];
    $scope.description = [];
    $scope.numJobs = 0;

    JobResource = new JobResource();

    JobResource.getAllJobs(function(callback) {
        $scope.numJobs = callback.length;
        $scope.currentJobs = callback;
        for (i=0; i < callback.length; i++){
          $scope.jobTitle[i] = callback[i].title.S;
          $scope.uploadCompany[i] = callback[i].upload_company.S;
          $scope.description[i] = callback[i].description.S;
        }
            $scope.jobsLoaded = true;
    });

    $scope.clickView = function(job) {
      JobService.setJob(job);
      $location.path('/student/view-job');
    };



});
