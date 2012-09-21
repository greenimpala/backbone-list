define([
	"components/tree/view/TreeView",
	"components/tree/model/Tree"
], function (TreeView, Tree) {
	describe("components/tree/view/TreeView", function () {
		
		it("should instantiate with a model", function () {
			var treeModel = new Tree();
			
			chai.assert(new TreeView({ model: treeModel }));
		});
	});
});