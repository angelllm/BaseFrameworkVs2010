/**
 * @author chenfei
 */
var projectPath = $('#project_path').val();

$(function(){
	
	$('#agree_button').on('click',function(){
		var id = $('#operate_id').val();
		var remark = $('textarea[name="remark"]').val();
		
		if(! remark){
			alert('请填写留言');
		}else{
			$.post(projectPath+'/order/refundGoodStep2.json?'+new Date().getTime(),{'id':id,'remark':remark},function(res){
				if(res.flag){
					alert(res.msg);
					$('#form1').attr('action',projectPath+'/order/refundGoodStep3.htm').submit();
				}else{
					alert(res.msg);
				}
				
			},"json");
		}
	});
	
});