function delete_fragment(id,pageId){
	if(confirm("确定要删除吗?")){
		window.location.href="delete_fragment.htm?id="+id+"&pageId="+pageId;
	}

}
function modify_fragment(id){
	window.location.href="modify_fragment.htm?id="+id;
}
$(function(){
	$("#id_add").click(function(){
		$("#form_add").attr("action","pageFragmentInsert.htm").submit();
	});

	$("#id_modify").click(function(){
		$("#form_modify").attr("action","pageFragmentModify.htm").submit();
	});
});