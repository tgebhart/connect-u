angular.module("app").factory("BusinessUserResource", function($q, $http) {

  var BusinessUserResource = function(){
  };

  BusinessUserResource.prototype.create = function(params, callback) {
      var post = $http.post('/api/business/create-profile', params)
      .then(function(post){
        if(typeof post.data === undefined) {
          return $q.reject(post.data);
        }
        else {
          callback(true);
        }
    });
  };

  BusinessUserResource.prototype.edit = function(params, callback) {
    var post = $http.post('/api/business/create-profile', params)
    .then(function(post){
      if(typeof post.data === undefined) {
        return $q.reject(post.data);
      }
      else {
        callback(true);
      }
    });
  };

  BusinessUserResource.prototype.get = function(user) {
    $http.get('/api/business/get-user', user);
  };

  return BusinessUserResource;

});
