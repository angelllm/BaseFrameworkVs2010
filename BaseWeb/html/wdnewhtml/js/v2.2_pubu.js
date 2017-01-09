// JavaScript Document
$(function(){
	$('#list').BlocksIt({
		numOfCol:3,
		offsetX: 10.8,
		offsetY: 10
	});
	
	$(window).scroll(function(){
		totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
		if($(document).height() <= totalheight){
			addlist();
		}
	});
	
	var count = 12;
	// 点击加载更多
	function addlist(){
		var html = "";
		for(var i = count; i < count+11; i++){
			html = html + "<div class='list-item pubu' style='display:none;'>"+
					"<div class='img-waper'>"+
						"<a href='#'><img alt='' src='../webimage/index/pro.jpg' /></a>"+
					"</div>"+
					"<div class='list-item-left'>"+
						"<p class='info'><a href='#'>想你尹恩惠同款羊毛呢大衣 韩版宽松中长款翻领西装毛呢外套685...</a></p>"+
						"<p class='price'><b class='bigprice'>¥155</b><span>已售：<b>10</b>&nbsp;件</span></p>"+
					"</div>"+
					"<div class='list-item-right'>立即购买</div>"+
				"</div>";
		}
		count = count + 11;
		$('#list').append(html);
		$(".pubu").fadeIn(500);
		$('#list').BlocksIt({
			numOfCol:3, 
			offsetX: 10.8, 
			offsetY: 10 
		});
	};
	
	$('.activecolumn .ppfn').click(function(){
		$('.activecolumn .ppfn a').removeClass('clickactive');
		$(this).find('a').addClass('clickactive');
	});
	$('.rtop').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 500);
	})
})