/**============================================================
 * Mark Engine JavaScript Library
 * #region << 版 本 注 释 >>
 * Copyright (C) 2018-2019 南阳市天府网络科技有限公司 版权所有。
 * Copyright (C) 2018-2019 TianFu Union Co.Ltd. All rights reserved.
 *
 * 文件名：mark.js
 * 文件功能描述：自定义js方法库
 *
 * 创建者：Mark (Administrator)
 * 时间：2018-10-24 10:24:00
 *
 * 修改人：Mark
 * 时间：2018-12-16 10:24:00
 * 修改说明：添加内容
 *
 * 版本：V1.1.0
 *
 * <script type="text/javascript" charset="utf-8" src="https://res.tianfu.pub/mark/script/mark.js?v=1.1"></script>
 *
 * console.log('Hello, 如果你也喜欢，给我发邮件吧，我可能会注意到你！mark@tianfuunion.cn');
 * console.info('信息');
 * console.error('错误');
 * console.warn('警告');
 *
 *============================================================ */
;(function () {
    'use strict';

    $.ajaxSetup({
        cache: true
    });
    $.getScript("https://res.tianfu.pub/jquery/script/jquery.cookie.js", function () {
        if (new Date().getTime() <= new Date("2020-04-05 00:00:00").getTime()) {
            // $.cookie("theme_mode", "grayscale", {domain: location.host, expires: 86400});
        } else {
            // $.cookie("theme_mode", "daymode", {domain: location.host, expires: 86400});
        }

        // $.cookie("theme_mode", "nightmode", {domain: location.host, expires: 86400});

        /**========================== 切换界面模式 ==========================**/
        switch ($.cookie("theme_mode")) {
            case"daymode": // 白天模式
                document.querySelector('html').classList.add("daymode");
                document.body.classList.add("daymode");
                break;
            case"nightmode": // 夜晚模式
                document.querySelector('html').classList.add("nightmode");
                document.body.classList.add("nightmode");
                break;
            case"grayscale": //灰度模式
                document.querySelector('html').classList.add("grayscale");
                document.body.classList.add("grayscale");
                break;
            default:
                break;
        }

    });

}());

