$(function(){
	$(".parent").click(
			function(){
				if(this.checked){
					$(this).parent().next().find("input").each(function(a){
						$(this).prop("checked",true);
					});
				}else{
					$(this).parent().next().find("input").each(function(a){
						$(this).prop("checked",false);
					});
				}
			}
	
	);
	
	$(".children").click(function(){
		if(this.checked){
			$(this).parent().prev().find("input").each(function(a){
				$(this).prop("checked",true);
			});
		}else{
			var arr=$(this).siblings("input");
			if(arr.length==0){
				$(this).parent().prev().find("input").each(function(a){
					$(this).prop("checked",false);
			});
			}
			for(var i=0;i<arr.length;i++){
				if(arr[i].checked){
					break;
				}
				if(i==arr.length-1){
					$(this).parent().prev().find("input").each(function(a){
						$(this).prop("checked",false);
				});
				}
		
			}		
		}			
	});
	
	$("#return").click(function(){
		
		window.location.href="list.htm";
		
	});
	
	$("#send").click(function(){
		var arr=$(".children");
		var arry=$(".parent");
		var value="";
		for(var i=0;i<arr.length;i++){
			if(arr[i].checked){
				value=value+arr[i].value+",";
			}
		}
		for(var i=0;i<arry.length;i++){
			if(arry[i].checked){
				value=value+arry[i].value+",";
			}
		}
		$("#module").val(value);
		if(value){
			$("#form_id").attr("action","addRoleModule.htm").submit();
		}
		
	});
	
});