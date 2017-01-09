$(function(){
	var pro_path=$("#pro_path").val();
	var roleId=$("#roleId").val();
	$("#submit").on("click",function(){
		$(this).css({display:"none"});
		$("#info").css({display:"block"});
		var moduleIds="";
		$(".select_input").each(function(){
			if($(this).is(":checked")){
				moduleIds=moduleIds+$(this).attr("id")+",";
			}
		});
		var typeId=$("#typeId").val();
		$.post("changeModule.json",{"roleId":roleId,"moduleIds":moduleIds},function(res){
			if(res.msg=="ok"){
				alert("更新成功");
				window.location.href=pro_path+"/console/moduleList.htm?roleId="+roleId+"&typeId="+typeId;
			}
			if(res.msg=="tonull"){
				alert("置空成功");
				window.location.href=pro_path+"/console/moduleList.htm?roleId="+roleId+"&typeId="+typeId;
			}
		},"json");
	});
});