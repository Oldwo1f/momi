
module.exports = function(grunt) {


	grunt.config.set('ngAnnotate',{
        backoffice: {
            files: [
                {
                    expand: true,
                    src: ['assets/js/backoffice/**/*.js','!assets/js/backoffice/**/*.annotated.js'],
                    ext: '.annotated.js', // Dest filepaths will have this extension.
                    extDot: 'last',       // Extensions in filenames begin after the last dot
                },
            ],
        }
	})

	grunt.loadNpmTasks('grunt-ng-annotate');
};
