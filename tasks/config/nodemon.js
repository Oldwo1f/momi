var browserSync = require("browser-sync");
var REBOOTING = false;
module.exports = function(grunt) {

	grunt.config.set('nodemon', {
		dev: {
               	script:'app.js',
				options: {
					ignore: ['api/controllers/**','!assets/**/*.annotate.js','api/services/**','api/models/**','node_modules/**','.tmp/**','tasks/','!.rebooted','!dash.js'],
					ext: 'js,html',
					callback: function (nodemon) {
						// console.log("NODEMON CALLBACK");
						nodemon.on('restart', function () {

							// console.log('RESTART'.red);
							// grunt.task.run('mochaTest:backoffice');
				          // Delay before server listens on port
				          	if(REBOOTING == false){
				          		REBOOTING = true;
								setTimeout(function() {
										console.log('REBOOTED');
										require('fs').writeFileSync('.rebooted', 'rebooted');
										REBOOTING = false;
								}, 5000);
							}

				        });
	            	}
				}
            }
	});
grunt.loadNpmTasks('grunt-nodemon');
};