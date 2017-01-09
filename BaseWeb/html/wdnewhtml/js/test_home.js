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