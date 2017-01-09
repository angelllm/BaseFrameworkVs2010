



$(function () {


    $(".person").hide();

    $("#cbkCompany").click(function () {

        $(".person").hide();
        $(".company").show();


    });

    $("#cbkPerson").click(function () {

        $(".person").show();
        $(".company").hide();
    });
});