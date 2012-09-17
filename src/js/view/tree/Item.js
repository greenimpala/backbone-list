define([
	"backbone",
	"underscore",
	"jquery",
	"view/tree/TreeItem"
], function (Backbone, _, $) {
	var Item = TreeItem.extend({
		show: function () {
			this.$el.show();
		},

		hide: function () {
			this.$el.hide();
		}
	});

	return Item;
});