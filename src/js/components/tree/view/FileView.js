define([
	"backbone",
	"underscore",
	"jquery"
], function (Backbone, _, $) {
	var FileView = Backbone.View.extend({
		className: "file",

        tagName: "li",

		show: function () {
			this.$el.show();
		},

		hide: function () {
			this.$el.hide();
		},

		render: function () {
            this.$el.html(this.model.get("title"));

			return this;
		}
	});

	return FileView;
});