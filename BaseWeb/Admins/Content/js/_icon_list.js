
 

    $("#lblUrlTitle").text("添加桌面图标");

    $("#btnAddIcon").button();

    $(".control-del").click(function () {
        if (!confirm("确认删除么?")) {
            return;
        }
        var $this = $(this);
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


    $(".control-modify").click(function () {

        window.location.href = "/Admin/IconEdit/" + $(this).attr("data");
        //edit($(this));
    });
    $(".tbl tr:not(:first)").dblclick(function () {

        window.location.href = "/Admin/IconEdit/" + $(this).attr("data");
        //edit($(this));
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



    $(".control-stop").click(function () {

        var $this = $(this);
        //alert($this.attr("data"));
        $.ajax({
            type: "POST",
            url: "/action.ashx?method=webStatusDisabled",
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

           
