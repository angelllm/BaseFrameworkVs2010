function delete_T(reportId){
	if(confirm("确定要删除吗?")){
		window.location.href="deleteReport.htm?reportId="+reportId;	
	}

}

function check(reportId){
	window.location.href="echartsContent.htm?reportId="+reportId;
}

function gotoPage(page,totalPage,pageSize){
	window.location.href="list.htm?pageNo="+page;
}