/**
 * @author chenfei
 */
var projectPath = $('#project_path').val();

$(function(){
	//显示回复框
    $(".goon").click(function () {

        $(".model").hide();
        var model = $(this).next(".model");
        model.show().find("textarea").focus();

    });
    
    //此处采用刷新，所以可以省略
    $(".item-waper .control font").click(function () {

        $(".model").hide();
        var model = $(this).next(".model");
        model.show().find("textarea").focus();

    });

    //屏蔽
    $(".dispass").click(function () {
    	var r = window.confirm('确定屏蔽当前评论及其回复？');
    	if(r){
    		$.post(projectPath+"/comment/screen.json?"+new Date().getTime(),{'id':$(this).attr('data')},function(res){
    			if(res.flag){
    				alert(res.msg);
    				$_reload();
    			}
    		},"json");
    	}
    });
    
    //关闭回复框
    $(".closetag").click(function () {
        $(".model").hide();
    });
    
  //选择状态
    $('.selec-nav a').on('click',function(){
    	$('#opera_page_no').val(1);
    	$('#opera_status').val($(this).attr('data'));
    	$_reload();
    });
    
  //回复
    $('.btn-reason-sure').on('click',function(){
    	var content = $(this).parent().find('textarea').val();
    	if(! content){
    		alert('请填写内容');
    		return;
    	}else{
    		$.post(projectPath+"/comment/reply.json?"+new Date().getTime(),{'content':content,'id':$(this).attr('data')},function(res){
    			if(res.flag){
    				alert(res.msg);
    				$_reload();
    			}
    		},"json");
    	}
    });

});

//分页跳转
function gotoPage(page){
	$('#opera_page_no').val(page);
	$_reload();
}

function $_reload(){
	$('#form1').attr('action',projectPath+"/comment/list.htm").submit();
}