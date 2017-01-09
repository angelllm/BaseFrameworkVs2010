
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
        var col = $('.top .nav a:last');
        var yy = col.offset().top + 3;
        var xx = col.offset().left + 10;

        $("<img />")
        .attr("src", $this.attr("data-tip-img"))
        .css({ position: "absolute", left: x + "px", top: y + "px", width: "42px", height: "42px" })
        .addClass("data-tip-img")
        .appendTo("body")
        .animate({ left: xx + "px", top: yy + "px" }, 500)
        .animate({ width: 10 + "px", height: 10 + "px" }, 500)
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


$(".cart,.addcarts").click(function () {

    $(".cart-panel").fadeIn(300);
});
$(".cart-con h5 i").click(function () {
    $(".cart-panel").fadeOut(300);
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
        $(this).html(">收起");

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

        $(this).html("<详单");
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
 

$("#kankan-warpper").html($("#kankan-warpper").html() + $("#kankan-warpper").html());

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
