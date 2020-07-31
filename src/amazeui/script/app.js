$(function () {
    /*
        var $fullText = $('.admin-fullText');
        $('#admin-fullscreen').on('click', function() {
            $.AMUI.fullscreen.toggle();
        });

        $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
            $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
        });
    */

    var dataType = $('body').attr('data-type');
    if (dataType != '') {
        for (key in pageData) {
            if (key == dataType) {
                // pageData[key]();
            }
        }
    }

    $('.tpl-switch').find('.tpl-switch-btn-view').on('click', function () {
        $(this).prev('.tpl-switch-btn').prop("checked", function () {
            return !$(this).is(':checked');
        });
        // console.log('123123123')
    });
});

/* =================== 侧边导航下拉列表 ===============*/

$('.tpl-left-nav-link-list').on('click', function () {
    $(this).siblings('.tpl-left-nav-sub-menu')
        .slideToggle(80)
        .end()
        .find('.tpl-left-nav-more-ico')
        .toggleClass('tpl-left-nav-more-ico-rotate');
});

/*=================== 头部导航隐藏菜单 =============*/

$('.tpl-header-nav-hover-ico').on('click', function () {
    $('.tpl-left-nav').toggle();
    $('.tpl-content-wrapper').toggleClass('tpl-content-wrapper-hover');
});


// 页面数据
var pageData = {
    // ===============================================
    // 首页
    // ===============================================
    'index': function indexData() {
        var myScroll = new IScroll('#wrapper', {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            preventDefault: false,
            fadeScrollbars: true
        });

        var myScrollA = new IScroll('#wrapperA', {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            preventDefault: false,
            fadeScrollbars: true
        });

        var myScrollB = new IScroll('#wrapperB', {
            scrollbars: true,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            preventDefault: false,
            fadeScrollbars: true
        });

        // document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
        // ==========================
        // 百度图表A http://echarts.baidu.com/
        // ==========================

        var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
        $.get("/console.php/analytics/getChart", function (result) {
            // console.info("Type" + gettype(result) + " JsonType:"+gettype(JSON.stringify(result))+" Json:" +JSON.stringify(result));
            var chart = $.parseJSON(result);

            option = {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['用户', '商户', '会员']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    data: [chart['category']['day'][6], chart['category']['day'][5], chart['category']['day'][4], chart['category']['day'][3], chart['category']['day'][2], chart['category']['day'][1], chart['category']['day'][0]]
                }],

                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '用户',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [chart['user'][6], chart['user'][5], chart['user'][4], chart['user'][3], chart['user'][2], chart['user'][1], chart['user'][0]],
                    itemStyle: {
                        normal: {
                            color: '#59aea2'
                        },
                        emphasis: {}
                    }
                },
                    {
                        name: '商户',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data: [chart['merchant'][6], chart['merchant'][5], chart['merchant'][4], chart['merchant'][3], chart['merchant'][2], chart['merchant'][1], chart['merchant'][0]],
                        itemStyle: {
                            normal: {
                                color: '#e7505a'
                            }
                        }
                    },
                    {
                        name: '会员',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data: [chart['vip'][6], chart['vip'][5], chart['vip'][4], chart['vip'][3], chart['vip'][2], chart['vip'][1], chart['vip'][0]],
                        itemStyle: {
                            normal: {
                                color: '#32c5d2'
                            }
                        }
                    }
                ]
            };
            echartsA.setOption(option);
        });
    },

    /*======================= 图表页 =======================*/
    'chart': function chartData() {
        //========== 百度图表A http://echarts.baidu.com/ ==========

        var echartsC = echarts.init(document.getElementById('tpl-echarts-C'));

        optionC = {
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                top: '0',
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['访客', '设备', '页面']
            },
            xAxis: [{
                type: 'category',
                data: ['1点', '2点', '3点', '4点', '5点', '6点', '7点', '8点', '9点', '10点', '11点', '12点']
            }],
            yAxis: [{
                type: 'value',
                name: '水量',
                min: 0,
                max: 250,
                interval: 50,
                axisLabel: {
                    formatter: '{value} ml'
                }
            },
                {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                }
            ],
            series: [{
                name: '访客',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
                {
                    name: '设备',
                    type: 'bar',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                },
                {
                    name: '页面',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
                }
            ]
        };

        echartsC.setOption(optionC);

        var echartsB = echarts.init(document.getElementById('tpl-echarts-B'));
        optionB = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                x: 'center',
                data: ['某软件', '某主食手机', '某水果手机', '降水量', '蒸发量']
            },
            radar: [{
                indicator: [
                    {text: '品牌', max: 100},
                    {text: '内容', max: 100},
                    {text: '可用性', max: 100},
                    {text: '功能', max: 100}
                ],
                center: ['25%', '40%'],
                radius: 80
            },
                {
                    indicator: [
                        {text: '外观', max: 100},
                        {text: '拍照', max: 100},
                        {text: '系统', max: 100},
                        {text: '性能', max: 100},
                        {text: '屏幕', max: 100}
                    ],
                    radius: 80,
                    center: ['50%', '60%'],
                },
                {
                    indicator: (function () {
                        var res = [];
                        for (var i = 1; i <= 12; i++) {
                            res.push({text: i + '月', max: 100});
                        }
                        return res;
                    })(),
                    center: ['75%', '40%'],
                    radius: 80
                }
            ],
            series: [{
                type: 'radar',
                tooltip: {
                    trigger: 'item'
                },
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: [{
                    value: [60, 73, 85, 40],
                    name: '某软件'
                }]
            },
                {
                    type: 'radar',
                    radarIndex: 1,
                    data: [{
                        value: [85, 90, 90, 95, 95],
                        name: '某主食手机'
                    },
                        {
                            value: [95, 80, 95, 90, 93],
                            name: '某水果手机'
                        }
                    ]
                },
                {
                    type: 'radar',
                    radarIndex: 2,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: [{
                        name: '降水量',
                        value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                    },
                        {
                            name: '蒸发量',
                            value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
                        }
                    ]
                }
            ]
        };

        /**
         * /console.php/analytics/dashboard
         * 用户分析图表
         *
         */
        echartsB.setOption(optionB);
        var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
        $.get("/console.php/analytics/getChart", function (result) {
            // console.info("Type" + gettype(result) + " JsonType:"+gettype(JSON.stringify(result))+" Json:" +JSON.stringify(result));
            var chart = $.parseJSON(result);
            /*
               console.info("<==================== Console Json Start ====================>" + "Type:" + gettype(result));
               var resultJson = formatJson(result);
               console.info(resultJson);
               console.info("<==================== Console Json End ====================>");
            */
            option = {

                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['用户', '商户', '会员']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: true,
                    data: [chart['category']['day'][6], chart['category']['day'][5], chart['category']['day'][4], chart['category']['day'][3], chart['category']['day'][2], chart['category']['day'][1], chart['category']['day'][0]]
                }],

                yAxis: [{
                    type: 'value'
                }],
                series: [{
                    name: '用户',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data: [chart['user'][6], chart['user'][5], chart['user'][4], chart['user'][3], chart['user'][2], chart['user'][1], chart['user'][0]],
                    itemStyle: {
                        normal: {
                            color: '#59aea2'
                        },
                        emphasis: {}
                    }
                },
                    {
                        name: '商户',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data: [chart['store'][6], chart['store'][5], chart['store'][4], chart['store'][3], chart['store'][2], chart['store'][1], chart['store'][0]],
                        itemStyle: {
                            normal: {
                                color: '#e7505a'
                            }
                        }
                    },
                    {
                        name: '会员',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {normal: {}},
                        data: [chart['vip'][6], chart['vip'][5], chart['vip'][4], chart['vip'][3], chart['vip'][2], chart['vip'][1], chart['vip'][0]],
                        itemStyle: {
                            normal: {
                                color: '#32c5d2'
                            }
                        }
                    }
                ]
            };
            echartsA.setOption(option);


        });
    }
};

