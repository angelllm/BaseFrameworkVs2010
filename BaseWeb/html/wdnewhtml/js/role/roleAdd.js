$(function(){
	
	$("input[name=name]").blur(function(){
		var value=$(this).val();
		if(value){
			$.post(
					"checkName.htm",
					{"name":value},
					function(data){
						if(data=="error"){
							$("#name_msg").html("角色名已存在").css('color','red').show();
						}else{
							$("#name_msg").hide();
						}
					},'text');
		}
	});
	
	$("input[name=type_id]").blur(function(){
		var value=$(this).val();
		 var reg = /^\d+$/;
		if(!reg.test(value)){
			$("#typeId_msg").html("请输入数字").css('color','red').show();
		}else{
			$("#typeId_msg").hide();
		}
	});
	
	$("#send").click(function(){
		var value=$("input[name=name]").val();
		var typeId=$("input[name=type_id]").val();
		 var reg = /^\d+$/;
		 if(!reg.test(typeId)){
				$("#typeId_msg").html("请输入数字").css('color','red').show();
				return;
			}else{
				$("#typeId_msg").hide();
			}
		if(value){
			$.post(
					"checkName.htm",
					{"name":value},
					function(data){
						if(data=="error"){
							$("#name_msg").html("角色名已存在").css('color','red').show();
						}else{
							$("#name_msg").hide();
							$("#form_id").attr("action","add.htm").submit();
						}
					},'text');
		}else{
			return;
		}
		
	});
	
});