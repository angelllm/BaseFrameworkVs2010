/*
 * Copyright (c) wd1998.com, All Rights Reserved
 */

$(function(){
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
        var amt = $("#amt").val();
        var payoffPwd = $("#payoffPwd").val();
        var orderSn = $("#orderSn").val();
        var remark = $("#remark").val();
        var captcha = $("#captcha").val();

        if (amt == "" || isNaN(amt) || parseFloat(amt) == 0) {
            alert("请输入正确的金额");
            $("#amt").focus();
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

        if (confirm("确定要入/扣款金额：" +  amt)) {
            // 提交
            $.ajax({
                url: "addPlatPayment.json",
                type: "post",
                dataType: "json",
                cache : false,
                async : false,
                data : {
                    amt : amt,
                    payoffPwd : payoffPwd,
                    orderSn : $.trim(orderSn),
                    remark : remark,
                    captcha : captcha,
                    accountingId : $("#accountingId").val()
                },
                success : function(result) {
                    if (result.flag) {
                        alert("操作成功");
                        location.href="platPayment.htm";
                    } else {
                        $("#captcha_img").click();
                        if (result.msg == "pwd") {
                            alert("支付密码错误");

                        } else if (result.msg == "sn") {
                            alert("相关订单号错误");

                        } else if (result.msg == "captcha") {
                            alert("验证码错误");

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
})

function gotoPage(page) {
    location.href="platPayment.htm?page="+page;
}