var Mark = (function () {
    return {
        // 系统初始化
        init: function () {
            //配置artDialog全局默认参数
            (function (config) {
                config['lock'] = true;
                config['fixed'] = true;
                config['resize'] = false;
                config['background'] = '#000';
                config['opacity'] = 0.5;
            })(dialog.defaults);
            //更新当前用户ID

            //阻止弹出浏览器默认右键菜单 -->  在初始化右键菜单有此功能，这里可以考虑删除！
            // $('body').on('contextmenu', function(){
            // $(".popup-menu").hide();
            // $('.quick_view_container').remove();
            // return false;
            // });

            // Home.zoom.init();    //用于判断网页是否缩放
            // Home.deskTop.init();   //桌面(容器)初始化
            // Home.wallpaper.init();   //初始化壁纸
            // Home.searchbar.init();   //初始化搜索栏
            // Home.startmenu.init();   //初始化开始菜单
            Home.taskbar.init();   //初始化任务栏
            // Home.dock.init();    //初始化dock
            Home.app.init();    //初始化桌面应用
            // Home.widget.init();    //初始化widget模块
            Home.window.init();    //初始化窗口模块
            // Home.folderView.init();   //初始化文件夹预览
            // Home.appmanage.init();   //初始化全局视图
            // Home.popupMenu.init();   //初始化右键菜单
            // Home.lock.init();    //初始化锁屏
            // Home.hotkey.init();    //初始化快捷键
            // Home.uploadFile.init();   //文件上传
            Home.uploader.init();   //文件上传2
            // if(!$.browser.msie){ window.onbeforeunload = Util.confirmExit; } // 增加离开页面确认窗口，IE下有bug，暂时屏蔽
            Home.base.run();    //页面加载后运行
            // Home.widget.reduction();  //还原widget
            // Home.base.help();    //加载新手帮助
            // Home.base.help_first();
            // Home.base.getSkin(function(skin){Home.base.setSkin(skin)});

            // Home.create.crm();
        },
        debug: function (de) {
            if (is_empty(de)) {
                return Mark.debug;
            } else {
                Mark.debug = de;
            }
        },
        cache: function (a) {
            if (!L(a)) return {};
            var b = a[this.expando];
            return b || (b = {}, L(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                value: b,
                configurable: !0
            }))), b
        },
        load: function () {
            return {
                url: function (url) {
                    window.location.href = url;
                },
                open: function (url) {
                    window.open(url);
                },
                openSafe: function (url) {
                    window.open(url);
                }
            }
        },

        run: function () {
            // console.log("Mark::Run()");
            this.build();
            /**
             var url = location.search;
             var request = new Object();
             if(url.indexOf("?") != -1){
  var str = url.substr(1);
  strs = str.split("&");
  for(var i = 0; i < strs.length; i++){
  request[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
  }
  }
             if(typeof(request['run']) != 'undefined' && typeof(request['type']) != 'undefined'){
  $.ajax({
  type : 'POST',
  url : ajaxUrl,
  data : 'ac=getAppidByRealappid&id=' + request['run']
  }).done(function(appid){
  if(request['type'] == 'app'){
  Home.window.create(appid);
  }else{
  //判断挂件是否存在cookie中，因为如果存在则自动会启动
  if(!Home.widget.checkCookie(appid, request['type'])){
  Home.widget.create(appid);
  }
  }
  });
  }
             */
        },

        // 自动构造程序
        build: function () {
            // console.debug("Mark::Build()");
            var container = document.getElementsByClassName("mk-banner-container");
            // container.forEach();
            for (var i = 0, len = container.length; i < len; i++) {

                if (is_empty($(container[i]).data("defined")) || $(container[i]).data("defined") === 'false') {
                    // if (is_empty(container[i].attributes["data-defined"]) || container[i].attributes["data-defined"] === "false") {
                    Mark.banner().structure(container[i]);

                    // console.debug("Mark.banner().structure(container[i])");
                } else {
                    // console.error("Mark.banner().structure(container is defined)", i);
                }
            }

            // Mark.banner().swiper();
        },
        // 轮播图
        banner: function () {
            // console.debug("Mark::Banner()");
            return {
                structure: function (container) {
                    // console.debug("Mark::Banner::structure()");
                    if (!is_empty($(container).data("src"))) {
                        // if (!is_empty(container.attributes["data-src"])) {
                        this.getCache(container);
                    } else {
                        console.error("Mark::Banner::structure(container is not src)");
                    }
                },

                /**
                 * 获取缓存数据
                 *
                 * @param container
                 */
                getCache: function (container) {
                    // console.debug("Mark.Banner::getCache()");
                    var that = this;
                    if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
                        // var json = window.localStorage.getItem(window.btoa($(container).data("url")));
                        var json = null;
                        if (!is_empty($(container).data("token"))) {
                            json = window.localStorage.getItem($(container).data("token"));
                        } else {
                            json = window.localStorage.getItem(window.btoa($(container).data("src").parseURL().host + $(container).data("src").parseURL().path));
                        }
                        if (!is_empty(json)) {
                            that.buildContent(container, JSON.parse(json));
                        } else {
                            console.debug("Mark.Banner.js component not used Window.localStorage cache");
                            that.getData(container);
                        }
                    } else {
                        console.debug("Mark.Banner.Js getCache() This device not support localStorage");
                        that.getData(container);
                    }
                },
                /**
                 * 获取网络数据
                 * @param container
                 */
                getData: function (container) {
                    // console.debug("Mark.Banner::getData()");
                    var that = this;

                    // 设置 URL，通过 Ajax 获取数据
                    if (!is_empty($(container).data("src"))) {
                        $.ajax({
                            url: $(container).data("src"),
                            type: "GET",
                            cache: false,
                            data: null,
                            processData: false,
                            contentType: false,
                            dataType: "json",

                            // xhrFields: {withCredentials: true}, // 跨源请求是否提供凭据(cookie、HTTP认证及客户端SSL证明等)
                            crossDomain: true,

                            success: function (json) {
                                if ($(container).data("debug")) {
                                    console.info("<========== Console Json Start ==========>" + "Type:" + gettype(json));
                                    console.info(formatJson(json));
                                    console.info("<========== Console Json End ==========>");
                                } else {
                                    console.debug("<========== Console Json Not Debug ==========>");
                                }
                                if (!is_empty(json)) {
                                    if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
                                        if (json.expire === 0) {
                                        } else if (!is_empty($(container).data("token"))) {
                                            window.localStorage.setItem(
                                                $(container).data("token"),
                                                JSON.stringify(json),
                                                !is_empty($(container).data("expire")) && !isNaN($(container).data("expire")) ? $(container).data("expire") : 86400
                                            );
                                        } else {
                                            // window.localStorage.setItem(window.btoa($(container).data("src")), JSON.stringify(json), 86400);
                                            window.localStorage.setItem(
                                                window.btoa($(container).data("src").parseURL().host + $(container).data("src").parseURL().path),
                                                JSON.stringify(json),
                                                !is_empty($(container).data("expire")) && !isNaN($(container).data("expire")) ? $(container).data("expire") : 86400);
                                        }
                                    }
                                    that.buildContent(container, json);
                                } else {
                                    console.error("Mark.Banner.Js getData() data is null");
                                }
                            },
                            error: function (data) {
                                console.error("TODO: 操作失败：" + data);
                                $.toast("操作失败", "text");
                            }
                        });
                    } else {
                        console.debug("Traversal", $(container).data("src"));
                    }
                },
                /**
                 * 构建选框内容
                 * @param container
                 * @param json
                 */
                buildContent: function (container, json) {
                    var that = this;
                    // console.debug("Mark.Banner::buildContent()");
                    var modal = "";

                    modal += '<div class="swiper-wrapper">';

                    if (!is_empty(json)) {
                        for (var i = 0; i < json.length; i++) {

                            modal += '<div class="swiper-slide">';
                            modal += '<a href="';

                            if (!is_empty(json[i].href)) {
                                modal += json[i].href;
                            } else {
                                modal += 'javascript:void(0);';
                            }

                            if (!is_empty(json[i].src)) {
                                modal += '"><img class="w100 h100" src="' + json[i].src + '">';
                            } else if (!is_empty($(container).data("onerror"))) {
                                modal += '"><img class="w100 h100" src="' + $(container).data("onerror") + '">';
                            } else {
                                modal += '"><img class="w100 h100" src="https://res.tianfu.pub/images/banner/banner_cosmetic.jpg">';
                            }
                            modal += '</a>';

                            modal += '</div>';
                        }
                    }

                    modal += '</div>';

                    if ($(container).data("pagination")) {
                        modal += '<div class="swiper-pagination"></div>';
                    }

                    $(container)
                        .html(modal)
                        .attr("data-defined", true);

                    // var autoplay = $(container).data("autoplay") ? $(container).data("autoplay") : 5000;
                    // $(container).swiper({loop: true, autoplay: autoplay});
                    this.swiper(container);
                    // that.setDefaultValue();
                },
                swiper: function (container) {
                    $.ajaxSetup({
                        cache: true
                    });
                    $.getScript("https://res.tianfu.pub/swiper/script/swiper.min.js", function () {
                        var autoplay = !is_empty($(container).data("autoplay")) ? $(container).data("autoplay") : 5000;
                        $(container).swiper({loop: true, autoplay: autoplay});
                    });
                }
            };
        },
        // 退出登录
        logout: function () {
            $.ajax({
                type: 'POST',
                url: ajaxUrl,
                data: 'ac=logout',
                success: function () {
                    location.href = '/';
                }
            });
        },
        // 帮助程序
        help: function () {
            if ($.cookie('isLoginFirst') == null) {
                $.cookie('isLoginFirst', '1', {expires: 95});
                if (!$.browser.msie || ($.browser.msie && $.browser.version < 9)) {
                    $('body').append(helpTemp);
                    //IE6,7,8基本就告别新手帮助了
                    $('#step1').show();
                    $('.close').on('click', function () {
                        $('#help').remove();
                    });
                    $('.next').on('click', function () {
                        var obj = $(this).parents('.step');
                        var step = obj.attr('step');
                        obj.hide();
                        $('#step' + (parseInt(step) + 1)).show();
                    });
                    $('.over').on('click', function () {
                        $('#help').remove();
                    });
                }
            }
        },
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    // console.log("Mark::DOMContentLoaded()");
    Mark.run();

}, false);

