/*chenfei*/
var projectPath=$('#project_path').val();
function toRemark(){
	$("#refuse").hide();
	$("#send").show();
	$("#contents").focus();
}
function toPass(){
	$("#send").hide();
	$("#refuse").show();
}
function subRefuse(){
	var remark=$('#contents').val();
	if(!remark){
		alert('请输入拒绝的理由');
		return;
	}
	$('#operate').val('-2');
	$('#remark').val(remark);
	formSub();
}
function subPass(){
	$('#operate').val('2');
	formSub();
}
function formSub(){
	$('#form1').attr('action',projectPath+"/buyerApply/refer.htm").submit();
}
function showImage(dom){
	window.open($(dom).attr('src'));
}
