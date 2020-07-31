/*
**  Home OS 桌面应用框架
**  作者：
**  项目地址：http://www.zongdongyang.cn
Note:	尽量避开JS插件，缩小代码量
1、通过ajax 获取用户登录ID，session值，uid,
2、获取用户桌面配置，直接加载
3、获取用户桌面应用个数，app:name,titile,icon,img、 img:width
4、获取用户桌面挂件名称，直接加载挂件，加载用户自定义挂件配置。
5、获取用户桌面背景图片，直接加载
6、获取用户私有文件夹及文件，加载
7、渲染桌面，直接输出！


0、加载完成，隐藏 Loading

URL举例：

app_path="public/application/extapp";
app_code = "user_center"
appUrl = app_Path + app_code + "index.php";

template_path = "template/default";
apptemplate_path=template_path + "Home/app/extapp";
appTempUrl = template_path + app_code + "index.htm";

*/

var version = '1.0';			//版本号
var zoomlevel = 1;
var TEMP = {};
var Home = {};
var test = {};

var BLUEKING = {};

var datas = "/data/uploads/";
var dofiles = "/data/dofiles/";
var app = "/data/app/";
var images = "/template/default/images/";
var upmaxsize = 10;

//文档宽度		-->		有待改善	！ ！ ！
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//文档高度
var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

Home.CONFIG = {
    desk: 1,        //当前显示桌面
//	dockPos         : 'top',    //应用码头位置，参数有：top,left,right
    appXY: 'x',      //图标排列方式，参数有：x,y
    appiSize: 's',		//图标尺寸，参数有：s,m,l
    appButtonTop: 20,       //快捷方式top初始位置
    appButtonLeft: 20,       //快捷方式left初始位置
    createIndexid: 1,        //z-index初始值
    windowMinWidth: 600,		//窗口最小宽度
    windowMinHeight: 300,		//窗口最小高度
    wallpaper: '1',       //壁纸
    wallpaperWidth: 0,        //壁纸宽度
    wallpaperHeight: 0,        //壁纸高度
    wallpaperType: '',       //壁纸显示类型，参数有：tianchong,shiying,pingpu,lashen,juzhong
    wallpaperState: 1         //1系统壁纸 2自定义壁纸 3网络壁纸
};

// 工具app： 应用市场、统计、开发者中心、开发者日历...
//var tool_apps = ["market", "about_Home", "app_statistics", "developer", "developer_tool", "notice", "bk_api", "user_ce"];

//	var tool_apps = ["market", "about_Home", "app_statistics", "notice", "user_ce", "user_center", "union_manage", "user_manage", "permission_center"];


//	统一设置域名
/*	try{
		document.domain = 'qcloud.com';
	}catch(err){

	}
*/
//	ajax全局设置

$.ajaxSetup({
    timeout: 10000,		//设置请求超时时间（毫秒）。此设置将覆盖全局设置。
    async: true,
    cache: false,
    statusCode: {
        /// 401状态码,nginx 配置是不对401做处理——TODO
        401: function (xhr) {
            // 400返回登录url
            var _src = xhr.responseText;
            try {
                // 隐藏相关的msgbox
                ZENG.msgbox._hide();
            } catch (e) {
            }
            // 判断返回的url是否正确
            var bk_url_prefix = Home.corefunc.QQ_LOGIN_PREFIX;
            var is_src = _src.indexOf(bk_url_prefix);
            // 判断是否是在蓝鲸平台中打开 TODO
            if (Home.corefunc.is_app_in_bk() && is_src == 0) {
                window.top.Home.corefunc.open_login_dialog(_src);
            } else {
                var app_code = window.top.Home.corefunc.get_app_code();
                if (is_src != 0) {
                    var tips = "温馨提示：用户信息验证失败！<br>即将跳转至登录页面！"
                } else {
                    //提示信息
                    var tips = "温馨提示：请在蓝鲸平台中使用该应用！<br>即将跳转至蓝鲸平台！"
                }
                window.top.Home.corefunc.jump_to_pt(app_code, tips);
            }
            // 将app 的打开标志设置为0
            try {
                var path_list = _src.split('&Home_appid=');
                var appid = path_list.length > 1 ? path_list[1] : '';
                window.top.$('#d_' + appid).attr('opening', 0);
            } catch (e) {
                console.log(e);
            }
        },
        // 权限控制
        402: function (xhr) {
            try {
                // 隐藏相关的msgbox
                ZENG.msgbox._hide();
            } catch (e) {
            }
            var _src = xhr.responseText;
            ajax_content = '<iframe name="access_control_iframe" frameborder="0" src="' + _src + '" style="width:570px;height:380px;"></iframe>';
            art.dialog({
                title: "提示",
                lock: true,
                content: ajax_content
            });

        },
        500: function (xhr, textStatus) {
            // 异常
            if (S.debug) {
                alert("系统出现异常：" + textStatus + "---" + xhr.status + '====');
            }
        }
    }
});


