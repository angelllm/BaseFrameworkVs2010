$(function(){
	 var flag=false;
	$("input[name=name]").focus();
	$("input[name=name]").blur(function(){
		$.post(
				"checkName_update.json",
				{"name":$(this).val(),"pageId":$("input[name=id]").val()},
				function(data){
					if(data=="error"){
						$("#name_msg").css("color","red").html("名称已存在").show();
						flag=false;
					}else{
						$("#name_msg").hide();
						flag=true;
					}		
				},'text');
		
	});
	$("#send").click(function(){
		if(flag){
			$("#form_id").attr("action","updatePage.htm").submit();
		}
	})
	
});