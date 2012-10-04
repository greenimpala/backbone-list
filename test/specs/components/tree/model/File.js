define([
	"components/tree/model/File"
], function (File) {
	describe("components/tree/model/File", function () {

		it("should instantiate", function () {
			var model = new File();

			chai.assert.isDefined(model);
		});

		it("sets a default icon property", function () {
			var model = new File();

			chai.assert.isString(model.get("icon"));
		});
	});
});