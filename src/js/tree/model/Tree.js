define([
	"backbone",
	"underscore",
	"jquery",
	"tree/model/Folder"
], function (Backbone, _, $, Folder) {
	var Tree = Folder.extend({
		_lastSearch: null,

		initialize: function () {
			Folder.prototype.initialize.call(this);
			this.set("visible", true);
		},

		search: function (query) {
			_.each(this._lastSearch, function (child) {
				child.trigger("resetTitle");
			});

			var children = this.getChildren(true),
				results;

			results = _.filter(children, function (child) {
				var index = child.get("title").toLowerCase().indexOf(query.toLowerCase());

				if (index !== -1 && query !== "") {
					child.trigger("highlight", index, index + (query.length));
					return true;
				}

				return false;
			});

			this.trigger("search", results);

			this._lastSearch = results;
			return results;
		}
	});

	return Tree;
});