var Mark = Mark || {};
Mark.Verify = Mark.Verify || function () {
};

!(function () {
    'use strict';

    $(function () {

    });

}());

/**==================== 文件传输精灵 Mark Engine Files Transmit（Transfer）====================**/
/*!
 * jQuery filespicker

 * @Idea

多单文件上传下载，
进度条，
传输回调，
文件校验


等操作太复杂，亟需整理一个传输组件

1、弹出式，点击按钮，弹出文件选择框，拖拽文件至选择框或者点击选择框选择文件。
2、自动或手动开始上传
3、传输过程中的传输进度
4、传输完成后，回调操作


 * @name jquery.filespicker.js
 * @version 1.3.4
 * #date 2013-12-18
 * @author ciaoca
 * @email ciaoca@gmail.com
 * @site https://github.com/ciaoca/cxSelect
 * @site http://www.jq22.com/jquery-info3238
 * @license Released under the MIT license


  $('#filespicker').filespicker({
	 url:"<{$global.system.host}>",
	 auto:"true",

	 method:"upload",

	 multiple: true,
	 required: true,


	 selector:"popup",
	 mask:"true",
	 width:"auto",
	 height:"auto",

	 progress:"true",
	 progress_callback:function(){}

 });

 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.filespicker = function (settings) {
        var obj;
        var settings = settings;
        var filespicker = {
            dom: {},
            api: {}
        };

        // 检测是否为 DOM 元素
        var isElement = function (o) {
            if (o && (typeof HTMLElement === 'function' || typeof HTMLElement === 'object') && o instanceof HTMLElement) {
                return true;
            } else {
                return !!(o && o.nodeType && o.nodeType === 1);
            }
        };

        // 检测是否为 jQuery 对象
        var isJquery = function (o) {
            return !!(o && o.length && (typeof jQuery === 'function' || typeof jQuery === 'object') && o instanceof jQuery);
        };

        // 检测是否为数组
        var isArray = function (o) {
            if (!Array.isArray) {
                return Object.prototype.toString.call(o) === "[object Array]";
            } else {
                return Array.isArray(o);
            }
        };

        // 分配参数
        for (var i = 0, l = arguments.length; i < l; i++) {
            if (isJquery(arguments[i])) {
                obj = arguments[i];
            } else if (isElement(arguments[i])) {
                obj = $(arguments[i]);
            } else if (typeof arguments[i] === 'object') {
                settings = arguments[i];
            }
        }

        if (obj.length < 1) {
            return;
        }

        filespicker.init = function () {
            var that = this;
            that.dom.box = obj;
            that.settings = $.extend({}, $.filespicker.defaults, settings, {
                data: that.dom.box.data('data'),
                nodata: that.dom.box.data('nodata'),
                required: that.dom.box.data('required'),
                firstTitle: that.dom.box.data('firstTitle'),
                firstValue: that.dom.box.data('firstValue')
            });

            // 未设置选择器组
            // if (!that.settings.selects.length) {return};

            // console.info(this);
            // console.info($(this));

            // 判断上传界面：弹出式，嵌入式，自定义
            if (that.settings.selector === "popup") {

                // that.onclick = that.dosubmit();
                $(that).on("click", function () {
                    that.dosubmit();
                });

                // that.buildContent();
            } else if (that.settings.selector === "embedded") {
                that.buildContent();
            } else if (that.settings.selector === "custom") {
                that.buildContent();
            } else {

            }


            /*
                        that.selectArray = [];
                        that.selectSum = that.settings.selects.length;

                        for (var i = 0; i < that.selectSum; i++) {
                            if (!that.dom.box.find('select.' + that.settings.selects[i])) {
                                break;
                            }else{
                                $(that.dom.box[0]).append('<select name="'+ that.settings.selects[i] +'" class="mk-select '+ that.settings.selects[i] + '"'
                                    + (that.settings.required ? ' required="true"' : "")
                                    + (that.settings.multiple ? ' multiple="true"' : "")
                                    + '></select>');
                            };

                            that.selectArray.push(that.dom.box.find('select.' + that.settings.selects[i]));
                        };

                        that.selectSum = that.selectArray.length;

                        // 设置的选择器组不存在
                        if (!that.selectSum) {return};

                        // 设置 URL，通过 Ajax 获取数据
                        if (typeof that.settings.data === 'string') {
                            $.getJSON(that.settings.data, function(json){
                                that.dataJson = json;
                                that.buildContent();
                            });

                        // 设置自定义数据
                        } else if (typeof that.settings.data === 'object') {
                            that.dataJson = that.settings.data;
                            that.buildContent();
                        };
                        */
        };

        filespicker.getIndex = function (n) {
            return (this.settings.required) ? n : n - 1;
        };

        // 获取下拉框内容
        filespicker.getNewOptions = function (elemJquery, data) {
            if (!elemJquery) {
                return;
            }

            var _title = this.settings.firstTitle;
            var _value = this.settings.firstValue;
            var _dataTitle = elemJquery.data('firstTitle');
            var _dataValue = elemJquery.data('firstValue');
            var _html = '';

            if (typeof _dataTitle === 'string' || typeof _dataTitle === 'number' || typeof _dataTitle === 'boolean') {
                _title = _dataTitle.toString();
            }

            if (typeof _dataValue === 'string' || typeof _dataValue === 'number' || typeof _dataValue === 'boolean') {
                _value = _dataValue.toString();
            }

            if (!this.settings.required) {
                _html = '<option value="' + _value + '">' + _title + '</option>';
            }

            $.each(data, function (i, v) {
                if (typeof (v.value) === 'string' || typeof (v.value) === 'number' || typeof (v.value) === 'boolean') {
                    _html += '<option value="' + v.value + '">' + v.title + '</option>';
                } else {
                    _html += '<option value="' + v.title + '">' + v.title + '</option>';
                }
            });

            return _html;
        };

        // 构建选框内容
        filespicker.buildContent = function () {
            var that = this;
            /*
                        that.dom.box.on('change', 'select', function(){
                            that.selectChange(this.className);
                        });

                        var _html = that.getNewOptions(that.selectArray[0], that.dataJson);
                        that.selectArray[0].html(_html).prop('disabled', false).removeClass("hide").trigger('change');
            */
//			that.setDefaultValue();
        };

        /******************** ********************/
        filespicker.dosubmit = function () {
            console.info("FilesPicker::dosubmit()");
            //	if (pic_front ? false : is_empty($("input[name='pic_front']").val())){
            //		$.toast("请上传行驶证主页", "text");
            //	}else if (pic_behind ? false : is_empty($("input[name='pic_behind']").val())){
            //		$.toast('请上传驾驶证副页', 'text');
            //	}else if (is_empty($('input[name="account"]').val())){
            if (is_empty($('input[name="account"]').val())) {
                $.toast("请输入联系姓名", "text");
            } else if (is_empty($('input[name="phone"]').val())) {
                $.toast("请输入联系人手机号", "text");
            } else if (is_empty($('input[name="address"]').val())) {
                $.toast("请选择当前位置", "text");

                //	}else if (is_empty($('input[name="plate_num"]').val())){
                //		$.toast("请输入车牌号", "text");
                //	}else if (is_empty($('input[name="voucher"]').val())){
                //		$.toast('请输入充值单号', 'text');
            } else {
                updata();
            }

        };
        filespicker.updata = function () {
            var startTime = new Date().getTime();
            $.showLoading("数据提交中");

            if (!is_empty($('input[name="objectid"]').val())) {
                cossupload.append("objectid", $('input[name="objectid"]').val());
                cossupload.append("index", $('.swiper-slide-active').index());
            }

            if (!is_empty($('input[name="vehicleid"]').val())) {
                cossupload.append("vehicleid", $('input[name="vehicleid"]').val());
            }

            if (!is_empty($('input[name="plate_num"]').val())) {
                cossupload.append("plate_num", $('input[name="plate_num"]').val());
            }
            if (!is_empty($('input[name="model"]').val())) {
                cossupload.append("model", $('input[name="model"]').val());
            }

            if (!is_empty($('input[name="merchantid"]').val())) {
                cossupload.append("merchantid", $('input[name="merchantid"]').val());
            }

            cossupload.append("account", $('input[name="account"]').val());
            cossupload.append("phone", $('input[name="phone"]').val());

            cossupload.append("address", $('input[name="address"]').val());
            cossupload.append("longitude", $('input[name="longitude"]').val());
            cossupload.append("latitude", $('input[name="latitude"]').val());
            cossupload.append("speed", $('input[name="speed"]').val());
            cossupload.append("accuracy", $('input[name="accuracy"]').val());

            cossupload.append("province", $('input[name="province"]').val());
            cossupload.append("district", $('input[name="district"]').val());
            cossupload.append("city", $('input[name="city"]').val());
            cossupload.append("street", $('input[name="street"]').val());
            cossupload.append("township", $('input[name="township"]').val());

            if (!is_empty($('input[name="addr_details"]').val())) {
                cossupload.append("addr_details", $('input[name="addr_details"]').val());
            }

            if (!is_empty($('textarea[name="description"]').val())) {
                cossupload.append("description", $('textarea[name="description"]').val());
            }

            $.ajax({
                type: "POST",
                url: "<{$url}>/coss_upload",
                cache: false, //上传文件不需要缓存
                data: cossupload,
                processData: false, // 告诉jQuery不要去处理发送的数据
                contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                success: function (jsonstr) {
                    $.hideLoading();

                    console.info(jsonstr);
                    console.info("<==================== Console Json Start ====================> Type:" + gettype(jsonstr));
                    var resultJson = formatJson(jsonstr);
                    console.info(resultJson);
                    console.info("<==================== Console Json End ====================> RunTime:" + (new Date().getTime() - startTime));

                    var data = $.parseJSON(jsonstr);
                    switch (data["status"]) {
                        case 200:
                            console.log("状态码：" + data["status"] + " Reason：" + data["reason"]);
                            $.toast(data["reason"], function () {
                                // parent.document.location.href = "<{$url}>/index?objid=" + data["result"];
                            });
                            break;
                        case 304:
                            $.toast(data["reason"], "text");
                            console.log("501 跳转: Reason:" + data["reason"]);
                            break;
                        case 401:
                            $.toast(data["reason"], "text");
                            console.log("501 跳转: Reason:" + data["reason"]);
                            break;
                        case 404:
                            $.toast(data["reason"], "text");
                            console.log("状态码：" + data["status"] + " Reason：" + data["reason"]);
                            break;
                        default:
                            $.toast(data["reason"], "text");
                            console.log("状态码：" + data["status"] + " Reason：" + data["reason"]);
                            break
                    }
                },
                error: function (data) {
                    console.log("TODO: Ajax Error：" + data);
                    $.toast("请求失败", "text");
                }
            });

        };


        var xhr;
        var ot;//
        var oloaded;

        //上传文件方法
        function UpladFile() {
            xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
            xhr.open("post", "<{$url}>/coss_upload", true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
            xhr.onload = uploadComplete; //请求完成
            xhr.onerror = uploadFailed; //请求失败
            xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
            xhr.upload.onloadstart = function () {//上传开始执行方法
                ot = new Date().getTime();   //设置上传开始时间
                oloaded = 0;//设置上传开始时，以上传的文件大小为0
            };
            xhr.send(cossupload); //开始上传，发送form数据
        }

        //上传进度实现方法，上传过程中会频繁调用该方法
        function progressFunction(evt) {

            var progressBar = document.getElementById("progressBar");
            var percentageDiv = document.getElementById("percentage");
            // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
            if (evt.lengthComputable) {//
                progressBar.max = evt.total;
                progressBar.value = evt.loaded;
                percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
            }

            var time = document.getElementById("time");
            var nt = new Date().getTime();//获取当前时间
            var pertime = (nt - ot) / 1000; //计算出上次调用该方法时到现在的时间差，单位为s
            ot = new Date().getTime(); //重新赋值时间，用于下次计算

            var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
            oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算

            //上传速度计算
            var speed = perload / pertime;//单位b/s
            var bspeed = speed;
            var units = 'b/s';//单位名称
            if (speed / 1024 > 1) {
                speed = speed / 1024;
                units = 'k/s';
            }
            if (speed / 1024 > 1) {
                speed = speed / 1024;
                units = 'M/s';
            }
            speed = speed.toFixed(1);
            //剩余时间
            var resttime = ((evt.total - evt.loaded) / bspeed).toFixed(1);
            time.innerHTML = '，速度：' + speed + units + '，剩余时间：' + resttime + 's';
            if (bspeed === 0)
                time.innerHTML = '上传已取消';
        }

        //上传成功响应
        function uploadComplete(evt) {
            //服务断接收完文件返回的结果
            //    alert(evt.target.responseText);
            console.info("uploadComplete()" + evt.target.responseText);
            alert("上传成功！");
        }

        //上传失败
        function uploadFailed(evt) {
            console.info("uploadFailed()" + evt.target.responseText);
            alert("上传失败！");
        }

        //取消上传
        function cancleUploadFile() {
            console.info("cancleUploadFile(XHR.Abort) ");
            xhr.abort();
        }

        /******************** ********************/

        // 设置默认值
        filespicker.setDefaultValue = function (n) {
            n = n || 0;

            var that = this;
            var _value;

            if (n >= that.selectSum || !that.selectArray[n]) {
                return;
            }

            _value = that.selectArray[n].data('value');

            if (typeof _value === 'string' || typeof _value === 'number' || typeof _value === 'boolean') {
                _value = _value.toString();

                setTimeout(function () {
                    that.selectArray[n].val(_value).trigger('change');
                    n++;
                    that.setDefaultValue(n);
                }, 1);
            }
        };

        // 改变选择时的处理
        filespicker.selectChange = function (name) {
            name = name.replace(/ /g, ',');
            name = ',' + name + ',';

            var selectValues = [];
            var selectIndex;
            var selectNext;
            var selectData;
            var _html;

            // 获取当前 select 位置、选择值，并清空后面的 select
            for (var i = 0; i < this.selectSum; i++) {
                selectValues.push(this.getIndex(this.selectArray[i].get(0).selectedIndex));

                if (typeof selectIndex === 'number' && i > selectIndex) {
                    this.selectArray[i].empty().prop('disabled', true).addClass("hide");

                    if (this.settings.nodata === 'none') {
                        this.selectArray[i].css('display', 'none');
                    } else if (this.settings.nodata === 'hidden') {
                        this.selectArray[i].css('visibility', 'hidden');
                    }
                }

                if (name.indexOf(',' + this.settings.selects[i] + ',') > -1) {
                    selectIndex = i;
                }
            }

            // 获取下级的列表数据
            selectNext = selectIndex + 1;
            selectData = this.dataJson;

            for (var i = 0; i < selectNext; i++) {
                if (typeof selectData[selectValues[i]] === 'undefined' || isArray(selectData[selectValues[i]].item) === false || !selectData[selectValues[i]].item.length) {
                    return;
                }
                selectData = selectData[selectValues[i]].item;
            }

            // 遍历数据写入下拉选框
            if (this.selectArray[selectNext]) {
                _html = this.getNewOptions(this.selectArray[selectNext], selectData);
                this.selectArray[selectNext].html(_html).prop('disabled', false).css({
                    'display': '',
                    'visibility': ''
                }).removeClass("hide").trigger('change');
            }
        };

        filespicker.init();

        return this;
    };

    // 默认值
    $.filespicker.defaults = {

        selector: "embedded",	//选择器视图：默认嵌入式


        selects: [],			// 下拉选框组
        data: null,				// 列表数据文件路径，或设为对象
        nodata: null,			// 无数据状态
        required: false,		// 是否为必选(默认不允许)
        firstTitle: '请选择',	// 第一个选项选项的标题
        firstValue: '0',		// 第一个选项的值
        multiple: false,		// 是否允许多选(默认不允许)
        multi: false			// 是否允许多选
    };

    $.fn.filespicker = function (settings, callback) {
        this.each(function (i) {
            $.filespicker(this, settings, callback);
        });
        return this;
    };
}));
/**==================== Mark Files Transmit（End） ====================**/