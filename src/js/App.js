define([
	"backbone",
	"underscore",
	"jquery"
], function (Backbone, _, $) {
	var App = Backbone.View.extend({
		el: $("body"),

		className: "app",

		initialize: function () {
			this.render();
		},

		render: function () {
			this.$el.append("App loaded!");

			return this;
		}
	});

	return App;
});