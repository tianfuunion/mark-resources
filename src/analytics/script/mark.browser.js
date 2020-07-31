;
/*
 * MTA v1.0.2
 * (c) 2014-2018
 * 美团点评 - 性能平台
 */
! function () {
    "use strict";

    function c(t) {
        return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ?
                "symbol" : typeof t
        })(t)
    }

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function r(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(
                t, r.key, r)
        }
    }

    function t(t, e, n) {
        return e && r(t.prototype, e), n && r(t, n), t
    }

    function a(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function u(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {},
                r = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter(
                function (t) {
                    return Object.getOwnPropertyDescriptor(n, t).enumerable
                }))), r.forEach(function (t) {
                a(e, t, n[t])
            })
        }
        return e
    }

    function f(t) {
        return function (t) {
            if (Array.isArray(t)) {
                for (var e = 0, n = new Array(t.length); e < t.length; e++) n[e] = t[e];
                return n
            }
        }(t) || function (t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array
                .from(t)
        }(t) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance")
        }()
    }
    var o = Array.prototype,
        e = Object.prototype,
        s = e.hasOwnProperty,
        n = e.toString,
        g = function (t) {
            return "function" == typeof t
        },
        d = function (t) {
            return "number" == typeof t
        };

    function l(t) {
        if ("undefined" != typeof JSON && g(JSON.stringify)) return JSON.stringify(t);
        switch (c(t)) {
            case "string":
                return '"'.concat(t, '"');
            case "boolean":
            case "number":
                return String(t);
            case "object":
                if (null === t) return "null";
                var e = !1,
                    n = "",
                    r = "";
                for (var i in t)
                    if (s.call(t, i)) {
                        r = "'".concat(i, "'");
                        var a = l(t[i]);
                        a.length && (e ? n += "," : e = !0, n += p(t) ? a : '"'.concat(r, '":').concat(a))
                    } return p(t) ? "[".concat(n, "]") : "{".concat(n, "}");
            default:
                return ""
        }
    }

    function h(t) {
        if (g(Object.keys)) return Object.keys(t);
        var e = [];
        for (var n in t) s.call(t, n) && e.push(n);
        return e
    }

    function p(t) {
        return g(Array.isArray) ? Array.isArray(t) : "[object Array]" === n.call(t)
    }

    function v(t, e, n) {
        if (g(o.map)) return t.map(e, n);
        for (var r = [], i = t.length, a = 0; a++ < i;) r.push(e.call(n, t[a], a, t));
        return r
    }

    function m(t, n) {
        if (g(o.forEach)) t.forEach(function (t, e) {
            n(t, e)
        });
        else
            for (var e = t.length, r = 0; r++ < e;) n(t[r], r)
    }

    function y(t, e, n) {
        if (g(o.filter)) return t.filter(e, n);
        for (var r = [], i = t.length, a = 0; a++ < i;) e.call(n, t[a], a, t) && r.push(t[a]);
        return r
    }
    var w = {
            get: function (t) {
                for (var e = document.cookie, n = "".concat(t, "="), r = n.length, i = e.length, a = 0; a < i;) {
                    var o = a + r;
                    if (e.substring(a, o) === n) return s = o, u = c = void 0, c = document.cookie, -1 === (u = c.indexOf(
                        ";", s)) && (u = c.length), decodeURIComponent(c.substring(s, u));
                    if (0 === (a = e.indexOf(" ", a) + 1)) break
                }
                var s, c, u;
                return ""
            },
            set: function (t, e, n, r, i, a) {
                i = i || (o = document.domain, "localhost:" === o ? "" : ("undefined" != typeof M && M.DOMAIN_HOST &&
                    (o = ".".concat(M.DOMAIN_HOST)), "www." === o && (o = o.substring(0, 4)), o));
                var o;
                var s = (r ? "; path=".concat(r) : "") + (i ? "; domain=".concat(i) : "") + (a ? "; secure" : "");
                document.cookie = e ? "".concat(t, "=").concat(encodeURIComponent(String(e))) + (n ? "; expires=".concat(
                    n) : "") + s : "".concat(t, "=; expires=Thu, 01 Jan 1970 00:00:01 GMT") + (r ? "; path=".concat(r) : "") + s
            },
            getExpire: function (t, e, n) {
                var r = new Date;
                if (d(t) && d(e) && d(n)) return r.setDate(r.getDate() + parseInt(t, 10)), r.setHours(r.getHours() +
                    parseInt(e, 10)), r.setMinutes(r.getMinutes() + parseInt(n, 10)), r.toUTCString()
            }
        },
        b = {};
    var _ = {
        on: function (t, e) {
            g(e) && (b[t] || (b[t] = [])).push(e)
        },
        emit: function () {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            var r = e[0],
                i = e.slice(1);
            if (b[r])
                for (var a = 0; a < b[r].length; a++) b[r][a].apply(this, i)
        },
        addEvent: function (t, e) {
            var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
            return window.addEventListener ? window.addEventListener(t, e, n) : window.attachEvent ? window.attachEvent(
                "on".concat(t), e) : void 0
        },
        removeEvent: function (t, e) {
            var n = 2 < arguments.length && void 0 !== arguments[2] && arguments[2];
            return window.removeEventListener ? window.removeEventListener(t, e, n) : window.detachEvent ?
                window.detachEvent("on".concat(t), e) : void 0
        }
    };

    function S(t, e) {
        return t <= 0 || e <= 0 || t - e <= 0 ? 0 : parseInt(t - e, 10)
    }
    var E = function () {
            function e(t) {
                i(this, e), a(this, "_MAX_URL_LENGTH", 2083), this.url = t
            }
            return t(e, [{
                key: "config",
                value: function (t) {
                    this.url = t
                }
            }, {
                key: "send",
                value: function (t) {
                    l(t).length && this._post(t)
                }
            }, {
                key: "_sendByScript",
                value: function (t) {
                    var e = document.createElement("script");
                    e.type = "text/javascript", e.async = !0, e.src = "".concat(this.url, "?").concat(t);
                    var n = document.getElementsByTagName("script")[0];
                    n.parentNode && n.parentNode.insertBefore(e, n)
                }
            }, {
                key: "_post",
                value: function (t) {
                    ! function (t) {
                        if ("file:" !== window.location.protocol) {
                            var e, n = u({
                                method: "GET",
                                async: !0
                            }, t);
                            if (window.XDomainRequest) try {
                                (e = new XMLHttpRequest).open(n.method, n.url), e.send(l(n.data))
                            } catch (t) {} else if (window.XMLHttpRequest && "withCredentials" in (
                                    e = new XMLHttpRequest)) try {
                                e.open(n.method, n.url, n.async), e.setRequestHeader(
                                    "Content-Type", "text/plain"), e.send(l(n.data))
                            } catch (t) {}
                        }
                    }({
                        url: this.url,
                        method: "POST",
                        data: t
                    })
                }
            }]), e
        }(),
        k = function () {
            function r() {
                i(this, r), a(this, "_COOKIE_USER_TRACKING", "__mta");
                var t = window.screen,
                    e = window.navigator,
                    n = this._getViewport();
                this.screen = t ? "".concat(t.width, "x").concat(t.height) : "-", this.viewport = "".concat(n.width,
                        "x").concat(n.height), this.javaEnabled = e && e.javaEnabled() ? 1 : 0, this.ua = e.userAgent,
                    this.isFirstVisit = !1, this._setCookie()
            }
            return t(r, [{
                key: "getInfo",
                value: function () {
                    return {
                        sr: this.screen,
                        vp: this.viewport,
                        csz: document.cookie ? document.cookie.length : 0,
                        ua: this.ua,
                        uuid: this.uuid
                    }
                }
            }, {
                key: "_setCookie",
                value: function () {
                    var t = w.getExpire(720, 0, 0),
                        e = this._getCurrentTime(),
                        n = w.get(this._COOKIE_USER_TRACKING);
                    if (n) {
                        var r = n.split(".");
                        r[2] = r[3], r[3] = String(e), r[4] = String(parseInt(r[4], 10) + 1), w.set(
                            this._COOKIE_USER_TRACKING, r.join("."), t), this.uuid = r[1]
                    } else {
                        var i = this._hashInfo();
                        n = [i, e, e, e, 1].join("."), w.set(this._COOKIE_USER_TRACKING, n, t), this.isFirstVisit = !
                            0, this.uuid = String(i)
                    }
                }
            }, {
                key: "_getCurrentTime",
                value: function () {
                    return (new Date).getTime()
                }
            }, {
                key: "_hashInfo",
                value: function () {
                    for (var t = window, e = t.navigator, n = t.history.length, r = e.appName + e.appVersion +
                            this._getEnvLanguage() + e.platform + e.userAgent + this.javaEnabled + this
                            .screen + (document.cookie ? document.cookie : "") + (document.referrer ?
                                document.referrer : ""), i = r.length; 0 < n;) r += n-- ^ i++;
                    return function (t) {
                        var e, n = 1,
                            r = 0;
                        if (t)
                            for (n = 0, e = t.length - 1; 0 <= e; e--) n = 0 != (r = 266338304 & (n =
                                    (n << 6 & 268435455) + (r = t.charCodeAt(e)) + (r << 14))) ? n ^
                                r >> 21 : n;
                        return n
                    }(r)
                }
            }, {
                key: "_getViewport",
                value: function () {
                    var t = {
                        width: document.body && document.body.clientWidth || 0,
                        height: document.body && document.body.clientHeight || 0
                    };
                    return null !== window.innerWidth && (t = {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }), "CSS1Compat" === document.compatMode && (t = {
                        width: document.documentElement && document.documentElement.clientWidth ||
                            0,
                        height: document.documentElement && document.documentElement.clientHeight ||
                            0
                    }), t
                }
            }, {
                key: "_getEnvLanguage",
                value: function () {
                    return (navigator && (navigator.language ? navigator.language : navigator.browserLanguage ?
                        navigator.browserLanguage : "-")).toLowerCase()
                }
            }]), r
        }(),
        T = {
            activate: "activate",
            create: "create",
            config: "config",
            tag: "tag",
            timing: "sendTiming",
            count: "sendCount",
            gauge: "sendGauge",
            send: "send",
            stop: "stop",
            on: "_on"
        },
        C = function () {
            function s(t) {
                i(this, s), a(this, "_PERF_CATEGORY", "fe_perf_web"), a(this, "_SEND_DELAY", 100), this.trackerConfig =
                    u({
                        useCombo: !0,
                        sampleRate: 100,
                        url: "".concat(location.protocol, "//dreport.meituan.net")
                    }, t), this.client = new k, this.beacon = new E(this.trackerConfig.url), this._visitCode = this._random(),
                    this._queue = [], this._tags = {}
            }
            return t(s, [{
                key: "create",
                value: function (t, e) {
                    this._app = t, this.trackerConfig = u({}, this.trackerConfig, e, {
                        sampleRate: 5
                    }), this.send("resources")
                }
            }, {
                key: "config",
                value: function (t, e) {
                    if (void 0 !== e) switch (t) {
                        case "sampleRate":
                            "number" == typeof e && (this.trackerConfig.sampleRate = e);
                            break;
                        case "useCombo":
                            "boolean" == typeof e && (this.trackerConfig.useCombo = e);
                            break;
                        case "beaconImage":
                            "string" == typeof e && -1 === e.indexOf("frep.meituan.") && this.beacon
                                .config(this.trackerConfig.url = e)
                    }
                }
            }, {
                key: "tag",
                value: function (t, e) {
                    "string" == typeof t && t.length && (void 0 !== c(e) ? this._tags[t] = e : delete this
                        ._tags[t])
                }
            }, {
                key: "execute",
                value: function () {
                    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] =
                        arguments[n];
                    for (var r = 0; r < e.length; r++) try {
                        var i = e[r];
                        if (g(i)) e[r](this);
                        else {
                            var a = (i = [].slice.call(i, 0))[0];
                            this[T[a]].apply(this, i.slice(1))
                        }
                    } catch (t) {
                        t++
                    }
                    return 0
                }
            }, {
                key: "push",
                value: function () {
                    return this.execute.apply(this, arguments)
                }
            }, {
                key: "send",
                value: function (t, e, n, r) {
                    var i = this;
                    if (t && !(-1 < ["xhr-dispatch", "xhr-result.load", "browser.xhr"].indexOf(t)))
                        if ("resources" !== t) {
                            if (!(e && e.url && /catfront|dreport/.test(e.url))) {
                                var a = s.plugins[t];
                                a && (e = a.data(e), r = a.type);
                                var o = {};
                                e && (o[t] = e, this._push(r || "timer", o, n)), this._timer && (window
                                        .clearTimeout(this._timer), this._timer = null), this._timer =
                                    window.setTimeout(function () {
                                        i._sendData()
                                    }, this._SEND_DELAY)
                            }
                        } else this._sendResources()
                }
            }, {
                key: "sendTiming",
                value: function (t, e, n) {
                    this.send(t, e || 1, n, "timer")
                }
            }, {
                key: "sendCount",
                value: function (t, e, n) {
                    this.send(t, e || 1, n, "counter")
                }
            }, {
                key: "sendGauge",
                value: function (t, e, n) {
                    this.send(t, e || 1, n, "gauge")
                }
            }, {
                key: "activate",
                value: function (t, e, n) {
                    if (this._isSampleHit() && "fps" === t) {
                        var r = this,
                            i = s.plugins.fps;
                        if (i) try {
                            this._fps = i.data(e, n, function (t, e, n) {
                                r.sendTiming(t, e, n)
                            }), this._fps.activate()
                        } catch (t) {}
                    }
                }
            }, {
                key: "stop",
                value: function (t) {
                    this._fps && "fps" === t && this._fps.stop()
                }
            }, {
                key: "_push",
                value: function (t, e, n) {
                    this._queue.push({
                        type: t,
                        data: e,
                        tags: n || this._tags,
                        ts: String((new Date).valueOf())
                    })
                }
            }, {
                key: "_on",
                value: function (t, e) {
                    _.on(t, e)
                }
            }, {
                key: "_sendResources",
                value: function () {
                    if (!(.1 < Math.random())) {
                        var t = s.plugins.resources;
                        if (t) try {
                            var e = t.data();
                            if (!e) return;
                            for (var n = 0; n < e.length; n++) {
                                var r = e[n];
                                this.sendTiming("browser.resource", r.data, r.tags)
                            }
                        } catch (t) {
                            console.error(t)
                        }
                    }
                }
            }, {
                key: "_sendData",
                value: function () {
                    var n = this;
                    if (this._isSampleHit()) {
                        var t = this.trackerConfig.useCombo,
                            e = this.client.getInfo(),
                            r = u({
                                token: this._app,
                                url: location.href,
                                sdkVersion: "1.0.2"
                            }, e),
                            i = null,
                            a = [];
                        if (this._queue.length) {
                            if (t) 1 === this._queue.length ? a = this._formatLogType(this._queue[0]) :
                                m(this._queue, function (t) {
                                    var e;
                                    (e = a).push.apply(e, f(n._formatLogType(t)))
                                }), i = this._formatReportData(r, a), _.emit("data", i), this.beacon.send(
                                    i);
                            else
                                for (var o = 0; o < this._queue.length; o++) i = this._formatReportData(
                                        r, this._formatLogType(this._queue[o])), _.emit("data", i),
                                    this.beacon.send(i);
                            this._queue = []
                        }
                    }
                }
            }, {
                key: "_formatLogType",
                value: function (t) {
                    var e = t.data,
                        n = t.tags,
                        r = t.ts,
                        i = h(e)[0],
                        a = h(e[i]),
                        o = "browser.ajax" === i,
                        s = y(a, function (t) {
                            return "url" !== t && "method" !== t
                        });
                    return o ? y(v(s, function (t) {
                        return {
                            ts: r,
                            type: "".concat(i, ".").concat(t),
                            value: String(Number(e[i][t])),
                            tags: u({
                                url: e[i].url,
                                method: e[i].method.toUpperCase()
                            }, n)
                        }
                    }), function (t) {
                        var e = t.type,
                            n = t.value;
                        return !("browser.ajax.error" === e && "0" === n)
                    }) : a.length ? v(a, function (t) {
                        return {
                            type: "".concat(i, ".").concat(t),
                            value: e[i][t],
                            tags: n,
                            ts: r
                        }
                    }) : [{
                        type: i,
                        value: e[i],
                        tags: n,
                        ts: r
                    }]
                }
            }, {
                key: "_formatReportData",
                value: function (e, t) {
                    var n = {
                        category: this._PERF_CATEGORY,
                        logs: t,
                        env: {}
                    };
                    return m(h(e), function (t) {
                        n.env[t] = e[t]
                    }), [n]
                }
            }, {
                key: "_random",
                value: function () {
                    return Math.round(2147483647 * Math.random())
                }
            }, {
                key: "_isSampleHit",
                value: function () {
                    return this._visitCode % 1e4 < 100 * this.trackerConfig.sampleRate
                }
            }], [{
                key: "addPlugin",
                value: function (t, e) {
                    if (!g(e.data)) throw new Error("Can't add plugin ".concat(t,
                            ". The plugin object of data props should be") +
                        " a function, but its type is ".concat(c(e.data)));
                    s.plugins[t] = e
                }
            }]), s
        }();
    a(C, "plugins", {});
    var O, A = function (t) {
            var e = window[t];
            if (g(e) && !(e.q && e.q.isInitialized && e.q.initialized())) {
                var n = new C,
                    r = e ? e.q : [];
                e.q = n, p(r) && n.execute.apply(n, r)
            }
        },
        I = {
            type: "timer",
            data: function () {
                var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 0,
                    e = window.performance || window.mozPerformance;
                if (e && e.timing && !(t <= 0)) {
                    var n = t - e.timing.navigationStart;
                    if (!(n <= 0)) return n
                }
            }
        },
        R = {
            type: "timer",
            data: function (t) {
                var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                    n = 2 < arguments.length ? arguments[2] : void 0,
                    r = window.requestAnimationFrame;
                if (g(r)) {
                    var i = t && t.duration || 6e4,
                        a = t && t.maxCount || null,
                        o = 0,
                        s = 0,
                        c = null,
                        u = null;
                    return {
                        activate: function () {
                            _.addEvent("blur", l), _.addEvent("focus", d), _.addEvent("visibilitychange", h),
                                document.hasFocus() && (f(), v())
                        },
                        stop: p
                    }
                }

                function f() {
                    s++, c = r(f)
                }

                function d() {
                    (!a || o < a) && (s = 0, f(), v())
                }

                function l() {
                    c && cancelAnimationFrame(c), u && clearInterval(u)
                }

                function h() {
                    document.hidden ? l() : d()
                }

                function p() {
                    c && cancelAnimationFrame(c), u && clearInterval(u), _.removeEvent("blur", l), _.removeEvent(
                        "focus", d), _.removeEvent("visibilitychange", h)
                }

                function v() {
                    u && clearInterval(u), u = setInterval(function () {
                        c && cancelAnimationFrame(c), o++;
                        try {
                            n && n("browser.page", {
                                fps: Math.min(60, s / (i / 1e3))
                            }, e)
                        } catch (t) {}
                        s = 0, a && a <= o ? p() : f()
                    }, i)
                }
            }
        },
        P = {
            type: "timer",
            data: function () {
                var t = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance;
                if (t) {
                    var e = t.timing,
                        r = {
                            redirect: S(e.fetchStart, e.navigationStart),
                            dns: S(e.domainLookupEnd, e.domainLookupStart),
                            connect: S(e.connectEnd, e.connectStart),
                            network: S(e.connectEnd, e.navigationStart),
                            send: S(e.responseStart, e.requestStart),
                            receive: S(e.responseEnd, e.responseStart),
                            backend: S(e.responseEnd, e.requestStart),
                            render: S(e.loadEventEnd, e.loadEventStart),
                            dom: S(e.domComplete, e.domLoading),
                            frontend: S(e.loadEventEnd, e.domLoading),
                            load: S(e.loadEventEnd, e.navigationStart),
                            domReady: S(e.domContentLoadedEventStart, e.navigationStart),
                            interactive: S(e.domInteractive, e.navigationStart),
                            ttf: S(e.fetchStart, e.navigationStart),
                            ttr: S(e.requestStart, e.navigationStart),
                            ttdns: S(e.domainLookupStart, e.navigationStart),
                            ttconnect: S(e.connectStart, e.navigationStart),
                            ttfb: S(e.responseStart, e.navigationStart)
                        };
                    if ("object" === ("undefined" == typeof M ? "undefined" : c(M)) && M.subresources && M.subresources
                        .names && void 0 !== window.SubResoucesTiming) {
                        var n = M.subresources.lastImage || "",
                            i = M.subresources.firstImage || "",
                            a = new window.SubResoucesTiming(M.subresources.names, n, i);
                        a.length && "fsImg" === a[a.length - 1].id && (r.atf = a[a.length - 1].start, r.c_atf = a[a
                            .length - 1].start - S(e.responseStart, e.navigationStart))
                    }
                    try {
                        t.getEntriesByType("paint").forEach(function (t, e, n) {
                            "first-paint" === t.name && (r.firstPaint = t.startTime)
                        })
                    } catch (t) {}
                    if (!r.firstPaint && e.msFirstPaint && "number" == typeof e.msFirstPaint && (r.firstPaint = S(e
                            .msFirstPaint, e.navigationStart)), !r.firstPaint && window.chrome && window.chrome.loadTimes) {
                        var o = window.chrome.loadTimes();
                        r.firstPaint = Math.round(1e3 * (o.firstPaintTime - o.startLoadTime))
                    }
                    return ("number" != typeof r.firstPaint || r.firstPaint < 0) && (r.firstPaint = void 0),
                        "undefined" != typeof M && M.TimeTracker && M.TimeTracker.fst && (r.firstScreen = S(M.TimeTracker
                            .fst, e.navigationStart)), r
                }
            }
        },
        L = function (e) {
            var n = {};
            return m(h(e), function (t) {
                0 < e[t] && (n[t] = e[t])
            }), n
        },
        j = {
            type: "timer",
            data: function () {
                var t = window.performance || window.mozPerformance;
                if (t && t.getEntriesByType) {
                    for (var e = t.getEntriesByType("resource"), n = [], r = 0; r < e.length; r++) {
                        var i = e[r],
                            a = "".concat(i.name, "?"),
                            o = {
                                load: parseInt(i.duration, 10),
                                redirect: S(i.redirectEnd, i.redirectStart),
                                appcache: S(i.domainLookupStart, i.fetchStart),
                                dns: S(i.domainLookupEnd, i.domainLookupStart),
                                network: S(i.connectEnd, i.connectStart),
                                send: S(i.requestStart, i.connectEnd),
                                ttfb: S(i.responseStart, i.requestStart),
                                receive: S(i.responseEnd, i.responseStart)
                            };
                        n.push({
                            data: L(o),
                            tags: {
                                path: a.slice(0, a.indexOf("?")),
                                type: i.initiatorType
                            }
                        })
                    }
                    return n
                }
            }
        };
    C.addPlugin("browser.page.business", I), C.addPlugin("fps", R), C.addPlugin("page", P), C.addPlugin("resources", j),
        O = function () {
            if (window.MeituanAnalyticsObject) {
                var t = window.MeituanAnalyticsObject;
                "[object String]" === Object.prototype.toString.call(t) && (t = [t]);
                for (var e = 0; e < t.length; e++) A(t[e])
            }
        }, "complete" === document.readyState ? O() : _.addEvent("load", O)
} ();