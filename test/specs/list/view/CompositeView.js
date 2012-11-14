define([
	"underscore",
	"handlebars",
	"list/view/ListView",
	"list/view/CompositeView",
	"list/view/LeafView",
	"list/model/List",
	"list/model/Leaf",
	"list/model/Composite"
], function (_, Handlebars, ListView, CompositeView, LeafView, List, Leaf, Composite) {

	(function () {
		ListView.prototype.registerPartials();
	}());

	describe("list/view/CompositeView", function () {

		it("instantiates with a model", function () {
			var model = new Composite();

			chai.assert.isDefined(new CompositeView({ model: model }));
		});

		it("initializes with an empty hash for child views", function () {
			var model = new Composite(),
				view = new CompositeView({ model: model });

			chai.assert.isObject(view.childViews);
		});

		it("creates a new FileView for a child File model when one is added", function () {
			var model = new Composite(),
				view = new CompositeView({ model: model }),
				childModel = new Leaf();

			model.add(childModel);

			chai.assert.instanceOf(view.childViews[childModel.cid], LeafView);
			chai.assert.equal(view.childViews[childModel.cid].model, childModel);
		});

		it("creates a new FolderView for a child Folder model when one is added", function () {
			var model = new Composite(),
				view = new CompositeView({ model: model }),
				childModel = new Composite();

			model.add(childModel);

			chai.assert.instanceOf(view.childViews[childModel.cid], CompositeView);
			chai.assert.equal(view.childViews[childModel.cid].model, childModel);
		});

		it("destroys a view for a child model when removed", function () {
			var model = new Composite,
				view = new CompositeView({ model: model }),
				childModel = new Leaf();

			model.add(childModel);
			model.remove(childModel);

			chai.assert.isUndefined(view.childViews[childModel.cid]);
		});

		it("calls render on all child views when render is called", function () {
			var model = new Composite(),
				view = new CompositeView({ model: model }),
				spies = [];

			model.add(new Leaf());
			model.add(new Leaf());
			model.add(new Leaf());

			_.each(view.childViews, function (view) {
				spies.push(sinon.spy(view, "render"));
			});

			view.render();

			_.each(spies, function (spy) {
				chai.assert.isTrue(spy.calledOnce);
			});
		});

		it("triggers an add event for each child when a model with children is added", function () {
			var folder = new Composite(),
				nestedFolder = new Composite(),
				view = new CompositeView({ model: folder }),
				childModels = nestedFolder.get("children"),
				spy;

			nestedFolder.add(new Leaf());
			nestedFolder.add(new Leaf());
			nestedFolder.add(new Leaf());
			spy = sinon.spy(childModels, "trigger");

			folder.add(nestedFolder);

			chai.assert.isTrue(spy.calledThrice);
		});

		it("creates a UL with n children LI elements when render is called", function () {
			var folder = new Composite(),
				view = new CompositeView({ model: folder });

			folder.add(new Leaf());
			folder.add(new Composite());
			folder.add(new Leaf());

			view.render();

			chai.assert.equal(view.$el.find("ul:first li").length, 3);
		});

		it("passes down animate option when creating child views", function () {
			var folder = new Composite();
			var view = new CompositeView({ model: folder, animate: true });

			folder.add(new Leaf());

			var childView = _.toArray(view.childViews)[0];

			chai.assert.isDefined(childView.options.animate);
			chai.assert.isTrue(childView.options.animate);
		});
	});
});