// JavaScript Document
$(function(){	
	$('.searchparent span.sxtj').click(function(){
		$(this).find('i').toggleClass('clicksxtj');
		$('.control-search-area').stop().slideToggle(200);
	})
	
	$('.selectdiv').click(function(){
		$(this).find($('.childselect')).stop().slideToggle(200);
	})		
})


