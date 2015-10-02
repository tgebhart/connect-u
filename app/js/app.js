angular.module("app", ["ngResource", "ngRoute", "ngCookies", "ui.bootstrap", "ui.bootstrap.tpls", "ngFileUpload", "angularMoment"]).run(function($rootScope) {
  // adds some basic utilities to the $rootScope for debugging purposes
  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope._ = 'lodash';

  $rootScope.alert = function(thing) {
    alert(thing);
  };


}).directive('file', function() {
return {
  restrict: 'AE',
  scope: {
    file: '@'
  },
  link: function(scope, el, attrs){
    el.bind('change', function(event){
      var files = event.target.files;
      var file = files[0];
      scope.file = file;
      scope.$parent.file = file;
      scope.$apply();
    });
  }
};
});