/*
 * 统一登录相关
 */
Home.corefunc = (function () {
    return {

//	打开登录窗口
        open_login_dialog: function (src) {
            var login_html = '<div class="mod_login" id="loginbox" style="padding: 0 0; visibility: visible;" align="center">' +
                '<iframe name="login_frame" id="login_frame"  width="100%" height="100%" frameborder="0" allowtransparency="yes"  src="' + src +
                '" style="width:374px;height: 320px;"></iframe>' +
                '</div>';
            art.dialog({
                id: "401_dialog",
                fixed: true,
                lock: true,
                padding: "0px 0px",
                content: login_html
            });
        },

//	关闭登录框
        close_login_dialog: function () {
            art.dialog({id: '401_dialog'}).close();
        },

//	判断APP是否在蓝鲸平台中打开
        is_app_in_bk: function () {
            // 初始化BK_HOST信息
            Home.corefunc.init();
            var top_url = window.top.location.host;
            // 平台url前缀
            var bk_url_prefix = Home.corefunc.BK_HOST;
            // TODO 兼容dev环境
            if (top_url.indexOf(bk_url_prefix) == 0) {
                return true;
            } else {
                return false;
            }
        },

//	登录提示
//	不在蓝鲸平台中，则跳转到蓝鲸平台中
        jump_to_pt: function (app_code) {
            var d_tips = "温馨提示：请在蓝鲸平台中使用该应用！<br>即将跳转至蓝鲸平台！"
            var tips = arguments[1] ? arguments[1] : d_tips;
            var bk_url = window.top.Home.corefunc.get_bk_url();
            // 当前应用的宣传链接
            if (app_code != '') {
                var jump_url = bk_url + "/?app=" + app_code;
            } else {
                var jump_url = bk_url + "/";
            }
            art.dialog({
                title: "温馨提示",
                width: 340,
                icon: 'warning',
                lock: true,
                content: tips,
                time: 2,
                close: function () {
                    window.top.location = jump_url;
                }
            });
        },

//	获取iframe对象
        getIframeByElement: function (element) {
            var iframe;
            try {
                $("iframe").each(function () {
                    if (element.ownerDocument === this.contentWindow.document) {
                        iframe = this;
                    }
                    return !iframe;
                });
            } catch (e) {
                console.log(e);
            }
            return iframe;
        },

//	获取异常信息处理
        get_error_tips: function () {
            var host_now = window.location.host;
            if (host_now == '127.0.0.1' || host_now == 'localhost') {
                host_now = 'o.qcloud.com/console';
            }
            //填充提示信息
            var tips = "温馨提示：此功能不支持在此使用，如需体验，请跳转至<a target='_blank' href='http://" + host_now + "'><font style='color:red;font-weight:bold;'>" + host_now + "</font></a>！"
            art.dialog({
                title: "温馨提示",
                width: 340,
                icon: 'warning',
                lock: true,
                content: tips
            });
        },

        dev_host: 'o.qcloud.com',					// 开发者中心host
        dev_key: 'developer-center',				// 开发者中心path
        bk_dev_key: 'developer-center',
        bk_product_key: 'console',
        bk_admin_host: 'admin.o.oa.com',
        bk_admin_key: 'admin',
        bk_key: 'o',
        app_key: 'app',
        app_domain: '.qcloudapps.com',
        app_test_key: 'test',
        qq_login_prefix: 'http://', // qq登录链接前缀
        bk_host_test: 'dev.o.qcloud.com',
        bk_host: 'o.qcloud.com',
        tencent_legal_host: ['dev.o.qcloud.com', 'o.qcloud.com',],
        campus_leagl_host: ['dev1.bk.tencent.com', 'dev.bk.tencent.com', 'bk.tencent.com'],

        init: function () {
            var host = location.hostname;
            // 初始化域名
            if (jQuery.inArray(host, Home.corefunc.tencent_legal_host) >= 0 || jQuery.inArray(host, Home.corefunc.campus_leagl_host) >= 0) {
                Home.corefunc.bk_host = host;
                Home.corefunc.bk_host_test = host;
                Home.corefunc.dev_host = host;
            }
            // 初始化path
            if (jQuery.inArray(host, Home.corefunc.campus_leagl_host) >= 0) {
                // 平台路径
                Home.corefunc.bk_product_key = 'campus';
                // 开发者中心路径
                Home.corefunc.dev_key = 'campus/developer-center';
                Home.corefunc.bk_dev_key = 'campus/developer-center';
            }
        },

        get_app_url: function (appcode) {
            Home.corefunc.init();
            // todo 使用独立域名链接
            var host_now = window.location.host;
            var path_now = window.location.pathname;
            var path_list = path_now.split('/');
//	if(path_list[1] == Home.corefunc.bk_product_key){
//		var app_url = 'http://' + Home.corefunc.app_key + '.' + host_now;
//	}else if(path_list[1] == Home.corefunc.bk_admin_key){
//		var app_url = 'http://' + Home.corefunc.app_key + '.' + host_now + '/test';
//	}else{
//		var app_url = 'http://' + host_now +'/s'; //测试使用
//	}
            if (path_list[1] == Home.corefunc.bk_product_key) {
                var app_url = 'http://' + appcode + Home.corefunc.app_domain;
            }
            return app_url;
        },

        get_bk_url: function () {
            // 初始化bk_host信息
            Home.corefunc.init();
            var host_now = window.location.host;
            var host_list = host_now.split('.');
            var path_now = window.location.pathname;
            var path_list = path_now.split('/');
            if (host_list[0] == Home.corefunc.app_key) {
                var bk_url = 'http://' + Home.corefunc.bk_host + '/' + Home.corefunc.bk_product_key;
            } else {
                if (host_now == Home.corefunc.bk_admin_host) {
                    var bk_url = 'http://' + Home.corefunc.bk_host + '/' + Home.corefunc.bk_product_key;
                } else {
                    var bk_url = 'http://' + host_now + '/' + Home.corefunc.bk_product_key;
                }
            }
            return bk_url;
        },

        get_urlprefix: function () {
            Home.corefunc.init();
            var host_now = window.location.host;
            var path_now = window.location.pathname;
            var path_list = path_now.split('/');
            if (path_list[1] == Home.corefunc.bk_product_key) {
                var urlprefix = '/' + Home.corefunc.bk_product_key + '/v3/';
            } else if (path_list[1] == Home.corefunc.bk_admin_key) {
                var urlprefix = '/' + Home.corefunc.bk_admin_key + '/v3/';
            } else {
                var urlprefix = '/';
            }
            return urlprefix;
        },

        get_bk_path: function () {
            Home.corefunc.init();
            var host_now = window.location.host;
            var path_now = window.location.pathname;
            var path_list = path_now.split('/');
            if (path_list[1] == Home.corefunc.bk_product_key) {
                var bk_path = '/' + Home.corefunc.bk_product_key;
            } else if (path_list[1] == Home.corefunc.bk_admin_key) {
                var bk_path = '/' + Home.corefunc.bk_admin_key;
            } else {
                var bk_path = '';
            }
            return bk_path;
        },

        get_app_code: function () {
            Home.corefunc.init();
            var host_now = window.location.host;
            var host_list = host_now.split('.');
            var path_now = window.location.pathname;
            var path_list = path_now.split('/');
            var path_len = path_list.length;
            if (host_list[0] == Home.corefunc.app_key) {
                if (path_list[1] == Home.corefunc.app_test_key) {
                    var app_code = path_len > 2 ? path_list[2] : '';
                } else {
                    var app_code = path_list[1];
                }
            } else {
                if (path_list[1] == Home.corefunc.bk_admin_key || path_list[1] == Home.corefunc.bk_product_key) {
                    var app_code = path_len > 2 ? path_list[2] : '';
                    if (path_list[2] == 's' || path_list[2] == 'v3') {
                        var app_code = path_len > 3 ? path_list[3] : '';
                    }
                } else {
                    var app_code = '';
                }
            }
            return app_code;
        },
    }
})()

