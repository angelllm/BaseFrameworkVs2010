$(function () {

    $(".parame-more").click(function () {

        $(this).parent().css("height", "auto");
        $(this).prev().css("height", "auto");
        $(this).css("height", $(this).prev().css("height"));

    });

});