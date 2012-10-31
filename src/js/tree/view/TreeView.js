define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"tree/view/FolderView"
], function (Backbone, _, $, Handlebars, FolderView) {
	var TreeView = FolderView.extend({
		tagName: "div",

		className: "tree",

		initialize: function () {
			FolderView.prototype.initialize.call(this);
		},

		render: function () {
			this._renderChildren();

			return this;
		}
	});

	return TreeView;
});