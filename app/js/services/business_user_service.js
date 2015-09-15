angular.module("app").service('BusinessUserService', function () {
        var postParams = {};

        return {
            getPostParams: function () {
                return postParams;
            },
            setPostParams: function(value) {
                console.log('userservice postparams', value);
                postParams = value;
            }
        };
    });
