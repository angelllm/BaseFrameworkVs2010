$(function(){
	var pro_path=$("#pro_path").val();
	$("#moduleName").focus();
	$("#addModule").on("click",function(){
		var moduleName=$("#moduleName").val();
		var modulePath=$("#modulePath").val();
		var tempFlag=true;
		if(moduleName==""){
			$("#moduleName").parent("p").next("span").text("名称不能为空");
			$("#moduleName").focus();
			tempFlag=false;
			return;
		}
		if(modulePath==""){
			$("#modulePath").parent("p").next("span").text("请求路径不能为空");
			$("#modulePath").focus();
			tempFlag=false;
			return;
		}
		if(tempFlag){
			$.post("addModule.json",{"moduleName":moduleName,"modulePath":modulePath},function(res){
				if(res.msg=="ok"){
					alert("添加成功");
					window.location.href=pro_path+"/console/allModules.htm";
				}
				if(res.msg=="fail"){
					alert("添加失败");
				}
			},"json");
		}
	});
});