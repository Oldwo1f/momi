var config = require('../../config/config');
module.exports = function(grunt) {

	grunt.config.set('browserSync', {
		dev: {
                bsFiles: {
                    src : ['.tmp/styles/**/*.css','.rebooted','views/**/*.ejs']
                }, 
                options: {
                    proxy: "localhost:"+config.port,
                    
                }
            }
	});

	grunt.loadNpmTasks('grunt-browser-sync');
};