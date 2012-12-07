define([
	"list/model/Node"
], function (Node) {
	var Composite = Node.extend({
		defaults: {
			icon: "",
			visible : false
		},

		initialize: function () {
			Node.prototype.initialize.call(this);
			this.set("children", new Backbone.Collection());
		},

		add: function (child) {
			this.get("children").add(child);
		},

		remove: function (child, preserveModel) {
			this.get("children").remove(child);
			preserveModel || child.destroy();
		},

		getChildren: function (recursiveSearch) {
			if (!recursiveSearch) {
				return this.get("children").toArray();
			}

			var buffer = [];

			this.get("children").forEach(function (child) {
				if (child.getChildren) {
					buffer = buffer.concat(child.getChildren(true));
				}
				buffer.push(child);
			});

			return buffer;
		},

		toJSON: function () {
			var children = [];

			this.get("children").forEach(function (child) {
				children.push(child.toJSON());
			});

			return {
				model: this.JSON_EXPORT,
				parameters: {
					visible: this.get("visible"),
					title: this.get("title")
				},
				children: children
			}
		}
	}, {
		JSON_EXPORT: "Composite"
	});

	return Composite;
});