/**
 * Mark MultiSelect
 * @name mark.multiselect.js
 * @version 1.3.4
 * @date 2013-12-18
 * @author Mark Young
 * @email ciaoca@gmail.com
 * @site https://github.com/ciaoca/cxSelect
 * @site http://www.jq22.com/jquery-info3238
 * @license Released under the MIT license
 *
 * 1、初始化组件
 * 2、加载配置参数
 * 3、加载数据
 * 4、执行操作事件
 * 5、获取数据，数据判断
 *
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    $.multiselect = function (settings) {
        var obj;
        // var settings;
        var multiselect = {
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

        multiselect.init = function () {
            var that = this;
            that.dom.box = obj;
            that.settings = $.extend({}, $.multiselect.defaults, settings, {
                data: that.dom.box.data("data"),
                nodata: that.dom.box.data("nodata"),
                required: that.dom.box.data("required"),
                selected: that.dom.box.data("selected"),
                firstTitle: that.dom.box.data("firstTitle"),
                firstValue: that.dom.box.data("firstValue")
            });

            // 未设置选择器组
            if (!that.settings.selects.length) {
                return;
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
                return;
            }

            console.info("MultipleSelect", gettype(that.settings.data));
            /*
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
            */
            structure(that);
        };

        /**
         * 构建
         * @param that
         */
        multiselect.structure = function (that) {
            // console.error("MultiSelect Structure:", that);

            if (is_bool($(that).data("debug"))) {
                console.debug("Structure", $(that).data("url"), this.defaults.title);
            }
            this.init(that);
            // this.constructor(that);
            if (is_bool($(that).data("cache"))) {
                // console.debug("Structure::used cache", $(that).data("cache"));
                this.getCache(that);
            } else {
                // console.debug("Structure::used data", $(that).data("cache"));
                this.getData(that);
            }

        };
        /**
         * 获取缓存数据
         *
         * @param container
         */
        multiselect.getCache = function (container) {
            var that = this;
            if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
                // var json = window.localStorage.getItem(window.btoa($(container).data("url")));
                var json = null;
                if (!is_empty($(container).data("token"))) {
                    json = window.localStorage.getItem($(container).data("token"));
                } else {
                    json = window.localStorage.getItem(window.btoa($(container).data("url").parseURL().host + $(container).data("url").parseURL().path));
                }
                if (!is_empty(json)) {
                    that.buildContent(container, JSON.parse(json));
                } else {
                    // console.debug("Mark.MultipleSelect.js component not used Window.localStorage cache");
                    that.getData(container);
                }
            } else {
                // console.debug("Mark.MultipleSelect.Js getCache() This device not support localStorage");
                that.getData(container);
            }
        };
        /**
         * 获取网络数据
         * @param container
         */
        multiselect.getData = function (container) {
            var that = this;

            // 设置 URL，通过 Ajax 获取数据
            if (!is_empty(this.defaults.url)) {
                $.ajax({
                    url: this.defaults.url,
                    type: 'GET',
                    cache: false,
                    data: null,
                    processData: false,
                    contentType: false,
                    dataType: "json",

                    xhrFields: {withCredentials: true},
                    crossDomain: true,

                    success: function (json) {
                        if ($(container).data("debug")) {
                            console.info("<========== Console Json Start ==========>");
                            console.info(formatJson(json));
                            console.info("<========== Console Json End ==========>");
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
                                    // window.localStorage.setItem(window.btoa($(container).data("url")), JSON.stringify(json), 86400);
                                    window.localStorage.setItem(
                                        window.btoa($(container).data("url").parseURL().host + $(container).data("url").parseURL().path),
                                        JSON.stringify(json),
                                        !is_empty($(container).data("expire")) && !isNaN($(container).data("expire")) ? $(container).data("expire") : 86400);
                                }
                            }
                            that.buildContent(container, json);
                        } else {
                            console.debug("Mark.collapse.Js getData() data is null");
                        }
                    },
                    error: function (data) {
                        console.error("TODO: 操作失败：", data);
                    }
                });
            } else {
                console.debug("Traversal", this.defaults.url);
            }
        };

        multiselect.getIndex = function (n) {
            return (this.settings.required) ? n : n - 1;
        };
        /**
         * 获取下拉框内容
         *
         * @param elemJquery
         * @param data
         * @returns {string}
         */
        multiselect.getNewOptions = function (elemJquery, data) {
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

        /**
         * 构建选框内容
         */
        multiselect.buildContent = function () {
            var that = this;

            that.dom.box.on("change", "select", function () {
                that.selectChange(this.className);
            });

            var _html = that.getNewOptions(that.selectArray[0], that.dataJson);
            that.selectArray[0].html(_html).prop("disabled", false).removeClass("hide").trigger("change");

            that.setDefaultValue();
        };
        /**
         * 设置默认值
         *
         * @param n
         */
        multiselect.setDefaultValue = function (n) {
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

        /**
         * 改变选择时的处理
         * @param name
         */
        multiselect.selectChange = function (name) {
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

        multiselect.init();

        return this;
    };

    // 默认值
    $.multiselect.defaults = {
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

    $.fn.multiselect = function (settings, callback) {
        this.each(function (i) {
            console.error("multiselect ", i);
            $.multiselect(this, settings, callback);
        });
        return this;
    };
}));
// 严格模式
(function () {
    'use strict';
    console.log("Mark MultipleSelect use strict");
})();

