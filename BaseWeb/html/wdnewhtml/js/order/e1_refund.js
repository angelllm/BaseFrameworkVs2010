/**
 * @author chenfei
 */
var projectPath = $('#project_path').val();
var returnStatus = $('#return_status').val();
var returnType = $('#return_type').val();

$(function(){
	
	//同意
	$('#agree_a').on('click',function(){
		
		if(returnStatus == 3){
			
			if(returnType == 1){
				
				$('#form1').attr('action',projectPath+"/order/refundMoneyStep1.htm").submit();
				
			}else{
				
				$('#form1').attr('action',projectPath+"/order/refundGoodStep1.htm").submit();
				
			}
			
		}else if(returnStatus == 6){
			
			$('#form1').attr('action',projectPath+"/order/refundMoneyStep1.htm").submit();
			
		}
		
	});
	
});