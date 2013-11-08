'use strict';
module.exports = function(grunt) {
	pkg: grunt.file.readJSON('package.json'),
	grunt.initConfig({
		grunticon: {
		    svgIcons: {
		        options: {
		        src: "dev/assets/",
		        dest: "web/build/_ui/icons/"
		      }
		    }
		},
		qunit: {
			files: ['web/build/_ui/*.html']
		},
		jshint: {
		  all: ['dev/src/*.js'],
		  options: { 
			
		  }
		},
		uglify: {
			options: {
				compress:true,
				report:'min',
				beautify:true,
				properties:true,
				preserveComments:false,
				banner: '/*<%= grunt.template.today("yyyy-mm-dd") %> */' + '\n'
			},
			web: {
			  files: {
				'web/build/_ui/js/MemoryGame.min.js':[

														// utitlity
														'dev/src/utility/utility.js',
														'dev/src/utility/svg_library.js',

														// Model
														'dev/src/Model.js',

														// View
														'dev/src/view/Overlay.js',
														'dev/src/view/Ball.js',
														'dev/src/view/BallCenter.js',
														'dev/src/View.js',

														// core
														'dev/src/core/*.js',

														// init
														'dev/src/Main.js'
													]
			  }
			}
		},
		sass: {                              
			dist: {                            
		 	 files: {
			 	// 'destination': 'source'
				'web/build/_ui/css/memory-game.min.css':'dev/scss/memory-game.scss'
		  		}
			}
		},
		
		groundskeeper: {
		  options: {
		    console: true                     
		  }
		},

		watch: {
		  scripts: {
			files: ['dev/src/*.js','dev/src/core/*.js','dev/src/view/*.js','dev/src/utility/*.js', 'dev/scss/*.scss'],
			tasks: ['jshint', 'uglify', 'sass'],
			options: {
			  interrupt: true
			},
		  },
		}
	});
	
	//grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
  	// generate qunit
  	grunt.registerTask('test', ['jshint', 'qunit']);

 	 // generate icons
  	grunt.registerTask('icons', ['grunticon']);

  	// default
 	grunt.registerTask('default', ['jshint','uglify','sass', 'watch']);
};	
