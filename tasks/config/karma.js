
module.exports = function(grunt) {


	grunt.config.set('karma',{
        front: {
        	configFile: 'karma.conf.js',
            // files: [
            //     {
            //         expand: true,
            //         src: ['assets/js/backoffice/**/*.js','!assets/js/backoffice/**/*.annotated.js'],
            //         ext: '.annotated.js', // Dest filepaths will have this extension.
            //         extDot: 'last',       // Extensions in filenames begin after the last dot
            //     },
            // ],
        }
	})

	grunt.loadNpmTasks('grunt-karma');
};
