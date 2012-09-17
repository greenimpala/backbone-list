define([
	"backbone",
	"underscore",
	"jquery"
], function (Backbone, _, $) {
	var TreeItem = Backbone.Model.extend({
		show: function () {},
		hide: function () {}
	});

	return TreeItem;
});