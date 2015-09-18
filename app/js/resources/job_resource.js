angular.module("app").factory("JobResource", function($q, $resource) {

  JobResource = new JobResource();


  JobResource.prototype.s3Upload = function(params, callback) {
    console.log('posting');


  };
});
