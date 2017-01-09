$(function () {

    $("._cate dd ").hover(function () {

        $(this).parent().addClass("cur-dd");
        $(this).prev().addClass("white").find("i").hide();

        $(this).find(".more-cate").show().end().find(".split").show();

    }, function () {

        $(this).parent().removeClass("cur-dd");
        $(this).prev().removeClass("white").find("i").show();
        $(this).find(".more-cate").hide().end().find(".split").hide();
    });


    $("._cate dt ").hover(function () {

        $(this).parent().addClass("cur-dd");
        $(this).addClass("white").find("i").hide();

        $(this).next().find(".more-cate").show().end().find(".split").show();

    }, function () {

        $(this).parent().removeClass("cur-dd");
        $(this).removeClass("white").find("i").show().end().find(".split").show();
        $(this).next().find(".more-cate").hide().end().find(".split").hide();





    });

    $(".a-cate").hover(function () {

        $(this).find("._cate").fadeIn(200);

    }, function () {

        $(this).find("._cate").fadeOut(200);
    });


    //$(".notice").animate({ opacity: 0.8 }, 100);
});