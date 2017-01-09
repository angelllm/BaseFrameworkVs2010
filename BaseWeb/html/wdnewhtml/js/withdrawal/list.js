/**
 * @author chenfei
 */
var projectPath=$('#project_path').val();

$(function(){
	$('.sure').click(function(){
		$(this).prev('div.doprice').show();
		$(this).hide();
	});
	$('.waper').find('a').click(function(){
		if(!$(this).hasClass('curs')){
			$('#startDate').val('');
			$('#endDate').val('');
			$('#pageNo').val(1);
			$('#state').val($(this).find('input[type="hidden"]').val());
			$('#form1').attr('action',projectPath+"/accounting/listWithdrawal.htm").submit();
		}
	});
	//@author llm start
	 $(".noprice").click(function () {
         var model = $(this).find(".model");
         if (model.attr("data") == "0") {
             $(".model").hide();
             model.show().attr("data", 1).find("textarea").focus();
         } else {
             model.attr("data", 0);
             //$(this).click();
         }
     });
	 $(".model .close").click(function () {

         $(".model").hide();
         //$(this).parent().attr("data", 0);
     });
	 //end
});

function startWithdrawal(id){
	$('#opera_id').val(id);
	$('#form1').attr('action',projectPath+"/accounting/start.htm").submit();
}

function refuseWithdrawal(dom,id){
	var remark=$(dom).prev('textarea').val();
	if(remark){
		$('#opera_id').val(id);
		$('#opera_remark').val(remark);
		$('#form1').attr('action',projectPath+"/accounting/refuse.htm").submit();
	}else{
		alert('请输入拒绝理由');
	}
}

function searchItems(){
	var startDate=$('#u_startDate').val();
	var endDate=$('#u_endDate').val();
	if(startDate && endDate && (new Date(startDate.replace(/-/g,"/")) > new Date(endDate.replace(/-/g,"/")))){
		alert('起始时间大于终止时间');
		return;
	}else{
		$('#startDate').val(startDate);
		$('#endDate').val(endDate);
		$('#pageNo').val(1);
		$('#form1').attr('action',projectPath+"/accounting/listWithdrawal.htm").submit();
		return;
	}
}

function gotoPage(page, totalPage, rows){
	$('#pageNo').val(page);
	$('#form1').attr('action',projectPath+"/accounting/listWithdrawal.htm").submit();
}

function completeWithdrawal(dom,id){
	var password=$(dom).prev('input[type="password"]').val();
	if(password && WD.regular.pwd.test(password)){
		$.get(projectPath+"/withdrawal/proof.json?"+new Date().getTime(),{'password':password},function(data){
			if(data=='true'){
				$('#opera_id').val(id);
				$('#opera_password').val(password);
				$('#form1').attr('action',projectPath+"/accounting/complete.htm").submit();
			}else{
				alert('密码不正确');
			}
		},"text");
	}else{
		alert('密码格式不正确');
	}
}
	
