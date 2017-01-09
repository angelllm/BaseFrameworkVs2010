 


function setPostion(id, x, y) { 

    $.ajax({
        type: "POST",
        url: "/admin/setPostion/",
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
            //alert('error');
        }
    })

}

function setIcon() {

    $(".icon").draggable(

    {
        containment: 'window',
        refreshPositions: true,
        helper: "clone",
        revert: false,
        opacity: 0.60,
        //snap: 'span' ,
        stop: function (event, ui) {
            var _x = ui.helper.position().left;
            var _y = ui.helper.position().top;
            var _id = ui.helper.attr("data");
            $(this).css({ left: _x + "px", top: _y + "px" });
            setPostion(_id, _x, _y);
        }
    }

    );
    //.selectable();
}

initIcon();
setIcon();

var dayArray = new Array("天","一","二","三","四","五","六");
function getTime() {

    var d = new Date();
    var m = d.getMinutes();
    $("#show-time").html(d.getHours() + ":" + (m < 10 ? "0" + m : m));
    $("#show-time-info").html(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "<p>星期" + dayArray[d.getDay()] + "</p>");
    setTimeout(getTime, 1000);

}
getTime();

$("#show-time").hover(function () { $("#show-time-info").fadeIn(200); }, function () { $("#show-time-info").fadeOut(200); });


function initIcon() {

    $(".icon").click(function () {

        $(".icon").removeClass("icon-hover");
        $(this).addClass("icon-hover");
        hideMenu();

    }).dblclick(function () {

        InitWin($(this));
        //设置可拖动
        setDraggable();
    });

}





$("#desk").click(function () {

    $(".icon").removeClass("icon-hover");
    $(".icon span").show().next().hide();
    hideMenu();
});
function hideMenu() { $("#menu").hide(); }

$(".icon input").blur(function () {
    var $this  = $(this);
    var $id = $(this).parent().attr("data");
    var $name = $(this).val();

    $.ajax({
        type: "POST",
        url: "/admin/IconName/",
        async: false,
        data: {
            id: $id ,
            name: $name
        },
        beforeSend: function () {
           
        },
        success: function (data) {
           $this.hide().prev().text($this.val()).show();
        },
        error: function () {
            alert('error');
        }
    })
});

$(".icon span").dblclick(function () {

    $(this).hide().next().show().focus();

});

$("#desk").height($(window).height());
//.selectable(
//    {
//        filter: '.icon',
//        start: function () {

//            $("#jqContextMenu,#shadow").hide();
//            $(".icon-hover").removeClass("icon-hover");

//            //$("div[style*=opacity]").hide();
//        }
//    }
//); 
 

function InitWin(obj) {

    var id = obj.attr("id");
    var index = $.inArray(id, icon_list);
    var _obj = null;
    if (index != -1) {
        var icon = icon_list[index + 1];
        var _w = parseInt(icon.w); //注意数据转换 不然dialog不识别宽度
        var _title = icon.name;
        var _h = parseInt(icon.h); //注意数据转换 不然dialog不识别高度
        var _resize = icon.resize;
        var _url = icon.url;

        _obj = art.dialog({

            title: _title,
            content: '<iframe src="' + _url + '" width="100%" height="100%" style="border: 0px;"  scrolling="no" frameborder="0"></iframe>',
            id: id,
            width: _w,
            padding: 0,
            height: _h,
            isCanMin: true,
            isCanMax: true,
            isCanClose: true, 
            close: function () {
                //窗口关闭的时候把工具栏的显示也关闭
                //$("." + id).remove();
            },
            initialize: function () {
                var temp = "<div for={1} class=\"taskbar {2}\"><img src='{3}' /><label>{0}</label><div class='clear'></div></div>";
                if (!$("#tool-bar").find(".taskbar").hasClass(id)) {
                    $("#tool-bar").append(temp.replace("{0}", _title).replace("{1}", id).replace("{2}", id).replace("{3}", icon.img));
                    //console.log(this);
                }
                taskbarInit();
            },
            toolBar: "." + id,
            beforeunload: function () {
                $("." + id).hide(function () { $("." + id).remove(); });
            },
            tool: function () {
                loading();
            },
            resize: _resize

        });
    }
    return _obj;
} 
 
var xy = {};
var $l = 0, $r = 0;
var flag = true;

