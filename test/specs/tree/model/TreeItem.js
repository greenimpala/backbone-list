define([
	"tree/model/TreeItem",
	"tree/model/File"
], function (TreeItem) {
	describe("tree/model/TreeItem", function () {

		it("should instantiate", function () {
			var model = new TreeItem();

			chai.assert.isDefined(model);
		});

		it("sets a default visible property as true", function () {
			var model = new TreeItem();

			chai.assert.isBoolean(model.get("visible"));
		});

		it("can set a function callback", function () {
			var model = new TreeItem();
			model.set("onClick", function () {});

			chai.assert.isFunction(model.get("onClick"));
		});
	});
});