(function ($) {
    $.fn.kinMaxShow = function (user_options) {
        var default_options = {
            height: 400,
            intervalTime: 6,
            switchTime: 1000,
            hoverPause: true,
            easing: 'linear',
            imageAlign: 'center 0',
            button: {
                switchEvent: 'click',
                showIndex: false,
                normal: { width: '14px', height: '14px', lineHeight: '14px', right: '10px', bottom: '10px', fontSize: '10px', background: "#cccaca", border: "1px solid #ffffff", color: "#666666", textAlign: 'center', marginRight: '8px', fontFamily: "Verdana", float: 'left' },
                focus: { background: "#CC0000", border: "1px solid #FF0000", color: "#000000" }
            },
            callback: function (index, action) { }
        };
        options = jQuery.extend(true, {}, default_options, user_options);
        var k = {};
        k.selector = $(this).selector;
        if ($(this).length > 1) {
            $.error('kinMaxShow error[More than one selected object]');
            return false;
        }
        k.self = this;
        k.index = 0;
        k.lindex = 0;
        k.size = $(k.self).children('div').size();
        k.prename = 'KMSPrefix_' + k.selector.replace(/\W/ig, '') + '_';
        k.data = {};
        k.fn = {};
        k.onload = function () {
            $(k.self).css({ width: '100%', height: options.height, overflow: 'hidden', position: 'relative' }).children('div').addClass(k.prename + 'image_item').hide();
            k.init();
        };
        k.init = function () {
            k.setLayout();
            k.setAnimate();
        };
        k.setLayout = function () {
            $(k.self).children('div').wrapAll('<div class="' + k.prename + 'image_box"></div>');
            $('.' + k.prename + 'image_item', k.self).each(function () {
                var a = $(this).children('a');
                if (a.length) {
                    var image = a.children('img').attr('src');
                    a.children('img').remove();
                    a.addClass(k.prename + 'coverlink');
                } else {
                    var image = $(this).children('img').attr('src');
                    $(this).children('img').remove();
                }
                $(this).css({ background: 'url(' + image + ') no-repeat ' + options.imageAlign, 'z-index': 1 });
            });
            $('.' + k.prename + 'image_item', k.self).eq(0).css('z-index', '2');
            if (options.button.normal.display != 'none') {
                var button_list = '';
                for (i = 1; i <= k.size; i++) {
//                    if (options.button.showIndex) {
//                        button_list += '<li>' + i + '</li>';
//                    } else {
//                        button_list += '<li> </li>';
//                    }
                    button_list += '<li class="png">' + i + '</li>';
                }
                $(k.self).append('<ul class="' + k.prename + 'button">' + button_list + '</ul>');
                $('.' + k.prename + 'button li', k.self).eq(0).addClass(k.prename + 'focus');
            }
            k.setCSS();
            $('.' + k.prename + 'image_item:gt(0)', k.self).css('z-index', 1).css({ opacity: 0 });
            $('.' + k.prename + 'image_item', k.self).show();
            $(k.self).css({ overflow: 'visible', visibility: 'visible', display: 'block' });
        };
        k.setCSS = function () {
            var cssCode = '<style type="text/css">';
            cssCode += k.selector + ' *{ margin:0;padding:0;} ';
            cssCode += k.selector + ' .' + k.prename + 'image_box{width:100%;height:' + parseInt(options.height) + 'px;position:relative;z-index:1;} ';
            cssCode += k.selector + ' .' + k.prename + 'image_box .' + k.prename + 'image_item{width:100%;height:' + parseInt(options.height) + 'px;position:absolute;overflow:hidden;} ';
            cssCode += k.selector + ' .' + k.prename + 'image_box .' + k.prename + 'image_item a.' + k.prename + 'coverlink{width:100%;height:' + parseInt(options.height) + 'px;display:block;text-decoration:none;padding:0;margin:0;background:transparent;text-indent:0;outline:none;hide-focus:expression(this.hideFocus=true);} ';
            if (options.button.normal.display != 'none') {
                cssCode += k.selector + ' .' + k.prename + 'button{' + k.fn.objToCss(options.button.normal, ['top', 'right', 'bottom', 'left'], true) + ';position:absolute;list-style:none;z-index:2;overflow:hidden;_zoom:1;}';
                cssCode += k.selector + ' .' + k.prename + 'button li{' + k.fn.objToCss(options.button.normal, ['top', 'right', 'bottom', 'left']) + ';cursor:pointer;-webkit-text-size-adjust:none;}';
                cssCode += k.selector + ' .' + k.prename + 'button li.' + k.prename + 'focus{' + k.fn.objToCss(options.button.focus, ['top', 'right', 'bottom', 'left']) + ';cursor:default;}';
            }
            cssCode += '</style>';
            $(k.self).prepend(cssCode);
        }
        k.setAnimate = function () {
            options.callback.call($('.' + k.prename + 'image_item:eq(' + k.index + ')', k.self), k.index, 'fadeIn');
            var overDelayTimer;
            $('.' + k.prename + 'button', k.self).delegate('li', options.button.switchEvent, function () {
                _this = this;
                function setChange() {
                    k.index = $(_this).index();
                    k.setOpacity();
                }
                if (options.button.switchEvent == 'mouseover') {
                    overDelayTimer = setTimeout(setChange, 200);
                } else {
                    setChange();
                }
            })
            if (options.button.switchEvent == 'mouseover') {
                $('.' + k.prename + 'button', k.self).delegate('li', 'mouseout', function () {
                    clearTimeout(overDelayTimer);
                })
            }
            k.index = 1;
            k.lindex = 0;
            k.data.moveTimer = setInterval(k.setOpacity, options.intervalTime * 1000 + options.switchTime);
            if (options.hoverPause) {
                $(k.self).hover(function () {
                    clearInterval(k.data.moveTimer);
                }, function () {
                    k.data.moveTimer = setInterval(k.setOpacity, options.intervalTime * 1000 + options.switchTime);
                })
            }
        };
        k.setOpacity = function () {
            options.callback.call($('.' + k.prename + 'image_item:eq(' + (k.lindex) + ')', k.self), k.lindex, 'fadeOut');
            if (options.button.normal.display != 'none') {
                $('ul.' + k.prename + 'button li', k.self).removeClass(k.prename + 'focus');
                $('ul.' + k.prename + 'button li', k.self).eq(k.index).addClass(k.prename + 'focus');
            }
            $('.' + k.prename + 'image_item:animated', k.self).stop(true, false);
            $('.' + k.prename + 'image_item', k.self).css('z-index', 1);
            $('.' + k.prename + 'image_item', k.self).eq(k.index).css({ opacity: 0, 'z-index': 2 });
            $('.' + k.prename + 'image_item', k.self).eq(k.index).animate({ opacity: 1 }, options.switchTime, options.easing, function () {
                $('.' + k.prename + 'image_box .' + k.prename + 'image_item:not(:eq(' + k.index + '))', k.self).css({ opacity: 0 });
                options.callback.call($('.' + k.prename + 'image_item:eq(' + k.index + ')', k.self), k.index, 'fadeIn');
                k.lindex = k.index;
                if (k.index == k.size - 1) {
                    k.index = 0;
                } else {
                    k.index++;
                }
            }
);
        };
        k.run = function () {
            k.onload();
        };
        k.fn.objToCss = function (obj, excArr, excFlag) {
            excFlag = excFlag ? true : false;
            var isIE = navigator.userAgent.indexOf("MSIE") != -1;
            var style = '';
            if (excFlag) {
                for (var key in obj) {
                    if ($.inArray(key, excArr) != -1) {
                        pKey = key.replace(/([A-Z])/, KtoLowerCase);
                        if (pKey == 'opacity' && isIE) {
                            style += "filter:alpha(opacity=" + (obj[key] * 100) + ");";
                        } else {
                            style += pKey + ":" + obj[key] + ";";
                        }
                    }
                };
            } else {
                for (var key in obj) {
                    if ($.isArray(excArr)) {
                        if ($.inArray(key, excArr) == -1) {
                            pKey = key.replace(/([A-Z])/, KtoLowerCase);
                            if (pKey == 'opacity' && isIE) {
                                style += "filter:alpha(opacity=" + (obj[key] * 100) + ");";
                            } else {
                                style += pKey + ":" + obj[key] + ";";
                            }
                        }
                    } else {
                        pKey = key.replace(/([A-Z])/, KtoLowerCase);
                        if (pKey == 'opacity' && isIE) {
                            style += "filter:alpha(opacity=" + (obj[key] * 100) + ");";
                        } else {
                            style += pKey + ":" + obj[key] + ";";
                        }
                    }
                };
            }
            function KtoLowerCase(word) {
                var str = '';
                str = '-' + word.toLowerCase();
                return str;
            };
            return style;
        };
        k.run();
    }
})(jQuery)





$(function () {

    $("#kinMaxShow").kinMaxShow();

});