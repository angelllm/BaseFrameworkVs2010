$(function(){
	var configId=$("#configId").val();
	var pro_path=$("#pro_path").val();
	$("#update").click(function(){
		var code=$("#cfCode").val();
		var value=$("#cfTemplate").val();
		var type=$("#cfType").val();
		var codeFlag=true;
		var typeFlag=true;
		var valFlag=true;
		if(code==""){
			$("#cfCode").parent("p").next("span").text("Code不能为空");
			codeFlag=false;
			return;
		}
		if(type==""){
			$("#cfType").parent("p").next("span").text("Type不能为空");
			typeFlag=false;
			return
		}else if(isNaN(type)){
			$("#cfType").parent("p").next("span").text("请输入数字");
			typeFlag=false;
			return
		}	
		if(value==""){
			$("#cfValue").parent("p").next("span").text("Value不能为空");
			valFlag=false;
			return
		}
		if(valFlag==true && typeFlag==true && codeFlag==true){
			$.post("modifyContentTemplate.json",{"configId":configId,"code":code,"template":value,"type":type},function(res){
				if(res.msg=="ok"){
					window.location.href=pro_path+"/console/contentTemplateList.htm"
				}
				if(res.msg=="fail"){
					alert("修改失败");
				}
			},"json");
		}
	});
});