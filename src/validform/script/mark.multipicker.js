/*!
 * jQuery multipicker
 * @name jquery.multipicker.js
 * @version 1.3.4
 * #date 2013-12-18
 * @author ciaoca
 * @email ciaoca@gmail.com
 * @site https://github.com/ciaoca/cxSelect
 * @site http://www.jq22.com/jquery-info3238
 * @license Released under the MIT license
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.multipicker = function (settings) {
        var obj;
        // var settings;
        var multipicker = {
            dom: {},
            api: {}
        };

        // 检测是否为 DOM 元素
        var isElement = function (o) {
            if (o && (typeof HTMLElement === "function" || typeof HTMLElement === "object") && o instanceof HTMLElement) {
                return true;
            } else {
                return !!(o && o.nodeType && o.nodeType === 1);
            }
        };

        // 检测是否为 jQuery 对象
        var isJquery = function (o) {
            return !!(o && o.length && (typeof jQuery === "function" || typeof jQuery === "object") && o instanceof jQuery);
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
            } else if (typeof arguments[i] === "object") {
                settings = arguments[i];
            }
        }

        if (obj.length < 1) {
            return
        }

        multipicker.init = function () {
            var that = this;
            that.dom.box = obj;
            that.settings = $.extend({}, $.multipicker.defaults, settings, {
                data: that.dom.box.data("data"),
                nodata: that.dom.box.data("nodata"),
                required: that.dom.box.data("required"),
                selected: that.dom.box.data("selected"),
                firstTitle: that.dom.box.data("firstTitle"),
                firstValue: that.dom.box.data("firstValue")
            });

            // 未设置选择器组
            if (!that.settings.selects.length) {
                return
            }

            that.selectArray = [];
            that.selectSum = that.settings.selects.length;

            for (var i = 0; i < that.selectSum; i++) {
                if (!that.dom.box.find("select." + that.settings.selects[i])) {
                    break;
                } else {
                    $(that.dom.box[0]).append('<select name="'
                        + that.settings.selects[i] + '" class="mk-select '
                        + that.settings.selects[i] + '"'
                        + (that.settings.required ? ' required="true"' : "")
                        + (that.settings.multiple ? ' multiple="true"' : "")
                        + (that.settings.selected && that.settings.selected[i] ? ' value="' + that.settings.selected[i] + '"' : "")
                        + '></select>');
                }

                that.selectArray.push(that.dom.box.find("select." + that.settings.selects[i]));
            }

            that.selectSum = that.selectArray.length;

            // 设置的选择器组不存在
            if (!that.selectSum) {
                return
            }

            console.info("multipicker", gettype(that.settings.data));

            // 设置 URL，通过 Ajax 获取数据
            if (typeof that.settings.data === "string") {
                $.getJSON(that.settings.data, function (json) {
                    that.dataJson = json;
                    that.buildContent();
                });

                // 设置自定义数据
            } else if (typeof that.settings.data === "object") {
                that.dataJson = that.settings.data;
                that.buildContent();
            }
        };

        multipicker.getIndex = function (n) {
            return (this.settings.required) ? n : n - 1;
        };

        // 获取下拉框内容
        multipicker.getNewOptions = function (elemJquery, data) {
            if (!elemJquery) {
                return;
            }

            var _title = this.settings.firstTitle;
            var _value = this.settings.firstValue;
            var _dataTitle = elemJquery.data("firstTitle");
            var _dataValue = elemJquery.data("firstValue");
            var _html = "";

            if (typeof _dataTitle === "string" || typeof _dataTitle === "number" || typeof _dataTitle === "boolean") {
                _title = _dataTitle.toString();
            }

            if (typeof _dataValue === "string" || typeof _dataValue === "number" || typeof _dataValue === "boolean") {
                _value = _dataValue.toString();
            }

            if (!this.settings.required) {
                _html = '<option value="' + _value + '">' + _title + '</option>';
            }

            $.each(data, function (i, v) {
                if (typeof (v.value) === "string" || typeof (v.value) === "number" || typeof (v.value) === "boolean") {
                    _html += '<option value="' + v.value + '">' + v.title + '</option>';
                } else {
                    _html += '<option value="' + v.title + '">' + v.title + '</option>';
                }
            });

            return _html;
        };

        // 构建选框内容
        multipicker.buildContent = function () {
            var that = this;

            that.dom.box.on("change", "select", function () {
                that.selectChange(this.className);
            });

            var _html = that.getNewOptions(that.selectArray[0], that.dataJson);
            that.selectArray[0].html(_html).prop("disabled", false).removeClass("hide").trigger("change");

            that.setDefaultValue();
        };

        // 设置默认值
        multipicker.setDefaultValue = function (n) {
            n = n || 0;

            var that = this;
            var _value;

            if (n >= that.selectSum || !that.selectArray[n]) {
                return;
            }

            if (that.settings.selected == null || !that.settings.selected[n]) {
                return;
            }

            $(that.selectArray[n])
                .find("option[value = '" + that.settings.selected[n] + "']")
                .attr("selected", "selected")
                .trigger("change");

            n++;
            that.setDefaultValue(n);
            /*
            // 在<select>元素上的 data- 属性；目前无法设置，所以不再使用
                        _value = that.selectArray[n].data("value");
                        if (typeof _value === "string" || typeof _value === "number" || typeof _value === "boolean") {
                            _value = _value.toString();

                            that.selectArray[n].val(_value).trigger("change");
                            n++;
                            that.setDefaultValue(n);
                        };
            */
        };

        // 改变选择时的处理
        multipicker.selectChange = function (name) {
            name = name.replace(/ /g, ",");
            name = "," + name + ",";

            var selectValues = [];
            var selectIndex;
            var selectNext;
            var selectData;
            var _html;

            // 获取当前 select 位置、选择值，并清空后面的 select
            for (var i = 0; i < this.selectSum; i++) {
                selectValues.push(this.getIndex(this.selectArray[i].get(0).selectedIndex));

                if (typeof selectIndex === "number" && i > selectIndex) {
                    this.selectArray[i].empty().prop("disabled", true).addClass("hide");

                    if (this.settings.nodata === "none") {
                        this.selectArray[i].css("display", "none");
                    } else if (this.settings.nodata === "hidden" || this.settings.nodata === "hide") {
                        this.selectArray[i].css("visibility", "hidden");
                    }
                }

                if (name.indexOf("," + this.settings.selects[i] + ",") > -1) {
                    selectIndex = i;
                }
            }

            // 获取下级的列表数据
            selectNext = selectIndex + 1;
            selectData = this.dataJson;

            for (var i = 0; i < selectNext; i++) {
                if (typeof selectData[selectValues[i]] === "undefined" || isArray(selectData[selectValues[i]].item) === false || !selectData[selectValues[i]].item.length) {
                    return;
                }
                selectData = selectData[selectValues[i]].item;
            }

            // 遍历数据写入下拉选框
            if (this.selectArray[selectNext]) {
                _html = this.getNewOptions(this.selectArray[selectNext], selectData);
                this.selectArray[selectNext].html(_html)
                    .prop("disabled", false)
                    .css({
                        "display": "",
                        "visibility": ""
                    })
                    .removeClass("hide")
                    .trigger("change");
            }
        };

        multipicker.init();

        return this;
    };


    // 默认值
    $.multipicker.defaults = {
        selects: [],			// 下拉选框组
        data: null,				// 列表数据文件路径，或设为对象
        nodata: null,			// 无数据状态
        required: false,		// 是否为必选(默认不允许)
        selected: null,			// 默认选中值
        firstTitle: "请选择",	// 第一个选项选项的标题
        firstValue: "0",		// 第一个选项的值
        multiple: false,		// 是否允许多选(默认不允许)
        multi: false			// 是否允许多选
    };

    $.fn.multipicker = function (settings, callback) {
        this.each(function (i) {
            $.multipicker(this, settings, callback);
        });
        return this;
    };
}));