/* =================== Amazeui App 2 ===============*/
!function ($) {
    "use strict";

    var Sidemenu = function () {
        this.$body = $("body"),
            this.$openLeftBtn = $(".open-left"),
            this.$menuItem = $("#sidebar-menu a")
    };
    Sidemenu.prototype.openLeftBar = function () {
        $("#wrapper").toggleClass("enlarged");
        $("#wrapper").addClass("forced");

        if ($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
            $("body").removeClass("fixed-left").addClass("fixed-left-void");
        } else if (!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
            $("body").removeClass("fixed-left-void").addClass("fixed-left");
        }

        if ($("#wrapper").hasClass("enlarged")) {
            $(".left ul").removeAttr("style");
        } else {
            $(".subdrop").siblings("ul:first").show();
        }

        toggle_slimscroll(".slimscrollleft");
        $("body").trigger("resize");
    },
        //menu item click
        Sidemenu.prototype.menuItemClick = function (e) {
            if (!$("#wrapper").hasClass("enlarged")) {
                if ($(this).parent().hasClass("has_sub")) {

                }
                if (!$(this).hasClass("subdrop")) {
                    // hide any open menus and remove all other classes
                    $("ul", $(this).parents("ul:first")).slideUp(350);
                    $("a", $(this).parents("ul:first")).removeClass("subdrop");
                    $("#sidebar-menu .pull-right i").removeClass("md-remove").addClass("md-add");

                    // open our new menu and add the open class
                    $(this).next("ul").slideDown(350);
                    $(this).addClass("subdrop");
                    $(".pull-right i", $(this).parents(".has_sub:last")).removeClass("md-add").addClass("md-remove");
                    $(".pull-right i", $(this).siblings("ul")).removeClass("md-remove").addClass("md-add");
                } else if ($(this).hasClass("subdrop")) {
                    $(this).removeClass("subdrop");
                    $(this).next("ul").slideUp(350);
                    $(".pull-right i", $(this).parent()).removeClass("md-remove").addClass("md-add");
                }
            }
        },

        //init sidemenu
        Sidemenu.prototype.init = function () {
            var $this = this;

            var ua = navigator.userAgent,
                event = (ua.match(/iP/i)) ? "touchstart" : "click";

            //bind on click
            this.$openLeftBtn.on(event, function (e) {
                e.stopPropagation();
                $this.openLeftBar();
            });

            // LEFT SIDE MAIN NAVIGATION
            $this.$menuItem.on(event, $this.menuItemClick);

            // NAVIGATION HIGHLIGHT & OPEN PARENT
            $("#sidebar-menu ul li.has_sub a.active").parents("li:last").children("a:first").addClass("active").trigger("click");
        },

        //init Sidemenu
        $.Sidemenu = new Sidemenu, $.Sidemenu.Constructor = Sidemenu

}(window.jQuery),

    function ($) {
        "use strict";

        var FullScreen = function () {
            this.$body = $("body"),
                this.$fullscreenBtn = $("#btn-fullscreen")
        };

        // turn on full screen
        // Thanks to http://davidwalsh.name/fullscreen
        FullScreen.prototype.launchFullscreen = function (element) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        },
            FullScreen.prototype.exitFullscreen = function () {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            },
            //toggle screen
            FullScreen.prototype.toggle_fullscreen = function () {
                var $this = this;
                var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
                if (fullscreenEnabled) {
                    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
                        $this.launchFullscreen(document.documentElement);
                    } else {
                        $this.exitFullscreen();
                    }
                }
            },
            //init sidemenu
            FullScreen.prototype.init = function () {
                var $this = this;
                //bind
                $this.$fullscreenBtn.on('click', function () {
                    $this.toggle_fullscreen();
                });
            },
            //init FullScreen
            $.FullScreen = new FullScreen, $.FullScreen.Constructor = FullScreen

    }(window.jQuery),

