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
        var marker = that.paper.path(lineOne + " " + lineTwo);
        tile.marker = marker;
        return marker;
      }
      Raphael.fn.circleMarker = function(tile) {
        var cx = tile.attrs.x + tile.attrs.width / 2;
        var cy = tile.attrs.y + tile.attrs.height / 2;
        var marker = that.paper.circle(cx, cy, that.options.tileSize / 2);
        tile.marker = marker;
        return marker;
      }
    },
    initialize: function() {
      var that = this;
      var board = new Array(3);
      for (var i = 0; i < 3; i++) {
        board[i] = new Array(3);
      }
      this.board = board;
      this.paper = Raphael('game-board', this.options.tileSize * 3, this.options.tileSize * 3);
      this.playerOne = {
        name: "Player 1",
        makeMove: function(tile) {
          if(tile.marker == undefined) {
            that.paper.circleMarker(tile);
            that.changePlayers();
          }
        }
      };
      this.playerTwo = {
        name: "Player 2",
        makeMove: function(tile) {
          if(tile.marker == undefined) {
            that.paper.checkMarker(tile);
            that.changePlayers();
          }
        }
      };
      this.currentPlayer = this.playerOne;
      this.resetGame();
    },
    changePlayers: function() {
      if(this.currentPlayer == this.playerOne) {
        this.currentPlayer = this.playerTwo;
      } else {
        this.currentPlayer = this.playerOne;
      }
    },
    resetGame: function() {
      var that = this;
      for (var x = 0; x < 3; x++) {
        for (var y = 0; y < 3; y++) {
          var newTile = this.paper.tile(x, y);
          newTile.markerPresent = false;
          newTile.click(function() {
            that.currentPlayer.makeMove(this);
            that.checkForWinner(that.board);
          });
          this.board[x][y] = newTile;
        }
      }
    },
    checkForWinner: function(board) {
      console.log("checking for winner!");
    },
    message: function(text) {
      $("#message-area").html(text);
    }
  });
})(jQuery, _, window.DryPaint = window.DryPaint || {});
