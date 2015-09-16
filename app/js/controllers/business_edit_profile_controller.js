angular.module("app").controller('BusinessEditProfileController', function($scope, $location, AuthenticationService, $log, BusinessUserResource, BusinessUserService) {

  $scope.user = {
    "company":"",
    "title": "",
    "firstname":"",
    "lastname":"",
    "email":"",
    "phone":"",
    "company-description":"",
    "company-division":""
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
    var sendToDB = true;
    forEach($scope.user, function(item){
      if($scope.user.item === ''){
        sendToDB = false;
      }
    });
    if(sendToDB){
    console.log('add user called', $scope.user);
    BusinessUserService.setPostParams(createParams);
    BusinessUserResource = new BusinessUserResource();
    var createdUser = BusinessUserResource.create(createParams);
    console.log('createduserbackhome', createdUser);
  }
  else {
    console.log('fill in my form pls');
  }

};

});
