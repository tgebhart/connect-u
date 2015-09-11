// with $resource
angular.module("app").controller("JobsResourceController", function ($scope, JobResource) {
  // because the stubbed endpoint returns an array of results, .query() is used
  // if the endpoint returned an object, you would use .get()
  $scope.books = JobsResource.query();
});

// with $http
angular.module("app").controller("JobsHttpController", function ($scope, books) {
  $scope.jobs = jobs;
});
