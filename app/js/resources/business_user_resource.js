angular.module("app").factory("BusinessUserResource", function($q, $http) {

  var BusinessUserResource = function(){
  };

  BusinessUserResource.prototype.post = function(params) {
      console.log('called that function', params);
      $http.post('/api/business/create-profile', params);
  };

  return BusinessUserResource;

});
