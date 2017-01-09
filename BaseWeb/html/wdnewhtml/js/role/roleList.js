function gotoPage(page,totalPage,pageSize){
		window.location.href="list.htm?pageNo="+page;
}
function roleSet(roleId){
	window.location.href=$("#projectPath").val()+"/module/wdm039/roleSet.htm?roleId="+roleId;
}
function roleModify(roleId){
	window.location.href="roleModify.htm?roleId="+roleId;
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
		
		$("#delete_role").click(function(){
				var h="";
				$(".select_input:checked").each(function(){
						h+=$(this).val()+",";
				});
				$("input[name=roleArr]").val(h);
				if(h==""){
					return;
				}else{
					if(confirm("确定删除吗?")){
						$("#form_id").attr('action','delete_role.htm').submit();
					}
				
				}			
				
		});
		
      
});