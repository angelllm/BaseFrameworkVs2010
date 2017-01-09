$(function () {

    $(".item-waper em").click(function () {

        $(this).prev().css("height", "auto").end().fadeOut();
    });


    $(".item-waper .control i").click(function () {

        var $this = $(this);
        $this.prev().show().end().hide();
    });

    $(".item-waper .control label img").click(function () {

        var $this = $(this).parent().parent().parent().parent();
        $this.fadeOut(300, function () { $this.remove(); });

    });

    $(".goon").click(function () {

        $(".model").hide();
        var model = $(this).next().next(".model");
        model.show().find("textarea").focus();

    });

    $(".item-waper .control font").click(function () {

        $(".model").hide();
        var model = $(this).next(".model");
        model.show().find("textarea").focus();

    });


    $(".dispass").click(function () {
        alert("当前产品的评论及其回复全部屏蔽");
    });
    $(".pass").click(function () {
        alert("当前产品的评论及其回复全部恢复");
    });
    $(".closetag").click(function () {
        $(".model").hide();
    });

});