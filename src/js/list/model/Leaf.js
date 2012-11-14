define([
	"backbone",
	"underscore",
	"jquery",
	"list/model/Node"
], function (Backbone, _, $, Node) {
	var Leaf = Node.extend({
		defaults: {
			"icon": "leaf-icon"
		},

		initialize: function () {
			Node.prototype.initialize.call(this);
		},

		toJSON: function () {
			return {
				model: this.JSON_EXPORT,
				parameters: {
					title: this.get("title")
				}
			}
		}
	}, {
		JSON_EXPORT: "Leaf"
	});

	return Leaf;
});