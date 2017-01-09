$(function(){
	/*$('.Adminmenu ul li').click(function(){
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
	})*/
	
	$('.Buyernav ul li,.accounting ul li').click(function(){ 
		$(this).addClass('ClickBuyernav').siblings().removeClass('ClickBuyernav')
	})
	/*
	$('.accountingmenu ul li').click(function(){
		$(this).addClass('accountingClickMenu').siblings().removeClass('accountingClickMenu')		
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
	*/
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
		$('form').hide()
		var index = $(this).index()
		if(index == 0){
			$('#userForm').show()
		}
		if(index == 1){
			$('#storeForm').show()
		}
		if(index == 2){
			$('#passwordForm').show()
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
	/*
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
	
	$('.DivSendMail2').click(function(){ 
		$('.DivAddWaybill').show()
		$(this).parent().parent().hide()
	})
	
	$('.AddSubFreight').click(function(){ 
		$('.DivAddFreight').show()
		$(this).parent().parent().hide()
	})
	
	$('#ReturnDivWaybill').click(function(){ 
		$('.DivWaybill').show()
		$(this).parent().parent().parent().parent().parent().hide()
	})*/
	
	$('#clickset').hover(function(){
		$('.divset').stop().slideDown(400);
	},function(){
	})
	$('.divset').hover(function(){
	},function(){
		$('.divset').stop().slideUp(400);
	})
	$('.BuyerMenu span').click(function() {
		$(this).find('i').toggleClass('clickchild');
		$(this).next('.child').stop().slideToggle('hide');
	});
	
	/**********买家右侧导航*******************/
	var Dindex = 0;
	var width = $('.cart-nav .line .floater').width();
	$('.cart-nav .cartnum span').click(function() {
		Dindex = $(this).index();
		$(this).addClass('clicknav').siblings().removeClass('clicknav');
		$('.cart-nav .line .floater').stop().animate({left:width*Dindex},200);
		$('.DivCollectionContainer').hide();
		$('.DivCollectionContainer').eq($(this).index()).show();
	});
	$('.cart-nav .cartnum span').hover(function(){
		var index = $(this).index();
		$('.cart-nav .line .floater').stop().animate({left:width*index},200);
	},function(){
		$('.cart-nav .line .floater').stop().animate({left:width*$('.clicknav').index()},200);
	});
	
})