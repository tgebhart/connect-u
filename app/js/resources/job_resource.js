angular.module("app").factory("JobResource", function($q, $resource) {
  return $resource('/jobs');
});
