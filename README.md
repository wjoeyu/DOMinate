# DOMINATE
##### A lightweight DOM manipulation library.

The library is demonstrated here with a tictactoe game that utilizes a design incorporating both skeuomorphic and flat UI elements.

The functionality of the of the library includes the ability to toggle classes, add, edit, and remove HTML contents and entire elements, find child/parent elements, handle events, and make AJAX requests.

#### `$l(selector)`
$l takes in a string or a function as an argument. If a string is passed in, the function will return all instances of the element into DOM nodes, which can then be used with other methods in the library to manipulate the element. If a function is passed in, they will be triggered when the HTML has finished rendering.

#### DOM Manipulation methods
##### `html`
When this method receives an argument, the argument becomes the innerHTML of each of the nodes. If it receives no argument, the function return the innerHTML of the first node in the array.

##### `empty`
This clears out the content of all the selected HTML elements.

##### `append`
This method accepts either a DOMINATE-wrapped collection, an HTML element, or a string. It inserts the argument into the innerHTML of the selected elements.

##### `attr`
When two arguments are passed, the selected elements have element attributes set on them (attributeName, value).
##### `addClass`
Adds a class to the selected HTML elements.
##### `removeClass`
Removes a class from the selected HTML elements.

#### Traversal methods
##### `children`
This method returns all the children in the the select elements.
##### `parent`
Returns the parent element of all the selected elements.
##### `find`
Returns all the descendants of the selected HTML element of all the nodes matching the selector
passed in as an argument.
##### `remove`
This method removes all the selected elements.

#### Event Handling
#### `on`
Takes in two arguments, an eventType and a callback function, and adds event handlers for all the selected elements.
#### `off`
Takes in an eventType and removes event handlers on all the selected elements.
#### `ajax`
This method receives one options object argument and uses the object to make a request.
