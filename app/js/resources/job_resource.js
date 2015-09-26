angular.module("app").factory("JobResource", function($q, $http) {


  var JobResource = function(){
  };


  JobResource.prototype.uploadExtraInfo = function(params, callback) {
      var post = $http.post('/api/business/upload-extra-info', params)
      .then(function(post){
        if(typeof post.data === undefined) {
          return $q.reject(post.data);
        }
        else {
          callback(null);
        }
    });
  };

  JobResource.prototype.postJob = function(params, callback) {
    var post = $http.post('/api/business/upload-new-job', params)
    .then(function(post){
      if(typeof post.data === undefined) {
        return $q.reject(post.data);
      }
      else {
        callback(true);
      }
    });
  };

  JobResource.prototype.editJob = function(params, callback) {
    var post = $http.post('/api/business/edit-job', params)
    .then(function(post) {
      if(typeof post.data === undefined) {
        return $q.reject(post.data);
      }
      else {
        callback(true);
      }
    });
  };

  JobResource.prototype.getCurrentJobs = function(input, callback) {
    var get = $http({
      url: '/api/business/get-current-jobs',
      method: "GET",
      params: {'user': input.user.company}
    })
    .then(function(get){
      if(typeof get.data === undefined) {
        return $q.reject(get.data);
      }
      else {
        callback(get.data.Items);
      }
    });
  };

  return JobResource;

});
