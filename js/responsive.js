var cWidth = screen.width - 16;
var cHeight = screen.height;
var standL = cHeight * 0.6;
if (cHeight * 0.6 > cWidth) {
    standL = cWidth * 0.9;
}
console.log("stand length: " + standL);
$("header").css("height", (cHeight - standL) / 3 * 2);
$("header h1").css("font-size", (cHeight - standL) / 5);

$("header #newGameButton").css("width", cWidth / 460 * 100);

$("header p").css("font-size", (cHeight - standL) / 10);


$("#grid-container").css("width", standL);
$("#grid-container").css("height", standL);
$("#grid-container").css("padding", standL / 460 * 20);
$("#grid-container").css("border-radius", standL / 460 * 10);
$("#grid-container").css("margin", "auto");

$(".grid-cell").css("width", standL / 460 * 100);
$(".grid-cell").css("height", standL / 460 * 100);
$(".grid-cell").css("border-radius", standL / 460 * 6);

$(".number-cell").css("border-radius", standL / 460 * 6);
$(".number-cell").css("font-size", standL / 8);
$(".number-cell").css("line-height", standL / 5);
$(".number-cell").css("width", standL / 460 * 100);
$(".number-cell").css("height", standL / 460 * 100);