function setDraggable() {
    $(".d-outer").parent().draggable(
    {
        //containment: 'window',
        //helper: "clone",
        revert: false,
        handle: ".d-title",
        opacity: 0.80,
        //scroll:true,
        //refreshPositions: true,
        //snap: 'span' ,
        start: function (event, ui) {
            $pageX = event.pageX;
            $now = Date.now();
            xy.x = event.pageX;
            xy.y = event.pageY;
            GOLABFLAG = true; //全局缩放
            //console.log("start:"+event.pageX);
        },
        drag: function (event, ui) {

            if (GOLABFLAG) {
         
                var ab = {
                    x: event.pageX,
                    y: event.pageY
                };
                if (ab.x - xy.x > 0) {
                    if (flag) {
                        $r++;
                        flag = false;
                        //console.log(ab.x - xy.x);
                        //console.log($r);
                    }
                } else if (ab.x - xy.x < 0) {
                    if (!flag) {
                        $l++;
                        flag = true;
                        //console.log(ab.x - xy.x);
                        //console.log($l);
                    }
                }

                if (new Date() - $now > 580) {

                    if ($r > 3 && $l > 3) {

                        var dialogs = artDialog.list;
                        for (var id in dialogs) {
                            var api = artDialog.list[id];
                            if (id !== GLOBAOBJ) {
                                api.shakeMe();
                                GOLABFLAG = false;
                                $r = 0;
                                $l = 0;
                            }
                        };
                        //artDialog.focus = artDialog.list[GLOBAOBJ]
                    }

                }
            }

        },
        stop: function (event, ui) {
            //timeTMP = new Array();
            //停止的时候重置 左右晃动次数 不然很容易缩放 太水 哈哈哈
            $r = 0;
            $l = 0;
            //重设位置
            var _x = ui.helper.position().left;
            var _y = ui.helper.position().top;
            $(this).css({ left: _x + "px", top: _y + "px" });
        }
    }
);
}

__SKIN = "twitter";
$('#skins-list').bind('click', function (event) {
    var target = event.target;
    var skin = target.innerHTML;
    if (target.nodeName === 'A') {
        setDemoStyle(skin);
        __SKIN = skin;
        $.post("/admin/WinStyle/", { style: skin }, function (result) {
            //console.log(result);
        });
        return false;
    };
});
var setDemoStyle = function (skin) {
$('#artDialog-skin')[0].href = '/Admins/Content/js/artDialog5.0.4/skins/' + skin + '.css?' + +new Date;
//$('#showSkinDialog')[0].innerHTML = skin; 
};

