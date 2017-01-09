



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

    $("input:checkbox[name=cart_select_all]").click(function () {

        $("input:checkbox[name=cart_select_all]").prop("checked", $(this).prop("checked"));
        $(".cart-item input:checkbox").prop("checked", $(this).prop("checked"));
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