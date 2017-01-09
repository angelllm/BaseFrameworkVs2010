	var project_path=$("#project_path").val();
	var supplier_path=$("#supplier_path").val();
$(function(){
	// 刷新验证码
	$("#v_code_img").click(function(){
		$(this).attr("src", project_path+"/accounting/captcha.htm?_t"+new Date().getTime());
	});
	
	//执行查询
	$("#getSearch").click(function(){
		var userName=$("#userName").val();
		if(userName==""){
			alert("请填写搜索用户名");
			return;
		}
		window.location.href=project_path+"/accounting/optionGetData.htm?userName="+userName;
	});
	//重置
	$("#clearData").click(function(){
		$("#userName").val("");
	});
	//增加删除积分
	$("#commit").click(function(){
		var userName=$("#userName").val();
		var optionId=$("#option").val();
		var markNum=$("#markNum").val();
		var v_code=$("#v_code").val();
		if(userName==""){
			alert("请填写用户名");
			return;
		}
		if(markNum==""){
			alert("请填写操作积分数");
			return;
		}
		if(isNaN(markNum)){
			alert("积分数请填写数字");
			return;
		}
		if(v_code==""){
			alert("请填写验证码");
			return;
		}
		$.get(project_path+"/accounting/getCheck.json",{"userName":userName,"v_code":v_code},function(res){
			if(res.person=="notExist"){
				//用户存在，进行积分操作
				alert("用户不存在");
				$("#v_code_img").click();
				return;
			}
			if(res.flagCheckNo=="false"){
				alert("验证码错误");
				$("#v_code_img").click();
				return;
			}
			if(res.person=="exist"&&res.flagCheckNo=="true"){
				$.get(project_path+"/accounting/option.json",{"userName":userName,"optionId":optionId,"markNum":markNum},function(res){
					if(res=="success"){
						window.location.href=project_path+"/accounting/optionGetData.htm?userName="+userName;
					}
				},"json");
			}
		},"json");
	});
	//订单详情
	//跳转到订单详情
	$(".jump").click(function(){
		var orderId=$(this).attr("id");
		$.getJSON(project_path+"/accounting/toOrder.json",{"orderSn":orderId},function(data){
			if(data=="noOrder"){
				alert("没有找到订单号");
				return;
			}
			window.location.href= supplier_path+"/buyer/orderDetail.htm?id="+data;
		});
	});
})

function gotoPage(pageNo){
	var userName=$("#userName").val();
	window.location.href=project_path+"/accounting/optionGetData.htm?userName="+userName+"&pageNo="+pageNo;
}