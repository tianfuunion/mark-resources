/**
 * Mark.collapse.js
 *
 一、声明式定义组件
 1、扫描遍历 mk-collapse-container 容器，
 2、根据该节点的DTTA-Attribute 构建UI组件
 <div id="mk-collapse" class="collapse mk-collapse-container mk-sidebar-left"
 data-title="侧边栏"
 data-id="mk-collapse"
 data-module="mk-collapse"
 data-type="sidebar-left"
 data-animation=""
 data-gravity="sidebar-left"
 data-defined="false"
 data-url="/api.php/ram/channel?action=list&appid=10001">
 </div>

 二、数据调用式定义组件
 @TODO：JS暂未实例实现

 $(".mk-collapse-container")
 .addClass("visible")
 .collapse("");

 *
 *Js 压缩：https://tool.oschina.net/jscompress
 *
 */
Mark_collapse = (function () {
    return {
        defaults: {
            title: "折叠组件", // 标题
            name: "CollapseComponent", // 名称
            container: null, // 容器

            module: "", // 模型
            type: "sidebar-left", // 类型
            animation: "", // 动画
            gravity: "sidebar-left", // 重力方向
            defined: false, // 是否已定义
            url: "", // 数据来源URL

            data: null,				// 列表数据文件路径，或设为对象
            dataJson: "",
            nodata: null,			// 无数据状态
            required: false,		// 是否为必选(默认不允许)
            selected: null,			// 默认选中值
            firstTitle: "请选择",	// 第一个选项选项的标题
            firstValue: "0",		// 第一个选项的值
            multiple: false,		// 是否允许多选(默认不允许)
            multi: false,			// 是否允许多选
            theme: "default", // 下拉框主题：daymode,nightmode
            only: false, // 是否唯一展开
        },

        init: function (that) {
            this.defaults.container = $(that).find(0);
            this.defaults.title = $(that).data("title");
            this.defaults.type = $(that).data("type");
            this.defaults.url = $(that).data("url");
            this.defaults.id = $(that).data("id");
            this.defaults.parentid = $(that).data("parentid");
            this.defaults.module = $(that).data("module");
            this.defaults.animation = $(that).data("animation");
            this.defaults.gravity = $(that).data("gravity");
            this.defaults.defined = $(that).data("defined");
        },
        constructor: function (that) {
            if (is_bool($(that).data("debug"))) {
                console.debug("Mark.collapse constructor()", $(that).find(0));
            }
            this.defaults.container = $(that).find(0);
            this.defaults.title = $(that).data("title");
            this.defaults.type = $(that).data("type");
            this.defaults.url = $(that).data("url");
            this.defaults.id = $(that).data("id");
            this.defaults.parentid = $(that).data("parentid");
            this.defaults.module = $(that).data("module");
            this.defaults.animation = $(that).data("animation");
            this.defaults.gravity = $(that).data("gravity");
            this.defaults.defined = $(that).data("defined");
        },
        /**
         * 遍历容器节点
         * @param that
         */
        traversal: function (that) {
            console.debug("Traversal", $(that));
        },
        /**
         * 构建
         * @param that
         */
        structure: function (that) {
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

        },
        /**
         * 构建选框内容
         * @param container
         * @param json
         */
        buildContent: function (container, json) {
            var that = this;

            var modal = "";
            if ($(container).data("overlay")) {
                modal += '<div class="mk-collapse-overlay mk-collapse-mask"></div>';
            } else {
                modal += '<div class="mk-collapse-overlay mk-collapse-mask bg-transparent"></div>';
            }
            modal += '<div class="mk-collapse-modal">';

            if (!is_empty(json.title)) {
                modal += '<div class="toolbar">' +
                    '<div class="toolbar-inner">' +
                    '<h1 class="title padding-right-50px">' + json.title + '</h1>' +
                    '<a href="javascript:void(0);" class="picker-button close-collapse am-icon-close right-10px"></a>' +
                    '</div>' +
                    '</div>';
            }
            modal += '<ul class="modal-content mk-collapse-box mk-collapse-list clearfix">' + this.buildChildChannel(json.data) + '</ul>';

            if (!is_empty(json.search) && $(container).data("searchbar")) {
                modal += '<div class="button-area"><div class="menu-button search-box">';
                if (!is_empty(json.search.text)) {
                    modal += '<span class="label">' + json.search.text + '</span>';
                } else {
                    modal += '<span class="label">' + '</span>';
                }
                modal += '<span class="am-icon-search"></span>';

                if (!is_empty(json.search.link)) {
                    modal += '<a href="' + json.search.link + '" class="cover"></a>';
                } else {
                    modal += '<a href="javascript:void(0);" class="cover"></a>';
                }

                modal += '</div>';
                if ($(container).data("target")) {
                    modal += '<a class="menu-button search-box open-collapse" href="javascript:void(0);">全部展开</a>';
                }
                modal += '</div>';
            }
            modal += '</div>';

            $(container)
                .html(modal)
                .attr("data-defined", true);

            // $(document).on("click", ".mk-collapse-item .mk-collapse-item-title", function (event) {
            $(".mk-collapse-item .mk-collapse-item-title").unbind("click").on("click", function (event) {
                if ($(this).parent(".mk-collapse-container").data("debug")) {
                    console.warn($(this));
                }
                $(this).children(".mk-collapse-icon").toggleClass("tpl-left-nav-more-ico-rotate");
                $(this).parent(".mk-collapse-item").toggleClass("active");
                $(this).siblings(".mk-collapse-list").toggleClass("active");

                event.stopPropagation();
            });
            /**
             * TODO:主次赋值存在BUG，部分节点不存在上级节点
             */
            if (json.required || $(container).data("required")) {
                // 默认展开当前应用/控制器/操作
                $(container)
                    .find(".mk-collapse-item[data-depth='1'][data-name='" + $(container).data("project") + "']")
                    .children(".mk-collapse-item-title")
                    .trigger("click")
                    .toggleClass("active");

                // 默认展开当前控制器
                $(container)
                    .find(".mk-collapse-item[data-depth='2'][data-name='" + $(container).data("controller") + "']")
                    .children(".mk-collapse-item-title")
                    .trigger("click")
                    .toggleClass("active");

                // 默认高亮当前应用操作
                $(container)
                    .find(".mk-collapse-item[data-depth='3'][data-name='" + $(container).data("action") + "']")
                    .trigger("click")
                    .toggleClass("active");
            }
            if (json.debug || $(container).data("debug")) {
                $(container).data("debug", true);

                console.debug(
                    "Project:", $(container).data("project"),
                    "Controller:", $(container).data("controller"),
                    "Action:", $(container).data("action"),
                    "Required:", $(container).data("required"),
                    "Cache:", $(container).data("cache")
                );
            }
            // that.setDefaultValue();
        },
        /**
         * 构建子频道节点
         * @param json
         * @param depth
         * @returns {string}
         */
        buildChildChannel: function (json, depth) {
            if (is_empty(depth)) {
                depth = 0;
            }
            depth++;

            var view = "";
            if (!is_empty(json)) {
                for (var i = 0; i < json.length; i++) {
                    view += '<li class="mk-collapse-item"' +
                        ' data-depth="' + depth + '"' +
                        ' data-id="' + json[i].channelid + '"' +
                        ' data-parentid="' + json[i].parentid + '"' +
                        ' data-name="' + json[i].name + '">';
                    view += '<div class="mk-collapse-item-title" data-name="' + json[i].name + '">';
                    if (!is_empty(json[i].icon)) {
                        view += '<i class="mk-collapse-logo iconfont icon ' + json[i].icon + '"></i>';
                    } else {
                        view += '<i class="mk-collapse-logo"></i>';
                    }
                    view += '<a class="mk-collapse-link"';
                    switch (json[i].target) {
                        case "blank":
                            if (is_empty(json[i].item) && !is_empty(json[i].url)) {
                                view += ' href="' + location.protocol + "//" + json[i].url + '" target="_blank"';
                            } else {
                                view += ' href="javascript:void(0);"';
                            }
                            break;
                        case "parent":
                            if (is_empty(json[i].item) && !is_empty(json[i].url)) {
                                view += ' href="' + location.protocol + "//" + json[i].url + '" target="_parent"';
                            } else {
                                view += ' href="javascript:void(0);"';
                            }
                            break;
                        case "top":
                            if (is_empty(json[i].item) && !is_empty(json[i].url)) {
                                view += ' href="' + location.protocol + "//" + json[i].url + '" target="_top"';
                            } else {
                                view += ' href="javascript:void(0);"';
                            }
                            break;
                        case "frame":
                            if (is_empty(json[i].item) && !is_empty(json[i].url)) {
                                view += ' href="' + location.protocol + "//" + json[i].url + '" target="_self"';
                            } else {
                                view += ' href="javascript:void(0);"';
                            }
                            break;
                        case "self":
                        default:
                            if (is_empty(json[i].item) && !is_empty(json[i].url)) {
                                view += ' href="' + location.protocol + "//" + json[i].url + '" target="_self"';
                            } else {
                                view += ' href="javascript:void(0);"';
                            }
                            break;
                    }

                    view += ' title="' + json[i].title + '">' + json[i].title + '</a>';

                    view += '<i class="mk-collapse-icon am-icon-angle-right tpl-dropdown-list-fr text-right"></i>';
                    view += '</div>';

                    if (!is_empty(json[i].item)) {
                        view += '<ul class="mk-collapse-box mk-collapse-list clearfix">'
                            + this.buildChildChannel(json[i].item, depth)
                            + '</ul>';
                    }
                    view += '</li>';
                }
            }
            return view;
        },
        /**
         * 获取缓存数据
         *
         * @param container
         */
        getCache: function (container) {
            var that = this;
            if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
                var json = null;
                if (!is_empty($(container).data("token"))) {
                    json = window.localStorage.getItem($(container).data("token"));
                } else {
                    json = window.localStorage.getItem(window.btoa($(container).data("url").parseURL().host + $(container).data("url").parseURL().path));
                }
                if (!is_empty(json)) {
                    result = JSON.parse(json);
                    if (result.expiretime <= (new Date()).getTime() / 1000) {
                        that.getData(container);
                    } else {
                        // that.buildContent(container, JSON.parse(json));
                        that.buildContent(container, result);
                    }
                } else {
                    // console.debug("Mark_collapse.js component not used Window.localStorage cache");
                    that.getData(container);
                }
            } else {
                // console.debug("Mark_collapse.Js getCache() This device not support localStorage");
                that.getData(container);
            }
        },
        /**
         * 获取网络数据
         * @param container
         */
        getData: function (container) {
            var that = this;

            // 设置 URL，通过 Ajax 获取数据
            if (!is_empty(this.defaults.url)) {
                $.ajax({
                    url: this.defaults.url,
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
                            console.info("<========== Console Json Start ==========>");
                            console.info(formatJson(json));
                            console.info("<========== Console Json End ==========>");
                        }
                        // !is_empty($(container).data("expire")) && !isNaN($(container).data("expire")) ? $(container).data("expire") : 86400);
                        if (!is_empty(json)) {
                            if (window.Storage && window.localStorage && window.localStorage instanceof Storage) {
                                json.expiretime = (new Date()).getTime() / 1000 + json.expire;

                                if (!is_empty($(container).data("token"))) {
                                    window.localStorage.setItem($(container).data("token"), JSON.stringify(json));
                                } else {
                                    window.localStorage.setItem(window.btoa($(container).data("url").parseURL().host + $(container).data("url").parseURL().path), JSON.stringify(json));
                                }
                            }
                            that.buildContent(container, json);
                        } else {
                            console.debug("Mark_collapse.Js getData() data is null");
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.error("\n状态码：", XMLHttpRequest.status,
                            '\n状态：', XMLHttpRequest.readyState,
                            '\n响应消息：', XMLHttpRequest.responseText,
                            '\n错误信息：', textStatus);
                    }
                });
            } else {
                console.debug("Traversal", this.defaults.url);
            }
        },
        collapseall: function (that) {
            $(".mk-collapse-item").trigger("click");
        },
        close: function () {
            $(".mk-collapse-container").removeClass("visible");
        },
        open: function (that) {
            this.close();
            $(that).addClass("visible");
        },
        resize: function () {
            $(window).on("resize", function () {
                Home.deskTop.resize(200);
            });
        },
        traverse: function (json) {
            if (json !== null && typeof json === "object") {
                Object.entries(json).forEach(([key, value]) => {
                    // key is either an array index or object key
                    this.traverse(value);
                });
            } else {
                // jsonObj is a number or string
            }
        },
        /**
         * 设置默认值* 暂未配置
         * @param n
         */
        setDefaultValue: function (n) {
            n = n || 0;

            var that = this;
            var _value;

            if (n >= that.selectSum || !that.selectArray[n]) {
                return;
            }

            _value = that.selectArray[n].data("value");

            if (typeof _value === "string" || typeof _value === "number" || typeof _value === "boolean") {
                _value = _value.toString();

                setTimeout(function () {
                    that.selectArray[n].val(_value).trigger("change");
                    n++;
                    that.setDefaultValue(n);
                }, 1);
            }

        },
    }
})();

