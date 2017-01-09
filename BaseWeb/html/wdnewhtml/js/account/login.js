/**
 * @fileoverview 管理员登录页面JS
 * 
 * @author Liuxey
 */
$(function(){

	// 刷新验证码
	$("#v_code_img").on("click", function(){
		$(this).attr("src", "captcha.htm");
	})
	$("#username").focus();

    $("#password").on("keyup", function(e){
        e = e || event;
        if (e.keyCode == "13" && $(this).val() != "") {
            $("#login_submit_btn").click();
        }
    })
    $("#v_code").on("keyup", function(e){
        e = e || event;
        if (e.keyCode == "13" && $(this).val() != "") {
            $("#login_submit_btn").click();
        }
    })
	
	// 提交表单
	$("#login_submit_btn").on("click", function() {
		var username = $("#username").val();
		var password = $("#password").val();
		
		var v_code = $("#v_code").val();
		
		var v_flag = true;
		var v_msg = "";
		
		if (WD.regular.isEmpty(username)) {
			v_flag = false;
			v_msg += "请输入账号\n";
		}
		
		if (WD.regular.isEmpty(password)) {
			v_flag = false;
			v_msg += "请输入密码\n";
		}
		
		if (!v_flag) {
			alert(v_msg);
            return ;

		}else {
			$("#login_form").ajaxSubmit({
				url : "login.json",
				dataType : "json",
				type : "post",
				success : function(res) {
					if (res.flag) {
						WD.ui.alert("登录成功", function() {
                            if (backurl) {
                                location.href=backurl;
                            } else if (!!document.referrer){
                                if (res.role == 3) {
                                    location.href="../accounting/userDetail.htm";

                                } else {
                                    location.href=document.referrer;;
                                }
                            } else {
                                if (res.role == 3) {
                                    location.href="../accounting/userDetail.htm";

                                } else {
                                    location.href="../index.htm";
                                }
                            }
                        }, 1000);

					}else {
						if (res.msg == "pwd" || res.msg == "no") {
							msg = "用户名或密码错误";
                            $("#password").val("");

						}else if (res.msg == 'code') {
                            msg = "请输入正确的验证码";
                        } else if (res.msg == "role") {
                            msg = "管理员未设置角色，登录失败";
                        }
						
						$("#v_code_img").click();
						
						if (res.failCount >= 3) {
							$("#login_captcha").show();
						}

                        alert(msg);
                        //WD.ui.alert(msg, function(){}, 100000, "error");
					}
				},
				error : function() {
					alert("登录失败");
				}
			});
		}
	})
})