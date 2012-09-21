define([
	"backbone",
	"underscore",
	"jquery",
	"components/tree/view/FolderView"
], function (Backbone, _, $, FolderView) {
	var TreeView = FolderView.extend({
		className: "tree",

		initialize: function () {
			FolderView.prototype.initialize.call(this);
		}
	});

	return TreeView;
});