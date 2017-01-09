$(function () {

    $(".option").hover(function () {
        $(this).find(".option-item").show();
    }, function () {
        $(this).find(".option-item").hide();
    });
    
});