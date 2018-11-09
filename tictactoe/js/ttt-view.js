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
      let $square = $l(e.target);
      if(!this.game.board.isOver()) {
        this.makeMove($square);
      }
    });
  }

  makeMove($square) {
    console.log($square);
    console.log(this.game.currentPlayer);
    this.game.playMove($square.html_elements[0].className);
    if ($square.html_elements[0].className) {
      let oColor = "background: rgba(255,235,59,.8);";
      let xColor = "background: rgba(154, 164, 174, .7);";
      let boxShadow = "box-shadow:inset 0px 0px 10px black;";
      this.count += 1;
      
      $square.append(this.game.currentPlayer);
      if (this.count%2 ===0) {
        $square.attr('style', `${oColor + boxShadow}`);
      } else {
        $square.attr('style', `${xColor + boxShadow}`);
      }
    }

    if (this.game.board.isOver()) {
      // alert("You won!");
      if(!this.game.winner()) {
        $l('congrats').append(`no one has won`);
      }
      else {
        $l('congrats').append(`${this.game.currentPlayer} has won!`);
      }
    }
  }

  setupBoard(el) {
    const gridNode = document.createElement('ul');
    const $grid = $l(gridNode);
    $grid.addClass('grid');
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        let listItemNode = document.createElement('li');
        const $li = $l(listItemNode);
        $li.addClass(`${i}${j}`);
        $grid.append($li);
        // $li.data('pos', [i,j]);
      }
    }
    el.append($grid);
  }
}

module.exports = View;
