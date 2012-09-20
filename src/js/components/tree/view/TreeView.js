define([
	"backbone",
	"underscore",
	"jquery",
	"components/tree/view/FolderView"
], function (Backbone, _, $, FolderView) {
	var TreeView = FolderView.extend({
		className: "tree"
	});

	return TreeView;
});