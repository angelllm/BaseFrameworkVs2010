/**
 * @author chenfei
 */

var projectPath = $('#project_path').val();

$(function(){
	$('.AttributeUl li').on('click',function(){
		$('#opera_category_id').val($(this).attr('data'));
		$_reload();
	});
	
	$('.parameterUl input.AttributeDel').on('click',function(){
		var r = window.confirm("确定要删除此属性及属性下的默认值？");
		if(r){
			var id = $(this).parent('div').find('input.param_id').val();
			$.post(projectPath+"/attributeClassification/deleteParam.json?"+new Date().getTime(),{'id':id},function(res){
				if(res.flag){
					alert(res.msg);
					/*此验证挪到后台了*/
//					var operaParamId = $('#opera_param_id').val();
//					if(operaParamId == id){
//						$('#opera_param_id').val($('.parameterUl input.param_id').val());
//					}
					$_reload();
				}else{
					alert(res.msg);
				}
			},"json");
		}
	});
	
	$('.defaultUl input.AttributeDel').on('click',function(){
		var r = window.confirm("确定要删除此默认值？");
		if(r){
			var id = $(this).parent('div').find('input.default_id').val();
			$.post(projectPath+"/attributeClassification/deleteDefault.json?"+new Date().getTime(),{'id':id},function(res){
				if(res.flag){
					alert(res.msg);
					$_reload();
				}else{
					alert(res.msg);
				}
			},"json");
		}
	});
	
	$('#add_param').on('click',function(){
		var name = $('#add_param_name').val();
		var orderBy = $('#add_param_order').val();
		var categoryId = $('#opera_category_id').val();
		var sort_r =/^[1-9][0-9]*$/;
		if(! (name && orderBy)){
			alert('请输入参数');
			return;
		}else if(! sort_r.test(orderBy)){
			alert('排序必须是正整数');
			return;
		}else{
			$.post(projectPath+"/attributeClassification/addParam.json?"+new Date().getTime(),{'categoryId':categoryId,'name':name,'orderBy':orderBy},function(res){
				if(res.flag){
					alert(res.msg);
					$_reload();
				}else{
					alert(res.msg);
				}
			},"json");
		}
	});
	
	$('#add_default').on('click',function(){
		var name = $('#add_default_name').val();
		var paramId = $('#opera_param_id').val();
		if(! name){
			alert('请输入参数');
			return;
		}else{
			$.post(projectPath+'/attributeClassification/addDefault.json?'+new Date().getTime(),{'paramId':paramId,'name':name},function(res){
				if(res.flag){
					alert(res.msg);
					$_reload();
				}else{
					alert(res.msg);
				}
			},"json");
		}
	});
	
	$('.paramSpan').on('click',function(){
		var paramId = $(this).parent('div').find('input.param_id').val();
		$('#opera_param_id').val(paramId);
		$_reload();
	});
	
	$('.parameterUl input.AttributeUpdate').on('click',function(){
		$(this).parent('div').hide();
		$(this).parent('div').next().show();
	});
	
	$('.defaultUl input.AttributeUpdate').on('click',function(){
		$(this).parent('div').hide();
		$(this).parent('div').next().show();
	});
	
	$('.parameterUl input.modify_cancel').on('click',function(){
		var name = $(this).parent('div').prev().find('span').text();
		$(this).parent('div').find('.modify_param_name').val(name);
		
		var orderBy = $(this).parent('div').prev().find('input.paramOrderBy').val();
		$(this).parent().find('.modify_param_orderBy').val(orderBy);
		
		$(this).parent('div').hide();
		$(this).parent('div').prev().show();
	});
	
	$('.defaultUl input.modify_cancel').on('click',function(){
		var name = $(this).parent('div').prev().find('span').text();
		$(this).parent('div').find('.modify_default_name').val(name);
		
		$(this).parent('div').hide();
		$(this).parent('div').prev().show();
	});
	
	$('.parameterUl input.modify_ok').on('click',function(){
		var categoryId = $('#opera_category_id').val();
		var id = $(this).parent('div').find('input.param_id').val();
		var name = $(this).parent('div').find('input.modify_param_name').val();
		var orderBy = $(this).parent('div').find('input.modify_param_orderBy').val();
		var sort_r =/^[1-9][0-9]*$/;
		
		if(! (name && orderBy)){
			alert('请输入参数');
			return;
		}else if(! sort_r.test(orderBy)){
			alert('排序必须是正整数');
			return;
		}else{
			$.post(projectPath+'/attributeClassification/modifyParam.json?'+new Date().getTime(),{'categoryId':categoryId,'id':id,'name':name,'orderBy':orderBy},function(res){
				if(res.flag){
					alert(res.msg);
					$_reload();
				}else{
					alert(res.msg)
				}
			},"json");
		}
	});
	
	$('.defaultUl input.modify_ok').on('click',function(){
		var paramId = $('#opera_param_id').val();
		var id = $(this).parent('div').find('input.default_id').val();
		var name = $(this).parent('div').find('input.modify_default_name').val();
		
		if(! name){
			alert('请输入参数');
		}else{
			$.post(projectPath+"/attributeClassification/modifyDefault.json?"+new Date().getTime(),{'paramId':paramId,'id':id,'name':name},function(res){
				if(res.flag){
					alert(res.msg);
					$_reload();
				}else{
					alert(res.msg);
				}
			},"json");
		}
	})
	
	function $_reload(){
		$('#form1').attr('action',projectPath+"/attributeClassification/list.htm").submit();
	}
	
});