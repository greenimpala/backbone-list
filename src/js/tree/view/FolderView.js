define([
	"backbone",
	"underscore",
	"jquery",
	"handlebars",
	"tree/model/File",
	"tree/model/Folder",
	"tree/view/FileView",
	"text!tree/templates/FolderView.html"
], function (Backbone, _, $, Handlebars, File, Folder, FileView, template) {
	var FolderView = Backbone.View.extend({
		className: "folder",

		tagName: "li",

		template: Handlebars.compile(template),

		childViews: null,

		_$header: null,

		_$children: null,

		events: {
			"click .arrow" : "showHideChildren"
		},

		initialize: function () {
			this.childViews = {};
			this.model.get("children").on("add", this.onChildModelAdded, this);
			this.model.get("children").on("remove", this.onChildModelRemoved, this);
			this.model.on("change:visible", this.onVisibilityChange, this);

			this._$header = $(this.make("div")).appendTo(this.el);
			this._$children = $(this.make("div")).appendTo(this.el);
		},

		render: function () {
			this._renderHeader();
			this._renderChildren();

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

		onVisibilityChange: function () {
			this.render();
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
			this._$header.html(result);
		},

		_renderChildren: function () {
			var ul = $(this.make("ul")).toggleClass("hidden", !this.model.get("visible"));

			_.each(this.childViews, function (child) {
				ul.append(child.render().el);
			}, this);

			this._$children.html(ul);
		}
	});

	return FolderView;
});