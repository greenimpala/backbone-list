define([
	"list/model/Composite",
	"list/model/Leaf"
], function (Composite, Leaf) {
	describe("list/model/Composite", function () {

		it("should instantiate", function () {
			var model = new Composite();

			chai.assert.isDefined(model);
		});

		it("should create a children collection on initializing", function () {
			var model = new Composite();

			chai.assert.instanceOf(model.get("children"), Backbone.Collection);
		});

		it("can add a child", function () {
			var model = new Composite();

			model.add(new Composite());

			chai.assert.lengthOf(model.get("children"), 1);
		});

		it("can add an array of children", function () {
			var model = new Composite();
			var children = [new Leaf(), new Leaf(), new Composite()];

			model.add(children);

			chai.assert.lengthOf(model.get("children"), 3);
		});

		it("can remove a child", function () {
			var model = new Composite(),
				child = new Composite();

			model.add(child);
			model.remove(child);

			chai.assert.lengthOf(model.get("children"), 0);
		});

		it("sets a default icon property", function () {
			var model = new Composite();

			chai.assert.isString(model.get("icon"));
		});

		it("sets visibility to hidden if a composite item is added with no children", function () {
			var model = new Composite(),
				emptyFolder = new Composite();

			model.add(emptyFolder);

			chai.assert.isFalse(emptyFolder.get("visible"));
		});

		it("can get all children as array", function () {
			var model = new Composite();

			model.add(new Leaf());
			model.add(new Composite());
			model.add(new Leaf());

			var children = model.getChildren();

			chai.assert.isArray(children);
			chai.assert.equal(children.length, 3);
		});

		it("can get all children as array recursively", function () {
			var model = new Composite(),
				nested = new Composite();

			model.add(new Leaf());
			model.add(new Composite());
			nested.add(new Leaf());
			nested.add(new Composite());
			model.add(nested);


			var children = model.getChildren(true);

			chai.assert.isArray(children);
			chai.assert.equal(children.length, 5);
		});
	});
});