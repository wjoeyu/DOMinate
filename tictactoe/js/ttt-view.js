class View {
  constructor(game, $el) {
    this.$el = $el;
    this.setupBoard($el);
    this.game = game;
  }

  bindEvents() {
    this.$el.on('click', (e) => {
      e.stopPropagation();
      let $square = $(e.target);
      // let $square = $l(e.target);
      if(!this.game.board.isOver()) {
        this.makeMove($square);
      }
    } );
  }

  makeMove($square) {
    this.game.playMove($square.data('pos'));
    if ($square.data('pos')) {
      let colors = ['#de5127', '#a7c91c', '#fd5153', '#751f51', '#f7e275', '#0f486a'];
      let random_color = colors[Math.floor(Math.random() * colors.length)];

      $square.append(this.game.currentPlayer);
      $square.css("background", random_color);
      $square.css("box-shadow", "inset 0px 0px 10px black");


    }

    if (this.game.board.isOver()) {
      // alert("You won!");
      if(!this.game.winner()) {
        $('congrats').append(`no one has won`);
        // $l('congrats').append(`no one has won`);

      }
      else {
        $('congrats').append(`${this.game.currentPlayer} has won!`);
        // $l('congrats').append(`${this.game.currentPlayer} has won!`);

      }
    }
  }

  setupBoard(el) {
    const $grid = $("<ul class='grid'></ul>");
    el.append($grid);
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        const $li = $('<li>');
        $li.data('pos', [i,j]);
        $grid.append($li);

    // const $grid = $l(document.createElement('ul'));
    // $grid.addClass('grid');
    // el.append($grid);
    // console.log(el);
    // // console.log($grid);
    // for (var i = 0; i < 3; i++) {
    //   for (var j = 0; j < 3; j++) {
    //     const li = document.createElement('li');
    //     li.dataset.pos = [i,j];
    //     const $li = $l(li);
    //     $grid.append($li);
      }
    }
  }
}

module.exports = View;