var urlPrefix = Home.corefunc.get_urlprefix();				//URL前缀
var ajaxUrl = urlPrefix + 'ajax.php';						//所有ajax操作指向页面

var staticUrl = Home.corefunc.get_bk_url() + '/static/v3/';
var oldstaticUrl = Home.corefunc.get_bk_url() + '/static/';
var oldstaticUrl_master = oldstaticUrl;


var app_path = "public/application/extapp/";
var app_code = "";
var appUrl = app_path + app_code + "index.php";

var template_path = "template/default/";
var images_path = template_path + "images/home/";
var apptemplate_path = template_path + "Home/app/extapp/";
var appTempUrl = template_path + app_code + "/index.htm";


//csrftoken处理js
//	document.write(" <script lanague=\"javascript\" src=\""+oldstaticUrl_master+"csrftoken.js?v=1\"> <\/script>");
/*
 * 蓝鲸平台API
 */
Home.api = (function () {
    return {

//判断该应用是否是 工具app
        is_tool_app: function (app_code) {
            if ($.inArray(app_code, tool_apps) != -1) {
                return true;
            } else {
                return false;
            }
        },

//	通过宣传链接打开应用
        open_app_by_desk: function (app_code, app_url) {
            //判断是否添加了该应用
            return_msg = Home.api.is_user_added_app(app_code);
            var is_added = return_msg[0]; 			//应用是否添加（true添加、false未添加）
            var realappid = return_msg[1];			//应用真正id
            //打开app
            if (is_added == false && realappid != "") {
                //用户没有添加该应用则打开应用市场详细页
                Home.window.create_market(realappid);
            } else if (is_added == true) {
                //用户添加了该应用则打开应用
                //获取app的所有信息（realappid、appid、type等）
                var msg = app_msg(app_code);
                console.log(msg);
                //判断获取应用信息是否发生异常
                if (msg["error"] == "E100") {
                    ZENG.msgbox.show('应用不存在！', 5, 3000);
                } else if (msg["error"] == "E501" || msg["error"] == "E502" || msg["error"] == "E503") {
                    ZENG.msgbox.show('应用加载失败，请重试', 5, 3000);
                } else if (msg["error"] == "E400") {
                    ZENG.msgbox.show('您没有操作该应用的权限！', 5, 3000);
                } else if (msg["error"] == "E200") {
                    ZENG.msgbox.show('应用已下架！', 5, 3000);
                } else if (msg["error"] == "E300") {
                    ZENG.msgbox.show('应用正在开发中！', 5, 3000);
                } else {
                    var appid = msg["appid"];
                    // 通过appid和app_url打开应用（判断应用类型） TOTEST
                    if (msg['display_type'] == 'app') {
                        Home.window.create(appid, app_url);
                    } else {
                        Home.widget.create(appid); //TODO
                    }
                }
            } else {
                //应用不存在、已下架、未提测三种情况下提示信息
                ZENG.msgbox.show(return_msg[2], 5, 3000);
            }
        },

        /*
         * 其他位置通过app_code及链接打开应用
         * 应用没有添加则获取app信息时默认添加到desk1（修改为不添加到桌面直接打开）
         * app_code 应用编码
         * app_url 指定url   可选
         * refresh_tips true：弹出框刷新提醒   可选
         */
        open_app_by_other: function (app_code, app_url, refresh_tips) {
            //判断是否是指定的系统应用
            if (Home.api.is_tool_app(app_code)) {
                if (app_code == "appstore") {
                    //打开应用市场
                    Home.window.create_market(app_url);
                } else if (app_code == "app_statistics") {
                    //打开统计
                    Home.window.create_app_statistics(app_url);
                } else if (app_code == "notice") {
                    //打开公告
                    create_window.notice(app_url);
                } else if (app_code == "user_ce") {
                    create_window.user_ce(app_url);
                } else if (app_code == "user_center") {
                    create_window.user_center(app_url);
                } else if (app_code == 'union_manage') {
                    // 打开社团管理
                    create_window.union_manage(app_url);
                }
            } else {
                //打开其他应用，获取app的信息（realappid和appid）
                var msg = app_msg(app_code);
                //判断获取应用信息是否发生异常
                if (msg["error"] == "E100") {
                    ZENG.msgbox.show('应用不存在！', 5, 3000);
                } else if (msg["error"] == "E501" || msg["error"] == "E502" || msg["error"] == "E503") {
                    ZENG.msgbox.show('应用加载失败，请重试', 5, 3000);
                } else if (msg["error"] == "E400") {
                    ZENG.msgbox.show('您没有操作该应用的权限！', 5, 3000);
                } else if (msg["error"] == "E200") {
                    ZENG.msgbox.show('应用已下架！', 5, 3000);
                } else if (msg["error"] == "E300") {
                    ZENG.msgbox.show('应用正在开发中！', 5, 3000);
                } else {
                    var appid = msg["appid"];
                    //通过appid和app_url打开应用   TOTEST
                    if (msg['display_type'] == 'app') {
                        if (!appid) {   //用户添加app时，appid为用户id
                            appid = app_code;//用户未添加app时，appid为app_code
                            isnotadd = 1;
                        } else {
                            isnotadd = 0;
                        }
                        if (refresh_tips == true) { //提醒框弹出
                            Home.window.create(appid, app_url, app_code, isnotadd);
                        } else {					 //提醒框不弹出
                            Home.window.create(appid, app_url, '', isnotadd);
                        }
                    } else {
                        Home.widget.create(appid);  //TODO
                    }
                }
            }
        },

//	判断用户是否添加了该应用
        is_user_added_app: function (app_code) {
            //判断用户是否添加了该应用
            var is_added = false;  			//初始值，默认没有添加
            var realappid = "";			 	//realappid默认为空
            var tips_msg = "应用不存在！";              //提示信息
            //请求是否添加应用返回值，和app realid
            $.ajax({
                url: urlPrefix + "is_user_added_app/" + app_code + "/",
                success: function (app) {
                    if (app != null) {
                        if (app["error"]) {
                            //错误信息
                            is_added = false;
                            realappid = "";
                            if (app["error"] == "E100") {
                                tips_msg = "应用不存在！";
                            } else if (app["error"] == "E501" || app["error"] == "E502" || app["error"] == "E503") {
                                tips_msg = '应用加载失败，请重试'
                            } else if (app["error"] == "E400") {
                                tips_msg = "您没有操作该应用的权限！";
                            } else if (app["error"] == "E200") {
                                tips_msg = "应用已下架！";
                            } else if (app["error"] == "E300") {
                                tips_msg = "应用正在开发中！";
                            }
                        } else {
                            //app realid信息
                            is_added = app["result"]; 			//应用是否添加，true为添加，false为未添加
                            realappid = app["realappid"];  		//应用真实id
                        }
                    } else {
                        is_added = false;
                        realappid = "";
                        tips_msg = "应用不存在！";
                    }
                },
                type: "POST",
                async: false
            })
            return [is_added, realappid, tips_msg]   //返回值
        },

//	TODO打开应用时删除桌面应用更新图标
        app_del_tips: function (obj, app_code) {
            var $obj = $(obj); // 桌面该应用
            var app_code = $obj.attr('app_code');
            $obj = $('a[app_code=' + app_code + ']');
            var $img = $obj.parent().find('.grd')
            var $img_obj = $obj.find('img');
            if ($img.length) {
                $img.remove(); //用户打开该应用时去除更新logo
                $(obj).attr('is_tips', '0');
                //不显示更新信息时记录用户信息
                $.get('/developer/online_msg/' + app_code + '/user/', function (data) {
                    //返回信息
                }, 'json');
            }
            //删除桌面应用更新图标、记录用户打开应用信息
            $.get(urlPrefix + "app_user_open/" + app_code + "/", function (data) {
                //返回信息
            }, 'json');
        },
    }
})();

