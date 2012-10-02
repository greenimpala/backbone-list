define([
	"underscore",
	"components/tree/view/FileView",
	"components/tree/view/FolderView",
	"components/tree/model/Tree",
	"components/tree/model/File",
	"components/tree/model/Folder"
], function (_, FileView, FolderView, Tree, File, Folder) {
	describe("components/tree/view/FileView", function () {

		it("instantiates with a model", function () {
            var fileModel = new File();

			chai.assert.isDefined(new FileView({ model: fileModel }));
		});
	});
});