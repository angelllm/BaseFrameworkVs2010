function hideMenu() { $("#menu").hide(); }
function getClass(obj) {

    return obj.attr("class").replace(" ", "_").replace("-", "_").replace(" ", "_").replace("-", "_").replace(" ", "_").replace("-", "_").replace(" ", "_").replace("-", "_").replace(" ", "_").replace("-", "_");
}
function getName(obj) {

    return obj.find("input").val();
}
function getResize(obj) {

    return $.trim(obj.attr("resize")) == "True" ? true : false;
}



function setPostion(id, x, y) {


    $.ajax({
        type: "POST",
        url: "/admin/Ajax/setPostion",
        async: true,
        data: {
            id: id,
            x: x,
            y: y,
            method: "setPostion"
        },
        beforeSend: function () {
            // alert('start');
        },
        success: function (data) {
            // alert(data);

        },
        error: function () {
            alert('error');
        }
    })

}


 

    $(".icon").draggable(

                {
                    containment: 'window',
                    refreshPositions: true,
                    //snap: 'span' ,
                    stop: function (event, ui) {
                        var _x = ui.helper.position().left;
                        var _y = ui.helper.position().top;
                        var _id = ui.helper.attr("id");
                        //setPostion(_id, _x, _y);
                    }

                }

            ).selectable();



    function getTime() {

        var d = new Date();
        var m = d.getMinutes();
        $("#show-time").html(d.getHours() + ":" + (m < 10 ? "0" + m : m));
        $("#show-time-info").html(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "<p>星期" + d.getDay() + "</p>");
        setTimeout(getTime, 1000);

    }
    getTime();

    $("#show-time").hover(function () { $("#show-time-info").fadeIn(200); }, function () { $("#show-time-info").fadeOut(200); });

    $("#windows").click(function () {

        // $("#menu").toggle();
        //window.location.href = "/admin/manage/";

    });

    $(".icon").click(function () {

        $(".icon").removeClass("icon-hover");
        $(this).addClass("icon-hover");
        hideMenu();

    }).dblclick(function () {

        var init_id = getClass($(this));
        var init_name = getName($(this));
        var init_img = $(this).attr("icon");
        var tpl = $(this).attr("tpl");
        var url = $(this).attr("url");
        tpl = typeof (tpl) == "undefined" || tpl == "0" ? "" : tpl;
        url = typeof (url) == "undefined" || tpl == "0" ? "" : url;

        var art_obj = init_win(
                        init_id,
                        init_name,
                        tpl,
                        url,
                        getResize($(this)),
                        $(this)

                      );

        var temp = "<div for={1} class=\"taskbar {2}\"><img src='{3}' /><label>{0}</label><div class='clear'></div></div>";
        if (!$("#tool-bar").find(".taskbar").hasClass(init_id)) {
            $("#tool-bar").append(temp.replace("{0}", init_name).replace("{1}", init_id).replace("{2}", init_id).replace("{3}", init_img));
        }


    });


    $("#desk").click(function () {

        $(".icon").removeClass("icon-hover");
        $(".icon span").show().next().hide();
        hideMenu();
    });

    $(".icon input").blur(function () {

        $(this).hide().prev().show();

    });

    $(".icon span").dblclick(function () {

        $(this).hide().next().show().focus();

    });

    $("#desk").height($(window).height());


    $(".taskbar").on("click", function () {

        var id = $(this).attr("class").split(' ')[1];
        var flag = art.dialog.list[id]["showhide"]; //自定义showhide 属性 
        if (flag) {
            art.dialog.list[id].show();
        } else {
            art.dialog.list[id].hide();
        }


    }).on("dblclick", function () {

    });


    function init_win(id, title, content, url, resize, obj) {

        var w = obj.attr("init_w");
        var h = obj.attr("init_h");
        var def_url_width = "50%",
                def_url_height = "65%",
                def_tpl_width = "40%",
                def_tpl_heiht = "40%";

        var art_obj;
        if (url != "") {

            w = typeof (w) == "undefined" || w == "" ? def_url_width : w + "px";
            h = typeof (h) == "undefined" || h == "" ? def_url_height : h + "px";
            art_obj = art.dialog.open(
                    url,
                    {
                        title: title,
                        id: id,
                        width: w,
                        height: h,
                        close: function () {
                            //窗口关闭的时候把工具栏的显示也关闭
                            $("." + id).remove();
                        },
                        resize: resize
                    }
                );


        }
        else {


            w = typeof (w) == "undefined" || w == "" ? def_tpl_width : w + "px";
            h = typeof (h) == "undefined" || w == "" ? def_tpl_heiht : h + "px";

            art_obj = art.dialog({
                title: title,
                content: $("#" + $("#" + content).html()).html(),
                id: id,
                width: w,
                height: h,
                close: function () {
                    //窗口关闭的时候把工具栏的显示也关闭
                    $("." + id).remove();
                },
                init: function () {

                    //**********************// 
                    //this.size("80%", "90%").position(0,0); 
                    //*********************//
                    //var list = art.dialog.list;

                },
                resize: resize
                //icon: 'succeed',
                //follow: document.getElementById('btn2'),

            });

        }


        $(".aui_content").removeAttr("style"); //去除自定义的 padding 和 margin 
        return art_obj;
    }