define([
	"backbone",
	"underscore",
	"jquery",
	"tree/model/TreeItem"
], function (Backbone, _, $, TreeItem) {
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
		},

		toJSON: function () {
			var children = [];

			this.get("children").forEach(function (child) {
				children.push(child.toJSON());
			});

			return {
				model: "Folder",
				parameters: {
					visible: this.get("visible"),
					title: this.get("title")
				},
				children: children
			}
		}
	});

	return Folder;
});