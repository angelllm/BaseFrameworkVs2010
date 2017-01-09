
$(function () {


    $("#lblUrlTitle").text("添加桌面图标");

    $("#btnAddIcon").button();

    $(".control-del").click(function () {
        var $this = $(this);
        artDialog.confirm("确认删除么?", function () {

            $.ajax({
                type: "POST",
                url: "/Admin/IconDel/",
                async: false,
                data: {
                    id: $this.attr("data")
                },
                beforeSend: function () {

                },
                success: function (data) {

                    window.location.reload();
                },
                error: function () {
                    alert('error');
                }
            })
        });
    });

    $(".control-modify").click(function () {

        edit($(this));
    });
    $(".tbl tr:not(:first)").dblclick(function () {

        edit($(this));
    });

    $(".control-stop").click(function () {

        var $this = $(this);
        //alert($this.attr("data"));
        $.ajax({
            type: "POST",
            url: "/Admin/IconEnable/",
            async: false,
            data: {
                id: $this.attr("data"),
                col: $this.attr("col")
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

    $(".control-copy").click(function () {

        var $this = $(this);

        $.ajax({
            type: "POST",
            url: "/Admin/IconAdd/",
            async: false,
            data: {
                id: $this.attr("data")
            },
            beforeSend: function () {

            },
            success: function (data) {
                window.location.reload();
            },
            error: function () {
                alert('error');
            }
        })
    });

    $(".switch input[type=checkbox]").change(function () {

        var $this = $(this);
        //alert($this.attr("data"));
        $.ajax({
            type: "POST",
            url: "/Admin/EditIconStatus/",
            async: false,
            data: {
                id: $this.attr("data"),
                col: $this.attr("col")
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



});

function ok() {

    art.dialog({
        title: '操作提示',
        id: "win_tip",
        icon: 'succeed',
        content: "操作成功!",
        resize: false,
        time: 1,
        //follow: $this[0],
        lock: true

    });

};

function edit(obj) {

    var tab = $("#temp-modify").clone(true).html();
    //$("#temp-modify").remove();
    var id = $(obj).attr("data");
    //console.log(id);
    art.dialog({
        title: $(obj).attr("data-title") + '修改',
        id: "win_" + id,
        content: tab,
        resize: false,
        init: function () {

            $("#edit-win").tabs();

            $.ajax({
                type: "POST",
                url: "/Admin/IconEdit/",
                async: false,
                data: {
                    id: id
                },
                beforeSend: function () {


                },
                success: function (data) {

                    $("#txtId").val(data.icon_id);
                    $("#txtName").val(data.icon_name);
                    $("#txtIconCss").val(data.icon_item_css);
                    $("#txtCss").val(data.icon_css);
                    $("#txtX").val(data.icon_position_x);
                    $("#txtY").val(data.icon_position_y);
                    $("#txtUrl").val(data.icon_url);
                    $("#txtImage").val(data.icon_image);
                    $("#txtInitWidth").val(data.icon_init_w);
                    $("#txtInitHeight").val(data.icon_init_h);
                    if (data.icon_resize) {
                        $("#cbkIsResize").attr("checked", "checked");
                    }
                    if (data.icon_status == 1) {
                        $("#cbkStatus").attr("checked", "checked");
                    }

                },
                error: function () {
                    alert('error');
                }
            })


        },
        ok: function () {

            $.ajax({
                type: "POST",
                url: "/Admin/IconModify/",
                async: false,
                data: {
                    id: id,
                    icon_name: $("#txtName").val(),
                    icon_item_css: $("#txtIconCss").val(),
                    icon_css: $("#txtCss").val(),
                    icon_position_x: $("#txtX").val(),
                    icon_position_y: $("#txtY").val(),
                    icon_url: $("#txtUrl").val(),
                    icon_init_w: $("#txtInitWidth").val(),
                    icon_init_h: $("#txtInitHeight").val(),
                    icon_image: $("#txtImage").val(),
                    icon_resize: $("#cbkIsResize").attr("checked") == "checked" ? true : false,
                    icon_status: $("#cbkStatus").attr("checked") == "checked" ? 1 : 0
                },
                beforeSend: function () {

                    //                               art.dialog({
                    //                                   title: '正在执行操作...',
                    //                                   content: "<div class='loading'>正在执行操作,请稍后!</div>",
                    //                                   resize: false,
                    //                                   lock: true 
                    //                               });
                },
                success: function (data) {

                    location.reload();
                },
                error: function () {
                    alert('error');
                }
            })

        }

    });

}
