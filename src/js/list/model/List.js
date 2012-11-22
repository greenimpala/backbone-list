define([
	"list/model/Composite",
	"list/model/Leaf"
], function (Composite, Leaf) {
	var List = Composite.extend({
		_lastSearch: null,

		initialize: function () {
			Composite.prototype.initialize.call(this);
			this.set("visible", true);
			this.on("all", this.dispatchEvent, this);
		},

		search: function (query) {
			_.each(this._lastSearch, function (child) {
				child.trigger("resetTitle");
			});

			var children = this.getChildren(true),
				results;

			results = _.filter(children, function (child) {
				var index = child.get("title").toLowerCase().indexOf(query.toLowerCase());

				if (index >= 0 && query !== "") {
					child.trigger("highlight", index, index + (query.length));
					return true;
				}

				return false;
			});

			this.trigger("search", results);

			this._lastSearch = results;
			return results;
		},

		deserialize: function (json) {
			var children = _.isString(json) ? JSON.parse(json) : json;

			var childModels = this._deserializeChildren(children);

			this.add(childModels);
		},

		_deserializeChildren: function (children) {
			var childModels = [];

			_.each(children, function (child) {
				var childModel = this._deserializeChild(child);

				if (childModel) {
					childModels.push(childModel);
				}
			}, this);

			return childModels;
		},

		_deserializeChild: function (child) {
			var childModel;

			if (child.model === Leaf.JSON_EXPORT) {
				childModel = new Leaf(child.parameters);
			} else if (child.model === Composite.JSON_EXPORT) {
				childModel = new Composite(child.parameters);

				if (child.children) {
					childModel.add(this._deserializeChildren(child.children));
				}
			}

			return childModel;
		},

		toJSON: function () {
			return Composite.prototype.toJSON.call(this).children;
		}
	});

	return List;
});