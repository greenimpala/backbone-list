define([
	"backbone",
	"underscore",
	"jquery",
	"tree/model/TreeItem"
], function (Backbone, _, $, TreeItem) {
	var File = TreeItem.extend({
		defaults: {
			"icon": "icon-file"
		},

		initialize: function () {
			TreeItem.prototype.initialize.call(this);
		},

		toJSON: function () {
			return {
				model: "File",
				parameters: {
					title: this.get("title")
				}
			}
		}
	});

	return File;
});