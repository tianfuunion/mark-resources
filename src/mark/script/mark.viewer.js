/**==================== Mark Viewer Start ====================
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

    $.viewer = function () {
        console.debug("Mark.Viewer.js");
    };


    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };
    String.prototype.ltrim = function () {
        return this.replace(/(^\s*)/g, "");
    };
    String.prototype.rtrim = function () {
        return this.replace(/(\s*$)/g, "");
    };
    String.prototype.trimAll = function () {
        return this.replace(/\s+/g, "");
    };
    // TODO:有待测试，并与其它库之间的兼容性，避免名称冲突
    // JS的各种数据类型，均要兼容
    Object.prototype.isEmpty = function () {

    };
    String.prototype.isEmpty = function () {
        return this.toString().trim().length === 0 || this.toString().trim() === null;
    };

    var type = function () {

        // var a = "";
        // var a = " ";
        // var a = null;
        // var a = undefined;
        // var a = [];
        // var a = {};
        var a = NaN;

        if (a === undefined) { // 只能用 === 运算来测试某个值是否是未定义的
            console.log("为undefined");
        }

        if (a == null) { // 等同于 a === undefined || a === null
            console.log("为null");
        }


        // String
        if (a == "" || a == null || a == undefined) { // "",null,undefined
            console.log("为空");
        }
        if (!a) { // "",null,undefined,NaN
            console.log("为空");
        }
        if (!$.trim(a)) { // "",null,undefined
            console.log("为空");
        }

        // Array
        if (a.length == 0) { // "",[]
            console.log("为空");
        }
        if (!a.length) { // "",[]
            console.log("为空");
        }

        // Object {}
        if ($.isEmptyObject(a)) { // 普通对象使用 for...in 判断，有 key 即为 false
            console.log("为空");
        }
    };


    let chartList = document.querySelectorAll('.-weui-flex__item');
    // let chartList = document.querySelectorAll('.mk-chart')
//1、 获取图表容器节点
    for (let i = 0; i < chartList.length; i++) {
        //2、 遍历操作

        if (!chartList[i].getAttribute('data-defined')) {
            console.log("该容器节点尚未定义");
// 3、获取当前容器数据标示符
            if (!is_empty(chartList[i].getAttribute('data-token'))) {

            }
//3.1如果没有定义数据标示符，则使用数据url的(host,query)加密后的值。
//4、获取数据，从缓存获取数据
//4.1、缓存中没有数据则从url来源获取数据，并根据数据标示符，缓存数据。
//5、将数据渲染到容器中。
//4.3、
//4.4、

        }


    }


    document.addEventListener("DOMContentLoaded", function () {
        console.log("Mark::Viewer() DOMContentLoaded()");
        $.viewer();

    }, false);

}());

/******************** Mark Viewer End ********************/