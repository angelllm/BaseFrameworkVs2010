
$(".imglist li img").css("border", "2px solid #fff").hover(function () {

    //$(".large").hide().attr("src", $(this).attr("data")).fadeIn(300);
    $(".large").attr("src", $(this).attr("data"));
    $(".large").parent().attr("href", $(this).attr("data"));
    $(".MagicZoomBigImageCont img").attr("src", $(this).attr("data"));
    $(this).css("border-color", "#ff0000").parent().siblings().find("img").css("border-color", "#fff");

}, function () {
    // $(this).css("border-color", "#fff");
}


);

var login = false;
$(".collection").click(function () {
    var e = window.event || arguments.callee.caller.arguments[0];
    var $this = $(this);
    var x = e.pageX || e.clientX + document.body.scroolLeft;
    var y = e.pageY || e.clientY + document.body.scrollTop;
    if (login) {

        //在优化提示前 暂时允许无限收藏
        //if ($this.find("img").hasClass("coll-click")) {
        //alert("您已经收藏过了");
        //}
        //else { 
        var col = $('#j-coll');
        var yy = col.offset().top + 3;
        var xx = col.offset().left + 10;

        $("<img />")
        .attr("src", $this.attr("data-tip-img"))
        .css({ position: "absolute", left: x + "px", top: y + "px", width: "42px", height: "42px" })
        .addClass("data-tip-img")
        .appendTo("body")
        .animate({ left: xx + "px", top: yy + "px" }, 800)
        .animate({ width: 10 + "px", height: 10 + "px" }, 800)
        .fadeOut("2000", function () {

            $this.find("img").attr("src", "../webimage/new_theme/coll-star-pv.png").addClass("coll-click");
        });
        //}
        // $(".collection").unbind("click");

        // $(this).find("img").attr("src", "../webimage/new_theme/coll-star-pv.png").addClass("coll-click");
    }
    else {

        //console.log($(".zm").html());
        $(".zm").fadeIn(300);
        login = true;
    }

});



$(".logincon em").click(function () {

    $(".zm").fadeOut(300);

});


$(".desc .tab li a").click(function () {

    $(".tab-content").hide();
    $("#" + $(this).attr("for")).show();

});

$(".fix-tip .tab li a").click(function () {

    $(".tab-content").hide();
    $("#" + $(this).attr("for")).show();
    $('body,html').animate({ scrollTop: 1200 }, 900);
});

$(window).scroll(function () {
    var top = $(window).scrollTop();
    if (top >= 1200) {
        $(".fix-tip").fadeIn(300);
    } else {
        $(".fix-tip").fadeOut(300);
    }
    bezier_params = {
        start: {
            x: _s.offset().left + _s.width() / 2,
            y: _s.offset().top,
            angle: 0
        },
        end: {
            x: _e.offset().left,
            y: _e.offset().top,
            angle: 50,
            length: 0.33
        }
    };
});


$('#msg input,.goon a').click(function () {

    $('html,body').animate({ scrollTop: $(".submit").position().top }, 800);
    $(".txtcontent").focus();
});


$(".desc .tab a").click(function () {

    $(".tab .curtab").removeClass("curtab");
    $(this).addClass("curtab").siblings().removeClass("curtab");
    $(".fix-tip .tab a").eq($(this).parent().index()).addClass("curtab").siblings().removeClass("curtab");
});

$(".fix-tip .tab a").click(function () {

    $(".fix-tip .curtab").removeClass("curtab");
    $(this).addClass("curtab").siblings().removeClass("curtab");
    $(".desc .tab a").eq($(this).parent().index()).addClass("curtab").parent().siblings().find("a").removeClass("curtab");

});



