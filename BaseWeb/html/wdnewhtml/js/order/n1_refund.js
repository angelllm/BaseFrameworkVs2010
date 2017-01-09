/**
 * @author chenfei
 */

$(function(){
	var projectPath = $('#project_path').val();
	var supplierPath = $('#supplier_path').val();
	//同意
	$('#agree_button').on('click',function(){
		var $this = $(this);
		$.ajax({
			type : "post",
			url : projectPath+'/order/refundMoneyStep1.json?'+new Date().getTime(),
			data : {'detailId':$('#detail_id').val(),
				'returnMoney':$('#return_money').val(),
				'returnPostage':$('#return_postage').val(),
				'reasonType' : $('input[name="reasonType"]:checked').val()},
			dataType : "json",
			beforeSend : function(){
				$this.attr('disabled',true);
			},
			success : function(res){
				if (res.flag) {
					window.location.href = supplierPath+'/payment/alipayRefund.htm?refund_date='+
												res.params.refund_date+
												'&batch_no='+res.params.batch_no+
												'&batch_num='+res.params.batch_num+
												'&detail_data='+res.params.detail_data;
				} else if (res.msg == 403) {
					alert("金额发生变化，请重新操作");
				} else if (res.msg == 404) {
					alert("没有找到退单记录");
				} else if (res.msg == 500) {
					alert("退单状态不正确");
				}
			},
			complete : function(){
				$this.attr('disabled',false);
			}
		});
	});
	
	$('#refuse_button').on('click',function(){
		$('#form1').attr('action',projectPath+"/order/refundRefuseStep1.htm").submit();
	});
});