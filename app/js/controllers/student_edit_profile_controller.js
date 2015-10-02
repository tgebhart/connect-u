angular.module("app").controller('StudentEditProfileController', function($scope, $location, $cookies, AuthenticationService, $log, StudentUserService, StudentUserResource) {

  StudentUserResource = new StudentUserResource();

  $scope.cookieFirstName = '';
  if($cookies.get('firstname')){
      $scope.cookieFirstName = $cookies.get('firstname');
  }

    $scope.cancel = function () {
      $location.path('/business/home');
    };

    StudentUserResource.get($cookies.get('username'), function(callback){
      if(callback){
        $scope.user = callback[0];
        console.log('user', $scope.user);
      }
    });


    var checkUp = function(params, callback) {
      _.forEach(params.AttributeUpdates, function(item) {
        if (item.Value.S === undefined && item.Value.SS === undefined) {
          item.Value = {
            "Null": true
          };
        }
      });
      callback(params);
    };

    $scope.addUser = function() {
        var postParams = {
            "TableName": "student_users",
            "Item": {
              "username" : {"S" : $scope.user.username.S},
              "password" : {"S" : $scope.user.password.S},
              "firstname": {"S" : $scope.user.firstname.S},
              "lastname": {"S" : $scope.user.lastname.S},
              "email":  {"S" : $scope.user.email.S},
              "year": {"S" : $scope.user.year.S},
              "major": {"S" : $scope.user.major.S},
              "bio": {"S" : $scope.user.bio.S},
              "tagline": {"S" : $scope.user.tagline.S},
              "personal-website": {"S" : $scope.user['personal-website'].S},
              "upload_info_url": {"S" : $scope.user.upload_info_url.S}
            }
          };

          if ($scope.file) {
            postParams.Item.upload_info_url = {
              "S": "https://s3-us-west-2.amazonaws.com/student-extra-info/" + $scope.file.name
            };
            formData = new FormData();
            var params = {
              Key: $scope.file.name,
              ContentType: $scope.file.type,
              Body: formData.append("file", $scope.file),
              ServerSideEncryption: 'AES256'
            };
            StudentUserResource.uploadExtraInfo(params, function(callback){});
          }

          checkUp(postParams, function(postParams) {
            //JobResource = new JobResource();
            var post = StudentUserResource.edit(postParams, function(val) {
              if (val) {
                $location.path('/student/home');
              }

            });
          });
  };

  })

  .controller("StudentProfilePictureController", function($scope, $location, $cookies, AuthenticationService, $log, StudentUserService, StudentUserResource) {
      

  });
