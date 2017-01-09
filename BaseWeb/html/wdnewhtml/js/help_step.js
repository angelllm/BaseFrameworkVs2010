// JavaScript Document
$(function(){
	$('.h-left span').click(function() {
		$(this).toggleClass('clickcolumn');
		$(this).next('.h-column').stop().toggle('hide');
	});
	
	var i = 0;
	var count = $('.step-img img').length;
	var guidecount = $('.shop_Guide a').length;
	
	$('map').click(function(e) {						
		i++;
		showStep();
	});
	$('#up-step').click(function(e) {
		i--;
		showStep();
	});
	$('#down-step').click(function(e) {
		i++;
		showStep();
	});
	
	function showStep(){
		$('.step-img img').hide();
		var guideindex = $('.step-a').index();
		if(i >= count){
			if(guideindex >= guidecount-1){
				i=count;
				$('.step-img img').eq(i-1).show();
				alert("购物指南已演示完毕！");				
				return;
			}
			var guideid = $('.shop_Guide a').eq(guideindex+1).attr('id');
			window.open("./builder_new_" + guideid + ".html",'_self');
		}
		if(i < 0){
			if(guideindex <= 0){
				i=0;
				$('.step-img img').eq(i).show();
				alert("点击下一步，查看更多！");				
				return;
			}
			var guideid = $('.shop_Guide a').eq(guideindex-1).attr('id');
			window.open("./builder_new_" + guideid + ".html",'_self');
		}
		$('.step-img img').eq(i).fadeIn('slow');
	}
})