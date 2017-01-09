
$(function () {
    var _prev_win = $(window.parent.document);
    if ($("#hfTid").val() == "40") {
        _prev_win.find(".table-mm-content").css({ "overflow-y": "scroll" });
        _prev_win.find(".iframe").height($(".tbl").height());
    } else {
        _prev_win.find(".table-mm-content").css({ "overflow-y": "hide" });
        _prev_win.find(".iframe").height("100%");
    }

    $("#lblUrlTitle").text("页面设置");
    $("#btnAdd").button().click(function () { window.location.href = "/Admin/PageAdd/" + $(this).attr("data") + "/"; });

    $(".switch input[type=checkbox]").change(function () {

        var $this = $(this);
        var url = "/Admin/PageStatus/";
        var type = "";
        if ($this.parent().hasClass("switch-url-type")) {
            type = "1";
        }
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            data: {
                id: $this.attr("data"),
                type: type
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
        artDialog.confirm("确认删除么?", function () {

            $.ajax({
                type: "POST",
                url: "/Admin/PageDel/",
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

    $(".control-modify").click(function () {
        window.location.href = "/Admin/PageEdit/" + $(this).attr("data") + "/";
    });
    $(".tbl tr:not(:first)").dblclick(function () {
        window.location.href = "/Admin/PageEdit/" + $(this).attr("data") + "/";
    });
});

function ok() {

    art.dialog({
        title: '操作提示',
        id: "win_tip",
        icon: 'succeed',
        content: "操作成功!",
        resize: false,
        time: 1,
        lock: true

    });

};
          

        

           

               



         