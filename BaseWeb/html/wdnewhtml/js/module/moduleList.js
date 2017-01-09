
function moduleModify(moduleId){
	window.location.href="moduleModify.htm?moduleId="+moduleId;
}

function checkChildrenModule(parentId){
		window.location.href="list.htm?parentId="+parentId;
	
}
$(function(){
	
		$("#all_select").click(
				function(){
					if(this.checked){
						$(".select_input").each(function(a){
							$(this).prop("checked",true);
						});
					}else{
						$(".select_input").each(function(a){
							$(this).prop("checked",false);
						});
					}
				}
		
		);
		
		$("#delete_module").click(function(){
				var h="";
				$(".select_input:checked").each(function(){
						h+=$(this).val()+",";
				});
				$("input[name=moduleArr]").val(h);
				if(h==""){
					return;
				}else{
					if(confirm("确定删除吗?")){
						$.post(
							"checkSize.htm",
							{"ids":$("input[name=moduleArr]").val()},
							function(data){
								if(data.length>0){
									alert("一级模块下面含有子模块,请先删除子模块");
									return;
								}else{
									$("#form_id").attr('action','delete_module.htm').submit();
								}
							},'json'
							);				
					}
				
				}			
				
		});
		
      
});