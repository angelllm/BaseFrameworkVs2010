$(function () {

    $(".floor h4 span a,.floor .tip label,.unit h5,.tip_info label").hover(function () {

        $(this).stop().animate({ marginLeft: "15px" }, 250);

    },
        function () {

            $(this).stop().animate({ marginLeft: "0px" }, 250);

        }

        );


    $.each($(".brand a"), function (index, item) {
        $(item).append($(item).html());
    });

    $.each($(".influx a"), function (index, item) {
        $(item).append($(item).html());
    });

    $(".brand a,.influx a").hover(function () {
        $(this).find("label:first").stop().animate({
            marginTop: -$(this).height()
        }, 200);
    }, function () {
        $(this).find("label:first").stop().animate({
            marginTop: "0"
        }, 200);
    });


});


 


function slideBar(i) {

    $(".cur-bar").find("b").css("display", "block").show().end().find("em").hide().end().removeClass("cur-bar");
    $(".slideBar-a:eq(" + i + ")").find("b").hide().end().find("em").show().css("display", "block").end().addClass("cur-bar");
}

$(function () {

    //console.log("containter:" + $("#containter").offset().left);
    $("#slideBar").css({ left: $("#containter").offset().left - 80, top: $("#containter").offset().top - 300 });


    $(window).resize(function () {
        $("#slideBar").css({ left: $("#containter").offset().left - 80, top: $("#containter").offset().top - 300 });
    });

    $(window).scroll(function () {

        //console.log($(".first-floor").position().top);
        //console.log($(window).scrollTop());

        // console.log("doorway:" + $(".doorway").offset().top);
        if ($(window).scrollTop() > 300) {
            $("#slideBar").addClass("fade-animite");

            slideBar(0);
        }
        if ($(window).scrollTop() >= 800) {
            slideBar(1);
        }
        if ($(window).scrollTop() >= 1500) {
            slideBar(2);
        }
        if ($(window).scrollTop() >= 2200) {
            slideBar(3);
        }
        if ($(window).scrollTop() < 300) {
            $("#slideBar").removeClass("fade-animite");
        }

    });


    $(".slideBar-a").hover(function () {

        if ($(this).hasClass("cur-bar")) {
            return;
        } else {

            $(this).find("b").hide().end().find("em").fadeIn(300).css("display", "block");
        }

    }, function () {

        if ($(this).hasClass("cur-bar")) {
            return;
        } else {

            $(this).find("b").css("display", "block").show().end().find("em").hide();
        }
    }).click(function () {

        $('body,html').animate({ scrollTop: $(this).attr("data") }, 300); return false;

    });








});



var cur_select = 0;
function animite() {


    if (cur_select == 6) {
        cur_select = 0;
    }

    var h1 = $(".cate-item").eq(cur_select).find("h1");
    $(".cur-animite").attr("class", $(".cur-animite").attr("s-class"));
    $("#banner img").removeClass("animite").hide();
    $("#banner a:eq(" + cur_select + ") img").fadeIn(800).addClass("animite");

    h1.addClass(h1.attr("c-class") + " cur-animite");
    cur_select++;
}
var _animite = setInterval("animite()", 5000);



$(function () {

    animite();

    $(".cate-item").hover(function () {

        //is banner
        $(".cur-animite").attr("class", $(".cur-animite").attr("s-class"));

        var $this = $(this);
        var h1 = $this.find("h1").eq(0);
        var p = $this.find("p").eq(0);
        $this.prev().find("p").eq(0).addClass("nobborder2");
        p.addClass("nobborder2");
        $this.addClass("cate-item-hover").find(".cate-more-list").eq(0).show();
        h1.addClass(h1.attr("c-class") + "  cur-animite");

        //banner
        clearInterval(_animite);
        //console.log("cur_select->" + cur_select);

        var cur_hover = $this.index() - 1;
        cur_hover = cur_hover > 5 ? 5 : cur_hover;
        $("#banner img").stop().removeClass("animite").hide();
        $("#banner a:eq(" + cur_hover + ") img").stop().fadeIn(800).addClass("animite");
        if (cur_hover == 5) {
            cur_select = 0;
        } else { cur_select = $this.index(); }

    }, function () {

        var $this = $(this);
        var p = $this.find("p").eq(0);
        p.removeClass("nobborder2");
        var h1 = $this.find("h1").eq(0);
        $this.removeClass("cate-item-hover").find(".cate-more-list").eq(0).hide();
        $this.prev().find("p").eq(0).removeClass("nobborder2");

        //banner 
        $(".cur-animite").attr("class", $(".cur-animite").attr("s-class"));
        $(".cate-item").eq(cur_select - 1).find("h1").addClass(h1.attr("c-class") + "  cur-animite");
        _animite = setInterval("animite()", 5000);

    });

});