$(function(){

	var pro_path=$("#pro_path").val();
	$("#add").click(function(){
		var name=$("#cfName").val();
		var code=$("#cfCode").val();
		var value=$("#cfValue").val();
		var type=$("#cfType").val();
		var nameFlag=true;
		var codeFlag=true;
		var typeFlag=true;
		var valFlag=true;
		if(name==""){
			$("#cfName").parent("p").next("span").text("名称不能为空");
			nameFlag=false;
			return;
		}
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
		if(nameFlag==true && valFlag==true && typeFlag==true && codeFlag==true){
			$.post("addConfig.json",{"name":name,"code":code,"value":value,"type":type},function(res){
				if(res.msg=="ok"){
					window.location.href=pro_path+"/console/configurationList.htm"
				}
				if(res.msg=="fail"){
					alert("修改失败");
				}
			},"json");
		}
	});
});