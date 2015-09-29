angular.module("app").factory("StudentUserResource", function($q, $http) {

  var StudentUserResource = function(){
  };

  StudentUserResource.prototype.uploadExtraInfo = function(params, callback) {
      var post = $http.post('/api/student/upload-extra-info', params)
      .then(function(post){
        if(typeof post.data === undefined) {
          return $q.reject(post.data);
        }
        else {
          callback(null);
        }
    });
  };

  StudentUserResource.prototype.create = function(params, callback) {
      var post = $http.post('/api/student/create-profile', params)
      .then(function(post){
        if(typeof post.data === undefined) {
          return $q.reject(post.data);
        }
        else {
          callback(true);
        }
    });
  };

  StudentUserResource.prototype.edit = function(params, callback) {
    var post = $http.post('/api/student/create-profile', params)
    .then(function(post){
      if(typeof post.data === undefined) {
        return $q.reject(post.data);
      }
      else {
        callback(true);
      }
    });
  };

  StudentUserResource.prototype.get = function(user) {
    $http.get('/api/student/get-user', user);
  };

  return StudentUserResource;

});
