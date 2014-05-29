var board = {};
var size = 4;

var tileKey = function (col, row) {
  return "tile" + col + "-" + row;
};

var createBoard = function () {
  var $board = $("#board");
  for (var row = 0; row < size; row++) {
    var $row = $("<div>");
    $row.addClass("row");
    $board.append($row);
    for (var col = 0; col < size; col++) {
      var $tile = $("<div>").addClass("tile");
      $tile.attr("id", tileKey(col, row));
      $row.append($tile);
    }
  }
};

var setTile = function (col, row, number) {
  var key = tileKey(col, row);
  var $tile = $("#" + key);
  $tile.removeClass();
  $tile.addClass("tile");
  $tile.text("");
  if (number) {
    $tile.addClass("tile-" + number);
    $tile.text(number);
  }
};

var refreshBoard = function () {
  for (var row = 0; row < size; row++) {
    for (var col = 0; col < size; col++) {
      var num = board[tileKey(col, row)];
      setTile(col, row, num);
    }
  }
};

var getEmptyTiles = function () {
  var emptyTiles = [];
  for (var row = 0; row < size; row++) {
    for (var col = 0; col < size; col++) {
      if (!board[tileKey(col, row)]) {
        emptyTiles.push(tileKey(col, row));
      }
    }
  }
  return emptyTiles;
};

var addRandomTile = function () {
  var emptyTiles = getEmptyTiles();
  var randomIndex = Math.floor(Math.random() * emptyTiles.length);
  var randomTileKey = emptyTiles[randomIndex];

  if (Math.random() < 0.8) {
    board[randomTileKey] = 2;
  } else {
    board[randomTileKey] = 4;
  }
};

var getNumbersInRow = function (row) {
  var numbers = [];
  for (var col = 0; col < size; col++) {
    var number = board[tileKey(col, row)];
    if (number) {
      numbers.push(number);
    }
  }
  return numbers;
};

var setNumbersInRow = function (row, newNumbers) {
  for (var col = 0; col < size; col++) {
    board[tileKey(col, row)] = newNumbers[col];
  }
};

var smashRowLeft = function (row) {
  var numbers = getNumbersInRow(row);
  while (numbers.length < size) {
    numbers.push(0);
  }
  setNumbersInRow(row, numbers);
};

var keyPressed = function () {
  for (var row = 0; row < size; row++) {
    smashRowLeft(row);
  }
  refreshBoard();
};

$(document).ready(function () {
  createBoard();
  addRandomTile();
  addRandomTile();
  refreshBoard();

  $(document).keydown(function (event) {
    if (event.which == 37) { // left key pressed
      keyPressed();
    }
  });
});
