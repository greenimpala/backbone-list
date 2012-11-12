define([
	"backbone"
], function (Backbone) {
	var Node = Backbone.Model.extend({
		defaults: {
			"visible" : true
		},

		initialize: function () {

		}
	});

	return Node;
});