



$(function () {
    $(".showall").click(function () {
        $(".more").toggle("slow");
        $(".showall").toggleClass("hidesame");
    });

    $(".msg textarea").focus(function () {    
        $(this).css("border-color", "#ffad33").animate({ height: "60px" });
    });

    $(".msg textarea").blur(function () {
        $(this).css("border-color", "#8ab6dd").animate({ height: "30px" });
    });
	
	$('.submit-waper input[type=checkbox]').click(function() {
       	if($(this).prop('checked')==true){
			$('.txt-score,.lbl-price,.mark,.d').show();
		}else{
			$('.txt-score,.lbl-price,.mark,.d').hide();
		}
    });

});
