define([
	"backbone",
	"underscore",
	"jquery",
	"components/tree/model/TreeItem"
], function (Backbone, _, $, TreeItem) {
	var File = TreeItem.extend({
		initialize: function () {
			TreeItem.prototype.initialize.call(this);
			this.set("icon", "icon-file");
		}
	});

	return File;
});