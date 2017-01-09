



$("#lblUrlTitle").text("html静态化设置");
$("#btnClear").button().click(function () {

    artDialog.confirm('文件删除', "确认清空静态页么?", function () {

        $.ajax({
            type: "POST",
            url: "/Admin/ClearFile/",
            async: true,

            data: {
                url: $("#hfPath").val()
            },
            beforeSend: function () {
                _cr = art.dialog({
                    title: '文件删除',
                    id: "opte",
                    icon: 'face-smile',
                    content: "<p style=''>正在操作,请稍候...</p>",
                    resize: false,
                    lock: true
                });
            },
            success: function (data) {
                if (data == "ok") {
                    $.each($(".tbl tr"), function () {
                        var $this = $(this);
                        $this.fadeOut(300, function () {
                            $this.remove();
                        });
                    });
                    _cr.close();
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

$("#btnSet").button().click(function () {

    art.dialog({
        title: '静态化目录设置',
        id: "set",
        content: "<p style=''><label>当前目录:</label><input style='margin-left:10px;width:100px;' type='text' id='txtTemp' /></p>",
        resize: false,
        ok: function () {

            $.ajax({
                type: "POST",
                url: "/Admin/MLModify/",
                async: true,
                data: {
                    name: $("#txtTemp").val()
                },
                beforeSend: function () {
                    tempvalue = $("#txtTemp").val();
                },
                success: function (data) {
                    $("#hfPath").val("/" + tempvalue + "/");
                },
                error: function () {
                    //alert('error');
                }
            });
        },
        lock: true
    });
    $("#txtTemp").val($("#hfPath").val().replace("/", "").replace("/", "")).select();
});


var i = $(window.parent.document).find(".d-main");
setIfameHeight()

$(window).resize(function () {
   setIfameHeight();
});

function setIfameHeight() {
    if (i[0]) {
        $("#box").css("height", getInitHeight());
    }
}

function getInitHeight() {
    var $height = i.height() - 100;
    console.log(i[0])
    return $height;
}

$("#box").mCustomScrollbar({
    autoHideScrollbar: true,
    theme: "light-thin"
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
