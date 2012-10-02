define([
	"components/tree/model/Folder"
], function (Folder) {
	describe("components/tree/model/Folder", function () {

		it("should instantiate", function () {
			var folderModel = new Folder();

			chai.assert(folderModel);
		});

		it("should create a children collection on initializing", function () {
			var folderModel = new Folder();

			chai.assert.instanceOf(folderModel.get("children"), Backbone.Collection);
		});

		it("can add a child", function () {
			var folderModel = new Folder();

			folderModel.add(new Folder());

			chai.assert.lengthOf(folderModel.get("children"), 1);
		});

		it("can remove a child", function () {
			var folderModel = new Folder(),
				child = new Folder();

			folderModel.add(child);
			folderModel.remove(child);

			chai.assert.lengthOf(folderModel.get("children"), 0);
		});
	});
});