/*
*christmas power by llm
*@author llm
*2014-12-23
*
*/
(function () { function k(a, b, c) { if (a.addEventListener) a.addEventListener(b, c, false); else a.attachEvent && a.attachEvent("on" + b, c) } function g(a) { if (typeof window.onload != "function") window.onload = a; else { var b = window.onload; window.onload = function () { b(); a() } } } function h() { var a = {}; for (type in { Top: "", Left: "" }) { var b = type == "Top" ? "Y" : "X"; if (typeof window["page" + b + "Offset"] != "undefined") a[type.toLowerCase()] = window["page" + b + "Offset"]; else { b = document.documentElement.clientHeight ? document.documentElement : document.body; a[type.toLowerCase()] = b["scroll" + type] } } return a } function l() { var a = document.body, b; if (window.innerHeight) b = window.innerHeight; else if (a.parentElement.clientHeight) b = a.parentElement.clientHeight; else if (a && a.clientHeight) b = a.clientHeight; return b } function i(a) { this.parent = document.body; this.createEl(this.parent, a); this.size = Math.random() * 5 + 5; this.el.style.width = Math.round(this.size) + "px"; this.el.style.height = Math.round(this.size) + "px"; this.maxLeft = document.body.offsetWidth - this.size; this.maxTop = document.body.offsetHeight - this.size; this.left = Math.random() * this.maxLeft; this.top = h().top + 1; this.angle = 1.4 + 0.2 * Math.random(); this.minAngle = 1.4; this.maxAngle = 1.6; this.angleDelta = 0.01 * Math.random(); this.speed = 2 + Math.random() } var j = false; g(function () { j = true }); var f = true; window.createSnow = function (a, b) { if (j) { var c = [], m = setInterval(function () { f && b > c.length && Math.random() < b * 0.0025 && c.push(new i(a)); !f && !c.length && clearInterval(m); for (var e = h().top, n = l(), d = c.length - 1; d >= 0; d--) if (c[d]) if (c[d].top < e || c[d].top + c[d].size + 1 > e + n) { c[d].remove(); c[d] = null; c.splice(d, 1) } else { c[d].move(); c[d].draw() } }, 40); k(window, "scroll", function () { for (var e = c.length - 1; e >= 0; e--) c[e].draw() }) } else g(function () { createSnow(a, b) }) }; window.removeSnow = function () { f = false }; i.prototype = { createEl: function (a, b) { this.el = document.createElement("img"); this.el.setAttribute("src", b + "../js/christmas/snow" + Math.floor(Math.random() * 4) + ".gif"); this.el.style.position = "absolute"; this.el.style.display = "block"; this.el.style.zIndex = "99999"; this.parent.appendChild(this.el) }, move: function () { if (this.angle < this.minAngle || this.angle > this.maxAngle) this.angleDelta = -this.angleDelta; this.angle += this.angleDelta; this.left += this.speed * Math.cos(this.angle * Math.PI); this.top -= this.speed * Math.sin(this.angle * Math.PI); if (this.left < 0) this.left = this.maxLeft; else if (this.left > this.maxLeft) this.left = 0 }, draw: function () { this.el.style.top = Math.round(this.top) + "px"; this.el.style.left = Math.round(this.left) + "px" }, remove: function () { this.parent.removeChild(this.el); this.parent = this.el = null } } })();


function christmas() {
    var _christmas_area = $("<div class=\"christmas-area\" />");
    var _christmas = $("<div class=\"christmas\" />");
    var _antelope = $("<img src=\"../js/christmas/antelope.gif\" class=\"antelope\" />");
    var _santa_claus_welcome = $("<img src=\"../js/christmas/santa_claus_welcome.gif\" class=\"welcome\" />");
    var _santa_claus_gift = $("<img src=\"../js/christmas/santa_claus_gift.gif\" class=\"gift\" />");
    _christmas.append(_antelope).append(_santa_claus_welcome);
    _christmas_area.append(_christmas);
    $("body").append(_christmas_area);
}
function antelopeRun(obj) {
    obj.animate({ "right": "1920px" }, 15000, function () { obj.hide().css("right", "0px"); });
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
createSnow('', 1200);
christmas();
christmasAnimate();
christmasEvent();


function money_init() {
    var _gifts = $("<div id=\"gifts\" />");
    var _gift1 = $("<div><img src=\"../js/christmas/gift1.png\" class=\"gifts\" /></div>");
    var _gift2 = $("<div><img src=\"../js/christmas/gift2.png\" class=\"gifts\" /></div>");
    var _gift3 = $("<div><img src=\"../js/christmas/gift3.png\" class=\"gifts\" /></div>");
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

//money();

//initGoldFall();