/**
 * 全屏插件
 * http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/
 */
/*
(function(){var d={supportsFullScreen:false,isFullScreen:function(){return false;},requestFullScreen:function(){},cancelFullScreen:function(){},fullScreenEventName:"",prefix:""},c="webkit moz o ms khtml".split(" ");if(typeof document.cancelFullScreen!="undefined"){d.supportsFullScreen=true;}else{for(var b=0,a=c.length;b<a;b++){d.prefix=c[b];if(typeof document[d.prefix+"CancelFullScreen"]!="undefined"){d.supportsFullScreen=true;break;}}}if(d.supportsFullScreen){d.fullScreenEventName=d.prefix+"fullscreenchange";d.isFullScreen=function(){switch(this.prefix){case"":return document.fullScreen;case"webkit":return document.webkitIsFullScreen;default:return document[this.prefix+"FullScreen"];}};d.requestFullScreen=function(e){return(this.prefix==="")?e.requestFullScreen():e[this.prefix+"RequestFullScreen"]();};d.cancelFullScreen=function(e){return(this.prefix==="")?document.cancelFullScreen():document[this.prefix+"CancelFullScreen"]();};}if(typeof jQuery!="undefined"){jQuery.fn.requestFullScreen=function(){return this.each(function(){if(d.supportsFullScreen){d.requestFullScreen(this);}});};}window.fullScreenApi=d;})();
*/
(function () {
    var d = {
            supportsFullScreen: false,
            isFullScreen: function () {
                return false;
            },
            requestFullScreen: function () {
            },
            cancelFullScreen: function () {
            },
            fullScreenEventName: "",
            prefix: ""
        },
        c = "webkit moz o ms khtml".split(" ");
    if (typeof document.cancelFullScreen != "undefined") {
        d.supportsFullScreen = true;
    } else {
        for (var b = 0,
                 a = c.length; b < a; b++) {
            d.prefix = c[b];
            if (typeof document[d.prefix + "CancelFullScreen"] != "undefined") {
                d.supportsFullScreen = true;
                break;
            }
        }
    }
    if (d.supportsFullScreen) {
        d.fullScreenEventName = d.prefix + "fullscreenchange";
        d.isFullScreen = function () {
            switch (this.prefix) {
                case "":
                    return document.fullScreen;
                case "webkit":
                    return document.webkitIsFullScreen;
                default:
                    return document[this.prefix + "FullScreen"];
            }
        };
        d.requestFullScreen = function (e) {
            return (this.prefix === "") ? e.requestFullScreen() : e[this.prefix + "RequestFullScreen"]();
        };
        d.cancelFullScreen = function (e) {
            return (this.prefix === "") ? document.cancelFullScreen() : document[this.prefix + "CancelFullScreen"]();
        };
    }
    if (typeof jQuery != "undefined") {
        jQuery.fn.requestFullScreen = function () {
            return this.each(function () {
                if (d.supportsFullScreen) {
                    d.requestFullScreen(this);
                }
            });
        };
    }
    window.fullScreenApi = d;
})();


