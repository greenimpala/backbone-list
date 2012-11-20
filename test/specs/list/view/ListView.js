define([
	"list/view/ListView",
	"list/view/CompositeView",
	"list/model/Leaf",
	"list/model/List"
], function (ListView, CompositeView, Leaf, List) {
	describe("list/view/ListView", function () {

		it("should instantiate with a model", function () {
			var model = new List();

			chai.assert.isDefined(new ListView({ model: model }));
		});

		it("attempts to search model on keyup event when search args given", function () {
			var model = new List();

			var view = new ListView({
				model: model,
				search: true
			}).render();

			var spy = sinon.spy(model, "search");
			view.$el.find("#search input").keyup();

			chai.assert.isTrue(spy.calledOnce);
		});

		it("updates ticker when search results change", function () {
			var model = new List();
			model.add(new Leaf({ title: "test value" }));
			model.add(new Leaf({ title: "test value" }));
			model.add(new Leaf({ title: "other value" }));

			var view = new ListView({
				model: model,
				search: true
			}).render();

			view.$el.find("#search input").val("test").keyup();

			chai.assert.equal(2, view.$el.find("#search span strong").html());
		});

		it("clears results when clear clicked on", function () {
			var model = new List();
			var view = new ListView({
				model: model,
				search: true
			}).render();

			view.$el.find("#search input").val("testVal");
			chai.assert.equal("testVal", view.$el.find("#search input").val());

			view.$el.find("#search #clear-results").click();
			chai.assert.equal("", view.$el.find("#search input").val());
		});

		it("hides ticker when search field empty", function () {
			var model = new List();
			var view = new ListView({
				model: model,
				search: true
			}).render();

			view.$el.find("#search input").val("testVal").keyup();
			chai.assert.notEqual("none", view.$el.find("#search #results").css("display"));
			view.$el.find("#search input").val("").keyup();
			chai.assert.equal("none", view.$el.find("#search #results").css("display"));
		});
	});
});