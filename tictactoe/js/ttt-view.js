class View {
  constructor(game, $el) {
    this.$el = $el;
    this.setupBoard($el);
    this.game = game;
    this.count = 0;
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
      let oColor = "rgba(255,235,59,.8)";
      let xColor = "rgba(154, 164, 174, .7)";
      this.count += 1;

      $square.append(this.game.currentPlayer);
      if (this.count%2 ===0) {
        $square.css("background", oColor);
      } else {
        $square.css("background", xColor);
      }
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

      }
    }
  }
}

module.exports = View;
