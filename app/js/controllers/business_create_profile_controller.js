angular.module("app").controller('BusinessCreateProfileController', function($scope, $location, AuthenticationService, $log, BusinessUserResource, BusinessUserService) {

  $scope.user = {

};

  var checkUp = function(createParams, callback) {
    _.forEach(createParams.Item, function(value, thing) {
      console.log(thing);
      if(value.S === undefined){
        console.log('caught undefined', createParams.Item[thing]);
        createParams.Item[thing] = {"S": "null"};
      }
    });
    callback(createParams);
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
    checkUp(createParams, function(createParams){
    console.log('fixed post params', createParams);
    BusinessUserService.setPostParams(createParams);
    BusinessUserResource = new BusinessUserResource();
    var createdUser = BusinessUserResource.create(createParams, function(val){
      console.log('createduserbackhome', createdUser);
      if(val){
        $location.path('/business/choose_username');
      }
      });

    });
  };
});
