/**
 * 基于百度图表的数据绑定
 * https://echarts.baidu.com
 */
$(function () {
    var Mark = Mark || {};
    Mark.Chart = Mark.Chart || function () {
    };

    /**
     * 1、检测百度echarts是否加载，未加载则加载，
     */
    if (typeof (echarts) == "undefined") {
        console.info("echarts is not load");
        new_element = document.createElement("script");
        new_element.setAttribute("type", "text/javascript");
        new_element.setAttribute("charset", "utf-8");
        new_element.setAttribute("src", "https://res.tianfu.pub/echarts/script/echarts.min.js");
        var first = document.getElementsByTagName("script")[0];
        first.parentNode.insertBefore(new_element, first);
    }

    /**
     * 3、构建图表
     * @param that
     */
    Mark.Chart.buildChart = function (that) {
        if (!isEmpty($(that).data("url"))) {
            var startTime = new Date().getTime();

            var chart = echarts.init(that);
            // 开启 loading 效果
            chart.showLoading();

            $.get($(that).data("url"), function (json) {
                try {
                    // 隐藏 loading 效果
                    chart.hideLoading();
                    chart.setOption(json);
                } catch (e) {
                    console.info("<==================== Console Json Start ====================>");
                    console.info(formatJson(json));
                    console.info("<==================== Console Json End ====================> RunTime:", (new Date().getTime() - startTime));
                    console.error("图表构建异常：", "Message:" + e.message, "Description:" + e.description, "Number:" + e.number, "Name:" + e.name);
                }
            });
        }
    };
    /**
     * 3、构建图表视图
     *
     * @param container
     * @param json
     */
    Mark.Chart.buildChartView = function (container, json) {
        var chart = echarts.init(container);
        // 开启 loading 效果
        chart.showLoading();

        try {
            // 隐藏 loading 效果
            chart.hideLoading();
            chart.setOption(json);
        } catch (e) {
            console.error("图表构建异常：", "Message:" + e.message, "Description:" + e.description, "Number:" + e.number, "Name:" + e.name);
        }
    };
    /**
     * 获取缓存数据
     *
     * @param container
     */
    Mark.Chart.getCache = function (container) {
        var that = this;
        if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
            // var json = window.localStorage.getItem(window.btoa($(container).data("url")));
            var json = null;
            if (!isEmpty($(container).data("token"))) {
                json = window.localStorage.getItem($(container).data("token"));
            } else {
                json = window.localStorage.getItem(window.btoa($(container).data("url").parseURL().host + $(container).data("url").parseURL().path));
            }
            if (!isEmpty(json)) {
                // Mark.Chart.buildChartView(container, JSON.parse(json));
                Mark.Chart.buildChartView(container, JSON.parse(json));
            } else {
                // console.debug("Mark_collapse.js component not used Window.localStorage cache");
                Mark.Chart.getData(container);
            }
        } else {
            // console.debug("Mark_collapse.Js getCache() This device not support localStorage");
            Mark.Chart.getData(container);
        }
    }

    Mark.Chart.getData = function (container) {
        if (!isEmpty($(container).data("url"))) {
            $.get($(container).data("url"), function (json) {
                if ($(container).data("debug")) {
                    console.info("<========== Console Json Start ==========>");
                    console.info(formatJson(json));
                    console.info("<========== Console Json End ==========>");
                }
                Mark.Chart.buildChartView(container, json);
            });
        }
    }


    /**
     * 根据传递进的Option名称，返回相应的选项，以供｛echartsNode.setOption(eval($(that).data("chart")));｝调用
     *
     */
    Mark.Chart.buildOption = {};

    /**
     * 2、加载完成后，遍历节点（自定义属性），并加载相应的图表
     *
     */
    $(document).find("[data-type='chart']").each(function (index, element) {
        // Mark.Chart.buildChart(element);

        if (is_bool($(element).data("cache"))) {
            Mark.Chart.getCache(element);
        } else {
            Mark.Chart.getData(element);
        }

    });

});