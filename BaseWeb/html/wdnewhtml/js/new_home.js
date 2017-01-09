$(function () {

    $(".floor .tip_info label,.floor .tip label,.unit h5").hover(function () {

        $(this).animate({ marginLeft: "15px" }, 200);

    },
        function () {

            $(this).animate({ marginLeft: "0px" }, 200);

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





var max_length = $("._cate dl ").length;
var cur_select = 0;

function animite() {

    if (cur_select == 6) {
        cur_select = 0;
    }
    //console.log("cur_select:" + cur_select);
    $("#banner img").removeClass("animite").hide();
    $("#banner a:eq(" + cur_select + ") img").fadeIn(800).addClass("animite");

    var h1 = $("._cate dl").eq(cur_select).find("h1");
    var hover_class = $(".cur_class_hover").attr("class");
    if (hover_class != "" && typeof (hover_class) != "undefined") {
        hover_class = hover_class.split(" ");
        $(".cur_class_hover").attr("class", hover_class[0]);
    } else {


    }
    //console.log(hover_class);

    cur_class = h1.attr("class");
    h1.addClass(cur_class + "-hover");

    h1.addClass("cur_class_hover");
    cur_select++;

    console.log(cur_select);

}

var _animite = setInterval("animite()", 5000);

$(function () {


    animite();

    $("._cate dl ").hover(function () {

        clearInterval(_animite);
        // alert($(this).not(".conn").index());
        var dl = $(this).index() - 1;
        dl = dl > 5 ? 5 : dl;
        $("#banner img").stop().removeClass("animite").hide();
        $("#banner a:eq(" + dl + ") img").stop().fadeIn(800).addClass("animite");
        //console.log("hover-cur_select:" + cur_select);

        if ($.browser.webkit) {

            if (dl == 5) {
                cur_select = 0;
            } else {

                cur_select = dl + 1;
            }
        } else {

            if (dl == 5) {
                cur_select = 0;
            } else {

                cur_select = dl - 1;
            }
        }


        var h1 = $(this).find("h1");
        if (h1.hasClass("cur_class_hover")) {
            cur_class = h1.attr("class").split(' ')[0];
        } else {
            cur_class = h1.attr("class");
        }
        h1.addClass(cur_class + "-hover");

        if (typeof ($(".cur_class_hover")) != "undefined" && $(".cur_class_hover") != "") {

            //console.log("cur_class_hover:" + $(".cur_class_hover").attr("class"));
            if (typeof ($(".cur_class_hover").attr("class")) != "undefined") {

                $(".cur_class_hover").attr("class", $(".cur_class_hover").attr("class").split(' ')[0]);
            }

        }
        //cur_select = dl == 5 ? 0 : (dl + 1);
        //console.log("hover-cur_select:" + cur_select);


    }, function () {
        var h1 = $(this).find("h1");
        h1.removeClass(cur_class + "-hover");
        //$("#kinMaxShow2 img").removeClass("animite");
        _animite = setInterval("animite()", 5000);

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
        if ($(window).scrollTop() >= 2500) {
            slideBar(4);
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



    $(".adv_close").click(function () {

        $(this).parent().parent().slideUp(500);
    }).hover(function () {
        $(this).attr("src", "../webimage/new_theme/deleteicon2.png");
    }, function () {
        $(this).attr("src", "../webimage/new_theme/deleteicon.png");
    });





});
