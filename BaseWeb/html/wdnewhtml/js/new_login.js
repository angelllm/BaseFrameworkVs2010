
var _error = $(".logindrops");
$.each($(".inputs"), function (index, item) {

    $(item).blur(function () {

        if (index == 0) {
            if ($.trim($(item).val()) == "") {
                _error.html(_error.attr("data1")).fadeIn(500);
            }
        }
       else if (index == 1) {
            if ($.trim($(item).val()) == "") {
                _error.html(_error.attr("data2")).fadeIn(500);
            }
        }
    });

});

 

