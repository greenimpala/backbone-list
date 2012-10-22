define([
	"tree/model/Folder"
], function (Folder) {
	describe("tree/model/Folder", function () {

		it("should instantiate", function () {
			var model = new Folder();

			chai.assert.isDefined(model);
		});

		it("should create a children collection on initializing", function () {
			var model = new Folder();

			chai.assert.instanceOf(model.get("children"), Backbone.Collection);
		});

		it("can add a child", function () {
			var model = new Folder();

			model.add(new Folder());

			chai.assert.lengthOf(model.get("children"), 1);
		});

		it("can remove a child", function () {
			var model = new Folder(),
				child = new Folder();

			model.add(child);
			model.remove(child);

			chai.assert.lengthOf(model.get("children"), 0);
		});

		it("sets a default icon property", function () {
			var model = new Folder();

			chai.assert.isString(model.get("icon"));
		});
	});
});