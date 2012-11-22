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
			almond: true,
			name: "list/view/ListView",
			out: "backbone-list.min.js",
			baseUrl: 'src/js',
			paths: {
				text: "vendor/require/text",
				require: "vendor/require/require"
			},
			exclude: ["require"]
		},
		optimize: true
	});

	grunt.loadNpmTasks('grunt-requirejs');
	grunt.registerTask('default', 'requirejs');

};