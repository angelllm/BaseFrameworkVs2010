$(function() {
	if ($("#isUrl").is(":checked")) {
		$("#urlContentc").css({
			display : "block"
		});
		$("#urlContentc").show();
		$("#urlContentc").focus();
	}
	if (!$("#isUrl").is(":checked")) {
		$("#urlContentc").css({
			display : "none"
		});
	}
	
	var titleFlag = true;
	var keyWordFlag = true;
	var urlFlag = true;
	var contentFlag = true;
	var pro_path = $("#project_path").val();
	var newsId = $("#newsId").val();
	var editor = UE.getEditor('desc');
	$("#title").focus();
	$("#title").blur(function() {
		var title = $("#title").val();
		if (title == "") {
			titleFlag = false;
			$("#title").focus();
			$("#title").parent("div").next("span").text("标题不能为空");
			return;
		}
		if (title.length >= 15) {
			titleFlag = false;
			$("#title").focus();
			$("#title").parent("div").next("span").text("标题过长");
			return;
		} else {
			titleFlag = true;
			$("#keyWord").focus();
			$("#title").parent("div").next("span").text("标题可用");
		}
	});
	
	$("#toNewsManage").click(function(){
		window.location.href=pro_path+"/news/newsList.htm";
	});
	
	$("#keyWord").blur(
			function() {
				// 去掉空格
				var keyWord = $("#keyWord").val().replace(/(^\s+)|(\s+$)/g, "")
						.replace(/\s/g, "");
				if ($.trim(keyWord) == "") {
					keyWordFlag = false;
					$("#keyWord").focus();
					$("#keyWord").parent("div").next("span").text("关键字不能为空");
					return;
				}
			});

	$("#isUrl").click(function() {
		if ($(this).is(":checked")) {
			// alert("选中");
			$("#urlContentc").css({
				display : "block"
			});
			$("#urlContentc").show();
			$("#urlContent").focus();
		}
		if (!$(this).is(":checked")) {
			$("#urlContentc").css({
				display : "none"
			});
		}
	});

	$("#urlContent").blur(function() {
		var url = $(this).val();
		if (url == "") {
			urlFlag = false;
			$(this).parent("div").next("span").text("跳转网址不能为空");
			$(this).focus();
			return;
		} else {
			urlFlag = true;
			$(this).parent("div").next("span").text("跳转网址可用");
			$("#content").focus();
		}
	});


	$("#modifyNews").click(function(){
		var content=editor.getContent();
		if (content == "") {
			contentFlag = false;
			alert("添加新闻内容");
			return;
		}
		if (content != "") {
			contentFlag = true;
			$("#addNew").focus();
		}
		
				if (!$("#isUrl").is(":checked")) {
					$("#urlContent").val("");
				}
				if ($("#indexFlag").is(":checked")) {
					var indexFlag = 1;
				}
				if (!$("#indexFlag").is(":checked")) {
					var indexFlag = 0;
				}
				if ($("#isUrl").is(":checked") ){
					var isUrl = 1;
				}
				if (!$("#isUrl").is(":checked")) {
					var isUrl = 2;
				}
				var title = $("#title").val();
				var keyWord = $("#keyWord").val();
				var url = $("#urlContent").val();
				var content=editor.getContent();
				var categoryId = $("#categoryId").val();
				if (titleFlag == true && keyWordFlag == true && urlFlag == true
						&& contentFlag == true) {
					$.post("newsEdit.json?", {
						"id" : newsId,
						"title" : title,
						"keyWord" : keyWord,
						"indexFlag" : indexFlag,
						"isUrl" : isUrl,
						"url" : url,
						"content" : content
					}, function(res) {
						if (res.msg == "success") {
							window.location.href = pro_path
									+ "/news/newsList.htm";
						}
						if (res.msg == "fail") {
							alert("更新失败");
						}
					}, "json");
				}
	});
});