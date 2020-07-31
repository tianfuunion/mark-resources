/**
 * 基于百度图表的数据绑定
 * https://echarts.baidu.com
 */
$(function () {
    var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function () {
        $.AMUI.fullscreen.toggle();
    });

    $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function () {
        $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
    });


    /**
     * 1、检测百度echarts是否加载，未加载则加载，
     * 2、加载完成后，遍历节点（自定义属性），并加载相应的图表
     */

    var chartNode = $("body").find("[data-type='chart']");

    for (key in chartNode) {
        var data_chart = key.attr("data-chart");
        var data_url = key.attr("data-url");
        chartsData[data_chart];
    }

    var dataType = $('body').attr('data-type');
    for (key in pageData) {
        if (key == dataType) {
            pageData[key];
        }
    }

    $('.tpl-switch').find('.tpl-switch-btn-view').on('click', function () {
        $(this).prev('.tpl-switch-btn').prop("checked", function () {
            if ($(this).is(':checked')) {
                return false
            } else {
                return true
            }
        });
        // console.log('123123123')
    });
});

var chartsData = {

    /*======================= 图表页 =======================*/
    'MixedLineBar': function chartData() {
        /* ==========百度图表A http://echarts.baidu.com/==========*/
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
                }],
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
                }]
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
         * http://club.nyhbqc.com/console.php/analytics/dashboard
         * 用户分析图表
         *
         */
        echartsB.setOption(optionB);
        var echartsA = echarts.init(document.getElementById('tpl-echarts-A'));
        $.get("/console.php/analytics/getChart", function (result) {
            // console.info("Type" + gettype(result) + " JsonType:"+gettype(JSON.stringify(result))+" Json:" +JSON.stringify(result));
            var chart = $.parseJSON(result);
            // console.info("<==================== Console Json Start ====================>" + "Type:" + gettype(result));
            // var resultJson = formatJson(result);
            // console.info(resultJson);
            // console.info("<==================== Console Json End ====================>");

            option = {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: ['会员', '商户', '用户']
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
                    name: '会员',
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
                        name: '用户',
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
};