window.addEventListener('pagehide', function () {
    // console.log("Mark::pagehide()", '页面要关闭了');
    /*
    $.confirm("页面要关闭了", function () {
        //点击确认后的回调函数
        $.toast("确认");
    }, function () {
        //点击取消后的回调函数
        $.toast("取消", "cancel");
    });
    */
});

Mark.debug = false;

if (typeof (jQuery) == "undefined") {
    // console.log("jQuery is not imported");
    loadJquery();
} else {
    // console.log("jQuery is imported");
}

// Console Copyright
!function (e) {
    function o(s) {
        if (t[s]) return t[s].exports;
        var i = t[s] = {
            exports: {},
            id: s,
            loaded: !1
        };
        return e[s].call(i.exports, i, i.exports, o),
            i.loaded = !0,
            i.exports
    }

    var t = {};
    return o.m = e,
        o.c = t,
        o.p = "",
        o(0)
}([function (e, o) {
    "use strict";
    !function () {
        var e = void 0;
        if (window.console && "undefined" != typeof console.log) {
            try {
                (window.parent.__has_console_security_message || window.top.__has_console_security_message) && (e = !0)
            } catch (o) {
                e = !0
            }
            if (window.__has_console_security_message || e) return;
            var o = "\u6e29\u99a8\u63d0\u793a\uff1a\u8bf7\u4e0d\u8981\u8c03\u76ae\u5730\u5728\u6b64\u7c98\u8d34\u6267\u884c\u4efb\u4f55\u5185\u5bb9\uff0c\u8fd9\u53ef\u80fd\u4f1a\u5bfc\u81f4\u60a8\u7684\u8d26\u6237\u53d7\u5230\u653b\u51fb\uff0c\u7ed9\u60a8\u5e26\u6765\u635f\u5931 \uff01^_^",
                t = "\u6211\u4eec\u662f\u4e00\u7fa4\u6ee1\u6000\u68a6\u60f3\u7684\u5e74\u8f7b\u4eba\uff0c\u4e0d\u65ad\u52aa\u529b\u6539\u53d8\u4e4f\u5473\u7684\u4e92\u8054\u7f51\uff1a",
                s = "hr@tianfuunion.cn",
                i = [t, " ", s].join("");
            /msie/gi.test(navigator.userAgent) ?
                (console.log(o), console.log(i)) :
                console.log("%c Mark Engine %c Copyright \xa9 2017-%s\n%c" + o + "\n %c" + i + "\n ", 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:50px;color:#00bbee;-webkit-text-fill-color:#00bbee;-webkit-text-stroke: 1px #00bbee;', "font-size:12px;color:#999999;", (new Date).getFullYear(), "color:#333;font-size:16px;", "font-size:12px;"),
                window.__has_console_security_message = !0
        }
    }();
}]);

/*
if(typeof(Mark.Verify)=="undefined"){
 console.log("Mark.Verify is not imported");
 new_element=document.createElement("script");
 new_element.setAttribute("type","text/javascript");
 new_element.setAttribute("charset","utf-8");
 new_element.setAttribute("src","https://res.tianfu.pub/validform/script/mark.verify.js");// 在这里引入了a.js
 var first = document.getElementsByTagName("script")[0];
 first.parentNode.insertBefore(new_element, first);
 // document.body.appendChild(new_element);
}
*/

$(window).ready(function () {
    if (Mark.debug) {
        console.info(
            "\n返回显示屏幕的高度 (除 Windows 任务栏之外)。" + window.screen.availHeight +
            "\n返回显示屏幕的宽度 (除 Windows 任务栏之外)。" + window.screen.availWidth +
            "\n设置或返回调色板的比特深度。" + window.screen.bufferDepth +
            "\n返回目标设备或缓冲器上的调色板的比特深度。" + window.screen.colorDepth +
            "\n返回显示屏幕的每英寸水平点数。" + window.screen.deviceXDPI +
            "\n返回显示屏幕的每英寸垂直点数。" + window.screen.deviceYDPI +
            "\n返回用户是否在显示控制面板中启用了字体平滑。" + window.screen.fontSmoothingEnabled +
            "\n返回显示器屏幕的宽度。" + window.screen.width +
            "\n返回显示屏幕的高度。" + window.screen.height +
            "\n返回显示屏幕每英寸的水平方向的常规点数。" + window.screen.logicalXDPI +
            "\n返回显示屏幕每英寸的垂直方向的常规点数。" + window.screen.logicalYDPI +
            "\n返回显示屏幕的颜色分辨率（比特每像素）。" + window.screen.pixelDepth +
            "\n设置或返回屏幕的刷新率。" + window.screen.updateInterval +
            "\n设备独立像素:" + window.devicePixelRatio
        );
    }


    $(".debug-switch").click(function () {
        $(".debug-panel").toggleClass("debug-toggle");
        // $(".debug-panel").slideToggle();
    });

});

//在关闭页面时弹出确认提示窗口
$(window).bind('beforeunload', function () {
    // return '您确定要离开了吗？';
});


/*
$(document).ready(function() {
 // console.log("微信ID:" + data_wxid + " UID:"+ data_uid);

    document.getElementById("input_file").addEventListener("focus",function () {
        console.log("focus");
    });

    document.getElementById("input_file").addEventListener("mousedown",function () {
        console.log("mousedown");
    });

    document.getElementById("input_file").addEventListener("mouseup",function () {
        console.log("mouseup");
    });

    document.getElementById("input_file").addEventListener("input",function () {
        console.log("input");
    });

    document.getElementById("input_file").addEventListener("change",function () {
        console.log("change");
    });

    document.getElementById("input_file").addEventListener("blur",function () {
        console.log("blur");
    });

    document.getElementById("input_file").addEventListener("click",function () {
        console.log("click");
    });

});
*/

document.addEventListener("DOMContentLoaded", function () {
    // window.onload=function(){
    // $(document).ready(function() {

    // HTML5的JavaScript选择器介绍
    // //www.cnblogs.com/iyitong/p/4229355.html

    // var tags = document.getElementsByTagName("input");
    // console.log(document.querySelector('body'));

    /**根据宽度计算html根节点的字体大小，进行响应式开发**/
    /*
        var docEl = document.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                docEl.style.fontSize = 16 * (clientWidth / 375) + 'px';
                console.info("clientWidth:"+clientWidth);
            };
        window.addEventListener(resizeEvt, recalc, false);
        recalc();
    */

    // });
}, {capture: true});


//根据屏幕大小及dpi调整缩放和大小
/*
(function() {
 var scale = 1.0;
 var ratio = 1;
 if (window.devicePixelRatio >= 2) {
  scale *= 0.5;
  ratio *= 2;
 }
 var text = '<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale +', minimum-scale=' + scale + ', width=device-width, user-scalable=no" />';
 document.write(text);
 document.documentElement.style.fontSize = 50*ratio + "px";
})();

*/
/*
window.addEventListener('load', function(e) {
 window.applicationCache.addEventListener('updateready', function(e) {
  if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
   window.applicationCache.swapCache()
   window.location.reload()
  } else {
   console.log("Manifest didn’t changed. Nothing new to server.");
  }
 }, false);
}, false);
*/

/********************** Manifest Start ********************/

/*
window.applicationCache.addEventListener('updateready', onUpdateReady);
if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
 window.applicationCache.swapCache();
 window.location.reload();
}

window.applicationCache.onchecking = function(){
   console.log("检查manifest文件是否存在");
}

window.applicationCache.ondownloading = function(){
   console.log("检查到有manifest或者manifest文件,已更新就执行下载操作,即使需要缓存的文件在请求时服务器已经返回过了");
}

window.applicationCache.onnoupdate = function(){
 console.log("返回304表示没有更新，通知浏览器直接使用本地文件");
}

window.applicationCache.onprogress = function(){
 console.log("下载的时候周期性的触发，可以通过它获取已经下载的文件个数");
}

window.applicationCache.oncached = function(){
 console.log("下载结束后触发，表示缓存成功");
}

application.onupdateready = function(){
 console.log("第二次载入，如果manifest被更新,在下载结束时候触发,不触发onchched。本地缓存正在更新中。。。");
   if(confirm("是否重新载入已更新文件")){
       window.applicationCache.swapCache();
       location.reload();
   }
}

window.applicationCache.onobsolete = function(){
   //未找到文件，返回404或者401时候触发
}

window.applicationCache.onerror = function(){
 console.log("其他和离线存储有关的错误");
}
*/
/********************** Manifest End *************************************/

/**
 * 时间对象的格式化;

 * JS 时间格式化
 * type 时间格式（yyyy-mm-dd hh:ii:ss / mm-dd / hh:ii / yyyy-mm）可自定义
 * date 毫秒时间戳（1554954127000）
 * 使用：timeFormat('yyyy-mm-dd hh:ii:ss',1554954127000)
 * 说明：紧支持毫秒级时间戳，传统秒级 Unix 时间戳需要乘以 1000 转换为毫秒
 *
 * @param format
 * @returns {*}
 */
Date.prototype.format = function (format) {
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

/**
 * 获取变量的类型
 * @param arr
 * @returns {string}
 */
function gettype(arr) {
    /*
    'undefined' - 如果变量是 Undefined 类型的
    'boolean' - 如果变量是 Boolean 类型的
    'number' - 如果变量是 Number 类型的
    'string' - 如果变量是 String 类型的
    'object' - 如果变量是一种引用类型或 Null 类型的
    */
    if (typeof (arr) == 'number') {
        return "number";
    } else if (typeof (arr) == 'string') {
        return "string";
    } else if (typeof (arr) == 'boolean') {
        return "boolean";
    } else if (typeof (arr) == 'object') {
        return "object";
    } else if (typeof (arr) == 'undefined') {
        return "undefined";
    } else {
        return "undefined";
    }
}

/**
 * 改成更高效的形式：
 * //www.cnblogs.com/lswit/p/4695939.html
 * Demo
 * var myParam = getQueryString("www.taobao.com?key0=a&key1=b&key2=c");
 * alert(myParam.key1);
 *
 * @param url
 * @returns {{}}
 */
function getQueryString(url) {
    if (url) {
        url = url.substr(url.indexOf("?") + 1); //字符串截取，比我之前的split()方法效率高
    }
    var result = {}, //创建一个对象，用于存name，和value
        queryString = url || location.search.substring(1), //location.search设置或返回从问号 (?) 开始的 URL（查询部分）。
        re = /([^&=]+)=([^&]*)/g, //正则，具体不会用
        m;
    while (m === re.exec(queryString)) { //exec()正则表达式的匹配，具体不会用
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]); //使用 decodeURIComponent() 对编码后的 URI 进行解码
    }
    return result;
}

