angular.module("app", ["ngResource", "ngRoute", "ngCookies", "ui.bootstrap", "ui.bootstrap.tpls", "ngFileUpload", "angularMoment"]).run(function($rootScope) {
  // adds some basic utilities to the $rootScope for debugging purposes
  $rootScope.log = function(thing) {
    console.log(thing);
  };

  $rootScope._ = 'lodash';

  $rootScope.alert = function(thing) {
    alert(thing);
  };


});
