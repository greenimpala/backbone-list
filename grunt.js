module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		lint: {
			all: ['grunt.js', 'src/js/**/*.js', 'test/specs/**/*.js']
		},
		meta: {
			banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("m/d/yyyy") %>\n' +
					'* <%= pkg.repository.url %>\n' +
					'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>' +
					' License <%= pkg.license %> */'
		},
		jshint: {
			options: {
				browser: true
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "src/js",
					mainConfigFile: "src/js/bootstrap.js",
					dir: "dist",
					name: 'App'
				}
			}
		},
		min: {
			dist: {
				src: ['<banner>', 'dist/BackboneAMDBootstrap.js'],
				dest: 'dist/BackboneAMDBootstrap.min.js'
			}
		},
		mocha: {
			index: ['test/index.html']
		}
	});
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	// Default task
	grunt.registerTask('default', 'mocha lint requirejs');
};