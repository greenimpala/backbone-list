define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"tree/view/FolderView",
	"text!tree/templates/_TreeItemView.html",
	"text!tree/templates/Ticker.html"
], function (Backbone, _, $, Handlebars, FolderView, _TreeItemView, Ticker) {
	var TreeView = FolderView.extend({
		tagName: "div",

		className: "tree",

		tickerTemplate: Handlebars.compile(Ticker),

		_$searchField: null,

		_$ticker: null,

		initialize: function (options) {
			_.bindAll(this, "onSearchKeypress");
			this.model.on("search", this.updateTicker, this);

			if (options.search) {
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
			if (this._$ticker) {
				this._$ticker.html(this.tickerTemplate({
					results: results.length
				}));
			}
		},

		_initializeSearch: function () {
			var input = this.options.search.input,
				ticker = this.options.search.ticker;

			if (input) {
				this._$searchField = input;
				input.on("keyup", this.onSearchKeypress);
			}

			if (ticker) {
				this._$ticker = $(ticker);
			}
		}
	});

	return TreeView;
});