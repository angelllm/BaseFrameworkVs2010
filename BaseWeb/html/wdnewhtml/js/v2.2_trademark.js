// JavaScript Document
$(function(){
	$('.sblist_ul li').hover(function(){
		$(this).addClass('hoverli');	
	},function(){
		$(this).removeClass('hoverli');
	})	
	
	$('.sblist_ul li i#write').click(function(e) {
        $(this).parent().find('input[type=text]').focus().select();
    });
	
	$('.sblist_ul li input[type=text]').click(function(e) {
        $(this).focus().select();
    });
})