angular.module("app").controller('StudentEditProfileController', function($scope, $location, $cookies, AuthenticationService, $log, StudentUserService, StudentUserResource) {

  StudentUserResource = new StudentUserResource();

  AWS.config.update({
    region: 'us-east-1'
  });
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:a2ea0582-a643-4139-b974-30264823160b',
  });

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
  $scope.postPicUrl = function() {
    $scope.user.profile_pic_url = {
      "S": "https://s3-us-west-2.amazonaws.com/student-profile-pics/" + $scope.user.username.S
    };
  };

  $scope.addUser = function() {
    $scope.postParams = {
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
        "profile_pic_url": $scope.user.profile_pic_url
      }
    };

    if ($scope.file) {
      $scope.postParams.Item.upload_info_url = {
        "S": "https://s3-us-west-2.amazonaws.com/student-extra-info/" + $scope.user.username + $scope.file.name
      };
      var s3 = new AWS.S3({ params: {Bucket: 'student-extra-info'}});
      var params = {
        Key: $scope.user.username.S,
        Body: $scope.file,
      };
      var req = s3.putObject(params, function(err, data) {
        if (err) {
          alert(err);
        } else {
          console.log("Upload complete");
        }
      });
    }

    checkUp($scope.postParams, function(postParams) {
      //JobResource = new JobResource();
      var post = StudentUserResource.edit($scope.postParams, function(val) {
        if (val) {
          $location.path('/student/home');
        }

      });
    });
  };

})

.controller("StudentProfilePictureController", function($scope, $location, $cookies, AuthenticationService, $log, StudentUserService, StudentUserResource, Upload) {
  StudentUserResource = new StudentUserResource();

  AWS.config.update({
    region: 'us-east-1'
  });
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:a2ea0582-a643-4139-b974-30264823160b',
  });
  var s3 = new AWS.S3({ params: {Bucket: 'student-profile-pics'}});

  $scope.postPic = function($file) {

    $scope.postPicUrl();

    var params = {
      Key: $scope.user.username.S,
      Body: $file,
    };
    var req = s3.putObject(params, function(err, data) {
      if (err) {
        alert(err);
      } else {
        console.log("Upload complete");
      }
    });

  };
});
