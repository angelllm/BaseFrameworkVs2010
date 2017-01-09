



$("#lblUrlTitle").text("首页静态化设置");
$("#btnHtml").button().click(function () {

    artDialog.confirm('首页文件生成', "确认生成首页静态化文件吗?", function () {

        $.ajax({
            type: "POST",
            url: "/Admin/IndexHtmlFile/",
            async: true,

            data: {

        },
        beforeSend: function () {
            _cr = art.dialog({
                title: '文件正在生成',
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
                window.location.reload();
            } else {
                _cr.close();
                art.dialog({
                    title: '文件删除反馈',
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
