(function (e) {
    function r(a) {
        var b = a.zoom,
        c = a.S,
        g = a.T,
        h = a.e,
        f = a.g;
        this.data = a;
        this.X = this.b = null;
        this.Da = 0;
        this.zoom = b;
        this.J = !0;
        this.r = this.interval = this.t = this.p = 0;
        var p = this,
        m;
        p.b = e("<div class='" + a.M + "' style='position:absolute;overflow:hidden'  ></div>");
        var t = e("<img data-pin-no-hover='true' style='-webkit-touch-callout:none;position:absolute;max-width:none !important' src='" + v(b.V, b.options) + "'/>");
        b.options.variableMagnification && t.bind("mousewheel",
        function (a, b) {
            p.zoom.na(0.1 * b);
            return !1
        });
        p.X = t;
        t.width(p.zoom.e);
        d.Na && p.X.css("-webkit-transform", "perspective(400px)");
        var l = p.b;
        l.append(t);
        var n = e("<div style='position:absolute;'></div>");
        a.caption ? ("html" == b.options.captionType ? m = a.caption : "attr" == b.options.captionType && (m = e("<div class='cloudzoom-caption'>" + a.caption + "</div>")), m.css("display", "block"), n.css({
            width: h
        }), l.append(n), n.append(m), e("body").append(l), this.r = m.outerHeight(), "bottom" == b.options.captionPosition ? n.css("top", f) : (n.css("top", 0), this.Da = this.r)) : e("body").append(l);
        l.css({
            opacity: 0,
            width: h,
            height: f + this.r
        });
        this.zoom.C = "auto" === b.options.minMagnification ? Math.max(h / b.a.width(), f / b.a.height()) : b.options.minMagnification;
        this.zoom.B = "auto" === b.options.maxMagnification ? t.width() / b.a.width() : b.options.maxMagnification;
        a = l.height();
        this.J = !1;
        b.options.zoomFlyOut ? (f = b.a.offset(), f.left += b.d / 2, f.top += b.c / 2, l.offset(f), l.width(0), l.height(0), l.animate({
            left: c,
            top: g,
            width: h,
            height: a,
            opacity: 1
        },
        {
            duration: b.options.animationTime,
            complete: function () {
                p.J = !0
            }
        })) : (l.offset({
            left: c,
            top: g
        }), l.width(h), l.height(a), l.animate({
            opacity: 1
        },
        {
            duration: b.options.animationTime,
            complete: function () {
                p.J = !0
            }
        }))
    }
    function x(a, b, c) {
        this.a = a;
        this.da = a[0];
        this.Ga = c;
        this.Aa = !0;
        var g = this;
        this.interval = setInterval(function () {
            0 < g.da.width && 0 < g.da.height && (clearInterval(g.interval), g.Aa = !1, g.Ga(a))
        },
        100);
        this.da.src = b
    }
    function d(a, b) {
        function c() {
            h.update();
            window.Ua(c)
        }
        function g() {
            var c;
            c = "" != b.image ? b.image : "" + a.attr("src");
            h.xa();
            b.lazyLoadZoom ? a.bind("touchstart.preload " + h.options.mouseTriggerEvent + ".preload",
            function () {
                h.Q(c, b.zoomImage)
            }) : h.Q(c, b.zoomImage)
        }
        var h = this;
        b = e.extend({},
        e.fn.CloudZoom.defaults, b);
        var f = d.va(a, e.fn.CloudZoom.attr);
        b = e.extend({},
        b, f);
        1 > b.easing && (b.easing = 1);
        f = a.parent();
        f.is("a") && "" == b.zoomImage && (b.zoomImage = f.attr("href"), f.removeAttr("href"));
        f = e("<div class='" + b.zoomClass + "'</div>");
        e("body").append(f);
        this.aa = f.width();
        this.$ = f.height();
        b.zoomWidth && (this.aa = b.zoomWidth, this.$ = b.zoomHeight);
        f.remove();
        this.options = b;
        this.a = a;
        this.g = this.e = this.d = this.c = 0;
        this.I = this.m = null;
        this.j = this.n = 0;
        this.D = {
            x: 0,
            y: 0
        };
        this.Ya = this.caption = "";
        this.ha = {
            x: 0,
            y: 0
        };
        this.k = [];
        this.ua = 0;
        this.ta = "";
        this.b = this.v = this.u = null;
        this.V = "";
        this.N = this.U = this.ca = !1;
        this.G = null;
        this.ma = this.Sa = !1;
        this.l = null;
        this.id = ++d.id;
        this.K = this.za = this.ya = 0;
        this.o = this.h = null;
        this.Ba = this.B = this.C = this.f = this.i = this.oa = 0;
        this.sa(a);
        this.ra = !1;
        this.P = this.A = this.ga = this.fa = 0;
        this.H = !1;
        this.la = 0;
        this.ea = "";
        if (a.is(":hidden")) var p = setInterval(function () {
            a.is(":hidden") || (clearInterval(p), g())
        },
        100);
        else g();
        c()
    }
    function v(a, b) {
        var c = b.uriEscapeMethod;
        return "escape" == c ? escape(a) : "encodeURI" == c ? encodeURI(a) : a
    }
    function k(a) {
        for (var b = "",
        c, g = B("\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74"), d = a[g](0) - 32, e = 1; e < a.length - 1; e++) c = a[g](e),
        c ^= d & 31,
        d++,
        b += String[B("\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65")](c);
        a[g](e);
        return b
    }
    function B(a) {
        return a;
    }
    function y(a) {
        var b = a || window.event,
        c = [].slice.call(arguments, 1),
        g = 0,
        d = 0,
        f = 0;
        a = e.event.fix(b);
        a.type = "mousewheel";
        b.wheelDelta && (g = b.wheelDelta / 120);
        b.detail && (g = -b.detail / 3);
        f = g;
        void 0 !== b.axis && b.axis === b.HORIZONTAL_AXIS && (f = 0, d = -1 * g);
        void 0 !== b.wheelDeltaY && (f = b.wheelDeltaY / 120);
        void 0 !== b.wheelDeltaX && (d = -1 * b.wheelDeltaX / 120);
        c.unshift(a, g, d, f);
        return (e.event.dispatch || e.event.handle).apply(this, c)
    }
    var s = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks) for (var q = s.length; q; ) e.event.fixHooks[s[--q]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) for (var a = s.length; a; ) this.addEventListener(s[--a], y, !1);
            else this.onmousewheel = y
        },
        teardown: function () {
            if (this.removeEventListener) for (var a = s.length; a; ) this.removeEventListener(s[--a], y, !1);
            else this.onmousewheel = null
        }
    };
    e.fn.extend({
        mousewheel: function (a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function (a) {
            return this.unbind("mousewheel", a)
        }
    });
    window.Ua = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (a) {
            window.setTimeout(a, 20)
        }
    } ();
    var q = document.getElementsByTagName("script"),
    w = q[q.length - 1].src.lastIndexOf("/");
    "undefined" != typeof window.CloudZoom || q[q.length - 1].src.slice(0, w);
    var q = window,
    C = q[k(";]is}kinl&")],
    u = !0,
    D = !1,
    E = k("!OMWEUV2"),
    w = k("(\\[CJ@\\").length,
    z = !1,
    A = !1;
    5 == w ? A = !0 : 4 == w && (z = !0);
    d.ia = 1E9;
    e(window).bind("resize.cloudzoom",
    function () {
        d.ia = e(this).width()
    });
    e(window).trigger("resize.cloudzoom");
    d.prototype.L = function () {
        return "inside" === this.options.zoomPosition || d.ia <= this.options.autoInside ? !0 : !1
    };
    d.prototype.update = function () {
        var a = this.h;
        null != a && (this.q(this.D, 0), this.f != this.i && (this.i += (this.f - this.i) / this.options.easing, 1E-4 > Math.abs(this.f - this.i) && (this.i = this.f), this.Ra()), a.update())
    };
    d.id = 0;
    d.prototype.La = function (a) {
        var b = this.V.replace(/^\/|\/$/g, "");
        if (0 == this.k.length) return {
            href: this.options.zoomImage,
            title: this.a.attr("title")
        };
        if (void 0 != a) return this.k;
        a = [];
        for (var c = 0; c < this.k.length && this.k[c].href.replace(/^\/|\/$/g, "") != b; c++);
        for (b = 0; b < this.k.length; b++) a[b] = this.k[c],
        c++,
        c >= this.k.length && (c = 0);
        return a
    };
    d.prototype.getGalleryList = d.prototype.La;
    d.prototype.R = function () {
        clearTimeout(this.oa);
        null != this.o && this.o.remove()
    };
    d.prototype.xa = function () {
        var a = this;
        this.Sa || this.a.bind("mouseover.prehov mousemove.prehov mouseout.prehov",
        function (b) {
            a.G = "mouseout" == b.type ? null : {
                pageX: b.pageX,
                pageY: b.pageY
            }
        })
    };
    d.prototype.Ia = function () {
        this.G = null;
        this.a.unbind("mouseover.prehov mousemove.prehov mouseout.prehov")
    };
    d.prototype.Q = function (a, b) {
        var c = this;
        c.a.unbind("touchstart.preload " + c.options.mouseTriggerEvent + ".preload");
        c.xa();
        this.R();
        e("body").children(".cloudzoom-fade-" + c.id).remove();
        null != this.v && (this.v.cancel(), this.v = null);
        null != this.u && (this.u.cancel(), this.u = null);
        this.V = "" != b && void 0 != b ? b : a;
        this.N = this.U = !1; !c.options.galleryFade || !c.ca || c.L() && null != c.h || (c.l = e(new Image).css({
            position: "absolute"
        }), c.l.attr("src", c.a.attr("src")), c.l.width(c.a.width()), c.l.height(c.a.height()), c.l.offset(c.a.offset()), c.l.addClass("cloudzoom-fade-" + c.id), e("body").append(c.l));
        this.Qa();
        var g = e(new Image);
        this.u = new x(g, a,
        function (a, b) {
            c.u = null;
            c.N = !0;
            c.a.attr("src", g.attr("src"));
            e("body").children(".cloudzoom-fade-" + c.id).fadeOut(c.options.fadeTime,
            function () {
                e(this).remove();
                c.l = null
            });
            void 0 !== b ? (c.R(), c.options.errorCallback({
                $element: c.a,
                type: "IMAGE_NOT_FOUND",
                data: b.Ka
            })) : c.wa()
        })
    };
    d.prototype.Qa = function () {
        var a = this;
        a.oa = setTimeout(function () {
            a.o = e("<div class='cloudzoom-ajax-loader' style='position:absolute;left:0px;top:0px'/>");
            e("body").append(a.o);
            var b = a.o.width(),
            g = a.o.height(),
            b = a.a.offset().left + a.a.width() / 2 - b / 2,
            g = a.a.offset().top + a.a.height() / 2 - g / 2;
            a.o.offset({
                left: b,
                top: g
            })
        },
        250);
        var b = e(new Image);
        this.v = new x(b, this.V,
        function (c, g) {
            a.v = null;
            a.U = !0;
            a.e = b[0].width;
            a.g = b[0].height;
            void 0 !== g ? (a.R(), a.options.errorCallback({
                $element: a.a,
                type: "IMAGE_NOT_FOUND",
                data: g.Ka
            })) : a.wa()
        })
    };
    d.prototype.loadImage = d.prototype.Q;
    d.prototype.Fa = function () {
        alert("Cloud Zoom API OK")
    };
    d.prototype.apiTest = d.prototype.Fa;
    d.prototype.s = function () {
        null != this.h && (this.options.touchStartDelay && (this.H = !0), this.h.ba(), this.a.trigger("cloudzoom_end_zoom"));
        this.h = null
    };
    d.prototype.ba = function () {
        e(document).unbind("mousemove." + this.id);
        this.a.unbind();
        null != this.b && (this.b.unbind(), this.s());
        this.a.removeData("CloudZoom");
        e("body").children(".cloudzoom-fade-" + this.id).remove();
        this.ra = !0
    };
    d.prototype.destroy = d.prototype.ba;
    d.prototype.Ha = function (a) {
        if (!this.options.hoverIntentDelay) return !1;
        0 === this.A && (this.A = (new Date).getTime(), this.fa = a.pageX, this.ga = a.pageY);
        var b = a.pageX - this.fa,
        c = a.pageY - this.ga,
        b = Math.sqrt(b * b + c * c);
        this.fa = a.pageX;
        this.ga = a.pageY;
        a = (new Date).getTime();
        b <= this.options.hoverIntentDistance ? this.P += a - this.A : this.A = a;
        if (this.P < this.options.hoverIntentDelay) return !0;
        this.P = this.A = 0;
        return !1
    };
    d.prototype.Y = function () {
        var a = this;
        a.a.bind(a.options.mouseTriggerEvent + ".trigger",
        function (b) {
            a.ea = "mouse";
            if (!a.Z() && null == a.b && !a.Ha(b)) {
                var c = a.a.offset();
                b = new d.F(b.pageX - c.left, b.pageY - c.top);
                a.O();
                a.w();
                a.q(b, 0);
                a.D = b
            }
        })
    };
    d.prototype.Z = function () {
        if (this.ra || !this.U || !this.N || d.ia <= this.options.disableOnScreenWidth) return !0;
        if ("touch" === this.ea && this.H) return console.log("xxxxx"),
        !0;
        if (!1 === this.options.disableZoom) return !1;
        if (!0 === this.options.disableZoom) return !0;
        if ("auto" == this.options.disableZoom) {
            if (!isNaN(this.options.maxMagnification) && 1 < this.options.maxMagnification) return !1;
            if (this.a.width() >= this.e) return !0
        }
        return !1
    };
    d.prototype.wa = function () {
        var a = this;
        if (a.U && a.N) {
            this.qa();
            a.e = a.a.width() * this.i;
            a.g = a.a.height() * this.i;
            this.R();
            this.ka();
            null != a.h && (a.s(), a.w(), a.I.attr("src", v(this.a.attr("src"), this.options)), a.q(a.ha, 0));
            if (!a.ca) {
                a.ca = !0;
                e(document).bind("MSPointerUp." + this.id + " mousemove." + this.id,
                function (b) {
                    if (null != a.b) {
                        var c = a.a.offset(),
                        g = !0,
                        c = new d.F(b.pageX - Math.floor(c.left), b.pageY - Math.floor(c.top));
                        if (-1 > c.x || c.x > a.d || 0 > c.y || c.y > a.c) g = !1,
                        a.options.permaZoom || (a.b.remove(), a.s(), a.b = null);
                        a.ma = !1;
                        "MSPointerUp" === b.type && (a.ma = !0);
                        g && (a.D = c)
                    }
                });
                a.Y();
                var b = 0,
                c = 0,
                g = 0,
                h = function (a, b) {
                    return Math.sqrt((a.pageX - b.pageX) * (a.pageX - b.pageX) + (a.pageY - b.pageY) * (a.pageY - b.pageY))
                };
                a.a.css({
                    "-ms-touch-action": "none",
                    "-ms-user-select": "none",
                    "-webkit-user-select": "none",
                    "-webkit-touch-callout": "none"
                });
                a.options.touchStartDelay && (a.H = !0);
                a.a.bind("touchstart touchmove touchend",
                function (e) {
                    if (a.options.touchStartDelay && a.H) return "touchstart" == e.type ? (clearTimeout(this.la), this.la = setTimeout(function () {
                        a.H = !1;
                        a.a.trigger(e)
                    },
                    a.options.touchStartDelay)) : clearTimeout(this.la),
                    !0;
                    if (a.Z()) return !0;
                    var f = e.originalEvent,
                    k = a.a.offset(),
                    l = {
                        x: 0,
                        y: 0
                    },
                    n = f.type;
                    if ("touchend" == n && 0 == f.touches.length) return a.ja(n, l),
                    !1;
                    l = new d.F(f.touches[0].pageX - Math.floor(k.left), f.touches[0].pageY - Math.floor(k.top));
                    a.D = l;
                    if ("touchstart" == n && 1 == f.touches.length && null == a.b) return a.ea = "touch",
                    a.ja(n, l),
                    !1;
                    2 > b && 2 == f.touches.length && (c = a.f, g = h(f.touches[0], f.touches[1]));
                    b = f.touches.length;
                    2 == b && a.options.variableMagnification && (f = h(f.touches[0], f.touches[1]) / g, a.f = a.L() ? c * f : c / f, a.f < a.C && (a.f = a.C), a.f > a.B && (a.f = a.B));
                    a.ja("touchmove", l);
                    e.preventDefault();
                    e.stopPropagation();
                    return e.returnValue = !1
                });
                if (null != a.G) {
                    if (this.Z()) return;
                    var f = a.a.offset(),
                    f = new d.F(a.G.pageX - f.left, a.G.pageY - f.top);
                    a.O();
                    a.w();
                    a.q(f, 0);
                    a.D = f
                }
            }
            a.Ia();
            a.a.trigger("cloudzoom_ready")
        }
    };
    d.prototype.ja = function (a, b) {
        var c = this;
        switch (a) {
            case "touchstart":
                if (null != c.b) break;
                clearTimeout(c.interval);
                c.interval = setTimeout(function () {
                    c.O();
                    c.w();
                    c.q(b, c.j / 2);
                    c.update()
                },
            150);
                break;
            case "touchend":
                clearTimeout(c.interval);
                null == c.b ? c.Ca() : c.options.permaZoom || (c.b.remove(), c.b = null, c.s());
                break;
            case "touchmove":
                null == c.b && (clearTimeout(c.interval), c.O(), c.w())
        }
    };
    d.prototype.Ra = function () {
        var a = this.i;
        if (null != this.b) {
            var b = this.h;
            this.n = b.b.width() / (this.a.width() * a) * this.a.width();
            this.j = b.b.height() / (this.a.height() * a) * this.a.height();
            this.j -= b.r / a;
            this.m.width(this.n);
            this.m.height(this.j);
            this.q(this.ha, 0)
        }
    };
    d.prototype.na = function (a) {
        this.f += a;
        this.f < this.C && (this.f = this.C);
        this.f > this.B && (this.f = this.B)
    };
    d.prototype.sa = function (a) {
        this.caption = null;
        "attr" == this.options.captionType ? (a = a.attr(this.options.captionSource), "" != a && void 0 != a && (this.caption = a)) : "html" == this.options.captionType && (a = e(this.options.captionSource), a.length && (this.caption = a.clone(), a.css("display", "none")))
    };
    d.prototype.Ma = function (a, b) {
        if ("html" == b.captionType) {
            var c;
            c = e(b.captionSource);
            c.length && c.css("display", "none")
        }
    };
    d.prototype.qa = function () {
        this.f = this.i = "auto" === this.options.startMagnification ? this.e / this.a.width() : this.options.startMagnification
    };
    d.prototype.w = function () {
        var a = this;
        a.a.trigger("cloudzoom_start_zoom");
        this.qa();
        a.e = a.a.width() * this.i;
        a.g = a.a.height() * this.i;
        var b = this.m,
        c = a.d,
        g = a.c,
        d = a.e,
        f = a.g,
        p = a.caption;
        if (a.L()) {
            b.width(a.d / a.e * a.d);
            b.height(a.c / a.g * a.c);
            b.css("display", "none");
            var m = a.options.zoomOffsetX,
            k = a.options.zoomOffsetY;
            a.options.autoInside && (m = k = 0);
            a.h = new r({
                zoom: a,
                S: a.a.offset().left + m,
                T: a.a.offset().top + k,
                e: a.d,
                g: a.c,
                caption: p,
                M: a.options.zoomInsideClass
            });
            a.pa(a.h.b);
            a.h.b.bind("touchmove touchstart touchend",
            function (b) {
                a.a.trigger(b);
                return !1
            })
        } else if (isNaN(a.options.zoomPosition)) m = e(a.options.zoomPosition),
        b.width(m.width() / a.e * a.d),
        b.height(m.height() / a.g * a.c),
        b.fadeIn(a.options.fadeTime),
        a.options.zoomFullSize || "full" == a.options.zoomSizeMode ? (b.width(a.d), b.height(a.c), b.css("display", "none"), a.h = new r({
            zoom: a,
            S: m.offset().left,
            T: m.offset().top,
            e: a.e,
            g: a.g,
            caption: p,
            M: a.options.zoomClass
        })) : a.h = new r({
            zoom: a,
            S: m.offset().left,
            T: m.offset().top,
            e: m.width(),
            g: m.height(),
            caption: p,
            M: a.options.zoomClass,
            W: m
        });
        else {
            var m = a.options.zoomOffsetX,
            k = a.options.zoomOffsetY,
            l = !1;
            if (this.options.lensWidth) {
                var n = this.options.lensWidth,
                q = this.options.lensHeight;
                n > c && (n = c);
                q > g && (q = g);
                b.width(n);
                b.height(q)
            }
            d *= b.width() / c;
            f *= b.height() / g;
            n = a.options.zoomSizeMode;
            if (a.options.zoomFullSize || "full" == n) d = a.e,
            f = a.g,
            b.width(a.d),
            b.height(a.c),
            b.css("display", "none"),
            l = !0;
            else if (a.options.zoomMatchSize || "image" == n) b.width(a.d / a.e * a.d),
            b.height(a.c / a.g * a.c),
            d = a.d,
            f = a.c;
            else if ("zoom" === n || this.options.zoomWidth) b.width(a.aa / a.e * a.d),
            b.height(a.$ / a.g * a.c),
            d = a.aa,
            f = a.$;
            c = [[c / 2 - d / 2, -f], [c - d, -f], [c, -f], [c, 0], [c, g / 2 - f / 2], [c, g - f], [c, g], [c - d, g], [c / 2 - d / 2, g], [0, g], [-d, g], [-d, g - f], [-d, g / 2 - f / 2], [-d, 0], [-d, -f], [0, -f]];
            m += c[a.options.zoomPosition][0];
            k += c[a.options.zoomPosition][1];
            l || b.fadeIn(a.options.fadeTime);
            a.h = new r({
                zoom: a,
                S: a.a.offset().left + m,
                T: a.a.offset().top + k,
                e: d,
                g: f,
                caption: p,
                M: a.options.zoomClass
            })
        }
        a.h.p = void 0;
        a.n = b.width();
        a.j = b.height();
        this.options.variableMagnification && a.m.bind("mousewheel",
        function (b, c) {
            a.na(0.1 * c);
            return !1
        })
    };
    d.prototype.Pa = function () {
        return this.h ? !0 : !1
    };
    d.prototype.isZoomOpen = d.prototype.Pa;
    d.prototype.Ja = function () {
        this.a.unbind(this.options.mouseTriggerEvent + ".trigger");
        var a = this;
        null != this.b && (this.b.remove(), this.b = null);
        this.s();
        setTimeout(function () {
            a.Y()
        },
        1)
    };
    d.prototype.closeZoom = d.prototype.Ja;
    d.prototype.Ca = function () {
        var a = this;
        this.a.unbind(a.options.mouseTriggerEvent + ".trigger");
        this.a.trigger("click");
        setTimeout(function () {
            a.Y()
        },
        1)
    };
    d.prototype.pa = function (a) {
        var b = this;
        a.bind("mousedown." + b.id + " mouseup." + b.id,
        function (a) {
            "mousedown" === a.type ? b.Ba = (new Date).getTime() : (b.ma && (b.b && b.b.remove(), b.s(), b.b = null), 250 >= (new Date).getTime() - b.Ba && b.Ca())
        })
    };
    d.prototype.O = function () {
        5 == E.length && !1 == D && (u = !0);
        var a = this,
        b;
        a.ka();
        a.m = e("<div class='" + a.options.lensClass + "' style='overflow:hidden;display:none;position:absolute;top:0px;left:0px;'/>");
        var c = e('<img style="-webkit-touch-callout: none;position:absolute;left:0;top:0;max-width:none !important" src="' + v(this.a.attr("src"), this.options) + '">');
        c.width(this.a.width());
        c.height(this.a.height());
        a.I = c;
        a.I.attr("src", v(this.a.attr("src"), this.options));
        var d = a.m;
        a.b = e("<div class='cloudzoom-blank' style='position:absolute;'/>");
        var h = a.b;
        b = e("<div style='background-color:" + a.options.tintColor + ";width:100%;height:100%;'/>");
        b.css("opacity", a.options.tintOpacity);
        b.fadeIn(a.options.fadeTime);
        h.width(a.d);
        h.height(a.c);
        h.offset(a.a.offset());
        e("body").append(h);
        h.append(b);
        h.append(d);

        h.bind("touchmove touchstart touchend",
        function (b) {
            a.a.trigger(b);
            return !1
        });
        d.append(c);
        a.K = parseInt(d.css("borderTopWidth"), 10);
        isNaN(a.K) && (a.K = 0);
        a.pa(a.b);

    };
    d.prototype.q = function (a, b) {
        var c, d;
        this.ha = a;
        c = a.x;
        d = a.y;
        b = 0;
        this.L() && (b = 0);
        c -= this.n / 2 + 0;
        d -= this.j / 2 + b;
        c > this.d - this.n ? c = this.d - this.n : 0 > c && (c = 0);
        d > this.c - this.j ? d = this.c - this.j : 0 > d && (d = 0);
        var e = this.K;
        this.m.parent();
        this.m.css({
            left: Math.ceil(c) - e,
            top: Math.ceil(d) - e
        });
        c = -c;
        d = -d;
        this.I.css({
            left: Math.floor(c) + "px",
            top: Math.floor(d) + "px"
        });
        this.ya = c;
        this.za = d
    };
    d.va = function (a, b) {
        var c = null,
        d = a.attr(b);
        if ("string" == typeof d) {
            var d = e.trim(d),
            h = d.indexOf("{"),
            f = d.indexOf("}");
            f != d.length - 1 && (f = d.indexOf("};"));
            if (-1 != h && -1 != f) {
                d = d.substr(h, f - h + 1);
                try {
                    c = e.parseJSON(d)
                } catch (k) {
                    console.error("Invalid JSON in " + b + " attribute:" + d)
                }
            } else c = (new C("return {" + d + "}"))()
        }
        return c
    };
    d.F = function (a, b) {
        this.x = a;
        this.y = b
    };
    d.point = d.F;
    x.prototype.cancel = function () {
        clearInterval(this.interval);
        this.Aa = !1
    };
    d.Wa = function () { };
    d.setScriptPath = d.Wa;
    d.Ta = function () {
        e(function () {
            e(".cloudzoom").CloudZoom();
            e(".cloudzoom-gallery").CloudZoom()
        })
    };
    d.quickStart = d.Ta;
    d.prototype.ka = function () {
        this.d = this.a.outerWidth();
        this.c = this.a.outerHeight()
    };
    d.prototype.refreshImage = d.prototype.ka;
    d.version = "3.1 rev 1407211130";
    d.Xa = function () {
        D = !0
    };
    d.Oa = function () {
        d.browser = {};
        d.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
        var a = new C("a", k('4}s>`qw~tk3rpc`vjkk(wzf~dobb2-3tzxp,51koiop?f`npa>pfz)i6icm`ttGA]Vyzhvt~ri6hiofls+jhkh~bcc gbf}uxs>#x\'z2nnsiu*!(\'/<nfx#zl|/r,\"(v)w9t|t|hu%}+*+jb-e:5hQiQqrl>bgqgad~v~2x2q{qguj.,d]eU\'fnbjzg; ;:)(+56;1zGCc|,3\"98e)agnntBh\'2?08uNtJ3;495ab/=<?`*lhcmqEm$lUmM:0=6<?e}moir</$rdvvvk\'7$'));
        if (5 != E.length) {
            var b = k("7&**4xsp#");
            u = a(b)
        } else u = !1,
        d.Xa();
        this._ = "<Otjzs;317+ehe)_xi4[BXS_4@ERJ9Vrxple;L,E%Bf|l0Jyj.?&=2!$$\"\"";
        this.Na = -1 != navigator.platform.indexOf("iPhone") || -1 != navigator.platform.indexOf("iPod") || -1 != navigator.platform.indexOf("iPad")
    };
    d.Va = function (a) {
        e.fn.CloudZoom.attr = a
    };
    d.setAttr = d.Va;
    e.fn.CloudZoom = function (a) {
        return this.each(function () {
            if (e(this).hasClass("cloudzoom-gallery")) {
                var b = d.va(e(this), e.fn.CloudZoom.attr),
                c = e(b.useZoom).data("CloudZoom");
                c.Ma(e(this), b);
                var g = e.extend({},
                c.options, b),
                h = e(this).parent(),
                f = g.zoomImage;
                h.is("a") && (f = h.attr("href"));
                c.k.push({
                    href: f,
                    title: e(this).attr("title"),
                    Ea: e(this)
                });
                e(this).bind(g.galleryEvent,
                function () {
                    var a;
                    for (a = 0; a < c.k.length; a++) c.k[a].Ea.removeClass("cloudzoom-gallery-active");
                    e(this).addClass("cloudzoom-gallery-active");
                    if (b.image == c.ta) return !1;
                    c.ta = b.image;
                    c.options = e.extend({},
                    c.options, b);
                    c.sa(e(this));
                    var d = e(this).parent();
                    d.is("a") && (b.zoomImage = d.attr("href"));
                    a = "mouseover" == b.galleryEvent ? c.options.galleryHoverDelay : 1;
                    clearTimeout(c.ua);
                    c.ua = setTimeout(function () {
                        c.Q(b.image, b.zoomImage)
                    },
                    a);
                    if (d.is("a") || e(this).is("a")) return !1
                })
            } else e(this).data("CloudZoom", new d(e(this), a))
        })
    };
    e.fn.CloudZoom.attr = "data-cloudzoom";
    e.fn.CloudZoom.defaults = {
        image: "",
        zoomImage: "",
        tintColor: "#fff",
        tintOpacity: 0.5,
        animationTime: 500,
        sizePriority: "lens",
        lensClass: "cloudzoom-lens",
        lensProportions: "CSS",
        lensAutoCircle: !1,
        innerZoom: !1,
        galleryEvent: "click",
        easeTime: 500,
        zoomSizeMode: "lens",
        zoomMatchSize: !1,
        zoomPosition: 3,
        zoomOffsetX: 15,
        zoomOffsetY: 0,
        zoomFullSize: !1,
        zoomFlyOut: !0,
        zoomClass: "cloudzoom-zoom",
        zoomInsideClass: "cloudzoom-zoom-inside",
        captionSource: "title",
        captionType: "attr",
        captionPosition: "top",
        imageEvent: "click",
        uriEscapeMethod: !1,
        errorCallback: function () { },
        variableMagnification: !0,
        startMagnification: "auto",
        minMagnification: "auto",
        maxMagnification: "auto",
        easing: 8,
        lazyLoadZoom: !1,
        mouseTriggerEvent: "mousemove",
        disableZoom: !1,
        galleryFade: !0,
        galleryHoverDelay: 200,
        permaZoom: !1,
        zoomWidth: 0,
        zoomHeight: 0,
        lensWidth: 0,
        lensHeight: 0,
        hoverIntentDelay: 0,
        hoverIntentDistance: 2,
        autoInside: 0,
        disableOnScreenWidth: 0,
        touchStartDelay: 0
    };
    r.prototype.update = function () {
        var a = this.zoom,
        b, c;
        this.data.W && this.J && (b = this.data.W.offset().left, c = this.data.W.offset().top, this.b.css({
            left: b + "px",
            top: c + "px"
        }));
        b = a.i;
        c = -a.ya + a.n / 2;
        var d = -a.za + a.j / 2;
        void 0 == this.p && (this.p = c, this.t = d);
        this.p += (c - this.p) / a.options.easing;
        this.t += (d - this.t) / a.options.easing;
        c = -this.p * b;
        c += a.n / 2 * b;
        var d = -this.t * b,
        d = d + a.j / 2 * b,
        e = a.a.width() * b,
        a = a.a.height() * b;
        0 < c && (c = 0);
        0 < d && (d = 0);
        c + e < this.b.width() && (c += this.b.width() - (c + e));
        d + a < this.b.height() - this.r && (d += this.b.height() - this.r - (d + a));
        this.X.css({
            left: c + "px",
            top: d + this.Da + "px",
            width: e
        })
    };
    r.prototype.ba = function () {
        var a = this;
        a.b.bind("touchstart",
        function () {
            return !1
        });
        var b = this.zoom.a.offset();
        this.zoom.options.zoomFlyOut ? this.b.animate({
            left: b.left + this.zoom.d / 2,
            top: b.top + this.zoom.c / 2,
            opacity: 0,
            width: 1,
            height: 1
        },
        {
            duration: this.zoom.options.animationTime,
            step: function () {
                d.browser.webkit && a.b.width(a.b.width())
            },
            complete: function () {
                a.b.remove()
            }
        }) : this.b.animate({
            opacity: 0
        },
        {
            duration: this.zoom.options.animationTime,
            complete: function () {
                a.b.remove()
            }
        })
    };
    q.CloudZoom = d;
    d.Oa()
})(jQuery); ;