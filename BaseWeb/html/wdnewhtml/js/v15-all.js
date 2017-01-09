; window.Modernizr = function (a, b, c) { function x(a) { j.cssText = a } function y(a, b) { return x(prefixes.join(a + ";") + (b || "")) } function z(a, b) { return typeof a === b } function A(a, b) { return !!~("" + a).indexOf(b) } function B(a, b) { for (var d in a) { var e = a[d]; if (!A(e, "-") && j[e] !== c) return b == "pfx" ? e : !0 } return !1 } function C(a, b, d) { for (var e in a) { var f = b[a[e]]; if (f !== c) return d === !1 ? a[e] : z(f, "function") ? f.bind(d || b) : f } return !1 } function D(a, b, c) { var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + n.join(d + " ") + d).split(" "); return z(b, "string") || z(b, "undefined") ? B(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), C(e, b, c)) } var d = "2.8.1", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k, l = {}.toString, m = "Webkit Moz O ms", n = m.split(" "), o = m.toLowerCase().split(" "), p = {}, q = {}, r = {}, s = [], t = s.slice, u, v = {}.hasOwnProperty, w; !z(v, "undefined") && !z(v.call, "undefined") ? w = function (a, b) { return v.call(a, b) } : w = function (a, b) { return b in a && z(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function (b) { var c = this; if (typeof c != "function") throw new TypeError; var d = t.call(arguments, 1), e = function () { if (this instanceof e) { var a = function () { }; a.prototype = c.prototype; var f = new a, g = c.apply(f, d.concat(t.call(arguments))); return Object(g) === g ? g : f } return c.apply(b, d.concat(t.call(arguments))) }; return e }), p.cssanimations = function () { return D("animationName") }; for (var E in p) w(p, E) && (u = E.toLowerCase(), e[u] = p[E](), s.push((e[u] ? "" : "no-") + u)); return e.addTest = function (a, b) { if (typeof a == "object") for (var d in a) w(a, d) && e.addTest(d, a[d]); else { a = a.toLowerCase(); if (e[a] !== c) return e; b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b } return e }, x(""), i = k = null, function (a, b) { function l(a, b) { var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement; return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild) } function m() { var a = s.elements; return typeof a == "string" ? a.split(" ") : a } function n(a) { var b = j[a[h]]; return b || (b = {}, i++, a[h] = i, j[i] = b), b } function o(a, c, d) { c || (c = b); if (k) return c.createElement(a); d || (d = n(c)); var g; return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g } function p(a, c) { a || (a = b); if (k) return a.createDocumentFragment(); c = c || n(a); var d = c.frag.cloneNode(), e = 0, f = m(), g = f.length; for (; e < g; e++) d.createElement(f[e]); return d } function q(a, b) { b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) { return s.shivMethods ? o(c, a, b) : b.createElem(c) }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function (a) { return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")' }) + ");return n}")(s, b.frag) } function r(a) { a || (a = b); var c = n(a); return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a } var c = "3.7.0", d = a.html5 || {}, e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, g, h = "_html5shiv", i = 0, j = {}, k; (function () { try { var a = b.createElement("a"); a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function () { b.createElement("a"); var a = b.createDocumentFragment(); return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined" }() } catch (c) { g = !0, k = !0 } })(); var s = { elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video", version: c, shivCSS: d.shivCSS !== !1, supportsUnknownElements: k, shivMethods: d.shivMethods !== !1, type: "default", shivDocument: r, createElement: o, createDocumentFragment: p }; a.html5 = s, r(b) }(this, b), e._version = d, e._domPrefixes = o, e._cssomPrefixes = n, e.testProp = function (a) { return B([a]) }, e.testAllProps = D, e.prefixed = function (a, b, c) { return b ? D(a, b, c) : D(a, "pfx") }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + s.join(" ") : ""), e }(this, this.document), function (a, b, c) { function d(a) { return "[object Function]" == o.call(a) } function e(a) { return "string" == typeof a } function f() { } function g(a) { return !a || "loaded" == a || "complete" == a || "uninitialized" == a } function h() { var a = p.shift(); q = 1, a ? a.t ? m(function () { ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1) }, 0) : (a(), h()) : q = 0 } function i(a, c, d, e, f, i, j) { function k(b) { if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) { "img" != a && m(function () { t.removeChild(l) }, 50); for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload() } } var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = { t: d, s: c, e: f, a: i, x: j }; 1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () { k.call(this, r) }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l)) } function j(a, b, c, d, f) { return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this } function k() { var a = B; return a.loader = { load: j, i: 0 }, a } var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) { return "[object Array]" == o.call(a) }, x = [], y = {}, z = { timeout: function (a, b) { return b.length && (a.timeout = b[0]), a } }, A, B; B = function (a) { function b(a) { var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = { url: c, origUrl: c, prefixes: a }, e, f, g; for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g)); for (f = 0; f < b; f++) c = x[f](c); return c } function g(a, e, f, g, h) { var i = b(a), j = i.autoCallback; i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () { k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2 }))) } function h(a, b) { function c(a, c) { if (a) { if (e(a)) c || (j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() }), g(a, j, b, 0, h); else if (Object(a) === a) for (n in m = function () { var b = 0, c; for (c in a) a.hasOwnProperty(c) && b++; return b }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () { var a = [].slice.call(arguments); k.apply(this, a), l() } : j[n] = function (a) { return function () { var b = [].slice.call(arguments); a && a.apply(this, b), l() } }(k[n])), g(a[n], j, b, n, h)) } else !c && l() } var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n; c(h ? a.yep : a.nope, !!i), i && c(i) } var i, j, l = this.yepnope.loader; if (e(a)) g(a, 0, l, 0); else if (w(a)) for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l) }, B.addPrefix = function (a, b) { z[a] = b }, B.addFilter = function (a) { x.push(a) }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () { b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete" }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) { var k = b.createElement("script"), l, o, e = e || B.errorTimeout; k.src = a; for (o in d) k.setAttribute(o, d[o]); c = j ? h : c || f, k.onreadystatechange = k.onload = function () { !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null) }, m(function () { l || (l = 1, c(1)) }, e), i ? k.onload() : n.parentNode.insertBefore(k, n) }, a.yepnope.injectCss = function (a, c, d, e, g, i) { var e = b.createElement("link"), j, c = i ? h : c || f; e.href = a, e.rel = "stylesheet", e.type = "text/css"; for (j in d) e.setAttribute(j, d[j]); g || (n.parentNode.insertBefore(e, n), m(c, 0)) } }(this, document), Modernizr.load = function () { yepnope.apply(window, [].slice.call(arguments, 0)) };
!function (a) { function b() { } function c(a) { function c(b) { b.prototype.option || (b.prototype.option = function (b) { a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b)) }) } function e(b, c) { a.fn[b] = function (e) { if ("string" == typeof e) { for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) { var j = this[h], k = a.data(j, b); if (k) if (a.isFunction(k[e]) && "_" !== e.charAt(0)) { var l = k[e].apply(k, g); if (void 0 !== l) return l } else f("no such method '" + e + "' for " + b + " instance"); else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'") } return this } return this.each(function () { var d = a.data(this, b); d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d)) }) } } if (a) { var f = "undefined" == typeof console ? b : function (a) { console.error(a) }; return a.bridget = function (a, b) { c(b), e(a, b) }, a.bridget } } var d = Array.prototype.slice; "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c(a.jQuery) }(window), function (a) { function b(b) { var c = a.event; return c.target = c.target || c.srcElement || b, c } var c = document.documentElement, d = function () { }; c.addEventListener ? d = function (a, b, c) { a.addEventListener(b, c, !1) } : c.attachEvent && (d = function (a, c, d) { a[c + d] = d.handleEvent ? function () { var c = b(a); d.handleEvent.call(d, c) } : function () { var c = b(a); d.call(a, c) }, a.attachEvent("on" + c, a[c + d]) }); var e = function () { }; c.removeEventListener ? e = function (a, b, c) { a.removeEventListener(b, c, !1) } : c.detachEvent && (e = function (a, b, c) { a.detachEvent("on" + b, a[b + c]); try { delete a[b + c] } catch (d) { a[b + c] = void 0 } }); var f = { bind: d, unbind: e }; "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f }(this), function (a) { function b(a) { "function" == typeof a && (b.isReady ? a() : f.push(a)) } function c(a) { var c = "readystatechange" === a.type && "complete" !== e.readyState; if (!b.isReady && !c) { b.isReady = !0; for (var d = 0, g = f.length; g > d; d++) { var h = f[d]; h() } } } function d(d) { return d.bind(e, "DOMContentLoaded", c), d.bind(e, "readystatechange", c), d.bind(a, "load", c), b } var e = a.document, f = []; b.isReady = !1, "function" == typeof define && define.amd ? (b.isReady = "function" == typeof requirejs, define("doc-ready/doc-ready", ["eventie/eventie"], d)) : a.docReady = d(a.eventie) }(this), function () { function a() { } function b(a, b) { for (var c = a.length; c--;) if (a[c].listener === b) return c; return -1 } function c(a) { return function () { return this[a].apply(this, arguments) } } var d = a.prototype, e = this, f = e.EventEmitter; d.getListeners = function (a) { var b, c, d = this._getEvents(); if (a instanceof RegExp) { b = {}; for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]) } else b = d[a] || (d[a] = []); return b }, d.flattenListeners = function (a) { var b, c = []; for (b = 0; b < a.length; b += 1) c.push(a[b].listener); return c }, d.getListenersAsObject = function (a) { var b, c = this.getListeners(a); return c instanceof Array && (b = {}, b[a] = c), b || c }, d.addListener = function (a, c) { var d, e = this.getListenersAsObject(a), f = "object" == typeof c; for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : { listener: c, once: !1 }); return this }, d.on = c("addListener"), d.addOnceListener = function (a, b) { return this.addListener(a, { listener: b, once: !0 }) }, d.once = c("addOnceListener"), d.defineEvent = function (a) { return this.getListeners(a), this }, d.defineEvents = function (a) { for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]); return this }, d.removeListener = function (a, c) { var d, e, f = this.getListenersAsObject(a); for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1)); return this }, d.off = c("removeListener"), d.addListeners = function (a, b) { return this.manipulateListeners(!1, a, b) }, d.removeListeners = function (a, b) { return this.manipulateListeners(!0, a, b) }, d.manipulateListeners = function (a, b, c) { var d, e, f = a ? this.removeListener : this.addListener, g = a ? this.removeListeners : this.addListeners; if ("object" != typeof b || b instanceof RegExp) for (d = c.length; d--;) f.call(this, b, c[d]); else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e)); return this }, d.removeEvent = function (a) { var b, c = typeof a, d = this._getEvents(); if ("string" === c) delete d[a]; else if (a instanceof RegExp) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b]; else delete this._events; return this }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function (a, b) { var c, d, e, f, g = this.getListenersAsObject(a); for (e in g) if (g.hasOwnProperty(e)) for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener); return this }, d.trigger = c("emitEvent"), d.emit = function (a) { var b = Array.prototype.slice.call(arguments, 1); return this.emitEvent(a, b) }, d.setOnceReturnValue = function (a) { return this._onceReturnValue = a, this }, d._getOnceReturnValue = function () { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, d._getEvents = function () { return this._events || (this._events = {}) }, a.noConflict = function () { return e.EventEmitter = f, a }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () { return a }) : "object" == typeof module && module.exports ? module.exports = a : this.EventEmitter = a }.call(this), function (a) { function b(a) { if (a) { if ("string" == typeof d[a]) return a; a = a.charAt(0).toUpperCase() + a.slice(1); for (var b, e = 0, f = c.length; f > e; e++) if (b = c[e] + a, "string" == typeof d[b]) return b } } var c = "Webkit Moz ms Ms O".split(" "), d = document.documentElement.style; "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function () { return b }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b }(window), function (a) { function b(a) { var b = parseFloat(a), c = -1 === a.indexOf("%") && !isNaN(b); return c && b } function c() { for (var a = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, b = 0, c = g.length; c > b; b++) { var d = g[b]; a[d] = 0 } return a } function d(a) { function d(a) { if ("string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) { var d = f(a); if ("none" === d.display) return c(); var e = {}; e.width = a.offsetWidth, e.height = a.offsetHeight; for (var k = e.isBorderBox = !(!j || !d[j] || "border-box" !== d[j]), l = 0, m = g.length; m > l; l++) { var n = g[l], o = d[n]; o = h(a, o); var p = parseFloat(o); e[n] = isNaN(p) ? 0 : p } var q = e.paddingLeft + e.paddingRight, r = e.paddingTop + e.paddingBottom, s = e.marginLeft + e.marginRight, t = e.marginTop + e.marginBottom, u = e.borderLeftWidth + e.borderRightWidth, v = e.borderTopWidth + e.borderBottomWidth, w = k && i, x = b(d.width); x !== !1 && (e.width = x + (w ? 0 : q + u)); var y = b(d.height); return y !== !1 && (e.height = y + (w ? 0 : r + v)), e.innerWidth = e.width - (q + u), e.innerHeight = e.height - (r + v), e.outerWidth = e.width + s, e.outerHeight = e.height + t, e } } function h(a, b) { if (e || -1 === b.indexOf("%")) return b; var c = a.style, d = c.left, f = a.runtimeStyle, g = f && f.left; return g && (f.left = a.currentStyle.left), c.left = b, b = c.pixelLeft, c.left = d, g && (f.left = g), b } var i, j = a("boxSizing"); return function () { if (j) { var a = document.createElement("div"); a.style.width = "200px", a.style.padding = "1px 2px 3px 4px", a.style.borderStyle = "solid", a.style.borderWidth = "1px 2px 3px 4px", a.style[j] = "border-box"; var c = document.body || document.documentElement; c.appendChild(a); var d = f(a); i = 200 === b(d.width), c.removeChild(a) } }(), d } var e = a.getComputedStyle, f = e ? function (a) { return e(a, null) } : function (a) { return a.currentStyle }, g = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"]; "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], d) : "object" == typeof exports ? module.exports = d(require("get-style-property")) : a.getSize = d(a.getStyleProperty) }(window), function (a, b) { function c(a, b) { return a[h](b) } function d(a) { if (!a.parentNode) { var b = document.createDocumentFragment(); b.appendChild(a) } } function e(a, b) { d(a); for (var c = a.parentNode.querySelectorAll(b), e = 0, f = c.length; f > e; e++) if (c[e] === a) return !0; return !1 } function f(a, b) { return d(a), c(a, b) } var g, h = function () { if (b.matchesSelector) return "matchesSelector"; for (var a = ["webkit", "moz", "ms", "o"], c = 0, d = a.length; d > c; c++) { var e = a[c], f = e + "MatchesSelector"; if (b[f]) return f } }(); if (h) { var i = document.createElement("div"), j = c(i, "div"); g = j ? c : f } else g = e; "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function () { return g }) : window.matchesSelector = g }(this, Element.prototype), function (a) { function b(a, b) { for (var c in b) a[c] = b[c]; return a } function c(a) { for (var b in a) return !1; return b = null, !0 } function d(a) { return a.replace(/([A-Z])/g, function (a) { return "-" + a.toLowerCase() }) } function e(a, e, f) { function h(a, b) { a && (this.element = a, this.layout = b, this.position = { x: 0, y: 0 }, this._create()) } var i = f("transition"), j = f("transform"), k = i && j, l = !!f("perspective"), m = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "otransitionend", transition: "transitionend" }[i], n = ["transform", "transition", "transitionDuration", "transitionProperty"], o = function () { for (var a = {}, b = 0, c = n.length; c > b; b++) { var d = n[b], e = f(d); e && e !== d && (a[d] = e) } return a }(); b(h.prototype, a.prototype), h.prototype._create = function () { this._transn = { ingProperties: {}, clean: {}, onEnd: {} }, this.css({ position: "absolute" }) }, h.prototype.handleEvent = function (a) { var b = "on" + a.type; this[b] && this[b](a) }, h.prototype.getSize = function () { this.size = e(this.element) }, h.prototype.css = function (a) { var b = this.element.style; for (var c in a) { var d = o[c] || c; b[d] = a[c] } }, h.prototype.getPosition = function () { var a = g(this.element), b = this.layout.options, c = b.isOriginLeft, d = b.isOriginTop, e = parseInt(a[c ? "left" : "right"], 10), f = parseInt(a[d ? "top" : "bottom"], 10); e = isNaN(e) ? 0 : e, f = isNaN(f) ? 0 : f; var h = this.layout.size; e -= c ? h.paddingLeft : h.paddingRight, f -= d ? h.paddingTop : h.paddingBottom, this.position.x = e, this.position.y = f }, h.prototype.layoutPosition = function () { var a = this.layout.size, b = this.layout.options, c = {}; b.isOriginLeft ? (c.left = this.position.x + a.paddingLeft + "px", c.right = "") : (c.right = this.position.x + a.paddingRight + "px", c.left = ""), b.isOriginTop ? (c.top = this.position.y + a.paddingTop + "px", c.bottom = "") : (c.bottom = this.position.y + a.paddingBottom + "px", c.top = ""), this.css(c), this.emitEvent("layout", [this]) }; var p = l ? function (a, b) { return "translate3d(" + a + "px, " + b + "px, 0)" } : function (a, b) { return "translate(" + a + "px, " + b + "px)" }; h.prototype._transitionTo = function (a, b) { this.getPosition(); var c = this.position.x, d = this.position.y, e = parseInt(a, 10), f = parseInt(b, 10), g = e === this.position.x && f === this.position.y; if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition(); var h = a - c, i = b - d, j = {}, k = this.layout.options; h = k.isOriginLeft ? h : -h, i = k.isOriginTop ? i : -i, j.transform = p(h, i), this.transition({ to: j, onTransitionEnd: { transform: this.layoutPosition }, isCleaning: !0 }) }, h.prototype.goTo = function (a, b) { this.setPosition(a, b), this.layoutPosition() }, h.prototype.moveTo = k ? h.prototype._transitionTo : h.prototype.goTo, h.prototype.setPosition = function (a, b) { this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10) }, h.prototype._nonTransition = function (a) { this.css(a.to), a.isCleaning && this._removeStyles(a.to); for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this) }, h.prototype._transition = function (a) { if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a); var b = this._transn; for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c]; for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0); if (a.from) { this.css(a.from); var d = this.element.offsetHeight; d = null } this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0 }; var q = j && d(j) + ",opacity"; h.prototype.enableTransition = function () { this.isTransitioning || (this.css({ transitionProperty: q, transitionDuration: this.layout.options.transitionDuration }), this.element.addEventListener(m, this, !1)) }, h.prototype.transition = h.prototype[i ? "_transition" : "_nonTransition"], h.prototype.onwebkitTransitionEnd = function (a) { this.ontransitionend(a) }, h.prototype.onotransitionend = function (a) { this.ontransitionend(a) }; var r = { "-webkit-transform": "transform", "-moz-transform": "transform", "-o-transform": "transform" }; h.prototype.ontransitionend = function (a) { if (a.target === this.element) { var b = this._transn, d = r[a.propertyName] || a.propertyName; if (delete b.ingProperties[d], c(b.ingProperties) && this.disableTransition(), d in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[d]), d in b.onEnd) { var e = b.onEnd[d]; e.call(this), delete b.onEnd[d] } this.emitEvent("transitionEnd", [this]) } }, h.prototype.disableTransition = function () { this.removeTransitionStyles(), this.element.removeEventListener(m, this, !1), this.isTransitioning = !1 }, h.prototype._removeStyles = function (a) { var b = {}; for (var c in a) b[c] = ""; this.css(b) }; var s = { transitionProperty: "", transitionDuration: "" }; return h.prototype.removeTransitionStyles = function () { this.css(s) }, h.prototype.removeElem = function () { this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this]) }, h.prototype.remove = function () { if (!i || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem(); var a = this; this.on("transitionEnd", function () { return a.removeElem(), !0 }), this.hide() }, h.prototype.reveal = function () { delete this.isHidden, this.css({ display: "" }); var a = this.layout.options; this.transition({ from: a.hiddenStyle, to: a.visibleStyle, isCleaning: !0 }) }, h.prototype.hide = function () { this.isHidden = !0, this.css({ display: "" }); var a = this.layout.options; this.transition({ from: a.visibleStyle, to: a.hiddenStyle, isCleaning: !0, onTransitionEnd: { opacity: function () { this.isHidden && this.css({ display: "none" }) } } }) }, h.prototype.destroy = function () { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, h } var f = a.getComputedStyle, g = f ? function (a) { return f(a, null) } : function (a) { return a.currentStyle }; "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property"], e) : (a.Outlayer = {}, a.Outlayer.Item = e(a.EventEmitter, a.getSize, a.getStyleProperty)) }(window), function (a) { function b(a, b) { for (var c in b) a[c] = b[c]; return a } function c(a) { return "[object Array]" === l.call(a) } function d(a) { var b = []; if (c(a)) b = a; else if (a && "number" == typeof a.length) for (var d = 0, e = a.length; e > d; d++) b.push(a[d]); else b.push(a); return b } function e(a, b) { var c = n(b, a); -1 !== c && b.splice(c, 1) } function f(a) { return a.replace(/(.)([A-Z])/g, function (a, b, c) { return b + "-" + c }).toLowerCase() } function g(c, g, l, n, o, p) { function q(a, c) { if ("string" == typeof a && (a = h.querySelector(a)), !a || !m(a)) return void (i && i.error("Bad " + this.constructor.namespace + " element: " + a)); this.element = a, this.options = b({}, this.constructor.defaults), this.option(c); var d = ++r; this.element.outlayerGUID = d, s[d] = this, this._create(), this.options.isInitLayout && this.layout() } var r = 0, s = {}; return q.namespace = "outlayer", q.Item = p, q.defaults = { containerStyle: { position: "relative" }, isInitLayout: !0, isOriginLeft: !0, isOriginTop: !0, isResizeBound: !0, isResizingContainer: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }, b(q.prototype, l.prototype), q.prototype.option = function (a) { b(this.options, a) }, q.prototype._create = function () { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), b(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize() }, q.prototype.reloadItems = function () { this.items = this._itemize(this.element.children) }, q.prototype._itemize = function (a) { for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) { var g = b[e], h = new c(g, this); d.push(h) } return d }, q.prototype._filterFindItemElements = function (a) { a = d(a); for (var b = this.options.itemSelector, c = [], e = 0, f = a.length; f > e; e++) { var g = a[e]; if (m(g)) if (b) { o(g, b) && c.push(g); for (var h = g.querySelectorAll(b), i = 0, j = h.length; j > i; i++) c.push(h[i]) } else c.push(g) } return c }, q.prototype.getItemElements = function () { for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element); return a }, q.prototype.layout = function () { this._resetLayout(), this._manageStamps(); var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited; this.layoutItems(this.items, a), this._isLayoutInited = !0 }, q.prototype._init = q.prototype.layout, q.prototype._resetLayout = function () { this.getSize() }, q.prototype.getSize = function () { this.size = n(this.element) }, q.prototype._getMeasurement = function (a, b) { var c, d = this.options[a]; d ? ("string" == typeof d ? c = this.element.querySelector(d) : m(d) && (c = d), this[a] = c ? n(c)[b] : d) : this[a] = 0 }, q.prototype.layoutItems = function (a, b) { a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout() }, q.prototype._getItemsForLayout = function (a) { for (var b = [], c = 0, d = a.length; d > c; c++) { var e = a[c]; e.isIgnored || b.push(e) } return b }, q.prototype._layoutItems = function (a, b) { function c() { d.emitEvent("layoutComplete", [d, a]) } var d = this; if (!a || !a.length) return void c(); this._itemsOn(a, "layout", c); for (var e = [], f = 0, g = a.length; g > f; f++) { var h = a[f], i = this._getItemLayoutPosition(h); i.item = h, i.isInstant = b || h.isLayoutInstant, e.push(i) } this._processLayoutQueue(e) }, q.prototype._getItemLayoutPosition = function () { return { x: 0, y: 0 } }, q.prototype._processLayoutQueue = function (a) { for (var b = 0, c = a.length; c > b; b++) { var d = a[b]; this._positionItem(d.item, d.x, d.y, d.isInstant) } }, q.prototype._positionItem = function (a, b, c, d) { d ? a.goTo(b, c) : a.moveTo(b, c) }, q.prototype._postLayout = function () { this.resizeContainer() }, q.prototype.resizeContainer = function () { if (this.options.isResizingContainer) { var a = this._getContainerSize(); a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1)) } }, q.prototype._getContainerSize = k, q.prototype._setContainerMeasure = function (a, b) { if (void 0 !== a) { var c = this.size; c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px" } }, q.prototype._itemsOn = function (a, b, c) { function d() { return e++, e === f && c.call(g), !0 } for (var e = 0, f = a.length, g = this, h = 0, i = a.length; i > h; h++) { var j = a[h]; j.on(b, d) } }, q.prototype.ignore = function (a) { var b = this.getItem(a); b && (b.isIgnored = !0) }, q.prototype.unignore = function (a) { var b = this.getItem(a); b && delete b.isIgnored }, q.prototype.stamp = function (a) { if (a = this._find(a)) { this.stamps = this.stamps.concat(a); for (var b = 0, c = a.length; c > b; b++) { var d = a[b]; this.ignore(d) } } }, q.prototype.unstamp = function (a) { if (a = this._find(a)) for (var b = 0, c = a.length; c > b; b++) { var d = a[b]; e(d, this.stamps), this.unignore(d) } }, q.prototype._find = function (a) { return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = d(a)) : void 0 }, q.prototype._manageStamps = function () { if (this.stamps && this.stamps.length) { this._getBoundingRect(); for (var a = 0, b = this.stamps.length; b > a; a++) { var c = this.stamps[a]; this._manageStamp(c) } } }, q.prototype._getBoundingRect = function () { var a = this.element.getBoundingClientRect(), b = this.size; this._boundingRect = { left: a.left + b.paddingLeft + b.borderLeftWidth, top: a.top + b.paddingTop + b.borderTopWidth, right: a.right - (b.paddingRight + b.borderRightWidth), bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth) } }, q.prototype._manageStamp = k, q.prototype._getElementOffset = function (a) { var b = a.getBoundingClientRect(), c = this._boundingRect, d = n(a), e = { left: b.left - c.left - d.marginLeft, top: b.top - c.top - d.marginTop, right: c.right - b.right - d.marginRight, bottom: c.bottom - b.bottom - d.marginBottom }; return e }, q.prototype.handleEvent = function (a) { var b = "on" + a.type; this[b] && this[b](a) }, q.prototype.bindResize = function () { this.isResizeBound || (c.bind(a, "resize", this), this.isResizeBound = !0) }, q.prototype.unbindResize = function () { this.isResizeBound && c.unbind(a, "resize", this), this.isResizeBound = !1 }, q.prototype.onresize = function () { function a() { b.resize(), delete b.resizeTimeout } this.resizeTimeout && clearTimeout(this.resizeTimeout); var b = this; this.resizeTimeout = setTimeout(a, 100) }, q.prototype.resize = function () { this.isResizeBound && this.needsResizeLayout() && this.layout() }, q.prototype.needsResizeLayout = function () { var a = n(this.element), b = this.size && a; return b && a.innerWidth !== this.size.innerWidth }, q.prototype.addItems = function (a) { var b = this._itemize(a); return b.length && (this.items = this.items.concat(b)), b }, q.prototype.appended = function (a) { var b = this.addItems(a); b.length && (this.layoutItems(b, !0), this.reveal(b)) }, q.prototype.prepended = function (a) { var b = this._itemize(a); if (b.length) { var c = this.items.slice(0); this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c) } }, q.prototype.reveal = function (a) { var b = a && a.length; if (b) for (var c = 0; b > c; c++) { var d = a[c]; d.reveal() } }, q.prototype.hide = function (a) { var b = a && a.length; if (b) for (var c = 0; b > c; c++) { var d = a[c]; d.hide() } }, q.prototype.getItem = function (a) { for (var b = 0, c = this.items.length; c > b; b++) { var d = this.items[b]; if (d.element === a) return d } }, q.prototype.getItems = function (a) { if (a && a.length) { for (var b = [], c = 0, d = a.length; d > c; c++) { var e = a[c], f = this.getItem(e); f && b.push(f) } return b } }, q.prototype.remove = function (a) { a = d(a); var b = this.getItems(a); if (b && b.length) { this._itemsOn(b, "remove", function () { this.emitEvent("removeComplete", [this, b]) }); for (var c = 0, f = b.length; f > c; c++) { var g = b[c]; g.remove(), e(g, this.items) } } }, q.prototype.destroy = function () { var a = this.element.style; a.height = "", a.position = "", a.width = ""; for (var b = 0, c = this.items.length; c > b; b++) { var d = this.items[b]; d.destroy() } this.unbindResize(), delete this.element.outlayerGUID, j && j.removeData(this.element, this.constructor.namespace) }, q.data = function (a) { var b = a && a.outlayerGUID; return b && s[b] }, q.create = function (a, c) { function d() { q.apply(this, arguments) } return Object.create ? d.prototype = Object.create(q.prototype) : b(d.prototype, q.prototype), d.prototype.constructor = d, d.defaults = b({}, q.defaults), b(d.defaults, c), d.prototype.settings = {}, d.namespace = a, d.data = q.data, d.Item = function () { p.apply(this, arguments) }, d.Item.prototype = new p, g(function () { for (var b = f(a), c = h.querySelectorAll(".js-" + b), e = "data-" + b + "-options", g = 0, k = c.length; k > g; g++) { var l, m = c[g], n = m.getAttribute(e); try { l = n && JSON.parse(n) } catch (o) { i && i.error("Error parsing " + e + " on " + m.nodeName.toLowerCase() + (m.id ? "#" + m.id : "") + ": " + o); continue } var p = new d(m, l); j && j.data(m, a, p) } }), j && j.bridget && j.bridget(a, d), d }, q.Item = p, q } var h = a.document, i = a.console, j = a.jQuery, k = function () { }, l = Object.prototype.toString, m = "object" == typeof HTMLElement ? function (a) { return a instanceof HTMLElement } : function (a) { return a && "object" == typeof a && 1 === a.nodeType && "string" == typeof a.nodeName }, n = Array.prototype.indexOf ? function (a, b) { return a.indexOf(b) } : function (a, b) { for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c; return -1 }; "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], g) : a.Outlayer = g(a.eventie, a.docReady, a.EventEmitter, a.getSize, a.matchesSelector, a.Outlayer.Item) }(window), function (a) { function b(a, b) { var d = a.create("masonry"); return d.prototype._resetLayout = function () { this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(); var a = this.cols; for (this.colYs = []; a--;) this.colYs.push(0); this.maxY = 0 }, d.prototype.measureColumns = function () { if (this.getContainerWidth(), !this.columnWidth) { var a = this.items[0], c = a && a.element; this.columnWidth = c && b(c).outerWidth || this.containerWidth } this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1) }, d.prototype.getContainerWidth = function () { var a = this.options.isFitWidth ? this.element.parentNode : this.element, c = b(a); this.containerWidth = c && c.innerWidth }, d.prototype._getItemLayoutPosition = function (a) { a.getSize(); var b = a.size.outerWidth % this.columnWidth, d = b && 1 > b ? "round" : "ceil", e = Math[d](a.size.outerWidth / this.columnWidth); e = Math.min(e, this.cols); for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c(f, g), i = { x: this.columnWidth * h, y: g }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j; return i }, d.prototype._getColGroup = function (a) { if (2 > a) return this.colYs; for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) { var e = this.colYs.slice(d, d + a); b[d] = Math.max.apply(Math, e) } return b }, d.prototype._manageStamp = function (a) { var c = b(a), d = this._getElementOffset(a), e = this.options.isOriginLeft ? d.left : d.right, f = e + c.outerWidth, g = Math.floor(e / this.columnWidth); g = Math.max(0, g); var h = Math.floor(f / this.columnWidth); h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h); for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j]) }, d.prototype._getContainerSize = function () { this.maxY = Math.max.apply(Math, this.colYs); var a = { height: this.maxY }; return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a }, d.prototype._getContainerFitWidth = function () { for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++; return (this.cols - a) * this.columnWidth - this.gutter }, d.prototype.needsResizeLayout = function () { var a = this.containerWidth; return this.getContainerWidth(), a !== this.containerWidth }, d } var c = Array.prototype.indexOf ? function (a, b) { return a.indexOf(b) } : function (a, b) { for (var c = 0, d = a.length; d > c; c++) { var e = a[c]; if (e === b) return c } return -1 }; "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], b) : a.Masonry = b(a.Outlayer, a.getSize) }(window);
(function () { function e() { } function t(e, t) { for (var n = e.length; n--;) if (e[n].listener === t) return n; return -1 } function n(e) { return function () { return this[e].apply(this, arguments) } } var i = e.prototype, r = this, o = r.EventEmitter; i.getListeners = function (e) { var t, n, i = this._getEvents(); if ("object" == typeof e) { t = {}; for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]) } else t = i[e] || (i[e] = []); return t }, i.flattenListeners = function (e) { var t, n = []; for (t = 0; e.length > t; t += 1) n.push(e[t].listener); return n }, i.getListenersAsObject = function (e) { var t, n = this.getListeners(e); return n instanceof Array && (t = {}, t[e] = n), t || n }, i.addListener = function (e, n) { var i, r = this.getListenersAsObject(e), o = "object" == typeof n; for (i in r) r.hasOwnProperty(i) && -1 === t(r[i], n) && r[i].push(o ? n : { listener: n, once: !1 }); return this }, i.on = n("addListener"), i.addOnceListener = function (e, t) { return this.addListener(e, { listener: t, once: !0 }) }, i.once = n("addOnceListener"), i.defineEvent = function (e) { return this.getListeners(e), this }, i.defineEvents = function (e) { for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]); return this }, i.removeListener = function (e, n) { var i, r, o = this.getListenersAsObject(e); for (r in o) o.hasOwnProperty(r) && (i = t(o[r], n), -1 !== i && o[r].splice(i, 1)); return this }, i.off = n("removeListener"), i.addListeners = function (e, t) { return this.manipulateListeners(!1, e, t) }, i.removeListeners = function (e, t) { return this.manipulateListeners(!0, e, t) }, i.manipulateListeners = function (e, t, n) { var i, r, o = e ? this.removeListener : this.addListener, s = e ? this.removeListeners : this.addListeners; if ("object" != typeof t || t instanceof RegExp) for (i = n.length; i--;) o.call(this, t, n[i]); else for (i in t) t.hasOwnProperty(i) && (r = t[i]) && ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r)); return this }, i.removeEvent = function (e) { var t, n = typeof e, i = this._getEvents(); if ("string" === n) delete i[e]; else if ("object" === n) for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t]; else delete this._events; return this }, i.removeAllListeners = n("removeEvent"), i.emitEvent = function (e, t) { var n, i, r, o, s = this.getListenersAsObject(e); for (r in s) if (s.hasOwnProperty(r)) for (i = s[r].length; i--;) n = s[r][i], n.once === !0 && this.removeListener(e, n.listener), o = n.listener.apply(this, t || []), o === this._getOnceReturnValue() && this.removeListener(e, n.listener); return this }, i.trigger = n("emitEvent"), i.emit = function (e) { var t = Array.prototype.slice.call(arguments, 1); return this.emitEvent(e, t) }, i.setOnceReturnValue = function (e) { return this._onceReturnValue = e, this }, i._getOnceReturnValue = function () { return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0 }, i._getEvents = function () { return this._events || (this._events = {}) }, e.noConflict = function () { return r.EventEmitter = o, e }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function () { return e }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e }).call(this), function (e) { function t(t) { var n = e.event; return n.target = n.target || n.srcElement || t, n } var n = document.documentElement, i = function () { }; n.addEventListener ? i = function (e, t, n) { e.addEventListener(t, n, !1) } : n.attachEvent && (i = function (e, n, i) { e[n + i] = i.handleEvent ? function () { var n = t(e); i.handleEvent.call(i, n) } : function () { var n = t(e); i.call(e, n) }, e.attachEvent("on" + n, e[n + i]) }); var r = function () { }; n.removeEventListener ? r = function (e, t, n) { e.removeEventListener(t, n, !1) } : n.detachEvent && (r = function (e, t, n) { e.detachEvent("on" + t, e[t + n]); try { delete e[t + n] } catch (i) { e[t + n] = void 0 } }); var o = { bind: i, unbind: r }; "function" == typeof define && define.amd ? define("eventie/eventie", o) : e.eventie = o }(this), function (e, t) { "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (n, i) { return t(e, n, i) }) : "object" == typeof exports ? module.exports = t(e, require("eventEmitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie) }(this, function (e, t, n) { function i(e, t) { for (var n in t) e[n] = t[n]; return e } function r(e) { return "[object Array]" === d.call(e) } function o(e) { var t = []; if (r(e)) t = e; else if ("number" == typeof e.length) for (var n = 0, i = e.length; i > n; n++) t.push(e[n]); else t.push(e); return t } function s(e, t, n) { if (!(this instanceof s)) return new s(e, t); "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = o(e), this.options = i({}, this.options), "function" == typeof t ? n = t : i(this.options, t), n && this.on("always", n), this.getImages(), a && (this.jqDeferred = new a.Deferred); var r = this; setTimeout(function () { r.check() }) } function c(e) { this.img = e } function f(e) { this.src = e, v[e] = this } var a = e.jQuery, u = e.console, h = u !== void 0, d = Object.prototype.toString; s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () { this.images = []; for (var e = 0, t = this.elements.length; t > e; e++) { var n = this.elements[e]; "IMG" === n.nodeName && this.addImage(n); var i = n.nodeType; if (i && (1 === i || 9 === i || 11 === i)) for (var r = n.querySelectorAll("img"), o = 0, s = r.length; s > o; o++) { var c = r[o]; this.addImage(c) } } }, s.prototype.addImage = function (e) { var t = new c(e); this.images.push(t) }, s.prototype.check = function () { function e(e, r) { return t.options.debug && h && u.log("confirm", e, r), t.progress(e), n++, n === i && t.complete(), !0 } var t = this, n = 0, i = this.images.length; if (this.hasAnyBroken = !1, !i) return this.complete(), void 0; for (var r = 0; i > r; r++) { var o = this.images[r]; o.on("confirm", e), o.check() } }, s.prototype.progress = function (e) { this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded; var t = this; setTimeout(function () { t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e) }) }, s.prototype.complete = function () { var e = this.hasAnyBroken ? "fail" : "done"; this.isComplete = !0; var t = this; setTimeout(function () { if (t.emit(e, t), t.emit("always", t), t.jqDeferred) { var n = t.hasAnyBroken ? "reject" : "resolve"; t.jqDeferred[n](t) } }) }, a && (a.fn.imagesLoaded = function (e, t) { var n = new s(this, e, t); return n.jqDeferred.promise(a(this)) }), c.prototype = new t, c.prototype.check = function () { var e = v[this.img.src] || new f(this.img.src); if (e.isConfirmed) return this.confirm(e.isLoaded, "cached was confirmed"), void 0; if (this.img.complete && void 0 !== this.img.naturalWidth) return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0; var t = this; e.on("confirm", function (e, n) { return t.confirm(e.isLoaded, n), !0 }), e.check() }, c.prototype.confirm = function (e, t) { this.isLoaded = e, this.emit("confirm", this, t) }; var v = {}; return f.prototype = new t, f.prototype.check = function () { if (!this.isChecked) { var e = new Image; n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked = !0 } }, f.prototype.handleEvent = function (e) { var t = "on" + e.type; this[t] && this[t](e) }, f.prototype.onload = function (e) { this.confirm(!0, "onload"), this.unbindProxyEvents(e) }, f.prototype.onerror = function (e) { this.confirm(!1, "onerror"), this.unbindProxyEvents(e) }, f.prototype.confirm = function (e, t) { this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t) }, f.prototype.unbindProxyEvents = function (e) { n.unbind(e.target, "load", this), n.unbind(e.target, "error", this) }, s });
(function (window) { 'use strict'; function classReg(className) { return new RegExp("(^|\\s+)" + className + "(\\s+|$)") } var hasClass, addClass, removeClass; if ('classList' in document.documentElement) { hasClass = function (elem, c) { return elem.classList.contains(c) }; addClass = function (elem, c) { elem.classList.add(c) }; removeClass = function (elem, c) { elem.classList.remove(c) } } else { hasClass = function (elem, c) { return classReg(c).test(elem.className) }; addClass = function (elem, c) { if (!hasClass(elem, c)) { elem.className = elem.className + ' ' + c } }; removeClass = function (elem, c) { elem.className = elem.className.replace(classReg(c), ' ') } } function toggleClass(elem, c) { var fn = hasClass(elem, c) ? removeClass : addClass; fn(elem, c) } var classie = { hasClass: hasClass, addClass: addClass, removeClass: removeClass, toggleClass: toggleClass, has: hasClass, add: addClass, remove: removeClass, toggle: toggleClass }; if (typeof define === 'function' && define.amd) { define(classie) } else { window.classie = classie } })(window);
function ColorFinder(colorFactorCallback) { this.callback = colorFactorCallback; this.getMostProminentColor = function (imgEl) { var rgb = null; if (!this.callback) this.callback = function () { return 1 }; var data = this.getImageData(imgEl); rgb = this.getMostProminentRGBImpl(data, 6, rgb, this.callback); rgb = this.getMostProminentRGBImpl(data, 4, rgb, this.callback); rgb = this.getMostProminentRGBImpl(data, 2, rgb, this.callback); rgb = this.getMostProminentRGBImpl(data, 0, rgb, this.callback); return rgb }; this.getImageData = function (imgEl, degrade, rgbMatch, colorFactorCallback) { var rgb, canvas = document.createElement('canvas'), context = canvas.getContext && canvas.getContext('2d'), data, width, height, key, i = -4, db = {}, length, r, g, b, count = 0; if (!context) { return defaultRGB } height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height; width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width; context.drawImage(imgEl, 0, 0); try { data = context.getImageData(0, 0, width, height) } catch (e) { return null } length = data.data.length; var factor = Math.max(1, Math.round(length / 5000)); var result = {}; while ((i += 4 * factor) < length) { if (data.data[i + 3] > 32) { key = (data.data[i] >> degrade) + "," + (data.data[i + 1] >> degrade) + "," + (data.data[i + 2] >> degrade); if (!result.hasOwnProperty(key)) { rgb = { r: data.data[i], g: data.data[i + 1], b: data.data[i + 2], count: 1 }; rgb.weight = this.callback(rgb.r, rgb.g, rgb.b); if (rgb.weight <= 0) rgb.weight = 1e-10; result[key] = rgb } else { rgb = result[key]; rgb.count++ } } } return result }; this.getMostProminentRGBImpl = function (pixels, degrade, rgbMatch, colorFactorCallback) { var rgb = { r: 0, g: 0, b: 0, count: 0, d: degrade }, db = {}, pixel, pixelKey, pixelGroupKey, length, r, g, b, count = 0; for (pixelKey in pixels) { pixel = pixels[pixelKey]; totalWeight = pixel.weight * pixel.count; ++count; if (this.doesRgbMatch(rgbMatch, pixel.r, pixel.g, pixel.b)) { pixelGroupKey = (pixel.r >> degrade) + "," + (pixel.g >> degrade) + "," + (pixel.b >> degrade); if (db.hasOwnProperty(pixelGroupKey)) db[pixelGroupKey] += totalWeight; else db[pixelGroupKey] = totalWeight } } for (i in db) { data = i.split(","); r = data[0]; g = data[1]; b = data[2]; count = db[i]; if (count > rgb.count) { rgb.count = count; data = i.split(","); rgb.r = r; rgb.g = g; rgb.b = b } } return rgb }; this.doesRgbMatch = function (rgb, r, g, b) { if (rgb == null) return true; r = r >> rgb.d; g = g >> rgb.d; b = b >> rgb.d; return rgb.r == r && rgb.g == g && rgb.b == b } }
; (function (window) {

    'use strict';

    var docElem = window.document.documentElement,
		support = { animations: Modernizr.cssanimations },
		animEndEventNames = {
		    'WebkitAnimation': 'webkitAnimationEnd',
		    'OAnimation': 'oAnimationEnd',
		    'msAnimation': 'MSAnimationEnd',
		    'animation': 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

    function getViewportH() {
        var client = docElem['clientHeight'],
			inner = window['innerHeight'];

        if (client < inner)
            return inner;
        else
            return client;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    // http://stackoverflow.com/a/5598797/989439
    function getOffset(el) {
        var offsetTop = 0, offsetLeft = 0;
        do {
            if (!isNaN(el.offsetTop)) {
                offsetTop += el.offsetTop;
            }
            if (!isNaN(el.offsetLeft)) {
                offsetLeft += el.offsetLeft;
            }
        } while (el = el.offsetParent)

        return {
            top: offsetTop,
            left: offsetLeft
        }
    }

    function inViewport(el, h) {
        var elH = el.offsetHeight,
			scrolled = scrollY(),
			viewed = scrolled + getViewportH(),
			elTop = getOffset(el).top,
			elBottom = elTop + elH,
			// if 0, the element is considered in the viewport as soon as it enters.
			// if 1, the element is considered in the viewport only when it's fully inside
			// value in percentage (1 >= h >= 0)
			h = h || 0;

        return (elTop + elH * h) <= viewed && (elBottom - elH * h) >= scrolled;
    }

    function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function GridItem(el) {
        this.el = el;
        this.anchor = el.querySelector('a')
        this.image = el.querySelector('img');
        this.desc = el.querySelector('h3');
    }

    GridItem.prototype.addCurtain = function () {
        if (!this.image) return;
        this.curtain = document.createElement('div');
        this.curtain.className = 'curtain';
        var rgb = new ColorFinder(function favorHue(r, g, b) {
            // exclude white
            //if (r>245 && g>245 && b>245) return 0;
            return (Math.abs(r - g) * Math.abs(r - g) + Math.abs(r - b) * Math.abs(r - b) + Math.abs(g - b) * Math.abs(g - b)) / 65535 * 50 + 1;
        }).getMostProminentColor(this.image);
        if (rgb.r && rgb.g && rgb.b) {
            this.curtain.style.background = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
        }
        this.anchor.appendChild(this.curtain);
    }

    GridItem.prototype.changeAnimationDelay = function (time) {
        if (this.curtain) {
            this.curtain.style.WebkitAnimationDelay = time + 'ms';
            this.curtain.style.animationDelay = time + 'ms';
        }
        if (this.image) {
            this.image.style.WebkitAnimationDelay = time + 'ms';
            this.image.style.animationDelay = time + 'ms';
        }
        if (this.desc) {
            this.desc.style.WebkitAnimationDelay = time + 'ms';
            this.desc.style.animationDelay = time + 'ms';
        }
    }

    function GridScrollFx(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }

    GridScrollFx.prototype.options = {
        // Minimum and maximum delay of the animation (random value is chosen)
        minDelay: 0,
        maxDelay: 500,
        // The viewportFactor defines how much of the appearing item has to be visible in order for the animation to start
        // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport. 
        // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
        viewportFactor: 0
    }

    GridScrollFx.prototype._init = function () {
        var self = this, items = [];

        [].slice.call(this.el.children).forEach(function (el, i) {
            var item = new GridItem(el);
            items.push(item);
        });

        this.items = items;
        this.itemsCount = this.items.length;
        this.itemsRenderedCount = 0;
        this.didScroll = false;

        imagesLoaded(this.el, function () {
            // show grid
            classie.add(self.el, 'loaded');

            // initialize masonry
            new Masonry(self.el, {
                itemSelector: 'li',
                isFitWidth: true,
                transitionDuration: 0
            });

            // the items already shown...
            self.items.forEach(function (item) {
                if (inViewport(item.el)) {
                    ++self.itemsRenderedCount;
                    classie.add(item.el, 'shown');
                }
                else {
                    item.addCurtain();
                    // add random delay
                    item.changeAnimationDelay(Math.random() * (self.options.maxDelay - self.options.minDelay) + self.options.minDelay);
                }
            });

            var onScrollFn = function () {
                if (!self.didScroll) {
                    self.didScroll = true;
                    setTimeout(function () { self._scrollPage(); }, 200);
                }

                if (self.itemsRenderedCount === self.itemsCount) {
                    window.removeEventListener('scroll', onScrollFn, false);
                }
            }

            // animate the items inside the viewport (on scroll)
            window.addEventListener('scroll', onScrollFn, false);
            // check if new items are in the viewport after a resize
            window.addEventListener('resize', function () { self._resizeHandler(); }, false);
        });
    }

    GridScrollFx.prototype._scrollPage = function () {
        var self = this;
        this.items.forEach(function (item) {
            if (!classie.has(item.el, 'shown') && !classie.has(item.el, 'animate') && inViewport(item.el, self.options.viewportFactor)) {
                ++self.itemsRenderedCount;

                if (!item.curtain) {
                    classie.add(item.el, 'shown');
                    return;
                };

                classie.add(item.el, 'animate');

                // after animation ends add class shown
                var onEndAnimationFn = function (ev) {
                    if (support.animations) {
                        this.removeEventListener(animEndEventName, onEndAnimationFn);
                    }
                    classie.remove(item.el, 'animate');
                    classie.add(item.el, 'shown');
                };

                if (support.animations) {
                    item.curtain.addEventListener(animEndEventName, onEndAnimationFn);
                }
                else {
                    onEndAnimationFn();
                }
            }
        });
        this.didScroll = false;
    }

    GridScrollFx.prototype._resizeHandler = function () {
        var self = this;
        function delayed() {
            self._scrollPage();
            self.resizeTimeout = null;
        }
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(delayed, 1000);
    }

    // add to global namespace
    window.GridScrollFx = GridScrollFx;

})(window);

new GridScrollFx(document.getElementById('grid'), {
    viewportFactor: 0.4
});

$(".thumb-img-wapper img").click(function () {
    $(".grid").find("img").removeClass("img-click")
    $(".grid").find("i").remove();
    $(this).addClass("img-click");
    $(this).after("<i></i>");
});

$(".li-wapper .thumb-img-wapper,.li-wapper .thumb-info").hover(function () {
    $(this).parent().toggleClass("li-hover-wapper");
});

$(".li-wapper .thumb-img-wapper,.li-wapper .thumb-info").mouseover(function () {
    var _lable = $(this).find("label"); 
    _lable.stop().show();
}).mouseout(function () {
    var _lable = $(this).find("label"); 
    if (!_lable.hasClass("check")) {
        _lable.stop().hide();
    } 
}); 

$(".thumb-info label").click(function () {
    $(this).toggleClass("check");
});

$(".thumb-img-wapper s").click(function () {
    var _s = $(this);
    var _h6 = _s.parent().find("h6");
    var _ilength = _h6.find("b").length;
    var _ml = _h6.css("marginLeft").replace("px", "");

    if (_ilength > 5) {
        if (_s.hasClass("thumb-prev")) {
            //prev
            if (-_ml != 0) {
                _h6.stop().animate({ marginLeft: "+=35" }, 500);
            }
        } else {
            if (-_ml < (_ilength - 5) * 35) {  
                _h6.stop().animate({ marginLeft: "+=-35" }, 500);
            }
        }
    }
});

var _bindex = 0;
function animateBanner() {
    _bindex++;
    autoBanner(); 
}
var _abanner = setInterval(animateBanner, 3000);

$("#w-banner-wapper ul li").click(function () { 
    _bindex = $(this).index();
    autoBanner() 
});

function autoBanner() {
    var _bw = $("#w-banner-wapper");
    var _blength = _bw.find("img").length;
    if (_blength == _bindex) {
        _bindex = 0;
    }
    _bw.find("img").hide();
    _bw.find("img").eq(_bindex).fadeIn(500);
    $(".cur-select").removeClass("cur-select");
    _bw.find("li").eq(_bindex).addClass("cur-select");
}

$("#w-banner-wapper").mouseover(function () {
    clearInterval(_abanner);
}).mouseout(function () {
    _abanner = setInterval(animateBanner, 3000);
});

$(".m-nav code").click(function () {
    $(this).toggleClass("all-check");
    if ($(this).hasClass("all-check")) {
        $(".thumb-info label").show().addClass("check");
    } else { 
        $(".thumb-info label").show().removeClass("check");
    }
});