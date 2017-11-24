function showNumberWithAnimation(i, j, num) {
    var numberOfCell = $("#number-cell-" + i + "-" + j);

    numberOfCell.css("background-color", getNumberBackgroundColor(num));
    numberOfCell.css("color", getNumberColor(num));
    numberOfCell.text(num);

    numberOfCell.animate({
        width: "100px",
        height: "100px",
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