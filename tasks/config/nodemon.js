var browserSync = require("browser-sync");

module.exports = function(grunt) {

	grunt.config.set('nodemon', {
		dev: {
               	script:'app.js',
				options: {
					ignore: ['api/controllers/**','!assets/**/*.annotate.js','api/services/**','api/models/**','node_modules/**','.tmp/**','tasks/','.rebooted'],
					ext: 'js,html',
					callback: function (nodemon) {
						// console.log("NODEMON CALLBACK");
						nodemon.on('restart', function () {

							console.log('RESTART'.red);
				          // Delay before server listens on port
							setTimeout(function() {
							// 	console.log('REBOOTED');
								require('fs').writeFileSync('.rebooted', 'rebooted');
							}, 2000);
				        });
	            	}
				}
            }
	});
grunt.loadNpmTasks('grunt-nodemon');
};