$(document).ready(function () {
    /**========================== 侧边导航下拉列表 ==========================*/
    /**
     * 遍历当前界面的菜单
     */
    $(".mk-collapse-container[data-defined='false']").each(function (key, view) {
        Mark_collapse.structure(view);
        if ($(this).data("collapse")) {
            $(this).toggleClass("visible");
        }
    });

    $.fn.open = function () {
        return this.each(function () {
            Mark_collapse.open(this);
        });
    };

    $.fn.close = function () {
        return this.each(function () {
            Mark_collapse.close(this);
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
        if (is_bool($(this).parent(".mk-collapse-container").data("debug"))) {
            console.debug("mk-collapse-overlay.onclick", $(this).parent(".mk-collapse-container").data("title"));
        }
        $(this).parent(".mk-collapse-container").removeClass("visible");
    });

    /**
     * 菜单展开折叠操作
     */
    $(document).on("click", ".open-collapse", function (event) {
        if (is_bool($(this).data("debug"))) {
            console.debug("open-collapse:target");
        }
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
        if (is_bool($(this).data("debug"))) {
            console.debug("close-collapse:target");
        }
        $(".mk-collapse-container").removeClass("visible");
        event.stopPropagation();
    });

    /**
     * 菜单目标操作:点击Target 展开折叠下级菜单
     */
    $(document).on("click", "[data-target]", function (event) {
        if (is_bool($(this).data("debug"))) {
            console.debug($(this).data("target"), $(this));
        }

        $(".mk-collapse-container").not($($(this).data("target"))).removeClass("visible");

        $($(this).data("target")).toggleClass("visible");

        event.stopPropagation();
    });

    // console.debug(getQueryString());
});