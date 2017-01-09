/**
 * 管理员注册功能
 * 
 */
$(function(){
	var arr=[false,false,false,false,false,false,false];
	var userText = $('#name')
	if(userText.val()=="用户名/手机/邮箱"){
		userText.addClass('cccolor')
	}
	else{
		userText.removeClass('cccolor')
	}
	userText.focus(function(){
		if($(this).val()==this.defaultValue){
			$(this).val("")
			$(this).removeClass('cccolor')
		}				
	}).blur(function(){
		if($(this).val()==""){
			$(this).val(this.defaultValue)
			$(this).addClass('cccolor')
		}	
		var name = $("#name").val();
		if (WD.regular.isEmpty(name) || name == '用户名/手机/邮箱') {
			$("#name_msg_font").html('请输入正确的用户名');
			$("#name_msg").show();
			$("#name").focus();
			arr[0]=false;
		}else {
			$.post('check_name.json',{'name':$(this).val().trim()},
					function(data){
					if(data.trim()=="用户已存在"){
						$("#name_msg_font").html('用户名已存在');
						$("#name_msg").show();
						$("#name").focus();
						arr[0]=false;
					}else{
						$("#name_msg").hide();
					arr[0]=true;
					}
			},'text');
		}
	})
	$("#password").blur(function(){
		var password = $("#password").val();
		if (!WD.regular.pwd.test(password)) {
			$("#password_msg").show();
			arr[1]=false;
		}else {
			$("#password_msg").hide();
			arr[1]=true;
		}
	});
	$("#password1").blur(function(){
		  var password = $("#password").val();
		  var password1 = $("#password1").val();
		if (password != password1) {
			$("#password1_msg").show();
			arr[2]=false;
		}else{
			$("#password1_msg").hide();
			arr[2]=true;
		}
	});
	$("#operativePassword").blur(function(){
		var password = $("#operativePassword").val();
		if (!WD.regular.pwd.test(password)) {
			$("#operativePassword_msg").show();
			arr[3]=false;
		}else {
			$("#operativePassword_msg").hide();
			arr[3]=true;
		}
	});
	$("#operativePassword1").blur(function(){
		  var password = $("#operativePassword").val();
		  var password1 = $("#operativePassword1").val();
		if (password != password1) {
			$("#operativePassword1_msg").show();
			arr[4]=false;
		}else{
			$("#operativePassword1_msg").hide();
			arr[4]=true;
		}
	});
	$("#cellphone").blur(function(){
		if($(this).val().trim()==""){
			arr[5]=true;
			$("#cellphone_msg").hide();
		}else{
			if(!WD.regular.mobile.test($("#cellphone").val())){
            	$("#cellphone_msg").show();
    			arr[5]=false;
			}else{
				$("#cellphone_msg").hide();
				arr[5]=true;
			}
		}
		});
		
		$("#email").blur(function(){
			 var temp = $("#email");
	        if(temp.val().trim()==""){
	        	arr[6]=true;
	        	$("#email_msg").hide();
	        }else{
	            if(!WD.regular.email.test(temp.val()))
	            {
	            	$("#email_msg").show();
	    			arr[6]=false;
	            }
	            else{
	            	$("#email_msg").hide();
	                arr[6]=true;
	            }
	        }
		}
				
		);
	//点击注册,提交表单
	$("#register_admin").click(function(){
		var s=1;
		for(var i=0;i<arr.length;i++){
			s*=arr[i];
		}
		if(s==1){
			//$("#RegisterFormAdmin").attr('action','insertadmin.htm').submit();
			$.post(
					"insertadmin.htm",
					{"name":$("#name").val(),
					 "role":$("input[name=role]").val(),
					 "password":$("#password").val(),
					 "operativePassword":$("#operativePassword").val(),
					 "realName":$("#realName").val(),
					 "cellphone":$("#cellphone").val(),
					 "telephone":$("#telephone").val(),
					 "email":$("#email").val()},
					 function(data){
						 if(data.trim()=="success"){
							 $("#RegisterFormAdmin")[0].reset();
							 alert("注册成功!"); 
						 }else{
							 alert("网络出错,注册失败!请稍后再试....");
						 }
					 },
					 'text'
					);
		}
		
			
			});
})