/**
 * js 解析URL，检测是否为PathInfo

 * js如何准确获取当前页面url网址信息
 * @link //www.cnblogs.com/zhabayi/p/6419938.html
 *
 * @param url
 * @returns {boolean}
 */
function urlParser(url) {
    if (is_empty(url)) {
        return false;
    }

    // var href = window.location.href;
    var host = window.location.host;
    var res = url.search(host);
    console.log("Mark.urlParser()" + host + ":" + res);  // true
    return res !== -1;
}

/**
 调用方法：location.href.parseURL(); 效果不错

 'http://a.com:8888/a/b.html?c=1&0=0&d===&=1'.parseURL();
 //上面故意把参数写的很乱，为了测试，如果上面你的浏览器报错，说明版本较低，可以如下写法

 ('http://a.com:8888/a/b.html?c=1&0=0&d===&=1').parseURL();

 * @returns {{path: string, protocol: string, file: string, port: string, query: string, host: string, source: string, params: {}, hash: string, relative: string, segments: string[]}}
 */
String.prototype.parseURL = function () {
    var url = this.toString();
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/'),
        params: (function () {
            var ret = {};
            var seg = a.search.replace(/^\?/, '').split('&').filter(function (v, i) {
                if (v !== '' && v.indexOf('=')) {
                    return true;
                }
            });
            seg.forEach(function (element, index) {
                var idx = element.indexOf('=');
                var key = element.substring(0, idx);
                ret[key] = element.substring(idx + 1);
            });
            return ret;
        })()
    };
};

/**
 * 去空格
 * @returns {string}
 */
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

/**
 * JS保留小数 去尾法 进一法 四舍五入法
 * toFixed 四舍五入遇到坑。
 * 1.235.toFixed(2) = 1.23
 * 1.2350001.toFixed(2) = 1.24
 */

/**
 *去尾法
 * @param num
 * @returns {number}
 */
