var projectPath = $('#project_path').val();
var jsPath = $('#js_path').val();
$(function(){
	//上传文件
	 $("#file_order").uploadify({
			"id" : "file_order",
			"swf" : jsPath + "/uploadify/uploadify.swf",
			"uploader" : projectPath+"/file/upload.json",
			"buttonText" : " 上&nbsp;传&nbsp;文&nbsp;件 ",
			"buttonClass" : "ScanBut",
			"fileTypeExts" : "*.xlsx;*.xls",
			"fileObjName" : "upload_file",
			"fileSizeLimit" : "10000KB",
			"width" : 70,
			onUploadSuccess : function(file, data, flag) {
				$('input[name="orderDetail"]').val($.parseJSON(data).fileList[0].path);
//				changeItemValue('company','orderDetail',true);
			}
		});
	 
	//获得文件路径
	    $("#subForm").click(function(){
	    	var filePath=$("#orderDetail").val();
		    var buyerName=$("#buyerName").val();
//		    alert(orderDetailPath);
//		    alert(orderSkuDetailPath);
		    if(filePath==""){
		    	alert("请上传订单信息");
		    	return;
		    }
		    if(buyerName==""){
		    	alert("请填写买家姓名信息");
		    	return;
		    }
		    //插入数据库
		    $.post(projectPath+"/order/insertDB.json",{"filePath":filePath,"buyerName":buyerName},function(res){
		    	if(res.flag=="notFind"){
		    		alert("没有找到该买家");
		    		return;
		    	}
		    	if(res.flag=="inserted"){
		    		alert("插入成功");
		    	}
		    	if(res.flag=="dataerror"){
		    		alert(res.errormsg);
		    	}
		    	if(res.flag=="exist"){
		    		alert("部分数据已经存在，执行成功");
		    	}
		    },"json");
	    });
});
