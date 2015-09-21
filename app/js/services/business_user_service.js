angular.module("app").service('BusinessUserService', function () {
        var postParams = {};
        var user = {};

        return {
            getPostParams: function () {
                return postParams;
            },
            setPostParams: function(value) {
                console.log('userservice postparams', value);
                postParams = value;
            },

            getUser: function () {
              if(user !== ''){
              return user;
            }
            else {
              return 'test';
            }
            },
            setUser: function(user) {
              this.user = user;
            }

        };
    });