var s = $('#desk').contextMenu('myMenu1',
{
    bindings:
    {
        'shuaxin': function (t) {
            loading();
        },
        'xinjian': function (t) {
           
        },
        'beijing': function (t) {

            art.dialog({

                content: '<div class="beijing"><h1><a class="tab a-cur">纯背景色</a><a class="tab">背景图片</a></h1><div id="customWidget" style="height:auto;float:none;"><div id="colorSelector2" style="left:412px;top:10px;"><div id="color-panel"></div></div><div id="colorpickerHolder2" style="left:55px;display:block;height:173px;top:10px" height="173"></div></div><div id="backgroundimage"><form style="display:none;" id="upload"method="post"action="/Admin/doUpload/"enctype="multipart/form-data"><div id="drop"style="margin:0;padding:0;"><a>浏览</a><input type="file"name="upl"multiple="multiple"/></div><ul></ul></form><a class="update-data">文件上传</a><input type="hidden" id="hfBg" /><div id="bgImg"></div></div></div>',
                title: "背景图片",
                id: "setBg",
                width: 500,
                padding: 0,
                height: 320,
                isCanMin: false,
                isCanMax: false,
                resize: "False",
                isCanClose: true,
                skin: "idialog",

                initialize: function () {
                    $("#head").append('<script src="/Content/js/colorpicker/js/colorpicker.admin.js" type="text/javascript"></script><link href="/Content/js/colorpicker/css/colorpicker.css" rel="stylesheet" type="text/css" />');
                    $("#head").append('<script type="text/javascript"src="/Admins/Content/js/ajax_upload/assets/js/jquery.fileupload2.js"></script><script type="text/javascript"src="/Admins/Content/js/ajax_upload/assets/js/script.js"></script><script type="text/javascript"src="/Admins/Content/js/ajax_upload/assets/js/jquery.iframe-transport.js"></script><script type="text/javascript"src="/Admins/Content/js/ajax_upload/assets/js/jquery.knob.js"></script><script type="text/javascript"src="/Admins/Content/js/ajax_upload/assets/js/jquery.ui.widget.js"></script>');
                    var color = "#000";
                    var bg = "";

                    if (sys_config.type === 2) {
                        color = sys_config.background;
                        $("#color-panel").css("background", color);
                    }
                    else if (sys_config.type === 1) {
                        bg = sys_config.background;
                    }
                    jQuery('#colorpickerHolder2').ColorPicker({
                        flat: true,
                        color: '' + color + '',
                        onSubmit: function (hsb, hex, rgb) {
                            jQuery('#colorSelector2 div').css({ 'backgroundColor': '#' + hex, "transition": "background-color ease-in-out .3s" });
                            $("body").css({ 'backgroundColor': '#' + hex, "transition": "background-color ease-in-out .3s" });
                            $.post("/admin/SetBg/", { type: 2, url: "#" + hex }, function (result) {
                                GLOBASET = true;
                                console.log(result);
                            });
                        }
                    });

                    $(".beijing .tab").click(function () {

                        $(".beijing .a-cur").removeClass("a-cur");
                        $(this).addClass("a-cur");
                        if ($(this).index() == 0) {
                            $("#customWidget").show().next().hide();
                        }
                        else if ($(this).index() == 1) {
                            $("#customWidget").hide().next().show();
                            if (bg != "") {
                                $("#bgImg").append("<img src='" + bg + "' /><br><a class='img-del'>\u5220\u9664</a>")
                                initDelImg();
                            }
                        }
                    });

                    $(".update-data").click(function () {
                        __set_type = 3;
                        GLOBASET = false;
                        $("#drop input").click();

                    });


                },

                beforeunload: function () {

                }

            });
            setDraggable();
        },
        'guanji': function (t) {
            var color = GolbaWinBg;
            if (sys_config.type === 2) { color = sys_config.background; }
            art.confirmSmiple("确认退出吗?", function () {
                var api = artDialog.list[GLOBAOBJ];
                $(api.dom.footer[0]).fadeOut(200);
                $(api.dom.min[0]).fadeOut(200);
                $(api.dom.max[0]).fadeOut(200);
                $(api.dom.close[0]).fadeOut(200);
                api.title("关闭提示")
                api.content("正在关闭,请稍候...")
                setInterval(function () { window.location.href = "/admin/loginout/"; }, 5000);
                return false;
            }, function () { });
        }
    }
});

GolbaWinBg = "#0d70a7";
function initDelImg() {

    $(".img-del").on("click", function () {

        art.confirm2("确认删除吗?", function () {
            $(this).parent().fadeOut(200);
            //ajax update bg null
            $.post("/admin/SetBg/", { type: 2, url: "" + GolbaWinBg + "" }, function (result) {
                $("body").css({ "background": "" + GolbaWinBg +"" });
            });
        }, function () { });

    });
}


function loading() {

    $.ajax({
        type: "POST",
        url: "/admin/IconList/",
        async: true,
        data: {

    },
    beforeSend: function () {
        $.each($(".icon"), function (i, it) {
            $(it).fadeOut(200, function () {
                $(it).remove();
            });
        });
        icon_list = new Array();
    },
    success: function (data) {

        $.each(data, function (i, it) {
            var $item = $(it)[0];
            // console.log($item);
            icon_list.push("icon_" + $item.icon_id);
            icon_list.push({ id: '' + $item.icon_id + '', name: '' + $item.icon_name + '', resize: '' + $item.icon_resize + '', tpl: '' + $item.icon_tpl + '', w: '' + $item.icon_init_w + '', h: '' + $item.icon_init_h + '', url: '' + $item.icon_url + '', img: '' + $item.icon_image + '', x: '' + $item.icon_position_x + '', y: '' + $item.icon_position_y + '' });
            $("body").append(

                                '<div class="' + $item.icon_css + '" data="' + $item.icon_id + '" id="icon_' + $item.icon_id + '" style="left:' + $item.icon_position_x + 'px;top:' + $item.icon_position_y + 'px;">' +
                                    '<div class="item ' + $item.icon_item_css + '" style="background:url(' + $item.icon_image + ') no-repeat 50% 50%;"></div>' +
                                    '<span>' + $item.icon_name + '</span>' +
                                    '<input type="text" value="' + $item.icon_name + '" />' +
                                '</div> '
                    );
        });
        initIcon();
        setIcon();
        iconMenuInit();
        ReloadArt();
    },
    error: function () {

    }
});

}

