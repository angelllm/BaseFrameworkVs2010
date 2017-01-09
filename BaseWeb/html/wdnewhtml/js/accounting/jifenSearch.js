    var project_path=$("#project_path").val();
	var supplier_path=$("#supplier_path").val();
$(function(){
	$("#getSearch").click(function(){
		var userName=$("#userName").val();
		var orderId=$("#orderId").val();
		var start=$("#start").val();
		var end=$("#end").val();
		if(userName=="" && orderId==""){
			alert("用户名和订单号至少填一项");
			return;
		}
		if(start>end){
			alert("开始时间不能大于结束时间");
			return;
		}
		window.location.href=project_path+"/accounting/getSearch.htm?username="+userName+"&orderid="+orderId+"&start="+start+"&end="+end;
	});
	
	$("#clearData").click(function(){
		$("#userName").val("");
		$("#orderId").val("");
		$("#start").val("");
		$("#end").val("");
		window.location.href=project_path+"/accounting/jifen.htm"
	});
	
	//跳转到订单详情
	$(".jump").click(function(){
		var orderId=$(this).attr("id");
		$.getJSON(project_path+"/accounting/toOrder.json",{"orderSn":orderId},function(data){
			if(data=="noOrder"){
				alert("没有找到订单");
				return;
			}
			window.location.href= supplier_path+"/buyer/orderDetail.htm?id="+data;
		});
	});
	
	//积分操作
	$(".jfred").click(function(){
		var userId=$(this).attr("id");
		if(confirm("确定冻结该用户积分吗?")){
			$.get(project_path+"/accounting/jfOption.json",{"userId":userId,"status":1},function(res){
				if(res=="success"){
					history.go(0);
				}
			},"json");
		}
	});
	
	$(".jfgreen").click(function(){
		var userId=$(this).attr("id");
		if(confirm("确定解冻该用户积分吗?")){
			$.get(project_path+"/accounting/jfOption.json",{"userId":userId,"status":2},function(res){
				if(res=="success"){
					history.go(0);
				}
			},"json");
		}
	});
});

function gotoPage(pageNo){
	var userName=$("#userName").val();
	var orderId=$("#orderId").val();
	var start=$("#start").val();
	var end=$("#end").val();
	window.location.href=project_path+"/accounting/getSearch.htm?username="+userName+"&orderid="+orderId+"&start="+start+"&end="+end+"&pageNo="+pageNo;
}