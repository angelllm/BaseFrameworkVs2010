



$("#lblUrlTitle").text("索引生成与配置");
$("#btnHtml").button().click(function () {

    artDialog.confirm('文章索引生成', "确认生成文章索引吗?", function () {

        $.ajax({
            type: "POST",
            url: "/Admin/SearchIndex/",
            async: true,

            data: {

        },
        beforeSend: function () {
            _cr = art.dialog({
                title: '正在生成',
                id: "opte",
                icon: 'face-smile',
                content: "<p style=''>正在操作,请稍候...</p>",
                resize: false,
                lock: true
            });
        },
        success: function (data) {
            if (data == "ok") {
                _cr.close();
                art.dialog({
                    title: '操作提示',
                    id: "opte",
                    icon: 'succeed',
                    content: "<p style=''>操作成功!</p>",
                    resize: false,
                    lock: true
                });
            } else {
                _cr.close();
                art.dialog({
                    title: '操作反馈',
                    icon: 'error',
                    content: data,
                    resize: false,
                    padding: "10px",
                    lock: false
                });
            }
        },
        error: function () {
            //alert('error');
        }
    });

});
});
  

$(".control-del").click(function () {

    var $this = $(this).parent().parent().parent().parent();
    var $title = $this.find("td:first").text();
    artDialog.confirm($title + '文件删除', "<p style='padding-top:0px'>确认删除么?</p>", function () {

        $.ajax({
            type: "POST",
            url: "/Admin/DelFile/",
            async: true,

            data: {
                url: $this.attr("path")
            },
            beforeSend: function () {

            },
            success: function (data) {
                $this.slideUp("500");
            },
            error: function () {
                //alert('error');
            }
        });

    });
     

});
