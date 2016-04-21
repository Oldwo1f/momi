/**
 * `watch`
 *
 * ---------------------------------------------------------------
 *
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * Watch for changes on:
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function(grunt) {

  grunt.config.set('watch', {
    assets: {

      // Assets to watch:
      files: ['assets/**/*','!assets/styles/**/*','!assets/**/*.annotate.js', 'tasks/pipeline.js', '!**/node_modules/**','!dash.js'],

      // When assets are changed:
      tasks: ['ngAnnotate:backoffice','syncAssets' , 'linkAssets' ]
    },
    assets_css: {

      // Assets to watch:
      files: ['assets/styles/**/*','!dash.js'],

      // When assets are changed:
      tasks: ['syncAssets' , 'linkAssets' ]
    },
    test: {

      // Assets to watch:
      files:[ 'api/**/*.js',
              'test/**/*.js',
              'assets/**/*.annotated.js',
              'test_front/**/*.test.js','!dash.js'
            ],

      // When assets are changed:
      tasks: ['mochaTest:backoffice','karma:front']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