Number.prototype.toFloor = function (num) {
    return Math.floor(this * Math.pow(10, num)) / Math.pow(10, num);
};

/**
 *进一法
 * @param num
 * @returns {number}
 */
Number.prototype.toCeil = function (num) {
    return Math.ceil(this * Math.pow(10, num)) / Math.pow(10, num);
};

/**
 *四舍五入法
 * @param num
 * @returns {number}
 */
Number.prototype.toRound = function (num) {
    return Math.round(this * Math.pow(10, num)) / Math.pow(10, num);
};

/**
 * 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
 详情查看javascript的数值范围
 * @license //www.cnblogs.com/pelli/p/6112996.html
 *
 * @param idcode
 * @returns {boolean}
 */
function isIDCard(idcode) {
    // 加权因子
    var weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码
    var check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    var code = idcode + "";
    var last = idcode[17];//最后一个

    var seventeen = code.substring(0, 17);

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    var arr = seventeen.split("");
    var len = arr.length;
    var num = 0;
    for (var i = 0; i < len; i++) {
        num = num + arr[i] * weight_factor[i];
    }

    // 获取余数
    var resisue = num % 11;
    var last_no = check_code[resisue];

    // 格式的正则
    // 正则思路
    /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

    // 判断格式是否正确
    var format = idcard_patter.test(idcode);
    console.log(idcode + " - " + last_no + " - " + format);

    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return !!(last === last_no && format);
}

/**
 * 检测数据是否为空
 *
 * @param mixed
 * @returns {boolean}
 */
function is_empty(mixed = null) {
    return typeof mixed == 'undefined' ||
        mixed == undefined ||
        mixed == "undefined" ||
        mixed == "" ||
        mixed == null;
}

/**
 * @see is_empty
 * @deprecated
 * @param mixed
 * @returns {boolean}
 */
function isEmpty(mixed = null) {
    return is_empty(mixed);
}


/**
 * 真假判断
 *
 * @param mixed
 * @returns {boolean}
 */
function is_bool(mixed = null) {
    if (is_empty(mixed)) {
        return false;
    } else if (mixed === false) {
        return false;
    } else if (mixed === "false") {
        return false;
    } else if (mixed <= 0) {
        return false;
    } else if (mixed === "0") {
        return false;
    } else {
        return mixed === "true" || mixed === true || mixed >= 0 || !is_empty(mixed);
    }
}

function isset(data) {
    return typeof data === 'undefined' || data === "" || data === undefined || data === "undefined" || data == null;
}

/*
 * 生成[min,max]的随机整数
 *
 * @param minNum
 * @param maxNum
 * @returns {number}
 */
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
            return 0;
    }
}

/**
 * 车牌号校验
 * @param num
 * @returns {boolean}
 */
function isVehicleNumber(num) {
    // var express = "([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})";

    // var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    var express = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;

    if (is_empty(num)) {
        $.toast("请输入车牌号", "text");
        return false;
    } else if (num.length !== 7) {
        $.toast("请输入7位车牌号", "text");
        return false;
    } else if (!express.test(num)) {
        $.toast("请输入正确的车牌号", "text");
        return false;
    } else {
        return true;
    }
}

/**
 * 验证手机号码
 *
 * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
 * 联通号码段:130、131、132、136、185、186、145
 * 电信号码段:133、153、180、189
 *
 * @param num
 * @param msg
 * @returns {boolean}
 */
function isPhone(num, msg) {
    // var express = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
    // var express = ^1(3|4|5|7|8)\d{9}$;
    const express = /^[0]?\d{2,3}[- ]?\d{7,8}$|(?:^1[3456789]|^9[28])\d{9}$/;

    if (is_empty(num)) {
        $.toast(!is_empty(msg) ? msg : "请输入手机号", "forbidden");
        return false;
    } else if (num.length !== 11) {
        $.toast(!is_empty(msg) ? msg : "请输入11位手机号", "forbidden");
        return false;
    } else if (!express.test(num)) {
        $.toast(!is_empty(msg) ? msg : "请输入正确的手机号", "forbidden");
        return false;
    } else {
        return true;
    }
}

/**
 * 字符串加密算法
 *
 * @param strs
 * @param start
 * @param end
 * @param symbol
 * @returns {string}
 */
var string_encrypt = function (strs, start, end, symbol) {
    var str = String(strs);
    start === undefined ? 3 : start;
    end === undefined ? 7 : end;
    symbol === undefined ? "*" : String(symbol);

    var symbols = "";
    for (var i = 0; i < end - start; i++) {
        symbols += symbol;
    }

    return String(str.substr(0, start)) + String(symbols) + String(str.substr(end));
};

/*
 * 判断是否为电话号码
 *
 * @param tel
 * @returns {boolean}
 */
function isTelephone(tel) {
    var express = /^(([0+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;

    if (is_empty(tel)) {
        $.toast("请输入电话号码", "text");
        return false;
    } else if (!express.test(tel)) {
        $.toast("请输入正确的电话号码", "text");
        return false;
    } else {
        return true;
    }
}

/**
 *第三种  格式为：2010-10-20 10:00:00
 * @param nS
 * @returns {string}
 */
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/[年月]/g, "-").replace(/日/g, " ");
}

function getLocalTime2(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17);
}

/**
 * @return {string}
 */
function Format(timestamp) {
    return new Date(timestamp * 1000).toLocaleString();
}

/**
 * Unix timestamp (毫秒)
 *
 * @param timestamp
 * @returns {*}
 */
function getFormatDate(timestamp) {
    timestamp = parseInt(timestamp);
    var newDate = new Date(timestamp);
    Date.prototype.format = function (format) {
        var date = {
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S+': this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
            }
        }
        return format;
    };
    return newDate.format('yyyy-MM-dd h:m:s');
}

/**
 * 转为unicode 编码
 *
 * @param str
 * @returns {string}
 */
function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

/**
 * 解码
 * @param str
 * @returns {string}
 */
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    //转换中文
    str = unescape(str);
    //将其他受影响的转换回原来
    str = str.replace(/%/g, "\\");
    //对网址的链接进行处理
    str = str.replace(/\\/g, "");
    return str;
}


/**（Mark.library）函数库 **/

