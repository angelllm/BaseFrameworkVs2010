/**
 * @author chenfei
 */
var projectPath = $('#project_path').val();
$(function(){
	
	//分类选择
	$('.chooseType').on('click',function(){
		
		$('#operate_date_type').val($(this).attr('data'));
		$('#form1').attr('action',projectPath+'/keywords/list.htm').submit();
		
	});
	
	//搜索
	$('#search_button').on('click',function(){
		
		var startTime = $('#u_startDate').val();
		var endTime = $('#u_endDate').val();
		
		if(startTime && endTime && (new Date(startTime.replace(/-/g,"/")) > new Date(endTime.replace(/-/g,"/")))){
			
			alert('起始时间不能大于终止时间');
		}else{
			
			$('#operate_date_type').val($(this).attr('data'));
			$('#operate_start_time').val(startTime);
			$('#operate_end_time').val(endTime);
			$('#form1').attr('action',projectPath+'/keywords/list.htm').submit();
		}
		
	});
	
})