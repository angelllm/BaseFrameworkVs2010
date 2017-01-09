$(function () {

    $(".floor .tip label,.unit h5").hover(function () {

        $(this).wrapInner("<i/>").find("i").animate({ marginLeft: "20px" }, 200);

    },
        function () {

            $(this).find("i").contents().unwrap();

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