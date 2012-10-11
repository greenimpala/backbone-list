define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"components/tree/model/File",
	"components/tree/model/Folder",
	"components/tree/view/FileView",
	"text!components/tree/templates/FolderView.html"
], function (Backbone, _, $, Handlebars, File, Folder, FileView, template) {
	var FolderView = Backbone.View.extend({
		className: "folder",

		tagName: "li",

		template: Handlebars.compile(template),

		childViews: null,

		_domNodeHeader: null,

		_domNodeChildren: null,

		events: {
			"click .show-hide" : "showHideChildren"
		},

		initialize: function () {
			this.childViews = {};
			this.model.get("children").on("add", this.onChildModelAdded, this);
			this.model.get("children").on("remove", this.onChildModelRemoved, this);
			this.model.on("change:visible", this.onVisibilityChange, this);

			this._domNodeHeader = $(this.make("div")).appendTo(this.el);
			this._domNodeChildren = $(this.make("div")).appendTo(this.el);
		},

		render: function (collapse) {
			this._renderHeader();
			this._renderChildren(collapse);

			return this;
		},

		onChildModelAdded: function (model) {
			this._createChildView(model);

			// Manually trigger the 'add' event for any child models
			if (model instanceof Folder) {
				model.get("children").each(function (child) {
					model.get("children").trigger("add", child);
				});
			}
		},

		onChildModelRemoved: function (model) {
			this._deleteChildView(model);
		},

		onVisibilityChange: function (model) {
			var visible = model.get("visible");

			this.render(true);
		},

		showHideChildren: function (e) {
			e.preventDefault();

			var visible = this.model.get("visible");
			this.model.set("visible", visible ? false : true);
		},

		_createChildView: function (model) {
			var view;

			if (model instanceof File) {
				view = new FileView({ model: model });
			} else if (model instanceof Folder) {
				view = new FolderView({ model: model });
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
			this._domNodeHeader.html(result);
		},

		_renderChildren: function (collapse) {
			var ul = $(this.make("ul")).toggleClass("hidden", !this.model.get("visible"));

			_.each(this.childViews, function (child) {
				// Render folder as collapsed if necessary
				if (collapse === true && child instanceof FolderView) {
					child.model.set("visible", false);
				}

				ul.append(child.render().el);
			}, this);

			this._domNodeChildren.html(ul);
		}
	});

	return FolderView;
});