const View = require('./ttt-view');
const Game = require('./game');

$( () => {
  // Your code here
  const newGame = new Game();
  const $view = $('.ttt');
  const view = new View(newGame, $view);
  view.bindEvents();



});
