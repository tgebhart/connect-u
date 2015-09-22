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
    console.log('posting postJob');
    var post = $http.post('/api/business/upload-new-job', params)
    .then(function(post){
      if(typeof post.data === undefined) {
        console.log('false postJob', post.data);
        return $q.reject(post.data);
      }
      else {
        console.log('true');
        callback(true);
      }
    });
  };

  JobResource.prototype.getCurrentJobs = function(input, callback) {
    console.log('getting current jobs', input.user.company);
    var get = $http({
      url: '/api/business/get-current-jobs',
      method: "GET",
      params: input
    })
    .then(function(get){
      if(typeof get.data === undefined) {
        console.log('false getCurrentJobs', get.data);
        return $q.reject(post.data);
      }
      else {
        console.log('success getJobs', get);
        callback(get.data.Items[0]);
      }
    });
  };

  return JobResource;

});
