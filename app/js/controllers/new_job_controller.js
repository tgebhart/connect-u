angular.module("app").controller('BusinessNewJobController', function($scope, $timeout, $cookies, $http, $location, AuthenticationService, $log, $templateCache, BusinessUserService, JobResource) {

  $scope.cookieCompany = '';
  if($cookies.get('company')){
      $scope.cookieCompany = $cookies.get('company');
  }
  $scope.userParams = $cookies.get('username');
  $scope.job = {};

  $scope.choices = [{
    id: '1'
  }];

  $scope.cancel = function() {
    $location.path('/business/home');
  };

  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length + 1;
    $scope.choices.push({
      'id': newItemNo
    });
  };

  $scope.contactText = "";

  $scope.itemList = [];
  $scope.contactMethods = [{
    id: 1,
    name: "Email"
  }, {
    id: 2,
    name: "Call"
  }, {
    id: 3,
    name: "Text"
  }, {
    id: 4,
    name: "Other"
  }];

  $scope.changedValue = function(item) {
    $scope.contactText = item.name;
    $scope.itemList.push(item.name);
  };

  var checkUp = function(params, callback) {
    _.forEach(params.Item, function(value, thing) {
      if (value.S === undefined && value.SS === undefined) {
        params.Item[thing] = {
          "S": "null"
        };
      }
    });
    callback(params);
  };


  $scope.upload = function() {
    // Configure The S3 Object
    JobResource = new JobResource();
    AWS.config.update({
      region: 'us-east-1'
    });
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:a2ea0582-a643-4139-b974-30264823160b',
    });

    var formData = new FormData();

    $scope.job.workers_required = [];
    _.forEach($scope.choices, function(choice) {
      $scope.job.workers_required.push(choice.name + ' ' + choice.id);
    });

    if ($scope.contactText === "") {
      $scope.contactText = "null";
    }
    var now = new Date();

    $scope.postParams = {
      "TableName": "jobs",
      "Item": {
        "title": {
          "S": $scope.job.title
        },
        "workers_required": {
          "SS": $scope.job.workers_required
        },
        "description": {
          "S": $scope.job.description
        },
        "expectations": {
          "S": $scope.job.expectations
        },
        "poc_name": {
          "S": $scope.job.poc_name
        },
        "poc_method": {
          "S": $scope.contactText
        },
        "poc_input": {
          "S": $scope.job.poc_input
        },
        "deadline": {
          "S": $scope.job.deadline
        },
        "uploaded_by": {
          "S": $scope.userParams
        },
        "upload_company": {
          "S": $scope.cookieCompany
        },
        "post_date": {
          "S": now
        },
        "upload_info_url": {},
      }
    };

    if ($scope.file) {
      $scope.postParams.Item.upload_info_url = {
        "S": "https://s3-us-west-2.amazonaws.com/job-extra-info/" + $scope.cookieCompany + $scope.file.name
      };
      var s3 = new AWS.S3({ params: {Bucket: 'job-extra-info'}});
      var params = {
        Key: $scope.cookieCompany + $scope.file.name,
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

      var postJob = JobResource.postJob($scope.postParams, function(val) {
        if (val) {
          $location.path('/business/home');
        }

      });
    });

  };




  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open = function($event) {
    $scope.status.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  $scope.status = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events = [{
    date: tomorrow,
    status: 'full'
  }, {
    date: afterTomorrow,
    status: 'partially'
  }];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };


});
