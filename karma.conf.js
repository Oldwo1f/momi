// Karma configuration
// Generated on Tue Mar 29 2016 15:00:07 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha','browserify','jquery-2.1.0','chai-sinon'],


    // list of files / patterns to load in the browser
    files: [
       'assets/js/dependencies/sails.io.js',

      'bower_components/angular/angular.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-sails/dist/angular-sails.js',
      'bower_components/flexi-list-master/flexi-list.js',
      'bower_components/javascript-detect-element-resize/jquery.resize.js',
      'bower_components/angular-gridster/dist/angular-gridster.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'assets/js/backoffice/core/app.annotated.js',
      'assets/js/backoffice/core/widgetService.annotated.js',
      'assets/js/backoffice/**/index.annotated.js',
      'assets/js/backoffice/**/*.annotated.js',
      'test_front/**/*.test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '!assets/js/dependencies/*.js': ['coverage'],
        'test_front/**/*.test.js':['browserify'],
        'assets/**/*.js': ['coverage'],
        'api/**/*.js': ['coverage'],
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
