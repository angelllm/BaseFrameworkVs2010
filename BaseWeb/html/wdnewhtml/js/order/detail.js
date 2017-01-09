/**
 * @author chenfei
 * 自动确认收货倒计时
 */
$(function(){
	
	
	if(! $('#out_timestamp').val()){
		//说明整个订单尚未发货
	}else{
		//到期时间
		var outTimestamp = new Date($('#out_timestamp').val());
		
		//平均误差的做法
		window.setInterval(function(){
			
			$('.AutoTime').text(countTime(outTimestamp.getTime() - new Date().getTime()));
			
		},1000);
	}
	
	//计算时间 @dis long
	function countTime(dis){
		return Math.floor(dis/86400000)+'天'+Math.floor(dis%86400000/3600000)+'小时'+
				Math.floor(dis%3600000/60000)+'分钟'+Math.floor(dis%60000/1000)+'秒后打款给卖家';
	}
});