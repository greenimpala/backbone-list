define([
	"backbone",
	"underscore",
	"jquery",
	"view/tree/TreeItem"
], function (Backbone, _, $, TreeItem) {
	var Folder = TreeItem.extend({
		children: null,

		initialize: function () {
			this.children = new Backbone.Collection();
		},

		add: function (child) {
			this.children.add(child);
		},

		remove: function () {
			this.children.remove(child);
		},

		getChild: function (i) {
			return this.children.at(i);
		},

		show: function () {
			this.$el.show();

			for (var i = 0, node; node = this.getChild(i); i++) {
				node.show();
			}
		},

		hide: function () {
			this.$el.hide();

			for (var i = 0, node; node = this.getChild(i); i++) {
				node.hide();
			}
		}
	});

	return Folder;
});