define([
	"view/tree/Folder",
	"view/tree/File"
], function (Folder, File) {
	describe("view/tree/Folder", function () {
		it("should instantiate", function () {
			chai.assert(new Folder());
		});

		it("can add a parent node", function () {
			var parent = new Folder(),
				child = new Folder();

			parent.add(child);

			assert.equal(parent.getChild(0), child);
			assert.equal(parent.children.length, 1);
		});

		it("can add a leaf node", function () {
			var parent = new Folder(),
				child = new File();

			parent.add(child);

			assert.equal(parent.getChild(0), child);
			assert.equal(parent.children.length, 1);
		});
	});
});