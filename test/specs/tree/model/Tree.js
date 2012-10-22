define([
	"tree/model/Tree",
	"tree/model/File"
], function (Tree, File) {
	describe("tree/model/Tree", function () {

		it("should instantiate", function () {
			var treeModel = new Tree();

			chai.assert.isDefined(treeModel);
		});
	});
});