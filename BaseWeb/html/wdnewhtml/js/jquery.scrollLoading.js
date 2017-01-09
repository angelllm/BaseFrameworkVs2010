/*!
 * jquery.scrollLoading.js
 * by zhangxinxu  http://www.zhangxinxu.com
 * 2010-11-19 v1.0
 * 2012-01-13 v1.1 偏移值计算修改 position → offset
*/
(function($) {
	$.fn.scrollLoading = function(options) {
		var defaults = {
			attr: "data-url"	
		};
		var params = $.extend({}, defaults, options || {});
		params.cache = [];
		$(this).each(function() {
			var node = this.nodeName.toLowerCase(), url = $(this).attr(params["attr"]);
			if (!url) { return; }
			//重组
			var data = {
				obj: $(this),
				tag: node,
				url: url
			};
			params.cache.push(data);
		});
		function leftBarAnimate(eqindex) {
		    $(".bar-select").removeClass("bar-select");
		    $("#slideBar-left p").eq(eqindex).addClass("bar-select");
		}
		//动态显示数据
		var loading = function() {
		    var st = $(window).scrollTop(), sth = st + $(window).height();
		    if (st > 1) $("#j-top").animate({ opacity:1}, 300);
		    else $("#j-top").animate({ opacity: 0 }, 300);
		    if (st >= 400) $("#slideBar-left").addClass("fade-animite");
		    else $("#slideBar-left").removeClass("fade-animite");
		    //975,1428,1882
		    if (st < 975 ) {
		        leftBarAnimate(0);
		    }
		    else if (st >= 975 && st < 1428) {
		        leftBarAnimate(1);
		    }
		    else if (st >= 1428 && st < 1882) {
		        leftBarAnimate(2);
		    }
		    else if (st >= 1882) {
		        leftBarAnimate(-1);
		    }
			$.each(params.cache, function(i, data) {
				var o = data.obj, tag = data.tag, url = data.url;
				if (o) {
					post = o.offset().top; posb = post + o.height();
					if ((post > st && post < sth) || (posb > st && posb < sth)) {
						//在浏览器窗口内
						if (tag === "img") {
						    //图片，改变src
						    //o.load(url, function () {
						        o.attr("src", url);
						        o.animate({ opacity: 1 }, 1000);
						    //}); 
						    
						} else { 
						    o.load(url); 
						}	
						data.obj = null;		
					}
				}
			});		
			return false;	
		};
		
		//事件触发
		//加载完毕即执行
		loading();
		//滚动执行
		$(window).bind("scroll", loading);
	};
})(jQuery);