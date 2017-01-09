function gotoPage(page,totalPage,pageSize){
	$("#pageNo_id").attr('name','pageNo').val(page);
	$("#form_id").attr('action',projectPath+"/adminDeleteProductManage/adminDelete.htm").submit();
	
}

//function down_product(id,s){
//	 $(".model").hide();
//		if(confirm("确定要下架吗?")){
//			$(s).prev("textarea").attr('name','reason').val();
//			$("#productId").attr('name','productId').val(id);
//			$("#form_id").attr('action',projectPath+"/productManage/down_product.htm").submit();
//		}
//}

//function up_product(id){
//	if(confirm("确定要上架吗?")){
//		$("#productId").attr('name','productId').val(id);
//		$("#form_id").attr('action',projectPath+"/adminDeleteProductManage/up_product.htm").submit();
//	}	
//}
//
//function delete_product(id,s){
//	 $(".model").hide();
//	if(confirm("确定要删除吗?")){
//		$(s).prev("textarea").attr('name','reason').val();
//		$("#productId").attr('name','productId').val(id);
//		$("#form_id").attr('action',projectPath+"/adminDeleteProductManage/delete_product.htm").submit();
//	}

//}

var projectPath=$("#projectPath").val();
$(function () {

    // all select 
    $(".ttitle .waper input:checkbox:eq(0)").click(function () {

        $(this).next().next().prop("checked", false);
        $(".item input:checkbox").prop("checked", $(this).prop("checked"))
    });

    $(".ttitle .waper input:checkbox:eq(1)").click(function () {

        $(this).prev().prev().prop("checked", false);
        $(".item input:checkbox").each(function (index, item) {
            $(this).prop("checked", !$(this).prop("checked"));
        });

    });
    
    $("#btn_reset").on('click',function(){
    	$("select[name=catId]").val("0");
    	$("input[name=s]").val("");
    	$("input[name=sn]").val("");
    	$("input[name=supplierName]").val("");
    	$("input[name=minPrice]").val("");
		$("input[name=maxPrice]").val("");
		$("input[name=minCount]").val("");
		$("input[name=maxCount]").val("");
    });
    
    $("#btn_search").on('click',function(){
    	var reg=/^[0-9]*$/;
    	var minPrice=$("input[name=minPrice]").val();
		var maxPrice=$("input[name=maxPrice]").val();
		var minCount=$("input[name=minCount]").val();
		var maxCount=$("input[name=maxCount]").val();
		if(minPrice!=""){
			if(!reg.test(minPrice)){
				alert("价格必须为数字");
				return;
			}
		}
		if(maxPrice!=""){
			if(!reg.test(maxPrice)){
				alert("价格必须为数字");
				return;
			}
		}
		if(minCount!=""){
			if(!reg.test(minCount)){
				alert("销量必须为数字");
				return;
			}
		}
		if(maxCount!=""){
			if(!reg.test(minCount)){
				alert("销量必须为数字");
				return;
			}
		}
    	$("#form_id").attr('action',projectPath+"/adminDeleteProductManage/adminDelete.htm").submit();
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
			}s
		}else{
			return;
		}
		
	});
	
    $(".con-del,.con-down").click(function () {

        $(".model").hide();
        var model = $(this).next(".model");
        model.show().attr("data", 1).find("textarea").focus();

    });
    $(".closetag").click(function () {

        $(".model").hide();
        //$(this).parent().attr("data", 0);
    });

});




 