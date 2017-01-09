
 

$(function () {
	var payChecked = $('input[name="payChecked"]');
	payChecked.bind("click",(function() {
        if(payChecked.prop("checked")){
			$(this).parent().parent().attr("style","background-color:#f3f5fc");
			$('.show_this,.form_this').show();
		}else{
			$(this).parent().parent().removeAttr("style");
			$('.show_this,.form_this').hide();
		}
    }));
});


 