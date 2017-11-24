var cWidth = screen.width;
var cHeight = screen.height;
var standL = cHeight * 0.6;
if (cHeight * 0.6 > cWidth) {
    standL = cWidth * 0.9;
}
console.log("stand length: " + standL);
$("header").css("height", (cHeight-standL)/3*2);
$("header h1").css("font-size", (cHeight - standL) / 5);

// $("header #newGameButton").css("width", cWidth/5);

$("header p").css("font-size", (cHeight-standL)/10);



$("#grid-container").css("width", standL);
$("#grid-container").css("height", standL);
$("#grid-container").css("padding", standL / 60);
$("#grid-container").css("border-radius", standL / 30);
$("#grid-container").css("margin", "auto");

$("#grid-cell").css("width", standL / 5);
$("#grid-cell").css("height", standL / 5);
$("#grid-cell").css("border-radius", standL / 10);

$("#number-cell").css("border-radius", standL/10);
$("#number-cell").css("font-size", standL/8);
$("#number-cell").css("line-height", standL/5);




