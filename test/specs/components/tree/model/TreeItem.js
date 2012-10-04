define([
	"components/tree/model/TreeItem",
	"components/tree/model/File"
], function (TreeItem) {
	describe("components/tree/model/TreeItem", function () {

		it("should instantiate", function () {
			var model = new TreeItem();

			chai.assert.isDefined(model);
		});

		it("sets a default visible property as true", function () {
			var model = new TreeItem();

			chai.assert.isBoolean(model.get("visible"));
		});
	});
});