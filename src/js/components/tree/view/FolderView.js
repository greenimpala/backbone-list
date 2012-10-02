define([
	"backbone",
	"underscore",
	"jquery",
	"components/tree/model/File",
	"components/tree/model/Folder",
	"components/tree/view/FileView"
], function (Backbone, _, $, File, Folder, FileView) {
	var FolderView = Backbone.View.extend({
		className: "folder",

		tagName: "ul",

		childViews: null,

		initialize: function () {
			this.childViews = {};
			this.model.get("children").on("add", this.onChildModelAdded, this);
			this.model.get("children").on("remove", this.onChildModelRemoved, this);
		},

		render: function () {
			this.$el.empty();

            _.each(this.childViews, function (child) {
				this.$el.append(child.render().el);
			}, this);

			this.$el.prepend(this.model.get("title"));

			return this;
		},

		onChildModelAdded: function (model) {
			this._createChildView(model);

			if (model instanceof Folder) {
				model.get("children").each(function (child) {
					model.get("children").trigger("add", child);
				});
			}
		},

		onChildModelRemoved: function (model) {
			this._deleteChildView(model);
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