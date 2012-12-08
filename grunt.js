module.exports = function(grunt) {
	grunt.initConfig({
		lint: {
			all: ["grunt.js", "src/js/list/**/*.js", "test/specs/**/*.js"]
		},
		requirejs: {
			almond: true,
			name: "list/view/ListView",
			out: "backbone-list.min.js",
			baseUrl: "src/js",
			paths: {
				text: "vendor/require/text",
				require: "vendor/require/require"
			},
			exclude: ["require"]
		},
		optimize: true,
		mocha: {
			all: [ "test/index.html" ]
		}
	});

	grunt.loadNpmTasks("grunt-mocha");
	grunt.loadNpmTasks("grunt-requirejs");
	grunt.registerTask("default", ["lint", "mocha", "requirejs"]);
};