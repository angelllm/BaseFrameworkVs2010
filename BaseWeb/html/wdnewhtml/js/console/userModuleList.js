function gotoPage(page){
	var roleId=$("#roleId").val();
	var pro_path=$("#pro_path").val();
	window.location.href=pro_path+"/console/moduleList.htm?pageNo="+page+"&roleId="+roleId;
}

$(function(){
	var pro_path=$("#pro_path").val();
	$(".deleteOption").each(function(){
		$(this).on("click",function(){
			var id=$(this).attr("id");
			var roleId=$("#roleId").val();
			$.get("deleteModule.json?",{"moduleId":id},function(res){
				if(res.msg=="ok"){
					//没有进行自动刷新????
					window.location.href=pro_path+"/console/moduleList.htm?pageNo="+page+"&roleId="+roleId;
				}
				if(res.msg=="fail"){
					alert("删除失败！")
				}
			},"json");
		});
	});
	
	$(".modifyOption").each(function(){
		$(this).on("click",function(){
			var id=$(this).attr("id");
			alert(id);
			window.location.href=pro_path+"/console/modifyModule.htm?moduleId="+id;
		});
	});
});