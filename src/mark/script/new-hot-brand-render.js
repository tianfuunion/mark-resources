define("zebra-pages/fp5/pc/js/mods/new-hot-brand", ["zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-render", "zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-item-render", "mui/jquery/jquery", "zebra-pages/fp5/pc/js/mods/util", "zebra-pages/fp5/pc/js/mods/model", "zebra-pages/fp5/pc/js/mods/exposure", "mui/crossimage/index"], function (e, a, r) {
    var t = e("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-render"),
        n = e("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-item-render"), o = e("mui/jquery/jquery"),
        s = e("zebra-pages/fp5/pc/js/mods/util"), i = e("zebra-pages/fp5/pc/js/mods/model"),
        d = (e("zebra-pages/fp5/pc/js/mods/exposure"), e("mui/crossimage/index")), p = ".j_newHotBrandBody",
        l = ".j_newHotBrandItemBody", c = "&#xe61f;", u = !0, m = 0, f = 29, g = 4, b = [], h = {
            "conSelector": ".j_newHotBrand", "RES_ID_ARR": ["09042"], "init": function (e) {
                var a = this, r = !1;
                try {
                    location.href.indexOf("forceBrandError=true") > 0 ? r = !0 : (b = e[a.RES_ID_ARR[0]].data, g = Math.floor(b.length / f), b.length < 96 && codeTrack("error:newHotBrandItemNumber.error", "app.init", {"msg": "\u54c1\u724c\u5899\u8fd4\u56de\u4e2a\u6570\u5c11\u4e8e96\uff0c\u4e3a" + b.length}))
                } catch (n) {
                    r = !0, codeTrack("error:newHotBrandItem.error", "app.init", {"msg": "\u54c1\u724c\u5899\u63a5\u53e3\u8c03\u7528\u5931\u8d25"})
                }
                var t = {};
                try {
                    a.render({"icon": c, "data": t})
                } catch (n) {
                }
                s.mmstat("/tmallfp.5105.1"), r && o(".refresh-btn", a.conSelector).hide(), a.bindEvent(), a._initCollectBrand(), o(p).css({"opacity": 0}).animate({"opacity": 1}, 200)
            }, "render": function (e) {
                var a = this;
                o(p).html(t(e)).removeClass("fp-content-loading"), a.updateBrandItems()
            }, "bindEvent": function () {
                var e = this;
                o(e.conSelector).on("click", ".refresh-btn", function (a) {
                    a.preventDefault(), a.stopPropagation(), s.mmstat("/tmallfp.5006.1"), e.updateBrandItems()
                })
            }, "updateBrandItems": function () {
                var e = {}, a = m * f;
                if (e.brands = b.slice(a, a + f), m = m < g - 1 ? m + 1 : 0, e.brands.forEach(function (e, a) {
                    e.imgUrl = d.getFitUrl(s.trimPic(e.imgUrl), 100, 50, {"quality": g_config.imgQuality, "sharpen": ""})
                }), o(".rotate-icon", p).addClass("active"), setTimeout(function () {
                    o(".rotate-icon", p).removeClass("active")
                }, 500), u) u = !1, e.needCon = !0, o(l).html(n(e)); else {
                    var r = 0;
                    o(l).find(".brand-item").each(function (a, t) {
                        var s = Math.floor(a % 6), i = Math.floor(a / 6), d = {"brands": [e.brands[a]]};
                        r = s + i, setTimeout(function () {
                            o(".brand-img", t).animate({"width": 0}, 150, "linear", function () {
                                o(t).html(n(d)), o(".brand-img", t).css({"width": 0}).animate({"width": 122}, 100, "linear")
                            })
                        }, 30 + 100 * r)
                    })
                }
                e.brands.forEach(function (e) {
                    e.exposureParam && s.send(e.exposureParam)
                })
            }, "_initCollectBrand": function () {
                var e = this;
                0 !== o(p).length && o(p).on("click", function (a) {
                    if (o(a.target).hasClass("j_BrandStatus")) {
                        var r = a.target;
                        a.preventDefault(), a.stopPropagation();
                        var t = o(r).attr("data-id"), n = o(r).attr("data-collected");
                        n && "true" == n ? i.delBrand(t, function () {
                            o(r).attr("data-collected", "false"), o(r).removeClass("collected"), o(r).html("&#xe604;"), s.mmstat("/tmallfp.5106.2")
                        }, function () {
                        }) : i.addBrand(t, function (a) {
                            "T" == a.is_success ? (o(r).attr("data-collected", "true"), o(r).addClass("collected"), o(r).html("&#xe603;"), s.mmstat("/tmallfp.5106.1")) : "O" == a.is_success ? document.location.href = "//login.tmall.com?spm=875.7931836.fpBrandCollectedLogin.1&redirect_url=" + encodeURIComponent(document.location.href) : e._showBrandStatusTip(brandStatusTip, "\u5173\u6ce8\u5931\u8d25")
                        }, function () {
                        })
                    }
                })
            }
        };
    r.exports = h
});
define("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-render", ["./new-hot-brand", "zebra-pages/fp5/pc/js/mods/x-runtime"], function (e, t, a) {
    var n = e("./new-hot-brand"), r = e("zebra-pages/fp5/pc/js/mods/x-runtime"), o = new r(n);
    a.exports = function () {
        return o.render.apply(o, arguments)
    }
});
define("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand", function (e, t, a) {
    (a.exports = function (e) {
        var t = this, a = t.root, n = t.buffer, r = t.scope,
            o = (t.runtime, t.name, t.pos, r.data, r.affix, a.nativeCommands), i = a.utils;
        i.callFn, i.callCommand, o.range, o.foreach, o.forin, o.each, o["with"], o["if"], o.set, o.include, o.parse, o.extend, o.block, o.macro, o["debugger"];
        return n.data += " ", n.data += "\n  ", n.data += "\n ", n.data += "\n", n.data += '\n<div class="brand-list">\n  <ul class="init j_newHotBrandItemBody brand-item-body" data-spm="2016073"></ul>\n  <div data-spm="fpBrandFresh">\n    <a href="#" class="refresh-btn" data-spm-click="gostr=/tmallfp;locaid=d99;">\n      <i class="rotate-icon fp-iconfont">&#xe637;</i>\n      <span class="btn-text">\u6362\u4e00\u6279</span>\n    </a>\n  </div>\n</div>\n', n
    }).TPL_NAME = a.id || a.name
});
define("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-item-render", ["./new-hot-brand-item", "zebra-pages/fp5/pc/js/mods/x-runtime"], function (e, t, a) {
    var n = e("./new-hot-brand-item"), r = e("zebra-pages/fp5/pc/js/mods/x-runtime"), o = new r(n);
    a.exports = function () {
        return o.render.apply(o, arguments)
    }
});
define("zebra-pages/fp5/pc/js/js-xtpl/new-hot-brand-item", function (e, t, a) {
    (a.exports = function (e) {
        function t(e, t, a) {
            e.data, e.affix;
            return t.data += '\n  <li class="brand-default">\n    <a href="//ju.taobao.com/tg/brand.htm">\n      <img width="100%" src="https://img.alicdn.com/tfs/TB13R0daSFRMKJjy0FhXXX.xpXa-1230-326.jpg">\n    </a>\n  </li>\n', t
        }

        function a(e, t, a) {
            e.data, e.affix;
            return t.data += '\n  <li class="brand-item">\n  ', t
        }

        function n(e, t, a) {
            var n = e.data, r = e.affix;
            t.data += "\n            <span>\u4f18\u60e0\u5238 \uffe5", u.line = 18;
            var o = (s = r.couponValue) !== a ? s : (s = n.couponValue) !== a ? s : e.resolveLooseUp(["couponValue"]);
            return t = t.writeEscaped(o), t.data += "</span>\n          ", t
        }

        function r(e, t, a) {
            var n = e.data, r = e.affix;
            t.data += "\n            <span>", u.line = 20;
            var o = (s = r.brandName) !== a ? s : (s = n.brandName) !== a ? s : e.resolveLooseUp(["brandName"]);
            return t = t.writeEscaped(o), t.data += "</span>\n          ", t
        }

        function o(e, t, a) {
            e.data, e.affix;
            return t.data += "\n  </li>\n  ", t
        }

        function i(e, t, i) {
            var d = e.data, c = e.affix;
            t.data += "\n  ", u.line = 9;
            var p = (s = e.root.affix.needCon) !== i ? s : e.root.data.needCon;
            t = b.call(l, e, {
                "params": [p],
                "fn": a
            }, t), t.data += '\n      <div class="brand-img">\n        <img src="', u.line = 13;
            var f = (s = c.imgUrl) !== i ? s : (s = d.imgUrl) !== i ? s : e.resolveLooseUp(["imgUrl"]);
            t = t.writeEscaped(f), t.data += '">\n      </div>\n      <a class="brand-mask" href="', u.line = 15;
            var m = (s = c.action) !== i ? s : (s = d.action) !== i ? s : e.resolveLooseUp(["action"]);
            t = t.writeEscaped(m), t.data += '">\n        <div class="coupon">\n          ', u.line = 17, u.line = 17;
            var g = (s = c.couponValue) !== i ? s : (s = d.couponValue) !== i ? s : e.resolveLooseUp(["couponValue"]),
                h = g;
            if (h) {
                var v = (s = c.couponValue) !== i ? s : (s = d.couponValue) !== i ? s : e.resolveLooseUp(["couponValue"]),
                    x = v;
                x = v > 0, h = x
            }
            t = b.call(l, e, {
                "params": [h],
                "fn": n,
                "inverse": r
            }, t), t.data += '\n        </div>\n        <div class="enter">\n          <span>\u70b9\u51fb\u8fdb\u5165</span>\n        </div>\n      </a>\n  ', u.line = 27;
            var y = (s = e.root.affix.needCon) !== i ? s : e.root.data.needCon;
            return t = b.call(l, e, {"params": [y], "fn": o}, t), t.data += "\n", t
        }

        var s, l = this, d = l.root, c = l.buffer, p = l.scope, u = (l.runtime, l.name, l.pos), f = p.data, m = p.affix,
            g = d.nativeCommands, h = d.utils, v = (h.callFn, h.callCommand, g.range, g.foreach, g.forin, g.each),
            b = (g["with"], g["if"]);
        g.set, g.include, g.parse, g.extend, g.block, g.macro, g["debugger"];
        c.data += "", u.line = 1;
        var x = (s = m.brands) !== e ? m.brands.length : (s = f.brands) !== e ? s.length : p.resolveLooseUp(["brands", "length"]),
            y = x;
        y = 0 === x, c = b.call(l, p, {"params": [y], "fn": t}, c), c.data += "\n", u.line = 8, u.line = 8;
        var w = (s = m.brands) !== e ? s : (s = f.brands) !== e ? s : p.resolveLooseUp(["brands"]);
        return c = v.call(l, p, {"params": [w], "fn": i}, c), c.data += "\n", c
    }).TPL_NAME = a.id || a.name
});
define("zebra-pages/fp5/pc/js/mods/fix-search", ["mui/jquery/jquery", "zebra-pages/fp5/pc/js/mods/util"], function (e, a, r) {
    var s = e("mui/jquery/jquery"), t = e("zebra-pages/fp5/pc/js/mods/util");
    r.exports = {
        "init": function (e) {
            var a, r, o, n, i = s("body"), p = s(window), d = !1, c = s("#mallSearch"), l = s("#mq");
            if (c && l) {
                var u = (s(".j_channel"), 788);
                i.append('<div class="as-shelter"></div><div id="J_ASTotalContainer" class="as-total-container"><div id="J_AttachedSearchContainer" class="attached-search-container"><div class="fp-iconfont-new"><span class="logo-en">&#xe610;</span><span class="logo-zh">&#xe611;</span></div></div></div>');
                var m = s("#J_AttachedSearchContainer"), f = s("#J_ASTotalContainer"), g = s(".as-shelter");
                s(window).on("scroll", t.buffer(function (e) {
                    p.scrollTop() > u ? !1 !== d && "block" === f.css("display") || (l[0].blur(), setTimeout(function () {
                        c.appendTo(m)
                    }, 100), f.addClass("show"), g.addClass("show"), d = !0, TB && TB.instance && TB.instance.searchbar && (a = TB.instance.searchbar, r = a.get("log"), r.clickId = "attachedsearch", a.set("log", r)), o === undefined && (n = setInterval(function () {
                        var e = s(".s-menu");
                        e && (e.css({"position": "fixed"}), e.css({"top": "40px"}), clearInterval(n))
                    }, 500)), o === undefined && s(".s-menu") && (o = s(".s-menu")), o && (o.css({"opacity": 1}), o.css({"position": "fixed"}))) : p.scrollTop() <= u && !0 === d && (l[0].blur(), c.appendTo(".header-extra"), f.removeClass("show"), g.removeClass("show"), d = !1, clearInterval(n), TB && TB.instance && TB.instance.searchbar && (a = TB.instance.searchbar, r = a.get("log"), r.clickId = "topsearch", a.set("log", r)), o === undefined && s(".s-menu") && (o = s(".s-menu")), o && o.css({"position": "absolute"}))
                }, 30))
            }
        }
    }
});
define("zebra-pages/fp5/pc/js/mods/header", ["zebra-pages/fp5/pc/js/mods/util", "zebra-pages/fp5/pc/js/mods/model"], function (e, a, r) {
    var s = e("zebra-pages/fp5/pc/js/mods/util"), t = e("zebra-pages/fp5/pc/js/mods/model");
    r.exports = {
        "RES_ID_ARR": ["201603169", "lb-zebra-17931-286930", "2015110211"],
        "RES_NAME_ARR": ["doodle", "event"],
        "init": function (e) {
            var a = this;
            a._initMemberExp(), a._joinus(), e && (a._initDoodle(e), a._initEventBanner(e))
        },
        "_initEventBanner": function (e) {
            var a = this, r = e[a.RES_ID_ARR[1]];
            if (window.location.search.indexOf("wh_daily=daily") > 0 && (r = {
                "data": [{
                    "imgUrl": "//gtms04.alicdn.com/tps/i4/TB17HQ1MpXXXXbsXXXXD1MBIXXX-190-80.png",
                    "action": "//pages.tmall.com/wow/act/15852/dqr",
                    "switch": !0
                }]
            }), (r = r && r.data && r.data.length > 0 ? r.data[0] : undefined) && "" + r["switch"] == "true") {
                var t = $(".header-banner");
                if (0 !== t.length) {
                    r.exposureParam && s.send(r.exposureParam), r.action = r.action + (r.action && r.action.indexOf("?") > 0 ? "" : "?") + "spm=875.7931836.2015003.1", $(t).append('<a data-spm="2015003" style="display:none;" class="event-banner j_eventBanner" href="' + (r.action || "#") + '"><img class="event-pic j_eventPic" width="100%" height="100%" src="//img.alicdn.com/tps/i1/TB1ZkQYHpXXXXcPXXXX_RF9JFXX-1-1.gif" data-src="' + r.imgUrl + '" /></a>');
                    var o = $(".j_eventBanner", t), n = $(".j_eventPic", t), i = r.imgUrl;
                    n.length > 0 && i && ($(n).attr("onload", function () {
                        $(o).hide().fadeIn(300)
                    }), $(n).attr({"src": i}))
                }
            }
        },
        "_initDoodle": function (e) {
            var a = this, r = e[a.RES_ID_ARR[0]];
            if ((r = r && r.data && r.data.length > 0 ? r.data[0] : undefined) && "" + r["switch"] != "false") {
                var t = $(".j_logo"), o = $(".tmall-logo-img");
                if (0 !== t.length) {
                    r.exposureParam && s.send(r.exposureParam), $(o).after('<div style="display:none;" class="doodle-con j_doodleCon">' + (r && r.action && r.action.length > 0 ? '<a class="j_doodleLink" style="display:block;height:100%;width:100%;" href="' + r.action + '">' : "") + a._getCountdownCon() + '<img class="doodle hide j_doodle" src="//img.alicdn.com/tps/i1/TB1ZkQYHpXXXXcPXXXX_RF9JFXX-1-1.gif" data-src="' + r.imgUrl + '" />' + (r && r.action && r.action.length > 0 ? "</a>" : "") + "</div>");
                    var n = $(".j_doodleCon", t), i = $(".j_doodle", t), p = i.length > 0 && i.attr("data-src");
                    i.length > 0 && p && (window.g_defaultData.cycloneEntry.isUse || ($(o).hide(), $(i).attr("onload", function () {
                        $(n).hide().fadeIn(300)
                    })), $(i).attr({"src": p}))
                }
            }
        },
        "_getCountdownCon": function () {
            return window.isAdd ? '<div id="J_doodleCountdownCon" style="display:none;" class="doodle-countdown-con"></div>' : ""
        },
        "_initMemberExp": function () {
            t.addMemberExp()
        },
        "_joinus": function () {
            var e = {
                "info": "\u55b5~ \u52a0\u5165\u6211\u4eec\u5427 https://tb.cn/iS8NBOy",
                "logo": "   :::                                :::  \n :::::::                             ::::: \n:::::::::                          ::::::::\n:::::::::::::::::::::::::::::::::::::::::::\n::::    :::    ::::::::::::::::   :::  ::::\n:::    Smart    :::::cool::::    Crazy  :::\n:::::   :::    :::::::::::::::    :::   :::\n:::::::::::::::::::::::::::::::::::::::::::"
            };
            window.console && console.info && console.info(e.logo + "\n\n" + e.info)
        }
    }
});