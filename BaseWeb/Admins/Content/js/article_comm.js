
var tag = new Array();
setTag();
function setTag() {
    $("#tag a").click(function () {
        tag.push($(this).text());
        tag = $.unique(tag).sort();
        $("#article_tag").val(tag.toString());
        //console.log(tag);
    });
}
$("#article_tag").blur(function () {
    var _tag = $("#article_tag").val();
    tag = new Array();
    $.each(_tag.split(','), function (i, it) {
        tag.push(it);
    });
});

$(".btns").click(function () {

    if ($.trim($("#txtTag").val()) == "") {
        art.dialog({
            title: '标签添加反馈',
            icon: 'error',
            content: "请输入标签",
            resize: false,
            padding: "10px",
            lock: false
        });
        return;
    }

    $.ajax({
        url: "/Admin/AddTag/",
        async: true,
        type: "POST",
        data: { name: $("#txtTag").val() },
        success: function (result) {
            if (result == "ok") {
                $(".tag-waper").append("<q><a>" + $("#txtTag").val() + "</a><del data=''>x</del></q>")
                setTag();
                $("#txtTag").val("");
            } else {
                art.dialog({
                    title: '标签添加反馈',
                    icon: 'error',
                    content: result,
                    resize: false,
                    padding: "10px",
                    lock: false
                });
            }
        }
    });
});




$(".btnPL").click(function () {
    $(".tag-waper del").toggle().parent().toggleClass("q");
});

$(".tag-waper del").click(function () {
    var $this = $(this);
    artDialog.confirm('标签删除', "<p style='padding-top:0px'>确认删除么?</p>", function () {
        $.ajax({
            type: "POST", 
            url: "/Admin/DelTag/",
            async: true,
            title: '标签删除',
            data: {
                id: $this.attr("data")
            },
            beforeSend: function () {

            },
            success: function (data) {
                $this.parent().hide("500");
            },
            error: function () {
               
            }
        });

    });
});