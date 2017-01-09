/**
 * 供应商注册功能
 * 
 */
$(function(){
	
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
	})
	
	function loadLocation(parentId, callBack) {
		$.ajax({
			url: "location.json",
			dataType:"json",
			type:"post",
			data :{
				"parentId" : parentId
			},
			success: callBack
		});
	}
	
	// 载入省
	loadLocation("0", function(res) {
		for(var index in res) {
			var location = res[index];
			$("#province").append('<option value="'+location.id+'">'+location.name+'</option>');
		}
	});
	
	// 载入城市
	$("#province").on("change", function(){
		var provinceId = $("#province").val();
		loadLocation(provinceId, function(res){
			$("#locationId option").remove();
			
			for(var index in res) {
				var location = res[index];
				$("#locationId").append('<option value="'+location.id+'">'+location.name+'</option>');
			}
		})
	})
	
	$("#adminRegisterBtn").on("click", function(){
		var name = $("#name").val();
		var password = $("#password").val();
		var password1 = $("#password1").val();
		
		if (WD.regular.isEmpty(name) || name == '用户名/手机/邮箱') {
			$("#name_msg_font").html('请输入正确的用户名');
			$("#name_msg").show();
			$("#name").focus();
			return;
		}else {
			$("#name_msg").hide();
		}
		
		if (!/^.{6,18}$/.test(password)) {
			$("#password_msg").show();
			$("#password").focus();
			return;
		}else {
			$("#password_msg").hide();
		}
		
		if (password != password1) {
			$("#password1_msg").show();
			$("#password1").focus();
			return;
		}else{
			$("#password1_msg").hide();
		}
		
		$("#supplierRegisterForm").ajaxSubmit({
			url: "userSellerAdd.json",
			dataType : "json",
			type : "post",
			success:function(res) {
				if (res.flag == true) {
					alert("添加成功");
					location.href="./userSellerAdd.htm";
				}else {
					if (res.msg == 'exists') {
						$("#name_msg_font").html('用户名已存在');
						$("#name_msg").show();
						$("#name").focus();
					}
				}
			},
			error: function() {
				alert("添加失败");
			}
		});
	})
})