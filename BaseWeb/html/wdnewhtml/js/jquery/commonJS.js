// JavaScript Document
$(function(){
	$('.Adminmenu ul li').click(function(){
		$(this).addClass('ClickMenu').siblings().removeClass('ClickMenu')		
	})
	
	$('.Adminnav ul li').click(function(){ 
		$(this).addClass('ClickNav').siblings().removeClass('ClickNav')
	})
	
	$('.Sellermenu ul li').click(function(){
		$(this).addClass('SellerClickMenu').siblings().removeClass('SellerClickMenu')		
	})
	
	$('.Sellernav ul li').click(function(){ 
		$(this).addClass('ClickSelNav').siblings().removeClass('ClickSelNav')
	})
	
	$('.BuyerMenu ul li').click(function(){
		$(this).addClass('BuyerClickMenu').siblings().removeClass('BuyerClickMenu')		
	})
	
	$('.Buyernav ul li').click(function(){ 
		$(this).addClass('ClickSelNavBuyer').siblings().removeClass('ClickSelNavBuyer')
	})
	
	$('.DivRole a').click(function(){ 
		$(this).addClass('clickRole').siblings().removeClass('clickRole')
	})
	
	$('.DivUserListNav ul li').click(function(){
		$('.DivUserListNav ul li span').removeClass('clickUserNav').addClass('NoclickUserNav')
		$(this).addClass('clickUser').siblings().removeClass('clickUser')
		$('.DivUserListNav ul li span').eq($(this).index()).removeClass('NoclickUserNav').addClass('clickUserNav')
	})
	
	$('input[type=text],input[type=password]').addClass('inputtext_reg')
	$('input[type=checkbox]').addClass('inputbox')
	
	var userText = $('input[name=admin_user]')
	if(userText.val()=="邮箱/用户名/手机号"){
		userText.addClass('cccolor')
	}
	else{
		userText.removeClass('cccolor')
	}
	userText.focus(function(){
		if($(this).val()==this.defaultValue){
			$(this).val("")
			$(this).removeClass('cccolor')
		}				
	}).blur(function(){
		if($(this).val()==""){
			$(this).val(this.defaultValue)
			$(this).addClass('cccolor')
		}				
	})
	
	
	$('.RegisterSelCard a').click(function(){
		$(this).addClass('ClickCard').siblings().removeClass('ClickCard')
		var index = $(this).index()
		if(index == 0){
			$('#RegisterForm').show()
			$('#RegisterFormAdmin').hide()
		}
		if(index == 1){
			$('#RegisterForm,.ShowPayPass').hide()
			$('#RegisterFormAdmin,.DivadminGroup').show()
		}
		if(index == 2){
			$('#RegisterForm,.DivadminGroup').hide()
			$('#RegisterFormAdmin,.ShowPayPass').show()
		}
	})
	
	$("#Unified_price").click(function () {
		$(".price2").show()
        $(".price1").hide()
	})
    $("#Ladder_price").click(function () {
		$(".price1").show()
        $(".price2").hide()
	})
	
	_cur_click = 0
	$('.SelCard li').click(function(){ 
		$('.PicAll').hide()
		$(this).addClass('clickOload').siblings().removeClass('clickOload')
		$('.PicAll').eq($(this).index()).show()		
	})
	
	$('.CardUl li').click(function(){
		$(this).addClass('clickCardli').siblings().removeClass('clickCardli')
		$('.Divcertif').hide().eq($(this).index()).show()
		_cur_click = $(this).index()
	})
	
	$.each($('.Divcertif').find($('.CardUlUser li')),function(index,item){		
		$(item).bind("click",function(){
			$(item).addClass('clickCardliUser').siblings().removeClass('clickCardliUser');
			$(item).parent().parent().find(".DivOperContainer").hide().eq(index%2).show();
		});		
	});
	
	$('.CardFreight li').click(function(){
		$(this).addClass('clickCardFreight').siblings().removeClass('clickCardFreight')
		$('.DivFreoghtContainer').hide().eq($(this).index()).show()		
	})
})