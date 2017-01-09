/**
 * 管理员注册功能
 * 
 */
$(function(){
	var arr=[true,true,true,true,true,true,true];
	$("#password").blur(function(){
		var password = $("#password").val();
		if(password==""){
			$("#password_msg").hide();
			arr[1]=true;
		}else{
			if (!WD.regular.pwd.test(password)) {
				$("#password_msg").show();
				arr[1]=false;
			}else {
				$("#password_msg").hide();
				arr[1]=true;
			}
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
		if(password==""){
			$("#operativePassword_msg").hide();
			arr[3]=true;
		}else{
			if (!WD.regular.pwd.test(password)) {
				$("#operativePassword_msg").show();
				arr[3]=false;
			}else {
				$("#operativePassword_msg").hide();
				arr[3]=true;
			}
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
					"modifyadmin.htm",
					{
					 "id":$("#adminId").val(),
					 "password":$("#password").val(),
					 "operativePassword":$("#operativePassword").val(),
					 "realName":$("#realName").val(),
					 "cellphone":$("#cellphone").val(),
					 "telephone":$("#telephone").val(),
					 "email":$("#email").val()},
					 function(data){
						 if(data.trim()=="success"){
							 alert("修改成功!"); 
						 }else{
							 alert("网络出错,修改失败!请稍后再试....");
						 }
					 },
					 'text'
					);
		}
		
			
			});
})