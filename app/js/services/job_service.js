angular.module("app").service('JobService', function () {
        var job = '';

        return {
            setJob: function(inputJob) {
              job = inputJob;
            },
            getJob: function() {
              return job;
            }

        };
    });
