angular.module("app").factory("TestResource", function($q, $resource) {
  return $resource('/api/test');
});
