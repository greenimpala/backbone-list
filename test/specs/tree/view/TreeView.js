define([
	"tree/view/TreeView",
	"tree/view/FolderView",
	"tree/model/Tree"
], function (TreeView, FolderView, Tree) {
	describe("tree/view/TreeView", function () {
		
		it("should instantiate with a model", function () {
			var treeModel = new Tree();
			
			chai.assert.isDefined(new TreeView({ model: treeModel }));
		});
	});
});