Backbone-List
====================

A lightweight, composite list component for Backbone.js apps.

* Easily extendable
* Modular (require.js)
* Namespaced CSS (less)
* Unit tested

<img src="https://raw.github.com/st3redstripe/Backbone-List/master/src/list.png"/>

## Usage

Create a new `List` model and a `ListView` view.

When instantiating the view, pass the model as a parameter to bind it to the view. You can then begin adding nodes to the list.

```js
var model = new List();
var view = new ListView({ model: model });
```

### Adding nodes

You can add `Composite` models or `Leaf` models to your main model. If you add a `Composite` model, you can add leaves and other composites to it - building up a composite hierarchy.

```js
var composite = new Composite({ title: "Pictures" });
composite.add(new File({ title: "Safari.jpg" }));
composite.add(new Composite({ title: Holiday Album }));

model.add(composite);
```

### Rendering
You will only need to render the `ListView` instance once. This will generate the views `el` so that you can insert it into the DOM.

```js
$("#list-container").html(view.render().el);
```

## API

The following attributes can be `set` on list nodes.

* `title`: The nodes name.
* `onClick`: A function to be executed when a node is clicked. Passed the model of the clicked item as a parameter.
* `visible`: A boolean denoting whether to collapse or show the node. Only applicable to composites. Default is `true`.
* `editable`: A boolean denoting whether the node can be edited. Default is `false`.

## Serializing For Storage

`throw new NotDocumentedException()`

## Searching

To make the list searchable, add `search: true` to an `options` hash when instantiating the main view.

```js
var view = new ListView({
	model: model,
	options: {
		search: true
	}
});
```

## Tests

This project uses the Mocha test framework. To run the tests, open the spec runner `test/index.html` in a browser.