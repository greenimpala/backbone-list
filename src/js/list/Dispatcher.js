define([
	"underscore",
	"backbone"
], function (_, Backbone) {
	var Dispatcher = _.clone(Backbone.Events);

	return Dispatcher;
});