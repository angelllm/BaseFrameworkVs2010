



$(function () {
	var Dindex = 0;
	$('.cart-waper .cartnum span').click(function() {
		Dindex = $(this).index();
		$(this).addClass('clicknav').siblings().removeClass('clicknav');
		$('.cart-waper .line .floater').stop().animate({left:140*Dindex},200);
    });
	$('.cart-waper .cartnum span').hover(function(){
		var index = $(this).index();
		$('.cart-waper .line .floater').stop().animate({left:140*index},200);
	},function(){
		$('.cart-waper .line .floater').stop().animate({left:140*Dindex},200);
	});	
	
	$('.otherpro .cartnum span').hover(function(){
		var index = $(this).index();
		$(this).addClass('clicknav').siblings().removeClass('clicknav');
		$('.otherpro .line .floater').stop().animate({left:140*index},200);
		$('.otherpro .list').hide().eq(index).show();
	},function(){
	});

    $("input:checkbox[name=cart_select_all]").click(function () {

        $("input:checkbox[name=cart_select_all]").prop("checked", $(this).prop("checked"));
        $(".cart-item input:checkbox").prop("checked", $(this).prop("checked"));
		if($(".cart-item input:checkbox").prop("checked")==true){
			$('.cart-control input.sub,.cart-nav .cart-nav-control input').removeClass('noselect');
			$('.cart-control input.sub,.cart-nav .cart-nav-control input').css('cursor','pointer');
			$('.cart-control input.sub,.cart-nav .cart-nav-control input').hover(function(){
				$(this).css('background-color','#ff4200');
			},function(){
				$(this).css('background-color','#ff5500');
			});
		}else{
			$('.cart-control input.sub,.cart-nav .cart-nav-control input').addClass('noselect');
			$('.cart-control input.sub,.cart-nav .cart-nav-control input').css('cursor','not-allowed');
		}
    });
	$(".col input[type='checkbox']").click(function(){
		if($(this).prop("checked")==true){
			$('.cart-control input.sub,.cart-nav .cart-nav-control input').css('cursor','pointer');
			$('.cart-control input.sub,.cart-nav .cart-nav-control input').removeClass('noselect');
			$('.cart-control input.sub,.cart-nav .cart-nav-control input').hover(function(){
				$(this).css('background-color','#ff4200');
			},function(){
				$(this).css('background-color','#ff5500');
			});
		}else{
			if($(".col input[type='checkbox']:checked").length < 1){
				$('.cart-control input.sub,.cart-nav .cart-nav-control input').addClass('noselect')
				$('.cart-control input.sub,.cart-nav .cart-nav-control input').css('cursor','not-allowed');
			}
		}
	});

    $(".prev").click(function () {

        var count = $(this).next();
        if (parseInt(count.val()) <= 0) {

            count.val(0);
        } else {
            count.val(parseInt(count.val()) - 1);
        }

    });

    $(".next").click(function () {

        var count = $(this).prev();
        //可加入库存判断
        count.val(parseInt(count.val()) + 1);

    });



    $(".select-count").change(function () {

        checkCount(this);

    }).blur(function () {

        checkCount(this);
    });





});


//检测购买量输入
function checkCount(obj) {

    var count = $(obj);
    if (isNaN(count.val())) {
        count.val(0);
    }
    else if (parseInt(count.val()) <= 0) {

        count.val(0);
    } else {

        count.val(parseInt(count.val()));
    }

}