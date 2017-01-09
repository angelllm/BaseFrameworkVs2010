function gotoPage(page,totalPage,pageSize){
	var catId=$("#cat_id").val();
	var sortType=$("#id_sortType").val();
	var productName=$("#productName").val();
	var supplierName=$("#supplierName").val();
	if(productName){
		if(sortType){
			window.location.href="special.htm?catId="+catId+"&productName="+productName+"&sortType="+sortType+"&pageNo="+page;
		}else{
			window.location.href="special.htm?catId="+catId+"&productName="+productName+"&pageNo="+page;
		}
	}else if(supplierName){
		if(sortType){
			window.location.href="special.htm?catId="+catId+"&supplierName="+supplierName+"&sortType="+sortType+"&pageNo="+page;
		}else{
			window.location.href="special.htm?catId="+catId+"&supplierName="+supplierName+"&pageNo="+page;
		}
	}else{
		if(sortType){
			window.location.href="special.htm?catId="+catId+"&sortType="+sortType+"&pageNo="+page;
		}else{
			window.location.href="special.htm?catId="+catId+"&pageNo="+page;
		}
	
	}
}
function removeSpecial(productId){
	var adminId=$("input[name=adminId]").val();
	var catId=$("#cat_id").val();
	var sortType=$("#id_sortType").val();
	var productName=$("#productName").val();
	var supplierName=$("#supplierName").val();
	if(productName){
		if(sortType){
			window.location.href="deleteSpecial.htm?catId="+catId+"&productName="+productName+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId;
		}else{
			window.location.href="deleteSpecial.htm?catId="+catId+"&productName="+productName+"&adminId="+adminId+"&productId="+productId;
		}
	}else if(supplierName){
		if(sortType){
			window.location.href="deleteSpecial.htm?catId="+catId+"&supplierName="+supplierName+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId;
		}else{
			window.location.href="deleteSpecial.htm?catId="+catId+"&supplierName="+supplierName+"&adminId="+adminId+"&productId="+productId;
		}
	}else{
		if(sortType){
			window.location.href="deleteSpecial.htm?catId="+catId+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId;
		}else{
			window.location.href="deleteSpecial.htm?catId="+catId+"&adminId="+adminId+"&productId="+productId;
		}
	
	}
}
$(function(){
	$("#btn_productName").click(function(){
		var catId=$("#cat_id").val();
		var productName=$("input[name=product_name]").val();
		if(productName){
			window.location.href="special.htm?catId="+catId+"&productName="+productName;
		}else{
			return;
		}
		
	});
	$("#btn_supplierName").click(function(){
		var catId=$("#cat_id").val();
		var supplierName=$("input[name=supplier_name]").val();
		if(supplierName){
			window.location.href="special.htm?catId="+catId+"&supplierName="+supplierName;
		}else{
			return;
		}
		
	});
	$("#btn_present").click(function(){
		var pageNo=$(this).prev().val();
		var totalPage=$("#pagespan").attr('class');
		var reg=/^[0-9]*$/;
		if(reg.test(pageNo)){
			if(parseInt(pageNo)>=1&&parseInt(pageNo)<=totalPage){
				gotoPage(pageNo,null,null);
			}else{
				return;
			}
		}else{
			return;
		}
		
	});
	$("#id_sales").click(function(){
		var catId=$("#cat_id").val();
		var productName=$("#productName").val();
		var supplierName=$("#supplierName").val();
		if(productName){
			window.location.href="special.htm?catId="+catId+"&productName="+productName+"&sortType=2";
		}else if(supplierName){
			window.location.href="special.htm?catId="+catId+"&supplierName="+supplierName+"&sortType=2";
		}else{
			window.location.href="special.htm?catId="+catId+"&sortType=2";
		}
	});
	$("#id_downloads").click(function(){
		var catId=$("#cat_id").val();
		var productName=$("#productName").val();
		var supplierName=$("#supplierName").val();
		if(productName){
			window.location.href="special.htm?catId="+catId+"&productName="+productName+"&sortType=3";
		}else if(supplierName){
			window.location.href="special.htm?catId="+catId+"&supplierName="+supplierName+"&sortType=3";
		}else{
			window.location.href="special.htm?catId="+catId+"&sortType=3";
		}
	});
	$("#id_startDate").click(function(){
		var catId=$("#cat_id").val();
		var productName=$("#productName").val();
		var supplierName=$("#supplierName").val();
		if(productName){
			window.location.href="special.htm?catId="+catId+"&productName="+productName+"&sortType=7";
		}else if(supplierName){
			window.location.href="special.htm?catId="+catId+"&supplierName="+supplierName+"&sortType=7";
		}else{
			window.location.href="special.htm?catId="+catId+"&sortType=7";
		}
	});
	$("#all_select").click(
			function(){
				if(this.checked){
					$(".cbk").each(function(a){
						$(this).prop("checked",true);
					});
				}else{
					$(".cbk").each(function(a){
						$(this).prop("checked",false);
					});
				}
			}
	
	);
	$("#reverse_select").click(
		function(){
			if(this.checked){
				$(".cbk").each(function(a){
					if(this.checked){
						$(this).prop("checked",false);
					}else{
						$(this).prop("checked",true);
					}
					   
				});
			}else{
				$(".cbk").each(function(a){
					if(this.checked){
						$(this).prop("checked",false);
					}else{
						$(this).prop("checked",true);
					}
					   
				});
			}
		}
);
	$("#btn_button").click(function(){
		var productIds="";
		$(".cbk:checked").each(function(){
				productIds+=$(this).val()+",";
		});	
		if(productIds==""){
			return;
		}else{
			$("input[name=productIds]").val(productIds);
			var supplierName=$("#supplierName").val();
			if(supplierName){
				$("#forms").attr("action","delete_special.htm").submit();
			}else{
				$("#supplierName").removeAttr("name");
				$("#forms").attr("action","delete_special.htm").submit();
			}
		
				
		}
	});
});
