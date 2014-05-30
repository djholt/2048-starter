var board = {};
var score = 0;
var bestScore = 0;
var size = 4;

var tileKey = function (col, row) {
  return "tile" + col + "-" + row;
};

var updateScore = function () {
  $("#current-score").text(score);
  $("#best-score").text(bestScore);
};

var resetScore = function () {
  score = 0;
  updateScore();
};

var incrementScore = function (addToScore) {
  score += addToScore;
  if (bestScore < score) {
    bestScore = score;
  }
  updateScore();
  animateScore(addToScore);
};

var animateScore = function (addedScore) {
  // create a new div
  // put addedScore into the div
  // put it in the right spot
  // animate it (fly AND disappear!)
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

var getNumbersInCol = function (col) {
  var numbers = [];
  for (var row = 0; row < size; row++) {
    var number = board[tileKey(col, row)];
    if (number) {
      numbers.push(number);
    }
  }
  return numbers;
};

var setNumbersInCol = function (col, newNumbers) {
  for (var row = 0; row < size; row++) {
    board[tileKey(col, row)] = newNumbers[row];
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

var smashNumbers = function (oldNumbers) {
  var newNumbers = [];
  while (oldNumbers.length > 1) {
    if (oldNumbers[0] === oldNumbers[1]) {
      var a = oldNumbers.shift();
      var b = oldNumbers.shift();
      newNumbers.push(a + b);
      incrementScore(a + b);
    } else {
      var a = oldNumbers.shift();
      newNumbers.push(a);
    }
  }
  if (oldNumbers.length > 0) {
    var a = oldNumbers.shift();
    newNumbers.push(a);
  }
  while (newNumbers.length < size) {
    newNumbers.push(0);
  }
  return newNumbers;
};

var smashNumbersInReverse = function (oldNumbers) {
  return smashNumbers(oldNumbers.reverse()).reverse();
};

var smashRowLeft = function (row) {
  var oldNumbers = getNumbersInRow(row);
  var newNumbers = smashNumbers(oldNumbers);
  setNumbersInRow(row, newNumbers);
};

var smashRowRight = function (row) {
  var oldNumbers = getNumbersInRow(row);
  var newNumbers = smashNumbersInReverse(oldNumbers);
  setNumbersInRow(row, newNumbers);
};

var smashColUp = function (col) {
  var oldNumbers = getNumbersInCol(col);
  var newNumbers = smashNumbers(oldNumbers);
  setNumbersInCol(col, newNumbers);
};

var smashColDown = function (col) {
  var oldNumbers = getNumbersInCol(col);
  var newNumbers = smashNumbersInReverse(oldNumbers);
  setNumbersInCol(col, newNumbers);
};

var boardChanged = function (oldBoard) {
  for (var row = 0; row < size; row++) {
    for (var col = 0; col < size; col++) {
      var key = tileKey(col, row);
      if (board[key] != oldBoard[key]) {
        return true;
      }
    }
  }
  return false;
};

var keyPressed = function (key) {
  var oldBoard = $.extend({}, board);
  for (var n = 0; n < size; n++) {
    if (key == "left") {
      smashRowLeft(n);
    } else if (key == "right") {
      smashRowRight(n);
    } else if (key == "up") {
      smashColUp(n);
    } else if (key == "down") {
      smashColDown(n);
    }
  }
  if (boardChanged(oldBoard)) {
    addRandomTile();
  }
  refreshBoard();
};

var newGame = function () {
  board = {};
  addRandomTile();
  addRandomTile();
  refreshBoard();
  resetScore();
};

$(document).ready(function () {
  createBoard();
  newGame();

  $("#new-game").click(function (event) {
    event.preventDefault();
    newGame();
  });

  $(document).keydown(function (event) {
    switch (event.which) {
      case 37: // left
      case 65: // a
      case 72: // h
        keyPressed("left");
        break;
      case 38: // up
      case 87: // w
      case 75: // k
        keyPressed("up");
        break;
      case 39: // right
      case 68: // d
      case 76: // l
        keyPressed("right");
        break;
      case 40: // down
      case 83: // s
      case 74: // j
        keyPressed("down");
        break;
    }
  });
});
