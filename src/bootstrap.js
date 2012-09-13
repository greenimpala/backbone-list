require.config({
	baseUrl: "js",

	paths: {
		jquery: 'vendor/jquery/jquery',
		underscore: 'vendor/underscore/underscore',
		backbone: 'vendor/backbone/backbone',
		handlebars: "vendor/handlebars/handlebars",
		text: "vendor/require/text",
		less: "vendor/less/less"
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
	"App",
	"less"
], function (App) {
	var app = new App();
});