$(function () {

    // all select 
    $(".ttitle .waper input:checkbox:eq(0)").click(function () {

        $(this).next().next().prop("checked", false);
        $(".item input:checkbox").prop("checked", $(this).prop("checked"))
    });

    $(".ttitle .waper input:checkbox:eq(1)").click(function () {

        $(this).prev().prev().prop("checked", false);
        $(".item input:checkbox").each(function (index, item) {
            $(this).prop("checked", !$(this).prop("checked"));
        });

    });


    $(".con-del,.con-down").click(function () {

        $(".model").hide();
        var model = $(this).next(".model");
        model.show().attr("data", 1).find("textarea").focus();

    });
    $(".closetag").click(function () {

        $(".model").hide();
        //$(this).parent().attr("data", 0);
    });

});




 