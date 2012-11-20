require([
	"list/Dispatcher",
	"list/view/LeafView",
	"list/view/CompositeView",
	"list/model/List",
	"list/model/Leaf"
], function (Dispatcher, LeafView, CompositeView, List, Leaf) {
	describe("list/Dispatcher", function () {
		it("receives child events from nested models", function (done) {
			var model = new List();
			var leaf = new Leaf({ title: "testTitle" });

			model.add(leaf);

			Dispatcher.on("change:title", function (leafModel) {
				chai.assert.equal(leafModel, leaf);
				chai.assert.equal("newTestTitle", leafModel.get("title"));
				done();
			});

			leaf.set("title", "newTestTitle")
		});
	});
});