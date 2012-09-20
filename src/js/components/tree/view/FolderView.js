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

		childViews: null,

		initialize: function () {
			this.childViews = {};
			this.model.get("children").on("add", this.onChildAdded, this);
		},

		show: function () {
			this.$el.show();
		},

		hide: function () {
			this.$el.hide();
		},

		render: function () {

		},

		onChildAdded: function (child) {
			if (child instanceof File) {
				this.childViews[child.cid] = new FileView({ model: child });
			} else if (child instanceof Folder) {
				this.childViews[child.cid] = new FolderView({ model: child });
			}
		}
	});

	return FolderView;
});