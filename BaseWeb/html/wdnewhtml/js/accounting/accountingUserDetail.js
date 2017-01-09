/*
 * Copyright (c) wd1998.com, All Rights Reserved
 */

$(function(){
    $("#search_btn").on("click", function(){
        var username = $("#username").val();
        if (username == "") {
            alert("请输入用户名");
            $("#username").focus();
            return;
        }

        $("#search_form").submit();
    })

    $(".type_link").on("click", function() {
        var type = $(this).attr("type");
        var currType = $("#type").val();

        if (type != currType) {
            $("#type").val(type);

            $("#search_form").submit();
        }
    })
})

function gotoPage(page) {
    $("#page").val(page);
    $("#search_form").submit();
}