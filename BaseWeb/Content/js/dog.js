dog = jQuery("#dog svg");
length = dog.length;
i = 0;
dogAnimate();
var animate;

function dogAnimate() {

    var maths = Math.random();
    clearInterval(animate);
    if (maths >= 0.5) {
        i = 0;
        doeyea();

    } else {
        i = 2;
        domaimeng();
    }
}

function _eyea() {

    if (i > length) {
        i = 0;
    }
    i = i == 2 ? 0 : i;
    dog.hide().eq(i).show();
    i++;
}
function doeyea() {

    var math = Math.random() * 1000;
    if (math < 500) {
        math = 500;
    }
    animate = setInterval(_eyea, math);
}

function _maimeng() {

    if (i > length) {
        i = 2;
    }
    i = i == 4 ? 2 : i;
    dog.hide().eq(i).show();
    i++;
}
function domaimeng() {

    var math = Math.random() * 1000;
    if (math < 500) {
        math = 500;
    }
    animate = setInterval(_maimeng, math);
}

var _animate = setInterval(dogAnimate, 5000);

var drawDialog = function (canvasObj, backgroundColor, lineColor, chat, chatColor) {

    var ctx = canvasObj.getContext("2d");
    //Dialog
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    //color
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    //chat
    ctx.font = "18px Verdana";
    ctx.fillStyle = chatColor;
    ctx.fillText(chat, 35, 60);
}

//drawDialog($("#dog canvas")[0], "#fff", "#fff", "点我全屏", "#000");