$(document).ready(function () {
    /**========================== 多级联动选择器 ==========================*/
    /**
     * 遍历当前界面的菜单
     * multiselect mk-select-container
     */
    $(".mk-multiselect-container[data-defined='false']").each(function (key, view) {
        // Mark.multiselect.structure(view);
        $(view).multiselect();

        if ($(this).data("collapse")) {
            $(this).toggleClass("visible");
        }
    });

    $.fn.open = function () {
        return this.each(function () {
            Mark.collapse.open(this);
        });
    };

    $.fn.close = function () {
        return this.each(function () {
            Mark.collapse.close(this);
        });
    };
    /**
     * 点击Item 展开折叠下级菜单
     */
    /*
    $(document).on("click", ".mk-collapse-item .mk-collapse-item-title", function (event) {
        $(this).children(".mk-collapse-icon").toggleClass("tpl-left-nav-more-ico-rotate");
        $(this).parent(".mk-collapse-item").toggleClass("active");
        $(this).siblings(".mk-collapse-list").toggleClass("active");
    });
    */
    /**
     * 点击遮罩层，关闭菜单
     */
    $(document).on("click", ".mk-collapse-overlay", function (event) {
        if ($(this).parent(".mk-collapse-container").data("debug")) {
            console.debug("mk-collapse-overlay.onclick", $(this).parent(".mk-collapse-container").data("title"));
        }
        $(this).parent(".mk-collapse-container").removeClass("visible");
    });

    /**
     * 菜单展开折叠操作
     */
    $(document).on("click", ".open-collapse", function (event) {
        console.debug("open-collapse:target");
        // $(this).toggle("全部折叠");
        $(this).parents(".mk-collapse-container")
            .find(".mk-collapse-list")
            .toggleClass("active")
            .trigger("click");
        event.stopPropagation();
    });
    /**
     * 菜单折叠操作
     */
    $(document).on("click", ".close-collapse", function (event) {
        console.debug("close-collapse:target");
        $(".mk-collapse-container").removeClass("visible");
        event.stopPropagation();
    });

    /**
     * 菜单目标操作:点击Target 展开折叠下级菜单
     */
    $(document).on("click", "[data-target]", function (event) {
        console.debug($(this).data("target"), $(this));

        $(".mk-collapse-container").not($($(this).data("target"))).removeClass("visible");

        $($(this).data("target")).toggleClass("visible");

        event.stopPropagation();
    });

    // console.debug(getQueryString());
});

