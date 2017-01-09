/**
 * @author chenfei
 */
var projectPath = $('#project_path').val();

function gotoPage(page, totalPage, rows){
	$('#pageNo').val(page);
	$('#form1').attr('action',projectPath+"/postage/list.htm").submit();
}

function deleteTemplate(id){
	$('#opera_id').val(id);
	$('#form1').attr('action',projectPath+"/postage/delete.htm").submit();
}

function modifyTemplate(id){
	$('#opera_id').val(id);
	$('#form1').attr('action',projectPath+"/postage/toModify.htm").submit();
}