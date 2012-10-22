define([
	"backbone",
	"underscore",
	"jquery",
	"tree/model/Folder"
], function (Backbone, _, $, Folder) {
	var Tree = Folder.extend({
		initialize: function () {
			Folder.prototype.initialize.call(this);
		}
	});

	return Tree;
});