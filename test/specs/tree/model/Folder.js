define([
	"tree/model/Folder",
	"tree/model/File"
], function (Folder, File) {
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

		it("can add an array of children", function () {
			var model = new Folder();
			var children = [new File(), new File(), new Folder()];

			model.add(children);

			chai.assert.lengthOf(model.get("children"), 3);
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

		it("sets visibility to hidden if a folder is added with no children", function () {
			var folder = new Folder(),
				emptyFolder = new Folder();

			folder.add(emptyFolder);

			chai.assert.isFalse(emptyFolder.get("visible"));
		});

		it("can get all children as array", function () {
			var folder = new Folder();

			folder.add(new File());
			folder.add(new Folder());
			folder.add(new File());

			var children = folder.getChildren();

			chai.assert.isArray(children);
			chai.assert.equal(children.length, 3);
		});

		it("can get all children as array recursively", function () {
			var folder = new Folder(),
				nested = new Folder();

			folder.add(new File());
			folder.add(new Folder());
			nested.add(new File());
			nested.add(new Folder());
			folder.add(nested);


			var children = folder.getChildren(true);

			chai.assert.isArray(children);
			chai.assert.equal(children.length, 5);
		});
	});
});