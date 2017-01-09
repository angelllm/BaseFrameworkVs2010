function gotoPage(page){
	var pro_path=$("#pro_path").val();
	window.location.href=pro_path+"/console/allModules.htm?pageNo="+page;
}

$(function(){
	var pro_path=$("#pro_path").val();
	$(".deleteOption").each(function(){
		$(this).on("click",function(){
			var id=$(this).attr("id");
			if(confirm("确定删除吗")){
				$.get("deleteModule.json",{"moduleId":id},function(res){
					if(res.msg=="ok"){
						//没有进行自动刷新????
						alert("删除成功");
						window.location.href=pro_path+"/console/allModules.htm";
					}
					if(res.msg=="fail"){
						alert("删除失败！")
					}
				},"json");
			}else{
				return ;
			}
		});
	});
	
	$(".modifyOption").each(function(){
		$(this).on("click",function(){
			var id=$(this).attr("id");
			window.location.href=pro_path+"/console/modifyModule.htm?moduleId="+id;
		});
	});
});