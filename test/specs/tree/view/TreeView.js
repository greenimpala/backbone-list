define([
	"jquery",
	"tree/view/TreeView",
	"tree/view/FolderView",
	"tree/model/File",
	"tree/model/Tree"
], function ($, TreeView, FolderView, File, Tree) {
	describe("tree/view/TreeView", function () {
		
		it("should instantiate with a model", function () {
			var treeModel = new Tree();
			
			chai.assert.isDefined(new TreeView({ model: treeModel }));
		});

		it("attempts to search model on keyup event when search args given", function () {
			var model = new Tree();

			var tree = new TreeView({
				model: model,
				options: { search: true }
			}).render();

			var spy = sinon.spy(model, "search");
			tree.$el.find("#search input").keyup();

			chai.assert.isTrue(spy.calledOnce);
		});

		it("updates ticker when search results change", function () {
			var model = new Tree();
			model.add(new File({ title: "test value" }));
			model.add(new File({ title: "test value" }));
			model.add(new File({ title: "other value" }));

			var tree = new TreeView({
				model: model,
				options: { search: true }
			}).render();

			tree.$el.find("#search input").val("test").keyup();

			chai.assert.equal(2, tree.$el.find("#search span strong").html());
		});
	});
});