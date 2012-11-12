define([
	"list/model/Leaf"
], function (Leaf) {
	describe("list/model/Leaf", function () {

		it("should instantiate", function () {
			var model = new Leaf();

			chai.assert.isDefined(model);
		});

		it("sets a default icon property", function () {
			var model = new Leaf();

			chai.assert.isString(model.get("icon"));
		});
	});
});