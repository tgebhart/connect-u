angular.module("app").controller('BusinessCreateProfileController', function($scope, $location, AuthenticationService, $log, BusinessUserResource, BusinessUserService) {

  $scope.user = {

};



  $scope.addUser = function() {

    var createParams = {
        "TableName": "business_users",
        "Item": {
            "company": {"S" : $scope.user.company},
            "title": {"S" : $scope.user.prefix},
            "firstname":  {"S" : $scope.user.firstname},
            "lastname": {"S" : $scope.user.lastname},
            "email": {"S" : $scope.user.email},
            "phone": {"S" : $scope.user.phone},
            "company-description": {"S" : $scope.user.companyDescription},
            "company-division": {"S" : $scope.user.companyDivision}
        }
    };
    BusinessUserService.setPostParams(createParams);
    $location.path('/business/choose_username');
  };
});
