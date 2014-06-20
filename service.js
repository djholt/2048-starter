(function () {
  angular.module("2048")
    .service("Board", [function () {
      return {
        board: {},
        size: 4,

        tileKey: function (col, row) {
          return "tile" + col + "-" + row;
        },

        value: function (col, row) {
          return this.board[this.tileKey(col, row)];
        },

        getNumbersInCol: function (col) {
          var numbers = [];
          for (var row = 0; row < this.size; row++) {
            var key = this.tileKey(col, row);
            if (this.board[key]) {
              numbers.push(this.board[key]);
            }
          }
          return numbers;
        },

        replaceNumbersInCol: function (col, newNumbers) {
          for (var row = 0; row < this.size; row++) {
            var key = this.tileKey(col, row);
            this.board[key] = newNumbers[row];
          }
        },

        getNumbersInRow: function (row) {
          var numbers = [];
          for (var col = 0; col < this.size; col++) {
            var key = this.tileKey(col, row);
            if (this.board[key]) {
              numbers.push(this.board[key]);
            }
          }
          return numbers;
        },

        replaceNumbersInRow: function (row, newNumbers) {
          for (var col = 0; col < this.size; col++) {
            var key = this.tileKey(col, row);
            this.board[key] = newNumbers[col];
          }
        },

        smashNumbers: function (oldNumbers) {
          var newNumbers = [];
          while (oldNumbers.length > 0) {
            if (oldNumbers[0] === oldNumbers[1]) {
              newNumbers.push(oldNumbers.shift() + oldNumbers.shift());
            } else {
              newNumbers.push(oldNumbers.shift());
            }
          }
          while (newNumbers.length < this.size) {
            newNumbers.push(0);
          }
          return newNumbers;
        },

        smashNumbersInReverse: function (numbers) {
          return this.smashNumbers(numbers.reverse()).reverse();
        },

        smashColUp: function (col) {
          var oldNumbers = this.getNumbersInCol(col);
          var newNumbers = this.smashNumbers(oldNumbers);
          this.replaceNumbersInCol(col, newNumbers);
        },

        smashColDown: function (col) {
          var oldNumbers = this.getNumbersInCol(col);
          var newNumbers = this.smashNumbersInReverse(oldNumbers);
          this.replaceNumbersInCol(col, newNumbers);
        },

        smashRowLeft: function (row) {
          var oldNumbers = this.getNumbersInRow(row);
          var newNumbers = this.smashNumbers(oldNumbers);
          this.replaceNumbersInRow(row, newNumbers);
        },

        smashRowRight: function (row) {
          var oldNumbers = this.getNumbersInRow(row);
          var newNumbers = this.smashNumbersInReverse(oldNumbers);
          this.replaceNumbersInRow(row, newNumbers);
        },

        getEmptyTiles: function () {
          var empty = [];
          for (var row = 0; row < this.size; row++) {
            for (var col = 0; col < this.size; col++) {
              var key = this.tileKey(col, row);
              if (!this.board[key]) {
                empty.push(key);
              }
            }
          }
          return empty;
        },

        addRandomTile: function () {
          var emptyTiles = this.getEmptyTiles();
          var randomEmptyTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
          var twoOrFour = Math.random() > 0.5 ? 2 : 4;
          this.board[randomEmptyTile] = twoOrFour;
        },

        didBoardChange: function (oldBoard) {
          for (var row = 0; row < this.size; row++) {
            for (var col = 0; col < this.size; col++) {
              var key = this.tileKey(col, row);
              if (this.board[key] != oldBoard[key]) {
                return true;
              }
            }
          }
          return false;
        },

        keyPressed: function (key) {
          var oldBoard = angular.extend({}, this.board);

          for (var n = 0; n < this.size; n++) {
            if (key == "left") {
              this.smashRowLeft(n);
            } else if (key == "right") {
              this.smashRowRight(n);
            } else if (key == "up") {
              this.smashColUp(n);
            } else if (key == "down") {
              this.smashColDown(n);
            }
          }

          if (this.didBoardChange(oldBoard)) {
            this.addRandomTile();
          }
        }
      };
    }]);
})();
