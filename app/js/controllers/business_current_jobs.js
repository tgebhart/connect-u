angular.module("app").controller('BusinessCurrentJobsController', function($scope, $location, $cookies, AuthenticationService, $log, BusinessUserService, JobService, JobResource) {

  $scope.cookieCompany = '';
  if($cookies.get('company')){
      $scope.cookieCompany = $cookies.get('company');
  }
  
  $scope.jobsLoaded = false;
  $scope.currentJobs = {};
  $scope.jobTitle = [];
  $scope.uploadCompany = [];
  $scope.description = [];
  $scope.numJobs = 0;
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

  JobResource.getCurrentJobs($scope.user, function(callback) {
      console.log('current jobs', callback);
      $scope.numJobs = callback.length;
      $scope.currentJobs = callback;
      for (i=0; i < callback.length; i++){
        $scope.jobTitle[i] = callback[i].title.S;
        $scope.uploadCompany[i] = callback[i].upload_company.S;
        $scope.description[i] = callback[i].description.S;
      }
          $scope.jobsLoaded = true;
  });

  $scope.clickEdit = function(job) {
    JobService.setJob(job);
    $location.path('/business/edit-job');
  };



});
