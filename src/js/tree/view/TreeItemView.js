define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars"
], function (Backbone, _, $, Handlebars) {
	var TreeItemView = Backbone.View.extend({
		initialize: function () {

		},

		events: {
			"dblclick .title"       : "edit",
			"blur .title-edit"      : "cancelEdit",
			"keypress .title-edit"  : "saveEditOnEnter"
		},

		edit: function (e) {
			e.stopImmediatePropagation();

			this.$el.find(".title:first").addClass("hidden");
			this.$el.addClass("editing");

			this.$el.find(".title-edit:first").removeClass("hidden")
				.find("input").focus();
		},

		cancelEdit: function (e) {
			e.stopImmediatePropagation();

			this.$el.find(".title-edit:first").addClass("hidden")
				.find("input").val(this.model.get("title"));

			this.$el.find(".title:first").removeClass("hidden");
			this.$el.removeClass("editing");
		},

		saveEditOnEnter: function (e) {
			e.stopImmediatePropagation();

			var title = $.trim(e.target.value);

			// If Enter key pressed
			if (e.which === 13 && title.length > 0) {
				this.model.set("title", e.target.value);
				this.render();
				this.$el.removeClass("editing");
			}
		}
	});

	return TreeItemView;
});