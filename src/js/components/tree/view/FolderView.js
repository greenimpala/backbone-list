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

		initialize: function () {
			this.childViews = {};
			this.model.get("children").on("add", this.onChildModelAdded, this);
			this.model.get("children").on("remove", this.onChildModelRemoved, this);
			this.model.on("change:visible", this.onVisibilityChange, this);
		},

		render: function () {
			this.$el.html(this.template(this.model.attributes));
			this.$el.append(this._renderChildren());

			return this;
		},

		_renderChildren: function () {
			var ul = $(this.make("ul"));
			ul.toggle(this.model.get("visible"));

			_.each(this.childViews, function (child) {
				ul.append(child.render().el);
			}, this);

			return ul;
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

			this.render();
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
		}
	});

	return FolderView;
});