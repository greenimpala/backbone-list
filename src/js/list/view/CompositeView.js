define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"list/view/NodeView",
	"list/model/Leaf",
	"list/model/Composite",
	"list/view/LeafView",
	"text!list/templates/CompositeView.html"
], function (Backbone, _, $, Handlebars, NodeView, Leaf, Composite, LeafView, template) {
	var CompositeView = NodeView.extend({
		className: "node composite",

		tagName: "li",

		template: Handlebars.compile(template),

		childViews: null,

		_$header: null,

		_$children: null,

		events: {
			"click .composite-content .expander" :   "showHideChildren",
			"click .composite-content .icon"     :   "showHideChildren"
		},

		initialize: function () {
			this.events = _.extend({}, NodeView.prototype.events, this.events);
			NodeView.prototype.initialize.call(this);

			this.childViews = {};

			this.model.get("children").on("add", this.addChildViewForModel, this);
			this.model.get("children").on("remove", this.removeChildViewForModel, this);
			this.model.on("change:visible", this.onVisibilityChange, this);

			this._$header = $(this.make("div")).appendTo(this.el);
			this._$children = $(this.make("ul")).appendTo(this.el);
		},

		render: function () {
			this._renderHeader();
			this._renderChildren();

			return this;
		},

		addChildViewForModel: function (model) {
			this._createChildView(model);

			if (model instanceof Composite) {
				// Manually trigger the 'add' event for any child models
				model.get("children").each(function (child) {
					model.get("children").trigger("add", child);
				});
			}
		},

		removeChildViewForModel: function (model) {
			this._deleteChildView(model);
		},

		onVisibilityChange: function () {
			var ul = this.$el.find("ul:first");

			this.$el
				.find("span.expander-icon:first, span.composite-icon:first")
				.toggleClass("open", this.model.get("visible"));

			if (this.options.animate) {
				ul.slideToggle("fast");
			} else {
				ul.toggle();
			}
		},

		showHideChildren: function (e) {
			e.stopImmediatePropagation();

			var visible = this.model.get("visible");
			this.model.set("visible", visible ? false : true);
		},

		_createChildView: function (model) {
			var view;
			var properties = _.extend({ model: model }, {
				animate: this.options.animate
			});

			if (model instanceof Leaf) {
				view = new LeafView(properties);
			} else if (model instanceof Composite) {
				view = new CompositeView(properties);
			}
			this.childViews[model.cid] = view;

			return view;
		},

		_deleteChildView: function (model) {
			this.childViews[model.cid].remove();
			delete this.childViews[model.cid];
		},

		_renderHeader: function () {
			var result = this.template(this.model.attributes);
			this._$header.html(result);
		},

		_renderChildren: function () {
			var fragment = document.createDocumentFragment();

			_.each(this.childViews, function (child) {
				fragment.appendChild(child.render().el);
			}, this);

			this._$children
				.toggle(this.model.get("visible"))
				.html(fragment);
		}
	});

	return CompositeView;
});