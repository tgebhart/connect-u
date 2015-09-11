angular.module("app").factory("JobService", function($q, $http) {

  var getBooks = function() {
    return $http.get('/jobs');
  };

  return { getJobs: getJobs };
});
