var i = $(window.parent.document).find("iframe");
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
    var $height = i.height();
    return $height;
}

$("#box").mCustomScrollbar({
    autoHideScrollbar: true,
    theme: "light-thin"
});
var tag = new Array();
setTag();
function setTag() {
    $("#tag a").click(function () {
        tag.push($(this).text());
        tag = $.unique(tag).sort();
        $("#product_tag").val(tag.toString());
        //console.log(tag);
    });
}
$("#product_tag").blur(function () {
    var _tag = $("#product_tag").val();
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
    artDialog.confirm( "<p style='padding-top:0px'>确认删除么?</p>", function () {
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