Backbone-List
====================

A powerful, extendible list component for Backbone.js applications.

* Extendable
* Lightweight _(4.8KB gzipped)_
* LESS themes
* Data persitence
* Modular _(Require.js)_
* Unit tested

<table>
<tr>
<td><img height="70%" src="https://raw.github.com/st3redstripe/Backbone-List/master/example/clean.png"/></td>
<td><img src="https://raw.github.com/st3redstripe/Backbone-List/master/example/explorer.png"/></td>
</tr>
<tr>
<td><em><strong>Clean</strong> theme with Glyphicons</em></td>
<td><em><strong>Explorer</strong> theme with search enabled</em></td>
</tr>
</table>

## Usage

Aside from Backbone and it's associated dependecies - Backbone-List requires the [Handlebars](https://github.com/wycats/handlebars.js/) templating library.

Backbone-List is built with [almond](https://github.com/jrburke/almond), a mini script loader. Include the minified script file in your page to `require` needed components.

To begin, create a new `List` model and a `ListView` view. When instantiating the view, pass the model as a parameter to bind it to the view. You can then begin adding nodes to the list.

```js
require([
	"list/model/List",
	"list/view/ListView"
], function (List, ListView) {
	var model = new List();
	var view = new ListView({ model: model });
});
```

### Adding nodes

You can add `Composite` models or `Leaf` models to your main model. If you add a `Composite` model, you can add leaves and other composites to it - building up a composite hierarchy.

```js
var composite = new Composite({ title: "Pictures" });
composite.add(new Leaf({ title: "Safari.jpg" }));
composite.add(new Composite({ title: Holiday Album }));

model.add(composite);
```

### Rendering
You will only need to render the `ListView` instance once. This will generate the views `el` so that you can insert it into the DOM.

```js
$("#list-container").html(view.render().el);
```

## Model Attributes

The following attributes can be `set` on models.

* `title`: The nodes name.
* `onClick`: A function to be executed when a node is clicked. Passed the model of the clicked item as a parameter.
* `visible`: A boolean denoting whether to collapse or show the node. Only applicable to composites. Default is `false`.
* `editable`: A boolean denoting whether the node can be edited. Default is `false`.
* `icon`: A string representing a Glyphicon icon class.

## Events

All model events are piped through a dispatcher - this makes it easy to listen to model changes in one place. Require `list/Dispatcher`.

```js
Dispatcher.on("change:visible", function (model) {
    console.log("A node has been: " + (model.get("visible") ? "expanded" : "collapsed"));
});
```

Aside from the standard set of Backbone events, you may also listen to the following.

* `clicked`: Denotes that the node was clicked. Passed the corresponding model.
* `search`: Denotes that a search was performed. Passed an array of matched models.

## Serializing For Storage

You can call `toJSON()` on any model to generate a JSON representation. In turn with the `List` model's `deserialize()` method you can save the lists state and reconstruct a fresh instance.

```js
// Fetch some data over XHR and populate the list
$.getJSON("example-data.json", function (data) {
	model.deserialize(data);
	$("#container").append(view.render().el);
});
```

The generated JSON is an array of top level nodes. Composite items may have a `children` property which should contain an array of nodes.

```json
[
	{
		"model": "Composite",
		"parameters": {
			"visible": true,
			"title": "Music"
		},
		"children": []
	}
]
```

## Options

You may pass the following properties when instantiating the main `ListView`.

* `search`: Boolean denoting whether to display a search field. Default is `false`.
* `animate`: Boolean denoting whether use animations when expanding and collapsing. Default is `false`.

```js
var view = new ListView({
	model: model,
	search: true,
	animate: true
});
```

## Themeing

Themes are written in LESS and can be compiled to CSS. The `src/style` directory lists the default themes. Create a new theme by duplicating one of these directories and modify the LESS files accordingly.

## Tests

This project uses the Mocha test framework. To run the tests, open the spec runner `test/index.html` in a browser.
Alternatively, if you have grunt and the npm dependencies, run them headless using `grunt mocha`.