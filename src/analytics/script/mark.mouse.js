!function () {
    "use strict";

    function mouse(event) {
        // 1、获取用户鼠标在网页中的运行轨迹：包括：移动，滑动，点击等事件。
        // 2、记录当前页面信息
        // 3、复现场景
    }

    $(document).ready(function () {

        var gesture = {};
        var total_point = 0;
        var number_column = 3;
        var number_row = 3;
        var bounds_x = [];
        var bounds_y = [];

        function getTotalHeight() {
            if (!$.support.leadingWhitespace) {
                // if ($.browser.msie) {
                return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
            } else {
                return self.innerHeight;
            }
        }

        function getTotalWidth() {
            if (!$.support.leadingWhitespace) {
                // if ($.browser.msie) {
                return document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth;
            } else {
                return self.innerWidth;
            }
        }


        function get_pointer(e) {
            var xx = e.originalEvent.x || e.originalEvent.layerX || 0;
            var yy = e.originalEvent.y || e.originalEvent.layerY || 0;
            var x_sequens = "";
            for (var i = 0; i < number_column - 1; i++) {
                if (xx > bounds_x[i]) {
                    x_sequens += "1";
                } else {
                    x_sequens += "0";
                }
            }

            var y_sequens = "";
            for (var i = 0; i < number_row - 1; i++) {
                if (yy > bounds_y[i]) {
                    y_sequens += "1";
                } else {
                    y_sequens += "0";
                }
            }
            //console.log(x_sequens+y_sequens);
            //判断序列结果是否为上一次相同，不相同就记录下来，相同不记录
            if (total_point == 0 || gesture[total_point - 1] != x_sequens + y_sequens) {
                //console.log("impossible");
                //console.log(gesture[total_point-1]);
                //console.log(x_sequens+y_sequens);
                gesture[total_point] = x_sequens + y_sequens;
                total_point++;
            }

            //console.log(total_point);
        }

        function get_pointer_start() {

            //全局变量初始化
            gesture = {};
            total_point = 0;
            bounds_x = [];
            bounds_y = [];

            //取得当前窗口的大小
            var do_width = getTotalWidth();
            var do_height = getTotalHeight();
            var unit_width = do_width / number_column;
            for (var i = 0; i < number_column; i++) {
                bounds_x[i] = (i + 1) * unit_width;
            }
            var unit_height = do_height / number_row;
            for (var i = 0; i < number_row; i++) {
                bounds_y[i] = (i + 1) * unit_height;
            }
            //采集数据
            $(document).mousemove(get_pointer);
        }

        $(document).mousedown(get_pointer_start);
        $(document).mouseup(function () {
            $(this).unbind("mousemove", get_pointer);

            if (total_point <= 3) {

                return;
            }

            //计算最终结果
            var result = "";
            for (var i = 0; i < total_point; i++) {
                if (i == 0) {
                    result = gesture[i];
                } else {
                    result = result + "-" + gesture[i];
                }
            }
            //输出结果
            console.log(result);
        });

    });
}();