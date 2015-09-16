angular.module("app").factory("BusinessUserResource", function($q, $http) {

  var BusinessUserResource = function(){
  };

  BusinessUserResource.prototype.create = function(params, callback) {
    console.log('posting');
      var post = $http.post('/api/business/create-profile', params)
      .then(function(post){
        console.log('then');
        if(typeof post.data === undefined) {
          console.log('false', post.data);
          return $q.reject(post.data);
        }
        else {
          console.log('true');
          callback(true);
        }
    });
  };

  BusinessUserResource.prototype.edit = function(edit_params) {
    console.log('edi params', edit_params);
    $http.post('/api/business/edit-profile', edit_params);
  };

  BusinessUserResource.prototype.get = function(user) {
    console.log('get user', user);
    $http.get('/api/business/get-user', user);
  };

  return BusinessUserResource;

});
