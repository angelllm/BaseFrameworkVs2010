 var projectPath=$("input[name=project_path]").val();
function gotoPage(page,totalPage,pageSize){
	$("input[name=pageNo]").val(page);
	$("#form_id").submit();
	}
function lock(userId,status,pageNo){
    if(status==1){
    	status=-3;
    }else{
    	status=1;
    }
    var userName=$("input[name=userName]").val();
    var wangwang=$("input[name=wangwang]").val();
    var email=$("input[name=email]").val();
    var qq=$("input[name=qq]").val();
    var cellphone=$("input[name=cellphone]").val();
    var expandName=$("input[name=expandName]").val();
   window.location.href=projectPath+"/admin/lock.htm?userId="+userId+"&status="+status+"&pageNo="+pageNo+"&userName="+userName+"&wangwang="+wangwang+"&email="+email+"&qq="+qq+"&cellphone="+cellphone+"&expandName="+expandName;

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
	    $("input[name=pageNo]").val(1);
			$("#form_id").submit();
	});
});