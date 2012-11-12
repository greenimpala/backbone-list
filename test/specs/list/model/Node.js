define([
	"list/model/Node"
], function (Node) {
	describe("list/model/Node", function () {

		it("should instantiate", function () {
			var model = new Node();

			chai.assert.isDefined(model);
		});

		it("sets a default visible property as true", function () {
			var model = new Node();

			chai.assert.isBoolean(model.get("visible"));
		});

		it("can set a function callback", function () {
			var model = new Node();
			model.set("onClick", function () {});

			chai.assert.isFunction(model.get("onClick"));
		});
	});
});