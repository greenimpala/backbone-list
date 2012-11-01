require([
	"underscore",
	"jquery",
	"tree/view/FileView",
	"tree/view/FolderView",
	"tree/model/Tree",
	"tree/model/File"
], function (_, $, FileView, FolderView, Tree, File) {
	describe("tree/view/FileView", function () {

		it("instantiates with a model", function () {
            var model = new File();

			chai.assert.isDefined(new FileView({ model: model }));
		});

		it("Edit post hides title and shows editable form field", function () {
			var model = new File(),
				view = new FileView({ model: model });

			view.render().edit($.Event());

			chai.assert.isTrue(view.$el.find(".title").hasClass("hidden"));
			chai.assert.isFalse(view.$el.find(".title-edit").hasClass("hidden"));
		});

		it("Cancel edit hides editable form field and shows title", function () {
			var model = new File(),
				view = new FileView({ model: model });

			view.render().edit($.Event());
			view.cancelEdit($.Event());

			chai.assert.isFalse(view.$el.find(".title").hasClass("hidden"));
			chai.assert.isTrue(view.$el.find(".title-edit").hasClass("hidden"));
		});
	});
});