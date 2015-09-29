angular.module("app").service('BusinessUserService', function () {
        var postParams = {};
        var user = {};

        return {
            getPostParams: function () {
                return postParams;
            },
            setPostParams: function(value) {
                postParams = value;
            },

            getUser: function () {
              if(user !== {}){
                return user;
            }
            else {
              return {'user': {
                'name': 'test',
                'company': 'testco'
              }};
            }
            },
            setUser: function(inputUser) {
              user = inputUser;
            }

        };
    });
