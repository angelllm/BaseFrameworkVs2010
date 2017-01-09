$(function () {

    $("#adv").slideDown(500).delay(3000).slideUp(500);

    $("#contorl-del-adv").click(function () {

        $("#adv").remove();

    });
	
	$('.appdiv .app').hover(function(){
		$(this).addClass('hback').find("i").addClass("top-menu-tag-hover");
		$(this).addClass('apphover');
		$(this).parent().find('.appinto').show();
	},function(){
		$(this).removeClass('hback').find("i").removeClass("top-menu-tag-hover");
		$(this).removeClass('apphover');
		$(this).parent().find('.appinto').hide();
	})
	
	$('.appinto').hover(function () {
		$(this).parent().find('span').addClass('apphover')
        $(this).show();
    }, function () {
        $(this).parent().find('span').removeClass('apphover');
        $(this).hide();
    });

    var timer = null;
    $('.top_nav .div_top_nav span').hover(function () {
        $(this).addClass('hback').find("i").addClass("top-menu-tag-hover");
        $(this).parent().find('ul').show();
        //$(this).parent().find('dl').show();
    }, function () {
        $(this).removeClass('hback').find("i").removeClass("top-menu-tag-hover");  
        $(this).parent().find('ul').hide();
        //$(this).parent().find('dl').hide();
    });

    $('.top_nav .div_top_nav ul,.appinto').hover(function () {
        $(this).parent().find('span').addClass('hback');
		$(this).parent().find('span').addClass('apphover')
        $(this).show();
    }, function () {
        $(this).parent().find('span').removeClass('hback');
        $(this).hide();
    });
});



$(function () {
    $('#clickCustomerService').hover(function () {
        $('.CustomerService').show()
    })
    $('#closeService').click(function () {
        $('.CustomerService').hide()
    })
    $('.vm-fixed').hover(function () {

    }, function () {
        $('.CustomerService').hide()
    })

    $(".adv_close").click(function () {

        $(this).parent().parent().slideUp(500);
    }).hover(function () {
        $(this).attr("src", "${webimage_path}/new_theme/deleteicon2.png");
    }, function () {
        $(this).attr("src", "${webimage_path}/new_theme/deleteicon.png");
    });



})