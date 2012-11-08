define([
	"backbone",
	"underscore",
	"jquery",
	"tree/model/Folder",
	"tree/model/File"
], function (Backbone, _, $, Folder, File) {
	var Tree = Folder.extend({
		_lastSearch: null,

		initialize: function () {
			Folder.prototype.initialize.call(this);
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

			if (child.model === "File") {
				childModel = new File(child.parameters);
			} else if (child.model === "Folder") {
				childModel = new Folder(child.parameters);

				if (child.children) {
					childModel.add(this._deserializeChildren(child.children));
				}
			}

			return childModel;
		},

		toJSON: function () {
			return Folder.prototype.toJSON.call(this).children;
		}
	});

	return Tree;
});