var board = new Array();
var score = 0;
var oldScore = 0;
var hasConflicted = new Array();//prevent multi conflicted when the moving happened
var startX, startY, endX, endY;

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
    updateScore(0, 0);
    // console.log("score updated");
    keyboardListener(true);
    // console.log("start key listening");
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
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
                numberOfCell.css("top", getPosTop(i, j) + standUnit * 50);
                numberOfCell.css("left", getPosLeft(i, j) + standUnit * 50);
            } else {
                numberOfCell.css("width", standUnit * 100);
                numberOfCell.css("height", standUnit * 100);
                numberOfCell.css("top", getPosTop(i, j));
                numberOfCell.css("left", getPosLeft(i, j));
                numberOfCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberOfCell.css("color", getNumberColor(board[i][j]));
                numberOfCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
}

function generateOneNumber() {
    if (noSpace(board)) {
        return false;
    }

    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while (times < 50) {
        if (board[randX][randY] === 0) {
            break;
        }
        randX = parseInt(Math.floor(Math.random() * 4));
        randY = parseInt(Math.floor(Math.random() * 4));
        times++;
    }

    if (times === 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    randX = i;
                    randY = j;
                }
            }
        }
    }


    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randX][randY] = randNumber;

    showNumberWithAnimation(randX, randY, randNumber);

    return true;
}

function keyboardListener(start) {
    if (start) {
        $(document).keydown(function (event) {
            switch (event.keyCode) {
                case 37://left
                    if (moveLeft()) {
                        event.preventDefault();//for prevent default key function
                        setTimeout("generateOneNumber()", 200);
                        setTimeout("isGameOver()", 300);
                    }
                    break;
                case 38://up
                    if (moveUp()) {
                        event.preventDefault();//for prevent default key function
                        setTimeout("generateOneNumber()", 200);
                        setTimeout("isGameOver()", 300);
                    }
                    break;
                case 39://right
                    if (moveRight()) {
                        event.preventDefault();//for prevent default key function
                        setTimeout("generateOneNumber()", 200);
                        setTimeout("isGameOver()", 300);
                    }
                    break;
                case 40://down
                    if (moveDown()) {
                        event.preventDefault();//for prevent default key function
                        setTimeout("generateOneNumber()", 200);
                        setTimeout("isGameOver()", 300);
                    }
                    break;
                default:
                    break;
            }
        });
    }
}

//touch event listener
document.addEventListener("touchstart", function (event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});
document.addEventListener("touchend", function (event) {
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;
    var deltaX = endX - startX;
    var deltaY = endY - startY;

    if (Math.abs(deltaX) < 0.3 * cWidth && Math.abs(deltaY) < 0.3 * cHeight) {
        return
    }
    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
        if (deltaX > 0) {//right move
            moveRight();
            setTimeout("generateOneNumber()", 200);
            setTimeout("isGameOver()", 300);
        } else {//left move
            moveLeft();
            setTimeout("generateOneNumber()", 200);
            setTimeout("isGameOver()", 300);
        }
    } else {
        if (deltaY > 0) {//move down
            moveDown();
            setTimeout("generateOneNumber()", 200);
            setTimeout("isGameOver()", 300);
        } else {//move up
            moveUp();
            setTimeout("generateOneNumber()", 200);
            setTimeout("isGameOver()", 300);
        }
    }

});

function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        // alert("Game Over!");
        keyboardListener(false);
        // console.log("stop key listening");
        swal({
            type: 'error',
            html: "<h1>Game Over</h1>" + "<h2>Your Final Score is " + score + ".</h2>",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Try Again'
        }).then(function (result) {
                if (result.value) {
                    newGame();
                }
            }
        );
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
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add cell
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //add score
                        // score += board[i][k];
                        hasConflicted[i][k] = true;
                        updateScore(oldScore, board[i][k]);
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
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        // score += board[i][k]
                        hasConflicted[i][k] = true;
                        updateScore(oldScore, board[i][k]);
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
                    } else if (board[k][j] === board[i][j] && noBlockVertical(k, i, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        // score += board[k][j];
                        hasConflicted[k][j] = true;
                        updateScore(oldScore, board[k][j]);
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
                    } else if (board[k][j] === board[i][j] && noBlockVertical(i, k, j, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        // score += board[k][j];
                        hasConflicted[k][j] = true;
                        updateScore(oldScore, board[k][j]);
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()", 250);//wait for move animation finished.
    return true;
}