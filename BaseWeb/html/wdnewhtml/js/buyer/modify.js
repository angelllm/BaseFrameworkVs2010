/**
 * @author chenfei
 */
var projectPath = $('#project_path').val();
var buyerId = $('#opera_buyer_id').val();

$(function(){
	
	//验证镜像
	loadGroup('modify');
	loadItem('modify','password','email','cellphone');
	changeItemValue('modify','password',true);
	changeItemValue('modify','email',true);
	changeItemValue('modify','cellphone',true);
	
	//生成随机密码
	$('#randomPwd').on('click',function(){
		$('input[name="password"]').val(randomString());
		$(this).parent('label').parent().find('label.error').text('');
		changeItemValue('modify','password',true);
	}).on('mouseover',function(){
		//鼠标样式
		$(this).css('cursor',"pointer");
	});
	
	//手动填写密码
	$('input[name="password"]').on('blur',function(){
		var pwd = $(this).val();
		if(WD.regular.pwd.test(pwd)){
			$(this).parent().find('label.error').text('');
			changeItemValue('modify','password',true);
		}else{
			$(this).parent().find('label.error').text('密码格式错误');
			changeItemValue('modify','password',false);
		}
	});
	
	//邮箱验证
	$('input[name="email"]').on('blur',function(){
		var email = $(this).val();
		if(WD.regular.email.test(email)){
			$.post(projectPath+"/seller/checkItem.json?"+new Date().getTime(),{'checkItem':'email','param':email,'id':buyerId},function(res){
				if(res.flag){
					$('input[name="email"]').parent().find('label.error').text('');
					changeItemValue('modify','email',true);
				}else{
					$('input[name="email"]').parent().find('label.error').text('邮箱已经被注册');
					changeItemValue('modify','email',false);
				}
			},"json");
		}else{
			$(this).parent().find('label.error').text('邮箱格式错误');
			changeItemValue('modify','email',false);
		}
	});
	
	//手机验证
	$('input[name="cellphone"]').on('blur',function(){
		var cellphone = $(this).val();
		if(WD.regular.mobile.test(cellphone)){
			$.post(projectPath+"/seller/checkItem.json?"+new Date().getTime(),{'checkItem':'cellphone','param':cellphone,'id':buyerId},function(res){
				if(res.flag){
					$('input[name="cellphone"]').parent().find('label.error').text('');
					changeItemValue('modify','cellphone',true);
				}else{
					$('input[name="cellphone"]').parent().find('label.error').text('手机号码已经被注册');
					changeItemValue('modify','cellphone',false);
				}
			},"json");
		}else{
			$(this).parent().find('label.error').text('手机号码格式错误');
			changeItemValue('modify','cellphone',false);
		}
	});
	
	//获取城市列表
	$('#Province').on('change',function(){
		var provinceId = $(this).val();
		$.post(projectPath+"/location/getCities.json?"+new Date().getTime(),{'provinceId':provinceId},function(res){
			var cityHtml = '';
			for(var i = 0 ; i < res.length ; i++){
				cityHtml += '<option value="'+res[i].id+'">'+res[i].name+'</option>';
			}
			$('select[name="locationId"]').html(cityHtml);
		},"json");
	});
	
	//提交
	$('#subForm').on('click',function(){
    	if(testResult()){
    		$('#form1').attr('action',projectPath+"/buyer/modify.htm").submit();
    	}else{
    		alert('请检查录入信息');
    		return;
    	}
    }).on('mouseover',function(){
		//鼠标样式
		$(this).css('cursor',"pointer");
	});
});

/*@copy baidu*/
function randomString() {
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < 6; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}