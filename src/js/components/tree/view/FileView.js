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

		events: {
			"dblclick .title"       : "edit",
			"blur .title-edit"      : "cancelEdit",
			"keypress .title-edit"  : "saveEditOnEnter"
		},

		render: function () {
			var renderedTemplate = this.template(this.model.attributes);

            this.$el.html(renderedTemplate);

			return this;
		},

		edit: function () {
			this.$el.find(".title").addClass("hidden");
			this.$el.addClass("editing");

			this.$el.find(".title-edit").removeClass("hidden")
				.find("input").focus();
		},

		cancelEdit: function () {
			this.$el.find(".title-edit").addClass("hidden")
				.find("input").val(this.model.get("title"));

			this.$el.find(".title").removeClass("hidden");
			this.$el.removeClass("editing");
		},

		saveEditOnEnter: function (e) {
			var title = $.trim(e.target.value);

			// If Enter key pressed
			if (e.which === 13 && title.length > 0) {
				this.model.set("title", e.target.value);
				this.render();
				this.$el.removeClass("editing");
			}
		}
	});

	return FileView;
});