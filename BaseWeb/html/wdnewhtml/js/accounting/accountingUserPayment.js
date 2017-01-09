/*
 * Copyright (c) wd1998.com, All Rights Reserved
 */

$(function(){
    $("#search_btn").on("click", function() {
        $("#username").val($.trim($("#username").val()));
        var username = $("#username").val();

        if (username && username != "") {
            $("#search_from").submit();
        } else {
            $("#username").focus();
        }
    });
    $("#username").on("keyup", function(e) {
        e = e || event;
        if (e.keyCode == "13") {
            $("#search_btn").click();
        }
    })
    $("#username").on("blur", function(e) {
        if ($("#username").val() != $("#_username").val() && $("#_username").val() != "") {
            $("#search_btn").click();
        }
    })

    $("#captcha_img").on("click", function() {
        $("#captcha_img").attr("src", "../login/captcha.htm?_t=" + new Date().getTime());
    })
    $("#captcha").on("keyup", function(e){
        e = e || event;
        if (e.keyCode == "13") {
            $("#money_btn").click();
        }
    });

    $("#money_btn").on("click", function(){
        var userId = $("#userId").val();
        var username = $("#_username").val();

        if (userId =="") {
            alert("请先搜索用户");
            return;
        }

        var amt = $("#amt").val();
        var payoffPwd = $("#payoffPwd").val();
        var orderSn = $("#orderSn").val();
        var remark = $("#remark").val();
        var captcha = $("#captcha").val();

        if (amt =="" || isNaN(amt) || parseFloat(amt) == 0) {
            alert("请输入正确的金额");
            return;
        } else {
            amt = parseFloat(amt).toFixed(2);
        }
        if (payoffPwd == "") {
            alert("请输入支付密码");
            return;
        }
        if (captcha == "") {
            alert("请输入验证码");
            return;
        }

        if (confirm("确定要入/扣款【" + username + "】账户金额：" +  amt)) {
            // 提交
            $.ajax({
                url: "addUserPayment.json",
                type: "post",
                dataType: "json",
                cache : false,
                async : false,
                data : {
                    userId : userId,
                    amt : amt,
                    payoffPwd : payoffPwd,
                    orderSn : $.trim(orderSn),
                    remark : remark,
                    captcha : captcha
                },
                success : function(result) {
                    if (result.flag) {
                        alert("操作成功");
                        $("#search_from").submit();
                    } else {
                        $("#captcha_img").click();
                        if (result.msg == "pwd") {
                            alert("支付密码错误");

                        } else if (result.msg == "sn") {
                            alert("相关订单号错误");

                        } else if (result.msg == "captcha") {
                            alert("验证码错误");

                        } else if (result.msg == "enough") {
                            alert("账户余额不足");

                        } else {
                            alert("操作失败");
                        }
                    }
                },
                error : function() {
                    $("#captcha_img").click();
                    alert("操作失败")
                }
            })
        }
    });

    if (search == "N") {
        alert("未找到用户");
        $("#username").focus();
    }

    if ($("#username").val() == "") {
        $("#username").focus();
    }
})

function gotoPage(pageNo) {
    $("#page").val(pageNo);
    $("#search_from").submit();
}