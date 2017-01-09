$('.input[type=text],input[type=password]').focusin(function () {
    $(this).attr('style', 'border:1px solid #06ba9d; box-shadow:0 0 2px rgba(6,186,157,0.5);');
});
$('.input[type=text],input[type=password]').focusout(function () {
    $(this).removeAttr('style');
});



$('input[name="loginpass"]').keydown(function (e) {
   
    var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$");
    var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$");
    var enoughRegex = new RegExp("(?=.{6,}).*");

    var pass = $('input[name="loginpass"]').val();
    console.log(enoughRegex.test(pass));
//    var pass2 = $('input[name="loginpass"]').val();
//    console.log(enoughRegex.test(pass2));

    if (false == enoughRegex.test(pass)) {
        $('.Safety span:nth-child(1)').addClass('thissa').siblings().removeClass('thissa');
    } else if (strongRegex.test(pass)) {
        $('.Safety span:nth-child(3)').addClass('thissa').siblings().removeClass('thissa');
    } else if (mediumRegex.test(pass)) {
        $('.Safety span:nth-child(2)').addClass('thissa').siblings().removeClass('thissa');
    } else {

    }


});
 

$(".registerimg").on("click", function () {

    var pwd = $(".registerlist input[type='text']:eq(2)");
    if ($.trim(pwd.val()) == "") {
        pwd.addClass("errorborder").next("img").hide().end().prev("span.errorinfo").fadeIn(300);
    }
    else {
        pwd.removeClass("errorborder").next("img").show().end().prev("span.errorinfo").fadeOut(300);
    
    }
     

});

$(".registerlist input").focus(function () {
   
    $(this).prev("span.errorinfo").fadeOut(2000);

});

$(".registerlist input").blur(function () {
    if ($.trim($(this).val()) == "") {
        $(this).addClass("errorborder").next("img").hide().end().prev("span.errorinfo").fadeIn(300);
    } else {
        $(this).removeClass("errorborder").next("img").show()
    }
});
