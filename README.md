#DOMINATE
#####A lightweight DOM manipulation library.

The library is demonstrated here with a tictactoe game that utilizes a design incorporating both skeuomorphic and flat UI elements.

The functionality of the of the library includes the ability to toggle classes, add, edit, and remove HTML contents and entire elements, find child/parent elements, handle events, and make AJAX requests.

#### `$l(selector)`
$l takes in a string or a function as an argument. If a string is passed in, the function will return all instances of the element into DOM nodes, which can then be used with other methods in the library to manipulate the element. If a function is passed in, they will be triggered when the HTML has finished rendering.

#### `DOM Manipulation` methods
##### `html`
* Let's write the method `html` first. It can optionally receive a
  string as a parameter.
* If it receives an argument, this will become the `innerHTML` (hint
  hint) of the each of the nodes. If it does **not** receive an
  argument, it should return the `innerHTML` of the **first** node
  in the array.

##### `empty`
* This method clears out the content of all nodes in the internal array. I set the
  `html` of all nodes to an empty string.

##### `append`
* Take a look [here.][append] This method should accept either a jQuery-lite
wrapped collection, an HTML element, or a string. Append the `outerHTML`
of each element in the argument to the `innerHTML` of each element in the
`DOMNodeCollection`. Don't worry about converting strings into HTML
elements; just pass them straight through to the elements' `innerHTML`.

##### other methods
* I will leave it up to you to figure out ways to implement `attr`,
  `addClass`, and `removeClass`. All the information for how to change
  nodes is available in [this resource][htmlelement].

#### traversal
##### `children`
* `children` is a method that should return a `DOMNodeCollection` of
  **ALL** children of all nodes in the array.
* Each node in the array will natively have a `children` attribute. Look
  [here][children] for more information.
* Make sure the return value of this method is an instance of
  `DOMNodeCollection`.

##### `parent`
* Return a `DOMNodeCollection` of the `parent`s of each of the nodes

##### `find`
* Returns a `DOMNodeCollection` of all the nodes matching the selector
  passed in as an argument that are descendants of the nodes.
  [This might come in handy][elementqueryselectorall].

##### `remove`
* This should `remove` the html of all the nodes in the array from the DOM
* It should also remove all nodes from the array.
