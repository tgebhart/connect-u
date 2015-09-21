angular.module("app").config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode({enabled:true});

  $routeProvider.when('/login', {
    templateUrl: 'login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/i_am_a', {
    templateUrl: 'i_am_a.html',
    controller: 'IAmAController'
  });

  $routeProvider.when('/business/choose_username', {
    templateUrl: 'choose_username.html',
    controller: 'BusinessChooseUsernameController'
  });

  $routeProvider.when('/student/choose_username', {
    templateUrl: 'student_choose_username.html',
    controller: 'StudentChooseUsernameController'
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

  $routeProvider.when('/business/current-jobs', {
    templateUrl: 'business_current_jobs.html',
    controller: 'BusinessCurrentJobsController'
  });

  $routeProvider.when('/business/student-outreach', {
    templateUrl: 'business_student_outreach.html',
    controller: 'BusinessStudentOutreachController'
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
