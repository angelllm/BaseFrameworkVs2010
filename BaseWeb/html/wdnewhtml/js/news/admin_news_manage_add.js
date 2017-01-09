$(function(){
	var titleFlag=true;
	var keyWordFlag=true;
	var urlFlag=true;
	var contentFlag=true;
	var pro_path=$("#project_path").val();
	$("#title").focus();
	
	var editor = UE.getEditor('desc');
	$("#title").blur(function(){
		var title=$("#title").val();
		if(title==""){
			titleFlag=false;
			$("#title").parent("div").next("span").text("标题不能为空");
			return;
		}
		if(title.length>=15){
			titleFlag=false;
			$("#title").focus();
			$("#title").parent("div").next("span").text("标题过长");
			return;
		}else{
			titleFlag=true;
			$("#keyWord").focus();
			$("#title").parent("div").next("span").text("标题可用");
		}
	});
	$("#toNewsManage").click(function(){
		window.location.href=pro_path+"/news/newsList.htm"
	});
	
	$("#keyWord").blur(function(){
		//去掉空格
		var keyWord=$("#keyWord").val().replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,"");
		if($.trim(keyWord)==""){
			keyWordFlag=false;
			$("#keyWord").parent("div").next("span").text("关键字不能为空");
			return;
		}else{
			keyWordFlag=true;
		}
	});
	$("#isUrl").click(function(){
		if($(this).is(":checked")){
			$("#urlContentc").css({ display: "block" });
			$("#urlContentc").show();
			$("#url").focus();
		}
		if(!$(this).is(":checked")){
			$("#urlContentc").css({ display: "none" });
		}
	});
	$("#url").blur(function(){
		var url=$(this).val();
		if(url==""){
			urlFlag=false;
			$(this).parent("div").next("span").text("跳转网址不能为空");
			return;
		}else{
			urlFlag=true;
			$(this).parent("div").next("span").text("跳转网址可用");
			$("#content").focus();
		}
	});
//	$("#desc").blur(function(){
//		var content=editor.getContent();
//		alert("aaa");
//		alert(content);
//		if(content==""){
//			contentFlag=false;
//			$(this).parent("div").next("span").text("内容不能为空");
//			return;
//		}
//		if(content!=""){
//			contentFlag=true;
//			$(this).parent("div").next("span").text("内容可用");
//			$("#addNew").focus();
//		}
//	});
	$("#addNews").click(function(){
		var content=editor.getContent();
		if(content==""){
			contentFlag=false;
			//$(this).parent("div").next("span").text("内容不能为空");
			alert("添加内容");
			return;
		}
		if(content!=""){
			contentFlag=true;
			//$(this).parent("div").next("span").text("内容可用");
			$("#addNew").focus();
		}
		if($("#indexFlag").is(":checked")){
			var indexFlag=1;
		}
		if(!$("#indexFlag").is(":checked")){
			var indexFlag=0;
		}
		if($("#isUrl").is(":checked")){
			var isUrl=1;
		}
		if(!$("#isUrl").is(":checked")){
			var isUrl=2;
		}
		var title=$("#title").val();
		var keyWord=$("#keyWord").val();
		var url=$("#url").val();
		var content=editor.getContent();
		var categoryId=$("#categoryId").val();
		if(titleFlag==true && keyWordFlag==true && urlFlag==true && contentFlag==true){
			$.post("newsAdd.json?",{"categoryId":categoryId,"title":title,"keyWord":keyWord,"url":url,"content":content,"indexFlag":indexFlag,"isUrl":isUrl},function(res){
				if(res.msg=="ok"){
					alert("添加成功");
					window.location.href=pro_path+"/news/newsList.htm";
				}
				if(res.msg=="fail"){
					alert("添加失败");
					window.location.href=pro_path+"/news/newsAdd.htm";
				}
			},"json");
		}
	});
});