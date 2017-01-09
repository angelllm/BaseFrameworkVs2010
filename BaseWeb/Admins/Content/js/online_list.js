
$("#btnUpload").button().click(function () {
    $("#drop input").click();
});

$("#btnAdd").button().click(function () {
    //console.log($("#hfPath").val());
    art.dialog({
        title: '文件夹添加',
        id: "optes",
        content: '<lable for="txt_name">目录名:&nbsp&nbsp</lable><input type="text" id="txt_name" value="" />',
        resize: false,
        padding: "10px",
        ok: function () {
            var name = $("#txt_name").val();
            $.ajax({
                url: "/Admin/AddML/",
                async: true,
                type: "POST",
                data: { name: name, path: $("#hfPath").val() },
                success: function (result) {
                    if (result == "ok") {
                        window.location.reload();
                    } else {
                        art.dialog({
                            title: '文件夹添加反馈',
                            icon: 'error',
                            content: result,
                            resize: false,
                            padding: "10px",
                            lock: false
                        });
                    }
                }
            });

        },
        lock: false

    });

});

$("#lblUrlTitle").text("模板编辑");
$(".direc").click(function () {
    $("." + $(this).parent().attr("data")).toggle();
    $(this).toggleClass("direc-open");
});

var i = $(window.parent.document).find(".d-main");
  
$(window).resize(function () {
    setIfameHeight();
});
setIfameHeight();
function setIfameHeight() {
   
        $("#box").css("height", "600");
        //console.log("xxx");
}

function getInitHeight() {
    var $height = i.height() ; 
    return $height;
}

$("#box").mCustomScrollbar({
    autoHideScrollbar: true,
    theme: "light-thin"
});

$("#l-box").mCustomScrollbar({
    autoHideScrollbar: true,
    theme: "light-thin"
});
$(".toggle").parent().parent().hide();


$(".direct-tr").dblclick(function () {
    var $this = $(this);
    var $title = $this.find("td:first").text();
    art.dialog({
        title: $title + '文件夹修改',
        id: "opte",
        content: '<lable for="ml_name">目录名:&nbsp&nbsp</lable><input type="text" id="ml_name" value="' + $title + '" />',
        resize: false,
        padding: "10px",
        ok: function () {
            var name = $("#ml_name").val();
            $.ajax({
                url: "/Admin/ML/",
                async: true,
                type: "POST",
                data: { url: $this.attr("path"), name: name },
                success: function (result) {
                    if (result == "ok") {
                        $("." + $title).toggleClass($title, name);
                        var $path = $this.attr("path").replace($title, name);
                        $this.attr("path", $path).css({ background: "#69c5d2", color: "#c80000" }).find("td:eq(0)").text(name).next().next().text($this.find("td:eq(2)").text().replace($title, name));
                    } else {
                        art.dialog({
                            title: $title + '文件夹修改反馈',
                            icon: 'error',
                            content: result,
                            resize: false,
                            padding: "10px",
                            lock: false
                        });
                    }
                }
            });

        },
        lock: false

    });
    $("#ml_name").focus().select();

});



$(".file-tr").dblclick(function () {
    var $this = $(this);
    var $title = $.trim($this.find("td:first").text());
    //console.log($title);
    art.dialog({
        title: $title + '文件修改',
        id: "opte",
        width: 1150,
        height: 670,
        content: '<lable for="file_name">目录名:&nbsp&nbsp</lable><input type="text" id="file_name" value="' + $title + '" /></br><lable for="file_content">文件内容:&nbsp&nbsp</lable></br><textarea   id="file_content" style="margin: 0px; height: 625px; width: 1130px;" type="text" ></textarea>',
        resize: false,
        padding: "10px",
        ok: function () {
            var name = $("#file_name").val();
            var content = $("#file_content").val();
            $.ajax({
                url: "/Admin/SaveFile/",
                async: true,
                type: "POST",
                data: { url: $this.attr("path"), name: name, content: content },
                success: function (result) {

                    if (result == "ok") {
                        //modify path
                        var $path = $this.attr("path").replace($title, name);
                        $this.attr("path", $path).css({ background: "#69c5d2", color: "#c80000" }).find("td:eq(0)").text(name).next().next().text($this.find("td:eq(2)").text().replace($title, name));
                    } else {
                        art.dialog({
                            title: $title + '文件修改反馈',
                            icon: 'error',
                            content: result,
                            resize: false,
                            padding: "10px",
                            lock: false
                        });
                    }

                }
            });

        },
        lock: false

    });
    $.ajax({
        url: "/Admin/GetFile/",
        async: true,
        type: "POST",
        data: { url: $this.attr("path") },
        success: function (result) {


            if (result.indexOf("error:") == -1) {
                $("#file_content").text(result);
            } else {
                art.dialog({
                    title: $title + '文件读取情况反馈',
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

$(".img-tr").dblclick(function () {
    var $this = $(this);
    var $title = $.trim($this.find("td:first").text());
    art.dialog({
        title: $title + '文件修改',
        id: "opte",
        content: '<lable for="wj_name">文件名:&nbsp&nbsp</lable><input type="text" id="wj_name" value="' + $title + '" />',
        resize: false,
        padding: "10px",
        ok: function () {
            var name = $("#wj_name").val();
            $.ajax({
                url: "/Admin/ModifyFile/",
                async: true,
                type: "POST",
                data: { url: $this.attr("path"), name: name },
                success: function (result) {
                    if (result == "ok") {
                        $("." + $title).toggleClass($title, name);
                        var $path = $this.attr("path").replace($title, name);
                        $this.attr("path", $path).css({ background: "#69c5d2", color: "#c80000" }).find("td:eq(0)").text(name).next().next().text($this.find("td:eq(2)").text().replace($title, name));
                    } else {
                        art.dialog({
                            title: $title + '文件修改反馈',
                            icon: 'error',
                            content: result,
                            resize: false,
                            padding: "10px",
                            lock: false
                        });
                    }
                }
            });

        },
        lock: false

    });
    $("#ml_name").focus().select();

});

$(".control-modify").click(function () {
    $(this).parent().parent().parent().parent().dblclick();
});
$(".control-rename").click(function () {
    $(this).parent().parent().parent().parent().dblclick();
});

$(".control-del").click(function () {

    var $this = $(this).parent().parent().parent().parent();
    var $title = $this.find("td:first").text();
 
    if (!isHost) {

        art.dialog({
            title: $title + '文件删除',
            id: "opte",
            icon: 'error',
            content: "<p style='padding-top:20px'>请联系系统管理员!</p>",
            resize: false,
            lock: true

        });

    } else {


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
                    $("." + $title).slideUp("500");
                },
                error: function () {
                    //alert('error');
                }
            });

        });

    }


});
