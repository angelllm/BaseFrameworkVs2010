$(function(){
	
$("#return").click(function(){
		
		window.location.href="list.htm";
		
	});

$(".class2").click(function(){
	var class1Object=$(this).parent().prev().find("input");
	if(class1Object[0].checked){
		$(this).prop("checked",true);
	}else{
		var classObject=$(".class1");
		for(var i=0;i<classObject.length;i++){
			if(classObject[i].checked){
				var object=$(classObject[i]).parent().next().find("input");
				$(object[0]).prop("checked",true);
				break;
			}
		}
	}
});

$(".class1").click(function(){
	if(this.checked){
		
	}else{
		var object=$(this).parent().next().find("input");
		$(object[0]).prop("checked",false);
		var objectSplings=$(".class1");
		for(var i=0;i<objectSplings.length;i++){
			if(objectSplings[i].checked){
				var object=$(objectSplings[i]).parent().next().find("input");
				$(object[0]).prop("checked",true);
				break;
			}
		}
	}
});
	

$("#send").click(function(){
	var arr=$(".class1");
	var arry=$(".class2");
	var value="";
	for(var i=0;i<arr.length;i++){
		if(arr[i].checked){
			value=value+arr[i].value+",";
		}
	}	
	if(value){
		for(var i=0;i<arry.length;i++){
			if(arry[i].checked){
				$("#defaultFlag").val(arry[i].value);
				break;
			}
			if(i==arry.length-1){
				alert("请选择默认角色");
				return;
			}
			
		}
		$("#roleIds").val(value);
		$("#form_id").attr("action","addAdminRole.htm").submit();
	}else{
		alert("请选择角色");
		return;
	}
	
});

});