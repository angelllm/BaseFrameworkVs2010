$(function () {

    if (window.screen.width > 1024) {

    } else {

        $("<link>").attr({ rel: "stylesheet", type: "text/css", href: "../webcss/item.1024.css" }).appendTo("head");
        $("<link>").attr({ rel: "stylesheet", type: "text/css", href: "../webcss/Header.1024.css" }).appendTo("head");
    }


    $("body").fadeIn("1000");

});



$(function () {

    if ($(".imglist img").length < 6) {
        $(".animte-next").addClass("animte-next-disable");
    }


    $(".image .waper a").click(function () {

        if ($(".imglist img").length < 6) {
            return;
        }

        var $this = $(this);
        var c = $this.attr("class");
        var marginleft;
        if (c == "animte-prev") {
            marginleft = "0px";
            $this.addClass("animte-prev-disable");
            $(".animte-next").removeClass("animte-next-disable");
        }
        else if (c == "animte-next") {
            marginleft = "-70px";
            $this.addClass("animte-next-disable");
            $(".animte-prev").removeClass("animte-prev-disable");
        }
        $(".imglist").animate({ marginLeft: marginleft }, 500);
    });
});



$(function () {

    $(".imglist li img").css("border", "2px solid #fff").hover(function () {

        $(".large").attr("src", $(this).attr("src"));
        $(".large").parent().attr("href", $(this).attr("src"));
        $(".MagicZoomBigImageCont img").attr("src", $(this).attr("src"));
        $(this).css("border-color", "#ff0000");

    }, function () {

        $(this).css("border-color", "#fff");

    }



    );



    $(".tab li a").click(function () {

        $(".tab-content").hide();
        $("#" + $(this).attr("for")).show();

    });




});



$(function () {



    $('#msg input,.goon a').click(function () {

        $('html,body').animate({ scrollTop: $(".submit").position().top }, 800);
        $(".txtcontent").focus();
    });


    $(".tab a").click(function () {

        $(".curtab").removeClass("curtab");
        $(this).addClass("curtab").siblings().removeClass("curtab");

    });




    $(".dorder").click(function () {

        var $this = $(this);
        var data = $(this).attr("data");
        if (data == "0") {

            $(".temp").hide();
            $(this).html(">收起");
            var waper = $(this).parent().parent().parent().parent();
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
            waper.animate({ width: "320" }, function () {

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