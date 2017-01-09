
$(function () {


    var cookie = $.cookie('slide');
    if (cookie == "true") {
        $("#menu-left").css({ "overflow": "hidden", "position": "static" }).animate({ "width": "21%" }, function () {
            $(".menu-item span,.menu-item label").show();
        });
        $("#right-containter").css({ "margin-left": "auto" }).animate({ "width": "79%" });
    } else {
        $("#menu-left").css({ "overflow": "hidden", "position": "absolute", "left": "0", "top": "0" }).animate({ "width": "50px" }, function () {
            $(".menu-item span,.menu-item label").hide();
        });
        $("#right-containter").css({ "margin-left": "50px" }).animate({ "width": "96%" });

    }

    $(".menu-top i").click(function () {

        if (!cookie) {
            $.cookie('slide', true, { path: '/Admin/' });
            cookie = $.cookie('slide');
        }
        if (cookie == "true" && parseInt($("#menu-left").css("width")) != 50) {
            $("#menu-left").css({ "overflow": "hidden", "position": "absolute", "left": "0", "top": "0" }).animate({ "width": "50px" }, function () {
                $(".menu-item span,.menu-item label").hide();
            });
            $("#right-containter").css({ "margin-left": "50px" }).animate({ "width": "96%" });
            $.cookie('slide', false, { path: '/Admin/' });
        } else if (cookie == "false" && parseInt($("#menu-left").css("width")) != 50) {

            $("#menu-left").css({ "overflow": "hidden", "position": "absolute", "left": "0", "top": "0" }).animate({ "width": "50px" }, function () {
                $(".menu-item span,.menu-item label").hide();
            });
            $("#right-containter").css({ "margin-left": "50px" }).animate({ "width": "96%" });
            $.cookie('slide', false, { path: '/Admin/' });
        }
        else {

            $("#menu-left").css({ "overflow": "hidden", "position": "static" }).animate({ "width": "21%" }, function () {
                $(".menu-item span,.menu-item label").show();
            });
            $("#right-containter").css({ "margin-left": "auto" }).animate({ "width": "79%" });
            $.cookie('slide', true, { path: '/Admin/' });
        }


    });


    $(".menu-item").each(function (index, item) {

        $(this).append($(this).html());
    });



    $(".menu-item").hover(function () {	//On hover...
        $(this).find("label,em").stop().animate({
            marginTop: "-32"
        }, 200);

    }, function () {
        $(this).find("label,em").stop().animate({
            marginTop: "0"
        }, 200);

    });

    $.each($(".menu a"), function (index, item) {

        if ($(this).attr("data") == $("#hfUrl").val()) {
            $(".dir-hover").toggleClass("menu-cur", "").toggleClass("dir-hover", "");
            $(this).addClass(" menu-cur").find("em").addClass("dir-hover"); return;
        }
    });


    $(".menu a").not($(".menu a").eq(0)).click(function (index, item) {
        window.location.href = $(this).attr("data"); return false;
    });


});