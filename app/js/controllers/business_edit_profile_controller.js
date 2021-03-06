angular.module("app").controller('BusinessEditProfileController', function($scope, $location, $cookies, AuthenticationService, $log, BusinessUserResource, BusinessUserService) {

  $scope.cookieCompany = '';
  if($cookies.get('company')){
      $scope.cookieCompany = $cookies.get('company');
  }
  $scope.cancel = function () {
    $location.path('/business/home');
  };

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
    BusinessUserService.setPostParams(createParams);
    BusinessUserResource = new BusinessUserResource();
    var createdUser = BusinessUserResource.create(createParams);
  }
  else {
    console.log('fill in my form pls');
  }

};

});
