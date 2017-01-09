/**
 * @fileoverview wd1998 前端框架集, Wait perfect
 *
 * @author Liuxey
 */

// 框架命名空间
var _WD = 'WD';

(function(wd, window, undefined){
    var _wd = window[wd];

    if (!_wd) {
        _wd = {};
    }

    // 正则表达式
    _wd.regular = {
        // 邮箱
        email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,

        // URL
        url: /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-.\/?%&=]*)?(#\w*)?$/,

        // 手机
        mobile: /^(13|15|14|17|18)[0-9]{9}$/,

        // 身份证
        idcard: /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/,

        // 密码
        pwd: /^\w{6,18}$/,

        //验证码
        captcha: /^\d{6}$/,
        
        // 用户名
        userName: /^[(\u4e00-\u9fa5)|A-Za-z]+[\w]*$/,

        // 判空
        isEmpty: function(v) {
            switch (typeof v) {
                case 'undefined' : return true;
                case 'string' : if($.trim(v).length == 0) return true; break;
                case 'boolean' : if(!v) return true; break;
                case 'number' : if(0 === v) return true; break;
                case 'object' :
                    if(null === v) return true;
                    if(undefined !== v.length && v.length==0) return true;
                    for(var k in v){return false;} return true;
                    break;
            }
            return false;
        }
    }

    // UI
    _wd.ui = {

        /**
         * @fileoverview 可输可选控件
         *
         * @param option 包含：data,hiddenId,showId,onSelect
         *
         * @return 控件ID
         */
        inputSelect : function(option) {
            var widgetId = "wd_ui_inputSelect";

            var datas = option.data;
            var hiddenId = option.hiddenId;
            var showId = option.showId;
            var onSelect = option.onSelect;

            // 如果已经有了控件或者没找到showID或者没有数据列表则不显示
            if ($("#" + widgetId)[0] || !$("#" + showId)[0] || !datas || datas.length == 0) {
                return;
            }


            var template = '<div class="SelectUl" id="'+widgetId+'"><ul>';
            for(var index in datas) {
                var data = datas[index];
                template += '<li wdValue="'+data.id+'">'+data.value+'</li>'
            }
            template += '</ul></div>';

            $("body").append(template);
            var offset = $("#" + showId).offset();
            $("#" + widgetId).css("left", offset.left);
            $("#" + widgetId).css("top", offset.top + $("#" + showId).outerHeight());

            $("#" + widgetId + " ul li").on("click", function(){
                var id = $(this).attr("wdValue");
                var value = $(this).html();

                // 如果onSelect返回false ，则不关闭
                if (onSelect(id, value) === false) {

                    // 其他都关闭控件
                } else {
                    $("#" + widgetId).remove();
                }
            });

            _wd.ui.bindClose(widgetId, showId);

            return widgetId;
        },

        bindClose : function(widgetId, showId) {
            $(document).on("click", function(e) {
                e = e || event;
                var target = $(e.target);
                if (target.closest("#" + widgetId).length == 0 && target.closest("#" + showId).length == 0) {
                    $("#" + widgetId).remove();
                    $(document).off("click");
                }
            });
        },

        /**
         * 分页控件JS版
         *
         * @param option id|pageNo|pageSize|totalRecord|totalPage|onSelect
         */
        paging : function(option) {
            var id = option.id;
            var pageNo = option.pageNo;
            var pageSize = option.pageSize;
            var totalRecord = option.totalRecord;
            var totalPage = option.totalPage;
            var onSelect = option.onSelect;

            var t = '';
            if ( (!totalRecord || !/^\d+$/.test(totalRecord)) && (!totalPage || !/^\d+$/.test(totalPage))) {
                t = '参数错误';
            } else if ( (!pageNo || !/^\d+$/.test(pageNo)) || (!pageSize || !/^\d+$/.test(pageSize))){
                t = '参数错误';
            } else if (!totalPage || !/^\d+$/.test(totalPage)) {
                if (totalRecord > 0) {
                    totalPage  = (parseInt(totalRecord) + parseInt(pageSize) - 1) / parseInt(pageSize);
                } else {
                    totalPage = 1;
                }
            }
            t += '<div class="page_container "> \
                <div class="div_page down_page_container">';
            if (pageNo > 1) {
                t += '<div class="up_page" onclick="'+onSelect+'('+(pageNo - 1)+', '+totalRecord+', '+pageSize+')">上一页</div>';
            } else {
                t += '<div class="up_page">上一页</div>';
            }
            t += '<div class="page_num">';

            if (totalPage <= 7) {

                for (var i = 1; i <= totalPage; i++) {
                    if (pageNo == i) {
                        t += '<span class="now_page">'+pageNo+'</span>'
                    } else {
                        t += '<span onclick="'+onSelect+'('+i+', '+totalRecord+', '+pageSize+')">'+i+'</span>';
                    }
                }

            } else {

                if (pageNo <= 3) {
                    for (var i = 1; i <= pageNo + 2; i++) {
                        if (pageNo == i) {
                            t += '<span class="now_page">'+i+'</span>';
                        } else {
                            t += '<span onclick="'+onSelect+'('+i+', '+totalRecord+', '+pageSize+')">'+i+'</span>';
                        }
                    }
                    t += '<span>...</span> \
                        <span onclick="'+onSelect+'('+totalPage+', '+totalRecord+', '+pageSize+')">'+totalPage+'</span>';

                } else if (totalPage - pageNo <= 3) {
                    t += '<span onclick="'+onSelect+'('+1+', '+totalRecord+', '+pageSize+')"">1</span> \
                        <span>...</span>';
                    for (var i = pageNo - 2; i <= totalPage; i++) {
                        if (pageNo == i) {
                            t += '<span class="now_page">'+pageNo+'</span>';
                        } else {
                            t += '<span onclick="'+onSelect+'('+i+', '+totalRecord+', '+pageSize+')">'+i+'</span>';
                        }
                    }

                } else {
                    t += '<span onclick="gotoPage(${1}, ${page.totalRecord}, ${page.pageSize})">1</span> \
                        <span>...</span>';
                    for (var i = pageNo - 2; i <= pageNo + 2; i++) {
                        if (pageNo == i) {
                            t += '<span class="now_page">'+pageNo+'</span>';
                        } else {
                            t += '<span onclick="'+onSelect+'('+i+', '+totalRecord+', '+pageSize+')">'+i+'</span>';
                        }
                    }
                    t += '<span>...</span> \
                        <span onclick="'+onSelect+'('+totalPage+', '+totalRecord+', '+pageSize+')">'+totalPage+'</span>';
                }

            }
            t += '</div>';
            if (pageNo <= totalPage) {
                t += '<div class="down_page" onclick="'+onSelect+'('+(pageNo + 1)+', '+totalRecord+', '+pageSize+')"">下一页</div>';
            } else {
                t += '<div class="down_page">下一页</div>';
            }
            t += '</div> \
                </div>';

            $("#" + id).html(t);
        },

        /**
         * 自定义弹出框组件
         *
         * @param msg 提示内容
         * @param callback 回调函数
         * @param timeout 关闭时间
         * @param type 显示类型：默认right，可选：error
         */
        alert : function(msg, callback, timeout, type) {
            if (!type) {
                type = "right";
            }
            $("body").append('<div style="width:348px; height:190px; border:6px solid #d9d9d9; margin:100px auto 0 auto; background:#f1f1f1;" id="wd_ui_alert"> \
                            <div style="width:180px; height:50px;  font-size:16px; color:#7d7d7d; margin-top:68px; margin-left:110px; float:left;"><img src="'+image_path+'/'+type+'48x48.png" /></div> \
                        <div style="width:100px; height:30px; margin-top:-30px; font-size:16px; color:#7d7d7d; display:block; margin-left:160px; float:left;">'+msg+'</div> \
                        </div>');
            $this = $("#wd_ui_alert");
            $win = $(window);

            $this.css({
                position: "absolute",
                left : (($win.width() - $this.outerWidth()) / 2) + $win.scrollLeft() + 'px',
                top : (($win.height() - $this.outerHeight()) / 2) + $win.scrollTop() - 100 + 'px'
            })

            setTimeout(function(){
                $("#wd_ui_alert").remove();
                if (callback){
                    callback();
                }
            }, timeout)
        },

        /**
         * 自定义提示登录框
         *
         * @param url
         * @param callback
         * @param timeout
         */
        alert_login : function(msg, url, callback, timeout) {
            $("body").append('<div class="" style="width:348px; height:190px; border:6px solid #d9d9d9; margin:100px auto 0 auto; background:#f1f1f1;" id="wd_ui_alert_login"> \
                <span class="" style="float:right; background:url('+image_path+'/close_2.jpg) no-repeat; width:21px; height:20px; text-indent:-9999px; overflow:hidden; cursor:pointer;">关闭</span> \
            <div class="" style="margin-left:30px; line-height:50px; font-size:16px; color:#7D7D7D; margin-top:50px;"><img src="'+image_path+'/warning_48x48.png" style="float:left;" />'+msg+'</div> \
            <p class="" style="width:100%; float:left; text-align:center; margin-top:10px;"><a href="'+url+'" style="text-decoration:underline;"><b>&nbsp;点击这里进行登陆&nbsp;</b></a></p> \
            </div>');

            $this = $("#wd_ui_alert_login");
            $win = $(window);

            $this.css({
                position: "absolute",
                left : (($win.width() - $this.outerWidth()) / 2) + $win.scrollLeft() + 'px',
                top : (($win.height() - $this.outerHeight()) / 2) + $win.scrollTop() - 100 + 'px'
            })

            setTimeout(function() {
                $("#wd_ui_alert_login").remove();
                if (callback){
                    callback();
                }
            }, timeout)
        }
    }

    _wd.prod = {

        // 将原始的字节数计算成客观的数字，如：10M、1.1G等
        calcSize : function(size) {
            var r = "";
            if (size > 1073741824) {
                r = Math.floor((size/1073741824) * 100) / 100;
                return  r + "G";
            } else if (size > 1048576) {
                r = Math.floor((size / 1048576) * 100) / 100;
                return r + "M";
            } else if (size > 1024) {
                r = Math.floor((size/1024) * 100) / 100;
                return r + "K";
            } else if (size < 0){
                return "0G";
            } else {
                return size + "B";
            }
        }
    }

    _wd.util = {
        arrayContains : function (a, obj) {
            for (var index in a) {
                if (a[index] == obj) {
                    return true;
                }
            }
            return false;
        },

        imageResize : function (path, size) {
            var pre = path.substring(0, path.lastIndexOf("."));
            var post = path.substring(path.lastIndexOf("."));
            imgPath = pre + "_" + size + post;

            return imgPath;
        }
    }

    window[wd] = _wd;
})(_WD, window)
;
