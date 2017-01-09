	$(function(){
		$("#send").click(function(){
				var h="";
			$("input:checked").each(function(i,a){
                            //alert(a.value);
                              h+=a.value+',';  //拼接字符串
		                                              });
				$("input:hidden").val(h);
				var title=$("#title_id").val();
				if(title==""){
					if(confirm("您没有写标题确定要发送?")){
						$("#form_id").attr('action','sendEmail.htm').submit();
					}
				}else{
					$("#form_id").attr('action','sendEmail.htm').submit();
				}
		        
		});
	
	});
