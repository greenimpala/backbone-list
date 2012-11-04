require([
	"underscore",
	"jquery",
	"tree/view/TreeItemView",
	"tree/model/File"
], function (_, $, TreeItemView, File) {
	describe("tree/view/TreeItemView", function () {
		it ("highlights the title", function () {
			var view = new TreeItemView({
				model: new File({ title: "test" })
			});

			view.highlightTitle();
		});
	});
});