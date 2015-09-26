  angular.module("app").controller('BusinessEditJobController', function($scope, $timeout, $http, $location, AuthenticationService, $log, $templateCache, BusinessUserService, JobService, moment, JobResource) {

  $scope.job = {};
  $scope.userParams = BusinessUserService.getUser();
  $scope.clickedJob = JobService.getJob();
  $scope.job = $scope.clickedJob;
  $scope.job.deadline.S = new Date($scope.clickedJob.deadline.S);
  console.log($scope.job.deadline.S);

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
    console.log(item.name);
    $scope.contactText = item.name;
    $scope.itemList.push(item.name);
  };

  var checkUp = function(params, callback) {
    _.forEach(params.AttributeUpdates, function(item) {
      if (item.Value.S === undefined && item.Value.SS === undefined) {
        console.log('hey', item.Value);
        item.Value = {
          "S": "null"
        };
      }
    });
    callback(params);
  };


  $scope.upload = function() {


    JobResource = new JobResource();
    var formData = new FormData();
    $scope.userParams = BusinessUserService.getUser();

    $scope.job.workers_required = $scope.clickedJob.workers_required.SS;
    _.forEach($scope.choices, function(choice) {
      console.log('choice', choice);
      $scope.job.workers_required.push(choice.name + ' ' + choice.id);
    });

    if ($scope.contactText === "") {
      $scope.contactText = "null";
    }
    var now = new Date();

    var postParams = {
      "TableName": "jobs",
      "Key" : {
        "title": {
          "S": $scope.job.title.S
        },
      },
      "AttributeUpdates" : {
        "workers_required": {
          "Action" : "PUT",
          "Value": {"SS": $scope.job.workers_required}
        },
        "description": {
          "Action" : "PUT",
          "Value" : {"S": $scope.job.description.S}
        },
        "expectations": {
          "Action" : "PUT",
          "Value" : {"S": $scope.job.expectations.S}
        },
        "poc_name": {
          "Action" : "PUT",
          "Value" : {"S": $scope.job.poc_name.S}
        },
        "poc_method": {
          "Action" : "PUT",
          "Value" : {"S": $scope.contactText.S}
        },
        "poc_input": {
          "Action" : "PUT",
          "Value" : {"S": $scope.job.poc_input.S}
        },
        "deadline": {
          "Action" : "PUT",
          "Value" : {"S": $scope.job.deadline.S}
        },
        "uploaded_by": {
          "Action" : "PUT",
          "Value" : {"S": $scope.userParams.name}
        },
        "extra_info_url": {
          "Action" : "PUT",
          "Value" : {"S" : $scope.job.extra_info_url.S},
      }
    }
    };

    if ($scope.file) {
      postParams.Item.extra_info_url = {
        "S": "https://s3-us-west-2.amazonaws.com/job-extra-info/" + $scope.file.name
      };

      var params = {
        Key: $scope.file.name,
        ContentType: $scope.file.type,
        Body: formData.append("file", $scope.file),
        ServerSideEncryption: 'AES256'
      };
      JobResource.uploadExtraInfo(params);
    }

    checkUp(postParams, function(postParams) {
      console.log('fixed post params', postParams);
      //JobResource = new JobResource();
      var postJob = JobResource.editJob(postParams, function(val) {
        console.log('createdjobbackhome', val);
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


})

.directive('dynamicPlaceholder',
    function() {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                attrs.$observe('dynamicPlaceholder', function(value) {
                    element.attr('placeholder', value);
                });
            }
        };
    });
