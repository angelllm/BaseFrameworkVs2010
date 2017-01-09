
$(function(){
	$('.RegisterSelCard a').click(function(){
		$(this).addClass('ClickCard').siblings().removeClass('ClickCard')
		var index = $(this).index()
		if(index == 0){
			$('#RegisterForm').show()
			$('#RegisterFormAdmin').hide()
		}
		if(index == 1){
			$('#RegisterForm').hide()
			$('#RegisterFormAdmin,.DivadminGroup').show()
			//切换单选表单
			$("#role_two").click();
			//改变操作密码:为支付密码:
			$("#check_span").html("操作密码：");
		}
		if(index == 2){
			$('#RegisterForm,.DivadminGroup').hide()
			$('#RegisterFormAdmin').show()
			//切换单选表单
			$("#role_three").click();	
			//改变操作密码:为支付密码:
			$("#check_span").html("支付密码：");
		}
	})
	//点击注册,提交表单
	$("#register_admin").click(function(){
			$("#RegisterFormAdmin").attr('action','insertadmin.htm').submit();
			});
});
