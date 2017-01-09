function gotoPage(page) {
	window.location.href = "newsList.htm?pageNo=" + page;
}
$(function() {
	var profilePath = $("#pro_path").val();
	$(".deleteNew").each(function(index, obj) {
		$(this).on("click", function() {
			var tempId = $(this).attr("id");
			if (confirm("确定删除吗")) {
				$.post("deleteNew.json?", {
					"id" : tempId
				}, function(res) {
					if (res.msg == "ok") {
						location.href = profilePath + "/news/newsList.htm";
					}
				}, "json");
			} else {
				return;
			}
		});
	});

	$(".modifyNew").each(
			function(index, obj) {
				$(this).on(
						"click",
						function() {
							var tempId = $(this).attr("id");
							location.href = profilePath
									+ "/news/newsEdit.htm?newsId=" + tempId;
						});
			});

	// 全选和全不选
	$("#allSelect").click(function() {
		if ($(this).is(":checked")) {
			$("input[name='subCheck']").prop('checked', true);
		}
		if (!$(this).is(":checked")) {
			$("input[name='subCheck']").prop('checked', false);
		}
	});

	$("#allNotSelect").click(function() {
		$("input[name='subCheck']").each(function() {
			$(this).prop("checked", !$(this).prop("checked"));
		});
		// 反选的第二种方式
		// $("input[name='subCheck']").each(function(){
		// if($(this).is(":checked")){
		// $(this).prop('checked',false);
		// }else{
		// $(this).prop('checked',true);
		// }
		// });
	});
	$("#submit").click(
			function() {
				var selectValue = $("#allfunc").val();
				var str = "";
				$("input[name='subCheck']").each(function() {
					if ($(this).is(":checked")) {
						str = str + $(this).attr("id") + ",";
					}
				});
				if (selectValue == 2) {
					$.post("flagTop.json?", {
						"ids" : str
					}, function(res) {
						if (res.msg == "ok") {
							window.location.href = profilePath
									+ "/news/newsList.htm";
						}
						if (res.msg == "fail") {
							alert("置顶失败");
						}
					}, "json");
				}
				if (selectValue == 1) {
					if (confirm("确认删除吗？")) {
						$.post("deleteSome.json?", {
							"ids" : str
						}, function(res) {
							if (res.msg == "ok") {
								window.location.href = profilePath
										+ "/news/newsList.htm";
							}
							if (res.msg == "fail") {
								alert("删除失败");
							}
						}, "json");
					} else {
						return;
					}
				}
			});

	$(".toTop").each(function() {
		$(this).on("click", function() {
			var id = $(this).attr("id");
			$(this).addClass("deleteNew");
			$.post("moveToTop.json?", {
				"id" : id
			}, function(res) {
				if(res.msg=="ok"){
					window.location.href = profilePath + "/news/newsList.htm";
				}
				if(res.msg=="fail"){
					alert("置顶失败");
				}
			}, "json");
		})
	});
	$(".moveUp").each(function() {
		$(this).on("click", function() {
			//上一个元素
			var newsPrevId=$(this).parent("td").parent("tr").prev("tr").children(".newsClass").attr("id");
			var currentId=$(this).attr("id");
		    //alert(currentId+"=="+newsPrevId)
			if(newsPrevId==null){
				alert("不能继续上移");
			}else{
				$.post("prevNews.json", {"currentId":currentId,"newsPrevId":newsPrevId}, function(res) {
					if(res.msg=="ok"){
						window.location.href=profilePath + "/news/newsList.htm";
					}
					if(res.msg=="fail"){
						alert("上移失败");
					}
				}, "json");
				
			}
		})
	});
	$(".moveDown").each(function() {
		$(this).on("click", function() {
			var newsNextId=$(this).parent("td").parent("tr").next("tr").children(".newsClass").attr("id");
			var currentId=$(this).attr("id");
			if(newsNextId==null){
				alert("不能继续下移");
			}else{
				$.post("nextNews.json?", {"currentId":currentId,"newsNextId":newsNextId}, function(res) {
					if(res.msg=="ok"){
						window.location.href=profilePath + "/news/newsList.htm";
					}
					if(res.msg=="fail"){
						alert("下移失败");
					}
				}, "json");
			}
		})
	});
});