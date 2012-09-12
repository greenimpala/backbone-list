require.config({
	baseUrl: "js",

	paths: {
		jquery: 'lib/jquery/jquery',
		underscore: 'lib/underscore/underscore',
		backbone: 'lib/backbone/backbone',
		handlebars: "lib/handlebars/handlebars",
		text: "lib/require/text",
		less: "lib/less/less"
	},
	shim: {
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		underscore: {
			exports: "_"
		},
		handlebars: {
			exports: "Handlebars"
		}
	}
});

require([
	"view/App", 
	"less"
], function (App, less) {
	var app = new App();
});