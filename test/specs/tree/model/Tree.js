define([
	"tree/model/Tree",
	"tree/model/File",
	"tree/model/Folder"
], function (Tree, File, Folder) {
	describe("tree/model/Tree", function () {

		it("should instantiate", function () {
			var tree = new Tree();

			chai.assert.isDefined(tree);
		});

		it("can search the tree using depth-first search returning an array of results", function () {
			var tree = new Tree();

			var folder = new Folder({ title: "holiday photos" });
			folder.add(new File({ title: "picture 1" }));
			folder.add(new File({ title: "picture 2" }));
			folder.add(new File({ title: "image 3" }));
			folder.add(new Folder({ title: "test folder 1" }));
			tree.add(folder);

			var results = tree.search("picture");

			chai.assert.isArray(results);
			chai.assert.equal(results.length, 2);
		});

		it("can search the tree with case insensitivity", function () {
			var tree = new Tree();

			var folder = new Folder({ title: "PICTURES" });
			folder.add(new File({ title: "PICTURE 1" }));
			tree.add(folder);

			var results = tree.search("picture");

			chai.assert.equal(results.length, 2);
		});

		it("triggers a highlight event on matched children with a from and to index", function () {
			var tree = new Tree();
			var folder = new Folder({ title: "holiday photos" });
			tree.add(folder);
			var spy = sinon.spy(folder, "trigger");

			tree.search("day");

			chai.assert.isTrue(spy.calledWith("highlight", 4, 7));
		});

		it("triggers a resetTitle event on any old search result set", function () {
			var tree = new Tree();
			var folder = new Folder({ title: "holiday photos" });
			tree.add(folder);
			var spy = sinon.spy(folder, "trigger");

			tree.search("holiday");
			tree.search("photos");

			chai.assert.isTrue(spy.calledWith("resetTitle"));
		});

		it("triggers a search event when a search has been performed that returns an array of results", function (done) {
			var tree = new Tree();
			var folder = new Folder({ title: "holiday photos" });
			tree.add(folder);

			tree.on("search", function (results) {
				chai.assert.equal(folder, results[0]);
				done();
			});

			tree.search("holiday");
		});

		it("can parse a JSON tree structure to produce a tree", function () {
			var tree = new Tree();
			var jsonStructure = [
				{
					model: "Folder",
					parameters: { title: "test folder" },
					children: [
						{
							model: "File",
							parameters: { title: "nested test file" }
						}
					]
				},
				{
					model: "File",
					parameters: { title: "test file" },
					children: []
				}
			];

			tree.deserialize(JSON.stringify(jsonStructure));

			chai.assert.equal(2, tree.getChildren().length);
			chai.assert.equal(1, tree.getChildren()[0].getChildren().length);
			chai.assert.instanceOf(tree.getChildren()[0], Folder);
			chai.assert.instanceOf(tree.getChildren()[0].getChildren()[0], File);
		});

		it("can serialize a tree structure into JSON", function () {
			var tree = new Tree();

			var folder = new Folder({ title: "test folder" });
			folder.add(new File({ title: "nested test file" }));
			tree.add(folder);
			tree.add(new File({ title: "test file" }));

			var result = tree.toJSON();
			chai.assert.lengthOf(result, 2);
			chai.assert.equal("nested test file", result[0].children[0].parameters.title);
		});
	});
});