//	全屏模式	Fullscreen

// 判断各种浏览器，找到正确的方法
function launchFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

// 启动全屏!
//	launchFullScreen(document.documentElement); // 整个网页
//	launchFullScreen(document.getElementById("videoElement")); // 某个页面元素


// 判断浏览器种类	退出全屏模式!
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// 退出全屏模式!
//	exitFullscreen();

//	百度的判断代码：Javascript 判断客户端是否为 PC 还是手持设备，有时候项目中需要用到，很方便的检测，源生的哦，方法一共有两种
function uaredirect(f) {
    try {
        if (document.getElementById("bdmark") != null) {
            return
        }
        var b = false;
        if (arguments[1]) {
            var e = window.location.host;
            var a = window.location.href;
            if (isSubdomain(arguments[1], e) == 1) {
                f = f + "/#m/" + a;
                b = true
            } else {
                if (isSubdomain(arguments[1], e) == 2) {
                    f = f + "/#m/" + a;
                    b = true
                } else {
                    f = a;
                    b = false
                }
            }
        } else {
            b = true
        }
        if (b) {
            var c = window.location.hash;
            if (!c.match("fromapp")) {
                if ((navigator.userAgent.match(/(iPhone|iPod|Android|ios|SymbianOS)/i))) {
                    location.replace(f)
                }
            }
        }
    } catch (d) {
    }
}

function isSubdomain(c, d) {
    this.getdomain = function (f) {
        var e = f.indexOf("://");
        if (e > 0) {
            var h = f.substr(e + 3)
        } else {
            var h = f
        }
        var g = /^www\./;
        if (g.test(h)) {
            h = h.substr(4)
        }
        return h
    };
    if (c == d) {
        return 1
    } else {
        var c = this.getdomain(c);
        var b = this.getdomain(d);
        if (c == b) {
            return 1
        } else {
            c = c.replace(".", "\\.");
            var a = new RegExp("\\." + c + "$");
            if (b.match(a)) {
                return 2
            } else {
                return 0
            }
        }
    }
}

function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
//        window.location.href=B页面;
//		window.location.href="<{$root}>/phone.php/app/mobile/backurl/"+window.location.href;
        window.location.href = "http://www.zongdongyang.cn/home.php/app/mobile/backurl/" + window.location.href;
    }
}
