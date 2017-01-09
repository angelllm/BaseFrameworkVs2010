/**
 * @author chenfei
 */

var projectPath = $('#project_path').val();
var jsPath = $('#js_path').val();

$(function () {
	
    //上传拒绝申请凭证
    $("#return_file").uploadify({
		"id" : "return_file",
		"swf" : jsPath + "/uploadify/uploadify.swf",
		"uploader" : projectPath+"/file/upload.json",
		"buttonText" : "上&nbsp;传&nbsp;文&nbsp;件",
		"buttonClass" : "btnFile",
		"fileTypeExts" : "*.jpg;*.png;*.gif",
		"fileObjName" : "upload_file",
		"fileSizeLimit" : "5000KB",
		"width" :70,
		onUploadSuccess : function(file, data, flag) {
			$('input[name="return_file"]').val($.parseJSON(data).fileList[0].path);
		}
	});
    
    $("#return_file-queue").hide();
    
    //确定拒绝 
    $('#agree_button').on('click',function(){
    	var file = $('input[name="return_file"]').val();
    	var remark = $('textarea[name="return_remark"]').val();
    	var id = $('#operate_id').val();
    	
    	if(!remark){
    		alert('请填写拒绝说明');
    	}else if(!file){
    		alert('请上传凭证');
    	}else{
    		$.post(projectPath+'/order/refundRefuseStep2.json?'+new Date().getTime(),{'id':id,'remark':remark,'file':file},function(res){
    			if(res.flag){
    				alert(res.msg);
    				$('#form1').attr('action',projectPath+'/order/refundRefuseStep3.htm').submit();
    			}else{
    				alert(res.msg);
    			}
    		},"json");
    	}
    });
});
