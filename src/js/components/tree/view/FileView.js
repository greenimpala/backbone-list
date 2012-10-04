define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"text!components/tree/templates/FileView.html"
], function (Backbone, _, $, Handlebars, template) {
	var FileView = Backbone.View.extend({
		className: "file",

        tagName: "li",

		template: Handlebars.compile(template),

		render: function () {
			var renderedTemplate = this.template(this.model.attributes);

            this.$el.html(renderedTemplate);

			return this;
		}
	});

	return FileView;
});