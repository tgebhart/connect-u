angular.module("app").factory("JobService", function($q, $http) {

  var getJobs = function() {
    return $http.get('/jobs');
  };

  return { getJobs: getJobs };
});
