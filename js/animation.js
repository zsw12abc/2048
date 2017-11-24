function showNumberWithAnimation(i, j, num) {
    var numberOfCell = $("#number-cell-" + i + "-" + j);

    numberOfCell.css("background-color", getNumberBackgroundColor(num));
    numberOfCell.css("color", getNumberColor(num));
    numberOfCell.text(num);

    numberOfCell.animate({
        width: "12vh",
        height: "12vh",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}

function showMoveAnimation(fromX, fromY, toX, toY) {
    var numberOfCell = $("#number-cell-" + fromX + "-" + fromY);
    numberOfCell.animate({
        top: getPosTop(toX, toY),
        left: getPosLeft(toX, toY)
    }, 200);
}

function updateScore(s, increase) {
    if (increase === 0) {
        score = 0;
        oldScore = 0;
        $("#score").animateNumber({number: score});
    } else {
        score = s + increase;
        $("#score").prop('number', s).animateNumber({number: score}, 200);
        oldScore = score;
    }
}