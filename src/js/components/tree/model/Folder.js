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
			this.get("children").add(child);
		},

		remove: function () {
			this.get("children").remove(child);
		}
	});

	return Folder;
});