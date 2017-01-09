/*chenfei*/
var projectPath=$('#project_path').val();
function showDetail(id){
	$('#sub_apply_id').val(id);
	$('#form2').attr('action',projectPath+'/buyerApply/detail.htm').submit();
}
function gotoPage(page, totalPage, rows){
	$('#sub_page').attr('name',"pageNo").val(page);
	formSub();
}
function toStatus(status){
	$('#sub_status').val(status);
	formSub();
}
function formSub(){
	$('#form1').attr('action',projectPath+"/buyerApply/list.htm").submit();
}
function showRemark(id){
	$.get(projectPath+'/buyerApply/remark.json?'+new Date().getTime(),{'id':id},function(data){
		alert(data);
	},"text")
}