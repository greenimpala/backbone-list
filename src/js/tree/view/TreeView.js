define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"tree/view/FolderView",
	"text!tree/templates/_TreeItemView.html"
], function (Backbone, _, $, Handlebars, FolderView, _TreeItemView) {
	var TreeView = FolderView.extend({
		tagName: "div",

		className: "tree",

		initialize: function () {
			FolderView.prototype.initialize.call(this);
			this.registerPartials();
		},

		registerPartials: function () {
			Handlebars.registerPartial("TreeItemView", _TreeItemView);
		},

		render: function () {
			this._renderChildren();

			return this;
		}
	});

	return TreeView;
});