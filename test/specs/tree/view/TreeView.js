define([
	"jquery",
	"tree/view/TreeView",
	"tree/view/FolderView",
	"tree/model/Tree"
], function ($, TreeView, FolderView, Tree) {
	describe("tree/view/TreeView", function () {
		
		it("should instantiate with a model", function () {
			var treeModel = new Tree();
			
			chai.assert.isDefined(new TreeView({ model: treeModel }));
		});

		it("attempts to search model on keyup event when search args given", function () {
			var fakeInput = $("<input>").val("test"),
				model = new Tree();

			var tree = new TreeView({
				model: model,
				search: { input: fakeInput }
			});

			var spy = sinon.spy(model, "search");
			fakeInput.keyup();

			chai.assert.isTrue(spy.calledOnce);
		});
	});
});