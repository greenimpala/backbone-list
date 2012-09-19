define([
	"backbone",
	"underscore",
	"jquery",
	"view/tree/TreeItem"
], function (Backbone, _, $, TreeItem) {
	var File = TreeItem.extend({
		show: function () {
			this.$el.show();
		},

		hide: function () {
			this.$el.hide();
		}
	});

	return File;
});