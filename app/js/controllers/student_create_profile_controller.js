angular.module("app").controller('StudentCreateProfileController', function($scope, $location, AuthenticationService, $log, StudentUserResource, StudentUserService) {

  $scope.user = {};
  var formData = new FormData();
  StudentUserResource = new StudentUserResource();

$scope.cancel = function() {
  $location.path('/login');
};

  $scope.addUser = function() {

    var createParams = {
        "TableName": "student_users",
        "Item": {
          "firstname": {"S" : $scope.user.firstname},
          "lastname": {"S" : $scope.user.lastname},
          "email":  {"S" : $scope.user.email},
          "year": {"S" : $scope.user.year},
          "major": {"S" : $scope.user.major},
          "bio": {"S" : $scope.user.bio},
          "tagline": {"S" : $scope.user.tagline},
          "personal-website": {"S" : $scope.user.website},
          "upload_info_url": {"S" : "null"}
        }
      };

        if ($scope.file) {
          createParams.Item.upload_info_url = {
            "S": "https://s3-us-west-2.amazonaws.com/student-extra-info/" + $scope.file.name
          };
          var params = {
            Key: $scope.file.name,
            ContentType: $scope.file.type,
            Body: formData.append("file", $scope.file),
            ServerSideEncryption: 'AES256'
          };
          StudentUserResource.uploadExtraInfo(params, function(callback) {
            
          });
        }

    StudentUserService.setPostParams(createParams);
    $location.path('/student/choose_username');
  };
});
