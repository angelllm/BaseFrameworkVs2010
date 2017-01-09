/**
 * @author chenfei
 */
var projectPath = $('#project_path').val();

$(function () {

    $(".item-waper em").click(function () {

        $(this).prev().css("height", "auto").end().fadeOut();
    });

    //单个屏蔽
    $(".item-waper .control i").click(function () {
    	//页面处理
        var $this = $(this);
        $this.prev().show().end().hide();
        //数据处理
        $.post(projectPath+"/consult/screenOne.json?"+new Date().getTime(),{'id':$(this).attr('data')},function(res){
        	if(res.flag){
        		alert(res.msg);
        	}else{
        		alert('网络故障');
        		$this.prev().hide().end().show();
        	}
        },"json");
    });
    
    //单个删除
    $(".item-waper .control label img").click(function () {
    	//页面处理
//        var $this = $(this).parent().parent().parent().parent();
//        $this.fadeOut(300, function () { $this.remove(); });
        
        //数据处理
        $.post(projectPath+"/consult/deleteOne.json?"+new Date().getTime(),{'id':$(this).attr('data')},function(res){
        	if(res.flag){
        		alert(res.msg);
        		$_reload();
        	}
        },"json");
    });
    
    //显示回复框
    $(".goon").click(function () {

        $(".model").hide();
        var model = $(this).next().next(".model");
        model.show().find("textarea").focus();

    });
    
    //此处采用刷新，所以可以省略
    $(".item-waper .control font").click(function () {

        $(".model").hide();
        var model = $(this).next(".model");
        model.show().find("textarea").focus();

    });

    //全部屏蔽
    $(".dispass").click(function () {
    	var r = window.confirm('确定屏蔽当前产品的全部评论及其回复？');
    	if(r){
    		$.post(projectPath+"/consult/screenAll.json?"+new Date().getTime(),{'id':$(this).attr('data')},function(res){
    			if(res.flag){
    				alert(res.msg);
    				$_reload();
    			}
    		},"json");
    	}
    });
    
    //这玩意没找到
    $(".pass").click(function () {
        alert("当前产品的评论及其回复全部恢复");
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
    		$.post(projectPath+"/consult/reply.json?"+new Date().getTime(),{'content':content,'id':$(this).attr('data')},function(res){
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
	$('#form1').attr('action',projectPath+"/consult/list.htm").submit();
}