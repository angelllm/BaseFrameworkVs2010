
_doorClick = 0;
$("#door").click(function () {

    $("#_door_sound")[0].play();
    _doorClick++;
    if (_doorClick >= 3) {
        _icomein = setInterval(icomein, 300);
        $("#door").unbind("click");
    }

});


function icomein() {
    $("#_door_init_sound")[0].play();
    clearInterval(_icomein);
    _openDoor = setInterval(openDoor, 3500);
}

function openDoor() {
    $("#_door_init_sound").remove();
    $("#door").find(".door-left").addClass("open-door").end().find(".door-right").addClass("open-door2").end().addClass("in");
    $("#_door_open_sound")[0].play();
    _closeDoor = setInterval(closeDoor, 5000);
    //$("#_fire_sound")[0].play();
    clearInterval(_openDoor);
}


function closeDoor() {

    $("#door").fadeOut(function () {
        $("#_door_open_sound").remove();
    });
    clearInterval(_closeDoor);

}






//var x = 0, y = 0;
//var ul = document.getElementById('box');
//document.addEventListener('keydown', function (e) {
//    ul.style.webkitTransition = '-webkit-transform 3s linear';
//    switch (e.keyCode) {
//        case 37: y -= 90;    //左箭头
//            break;
//        //case 38: x += 90;    //上箭头
//            //break;
//        case 39: y += 90;    //右箭头
//            break;
//        //case 40: x -= 90;    //下箭头
//            //break;
//        case 13: x = 0; y = 0;    //回车 （当回车时，迅速转回初始状态）
//            ul.style.webkitTransition = '-webkit-transform 0.1s linear';
//            break;
//    }
//    ul.style.webkitTransform = "rotateX(" + x + "deg) rotateY(" + y + "deg)"; //变换效果（沿X轴和Y轴旋转）
//}, false);
