define([
	"backbone",
	"underscore",
	"jquery",
	"components/tree/model/TreeItem"
], function (Backbone, _, $, TreeItem) {
	var Folder = TreeItem.extend({
		initialize: function () {
			this.set("children", new Backbone.Collection());
		},

		add: function (child) {
			this.children.add(child);
		},

		remove: function () {
			this.children.remove(child);
		}
	});

	return Folder;
});