 
$(".menu-wapper li").hover(function () {
    $(this).toggleClass($(this).attr("data-bind") + " menu-icon");
});

$(".w-cate").hover(function () {
    $(this).toggleClass("cate-show " + $(this).attr("data-bind"));
}).mouseover(function () {
    $(this).find(".cate-more-list").show();
}).mouseout(function () {
    $(this).find(".cate-more-list").hide();
});


function animateNotice() { 
    var _ul = $(".w-notice ul");
    var _h = _ul.height();
    var _l = _ul.find("li");
    var _lh = _l.eq(0).height();
    var _mt = _ul.css("marginTop").replace("px", "");
    if (_l.length > 1) {
        if (-_mt > (_l.length - 1) * _lh) {
            $(".w-notice ul").animate({ marginTop: "0px" }, 300);
        } else {
            $(".w-notice ul").animate({ marginTop: "+=-34px" }, 300);
        }
    }
    else {
        clearInterval(_notice_fun);
    }
}
var _notice_fun = setInterval(animateNotice, 3000);

function advgoto(href) {
    window.location.href = href;
}

$(".sequence-canvas li img").click(function () {
    window.location.href = $(this).attr("url");
});

$(".floor-content").hover(
    function () {
        
        $(this).find(".floor-animate").fadeIn(500);
        if ($(this).attr("data-bind") == 0) {
            clearInterval(_auto_floor_1);
        }
        else if ($(this).attr("data-bind") == 1) {
            clearInterval(_auto_floor_2);
        }
    },
    function () {
        $(this).find(".floor-animate").fadeOut(500);
        if ($(this).attr("data-bind") == 0) {
            _auto_floor_1 = setInterval("autoFloorC1(" + $(this).attr("data-bind") + ")", 5000);
        }
        else if ($(this).attr("data-bind") == 1) {
            _auto_floor_2 = setInterval("autoFloorC2(" + $(this).attr("data-bind") + ")", 7000);
        }
        
    }
);
var _floor_1 = 0;
var _floor_2 = 0;
var _speed = 500;
$(".floor-animate").click(function () {
    var _width = -$(this).parent().find(".content-item").eq(0).width();
    var _length = $(this).parent().find(".content-item").length;
    var _eqindex = $(this).parent().attr("data-bind");
    if ($(this).hasClass("btn-left")) {
        if (_floor_1 != 0) {
            _floor_1--;
            animateFloorC(_width * _floor_1, _speed, _eqindex);
        }
    } else {
        if (_floor_1 == _length - 1) {
            animateFloorC(0, _speed, _eqindex);
            _floor_1 = 0;
        } else { 
            _floor_1++;
            animateFloorC(_width * _floor_1, _speed, _eqindex);
        }
    } 
});

function animateFloorC(marginleft,speed,eqindex) {
    $(".floor-box").eq(eqindex).find(".content-w").animate({ marginLeft: marginleft }, speed);
}

function autoFloorC1(eqindex,floor) {
    var _width = -$(".floor-box").eq(eqindex).find(".content-item").eq(0).width();
    var _length = $(".floor-box").eq(eqindex).find(".content-item").length;
    
    if (_floor_1 == _length - 1) {
        animateFloorC(0, _speed, eqindex);
        _floor_1 = 0;
    } else {
        _floor_1++;
        animateFloorC(_width * _floor_1, _speed, eqindex);
    }
   
}
function autoFloorC2(eqindex, floor) {
    var _width = -$(".floor-box").eq(eqindex).find(".content-item").eq(0).width();
    var _length = $(".floor-box").eq(eqindex).find(".content-item").length;

    if (_floor_2 == _length - 1) {
        animateFloorC(0, _speed, eqindex);
        _floor_2 = 0;
    } else {
        _floor_2++;
        animateFloorC(_width * _floor_2, _speed, eqindex);
    }

}

var _auto_floor_1 = setInterval("autoFloorC1(" + 0 + ")", 5000);
var _auto_floor_2 = setInterval("autoFloorC2(" + 1 + ")", 7000);

$(".overlays").hover(
    function () {
        $(this).addClass("overlays-hover"); 
    },
    function () {
        $(this).removeClass("overlays-hover"); 
    }
);

