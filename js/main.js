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
                generateOneNumber();
                isGameOver();
            }
            break;
        case 38://up
            if (moveUp()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 39://right
            if (moveRight()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        case 40://down
            if (moveDown()) {
                generateOneNumber();
                isGameOver();
            }
            break;
        default:
            break;
    }
});


function isGameOver() {

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
                        continue;
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 200);//wait for move animation finished.
    return true;
}