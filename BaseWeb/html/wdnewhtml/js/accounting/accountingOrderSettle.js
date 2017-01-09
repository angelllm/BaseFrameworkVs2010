/**
 * @author chenfei
 */
$(function () {
	var projectPath = $('#project_path').val();

    $(".no-do-price").click(function () {
        $(".model").hide();
        var model = $(this).next().find(".model").show();

    });
    
    $(".model .close").click(function () {
        $(".model").hide();
    });
    
    $('.sure').on('click',function(){
    	var $this = $(this);
		$.ajax({
			type : "post",
			url : projectPath+'/accounting/beginSettle.json?'+new Date().getTime(),
			data : {'settleId':$(this).attr("settleId")},
			dataType : "json",
			beforeSend : function(){
				$this.attr("disabled",true);
			},
			success : function(res){
				if (res.flag) {
					alert('转入结算中成功');
					reload();
				} else {
					alert('网络故障，请刷新页面');
				}
			},
			complete : function(){
				$this.attr("disabled",false);
			}
		});
    });
    
    $('.refuse').on('click',function(){
    	var reason = $.trim($(this).prev('textarea').val());
    	var $this = $(this);
    	if (reason) {
    		$.ajax({
    			type : "post",
    			url : projectPath+'/accounting/refuseSettle.json?'+new Date().getTime(),
    			data : {'settleId':$(this).attr('settleId'),'reason':reason},
    			dataType : "json",
    			beforeSend : function(){
    				$this.attr('disabled',true);
    			},
    			success : function(res){
    				if (res.flag) {
    					alert('拒绝结算成功');
    					reload();
    				} else {
    					alert('网络异常，请刷新页面');
    				}
    			},
    			complete : function(){
    				$this.attr('disabled',false);
    			}
    		});
    	} else {
    		alert('请填写拒绝理由');
    	}
    });
    
    $('.complete').on('click',function(){
    	var $this = $(this);
    	if (window.confirm('交易号为：'+$(this).attr('orderSn')+'结算完成?')) {
    		$.ajax({
    			type : "post",
    			url : projectPath+"/accounting/completeSettle.json?"+new Date().getTime(),
    			data : {'settleId':$(this).attr('settleId')},
    			dataType : "json",
    			beforeSend : function(){
    				$this.attr('disabled',true);
    			},
    			success : function(res){
    				if (res.flag) {
    					alert('完成结算成功');
    					reload();
    				} else {
    					alert('网络故障，请刷新页面');
    				}
    			},
    			complete : function(){
    				$this.attr('disabled',false);
    			}
    		});
    	}
    });
    
    function reload(){
    	$('#form1').attr('action',projectPath+"/accounting/listSettle.htm").submit();
    }
    
    //清除搜索 以及分页
    function reset(){
    	$('#operate_user_name').val('');
    	$('#operate_start_time').val('');
    	$('#operate_end_time').val('');
    	$('#operate_page_no').val(1);
    }
    
    $('.chooseStatus').on('click',function(){
    	$('#operate_status').val($(this).attr('data'));
    	reset();
    	reload();
    });
    
    $('#search_button').on('click',function(){
    	var startTime = $('#u_startTime').val();
    	var endTime = $('#u_endTime').val();
    	if (startTime && endTime && new Date((startTime+":00:00").replace(/-/g,"/")) > new Date((endTime+":59:59").replace(/-/g,"/"))) {
    		alert('起始时间大于终止时间');
    	} else {
    		$('#operate_user_name').val($.trim($('#u_user_name').val()));
    		$('#operate_start_time').val(startTime);
    		$('#operate_end_time').val(endTime);
    		reload();
    	}
    });
    
    gotoPage = function(page){
    	$('#operate_page_no').val(page);
    	reload();
    }
});