$(".dorder").click(function () {

    var $this = $(this);
    var data = $(this).attr("data");
    if (data == "0") {

        $(".temp").hide();
        $(this).html(">\u6536\u8d77");

        var waper = $(this).parent().parent().parent().parent();
        $(this).attr("ow", waper.width());
        // waper.css("width", 500); ;
        waper.animate({ width: "480" }, function () {

            $(".pointer").show(200);
            $this.attr("data", "1");
        });
    }
    else {

        $(".pointer").hide(200);

        $(this).html("<\u8be6\u5355");
        var waper = $(this).parent().parent().parent().parent();
        // waper.css("width", 500); ;
        //console.log($(this).parent().parent().parent().parent().width());
        waper.animate({ width: $(this).attr("ow") }, function () {

            $(".temp").show(200);
            $this.attr("data", "0");
        });

    }



});


//颜色选择
$(".color a").click(function () {

    $(".color a span").remove();
    $(this).addClass("curselect").siblings().removeClass("curselect");
    $(this).append("<span></span>");
    $(".select-color").html($(this).html());


});



$(".prev").click(function () {

    var count = $(this).next();
    if (parseInt(count.val()) <= 0) {

        count.val(0);
    } else {
        count.val(parseInt(count.val()) - 1);
    }

});

$(".next").click(function () {

    var count = $(this).prev();
    //可加入库存判断
    count.val(parseInt(count.val()) + 1);

});
 
$(".select-count").change(function () {

    checkCount(this);

}).blur(function () {

    checkCount(this);
});
  

//检测购买量输入
function checkCount(obj) {

    var count = $(obj);
    if (isNaN(count.val())) {
        count.val(0);
    }
    else if (parseInt(count.val()) <= 0) {

        count.val(0);
    } else {

        count.val(parseInt(count.val()));
    }

}


//$("#kankan-warpper").html($("#kankan-warpper").html() + $("#kankan-warpper").html());

$(".swtich-rock-prev").click(function () {
    var mt = $("#kankan-warpper").css("marginTop");
    
    //console.log(mt);
    if (Math.abs(parseInt($("#kankan-warpper")[0].style.marginTop)) >= $("#kankan-warpper")[0].scrollHeight / 2) {
        $("#kankan-warpper")[0].style.marginTop = 0;
    }
    else {
        $("#kankan-warpper").animate({ marginTop: (parseFloat(mt.replace("px")) - 450) + "px" }, 500);
    }
});
$(".swtich-rock-next").click(function () {

    var mt = $("#kankan-warpper").css("marginTop");
    if (parseFloat(mt) < 0) {
        $("#kankan-warpper").animate({ marginTop: (parseFloat(mt.replace("px")) + 450) + "px" }, 500);
    } else {
        //$("#kankan-warpper")[0].style.marginTop = 0;
    }

});


function setKankan() {

    if ($(".kankan").width() == 154) {
        if ($("#kankan-warpper img").length <= 3) {
            $(".swtich li").unbind("click");
        }
    } else {
        if ($("#kankan-warpper img").length <= 6) {
            $(".swtich li").unbind("click"); 
        }
    } 
}
setKankan();


