define([
	"backbone",
	"underscore",
	"jquery",
	"tree/model/TreeItem",
	"tree/model/Folder"
], function (Backbone, _, $, TreeItem, Folder) {
	var Folder = TreeItem.extend({
		defaults: {
			icon: "icon-folder",
			visible : false
		},

		initialize: function () {
			TreeItem.prototype.initialize.call(this);
			this.set("children", new Backbone.Collection());
		},

		add: function (child) {
			this.get("children").add(child);
		},

		remove: function (child) {
			this.get("children").remove(child);
		},

		getChildren: function (recursiveSearch) {
			if (!recursiveSearch) {
				return this.get("children").toArray();
			}

			var buffer = [];

			this.get("children").forEach(function (child) {
				if (child.getChildren) {
					buffer = buffer.concat(child.getChildren(true));
				}
				buffer.push(child);
			});

			return buffer;
		}
	});

	return Folder;
});