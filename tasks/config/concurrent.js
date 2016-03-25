module.exports = function(grunt) {
	grunt.config.set('concurrent',{
	 
	    target: {
            tasks: ['browserSync','nodemon','watch:assets','watch:assets_css'],
            options: {
                logConcurrentOutput: true
            }
        }
	});

	grunt.loadNpmTasks('grunt-concurrent');
};
