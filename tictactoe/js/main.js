const View = require('./ttt-view');
const Game = require('./game');

$l( () => {
  // Your code here
  const newGame = new Game();
  const $view = $l('.ttt');
  const view = new View(newGame, $view);
  view.bindEvents();

});
