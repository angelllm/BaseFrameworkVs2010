
jQuery(function () {

    jQuery("#lblUrlTitle").text("留言、评论回复");
    jQuery("#btnAdd,#btnSave").button();
    $("#btnAdd").click(function () {
        window.location.href = '/Admin/CommiteManage/';
    });
    jQuery("#edit-win").tabs();

    jQuery('#cbkStatus').live('click', function (evt, params) {
        jQuery("#commite_status").val($.trim(jQuery("#commite_status").val()) == "1" ? "0" : "1");
    });

    jQuery("#btnSave").click(function () {
        var flag = true;
        art.dialog({
            title: '操作提示',
            id: "o_tip",
            icon: 'face-smile',
            content: "正在操作,请稍候...",
            resize: false,
            padding: "20px",
            //time: 1,
            lock: true
        });
        return flag;
    });

});

$(".switch input[type=checkbox]").change(function () {

        var $this = $(this);
       
        $.ajax({
            type: "POST",
            url: "/Admin/CommiteStatus/",
            async: false,
            data: {
                id: $this.attr("data"), 
            },
            beforeSend: function () {

            },
            success: function (data) {

                ok();
            },
            error: function () {
                alert('error');
            }
        })

});

$(".control-del").click(function () {

    var $this = $(this);
    artDialog.confirm("删除提示", "确认删除么?", function () {

        $.ajax({
            type: "POST",
            url: "/Admin/CommiteDel/",
            async: false,
            data: {
                id: $this.attr("data")
            },
            beforeSend: function () {

            },
            success: function (data) {
                if (data == "ok") {
                    $this.parent().parent().parent().parent().slideUp("500");
                } else {
                    art.dialog({
                        title: '操作提示',
                        id: "o_tip",
                        icon: 'succeed',
                        content: data,
                        resize: false,
                        time: 3,
                        lock: true
                    });
                }

            },
            error: function () {
                alert('error');
            }
        })

    });
});
//
$(".ui-tip-close").click(function () {
    $(".ui-waper").slideUp(200);
});
$(".input-tip").click(function () {
    $(".ui-waper").slideDown(200);
});