

$(function () {



    $("#btnAdd").button().click(function () { window.location.href = '/Admin/ArticleAdd/'; });

    $(".control-del").click(function () {

        var $this = $(this);
        artDialog.confirm("确认删除么?", function () {

            $.ajax({
                type: "POST",
                url: "/Admin/ArticleDel/",
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


    $(".control-stop").click(function () {

        var $this = $(this);
        $.ajax({
            type: "POST",
            url: "/Admin/ArticleStop/",
            async: false,
            data: {
                id: $this.attr("data")
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

    $(".switch input[type=checkbox]").change(function () {

        var $this = $(this);
        var $p = $this.parent();
        var $tr = $this.parent().parent().parent();
        console.log($tr[0])
        var $type = "status";
        var $t = '<span class="fl icn icn-t" style="margin-right:5px;"><img alt="文章已推荐" title="文章已推荐" src="/admins/content/images/T.png" /></span>';
        var $j = '<span class="fl icn icn-j" style="margin-right:5px;"><img alt="文章已静态化" title="文章已静态化" src="/admins/content/images/j.png" /></span>';
        if ($p.hasClass("switch-is-top")) {
            $type = "top";
            if ($tr.find(".title span").hasClass("icn-t")) {
                $tr.find(".title").find(".icn-t").remove();
            } else {
                if ($tr.find(".title span").hasClass("icn-f")) {
                    $tr.find(".title").find(".icn-f").after($t);
                } else {
                    $($t).prependTo($tr.find(".title"));
                } 
            }
        }
        else if ($p.hasClass("switch-html")) {
            $type = "html";
            if ($tr.find(".title span").hasClass("icn-j")) {
                $tr.find(".title").find(".icn-j").remove();
            } else {
                $($j).prependTo($tr.find(".title .art-title"));
            }
        }
        $.ajax({
            type: "POST",
            url: "/Admin/ArticleStatus/",
            async: false,
            data: {
                id: $this.attr("data"),
                type: $type
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


    $(".control-modify").click(function () {
        window.location.href = '/Admin/ArticleEdit/' + $(this).attr("data") + "/";
    });

    $(".tbl tr:not(:first)").dblclick(function () {
        window.location.href = '/Admin/ArticleEdit/' + $(this).attr("data") + "/";
    });
    $(".control-content").click(function () {
        window.location.href = '/Admin/Articlecontent/' + $(this).attr("data") + "/";
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



    $(".edit-win").tabs();
    $("#lblUrlTitle").text("文章管理");

    $("#btnAdd").button();




