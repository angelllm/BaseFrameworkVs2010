
define(function (require) {
     
    require("avalon");
    require("module/index/artcile");
     
    !
    function (a) {
        var c, b = function (a, b) {
            this.init("tooltip", a, b)
        };
        b.prototype = {
            constructor: b,
            init: function (b, c, d) {
                var e, f, g, h, i;
                for (this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, g = this.options.trigger.split(" "), i = g.length; i--;) {
                    h = g[i],
                    "click" == h ? this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)) : "manual" != h && (e = "hover" == h ? "mouseenter" : "focus", f = "hover" == h ? "mouseleave" : "blur", this.$element.on(e + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f + "." + this.type, this.options.selector, a.proxy(this.leave, this)))
                }
                this.options.selector ? this._options = a.extend({},
                this.options, {
                    trigger: "manual",
                    selector: ""
                }) : this.fixTitle()
            },
            getOptions: function (b) {
                return b = a.extend({},
                a.fn[this.type].defaults, this.$element.data(), b),
                b.delay && "number" == typeof b.delay && (b.delay = {
                    show: b.delay,
                    hide: b.delay
                }),
                b
            },
            enter: function (b) {
                var e, c = a.fn[this.type].defaults,
                d = {};
                return this._options && a.each(this._options,
                function (a, b) {
                    c[a] != b && (d[a] = b)
                },
                this),
                e = a(b.currentTarget)[this.type](d).data(this.type),
                e.options.delay && e.options.delay.show ? (clearTimeout(this.timeout), e.hoverState = "in", this.timeout = setTimeout(function () {
                    "in" == e.hoverState && e.show()
                },
                e.options.delay.show), void 0) : e.show()
            },
            leave: function (b) {
                var c = a(b.currentTarget)[this.type](this._options).data(this.type);
                return this.timeout && clearTimeout(this.timeout),
                c.options.delay && c.options.delay.hide ? (c.hoverState = "out", this.timeout = setTimeout(function () {
                    "out" == c.hoverState && c.hide()
                },
                c.options.delay.hide), void 0) : c.hide()
            },
            show: function () {
                var b, c, d, e, f, g, h = a.Event("show");
                if (this.hasContent() && this.enabled) {
                    if (this.$element.trigger(h), h.isDefaultPrevented()) {
                        return
                    }
                    switch (b = this.tip(), this.setContent(), this.options.animation && b.addClass("fade"), f = "function" == typeof this.options.placement ? this.options.placement.call(this, b[0], this.$element[0]) : this.options.placement, b.detach().css({
                        top: 0,
                        left: 0,
                        display: "block"
                    }), this.options.container ? b.appendTo(this.options.container) : b.insertAfter(this.$element), c = this.getPosition(), d = b[0].offsetWidth, e = b[0].offsetHeight, f) {
                        case "bottom":
                            g = {
                                top: c.top + c.height,
                                left: c.left + c.width / 2 - d / 2
                            };
                            break;
                        case "top":
                            g = {
                                top: c.top - e,
                                left: c.left + c.width / 2 - d / 2
                            };
                            break;
                        case "left":
                            g = {
                                top: c.top + c.height / 2 - e / 2,
                                left: c.left - d
                            };
                            break;
                        case "right":
                            g = {
                                top: c.top + c.height / 2 - e / 2,
                                left: c.left + c.width
                            }
                    }
                    this.applyPlacement(g, f),
                    this.$element.trigger("shown")
                }
            },
            applyPlacement: function (a, b) {
                var f, g, h, i, c = this.tip(),
                d = c[0].offsetWidth,
                e = c[0].offsetHeight;
                c.offset(a).addClass(b).addClass("in"),
                f = c[0].offsetWidth,
                g = c[0].offsetHeight,
                "top" == b && g != e && (a.top = a.top + e - g, i = !0),
                "bottom" == b || "top" == b ? (h = 0, a.left < 0 && (h = -2 * a.left, a.left = 0, c.offset(a), f = c[0].offsetWidth, g = c[0].offsetHeight), this.replaceArrow(h - d + f, f, "left")) : this.replaceArrow(g - e, g, "top"),
                i && c.offset(a)
            },
            replaceArrow: function (a, b, c) {
                this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
            },
            setContent: function () {
                var a = this.tip(),
                b = this.getTitle();
                a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b),
                a.removeClass("fade in top bottom left right")
            },
            hide: function () {
                function e() {
                    var b = setTimeout(function () {
                        c.off(a.support.transition.end).detach()
                    },
                    500);
                    c.one(a.support.transition.end,
                    function () {
                        clearTimeout(b),
                        c.detach()
                    })
                }
                var c = this.tip(),
                d = a.Event("hide");
                return this.$element.trigger(d),
                d.isDefaultPrevented() ? void 0 : (c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? e() : c.detach(), this.$element.trigger("hidden"), this)
            },
            fixTitle: function () {
                var a = this.$element; (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
            },
            hasContent: function () {
                return this.getTitle()
            },
            getPosition: function () {
                var b = this.$element[0];
                return a.extend({},
                "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
                    width: b.offsetWidth,
                    height: b.offsetHeight
                },
                this.$element.offset())
            },
            getTitle: function () {
                var a, b = this.$element,
                c = this.options;
                return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
            },
            tip: function () {
                return this.$tip = this.$tip || a(this.options.template)
            },
            arrow: function () {
                return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
            },
            validate: function () {
                this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
            },
            enable: function () {
                this.enabled = !0
            },
            disable: function () {
                this.enabled = !1
            },
            toggleEnabled: function () {
                this.enabled = !this.enabled
            },
            toggle: function (b) {
                var c = b ? a(b.currentTarget)[this.type](this._options).data(this.type) : this;
                c.tip().hasClass("in") ? c.hide() : c.show()
            },
            destroy: function () {
                this.hide().$element.off("." + this.type).removeData(this.type)
            }
        },
        c = a.fn.tooltip,
        a.fn.tooltip = function (c) {
            return this.each(function () {
                var d = a(this),
                e = d.data("tooltip"),
                f = "object" == typeof c && c;
                e || d.data("tooltip", e = new b(this, f)),
                "string" == typeof c && e[c]()
            })
        },
        a.fn.tooltip.Constructor = b,
        a.fn.tooltip.defaults = {
            animation: !0,
            placement: "top",
            selector: !1,
            template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            container: !1
        },
        a.fn.tooltip.noConflict = function () {
            return a.fn.tooltip = c,
            this
        }
    }(window.jQuery),
   
     !
    function () {
        var a = jQuery.event.special,
        b = "D" + +new Date,
        c = "D" + (+new Date + 1);
        a.scrollstart = {
            setup: function () {
                var c, d = function (b) {
                    var d = this,
                    e = arguments;
                    c ? clearTimeout(c) : (b.type = "scrollstart", jQuery.event.dispatch.apply(d, e)),
                    c = setTimeout(function () {
                        c = null
                    },
                    a.scrollstop.latency)
                };
                jQuery(this).bind("scroll", d).data(b, d)
            },
            teardown: function () {
                jQuery(this).unbind("scroll", jQuery(this).data(b))
            }
        },
        a.scrollstop = {
            latency: 300,
            setup: function () {
                var b, d = function (c) {
                    var d = this,
                    e = arguments;
                    b && clearTimeout(b),
                    b = setTimeout(function () {
                        b = null,
                        c.type = "scrollstop",
                        jQuery.event.dispatch.apply(d, e)
                    },
                    a.scrollstop.latency)
                };
                jQuery(this).bind("scroll", d).data(c, d)
            },
            teardown: function () {
                jQuery(this).unbind("scroll", jQuery(this).data(c))
            }
        }
    }(); +(function ($) {
        $(document).ready(function () {
            $(".toggle-search").click(function () {
                $(".toggle-search").toggleClass("active");
                $(".search-expand").fadeToggle(250);
                setTimeout(function () {
                    $(".search-expand input").focus()
                },
                300)
            });

            $(".wp-smiley").lazyload({
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
                event: "scrollstop"
            });

            window.prettyPrint && window.prettyPrint();
            $(".article-tags a, .post-tags a").each(function () {
                $(this).tooltip({
                    container: "body",
                    placement: "top",
                    title: "鏌ョ湅鍏充簬 " + $(this).text() + " 鐨勬枃绔�"
                })
            });

            with (document) 0[(getElementsByTagName("head")[0] || body).appendChild(createElement("script")).src = "http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" + ~(-new Date() / 36e5)];
            if ($(".article-content").length) {
                $(".article-content a").tooltip({
                    container: "body"
                })
            }
            if ($(".d_reader").length) {
                $(".d_reader a").tooltip({
                    container: "body"
                })
            }
            if ($(".readers").length) {
                $(".readers .avatar").parent().tooltip({
                    container: "body"
                })
            }
            if ($(".social").length) {
                $(".social a").tooltip({
                    container: "body"
                })
            }
            if ($(".d_tags").length) {
                $(".d_tags a").tooltip({
                    container: "body"
                })
            }
            $(".article-content").removeAttr("height");

            $(".navbar .nav:first").after('<div class="screen-mini"><button data-type="screen-nav" class="btn btn-inverse screen-nav"><i class="fa fa-list"></i></button></div>');





            function scrollTo(name, speed) {
                if (!speed) {
                    speed = 1000
                }
                if (!name) {
                    $("html,body").animate({
                        scrollTop: 0
                    },
                    speed)
                } else {
                    if ($(name).length > 0) {
                        $("html,body").animate({
                            scrollTop: $(name).offset().top
                        },
                        speed)
                    }
                }
            }
            function is_ie6() {
                if ($.browser.msie) {
                    if ($.browser.version == "6.0") {
                        return true
                    }
                }
                return false
            }
            function grin(tag) {
                tag = " :" + tag + ": ";
                myField = document.getElementById("comment");
                document.selection ? (myField.focus(), sel = document.selection.createRange(), sel.text = tag, myField.focus()) : insertTag(tag)
            }
            function insertTag(tag) {
                myField = document.getElementById("comment");
                myField.selectionStart || myField.selectionStart == "0" ? (startPos = myField.selectionStart, endPos = myField.selectionEnd, cursorPos = startPos, myField.value = myField.value.substring(0, startPos) + tag + myField.value.substring(endPos, myField.value.length), cursorPos += tag.length, myField.focus(), myField.selectionStart = cursorPos, myField.selectionEnd = cursorPos) : (myField.value += tag, myField.focus())
            }
        })
    })(window.jQuery);

});