// main app module
    function ($) {
        "use strict";

        var App = function () {
            this.VERSION = "1.3.0",
                this.AUTHOR = "Coderthemes",
                this.SUPPORT = "coderthemes@gmail.com",
                this.pageScrollElement = "html, body",
                this.$body = $("body")
        };

        //on doc load
        App.prototype.onDocReady = function (e) {
            // FastClick.attach(document.body);
            // resizefunc.push("initscrolls");
            // resizefunc.push("changeptype");

            $('.animate-number').each(function () {
                $(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-duration")));
            });

            //RUN RESIZE ITEMS
            // $(window).resize(debounce(resizeitems, 100));
            $("body").trigger("resize");

            // right side-bar toggle
            $('.right-bar-toggle').on('click', function (e) {

                $('#wrapper').toggleClass('right-bar-enabled');
            });


        },
            //initilizing
            App.prototype.init = function () {
                var $this = this;
                //document load initialization
                $(document).ready($this.onDocReady);
                //init side bar - left
                $.Sidemenu.init();
                //init fullscreen
                $.FullScreen.init();
            },

            $.App = new App, $.App.Constructor = App

    }(window.jQuery),

//initializing main application module
    function ($) {
        "use strict";
        $.App.init();
    }(window.jQuery);

/* ------------ some utility functions ----------------------- */
//this full screen
var toggle_fullscreen = function () {

};

function executeFunctionByName(functionName, context /*, args */) {
    var args = [].slice.call(arguments).splice(2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(this, args);
}

var w, h, dw, dh;
var changeptype = function () {
    w = $(window).width();
    h = $(window).height();
    dw = $(document).width();
    dh = $(document).height();

    if (jQuery.browser.mobile === true) {
        $("body").addClass("mobile").removeClass("fixed-left");
    }

    if (!$("#wrapper").hasClass("forced")) {
        if (w > 990) {
            $("body").removeClass("smallscreen").addClass("widescreen");
            $("#wrapper").removeClass("enlarged");
        } else {
            $("body").removeClass("widescreen").addClass("smallscreen");
            $("#wrapper").addClass("enlarged");
            $(".left ul").removeAttr("style");
        }
        if ($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
            $("body").removeClass("fixed-left").addClass("fixed-left-void");
        } else if (!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
            $("body").removeClass("fixed-left-void").addClass("fixed-left");
        }

    }
    toggle_slimscroll(".slimscrollleft");
};

var debounce = function (func, wait, immediate) {
    var timeout, result;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
};

/*
function resizeitems() {
    if ($.isArray(resizefunc)) {
        for (i = 0; i < resizefunc.length; i++) {
            window[resizefunc[i]]();
        }
    }
}
*/
function initscrolls() {
    if (jQuery.browser.mobile !== true) {
        //SLIM SCROLL
        $('.slimscroller').slimscroll({
            height: 'auto',
            size: "5px"
        });

        $('.slimscrollleft').slimScroll({
            height: 'auto',
            position: 'right',
            size: "5px",
            color: '#dcdcdc',
            wheelStep: 5
        });
    }
}

function toggle_slimscroll(item) {
    if ($("#wrapper").hasClass("enlarged")) {
        $(item).css("overflow", "inherit").parent().css("overflow", "inherit");
        $(item).siblings(".slimScrollBar").css("visibility", "hidden");
    } else {
        $(item).css("overflow", "hidden").parent().css("overflow", "hidden");
        $(item).siblings(".slimScrollBar").css("visibility", "visible");
    }
}