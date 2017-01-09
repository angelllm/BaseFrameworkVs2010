function gotoPage(page){
		window.location.href="newsType.htm?pageNo="+page;
}
$(function() {
	var pro_path = $("#newsType").val();
	$("#addItem").click(
			function() {
				// alert(pro_path);
				var flagName = true;
				var flagNum = true;
				var itemName = $("#itemName").val();
				var sortNum = $("#sortNum").val();
				// alert(itemName+"====="+sortNum);
				if (itemName == "") {
					flagName = false;
					$("#itemName").next("span").text("名称为空");
					$("#itemName").focus();
					return;
				}
				if (itemName.length > 20) {
					flagName = false;
					$("#itemName").next("span").text("名称过长");
					$("#itemName").focus();
					return;
				}
				if (sortNum == "") {
					flagNum = false;
					// alert("22");
					$("#sortNum").focus();
					$("#sortNum").next("span").Text("排序不能为空");
					return;
				}
				if (isNaN(sortNum)) {
					flagNum = false;
					$("#sortNum").focus();
					$("#sortNum").val("");
					$("#sortNum").next("span").text("输入数字");
					return;
				}
				if (flagName == true) {
					$.post("checkItemExist.json?", {
						"itemName" : itemName
					}, function(res) {
						if (res.flag == "true") {
							$("#itemName").next("span").text("类目名称可用");
							$("#sortNum").focus();
						}
						if (res.flag == "false") {
							flagName = false;
							$("#itemName").next("span").text("名称已被占用");
							$("#itemName").focus();
							$("#itemName").val("");
							// alert("aaa"+flagName);
							return;
						}
						if (flagName == true && flagNum == true) {
							// alert(flagName+"==="+flagNum);
							$.post("addItem.json?", {
								"itemName" : itemName,
								"sortNum" : sortNum
							}, function(res) {
								if (res.flag == "true") {
									// alert(flagName+"==="+flagNum);
									window.location.href = pro_path + "/news/"
											+ "newsType.htm";
								} else {
									alert("添加失败");
								}
							}, "json");
						}
					}, "json");
				}

			});
	// 修改或者删除的请求
	/*
	 * 列表中根据id修改
	 */
	$(".newsitem").each(function(index, obj) {
		$(this).on("click", function() {
			var idInfo = $(this).attr("id");
			var itemNameId = "itemName" + "_" + idInfo;
			var sortNumId = "sortNum" + "_" + idInfo;
			// alert(sortNumId);
			var itemName2 = $("#" + itemNameId).val();// 获得对应的内容
			var sortNum2 = $("#" + sortNumId).val();
			var flagName2 = true;
			var flagNum2 = true;
			
			
			//sort验证
			if (sortNum2 == "") {
				 flagNum2 = false;
				 $("#" + sortNumId).next("span").text( "排序不能为空");
				 $("#" + sortNumId).focus();
				 return;
			 } else {
				 if (isNaN(sortNum2)) {
					 flagNum2 = false;
					 $("#" + sortNumId).next("span").text("请输入数字");
					 $("#" + sortNumId).focus();
					 return;
				 }else{
					 flagNum2 = true;
				 }
			 }
			//名称验证
			if(itemName2==""){
				flagName2 = false;
//				// alert("tt")
//				// $("#"+itemNameId).after("");
				$("#" + itemNameId).next("span").text("名称不能为空");
				$("#" + itemNameId).focus();
				return;
			}else{
				if (itemName2.length >= 20){
					flagName2 = false;
					$("#" + itemNameId).next("span").text("名称不能超过20字符");
					$("#" + itemNameId).focus();
					$("#" + itemNameId).val("");
					return;
				}else{
					$.post("checkItemExist.json?", {"itemName" : itemName2}, function(res) {
						if (res.flag == "true") {
							//alert("tttttt"+flagName2);
							flagName2 = true;
						}
						if (res.flag == "false") {
							flagName2 = false;
							$("#" + itemNameId).next("span").text("名称已存在");
							//alert("ccc"+flagName2);
							$("#" + itemNameId).focus();
							$("#" + itemNameId).val("");
							//alert("名称存在");
							return;
						}
						//提交更新
						if (flagNum2 == true && flagName2 == true) {
							 $.post("updateCategory.json?", {"categoryId" : idInfo,"itemName" : itemName2,"sortNum" : sortNum2 }, function(res) {
							 //  alert(res.flag);
								 if (res.flag == "true") {
									 window.location.href = pro_path + "/news/newsType.htm"
									 alert("更新成功");
								 }
								 if (res.flag == "false") {
									 //window.location.href = pro_path + "/news/newsType.htm"
									 alert("更新失败");
								 }
							 }, "json");
						}
					}, "json");
				}
			}
		});
	});

			
	
	$(".toTypeList").on("click",function(){
		window.close();
		window.location.href=pro_path+"/news/newsType.htm";
	});

	

	// 删除功能
//	$(".newsdelete").each(
//			function(index, obj) {
//				$(this).on(
//						"click",
//						function() {
//							// alert($(this).attr("id"));
//							var tempFlag = true;
//							var idInfo = $(this).attr("id");
//							$.get("checkNewsExist.json", {
//								"categoryId" : idInfo
//							}, function(res) {
//								if (res.msg == "ok") {
//									$.post("deleteCategory.json?", {
//										"categoryId" : idInfo
//									}, function(res) {
//										if (res.msg == "delete") {
//											alert("删除成功");
//											window.location.href = pro_path
//													+ "/news/newsType.htm";
//										}
//										if (res.msg == "notDelete") {
//											alert("不能删除");
//										}
//									}, "json");
//								}
//								if (res.msg == "fail") {
//									alert("ccc");
//									$("#infoTips").css({
//										display : "block"
//									});
//									$("#infoTips").show();
//									return;
//								}
//							}, "json");
//
//						})
//			});
	
			
			
			
	
	
	
	
	
	$(".newsdelete").click(function(){
		var tempFlag = true;
		var idInfo = $(this).attr("id");
		var $this = $(this);
		$.get("checkNewsExist.json", {
			"categoryId" : idInfo
		}, function(res) {
			if (res.msg == "ok") {
				$.post("deleteCategory.json?", {
					"categoryId" : idInfo
				}, function(res) {
					if (res.msg == "delete") {
						alert("删除成功");
						window.location.href = pro_path
								+ "/news/newsType.htm";
					}
					if (res.msg == "notDelete") {
						alert("没有删除");
					}
				}, "json");
			}
			if (res.msg == "fail") {
				$(".news").find(".content").hide();
				$this.parent().find(".content").show();
			}
		}, "json");
	});		
			
	
	
	
	
	
//			$(".newsdelete").click(function(){
//				var tempFlag = true;
//				var idInfo = $(this).attr("id");
//				var $this = $(this);
//				$.get("checkNewsExist.json", {
//					"categoryId" : idInfo
//					}, function(res) {
//						if(res.msg=="ok"){
//							
//						}
//						if(res.msg=="fail"){
//							$(".news").find(".content").hide();
//							$this.parent().find(".content").show();
//						}
//					});
//			});
		
			
//			$(".newsdelete").click(function(){
//				var $this = $(this);
//				$(".news").find(".content").hide();
//				$this.parent().find(".content").show();
//			});
//			

			
			$(".closeWindow").click(function() {
				$(this).parent().hide();
			});
			
			

	$("#closeDiv").click(function() {
		$("#infoTips").css({
			display : "none"
		});
		$("#infoTips").hide();
	});
});