var _animate_brand_margin_top = 55;
function animateBrand() {
    var _brand = $(".slide-left-brand-list");
    var _brand_h = _brand.height();
    var _a = _brand.find("a");
    var _ba = _a.eq(0).height();
    var _bmt = _brand.css("marginTop").replace("px", "");
    if (_a.length > 3) {
        if (-_bmt > 3 * _ba) {
            $(".slide-left-brand-list").animate({ marginTop: "0px" }, 300);
        } else {
            $(".slide-left-brand-list").animate({ marginTop: "+=-" + _animate_brand_margin_top + "px" }, 300);
        }
    }
    else {
        clearInterval(_brand_fun);
    }
}
var _brand_fun = setInterval(animateBrand, 3000);

function appendBrand() {
    $(".slide-left-brand-list")[0].innerHTML += $(".slide-left-brand-list")[0].innerHTML;
    clearInterval(_append_brand_fun);
}
_append_brand_fun = setInterval(appendBrand, 2000);

$(".slide-animate").click(function () {
    var _brand = $(".slide-left-brand-list");
    var _brand_h = _brand.height();
    var _a = _brand.find("a");
    var _ba = _a.eq(0).height();
    var _bmt = _brand.css("marginTop").replace("px", "");
   
    if ($(this).hasClass("slide-btn-top")) {
        
        if (_a.length > 3) {
            if (-_bmt > 3 * _ba) {
                $(".slide-left-brand-list").animate({ marginTop: "0px" }, 300);
            } else {
                $(".slide-left-brand-list").animate({ marginTop: "+=-" + _animate_brand_margin_top + "px" }, 300);
            }
        }

    } else {
        
        if (_a.length > 3) {
            if (-_bmt  != 0) {
                $(".slide-left-brand-list").animate({ marginTop: "+=" + _animate_brand_margin_top + "px" }, 300);
            } else {
                
            }
        }
    }
});

$(".slide-left-brand-wapper").hover(
    function () {
        $(".slide-animate").fadeIn(300);
        clearInterval(_brand_fun);
    },
    function () {
        $(".slide-animate").fadeOut(300);
        _brand_fun = setInterval(animateBrand, 3000);
    }
);

var _ju_index = 0;
function animateJu() {
    var _div = $(".slide-right-wapper");
    var _h = _div.height();
    var _l = _div.find("dl");
    var _lh = _l.eq(0).height();
    var _mt = _div.css("marginTop").replace("px", "");
    //console.log(_mt);
    //console.log((_l.length - 1) * _lh);
    if (_l.length > 1) {
        if (-_mt >= (_l.length - 1) * _lh) {
            $(".slide-right-wapper").animate({ marginTop: "0px" }, 300);
            _ju_index = 0;
        } else {
            $(".slide-right-wapper").animate({ marginTop: "+=-" + _lh + "px" }, 300);
            _ju_index++;
        }
    }
    else {
        clearInterval(_ju_fun);
    }
    $(".ju-title dt").removeClass("dt-hover").eq(_ju_index).addClass("dt-hover");
    initJuImg(_l);
}
var _ju_fun = setInterval(animateJu, 5000);

$(".ju-title dt").mouseover(function () {
    clearInterval(_ju_fun);
    var _cur_index = _ju_index;
    _ju_index = $(this).index() - 1;
    $(".ju-title dt").removeClass("dt-hover").eq(_ju_index).addClass("dt-hover");
    var _h = $(".slide-right-wapper dl").eq(0).height();
    if (_ju_index == 0) {
        $(".slide-right-wapper").animate({ marginTop: "0px" }, 300);
    } else {
        if (_cur_index > _ju_index) {
            $(".slide-right-wapper").animate({ marginTop: "-" + (_h * _ju_index) + "px" }, 300);
        }
        else if (_cur_index < _ju_index) {
            $(".slide-right-wapper").animate({ marginTop: "-" + (_h * _ju_index) + "px" }, 300);
        }
    }

    initJuImg($(".slide-right-wapper dl").eq(_ju_index));
}).mouseout(function () {
    _ju_fun = setInterval(animateJu, 5000);
});

function initJuImg(_l) {
    $.each(_l.find("img"), function (index, item) {
        $(item).attr("src", $(item).attr("data-url"));
        $(item).animate({ opacity: 1 }, 1000);
    });
}


