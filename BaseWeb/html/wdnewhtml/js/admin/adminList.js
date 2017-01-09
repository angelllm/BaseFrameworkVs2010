  var projectPath=$("input[name=project_path]").val();
function gotoPage(page,totalPage,pageSize){
	var adminName=document.getElementById("adminName").value;
	if(adminName){
		window.location.href=projectPath+"/admin/list.htm?pageNo="+page+"&adminName="+adminName;
	}else{
		window.location.href=projectPath+"/admin/list.htm?pageNo="+page;
	}
	
	
}
function lock(adminId,status,pageNo){
    if(status==1){
    	status=-1;
    }else{
    	status=1;
    }
    var adminName=document.getElementById("adminName").value;
    if(adminName){
    	window.location.href=projectPath+"/admin/openAdmin.htm?adminId="+adminId+"&status="+status+"&pageNo="+pageNo+"&adminName="+adminName;
    }else{
    	window.location.href=projectPath+"/admin/openAdmin.htm?adminId="+adminId+"&status="+status+"&pageNo="+pageNo;
    }
	
}
$(function(){
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
	$("#btn_searcher").click(function(){
	    var adminName=$("input[name=adminName]").val($("#adminName").val());
		if(adminName){
			$("#form_id").submit();
		}
	});
});