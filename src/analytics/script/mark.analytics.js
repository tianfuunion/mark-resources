/**
 * Mark Analytics v2.0.0_20190719_0910 | (c) TianFu Union/license
 *
 * Mark.Analytics = function(){}
 */
;
!(function () {
    var h = {}, hm = {};
    hm.c = {
        id: "e23800c454aa573c0ccb16b52665ac26",
        js: "https://res.tianfu.pub/analytics/script/mark.analytics.js",
        I: setTimeout,
        v: clearTimeout,
    };
    var p = !0, q = null, r = !1;

    /**
     *  检测是否为360浏览器
     *
     * @returns {string}
     */
    var is360 = function () {
        try {
            if (/UBrowser/i.test(navigator.userAgent)) {
                return '';
            }
            if (typeof window.scrollMaxX !== 'undefined') {
                return '';
            }
            var _track = 'track' in document.createElement('track');
            var webstoreKeysLength = window.chrome && window.chrome.webstore ? Object.keys(window.chrome.webstore).length : 0;
            if (window.clientInformation && window.clientInformation.languages && window.clientInformation.languages.length > 2) {
                return '';
            }
            if (_track) {
                return webstoreKeysLength > 1 ? ' QIHU 360 EE' : ' QIHU 360 SE';
            }
            return '';
        } catch (e) {
            return '';
        }
    };

    /*返回Flash版本号*/
    var getFlash = function () {
        try {
            if (typeof window.ActiveXObject != 'undefined') {
                return parseInt((new ActiveXObject('ShockwaveFlash.ShockwaveFlash')).GetVariable("$version").split(" ")[1].split(",")[0], 10);
            } else {
                return parseInt(navigator.plugins["Shockwave Flash"].description.split(' ')[2], 10);
            }
        } catch (e) {
            return 0;
        }
    };

    /*检测设备信息*/
    /*数据统计版本*/
    hm.i = {};
    hm.i.tp = 1;
    hm.i.notes = "开发版本";
    hm.i.v = "2.0.0";
    hm.i.t = "20190719091200";
    hm.i.rd = (new Date()).getTime() + Math.floor(Math.random() * 1000);

    /*Document对象数据*/
    if (document) {
        hm.i.tt = document.title || "";
        hm.i.u = window.location.href || "";
        hm.i.re = document.referrer || "";
    }
    /*Window对象数据*/
    if (window && window.screen) {
        hm.i.sw = window.screen.width || 0;
        hm.i.sh = window.screen.height || 0;
        hm.i.cd = window.screen.colorDepth || 0;
        hm.i.dpi = window.devicePixelRatio;
    }

    /*Navigator对象数据*/
    if (navigator) {
        hm.i.msie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? 1 : 0;
        hm.i.ck = navigator.cookieEnabled ? 1 : 0;
        hm.i.ja = navigator.javaEnabled() ? 1 : 0;
        hm.i.ln = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage || "";
        hm.i.fl = getFlash();
        hm.i.sb = is360() ? 17 : 0;
    }

    /*解析Mark.tf_mk配置:自定义属性*/
    if (tf_mk) {
        for (var i in tf_mk) {
            hm.i[tf_mk[i][0]] = tf_mk[i][1];
            i += 2;
        }
    }

    /*设置、获取cookie*/
    hm.cookie = {};
    hm.cookie.set = function (a, b, e) {
        var d;
        e.F && (d = new Date, d.setTime(d.getTime() + e.F));
        document.cookie = a + "=" + b + (e.domain ? "; domain=" + e.domain : "") + (e.path ? "; path=" + e.path : "") + (d ? "; expires=" + d.toGMTString() : "") + (e.Oa ? "; secure" : "")
    };
    hm.cookie.get = function (a) {
        return (a = RegExp("(^| )" + a + "=([^;]*)(;|$)").exec(document.cookie)) ? a[2] : q
    };

    //console.log(hm.cookie.set(''));

    hm.n = {};
    hm.n.P = function (a) {
        return document.getElementById(a)
    };
    hm.n.oa = function (a) {
        var b;
        for (b = "A"; (a = a.parentNode) && 1 === a.nodeType;) if (a.tagName === b) return a;
        return q
    };

    (hm.n.Ca = function () {
        function a() {
            if (!a.w) {
                a.w = p;
                for (var b = 0, g = d.length; b < g; b++) d[b]();
            }
        }

        function b() {
            try {
                document.documentElement.doScroll("left")
            } catch (d) {
                setTimeout(b, 1);
                return;
            }
            a();
        }

        var e = r, d = [], g;
        document.addEventListener ? g = function () {
            document.removeEventListener("DOMContentLoaded", g, r);
            a();
        } : document.attachEvent && (g = function () {
            "complete" === document.readyState && (document.detachEvent("onreadystatechange", g), a())
        });
        (function () {
            if (!e) if (e = p, "complete" === document.readyState) a.w = p; else if (document.addEventListener) document.addEventListener("DOMContentLoaded",
                g, r), window.addEventListener("load", a, r); else if (document.attachEvent) {
                document.attachEvent("onreadystatechange", g);
                window.attachEvent("onload", a);
                var d = r;
                try {
                    d = window.frameElement === q
                } catch (l) {
                }
                document.documentElement.doScroll && d && b();
            }
        })();
        return function (b) {
            a.w ? b() : d.push(b)
        }
    }()).w = r;

    hm.event = {};
    hm.event.c = function (a, b, e) {
        a.attachEvent ? a.attachEvent("on" + b, function (d) {
            e.call(a, d);
        }) : a.addEventListener && a.addEventListener(b, e, r);
    };
    hm.event.preventDefault = function (a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = r
    };

    hm.q = {};
    hm.q.parse = function () {
        return (new Function('return (" + source + ")'))()
    };
    hm.q.stringify = function () {
        function a(d) {
            /["\\\x00-\x1f]/.test(d) && (d = d.replace(/["\\\x00-\x1f]/g, function (d) {
                var a = e[d];
                if (a) return a;
                a = d.charCodeAt();
                return "\\u00" + Math.floor(a / 16).toString(16) + (a % 16).toString(16)
            }));
            return '"' + d + '"'
        }

        function b(d) {
            return 10 > d ? "0" + d : d
        }

        var e = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};
        return function (d) {
            switch (typeof d) {
                case "undefined":
                    return "undefined";
                case "number":
                    return isFinite(d) ? String(d) : "null";
                case "string":
                    return a(d);
                case "boolean":
                    return String(d);
                default:
                    if (d === q) return "null";
                    if (d instanceof Array) {
                        var g = ["["], e = d.length, l, f, k;
                        for (f = 0; f < e; f++) switch (k = d[f], typeof k) {
                            case "undefined":
                            case "function":
                            case "unknown":
                                break;
                            default:
                                l && g.push(","), g.push(hm.q.stringify(k)), l = 1;
                        }
                        g.push("]");
                        return g.join("")
                    }
                    if (d instanceof Date) {
                        return '"' + d.getFullYear() + "-" + b(d.getMonth() + 1) + "-" + b(d.getDate()) + "T" + b(d.getHours()) + ":" + b(d.getMinutes()) + ":" + b(d.getSeconds()) + '"';
                    }
                    l = ["{"];
                    f = hm.q.stringify;
                    for (e in d) {
                        if (Object.prototype.hasOwnProperty.call(d, e)) {
                            switch (k = d[e], typeof k) {
                                case "undefined":
                                case "unknown":
                                case "function":
                                    break;
                                default:
                                    g && l.push(","), g = 1, l.push(f(e) + ":" + f(k));
                                    break;
                            }
                        }
                    }
                    l.push("}");
                    return l.join("");
            }
        }
    }();

    hm.lang = {};
    hm.lang.e = function (a, b) {
        return "[object " + b + "]" === {}.toString.call(a);
    };
    hm.lang.La = function (a) {
        return hm.lang.e(a, "Number") && isFinite(a);
    };
    /**
     * @return {boolean}
     */
    hm.lang.Na = function (a) {
        return hm.lang.e(a, "String");
    };

    hm.localStorage = {};
    /**
     * @return {boolean}
     */
    hm.localStorage.C = function () {
        if (!hm.localStorage.f) try {
            hm.localStorage.f = document.createElement("input"),
                hm.localStorage.f.type = "hidden",
                hm.localStorage.f.style.display = "none",
                hm.localStorage.f.addBehavior("#default#userData"),
                document.getElementsByTagName("head")[0].appendChild(hm.localStorage.f);
        } catch (a) {
            return r;
        }
        return p;
    };
    hm.localStorage.set = function (a, b, e) {
        var d = new Date;
        d.setTime(d.getTime() + e || 31536E6);
        try {
            window.localStorage
                ? (b = d.getTime() + "|" + b, window.localStorage.setItem(a, b))
                : hm.localStorage.C() && (hm.localStorage.f.expires = d.toUTCString(),
                hm.localStorage.f.load(document.location.hostname),
                hm.localStorage.f.setAttribute(a, b),
                hm.localStorage.f.save(document.location.hostname));
        } catch (g) {
        }
    };
    hm.localStorage.get = function (a) {
        if (window.localStorage) {
            if (a === window.localStorage.getItem(a)) {
                var b = a.indexOf("|"), e = a.substring(0, b) - 0;
                if (e && e > (new Date).getTime()) return a.substring(b + 1);
            }
        } else if (hm.localStorage.C()) try {
            return hm.localStorage.f.load(document.location.hostname), hm.localStorage.f.getAttribute(a);
        } catch (d) {
        }
        return q;
    };
    hm.localStorage.remove = function (a) {
        if (window.localStorage) {
            window.localStorage.removeItem(a);
        } else if (hm.localStorage.C()) {
            try {
                hm.localStorage.f.load(document.location.hostname),
                    hm.localStorage.f.removeAttribute(a),
                    hm.localStorage.f.save(document.location.hostname);
            } catch (b) {
                console.info("hm.localStorage.remove::" + b);
            }
        }
    };
    hm.sessionStorage = {};
    hm.sessionStorage.set = function (a, b) {
        if (window.sessionStorage) try {
            window.sessionStorage.setItem(a, b);
        } catch (e) {
        }
    };

    hm.sessionStorage.get = function (a) {
        return window.sessionStorage ? window.sessionStorage.getItem(a) : q;
    };
    hm.sessionStorage.remove = function (a) {
        window.sessionStorage && window.sessionStorage.removeItem(a);
    };

    hm.M = {};
    hm.M.log = function (a, b) {
        var e = new Image, d = "mini_tangram_log_" + Math.floor(2147483648 * Math.random()).toString(36);
        window[d] = e;
        e.onload = e.onerror = e.onabort = function () {
            e.onload = e.onerror = e.onabort = q;
            e = window[d] = q;
            b && b(a);
        };
        e.src = a;
    };

    hm.B = {};
    //17.0
    hm.B.ua = function () {
        var a = "";
        if (navigator.plugins && navigator.mimeTypes.length) {
            var b = navigator.plugins["Shockwave Flash"];
            b && b.description && (a = b.description.replace(/^.*\s+(\S+)\s+\S+$/, "$1"));
        } else if (window.ActiveXObject) try {
            if (b === new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                (a = b.GetVariable("$version")) && (a = a.replace(/^.*\s+(\d+),(\d+).*$/, "$1.$2"));
            }
        } catch (e) {
        }
        return a;
    };

    (function () {
        var a = {
            m: {}, c: function (a, e) {
                this.m[a] = this.m[a] || [];
                this.m[a].push(e);
            }, s: function (a, e) {
                this.m[a] = this.m[a] || [];
                for (var d = this.m[a].length, g = 0; g < d; g++) this.m[a][g](e);
            }
        };
        return h.k = a;
    })();

    (function () {
        function a(a, d) {
            var g = document.createElement("script");
            g.charset = "utf-8";
            b.e(d, "Function") && (g.readyState ? g.onreadystatechange = function () {
                if ("loaded" === g.readyState || "complete" === g.readyState) {
                    g.onreadystatechange = q, d();
                }
            } : g.onload = function () {
                d();
            });
            g.src = a;
            var n = document.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(g, n);
        }

        var b = hm.lang;
        return h.load = a;
    })();

    (function () {
        function a() {
            var a;
            h.b.a.nv ? (a = encodeURIComponent(document.referrer), window.sessionStorage ? e.set("Hm_from_" + hm.c.id, a) : b.set("Hm_from_" + hm.c.id, a, 864E5)) : a = (window.sessionStorage ? e.get("Hm_from_" + hm.c.id) : b.get("Hm_from_" + hm.c.id)) || "";
            return a;
        }

        var b = hm.localStorage, e = hm.sessionStorage;
        return h.O = a;
    })();

    (function () {
        var a = h.g, b = hm.B, e = {
            init: function () {
                if ("" !== c.icon) {
                    var d;
                    d = c.icon.split("|");
                    var g = a.Aa + "?s=" + hm.c.id,
                        e = ("http:" === a.protocol ? "http://eiv" : "https://bs") + ".baidu.com" + d[0] + "." + d[1];
                    switch (d[1]) {
                        case "swf":
                            d = b.ha("HolmesIcon" + a.j, e, d[2], d[3], "s=" + g);
                            break;
                        case "gif":
                            d = '<a href="' + g + '" target="_blank"><img border="0" src="' + e + '" width="' + d[2] + '" height="' + d[3] + '" alt=""></a>';
                            break;
                        default:
                            d = '<a href="' + g + '" target="_blank">' + d[0] + "</a>";
                    }
                    document.write(d);
                }
            }
        };
        h.k.c("pv-b", e.init);
        return e;
    })();

    (function () {
        var a = hm.n, b = hm.event, e = {
            Z: function () {
                b.c(document, "click", e.ia());
                for (var d = c.etrk.length, g = 0; g < d; g++) {
                    var n = c.etrk[g], l = a.P(decodeURIComponent(n.id));
                    l && b.c(l, n.eventType, e.ka());
                }
            }, ka: function () {
                return function (a) {
                    (a.target || a.srcElement).setAttribute("HM_fix", a.clientX + ":" + a.clientY);
                    h.b.a.et = 1;
                    h.b.a.ep = "{id:" + this.id + ",eventType:" + a.type + "}";
                    h.b.h();
                }
            }, ia: function () {
                return function (a) {
                    var b = a.target || a.srcElement;
                    if (b) {
                        var e = b.getAttribute("HM_fix"), l = a.clientX + ":" + a.clientY;
                        if (e && e === l) {
                            b.removeAttribute("HM_fix");
                        } else if (e = c.etrk.length, 0 < e) {
                            for (l = {}; b && b !== document.body;) b.id && (l[b.id] = ""), b = b.parentNode;
                            for (b = 0; b < e; b++) {
                                var f = decodeURIComponent(c.etrk[b].id);
                                l.hasOwnProperty(f) && (h.b.a.et = 1, h.b.a.ep = "{id:" + f + ",eventType:" + a.type + "}", h.b.h());
                            }
                        }
                    }
                }
            }
        };
        h.k.c("pv-b", e.Z);
        return e;
    })();

    (function () {
        var a = hm.n, b = hm.event, e = hm.i, d = h.g, g = [], n = {
            Y: function () {
                c.ctrk && (b.c(document, "mouseup", n.da()), b.c(window, "unload", function () {
                    n.z();
                }), setInterval(function () {
                    n.z();
                }, d.fa));
            }, da: function () {
                return function (a) {
                    a = n.pa(a);
                    if ("" !== a) {
                        var b = (d.protocol + "//" + d.K + "?" + h.b.W().replace(/ep=[^&]*/, "ep=" + encodeURIComponent("[" + a + "]"))).length;
                        b + (d.l + "").length > d.N || (b + encodeURIComponent(g.join(",") + (g.length ? "," : "")).length + (d.l + "").length > d.N && n.z(), g.push(a), (g.length >= d.ga || /t:a/.test(a)) && n.z());
                    }

                }
            },
            pa: function (b) {
                if (0 === d.ea) {
                    var f = b.target || b.srcElement, k = f.tagName.toLowerCase();
                    if ("embed" === k || "object" === k) {
                        return "";
                    }
                }
                e.Ba ? (f = Math.max(document.documentElement.scrollTop, document.body.scrollTop), k = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft), k = b.clientX + k, f = b.clientY + f) : (k = b.pageX, f = b.pageY);
                var m = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;
                switch (c.align) {
                    case 1:
                        k -= m / 2;
                        break;
                    case 2:
                        k -= m;
                }
                k = "{x:" + k + ",y:" + f + ",";
                f = b.target || b.srcElement;
                return (b = "a" === f.tagName.toLowerCase() ? f : a.oa(f)) ? k + ("t:a,u:" + encodeURIComponent(b.href) + "}") : k + "t:b}";
            }, z: function () {
                0 !== g.length && (h.b.a.et = 2, h.b.a.ep = "[" + g.join(",") + "]", h.b.h(), g = []);
            }
        };
        h.k.c("pv-b", n.Y);
        return n;
    })();

    (function () {
        var a = hm.n, b = h.g, e = h.load, d = h.O;
        h.k.c("pv-b", function () {
            c.rec && a.Ca(function () {
                for (var g = 0, n = c.rp.length; g < n; g++) {
                    var l = c.rp[g][0], f = c.rp[g][1], k = a.P("hm_t_" + l);
                    if (f && !(2 === f && !k || k && "" !== k.innerHTML)) {
                        k = "",
                            k = Math.round(Math.random() * b.l),
                            k = 4 === f
                                ? "http://crs.baidu.com/hl.js?" + ["siteId=" + hm.c.id, "planId=" + l, "rd=" + k].join("&")
                                : "http://crs.baidu.com/t.js?" + ["siteId=" + hm.c.id, "planId=" + l, "from=" + d(), "referer=" + encodeURIComponent(document.referrer), "title=" + encodeURIComponent(document.title), "rd=" + k].join("&"), e(k);
                    }
                }
            })
        })
    })();

    (function () {
        var a = h.g, b = h.load, e = h.O;
        h.k.c("pv-b", function () {
            if (c.trust && c.vcard) {
                var d = a.protocol + "//trust.baidu.com/vcard/v.js?" + ["siteid=" + c.vcard, "url=" + encodeURIComponent(document.location.href), "source=" + e(), "rd=" + Math.round(Math.random() * a.l)].join("&");
                b(d);
            }
        })
    })();

    (function () {
        function a() {
            return function () {
                h.b.a.nv = 0;
                h.b.a.st = 4;
                h.b.a.et = 3;
                h.b.a.ep = h.D.sa() + "," + h.D.qa();
                h.b.h();
            }
        }

        function b() {
            clearTimeout(A);
            var a;
            y && (a = "visible" === document[y]);
            B && (a = !document[B]);
            f = "undefined" == typeof a ? p : a;
            if ((!l || !k) && f && m) u = p, s = +new Date; else if (l && k && (!f || !m)) u = r, t += +new Date - s;
            l = f;
            k = m;
            A = setTimeout(b, 100);
        }

        function e(a) {
            var k = document, b = "";
            if (a in k) b = a; else for (var d = ["webkit", "ms", "moz", "o"], s = 0; s < d.length; s++) {
                var e = d[s] + a.charAt(0).toUpperCase() + a.slice(1);
                if (e in k) {
                    b = e;
                    break;
                }
            }
            return b;
        }

        function d(a) {
            if (!("focus" === a.type || "blur" === a.type) || !(a.target && a.target !== window)) m = "focus" === a.type || "focusin" === a.type ? p : r, b();
        }

        var g = hm.event, n = h.k, l = p, f = p, k = p, m = p, v = +new Date, s = v, t = 0, u = p,
            y = e("visibilityState"), B = e("hidden"), A;
        b();
        (function () {
            var a = y.replace(/[vV]isibilityState/, "visibilitychange");
            g.c(document, a, b);
            g.c(window, "pageshow", b);
            g.c(window, "pagehide", b);
            "object" == typeof document.onfocusin ? (g.c(document, "focusin", d), g.c(document, "focusout", d)) : (g.c(window, "focus", d), g.c(window, "blur", d));
        })();
        h.D = {
            sa: function () {
                return +new Date - v;
            }, qa: function () {
                return u ? +new Date - s + t : t;
            }
        };
        n.c("pv-b", function () {
            g.c(window, "unload", a());
        });
        return h.D;
    })();

    (function () {
        function a(k) {
            for (var b in k) if ({}.hasOwnProperty.call(k, b)) {
                var e = k[b];
                d.e(e, "Object") || d.e(e, "Array") ? a(e) : k[b] = String(e);
            }
        }

        function b(a) {
            return a.replace ? a.replace(/'/g, "'0").replace(/\*/g, "'1").replace(/!/g, "'2") : a;
        }

        var e = hm.M, d = hm.lang, g = hm.q, n = h.g, l = h.k, f = {
            S: q, r: [], A: 0, T: r, init: function () {
                f.d = 0;
                f.S = {
                    push: function () {
                        f.J.apply(f, arguments);
                    }
                };
                l.c("pv-b", function () {
                    f.la();
                    f.ma();
                });
                l.c("pv-d", f.na);
                l.c("stag-b", function () {
                    h.b.a.api = f.d || f.A ? f.d + "_" + f.A : "";
                });
                l.c("stag-d", function () {
                    h.b.a.api = 0;
                    f.d = 0;
                    f.A = 0;
                })
            }, la: function () {
                var a = window._hmt;
                if (a && a.length) for (var b = 0; b < a.length; b++) {
                    var d = a[b];
                    switch (d[0]) {
                        case "_setAccount":
                            1 < d.length && /^[0-9a-z]{32}$/.test(d[1]) && (f.d |= 1, window._bdhm_account = d[1]);
                            break;
                        case "_setAutoPageview":
                            if (1 < d.length && (d = d[1], r === d || p === d)) {
                                f.d |= 2, window._bdhm_autoPageview = d;
                            }
                    }
                }
            }, ma: function () {
                if ("undefined" === typeof window._bdhm_account || window._bdhm_account === hm.c.id) {
                    window._bdhm_account = hm.c.id;
                    var a = window._hmt;
                    if (a && a.length) {
                        for (var b = 0, e = a.length; b < e; b++) {
                            d.e(a[b], "Array") && "_trackEvent" !== a[b][0] && "_trackRTEvent" !== a[b][0] ? f.J(a[b]) : f.r.push(a[b]);
                        }
                    }
                    window._hmt = f.S;
                }
            }, na: function () {
                if (0 < f.r.length) {
                    for (var a = 0, b = f.r.length; a < b; a++) {
                        f.J(f.r[a]);
                    }
                }
                f.r = q;
            }, J: function (a) {
                if (d.e(a, "Array")) {
                    var b = a[0];
                    if (f.hasOwnProperty(b) && d.e(f[b], "Function")) {
                        f[b](a);
                    }
                }
            }, _trackPageview: function (a) {
                if (1 < a.length && a[1].charAt && "/" === a[1].charAt(0)) {
                    f.d |= 4;
                    h.b.a.et = 0;
                    h.b.a.ep = "";
                    h.b.H ? (h.b.a.nv = 0, h.b.a.st = 4) : h.b.H = p;
                    var b = h.b.a.u, d = h.b.a.su;
                    h.b.a.u = n.protocol + "//" + document.location.host + a[1];
                    f.T || (h.b.a.su = document.location.href);
                    h.b.h();
                    h.b.a.u = b;
                    h.b.a.su = d;
                }
            }, _trackEvent: function (a) {
                2 < a.length && (f.d |= 8, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 4, h.b.a.ep = b(a[1]) + "*" + b(a[2]) + (a[3] ? "*" + b(a[3]) : "") + (a[4] ? "*" + b(a[4]) : ""), h.b.h())
            }, _setCustomVar: function (a) {
                if (!(4 > a.length)) {
                    var d = a[1], e = a[4] || 3;
                    if (0 < d && 6 > d && 0 < e && 4 > e) {
                        f.A++;
                        for (var s = (h.b.a.cv || "*").split("!"), t = s.length; t < d - 1; t++) s.push("*");
                        s[d - 1] = e + "*" + b(a[2]) + "*" + b(a[3]);
                        h.b.a.cv = s.join("!");
                        a = h.b.a.cv.replace(/[^1](\*[^!]*){2}/g, "*").replace(/((^|!)\*)+$/g, "");
                        "" !== a ? h.b.setData("Hm_cv_" + hm.c.id, encodeURIComponent(a), c.age) : h.b.Da("Hm_cv_" + hm.c.id);
                    }
                }
            }, _setReferrerOverride: function (a) {
                1 < a.length && (h.b.a.su = a[1].charAt && "/" === a[1].charAt(0) ? n.protocol + "//" + window.location.host + a[1] : a[1], f.T = p);
            }, _trackOrder: function (b) {
                b = b[1];
                d.e(b, "Object") && (a(b), f.d |= 16, h.b.a.nv = 0, h.b.a.st = 4, h.b.a.et = 94, h.b.a.ep = g.stringify(b), h.b.h());
            }, _trackMobConv: function (a) {
                if (a === {
                    webim: 1,
                    tel: 2,
                    map: 3,
                    sms: 4,
                    callback: 5,
                    share: 6
                }[a[1]]) f.d |= 32, h.b.a.et = 93, h.b.a.ep = a, h.b.h();
            }, _trackRTPageview: function (b) {
                b = b[1];
                d.e(b, "Object") && (a(b), b = g.stringify(b), 512 >= encodeURIComponent(b).length && (f.d |= 64, h.b.a.rt = b))
            }, _trackRTEvent: function (b) {
                b = b[1];
                if (d.e(b, "Object")) {
                    a(b);
                    b = encodeURIComponent(g.stringify(b));
                    var e = function (a) {
                        var b = h.b.a.rt;
                        f.d |= 128;
                        h.b.a.et = 90;
                        h.b.a.rt = a;
                        h.b.h();
                        h.b.a.rt = b;
                    }, l = b.length;
                    if (900 >= l) {
                        e.call(this, b);
                    } else {
                        for (var l = Math.ceil(l / 900), s = "block|" + Math.round(Math.random() * n.l).toString(16) + "|" + l + "|", t = [], u = 0; u < l; u++) {
                            t.push(u), t.push(b.substring(900 * u, 900 * u + 900)), e.call(this, s + t.join("|")), t = [];
                        }
                    }
                }
            }, _setUserId: function (a) {
                a = a[1];
                if (d.e(a, "String") || d.e(a, "Number")) {
                    var b = h.b.G(), g = "hm-" + h.b.a.v;
                    f.V = f.V || Math.round(Math.random() * n.l);
                    e.log("https://analytics.tianfu.ink/api.php/analytics/receiver?asyn=hm.gif?si=" + hm.c.id + "&dm=" + encodeURIComponent(b) + "&ac=" + encodeURIComponent(a) + "&v=" + g + "&li=" + f.V + "&rd=" + Math.round(Math.random() * n.l))
                }
            }
        };
        f.init();
        h.ba = f;
        return h.ba
    })();

    // 拼接参数串
    var args = '';
    for (var i in hm.i) {
        if (args !== '') {
            args += '&';
        }
        args += i + '=' + encodeURIComponent(hm.i[i]);
    }

    // 通过Image对象请求后端脚本
    var action = function () {
        var win = window;
        var n = "analy_image_" + (new Date()).getTime() + Math.floor(Math.random() * 1000);

        var image = win[n] = new Image();
        image.onload = image.onerror = function () {
            win[n] = null;
        };

        var timing = window.performance.timing;
        args += "&ns=" + timing.navigationStart;
        args += "&ues=" + timing.unloadEventStart;
        args += "&uee=" + timing.unloadEventEnd;
        args += "&reds=" + timing.redirectStart;
        args += "&rede=" + timing.redirectEnd;
        args += "&fs=" + timing.fetchStart;
        args += "&dls=" + timing.domainLookupStart;
        args += "&dle=" + timing.domainLookupEnd;
        args += "&cs=" + timing.connectStart;
        args += "&ce=" + timing.connectEnd;
        args += "&scs=" + timing.secureConnectionStart;
        args += "&reqs=" + timing.requestStart;
        args += "&rs=" + timing.responseStart;
        args += "&re=" + timing.responseEnd;
        args += "&dl=" + timing.domLoading;
        args += "&di=" + timing.domInteractive;
        args += "&dcles=" + timing.domContentLoadedEventStart;
        args += "&dclee=" + timing.domContentLoadedEventEnd;
        args += "&dc=" + timing.domComplete;
        args += "&les=" + timing.loadEventStart;
        args += "&lee=" + timing.loadEventEnd;
        args += "&randid=" + new Date().getTime() + "" + parseInt(Math.random() * (99999 - 10000 + 1) + 10000, 10);

        image.src = "https://analytics.tianfu.ink/api.php/analytics/receiver?asyn=hm.gif&" + args;
    };

    window.addEventListener("pageshow", function () {
        action();
    });

})();