/*
 //引用示例部分
 //(1)创建json格式或者从后台拿到对应的json格式
var originalJson = {"name": "binginsist", "sex": "男", "age": "25"};
 //(2)调用formatJson函数,将json格式进行格式化
var resultJson = formatJson(originalJson);
 //(3)将格式化好后的json写入页面中
document.getElementById("writePlace").innerHTML = '<pre>' +resultJson + '<pre/>';
*/
//格式化代码函数,已经用原生方式写好了不需要改动,直接引用就好
var formatJson = function (json, options) {
    var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    ';
    options = options || {};
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true);
    options.spaceAfterColon = (options.spaceAfterColon !== false);
    try {
        if (typeof json !== 'string') {
            json = JSON.stringify(json);
        } else {
            json = JSON.parse(json);
            json = JSON.stringify(json);
        }
        reg = /([\{\}])/g;
        json = json.replace(reg, '\r\n$1\r\n');
        reg = /([\[\]])/g;
        json = json.replace(reg, '\r\n$1\r\n');
        reg = /(\,)/g;
        json = json.replace(reg, '$1\r\n');
        reg = /(\r\n\r\n)/g;
        json = json.replace(reg, '\r\n');
        reg = /\r\n\,/g;
        json = json.replace(reg, ',');
        if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
            reg = /\:\r\n\{/g;
            json = json.replace(reg, ':{');
            reg = /\:\r\n\[/g;
            json = json.replace(reg, ':[');
        }
        if (options.spaceAfterColon) {
            reg = /\:/g;
            json = json.replace(reg, ':');
        }
        (json.split('\r\n')).forEach(function (node, index) {
            var i = 0,
                indent = 0,
                padding = '';

            if (node.match(/\{$/) || node.match(/\[$/)) {
                indent = 1;
            } else if (node.match(/\}/) || node.match(/\]/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else {
                indent = 0;
            }

            for (i = 0; i < pad; i++) {
                padding += PADDING;
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });
    } catch (error) {
        console.error("formatJson:" + error);
    }
    return formatted;
};


Mark.obj = function (obj) {
    var description = "";
    for (var i in obj) {
        var property = obj[i];
        description += i + " = " + property + "\n";
    }
    console.info(description);
};


/**
 * 文章阅读记录
 *
 * @deprecated
 */
function articleReadLog() {
    $.ajax({
        type: "POST",
        url: "/club.php/topic/article_readlog",
        data: {
            uid: '<{$user. uid}>',
            aid: '<{$article.aid}>',
            url: window.location.href, // 当前url
            comefrom: document.referre,   // 访问来源
        },
        success: function (jsonstr) {
            console.log(jsonstr);
            // var data = $.parseJSON(jsonstr);
            var data = jsonstr;
            switch (data['status']) {
                case 200:
                    console.log("200 ：" + data['reason']);
                    break;
                case 404:
                    console.log("404 ：" + data['reason']);
                    break;
                default:
                    console.log("Null ReadLog 数据上传失败,请稍后重新上传 404 ：" + data['reason'] + " == " + data['status']);
                    break
            }
        },
        fail: function (err, status) {
            console.log(err);
            alert("Error：" + err);
        }
    });

}

/**
 * 对象转字符串
 *
 * @param o
 * @returns {string}
 */
function obj2string(o) {
    var r = [];
    if (typeof o == "string") {
        return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    }
    if (typeof o == "object") {
        if (!o.sort) {
            for (var i in o) {
                r.push(i + ":" + obj2string(o[i]));
            }
            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                r.push("toString:" + o.toString.toString());
            }
            r = "{" + r.join() + "}";
        } else {
            for (var i = 0; i < o.length; i++) {
                r.push(obj2string(o[i]))
            }
            r = "[" + r.join() + "]";
        }
        return r;
    }
    return o.toString();
}

/**
 * @deprecated
 */
function msg() {
    var html = '<div class="weui-msg">' +
        '<div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>' +
        '<div class="weui-msg__text-area">' +
        '<h2 class="weui-msg__title">操作成功</h2>' +
        '<p class="weui-msg__desc">内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现<a href="javascript:void(0);">文字链接</a></p>' +
        '</div>' +
        '<div class="weui-msg__opr-area">' +
        '<p class="weui-btn-area">' +
        '<a href="javascript:;" class="weui-btn weui-btn_primary">推荐操作</a>' +
        '<a href="javascript:;" class="weui-btn weui-btn_default">辅助操作</a>' +
        '</p>' +
        '</div>' +
        '<div class="weui-msg__extra-area">' +
        '<div class="weui-footer">' +
        '<p class="weui-footer__links">' +
        '<a href="javascript:void(0);" class="weui-footer__link">底部链接文本</a>' +
        '</p>' +
        '<p class="weui-footer__text">Copyright © 2012-2020 TianFuUnion</p>' +
        '</div>' +
        '</div>' +
        '</div>';

    window.body.append(html);
}


/**
 * 跳转
 * @deprecated
 */
function redirect(data) {
    if (is_empty(data)) {
        location.href = "/account.php/member";
    } else {
        location.href = data;
    }
}


//浏览器后退强制刷新
function pushHistory() {
    var rnumber = Math.floor(Math.random() * 1000);
    history.replaceState({v: rnumber}, '', window.location.href + '&v=' + rnumber);
}

/**
 * @deprecated
 * @param e
 * @constructor
 */
function ImgError(e) {
    e.setAttribute("src", "/Content/mobile/images/novoland.png");
}

/**
 * @deprecated
 * @param n
 * @returns {string}
 */
function request(n) {
    for (var u = location.search.slice(1), r = u.split("&"), i, t = 0; t < r.length; t++) if (i = r[t].split("="), i[0] === n) return unescape(i[1]) === "undefined" ? "" : unescape(i[1]);
    return ""
}

/**
 * @deprecated
 * @param url
 * @param key
 * @param value
 * @returns {string}
 */
function changeUrlParam(url, key, value) {
    var reg = new RegExp("(^|)" + key + "=([^&]*)(|$)"),
        tmp = key + "=" + value;
    return url.match(reg) != null ? url.replace(eval(reg), tmp) : url.match("[?]") ? url + "&" + tmp : url + "?" + tmp
}

/**
 * 替换指定传入参数的值,paramName为参数,replaceWith为新值
 *
 * @param key
 * @param replaceValue
 * @returns {*}
 */
var replaceUrlParam = function (key, replaceValue) {
    var url = this.location.href.toString();
    var replace = eval('/(' + key + '=)([^&]*)/gi');
    url = url.replace(replace, key + '=' + replaceValue);

    // this.location = url;
    return url;
};

/**
 * @deprecated
 * @returns {string}
 */
function getBrowserName() {
    var n = navigator.userAgent,
        t = n.indexOf("Opera") > -1;
    return t
        ? "Opera"
        : n.indexOf("Firefox") > -1 ? "FF"
            : n.indexOf("Chrome") > -1
                ? window.navigator.webkitPersistentStorage === undefined
                    ? "Edge"
                    : window.navigator.webkitPersistentStorage.toString().indexOf("DeprecatedStorageQuota") > -1
                        ? "Chrome"
                        : "360"
                : n.indexOf("Safari") > -1
                    ? "Safari"
                    : n.indexOf("compatible") > -1 && n.indexOf("MSIE") > -1 && !t
                        ? "IE"
                        : void 0;
}

/**
 * 加入收藏
 *
 * @deprecated
 * @param Id
 * @constructor
 */
function AddCollect(Id) {
    var selected = $(".focus-out").hasClass("active");
    if (selected) {
        $.post('/User/Home/DelCol', {Id: Id}, function (data) {
            if (data.type === 1) {
                mui.toast("已取消收藏！");
                $(".focus-out").removeClass("active");
            } else {
                mui.toast(data.message);
            }
        }, 'json')
    } else {
        $.post('/User/Home/AddCol', {Id: Id}, function (data) {
            if (data.type === 1) {
                mui.toast("成功加入收藏！");
                if ($(".focus-out")) {
                    $(".focus-out").addClass("active");
                }
            } else if (data.type === 9) {
                var btnArray = ['我再想想', '立刻登录'];
                mui.confirm('加入收藏前请先登录', '提示', btnArray, function (e) {
                    if (e.index === 1) {
                        location.href = data.message;
                    }
                })
            } else {
                mui.toast(data.message);
            }
        }, 'json')
    }
}

/**
 * 获取购物车数量
 *
 * @deprecated
 */
function getCartNum() {
    $.get('/market.php/cart/getCartNum', {}, function (data) {
        if ($("#cartNum").length !== 0) {
            if (data === 0) {
                $("#cartNum").html('');
            } else {
                $("#cartNum").html('<span class="mui-badge">' + data + '</span>');
            }
        } else {
            $("#carNum").html(data)
        }
    });
}

/**
 切换桌面背景 * 随机数函数

 * @deprecated
 * @param Min
 * @param Max
 * @returns {*}
 * @constructor
 */
function RandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return Min + Math.round(Rand * Range);
}

/**
 * @deprecated
 */
function wallpaper() {
    //16进制
    // document.body.style.background="#"+ RandomNum(0,999999);
    //rgb模式
    // document.body.style.background=RandomNum(0,255)+","+RandomNum(0,255)+","+RandomNum(0,255);

    var cor = RandomNum(0, 255) + "," + RandomNum(0, 255) + "," + RandomNum(0, 255);
    document.body.style.background = "rgb(" + cor + ")";
}

// 定时切换背景
// setInterval(wallpaper,1000);

//遍历对象 // gets(window);

gets = function (object) {
    for (var i in object) {
        document.write(object + "(" + i + "):" + object[i] + "<br>");
    }
};

/**
 * 桌面提醒功能
 *
 * @param icon
 * @param title
 * @param content
 */
function notify(icon, title, content) {
    console.info("Icon:" + icon + " Title:" + title + " Content:" + content);
    if (!title && !content) {
        title = "桌面提醒";
        content = "您看到此条信息桌面提醒设置成功";
    }
    if (!icon) {
        var iconUrl = images + "cloud/send_tips.gif";
    } else {
        var iconUrl = icon;
    }
    if (window.webkitNotifications) {
        //chrome老版本
        if (window.webkitNotifications.checkPermission() === 0) {
            var notif = window.webkitNotifications.createNotification(iconUrl, title, content);
            notif.display = function () {
            };
            notif.onerror = function () {
            };
            notif.onclose = function () {
            };
            notif.onclick = function () {
                this.cancel();
            };
            notif.replaceId = 'Meteoric';
            notif.show();
        } else {
            window.webkitNotifications.requestPermission($jy.notify);
        }
    } else if ("Notification" in window) {
        // 判断是否有权限
        if (Notification.permission === "granted") {
            var notification = new Notification(title, {
                "icon": iconUrl,
                "body": content,
            });
        } else if (Notification.permission !== 'denied') { //如果没权限，则请求权限
            Notification.requestPermission(function (permission) {
                // Whatever the user answers, we make sure we store the information
                if (!('permission' in Notification)) {
                    Notification.permission = permission;
                }
                //如果接受请求
                if (permission === "granted") {
                    var notification = new Notification(title, {
                        "icon": iconUrl,
                        "body": content,
                    });
                }
            });
        }
    } else {
        console.error("Notifications Error");
    }
}

function downloadFile(fileName, content) {
    var aLink = document.createElement('a');
    var blob = new Blob([content]);
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错, 感谢 Barret Lee 的反馈
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.dispatchEvent(evt);
}

function DownURL(strRemoteURL, strLocalURL) {
    try {
        var xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
        xmlHTTP.open("Get", strRemoteURL, false);
        xmlHTTP.send();
        var adodbStream = new ActiveXObject("ADODB.Stream");
        adodbStream.Type = 1;//1=adTypeBinary
        adodbStream.Open();
        adodbStream.write(xmlHTTP.responseBody);
        adodbStream.SaveToFile(strLocalURL, 2);
        adodbStream.Close();
        adodbStream = null;
        xmlHTTP = null;
    } catch (e) {
        window.confirm("下载URL出错!");
    }
    //window.confirm("下载完成.");
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }

    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }

    return date.getFullYear() + seperator1 + month + seperator1 + strDate + " " +
        // date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
        date.getHours() + seperator2 + date.getMinutes();

}

