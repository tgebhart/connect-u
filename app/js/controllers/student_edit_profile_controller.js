angular.module("app").controller('StudentEditProfileController', function($scope, $location, $cookies, AuthenticationService, $log, StudentUserService, StudentUserResource, Upload) {

  StudentUserResource = new StudentUserResource();

  $scope.cookieFirstName = '';
  if ($cookies.get('firstname')) {
    $scope.cookieFirstName = $cookies.get('firstname');
  }

  $scope.cancel = function() {
    $location.path('/business/home');
  };

  StudentUserResource.get($cookies.get('username'), function(callback) {
    if (callback) {
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
        "username": {
          "S": $scope.user.username.S
        },
        "password": {
          "S": $scope.user.password.S
        },
        "firstname": {
          "S": $scope.user.firstname.S
        },
        "lastname": {
          "S": $scope.user.lastname.S
        },
        "email": {
          "S": $scope.user.email.S
        },
        "year": {
          "S": $scope.user.year.S
        },
        "major": {
          "S": $scope.user.major.S
        },
        "bio": {
          "S": $scope.user.bio.S
        },
        "tagline": {
          "S": $scope.user.tagline.S
        },
        "personal-website": {
          "S": $scope.user['personal-website'].S
        },
        "upload_info_url": {
          "S": $scope.user.upload_info_url.S
        },
        "profile_pic_url" : {
          "S" : picParams
        }
      }
    };

    if ($scope.file) {
      postParams.Item.upload_info_url = {
        "S": "https://s3-us-west-2.amazonaws.com/student-extra-info/" + $scope.file.name
      };
      $scoope.extraUploader = new FileUploader();
      $scope.extraUploader = {
        Key: $scope.file.name,
        ContentType: $scope.file.type,
        Body: formData.append("file", $scope.file),
        ServerSideEncryption: 'AES256'
      };
      StudentUserResource.uploadExtraInfo(params, function(callback) {});
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

.controller("StudentProfilePictureController", function($scope, $timeout, $location, $cookies, AuthenticationService, $log, StudentUserService, StudentUserResource, Upload) {

      $scope.uploadFiles = function(file) {
            console.log(file);
             $scope.f = file;
             if (file && !file.$error) {
                 file.upload = Upload.upload({
                     url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                     data: {file: file}
                 });
                   var picParams = {
                     "S": "https://s3-us-west-2.amazonaws.com/student-profile-pics/" + $scope.user.username + file
                   };
                 file.upload.then(function (response) {
                     $timeout(function () {
                         file.result = response.data;
                         console.log(response.data);
                     });
                 }, function (response) {
                     if (response.status > 0)
                         $scope.errorMsg = response.status + ': ' + response.data;
                 });
               }
    //StudentUserResource.uploadExtraInfo(picParams, function(callback) {
    //});
  };






});
