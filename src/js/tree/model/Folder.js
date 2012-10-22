define([
	"backbone",
	"underscore",
	"jquery",
	"tree/model/TreeItem"
], function (Backbone, _, $, TreeItem) {
	var Folder = TreeItem.extend({
		initialize: function () {
			TreeItem.prototype.initialize.call(this);
			this.set({
				children: new Backbone.Collection(),
				icon: "icon-folder"
			});
		},

		add: function (child) {
			this.get("children").add(child);
		},

		remove: function (child) {
			this.get("children").remove(child);
		}
	});

	return Folder;
});