function iconMenuInit() {
    $('.icon').contextMenu('myMenu2',
    {
        bindings:
        {
            'shanchu': function (t, target) {

                var $this = $(t);
                var $id = $this.attr("id").replace("icon_", "");
                art.confirmSmiple("确认删除吗?", function () {
                 
                    $.post("/admin/IconEnable/", { id: $id }, function (result) {
                        $this.fadeOut(200, function () { $this.remove(); });
                    });
                }, function () { });

            },
            'chongmingming':function(t, target){
                var $this = $(t);
                $this.find("input").show().select().prev().hide();
            }
        }

    });
}

iconMenuInit();

function ReloadArt() {
    $("#jsArt").attr("src", "/admins/Content/js/art.js?s=" + Math.random());
}


$("#show-desk").click(function () {

    var dialogs = artDialog.list;
    for (var id in dialogs) {
        var api = artDialog.list[id];
        api.mining();
    };
});

function taskbarInit() {
    //console.log("xx");
    $('.taskbar').contextMenu('myMenu3',
    {
        isToolBar: true,
        shadow: false,
        ToolBarTop: 80,
        bindings:
        {
            'zuixiaohua': function (t, target) {

                var $this = $(t);
                var $id = $this.attr("for");
                var api = artDialog.list[$id];
                api.min();
            },
            'zuidahua': function (t, target) {

                var $this = $(t);
                var $id = $this.attr("for");
                var api = artDialog.list[$id];
                if (api.config.mined) {
                    api.zIndex().visible().max();
                    api.config.mined = false;
                    api.config.mininged = false;
                } else {
                    api.zIndex().max();
                }  
            }
            ,
            'guanbi': function (t, target) {

                var $this = $(t);
                var $id = $this.attr("for");
                var api = artDialog.list[$id];
                api.close();
            }
        }

    });
    //console.log("yy");
}

$("#xinjian-list li a").click(function (event) {
    
    var $type = $(this).index()+1;
    
    $(this).dir({
                    dir_type:$type

                },
                event);

});


function setDir() {

    $(".dir").draggable(

    {
        containment: 'window',
        refreshPositions: true,
        helper: "clone",
        revert: false,
        opacity: 0.60,
        //snap: 'span' ,
        stop: function (event, ui) {
            var _x = ui.helper.position().left;
            var _y = ui.helper.position().top;
            var _id = ui.helper.attr("data");
            $(this).css({ left: _x + "px", top: _y + "px" });
            //setPostion(_id, _x, _y);
        }
    }

    );

}




(function ($) {

    $.fn.dir = function (options,event) {
        var $x = event.pageX;
        var $y = event.pageY;
        var defaults = {
            id: null,
            dir_name: "新建文件夹",
            background: "/admins/content/images/index/dir.png",
            x:$x,
            y:$y,
            dblclick:null,
            tmp:'<div class="dir" data="{$data}" id="dir_{$id}" style="left:{$x}px;top:{$y}px;background:url({$background}) no-repeat 50% 0%;">' +
                    '<div class="item "></div>' +
                    '<span style="display:none;">{$dir_name}</span>' +
                    '<input type="text"  style="display:block;" value="{$dir_hide_name}" class="focus" />' +
                '</div> ',
            load: null
        }
        var options = $.extend(defaults, options);
        var $dir; 
        this.init = function(){
            
            $dir =  options.tmp;
            $dir = 
                 $dir.replace("{$data}",options.id).
                     replace("{$id}",options.id).
                     replace("{$x}",options.x).
                     replace("{$y}",options.y).
                     replace("{$dir_name}",options.dir_name).
                     replace("{$background}",options.background).
                     replace("{$dir_hide_name}",options.dir_name);
   
            return this;
        };
        this.create = function(){
            $($dir).appendTo($("body"));
            return this;
        };
        this.done = function(){
            $(".focus").focus().select().blur(function () {
                $(this).hide().prev().text($(this).val()).show();
            });
            setDir(); 
            return this;
        };
        this.init().create().done();
        return this;
    }


})(jQuery);


 
 

