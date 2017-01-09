function gotoPage(page,totalPage,pageSize){
	var catId=$("#cat_id").val();
	var sortType=$("#id_sortType").val();
	var productName=$("#productName").val();
	var supplierName=$("#supplierName").val();
	if(productName){
		if(sortType){
			window.location.href="freeZipList.htm?catId="+catId+"&productName="+productName+"&sortType="+sortType+"&pageNo="+page;
		}else{
			window.location.href="freeZipList.htm?catId="+catId+"&productName="+productName+"&pageNo="+page;
		}
	}else if(supplierName){
		if(sortType){
			window.location.href="freeZipList.htm?catId="+catId+"&supplierName="+supplierName+"&sortType="+sortType+"&pageNo="+page;
		}else{
			window.location.href="freeZipList.htm?catId="+catId+"&supplierName="+supplierName+"&pageNo="+page;
		}
	}else{
		if(sortType){
			window.location.href="freeZipList.htm?catId="+catId+"&sortType="+sortType+"&pageNo="+page;
		}else{
			window.location.href="freeZipList.htm?catId="+catId+"&pageNo="+page;
		}
	
	}
}
function addfreeZip(productId){
	var adminId=$("input[name=adminId]").val();
	var catId=$("#cat_id").val();
	var sortType=$("#id_sortType").val();
	var productName=$("#productName").val();
	var supplierName=$("#supplierName").val();
	if(productName){
		if(sortType){
			window.location.href="insertfreeZip.htm?catId="+catId+"&productName="+productName+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId;
		}else{
			window.location.href="insertfreeZip.htm?catId="+catId+"&productName="+productName+"&adminId="+adminId+"&productId="+productId;
		}
	}else if(supplierName){
		if(sortType){
			window.location.href="insertfreeZip.htm?catId="+catId+"&supplierName="+supplierName+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId;
		}else{
			window.location.href="insertfreeZip.htm?catId="+catId+"&supplierName="+supplierName+"&adminId="+adminId+"&productId="+productId;
		}
	}else{
		if(sortType){
			window.location.href="insertfreeZip.htm?catId="+catId+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId;
		}else{
			window.location.href="insertfreeZip.htm?catId="+catId+"&adminId="+adminId+"&productId="+productId;
		}
	
	}
}
$(function(){
	$('.CardFreight li').click(function(){
		var index = $(this).index()
		if(index == 0){
			window.location.href="freeZipList.htm";
		}
		if(index == 1){
			window.location.href="freeZip.htm";
		}
	
	});
	$('.AddCategoryUl li').click(function(){
		window.location.href="freeZipList.htm?catId="+$(this).val();
	});
	$("#btn_productName").click(function(){
		var catId=$("#cat_id").val();
		var productName=$("input[name=product_name]").val();
		if(productName){
			window.location.href="freeZipList.htm?catId="+catId+"&productName="+productName;
		}else{
			return;
		}
		
	});
	$("#btn_supplierName").click(function(){
		var catId=$("#cat_id").val();
		var supplierName=$("input[name=supplier_name]").val();
		if(supplierName){
			window.location.href="freeZipList.htm?catId="+catId+"&supplierName="+supplierName;
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
			window.location.href="freeZipList.htm?catId="+catId+"&productName="+productName+"&sortType=2";
		}else if(supplierName){
			window.location.href="freeZipList.htm?catId="+catId+"&supplierName="+supplierName+"&sortType=2";
		}else{
			window.location.href="freeZipList.htm?catId="+catId+"&sortType=2";
		}
	});
	$("#id_downloads").click(function(){
		var catId=$("#cat_id").val();
		var productName=$("#productName").val();
		var supplierName=$("#supplierName").val();
		if(productName){
			window.location.href="freeZipList.htm?catId="+catId+"&productName="+productName+"&sortType=3";
		}else if(supplierName){
			window.location.href="freeZipList.htm?catId="+catId+"&supplierName="+supplierName+"&sortType=3";
		}else{
			window.location.href="freeZipList.htm?catId="+catId+"&sortType=3";
		}
	});
	$("#id_startDate").click(function(){
		var catId=$("#cat_id").val();
		var productName=$("#productName").val();
		var supplierName=$("#supplierName").val();
		if(productName){
			window.location.href="freeZipList.htm?catId="+catId+"&productName="+productName+"&sortType=7";
		}else if(supplierName){
			window.location.href="freeZipList.htm?catId="+catId+"&supplierName="+supplierName+"&sortType=7";
		}else{
			window.location.href="freeZipList.htm?catId="+catId+"&sortType=7";
		}
	});
	$("#all_select").click(
			function(){
				if(this.checked){
					$(".productSelect").each(function(a){
						$(this).prop("checked",true);
					});
				}else{
					$(".productSelect").each(function(a){
						$(this).prop("checked",false);
					});
				}
			}
	
	);
	$("#all_selects").click(
		function(){
			if(this.checked){
				$(".productselect").each(function(a){
					$(this).prop("checked",true);
				});
			}else{
				$(".productselect").each(function(a){
					$(this).prop("checked",false);
				});
			}
		}

);
	$("#reverse_selects").click(
		function(){
			if(this.checked){
				$(".productselect").each(function(a){
					if(this.checked){
						$(this).prop("checked",false);
					}else{
						$(this).prop("checked",true);
					}
					   
				});
			}else{
				$(".productselect").each(function(a){
					if(this.checked){
						$(this).prop("checked",false);
					}else{
						$(this).prop("checked",true);
					}
					   
				});
			}
		}

);
	$("#reverse_select").click(
		function(){
			if(this.checked){
				$(".productSelect").each(function(a){
					if(this.checked){
						$(this).prop("checked",false);
					}else{
						$(this).prop("checked",true);
					}
					   
				});
			}else{
				$(".productSelect").each(function(a){
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
		$(".productselect:checked").each(function(){
				productIds+=$(this).val()+",";
		});	
		if(productIds==""){
			return;
		}else{
			$("input[name=productIds]").val(productIds);
			var supplierName=$("#supplierName").val();
			if(supplierName){
				$("#forms").attr("action","insertfreeZips.htm").submit();
			}else{
				$("#supplierName").removeAttr("name");
				$("#forms").attr("action","insertfreeZips.htm").submit();
			}
		
				
		}
	});
	$("#btn_buttons").click(function(){
		var productIds="";
		$(".productselect:checked").each(function(){
				productIds+=$(this).val()+",";
		});	
		if(productIds==""){
			return;
		}else{
			$("input[name=productIds]").val(productIds);
			$("#forms").attr("action","delete_freeZip.htm").submit();
				
		}
	});
});
