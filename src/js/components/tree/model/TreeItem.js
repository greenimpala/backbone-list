define([
	"backbone",
	"underscore",
	"jquery"
], function (Backbone, _, $) {
	var TreeItem = Backbone.Model.extend({
		initialize: function () {
			this.set("visible", true);
		}
	});

	return TreeItem;
});