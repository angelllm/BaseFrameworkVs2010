// JavaScript Document
(function($){
	$.fn.showpro = function(c){
		var b={
			index:0,
			width:0
		};		
		if(c)$.extend(b,c);
		var $this = this;
		var length = $this.find($('.room-list')).length;
		$this.find($('.downfgb')).click(function(){
			c.index++;
			if(c.index > 0){
				$(this).parent().find($('.upfgb')).css('background-color','#9f9f9f');
			}
			if(c.index == length-1){
				$(this).css('background-color','#c1c1c1');
			}
			if(c.index > length-1){
				c.index = length-1;
				return;
			}
			$(this).parent().find($('.big_room')).stop().animate({"marginLeft": -c.width * c.index + "px"},500);
		})
		$this.find($('.upfgb')).click(function() {
			c.index--;
			if(c.index < length-1){
				$(this).parent().find($('.downfgb')).css('background-color','#9f9f9f');
			}
			if(c.index == 0){
				$(this).css('background-color','#c1c1c1');
			}			
			if(c.index < 0){
				c.index = 0;
				return;
			}
			$(this).parent().find($('.big_room')).stop().animate({"marginLeft": -c.width * c.index + "px"},500);
		});
	
	}
})(jQuery);

$(function(){
	$('.room-item').hover(function(){
		$(this).find('.room-item-info').show();
	},function(){
		$(this).find('.room-item-info').hide();
	})
	$('.first-floor').showpro({
		index:0,
		width:$(this).find($('.room-list')).eq(0).width()
	});	
	
	$('.second-floor').showpro({
		index:0,
		width:$(this).find($('.room-list')).eq(0).width()
	});		
});