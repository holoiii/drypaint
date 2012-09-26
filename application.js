(function ($, _, d) {
  d.TicTacToe = function(options) {
    this.options = $.extend({tileSize: 100}, options);
    this.extendRaphael();
    this.initialize();
  };

  _.extend(d.TicTacToe.prototype, {
    extendRaphael: function() {
      Raphael.fn.tile = function(x, y) {
        return this.paper.rect(x * this.options.tileSize, y * this.options.tileSize, this.options.tileSize, this.options.tileSize);
      }
    },
    initialize: function() {
      var board = new Array(3);
      for (var i = 0; i < 3; i++) {
        board[i] = new Array(3);
      }
      this.board = board; 
      this.paper = Raphael(0, 0, this.options.tileSize * 3, this.options.tileSize * 3);
      this.resetGame();
    },
    resetGame: function() {
      for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
          //var newTile = this.paper.rect(x * this.options.tileSize, y * this.options.tileSize, this.options.tileSize, this.options.tileSize);
          var newTile = this.paper.tile(x, y);
          this.board[x][y] = newTile; 
        }
      }
      console.log(this.board);
    },
    checkForWinner: function(board) {

    },
  });
})(jQuery, _, window.DryPaint = window.DryPaint || {});
