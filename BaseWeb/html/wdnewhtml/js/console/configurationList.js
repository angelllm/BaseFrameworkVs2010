$(function(){
	var pro_path=$("#pro_path").val();
	
	$(".modifyOption").click(function(){
		var id=$(this).attr("id");
		window.location.href=pro_path+"/console/modifyConfiguration.htm?configId="+id;
	});
	
	$(".deleteOption").click(function(){
		var id=$(this).attr("id");
		if(confirm("确定删除该配置吗？")){
			//window.location.href=pro_path+"/console/deleteConfiguration.htm?configId="+id;
			$.post("deleteConfiguration.json",{"configId":id},function(res){
				if(res.msg=="ok"){
					window.location.href=pro_path+"/console/configurationList.htm";
				}
				if(res.msg=="fail"){
					alert("未删除成功");
				}
			},"json");
		}
	});
});