define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"tree/view/TreeItemView",
	"text!tree/templates/FileView.html"
], function (Backbone, _, $, Handlebars, TreeItemView, template) {
	var FileView = TreeItemView.extend({
		className: "item file",

        tagName: "li",

		template: Handlebars.compile(template),

		events: {

		},

		initialize: function () {
			this.events = _.extend({}, TreeItemView.prototype.events, this.events);
			TreeItemView.prototype.initialize.call(this);
		},

		render: function () {
			var renderedTemplate = this.template(this.model.attributes);

            this.$el.html(renderedTemplate);

			return this;
		}
	});

	return FileView;
});