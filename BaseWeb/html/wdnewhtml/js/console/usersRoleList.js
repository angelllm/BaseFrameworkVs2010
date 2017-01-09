$(function(){
	var project_path=$("#project_path").val();
	$(".modifyUserRole").each(function(){
		$(this).on("click",function(){
			var roleId=$(this).attr("id");
			var typeId=$("#typeId").val();
			window.location.href=project_path+"/console/moduleList.htm?roleId="+roleId+"&typeId="+typeId;
		});
	});
});