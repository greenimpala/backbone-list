define([
	"backbone",
	"underscore",
	"jquery"
], function (Backbone, _, $) {
	var TreeItem = Backbone.Model.extend({
		defaults: {
			"visible" : true
		},

		initialize: function () {

		}
	});

	return TreeItem;
});