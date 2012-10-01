define([
	"backbone",
	"underscore",
	"jquery"
], function (Backbone, _, $) {
	var FileView = Backbone.View.extend({
		className: "file",

		show: function () {
			this.$el.show();
		},

		hide: function () {
			this.$el.hide();
		},

		render: function () {
			return this;
		}
	});

	return FileView;
});