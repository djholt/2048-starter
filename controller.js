(function () {
  angular.module("2048")
    .controller("GameController", ["$scope", "Board", function ($scope, Board) {
      Board.addRandomTile();
      Board.addRandomTile();

      $scope.keyPressed = function ($event) {
        switch ($event.which) {
          case 37: // left
          case 65: // a
          case 72: // h
            Board.keyPressed("left");
            break;
          case 38: // up
          case 87: // w
          case 75: // k
            Board.keyPressed("up");
            break;
          case 39: // right
          case 68: // d
          case 76: // l
            Board.keyPressed("right");
            break;
          case 40: // down
          case 83: // s
          case 74: // j
            Board.keyPressed("down");
            break;
        }
      };

      $scope.sizeArray = function () {
        var array = [];
        for (var i = 0; i < Board.size; i++) {
          array.push(i);
        }
        return array;
      };

      $scope.tileClass = function (col, row) {
        return ["tile", "tile-" + Board.value(col, row)];
      };

      $scope.tileValue = function (col, row) {
        return Board.value(col, row) || null;
      };
    }]);
})();
