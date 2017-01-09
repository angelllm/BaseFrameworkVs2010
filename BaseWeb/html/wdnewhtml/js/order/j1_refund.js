/**
 * @author chenfei
 */
$(function(){
	
	var projectPath = $('#project_path').val();
	var supplierPath = $('#supplier_path').val();
	var deliverType = $('#deliver_type').val();
	var returnType = $('#return_type').val();
	
	//同意
	$('#agree_button').on('click',function(){
		if(returnType == 1 || deliverType == 1){
			var $this = $(this);
			//只退款 或者 未发货
			$.ajax({
				type : "post",
				url : projectPath+'/order/refundMoneyStep1.json?'+new Date().getTime(),
				data : {'detailId':$('#detail_id').val(),
					'returnMoney':$('#return_money').val(),
					'returnPostage':$('#return_postage').val()},
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
		}else if(returnType == 2 ){
			//退货 已发货
			$('#form1').attr('action',projectPath+'/order/refundGoodStep1.htm').submit();
		}
	});
	
	//拒绝
	$('#refuse_button').on('click',function(){
		//未发货
		if(deliverType == 1){
			var r = window.confirm('确定拒绝该退款申请');
			var id = $('input[name="id"]').val();
			if( r ){
				$.post(projectPath+"/order/refundRefuse.json?"+new Date().getTime(),{'id':id},function(res){
					if(res.flag){
						alert(res.msg);
						//未发货直接关闭，刷新列表页面进行发货
						window.close();
					}else{
						alert(res.msg);
					}
				},"json");
			}
		//已发货
		}else if(deliverType == 2){
			$('#form1').attr('action',projectPath+'/order/refundRefuseStep1.htm').submit();
		}
		
	});
});