function timestampToTime(timestamp) {
    // var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
}

/*
 //引用示例部分
 //(1)创建xml格式或者从后台拿到对应的xml格式
var originalXml = '<?xml version="1.0"?> <note> <to>Tove</to> <from>Jani</from> <heading>Reminder</heading> <body>Dont forget me this weekend!</body> </note>';
 //(2)调用formatXml函数,将xml格式进行格式化
var resultXml = formatXml(originalXml);
 //(3)将格式化好后的formatXml写入页面中
document.getElementById("writePlace").innerHTML = '<pre>' +resultXml + '<pre/>';
*/

//格式化代码函数,已经用原生方式写好了不需要改动,直接引用就好
String.prototype.removeLineEnd = function () {
    return this.replace(/(<.+?\s+?)(?:\n\s*?(.+?=".*?"))/g, '$1 $2')
};

function formatXml(text) {
    //去掉多余的空格
    text = '\n' + text.replace(/(<\w+)(\s.*?>)/g, function ($0, name, props) {
        return name + ' ' + props.replace(/\s+(\w+=)/g, " $1");
    }).replace(/>\s*?</g, ">\n<");

    //把注释编码
    text = text.replace(/\n/g, '\r').replace(/<!--(.+?)-->/g, function ($0, text) {
        return '<!--' + escape(text) + '-->';
    }).replace(/\r/g, '\n');

    //调整格式
    var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/mg;
    var nodeStack = [];
    var output = text.replace(rgx, function ($0, all, name, isBegin, isCloseFull1, isCloseFull2, isFull1, isFull2) {
        var isClosed = (isCloseFull1 === '/') || (isCloseFull2 === '/') || (isFull1 === '/') || (isFull2 === '/');
        //alert([all,isClosed].join('='));
        var prefix = '';
        if (isBegin === '!') {
            prefix = getPrefix(nodeStack.length);
        } else {
            if (isBegin !== '/') {
                prefix = getPrefix(nodeStack.length);
                if (!isClosed) {
                    nodeStack.push(name);
                }
            } else {
                nodeStack.pop();
                prefix = getPrefix(nodeStack.length);
            }
        }
        return '\n' + prefix + all;
    });

    var prefixSpace = -1;
    var outputText = output.substring(1);
    //alert(outputText);

    //把注释还原并解码，调格式
    outputText = outputText.replace(/\n/g, '\r').replace(/(\s*)<!--(.+?)-->/g, function ($0, prefix, text) {
        //alert(['[',prefix,']=',prefix.length].join(''));
        if (prefix.charAt(0) === '\r') {
            prefix = prefix.substring(1);
        }
        text = unescape(text).replace(/\r/g, '\n');
        return '\n' + prefix + '<!--' + text.replace(/^\s*/mg, prefix) + '-->';
    });

    return outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
}


