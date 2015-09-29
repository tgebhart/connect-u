angular.module("app").controller('IAmAController', function($scope, $location, $cookies, AuthenticationService, $log) {

  $scope.businessCheck = false;
  $scope.studentCheck = false;

  $scope.downToBusiness = function() {
    $location.path('/business/create-profile');
  };

  $scope.downToStudent = function() {
    $location.path('/student/create-profile');
  };

});
