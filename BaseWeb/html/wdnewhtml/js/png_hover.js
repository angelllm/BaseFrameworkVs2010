		$(function(){
				DD_belatedPNG.fix('.png,background');
				DD_belatedPNG.fix('.png,img');
				//==========hover
				$(".ie6hover").hover(
					function () {$(this).addClass("hover");},
					function () {$(this).removeClass("hover");}
				);
		});

