define([
	"underscore",
	"components/tree/view/FolderView",
	"components/tree/view/FileView",
	"components/tree/model/Tree",
	"components/tree/model/File",
	"components/tree/model/Folder"
], function (_, FolderView, FileView, Tree, File, Folder) {
	describe("components/tree/view/FolderView", function () {

		it("instantiates with a model", function () {
			var folderModel = new Folder();

			chai.assert.isDefined(new FolderView({ model: folderModel }));
		});

		it("initializes with an empty hash for child views", function () {
			var folderModel = new Folder(),
				view = new FolderView({ model: folderModel });

			chai.assert.isObject(view.childViews);
		});

		it("creates a new FileView for a child File model when one is added", function () {
			var folderModel = new Folder(),
				view = new FolderView({ model: folderModel }),
				childModel = new File();

			folderModel.add(childModel);

			chai.assert.instanceOf(view.childViews[childModel.cid], FileView);
			chai.assert.equal(view.childViews[childModel.cid].model, childModel);
		});

		it("creates a new FolderView for a child Folder model when one is added", function () {
			var folderModel = new Folder(),
				view = new FolderView({ model: folderModel }),
				childModel = new Folder();

			folderModel.add(childModel);

			chai.assert.instanceOf(view.childViews[childModel.cid], FolderView);
			chai.assert.equal(view.childViews[childModel.cid].model, childModel);
		});

		it("destroys a view for a child model when removed", function () {
			var folderModel = new Folder,
				view = new FolderView({ model: folderModel }),
				childModel = new File();

			folderModel.add(childModel);
			folderModel.remove(childModel);

			chai.assert.isUndefined(view.childViews[childModel.cid]);
		});

		it("calls render on all child views when render is called", function () {
			var folderModel = new Folder(),
				view = new FolderView({ model: folderModel }),
				spies = [];

			folderModel.add(new File());
			folderModel.add(new File());
			folderModel.add(new File());

			_.each(view.childViews, function (view) {
				spies.push(sinon.spy(view, "render"));
			});

			view.render();

			_.each(spies, function (spy) {
				chai.assert.isTrue(spy.calledOnce);
			});
		});
	});
});