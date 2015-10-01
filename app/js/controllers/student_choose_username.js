angular.module("app").controller('StudentChooseUsernameController', function($scope, $location, $cookies, AuthenticationService, $log, StudentUserService, StudentUserResource) {

  $scope.user = {};
  formData = new FormData();
  StudentUserResource = new StudentUserResource();


    var checkUp = function(createParams, callback) {
      _.forEach(createParams.Item, function(value, thing) {
        if(value.S === undefined){
          createParams.Item[thing] = {"NULL": true};
        }
      });
      callback(createParams);
    };

  $scope.login = function() {

    var createParams = StudentUserService.getPostParams();

    _.forEach(createParams.Item, function(value, thing) {
      console.log(thing);
      if(value.S === undefined){
        createParams.Item[thing] = {"NULL": true};
      }
    });

    if ($scope.file && $scope.user.username !== undefined) {
      createParams.Item.profile_pic_url = {
        "S": "https://s3-us-west-2.amazonaws.com/student-profile-pics/" + $scope.user.username + $scope.file.name
      };
      var picParams = {
        Key: $scope.user.username ,
        ContentType: $scope.file.type,
        Body: formData.append("file", $scope.file),
        ServerSideEncryption: 'AES256'
      };
      StudentUserResource.uploadExtraInfo(picParams, function(callback) {

      });
    }

    createParams.Item["password"] = {"S" : $scope.user.password};
    createParams.Item["username"] = {"S" : $scope.user.username};


    checkUp(createParams, function(createParams) {
      var createUser = StudentUserResource.create(createParams, function(val) {
        if (val) {
          $cookies.put('username', createParams.Item.username.S);
          $cookies.put('firstname', createParams.Item.firstname.S);
          $cookies.put('lastname', createParams.Item.lastname.S);
          $cookies.put('email', createParams.Item.email.S);
          $cookies.put('year', createParams.Item.year.S);
          $cookies.put('major', createParams.Item.major.S);
          $cookies.put('tagline', createParams.Item.tagline.S);

          StudentUserService.setPostParams(createParams);
          $location.path('/student/home');
        }

      });

    });

  };

});
