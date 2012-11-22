define([
], function () {
	var NodeView = Backbone.View.extend({
		initialize: function () {
			this.model.on("highlight", this.highlightTitle, this);
			this.model.on("resetTitle", this.clearTitleHighlights, this)
		},

		events: {
			"dblclick .title"       : "edit",
			"blur .title-edit"      : "cancelEdit",
			"keypress .title-edit"  : "saveEditOnEnter",
			"click .title"          : "fireUserOnClick"
		},

		edit: function (e) {
			e.stopImmediatePropagation();

			if (this.model.get("editable") !== true) {
				return;
			}

			this.$el.find(".title:first").hide();
			this.$el.addClass("editing");

			this.$el
				.find(".title-edit:first")
				.show()
				.find("input").focus();
		},

		cancelEdit: function (e) {
			e.stopImmediatePropagation();

			this.$el.find(".title-edit:first")
				.hide()
				.find("input")
				.val(this.model.get("title"));

			this.$el.find(".title:first").show();
			this.$el.removeClass("editing");
		},

		saveEditOnEnter: function (e) {
			e.stopImmediatePropagation();

			var title = $.trim(e.target.value),
				enterKeyCode = 13;

			if (e.which === enterKeyCode && title.length > 0) {
				this.model.set("title", e.target.value);
				this.render();
				this.$el.removeClass("editing");
			}
		},

		fireUserOnClick: function (e) {
			e.stopImmediatePropagation();

			var onClick = this.model.get("onClick");

			if (onClick && _.isFunction(onClick)) {
				onClick(this.model);
			}

			this.model.trigger("clicked");
		},

		highlightTitle: function (from, to) {
			var title = this.model.get("title"),
				pre = title.substring(0, from),
				mid = title.substring(from, to),
				post = title.substring(to, title.length);

			this.$el.find(".title:first")
				.html(pre + '<span class="highlight">' + mid +  '</span>' + post);
		},

		clearTitleHighlights: function () {
			this.$el.find(".title:first").html(this.model.get("title"));
		}
	});

	return NodeView;
});