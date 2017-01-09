/**
 * @author chenfei
 */
var projectPath = $('#project_path').val();

$(function(){
	$('#agree_button').on('click',function(){
		var pwd = $('#password').val();
		var id = $('#operate_id').val();
		var productMoney = $('#operate_product').val();
		var postageMoney = $('#operate_postage').val();
		var remark = $('#remark').val();
		
		if(WD.regular.pwd.test(pwd)){
			$.post(projectPath+"/order/refundMoneyStep2.json?"+new Date().getTime(),{'password':pwd,'id':id,'productMoney':productMoney,'postageMoney':postageMoney,'remark':remark},function(res){
				if(res.flag){
					alert(res.msg);
					$('#form1').attr('action',projectPath+'/order/refundMoneyStep3.htm').submit();
				}else{
					alert(res.msg);
				}
			},"json");
		}else{
			alert("请输入正确格式的密码");
		}
	});
});
