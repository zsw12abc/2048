var board = new Array();
var score = 0;

$(document).ready(function () {
    newGame();
});

function newGame() {
    //init the grid container
    init();
    //add two random numbers in random cell
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    updateBoardView();
}

function updateBoardView() {
    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var numberCellDiv = $("<div>").addClass("number-cell").attr("id", "number-cell-" + i + "-" + j);
            $('#grid-container').append(numberCellDiv);
            var numberOfCell = $("#number-cell-" + i + "-" + j);

            if (board[i][j] === 0) {
                numberOfCell.css("width", "0px");
                numberOfCell.css("height", "0px");
                numberOfCell.css("top", getPosTop(i, j) + 50);
                numberOfCell.css("left", getPosLeft(i, j) + 50);
            } else {
                numberOfCell.css("width", "100px");
                numberOfCell.css("height", "100px");
                numberOfCell.css("top", getPosTop(i, j));
                numberOfCell.css("left", getPosLeft(i, j));
                numberOfCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberOfCell.css("color", getNumberColor(board[i][j]));
                numberOfCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    }

    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));

    while (true) {
        if (board[randX][randY] === 0) {
            break;
        }
        randX = parseInt(Math.floor(Math.random() * 4));
        randY = parseInt(Math.floor(Math.random() * 4));
    }

    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randX][randY] = randNumber;

    showNumberWithAnimation(randX, randY, randNumber);

    return true;
}

$(document).keydown(function (event) {
    event.preventDefault();//for prevent default key function
    switch (event.keyCode) {
        case 37://left
            if (moveLeft()) {
                setTimeout("generateOneNumber()", 200);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38://up
            if (moveUp()) {
                setTimeout("generateOneNumber()", 200);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39://right
            if (moveRight()) {
                setTimeout("generateOneNumber()", 200);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40://down
            if (moveDown()) {
                setTimeout("generateOneNumber()", 200);
                setTimeout("isGameOver()",300);
            }
            break;
        default:
            break;
    }
});


function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        alert("Game Over!");
    }
}


function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 250);//wait for move animation finished.
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 3; j >= 0; j--) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 250);//wait for move animation finished.
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }

    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] === 0 && noBlockVertical(k, i, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    } else if (board[k][j] === board[i][j] && noBlockVertical(k, i, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 250);//wait for move animation finished.
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }

    for (var i = 3; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] === 0 && noBlockVertical(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    } else if (board[k][j] === board[i][j] && noBlockVertical(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 250);//wait for move animation finished.
    return true;
}