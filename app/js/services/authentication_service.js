angular.module("app").factory('AuthenticationService', function($http) {
  // these routes map to stubbed API endpoints in config/server.js

  var AuthenticationService = function() {};

  AuthenticationService.prototype.login = function(credentials, callback) {
    var post = $http.post('/api/login', credentials)
      .then(function(post) {
        if (typeof post.data === undefined) {
          return $q.reject(post.data);
        } else {
          callback(post.data);
        }
      });
  };
  AuthenticationService.prototype.logout = function() {
    return $http.post('/logout');
  };

  return AuthenticationService;
});
