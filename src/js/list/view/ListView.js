define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"list/view/CompositeView",
	"text!list/templates/_NodeView.html",
	"text!list/templates/Search.html",
	"list/model/List"
], function (Backbone, _, $, Handlebars, CompositeView, _NodeView, Search, List) {
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

		initialize: function () {
			_.bindAll(this, "onSearchKeypress", "clearResults");
			this.model.on("search", this.updateTicker, this);

			if (this.options.search) {
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

			this._$searchResults.toggle(query.length > 0);
		},

		updateTicker: function (results) {
			this._$searchResults
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