define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"tree/view/FolderView",
	"text!tree/templates/_TreeItemView.html",
	"text!tree/templates/Search.html"
], function (Backbone, _, $, Handlebars, FolderView, _TreeItemView, Search) {
	var TreeView = FolderView.extend({
		tagName: "div",

		className: "tree",

		searchTemplate: Handlebars.compile(Search),

		_$searchField: null,

		_$ticker: null,

		initialize: function (args) {
			_.bindAll(this, "onSearchKeypress");
			this.model.on("search", this.updateTicker, this);

			if ((args.options || {}).search) {
				this._initializeSearch();
			}

			this.registerPartials();

			FolderView.prototype.initialize.call(this);
		},

		registerPartials: function () {
			Handlebars.registerPartial("TreeItemView", _TreeItemView);
		},

		render: function () {
			this._renderChildren();

			return this;
		},

		onSearchKeypress: function () {
			var query = $.trim(this._$searchField.val());

			this.model.search(query);
		},

		updateTicker: function (results) {
			this._$ticker
				.toggleClass("hidden", results.length === 0)
				.find("strong")
				.html(results.length)
		},

		_initializeSearch: function () {
			this.$el.append(this.searchTemplate());

			this._$searchField = this.$el.find("#search input");
			this._$ticker = this.$el.find("#search span");

			this._$searchField.keyup(this.onSearchKeypress);
		}
	});

	return TreeView;
});