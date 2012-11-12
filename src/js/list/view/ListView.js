define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"list/view/CompositeView",
	"text!list/templates/_NodeView.html",
	"text!list/templates/Search.html"
], function (Backbone, _, $, Handlebars, CompositeView, _NodeView, Search) {
	var ListView = CompositeView.extend({
		tagName: "div",

		className: "list",

		searchTemplate: Handlebars.compile(Search),

		_$searchField: null,

		_$searchResults: null,

		events: {
			"click #clear-results"  : "clearResults",
			"keyup #search input"   : "onSearchKeypress"
		},

		initialize: function (args) {
			_.bindAll(this, "onSearchKeypress", "clearResults");
			this.model.on("search", this.updateTicker, this);

			if (args.options && args.options.search) {
				this._initializeSearch();
			}

			this.registerPartials();

			CompositeView.prototype.initialize.call(this);
		},

		registerPartials: function () {
			Handlebars.registerPartial("NodeView", _NodeView);
		},

		clearResults: function () {
			this._$searchField.val("").keyup().focus();
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
			this._$searchResults
				.toggleClass("hidden", results.length === 0)
				.find("strong")
				.html(results.length);
		},

		_initializeSearch: function () {
			this.$el.append(this.searchTemplate());

			this._$searchField = this.$el.find("#search input");
			this._$searchResults = this.$el.find("#search #results");
		}
	});

	return ListView;
});