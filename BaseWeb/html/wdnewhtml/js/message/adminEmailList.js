function gotoPage(page,totalPage,pageSize){
		window.location.href="list.htm?pageNo="+page;
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
		$("#delete_message").click(function(){
				var h="";
				$(".select_input:checked").each(function(){
						h+=$(this).val()+",";
				});
				$("input[name=messageArr]").val(h);
				if(h==""){
					return;
				}else{
					if(confirm("确定删除吗?")){
						$("#form_id").attr('action','delete_message.htm').submit();
					}
				
				}
			
				
		});
		
		$("#recive_message").click(function(){
			window.location.href="list.htm";
		});
});