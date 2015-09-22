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
              if(user !== {}){
                console.log('returnnig user', user);
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
              console.log('set user', inputUser);
              user = inputUser;
            }

        };
    });
