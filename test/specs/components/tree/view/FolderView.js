define([
	"components/tree/view/FolderView",
	"components/tree/model/Tree",
	"components/tree/model/File"
], function (FolderView, Tree, File) {
	describe("components/tree/view/FolderView", function () {

		it("should instantiate with a model", function () {
			var treeModel = new Tree();
			
			chai.assert(new FolderView({ model: treeModel }));
		});

		it("should initialize with an empty hash for child views", function () {
			var treeModel = new Tree(),
				view = new FolderView({ model: treeModel });

			chai.assert.isObject(view.childViews);
		});

		it("should create a view for a child model when one is added", function () {
			var treeModel = new Tree(),
				view = new FolderView({ model: treeModel }),
				childModel = new File();

			treeModel.add(childModel);

			chai.assert.isDefined(view.childViews[childModel.cid]);
			chai.assert.equal(view.childViews[childModel.cid].model, childModel);
		});

	});
});