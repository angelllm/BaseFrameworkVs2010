// JavaScript Document
$(function(){
	$('.OneCollectContainer span.DelCollect').click(function(){
		$(this).hide();
		$(this).parent().find('.divdel').slideDown(200);	
	})
	
	$('.divdel span#NO').click(function(){		
		$(this).parents('.divdel').slideUp(200);
		$(this).parents('.OneCollectContainer').find('span.DelCollect').show();
	})
	$('.cart-nav .cartnum .Category_operator label#select_all').click(function(){
		var checkbox = $('.OneCollectOperator input[type=checkbox]');
		if(!$('input[id=select_all_checkbox]').prop('checked')){
			$(this).addClass('select_all');
			checkbox.prop('checked',true);
		}else{
			$(this).removeClass('select_all');
			checkbox.prop('checked',false);
		}
	})
	
	$('.Category_operator label#del_select').click(function(){
		var length = $('.OneCollectOperator input[type=checkbox]:checked').length;
		if(length > 1){
			$('.div_del_more').stop().fadeIn(200);
		}
	})
	
	$('.div_del_more span.close,.div_del_more p.operator span#NO,.div_del_more p.operator span#OK').click(function(){
		$(this).parents('.div_del_more').stop().fadeOut(200);	
	})
	
	$('.Category_list span.listoperator').click(function(){		
		if($(this).text()=="取消管理"){
			$(this).parent().find('ul li span.edLayer').hide();
			$(this).text("分类管理");
			$(this).parent().find('i#wOK').hide();
			$(this).parent().find('input.text').removeClass('writetext');
		}else{
			$(this).parent().find('ul li span.edLayer').show();
			$(this).text("取消管理");
		}
	})
	
	$('span.edLayer i#write,span.edLayer input.text').click(function(){
		$(this).parent().find('i#wOK').show();
		$(this).parent().find('input.text').focus().select().addClass('writetext');
	})
	
	$('.Category_list ul li span.edLayer i#wOK').click(function(){
		$(this).hide().parent().hide();
		$(this).parent().find('input.text').removeClass('writetext');
		var value = $(this).parent().find('input.text').val();
		$(this).parent().parent().find('a').text(value);
	})
	
	$('.Category_list ul li a').click(function(){
		$(this).parent().addClass('clickname').siblings().removeClass('clickname');	
	})
	
	$('.div_add_in_category label').click(function(){
		var index = $(this).index();
		if(!$('input[id=category_checkbox_' + index/2 +']').prop('checked')){
			$(this).find('i').css('background-position','-75px -134px');
		}else{
			$(this).find('i').css('background-position','-180px -270px');
		}
	})
	
	$('.Category_operator label#add_in_category').click(function(){
		$(this).parent().find('.div_add_in_category').stop().slideToggle(200);	
	})
	
	$('.addCategory_but .clickadd').click(function() {
      	$(this).parent().find('.addCategory_text').show();
		$(this).parent().find('.addCategory_text input[type=text]').focus();
    })
})