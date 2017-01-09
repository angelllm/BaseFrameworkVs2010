$(function(){
	
	var moduleId=$("#moduleId").val();
	var pro_path=$("#pro_path").val();
	$("#send").on("click",function(){
		var moduleName=$("#moduleName").val();
		var modulePath=$("#modulePath").val();
		var flag=true;
		if(moduleName==""){
			$("#moduleName").parent("p").next("span").text("名称不能为空");
			$("#moduleName").focus();
			flag=false;
			return;
		}
		if(modulePath==""){
			$("#modulePath").parent("p").next("span").text("Path不能为空");
			$("#modulePath").focus();
			flag=false;
			return;
		}
		if(flag){
			$.post("modifyModule.json",{"moduleId":moduleId,"moduleName":moduleName,"modulePath":modulePath},function(res){
				if(res.msg=="ok"){
					alert("修改成功");
					window.location.href=pro_path+"/console/allModules.htm";
				}
				if(res.msg=="fail"){
					alert("修改失败");
				}
			},"json");
		}
	});
});