function getPrefix(prefixIndex) {
    var span = '    ';
    var output = [];
    for (var i = 0; i < prefixIndex; ++i) {
        output.push(span);
    }
    return output.join('');
}


/******************** Mark ajax Start ********************/
/**
 注释：

 1. open(method, url, async) 方法需要三个参数:
 　 method：发送请求所使用的方法（GET或POST）；与POST相比，GET更简单也更快，并且在大部分情况下都能用；然而，在以下情况中，请使用POST请求：

 无法使用缓存文件（更新服务器上的文件或数据库）
 向服务器发送大量数据（POST 没有数据量限制）
 发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠
 　url：规定服务器端脚本的 URL(该文件可以是任何类型的文件，比如 .txt 和 .xml，或者服务器脚本文件，比如 .asp 和 .php （在传回响应之前，能够在服务器上执行任务）)；

 　async：规定应当对请求进行异步（true）或同步（false）处理；true是在等待服务器响应时执行其他脚本，当响应就绪后对响应进行处理；false是等待服务器响应再执行。

 2. send() 方法可将请求送往服务器。

 3. onreadystatechange：存有处理服务器响应的函数，每当 readyState 改变时，onreadystatechange 函数就会被执行。

 4. readyState：存有服务器响应的状态信息。

 0: 请求未初始化（代理被创建，但尚未调用 open() 方法）
 1: 服务器连接已建立（open方法已经被调用）
 2: 请求已接收（send方法已经被调用，并且头部和状态已经可获得）
 3: 请求处理中（下载中，responseText 属性已经包含部分数据）
 4: 请求已完成，且响应已就绪（下载操作已完成）
 5. responseText：获得字符串形式的响应数据。

 6. setRequestHeader()：POST传数据时，用来添加 HTTP 头，然后send(data)，注意data格式；GET发送信息时直接加参数到url上就可以，比如url?a=a1&b=b1。

 PS：Fetch polyfill 的基本原理是探测是否存在window.fetch方法，如果没有则用 XHR 实现
 */

/*
var Ajax={
 get: function(url, fn) {
  // XMLHttpRequest对象用于在后台与服务器交换数据
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
   // readyState == 4说明请求已完成
   if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
   // 从服务器获得数据
    fn.call(this, xhr.responseText);
   }
  };
  xhr.send();
 },
 // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
 post: function (url, data, fn) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  // 添加http头，发送信息至服务器时内容编码类型
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
   if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
    fn.call(this, xhr.responseText);
   }
  };
  xhr.send(data);
 }
};

Ajax.get("http://club.nyhbqc.com/console.php/analytics/receiver");
*/

function ajax() {
    var ajaxData = {
        type: arguments[0].type || "GET",
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "text",
        contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend: arguments[0].beforeSend || function () {
        },
        success: arguments[0].success || function () {
        },
        error: arguments[0].error || function () {
        }
    };

    ajaxData.beforeSend();
    var xhr = createxmlHttpRequest();
    xhr.responseType = ajaxData.dataType;
    xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
    xhr.setRequestHeader("Content-Type", ajaxData.contentType);
    xhr.send(convertData(ajaxData.data));
    xhr.onreadystatechange = function () {
        console.info();
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                ajaxData.success(xhr.response)
            } else {
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data) {
    if (typeof data === 'object') {
        var convertResult = "";
        for (var c in data) {
            convertResult += c + "=" + data[c] + "&";
        }
        convertResult = convertResult.substring(0, convertResult.length - 1);
        return convertResult;
    } else {
        return data;
    }
}

/*
ajax({
 type:"POST",
 url:"https://analytics.tianfu.ink/console.php/analytics/receiver",
 dataType:"json",
 data:{
  "val1":"abc",
  "val2":123,
  "val3":"456"
 },
 beforeSend:function(){
  //some js code
 },
 success:function(msg){
  console.log(msg)
 },
 error:function(){
  console.log("error");
 }
});
*/

/******************** Mark ajax End ********************/
