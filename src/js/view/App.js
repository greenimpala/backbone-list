define(["backbone"], function (Backbone) {
	var App = Backbone.View.extend({
		el: $("body"),

		initialize: function () {
			this.$el.text("App started!");
		}
	});
	return App;
});