require.config({
	paths: {
		jquery: 'vendor/jquery/jquery',
		underscore: 'vendor/underscore/underscore',
		backbone: 'vendor/backbone/backbone',
		handlebars: "vendor/handlebars/handlebars",
		text: "vendor/require/text",
		less: "vendor/less/less"
	},
	shim: {
		handlebars: {
			exports: "Handlebars"
		}
	}
});