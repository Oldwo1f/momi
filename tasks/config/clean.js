/**
 * `clean`
 *
 * ---------------------------------------------------------------
 *
 * Remove the files and folders in your Sails app's web root
 * (conventionally a hidden directory called `.tmp/public`).
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-clean
 *
 */
module.exports = function(grunt) {

	grunt.config.set('clean',{
		dev: {
		 src: ['.tmp/public/**','!.tmp/public/bower_components/*']
		 ,
		 options: {
		 'no-write': true
		 }
		},
		components: ['.tmp/public/bower_components/**'],
		build: ['www']
	}
	);

	grunt.loadNpmTasks('grunt-contrib-clean');
};
