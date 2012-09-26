(function ($, _, d) {
  d.TicTacToe = function(options) {
    this.options = $.extend({tileSize: 100}, options);
    this.extendRaphael();
    this.initialize();
  };

  _.extend(d.TicTacToe.prototype, {
    extendRaphael: function() {
      var that = this;
      Raphael.fn.tile = function(x, y) {
        var rect = that.paper.rect(x * that.options.tileSize, y * that.options.tileSize, that.options.tileSize, that.options.tileSize);
        rect.attr({fill:"#EEE","stroke-width":2,"stroke":"#222"});
        return rect;
      }
      Raphael.fn.checkMarker = function(tile) {
        var lineTwoStart = [tile.attrs.x + tile.attrs.width, tile.attrs.y];
        var lineOne = "M" + tile.attrs.x + " " + tile.attrs.y + "L" + (tile.attrs.x + tile.attrs.width) + " " + (tile.attrs.y + tile.attrs.height);
        var lineTwo = "M" + (tile.attrs.x + tile.attrs.width) + " " + tile.attrs.y + "L" + tile.attrs.x + " " + (tile.attrs.y + tile.attrs.height);
        return that.paper.path(lineOne + " " + lineTwo);
      }
      Raphael.fn.circleMarker = function(tile) {
        var cx = tile.attrs.x + tile.attrs.width / 2;
        var cy = tile.attrs.y + tile.attrs.height / 2;
        return that.paper.circle(cx, cy, that.options.tileSize / 2);
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
          var newTile = this.paper.tile(x, y);
          newTile.click(function() {
            this.paper.circleMarker(this);
            this.paper.checkMarker(this);
          });
          console.log(newTile);
          this.board[x][y] = newTile;
        }
      }
    },
    checkForWinner: function(board) {

    },
  });
})(jQuery, _, window.DryPaint = window.DryPaint || {});
