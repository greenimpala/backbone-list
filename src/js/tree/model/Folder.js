define([
	"backbone",
	"underscore",
	"jquery",
	"tree/model/TreeItem",
	"tree/model/Folder"
], function (Backbone, _, $, TreeItem, Folder) {
	var Folder = TreeItem.extend({
		initialize: function () {
			TreeItem.prototype.initialize.call(this);
			this.set({
				children: new Backbone.Collection(),
				icon: "icon-folder"
			});
		},

		add: function (child) {
			if ((child instanceof Folder) && (child.get("children").length === 0)) {
				child.set("visible", false);
			}

			this.get("children").add(child);
		},

		remove: function (child) {
			this.get("children").remove(child);
		}
	});

	return Folder;
});