define([
	"list/model/List",
	"list/model/Leaf",
	"list/model/Composite"
], function (List, Leaf, Composite) {
	describe("list/model/List", function () {

		it("should instantiate", function () {
			var view = new List();

			chai.assert.isDefined(view);
		});

		it("can search the tree using depth-first search returning an array of results", function () {
			var view = new List();

			var model = new Composite({ title: "holiday photos" });
			model.add(new Leaf({ title: "picture 1" }));
			model.add(new Leaf({ title: "picture 2" }));
			model.add(new Leaf({ title: "image 3" }));
			model.add(new Composite({ title: "test folder 1" }));
			view.add(model);

			var results = view.search("picture");

			chai.assert.isArray(results);
			chai.assert.equal(results.length, 2);
		});

		it("can search the list with case insensitivity", function () {
			var view = new List();

			var model = new Composite({ title: "PICTURES" });
			model.add(new Leaf({ title: "PICTURE 1" }));
			view.add(model);

			var results = view.search("picture");

			chai.assert.equal(results.length, 2);
		});

		it("triggers a highlight event on matched children with a from and to index", function () {
			var view = new List();
			var model = new Composite({ title: "holiday photos" });
			view.add(model);
			var spy = sinon.spy(model, "trigger");

			view.search("day");

			chai.assert.isTrue(spy.calledWith("highlight", 4, 7));
		});

		it("triggers a resetTitle event on any old search result set", function () {
			var view = new List();
			var model = new Composite({ title: "holiday photos" });
			view.add(model);
			var spy = sinon.spy(model, "trigger");

			view.search("holiday");
			view.search("photos");

			chai.assert.isTrue(spy.calledWith("resetTitle"));
		});

		it("triggers a search event when a search has been performed that returns an array of results", function (done) {
			var view = new List();
			var model = new Composite({ title: "holiday photos" });
			view.add(model);

			view.on("search", function (results) {
				chai.assert.equal(model, results[0]);
				done();
			});

			view.search("holiday");
		});

		it("can parse a JSON list structure to produce a list", function () {
			var view = new List();
			var jsonStructure = [
				{
					model: "Composite",
					parameters: { title: "test composite" },
					children: [
						{
							model: "Leaf",
							parameters: { title: "nested test leaf" }
						}
					]
				},
				{
					model: "Leaf",
					parameters: { title: "test leaf" },
					children: []
				}
			];

			view.deserialize(JSON.stringify(jsonStructure));

			chai.assert.equal(2, view.getChildren().length);
			chai.assert.equal(1, view.getChildren()[0].getChildren().length);
			chai.assert.instanceOf(view.getChildren()[0], Composite);
			chai.assert.instanceOf(view.getChildren()[0].getChildren()[0], Leaf);
		});

		it("can serialize a list structure into JSON", function () {
			var view = new List();

			var model = new Composite({ title: "test composite" });
			model.add(new Leaf({ title: "nested test leaf" }));
			view.add(model);
			view.add(new Leaf({ title: "test leaf" }));

			var result = view.toJSON();
			chai.assert.lengthOf(result, 2);
			chai.assert.equal("nested test leaf", result[0].children[0].parameters.title);
		});
	});
});