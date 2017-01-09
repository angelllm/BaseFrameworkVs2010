function gotoPage(page,totalPage,pageSize){
	window.location.href="list.htm?pageNo="+page;
}
function formSub(){
	var name=$("input[name=name]").val();
	var sort=$("input[name=sort]").val();
	var re1 = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_])*$"); 
	var re2=/^[0-9]*$/;
	if (!re1.test(name)||name==""){
		$("#label_msg").html("商标名称格式有误!").css("color",'red').show();
		return;
		}else{
			$("#label_msg").hide();
		} 
	if(!re2.test(sort)||sort==""){
		$("#label_msg").html("商标排序必须为数字!").css("color",'red').show();
		return;
	}else{
		$("#label_msg").hide();
	}
		if($('#id_image').val()){
			$("#form1").ajaxSubmit({
				url : "../file/upload.json",
				dataType:"text",
				type : "post",
				success : function(res) {
					res=res.replace(/(<pre>|<\/pre>)/g,"");
					var resJson=eval("("+res+")");
					if(resJson.fileList.length>0){
						$('input[name="logoImagePath"]').val(resJson.fileList[0].path);
						$('input[name="upload_file"]').removeAttr('name');
					}
					$("#form1").attr('action','add.htm').submit();
				
						}
					});
			        
				}else{
					$("#label_msg").html("请选择正确的图片!").css("color",'red').show();
				}	
}
$('#id_image').blur(function(){
	if($(this).val()){
		$("#label_msg").hide();
	}else{
		$("#label_msg").html("请选择正确的图片!").css("color",'red').show();
	}
});
function formSubEdit(){
	var name=$("input[name=name]").val();
	var sort=$("input[name=sort]").val();
	var re1 = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_])*$"); 
	var re2=/^[0-9]*$/;
	if (!re1.test(name)||name==""){
		$("#label_msg").html("商标名称格式有误!").css("color",'red').show();
		return;
		} 
	if(!re2.test(sort)||sort==""){
		$("#label_msg").html("商标排序必须为数字!").css("color",'red').show();
		return;
	}
	if($('#id_image').val()){
		$("#form2").ajaxSubmit({
			url : "../file/upload.json",
			dataType:"text",
			type : "post",
			success : function(res) {
				res=res.replace(/(<pre>|<\/pre>)/g,"");
				var resJson=eval("("+res+")");
				if(resJson.fileList.length>0){
					$('input[name="logoImagePath"]').val(resJson.fileList[0].path);
					$('input[name="upload_file"]').removeAttr('name');
				}
				$("#form2").attr('action','update.htm').submit();
			
					}
				});
			}else{
				$('input[name="upload_file"]').removeAttr('name');
				$("#form2").attr('action','update.htm').submit();
			}
		}
function delete_id(id){
	if(confirm("确定要删除吗?")){
		window.location.href="delete.htm?id="+id;
	}
}
function edit1_id(id){
			window.location.href="edit.htm?id="+id;
}
function testType(dom){
	var reg=/^(gif|png|jpeg|jpg)$/i;
	if(dom.val()){
		var fileSuf=dom.val().substring(dom.val().lastIndexOf('.')+1);
		if(!reg.test(fileSuf)){
			dom.next('label').html('图片格式错误!');
		}else{
			dom.next('label').html('');
			return true;
		}
	}else{
		dom.next('label').html('请上传图片!');
	}
	return false;
}
