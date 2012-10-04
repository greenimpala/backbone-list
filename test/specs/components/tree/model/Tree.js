define([
	"components/tree/model/Tree",
	"components/tree/model/File"
], function (Tree, File) {
	describe("components/tree/model/Tree", function () {

		it("should instantiate", function () {
			var treeModel = new Tree();

			chai.assert.isDefined(treeModel);
		});
	});
});