define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"list/view/NodeView",
	"text!list/templates/LeafView.html"
], function (Backbone, _, $, Handlebars, NodeView, template) {
	var LeafView = NodeView.extend({
		className: "node leaf",

        tagName: "li",

		template: Handlebars.compile(template),

		events: {

		},

		initialize: function () {
			this.events = _.extend({}, NodeView.prototype.events, this.events);
			NodeView.prototype.initialize.call(this);
		},

		render: function () {
			var renderedTemplate = this.template(this.model.attributes);

            this.$el.html(renderedTemplate);

			return this;
		}
	});

	return LeafView;
});