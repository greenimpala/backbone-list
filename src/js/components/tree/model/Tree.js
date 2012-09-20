define([
	"backbone",
	"underscore",
	"jquery",
	"components/tree/model/Folder"
], function (Backbone, _, $, Folder) {
	var Tree = Folder.extend({
		initialize: function () {
			Folder.prototype.initialize.call(this);
		}
	});

	return Tree;
});