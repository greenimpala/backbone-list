module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		lint: {
			all: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
		},
		jshint: {
			options: {
				browser: true
			}
		},
		requirejs: {
			name: "list/view/ListView",
			out: "backbone-list-min.js",
			baseUrl: 'src/js',
			paths: {
				jquery: 'vendor/jquery/jquery',
				underscore: 'vendor/underscore/lodash',
				backbone: 'vendor/backbone/backbone',
				handlebars: "vendor/handlebars/handlebars",
				text: "vendor/require/text"
			},
			exclude: ["jquery", "backbone", "underscore", "handlebars"]
		}
	});

	grunt.loadNpmTasks('grunt-requirejs');
	grunt.registerTask('default', 'requirejs');

};