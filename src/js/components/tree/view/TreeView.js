define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"components/tree/view/FolderView",
	"text!components/tree/templates/_TreeIcon.html"
], function (Backbone, _, $, Handlebars, FolderView, treeArrowIconTemplate) {
	var TreeView = FolderView.extend({
		tagName: "div",

		initialize: function () {
			FolderView.prototype.initialize.call(this);
			this.registerPartials();
		},

		render: function () {
			this.$el.html(this._renderChildren());

			return this;
		},

		registerPartials: function () {
			Handlebars.registerPartial("treeArrowIcon", treeArrowIconTemplate);
		}
	});

	return TreeView;
});