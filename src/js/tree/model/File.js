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
		}
	});

	return File;
});