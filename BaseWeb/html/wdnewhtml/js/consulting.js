$(function () {

    $(".item-waper em").click(function () {

        $(this).prev().css("height", "auto").end().fadeOut();
    });

    $(".goon").click(function () {

        $(".model").hide();
        var model = $(this).next(".model");
        model.show().find("textarea").focus();

    });

    $(".closetag").click(function () {
        $(".model").hide();
    });

});