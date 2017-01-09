/**
 * @author chenfei
 */
var projectPath = $('#project_path').val();
var image_path = $('#image_path').val();
$(function(){
	$('#subForm').on('click',function(){
		$.post(projectPath+'/keywords/hot.json?'+new Date().getTime(),{'hot':$('#hot_keys').val()},function(res){
			if(res.flag){
				WD.ui.alert(res.msg,function(){
					window.location.href = projectPath + '/keywords/hot.htm';
				},3000);
			}
		},"json");
	});
});