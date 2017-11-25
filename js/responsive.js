var cWidth = screen.width - 16;
var cHeight = screen.height;
var standL = cHeight * 0.6;
if (cHeight * 0.6 > cWidth) {
  standL = cWidth * 0.9;
}
var standUnit = standL / 460;
console.log("stand length: " + standL);
// $("header").css("height", (cHeight - standL) / 3 * 2);
$("header h1").css("font-size", standUnit * 60);

$("header #newGameButton").css("width", standUnit * 100);
// $("header #newGameButton").css("font-size", "100%");
// $("header #newGameButton").css("line-height", "100%");
$("header #newGameButton").css("border-radius", standUnit * 10 + "px");
$("header #newGameButton").css("margin", standUnit * 20 + "px auto");
$("header #newGameButton").css(
  "padding",
  standUnit * 10 + "px " + standUnit * 10 + "px"
);

$("header p").css("font-size", standUnit * 25);
$("header p").css("margin", standUnit * 20 + "px auto");

$("#grid-container").css("width", standL);
$("#grid-container").css("height", standL);
$("#grid-container").css("padding", standUnit * 20);
$("#grid-container").css("border-radius", standUnit * 10);
$("#grid-container").css("margin", "auto");

$(".grid-cell").css("width", standUnit * 100);
$(".grid-cell").css("height", standUnit * 100);
$(".grid-cell").css("border-radius", standUnit * 6);

$(".number-cell").css("border-radius", standUnit * 6);
$(".number-cell").css("font-size", standUnit * 60);
$(".number-cell").css("line-height", standUnit * 100);
$(".number-cell").css("width", standUnit * 100);
$(".number-cell").css("height", standUnit * 100);
