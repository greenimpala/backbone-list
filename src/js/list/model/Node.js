define([
	"list/Dispatcher"
], function (Dispatcher) {
	var Node = Backbone.Model.extend({
		defaults: {
			"visible" : true
		},

		initialize: function () {
			this.on("all", function () {
				Dispatcher.trigger.apply(Dispatcher, arguments);
			});
		}
	});

	return Node;
});