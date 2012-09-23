module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		lint: {
		  all: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
		},
		meta: {
			name: 'Backbone AMD Bootstrap',
			author: "Stephen Bradshaw",
			banner: '/*! <%= meta.name %> - v<%= "0.1" %> - <%= grunt.template.today("m/d/yyyy") %>\n' +
					'* <%= "homepage" %>\n' +
					'* Copyright (c) <%= grunt.template.today("yyyy") %> <% meta.author %>' +
					' Licensed */'
		},
		jshint: {
			options: {
				browser: true
			}
		},
		concat: {
			dist: {
				src: ['<banner>', 'src/**/*.js'],
				dest: 'dist/BackboneAMDBootstrap.js'
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

	// Default task.
	grunt.registerTask('default', 'mocha concat min');
};