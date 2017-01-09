/*
*christmas power by llm
*@author llm
*2014-12-23
*
*/

function christmas() {
    var _christmas_area = $("<div class=\"christmas-area\" />");
    var _christmas = $("<div class=\"christmas\" />");
    var _antelope = $("<img src=\"christmas/antelope.gif\" class=\"antelope\" />");
    var _santa_claus_welcome = $("<img src=\"christmas/santa_claus_welcome.gif\" class=\"welcome\" />");
    _christmas.append(_antelope).append(_santa_claus_welcome);
    _christmas_area.append(_christmas);
    $("body").append(_christmas_area);
}
function antelopeRun(obj) {
    obj.animate({ "right": "800px" }, 15000, function () { obj.hide().css("right", "0px"); });
}
function christmasAnimate() {
    var _area = $(".christmas-area");
    _area.fadeIn(800);
    antelopeRun(_area);
    _ani = setTimeout(christmasAnimate, 10000); 
}
function christmasEvent() {
    var _area = $(".christmas-area");
    _area.mouseover(function () { money(); });
    //_area.mouseover(function () { clearTimeout(_ani); _area.stop();money(); });
    //_area.mouseout(function () { _ani = setTimeout(christmasAnimate, 10000); antelopeRun(_area); });
}

/**/

christmas();
christmasAnimate();
christmasEvent();


function money_init() {
    var _gifts = $("<div id=\"gifts\" />");
    var _gift1 = $("<div><img src=\"christmas/gift1.png\" class=\"gifts\" /></div>");
    var _gift2 = $("<div><img src=\"christmas/gift2.png\" class=\"gifts\" /></div>");
    var _gift3 = $("<div><img src=\"christmas/gift3.png\" class=\"gifts\" /></div>");
    _gifts.append(_gift1).append(_gift2).append(_gift3);
    $("body").append(_gifts);
}
money_init();

var goldFallInterval;
var goldFallStart = 0;
var goldAnimate = true;
function initGoldFall() {
    if (goldAnimate) {
        goldAnimate = false;
        $("#gift-area").empty();
        var length = $("#gifts").find("div").length;
        if (length < 4) {
            for (i = 0; i < 20; i++) {
                $("#gift-area").append($("#gifts").find("div").clone());
            }
        }
        startGoldFall();
    }
}
function startGoldFall() {
    clearInterval(goldFallInterval);
    endCount = 0;
    range();
    goldFallStart = new Date().getTime();
    goldFallInterval = setInterval(dropGoldFall, 200);
}

//排列
function range() {
    var num = 1;

    $("#gift-area").find("div").each(function (i) {
        var ww = $(window).width(); //窗口宽度
        var wh = $(window).height(); 
        var ot = -20; //从头部以上开始 
        $(this).css({ "left": (i * (ww / 64)) + "px", "top": "-50px" }); //距左距离保持，距上距离变化
        num++;
    });
}

//降落
function dropGoldFall() {
    var now = new Date().getTime();
    var $objs = $("#gift-area").find("div");
    if (now - goldFallStart > 3000) {
        clearInterval(goldFallInterval);
        $objs.fadeOut(200);
        goldAnimate = true;
    }
    
    $objs.each(function (i) {
        var wh = $(window).height();
        var ol = $(this).offset().left;
        var ot = $(this).offset().top;
        var rnd = Math.round(Math.random() * 100);
        var rnd2 = Math.round(Math.random() * 50); 
        //降落的速度
        if (ot <= wh)//如果掉到窗口以下
        {
            $(this).css({ "top": (ot + rnd + rnd2) + "px" }); 
        }
    });
}


function money() {
    
    initGoldFall();
    
}

//if some fonts are not being loaded, reload the page
//all fonts hosted on google fonts: https://www.google.com/fonts
//####################################################
//Also check out this!: http://youtu.be/j-e7aBV4nbs
//###################################################