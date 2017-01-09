function gotoPage(page,totalPage,pageSize){
	var catId=$("#cat_id").val();
	var sortType=$("#id_sortType").val();
	var productName=$("#productName").val();
	var supplierName=$("#supplierName").val();
	var is_wmwd_r=$("#isWmwd_r").val();
	if(productName){
		if(sortType){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&productName="+productName+"&sortType="+sortType+"&is_wmwd_r="+is_wmwd_r+"&pageNo="+page;
		}else{
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&productName="+productName+"&is_wmwd_r="+is_wmwd_r+"&pageNo="+page;
		}
	}else if(supplierName){
		if(sortType){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&supplierName="+supplierName+"&sortType="+sortType+"&is_wmwd_r="+is_wmwd_r+"&pageNo="+page;
		}else{
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&supplierName="+supplierName+"&is_wmwd_r="+is_wmwd_r+"&pageNo="+page;
		}
	}else{
		if(sortType){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&sortType="+sortType+"&is_wmwd_r="+is_wmwd_r+"&pageNo="+page;
		}else{
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&is_wmwd_r="+is_wmwd_r+"&pageNo="+page;
		}
	
	}
}
function insertGoods(productId){
	var adminId=$("input[name=adminId]").val();
	var catId=$("#cat_id").val();
	var sortType=$("#id_sortType").val();
	var productName=$("#productName").val();
	var supplierName=$("#supplierName").val();
	var is_wmwd_r=$("#isWmwd_r").val();
	if(productName){
		if(sortType){
			window.location.href="insertGoods.htm?catId="+catId+"&productName="+productName+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}else{
			window.location.href="insertGoods.htm?catId="+catId+"&productName="+productName+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}
	}else if(supplierName){
		if(sortType){
			window.location.href="insertGoods.htm?catId="+catId+"&supplierName="+supplierName+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}else{
			window.location.href="insertGoods.htm?catId="+catId+"&supplierName="+supplierName+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}
	}else{
		if(sortType){
			window.location.href="insertGoods.htm?catId="+catId+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}else{
			window.location.href="insertGoods.htm?catId="+catId+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}
	
	}
}
function removeGoods(productId){
	var adminId=$("input[name=adminId]").val();
	var catId=$("#cat_id").val();
	var sortType=$("#id_sortType").val();
	var productName=$("#productName").val();
	var supplierName=$("#supplierName").val();
	var is_wmwd_r=$("#isWmwd_r").val();
	if(productName){
		if(sortType){
			window.location.href="deleteGoods.htm?catId="+catId+"&productName="+productName+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}else{
			window.location.href="deleteGoods.htm?catId="+catId+"&productName="+productName+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}
	}else if(supplierName){
		if(sortType){
			window.location.href="deleteGoods.htm?catId="+catId+"&supplierName="+supplierName+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}else{
			window.location.href="deleteGoods.htm?catId="+catId+"&supplierName="+supplierName+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}
	}else{
		if(sortType){
			window.location.href="deleteGoods.htm?catId="+catId+"&sortType="+sortType+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}else{
			window.location.href="deleteGoods.htm?catId="+catId+"&adminId="+adminId+"&productId="+productId+"&is_wmwd_r="+is_wmwd_r;
		}
	
	}
}
$(function(){
	$("#btn_productName").click(function(){
		var catId=$("#cat_id").val();
		var productName=$("input[name=product_name]").val();
		var is_wmwd_r=$("#isWmwd_r").val();
		if(productName){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&productName="+productName+"&is_wmwd_r="+is_wmwd_r;
		}else{
			return;
		}
		
	});
	$("#btn_supplierName").click(function(){
		var catId=$("#cat_id").val();
		var supplierName=$("input[name=supplier_name]").val();
		var is_wmwd_r=$("#isWmwd_r").val();
		if(supplierName){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&supplierName="+supplierName+"&is_wmwd_r="+is_wmwd_r;
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
		var is_wmwd_r=$("#isWmwd_r").val();
		if(productName){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&productName="+productName+"&sortType=2"+"&is_wmwd_r="+is_wmwd_r;
		}else if(supplierName){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&supplierName="+supplierName+"&sortType=2"+"&is_wmwd_r="+is_wmwd_r;
		}else{
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&sortType=2"+"&is_wmwd_r="+is_wmwd_r;
		}
	});
	$("#id_downloads").click(function(){
		var catId=$("#cat_id").val();
		var productName=$("#productName").val();
		var supplierName=$("#supplierName").val();
		var is_wmwd_r=$("#isWmwd_r").val();
		if(productName){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&productName="+productName+"&sortType=3"+"&is_wmwd_r="+is_wmwd_r;
		}else if(supplierName){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&supplierName="+supplierName+"&sortType=3"+"&is_wmwd_r="+is_wmwd_r;
		}else{
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&sortType=3"+"&is_wmwd_r="+is_wmwd_r;
		}
	});
	$("#id_startDate").click(function(){
		var catId=$("#cat_id").val();
		var productName=$("#productName").val();
		var supplierName=$("#supplierName").val();
		var is_wmwd_r=$("#isWmwd_r").val();
		if(productName){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&productName="+productName+"&sortType=7"+"&is_wmwd_r="+is_wmwd_r;
		}else if(supplierName){
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&supplierName="+supplierName+"&sortType=7"+"&is_wmwd_r="+is_wmwd_r;
		}else{
			window.location.href="foreignTradeGoods.htm?catId="+catId+"&sortType=7"+"&is_wmwd_r="+is_wmwd_r;
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
		var value=$("#select_id").val();
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
				if(value==1){
					$("#forms").attr("action","insert_goods.htm").submit();
				}
				if(value==2){
					$("#forms").attr("action","delete_goods.htm").submit();
				}
			}else{
				$("#supplierName").removeAttr("name");
				if(value==1){
					$("#forms").attr("action","insert_goods.htm").submit();
				}
				if(value==2){
					$("#forms").attr("action","delete_goods.htm").submit();
				}
			
			}
				}
	});
});
