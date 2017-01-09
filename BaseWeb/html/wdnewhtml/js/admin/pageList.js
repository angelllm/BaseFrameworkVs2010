function gotoPage(page,totalPage,pageSize){
		window.location.href="list.htm?pageNo="+page;
}

function pageSet(pageId){
	window.location.href="indexList.htm?pageId="+pageId;
}

function pageModify(pageId){
	window.location.href="pageModify.htm?pageId="+pageId;
}

function pageArea(pageId){
	window.location.href="pageFragmentList.htm?pageId="+pageId;
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
	$("#delete_page").click(function(){
			var h="";
			$(".select_input:checked").each(function(){
					h+=$(this).val()+",";
			});
			$("input[name=pageArr]").val(h);
			if(h==""){
				return;
			}else{
				if(confirm("确定删除吗?")){
					$("#form_id").attr('action','delete_page.htm').submit();
				}
			
			}
		
			
	});
});