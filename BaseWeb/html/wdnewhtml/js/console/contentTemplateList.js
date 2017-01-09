$(function(){
	var pro_path=$("#pro_path").val();
	
	$(".modifyOption").click(function(){
		var id=$(this).attr("id");
		window.location.href=pro_path+"/console/modifyContentTemplate.htm?configId="+id;
	});
	
	$(".deleteOption").click(function(){
		var id=$(this).attr("id");
		if(confirm("确定删除该模板吗？")){
			//window.location.href=pro_path+"/console/deleteConfiguration.htm?configId="+id;
			$.post("deleteContentTemplate.json",{"configId":id},function(res){
				if(res.msg=="ok"){
					window.location.href=pro_path+"/console/contentTemplateList.htm";
				}
				if(res.msg=="fail"){
					alert("未删除成功");
				}
			},"json");
		}
	});
});