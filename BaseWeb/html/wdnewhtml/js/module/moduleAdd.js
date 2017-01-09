$(function(){
	$("select[name=level]").change(function(){
		if($(this).val()==1){
			var option="<option value='-1'>无父模块</option>";
			$("select[name=parentId]").html(option);
			$("#code_msg").hide();
		}else{
			$.post(
					"getParentList.htm",
					function(data){
						var option="";
						for(var i=0;i<data.length;i++){
							option=option+"<option value='"+data[i].id+"'>"+data[i].name+"</option>";	
						}
						$("select[name=parentId]").html(option);						
					},'json'
			);
		}
	});
	
	$("#send").click(function(){
		var sortValue=$("input[name=sort]").val();
		var codeValue=$("input[name=code]").val();
		 var reg = /^\d+$/;
		if(!reg.test(sortValue)){
			$("#sort_msg").html("请输入数字").css('color','red').show();
			return;
		}
	if($("select[name=level]").val()==1){
		$.get(
				"checkCode.htm",
				{"code":codeValue},
				function(data){
					if(data=="error"){
						$("#code_msg").html("模块编码已存在").css('color','red').show();
						return;
					}else{
						$("#code_msg").hide();
						$("#form_id").attr("action","add.htm").submit();
					}
				},'text');
	}else{
		if(codeValue){
			$.get(
					"checkCode.htm",
					{"code":codeValue},
					function(data){
						if(data=="error"){
							$("#code_msg").html("模块编码已存在").css('color','red').show();
							return;
						}else{
							$("#code_msg").hide();
							$("#form_id").attr("action","add.htm").submit();
						}
					},'text');
			
		}else{
			$("#code_msg").html("模块编码不能为空").css('color','red').show();
			return;
		}
	}

	});
});