/* Exports a function which returns an object that overrides the default &
 *   plugin file patterns (used widely through the app configuration)
 *
 * To see the default definitions for Lineman's file paths and globs, see:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/files.coffee
 */
module.exports = function (lineman) {
  //Override file patterns here
  return {
    js: {
      vendor: [
        "vendor/js/angular.js",
        "vendor/angular-bootstrap/ui-bootstrap.js",
        "vendor/js/**/*.js",
        "vendor/js/angular-cookies.js",
        "vendor/js/angular-dashboard-framework.js",
        "vendor/angular-dashboard-framework/dist/angular-dashboard-framework.js",
        "vendor/js/aws-sdk.js",
        //"vendor/js/ui-bootstrap-tpls.js"
      ],
      app: [
        "app/js/app.js",
        "app/js/**/*.js",
      ]
    },

    webfonts: {
      files: {
        "vendor/bootstrap/fonts/": "vendor/bootstrap/fonts/**/*.*",
        "vendor/font-awesome/fonts/": "vendor/font-awesome/fonts/**/*.*"
      }
    },

    css: {
      compile: {
        options: {
          paths: ["vendor/css/bootstrap.min.css", "vendor/css/font-awesome.min.css", "vendor/css/normalize.css", "vendor/css/**/*.css", "app/css/**/*.css"],


        }
      }
    },
  };
};
