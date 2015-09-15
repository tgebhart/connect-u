angular.module("app").config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode({enabled:true});

  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/student/home', {
    templateUrl: 'student_home.html',
    controller: 'StudentHomeController'
  });

  $routeProvider.when('/business/home', {
    templateUrl: 'business_home.html',
    controller: 'BusinessHomeController'
  });

  $routeProvider.when('/business/profile', {
    templateUrl: 'business_edit_profile.html',
    controller: 'BusinessEditProfileController'
  });

  $routeProvider.when('/business/add-jobs' , {
    templateUrl: 'add_jobs.html',
    controller: 'AddJobsController'
  });

  $routeProvider.when('/business/new-job', {
    templateUrl: 'new_job.html',
    controller: 'BusinessNewJobController'
  });

  $routeProvider.when('/business/create-profile', {
    templateUrl: 'business_create_profile.html',
    controller: 'BusinessCreateProfileController'
  });

  $routeProvider.when('/$resource/list-of-jobs', {
    templateUrl: 'jobs_resource.html',
    controller: 'JobsResourceController'
  });

  $routeProvider.when('/$http/list-of-jobs', {
    templateUrl: 'jobs_http.html',
    controller: 'JobsHttpController',
    resolve: {
      jobs: function(JobService) {
        return JobService.getJobs();
      }
    }
  });

  $routeProvider.otherwise({ redirectTo: '/login' });

});
