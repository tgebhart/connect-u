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
      console.log('then');
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

  return JobResource;

});