; (function ($) {

    $.path = {};

    var V = {
        rotate: function (p, degrees) {
            var radians = degrees * Math.PI / 180,
              c = Math.cos(radians),
              s = Math.sin(radians);
            return [c * p[0] - s * p[1], s * p[0] + c * p[1]];
        },
        scale: function (p, n) {
            return [n * p[0], n * p[1]];
        },
        add: function (a, b) {
            return [a[0] + b[0], a[1] + b[1]];
        },
        minus: function (a, b) {
            return [a[0] - b[0], a[1] - b[1]];
        }
    };

    $.path.bezier = function (params, rotate) {
        params.start = $.extend({ angle: 0, length: 0.3333 }, params.start);
        params.end = $.extend({ angle: 0, length: 0.3333 }, params.end);

        this.p1 = [params.start.x, params.start.y];
        this.p4 = [params.end.x, params.end.y];

        var v14 = V.minus(this.p4, this.p1),
          v12 = V.scale(v14, params.start.length),
          v41 = V.scale(v14, -1),
          v43 = V.scale(v41, params.end.length);

        v12 = V.rotate(v12, params.start.angle);
        this.p2 = V.add(this.p1, v12);

        v43 = V.rotate(v43, params.end.angle);
        this.p3 = V.add(this.p4, v43);

        this.f1 = function (t) { return (t * t * t); };
        this.f2 = function (t) { return (3 * t * t * (1 - t)); };
        this.f3 = function (t) { return (3 * t * (1 - t) * (1 - t)); };
        this.f4 = function (t) { return ((1 - t) * (1 - t) * (1 - t)); };

        /* p from 0 to 1 */
        this.css = function (p) {
            var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4 = this.f4(p), css = {};
            if (rotate) {
                css.prevX = this.x;
                css.prevY = this.y;
            }
            css.x = this.x = (this.p1[0] * f1 + this.p2[0] * f2 + this.p3[0] * f3 + this.p4[0] * f4 + .5) | 0;
            css.y = this.y = (this.p1[1] * f1 + this.p2[1] * f2 + this.p3[1] * f3 + this.p4[1] * f4 + .5) | 0;
            css.left = css.x + "px";
            css.top = css.y + "px";
            return css;
        };
    };

    $.path.arc = function (params, rotate) {
        for (var i in params) {
            this[i] = params[i];
        }

        this.dir = this.dir || 1;

        while (this.start > this.end && this.dir > 0) {
            this.start -= 360;
        }

        while (this.start < this.end && this.dir < 0) {
            this.start += 360;
        }

        this.css = function (p) {
            var a = (this.start * (p) + this.end * (1 - (p))) * Math.PI / 180,
              css = {};

            if (rotate) {
                css.prevX = this.x;
                css.prevY = this.y;
            }
            css.x = this.x = (Math.sin(a) * this.radius + this.center[0] + .5) | 0;
            css.y = this.y = (Math.cos(a) * this.radius + this.center[1] + .5) | 0;
            css.left = css.x + "px";
            css.top = css.y + "px";
            return css;
        };
    };

    $.fx.step.path = function (fx) {
        var css = fx.end.css(1 - fx.pos);
        if (css.prevX != null) {
            $.cssHooks.transform.set(fx.elem, "rotate(" + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ")");
        }
        fx.elem.style.top = css.top;
        fx.elem.style.left = css.left;
    };

})(jQuery);

var _s = $(".cart");
var _e = $("#j_sidebar_shop_num");
var bezier_params = {
    start: {
        x: _s.offset().left + _s.width() / 2,
        y: _s.offset().top,
        angle: 0
    },
    end: {
        x: _e.offset().left,
        y: _e.offset().top,
        angle: 50,
        length: 0.33
    }
};
 
$(".cart,.addcarts").click(function () {

    //console.log( $(".cart").offset().left +_s.width()/2);
    //console.log( $(".cart").offset().top);
    //console.log( $("#j_sidebar_shop_num").offset().left);
    //console.log($("#j_sidebar_shop_num").offset().top);

    var _im = $("<img />")
          .attr("src", $(".collection").attr("data-tip-img"))
          .css({ position: "absolute", left: _s.offset().left + "px", top: _s.offset().top + "px", width: "42px", height: "42px" })
          .addClass("add-cart-img");

    _im.appendTo("body");

    _im.show().animate(
        {
            path: new $.path.bezier(bezier_params),
            width: 15,
            height: 15
        },
        1000,
        "swing",
        function () {
            $(this).fadeOut().remove();
            var _jnm = $("#j_sidebar_shop_num");
            _jnm.text(parseInt(_jnm.text()) + 1);
            //$(this).delay(3000).fadeOut();
        } 
    );
    $(".cart-panel").fadeIn(300);
});

$(".cart-con h5 i").click(function () {
    $(".cart-panel").fadeOut(300);
});

$(".select-wapper").mCustomScrollbar({
    autoHideScrollbar: true,
    //mouseWheelPixels: 340,
    theme: "light-thin"
});

$(".select-wapper .mCSB_scrollTools .mCSB_draggerContainer").css("left", "11px");


//多颜色 添加采购清单成功后调用此方法
function updateMCSB_() {
    $(".mCSB_container").append($(".mCSB_container").html());
    $(".mCSB_draggerRail").css("background", "#000");
    $(".select-wapper").mCustomScrollbar("update");
};
