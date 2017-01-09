$(function(){
	if($("#postType").html().trim()=="汇通"){
		var html="<input type='button'  class='ExpBut' onclick='window.open(\"http://www.800bestex.com/\")'/>";
		$("#div_id").html(html);
		return;
	}
	$.post(
	    "dicCheck.htm",
	    {"postsn":$("#postSn").html(),"url":$("#dic_attr1").val()},
	    function(data){
	    	$("#div_id").html(data);
	    	if($("#postType").html().trim()!="天天快递"){
	    	  	$("#div_id table").find("a").remove();
	    	}else{
	    		var arr=$("#div_id table").find("a");
	    		var http="http://www.kiees.cn/";
	    		for(var i=0;i<arr.length;i++){
	    			var href=$(arr[i]).attr("href");
	    			$(arr[i]).attr("href",http+href+"");
	    		}
	    	}
	    	},'text'
	);
});