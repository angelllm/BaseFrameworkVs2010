/**
 * @author 马生礼
 */

var projectPath = $('#project_path').val();
function delete_sku(categoryId){
	if(confirm("确定要删除吗")){
		$("#category_id").val(categoryId);
		$("#sort_id").val($("#order").val());
		$('#form3').attr('action',projectPath+"/categoryAttrSize/delete_sku.htm").submit();
	}
}
$(function(){
	$('.AttributeUl li').on('click',function(){
		$('#opera_category_id').val($(this).attr('data'));
		$('#opera_param_id').val("");
		$_reload();
	});
	$('.AttributeOne li').on('click',function(){
		$('#opera_category_id').val($(this).attr('data'));
		$('#opera_param_id').val("");
		
		$_reload();
	});
	$('.class_category li').on('click',function(){
		$('.class_category li').removeClass();
		$(this).addClass("ClickAttributeTwo");
		$('#opera_param_id').val($(this).attr('data'));
		$_reload();
	});
	$('.title_nav p').on('click',function(){
		var index=$(this).index();
		$("#type_id").val(index+1);
		$_reload();
	});
	$('.color_list li').on('click',function(){
		$("#name_id").val($(this).children("input").attr('value'));
		$("#code_id").val($(this).children("input").attr('class'));
		//alert($("#name_id").val());
		//alert($("#code_id").val());
	});
	$("#btn_form").on('click',function(){
		$_present();
	});
	var userText = $('#text_area');
	userText.focus(function(){
		if($(this).val()=="请输入尺寸"){
			$(this).val("")
		}				
	}).blur(function(){
		if($(this).val()==""){
			$(this).val("请输入尺寸");
		}				
	});
	$("#btn_size").on('click',function(){
		$("#name_id").val($("#text_area").val());
		if($("#name_id").val()=="请输入尺寸"){
			return;
		}else{
			$("#sort_id").val($("#order").val());
			$('#form2').attr('action',projectPath+"/categoryAttrSize/size.htm").submit();
		}
	});
	
	var userText2 = $('#text_area2');
	userText2.focus(function(){
		if($(this).val()=="请输入尺码"){
			$(this).val("")
		}				
	}).blur(function(){
		if($(this).val()==""){
			$(this).val("请输入尺码");
		}				
	});
	$("#btn_footage").on('click',function(){
		$("#name_id").val($("#text_area2").val());
		if($("#name_id").val()=="请输入尺码"){
			return;
		}else{
			$("#sort_id").val($("#order").val());
			$('#form2').attr('action',projectPath+"/categoryAttrSize/footage.htm").submit();
		}
	});
	
	var userText3 = $('#text_area3');
	userText3.focus(function(){
		if($(this).val()=="请输入身高"){
			$(this).val("")
		}				
	}).blur(function(){
		if($(this).val()==""){
			$(this).val("请输入身高");
		}				
	});
	$("#btn_hight").on('click',function(){
		$("#name_id").val($("#text_area3").val());
		if($("#name_id").val()=="请输入身高"){
			return;
		}else{
			$("#sort_id").val($("#order").val());
			$('#form2').attr('action',projectPath+"/categoryAttrSize/hight.htm").submit();
		}
	});


	
	
	
//	function delete_sku(categoryId){
//		alert(1);
//		$("#category_id").val(categoryId);
//		$("#sort_id").val($("#order").val());
//		$('#form3').attr('action',projectPath+"/categoryAttrSize/delete_sku.htm").submit();
//	}
	function $_present(){
		$("#sort_id").val($("#order").val());
		if($("#name_id").val()==""){
			return;
		}
		$('#form2').attr('action',projectPath+"/categoryAttrSize/color.htm").submit();
	}
	function $_reload(){
		$('#form1').attr('action',projectPath+"/categoryAttrSize/list.htm").submit();
	}
	
});