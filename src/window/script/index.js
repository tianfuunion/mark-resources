/*
 * 首页
 *
 */

// 绑定dock的按钮事件
$(function(){
// 打开个人中心
	$('#desk li[name="user"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.user();
	});
// 添加应用
	$('#desk li[name="addapp"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.app();
		$('#app section').load('home.php/app/appstore');
	});

// 打开我的网盘
	$('#desk li[name="cloud"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.cloud();
	});

// 打开回收站
	$('#desk li[name="recycle"]').on('mousedown', function(){
			return false;
		}).on('click', function(e){
			Home.create.recycle();
		});
// 打开我的好友
	$('#desk li[name="imchat"]').on('mousedown', function(){
			return false;
		}).on('click', function(e){
			Home.create.imchat();
		});
// 打开我的信息
	$('#desk li[name="message"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.message();
	});

// 打开应用商店
	$('#desk li[name="app"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.app();
	});

//	打开开发者中心
	$('#desk li[name="developer"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.developer();
	});
//	打开后台管理
	$('#desk li[name="admin"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.admin();
	});

//	Webcam
	$('#desk li[name="cam"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.cam();
	});

	//	Webcam
	$('#desk li[name="crm"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.crm();
	});

//打开 China Go
	$('#desk li[name="go"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.chinago();
	});

//打开 Home App
	$('#desk li[name="home"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		window.location.href="http://www.zongdongyang.cn/home.php/app/mobile/backurl/web/uid/1";
	});

//	打开记事本 notepad
	$('#desk li[name="notepad"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.notepad();
	});
//	打开视频 Video
	$('#desk li[name="video"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.video();
	});
//	打开音乐 music
	$('#desk li[name="music"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.music($(this));
	});
//	打开图片
	$('#desk li[name="picture"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.picture();
	});
//	打开我的文档 Word
	$('#desk li[name="word"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.word();
	});
//	打开我的表格 Excel
	$('#desk li[name="excel"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.excel();
	});
//	打开我的PDF
	$('#desk li[name="pdf"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.pdf();
	});

//	Window
	$('#desk li[name="window"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.window();
	});
//	Card
	$('#desk li[name="card"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.card();
	});
//	Block
	$('#desk li[name="block"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.block();
	});
//打开Show
	$('#desk li[name="show"]').on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.show();
	});
// 打开统计
	$("#desk #app_statistics").on('mousedown', function(){
			return false;
		}).on('click', function(e){
			Home.window.create_app_statistics();
		});

// 打开更多
	$("#desk #more").on('mousedown', function(){
			return false;
		}).on('click', function(e){
			Home.create.more_system_app();
		});

// 打开关于蓝鲸
	$("#desk #aboutus").on('mousedown', function(){
			return false;
		}).on('click', function(e){
			//Home.create.about_Home();
			window.open('http://bk.tencent.com/home/', '_blank');
		});
// 打开关于蓝鲸
	$("#desk #aboutus_ied").on('mousedown', function(){
			return false;
		}).on('click', function(e){
			Home.create.about_Home_ied();
		});
// 打开社团管理
	$("#desk #union_manage").on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.union_manage();
	});
// 打开Userce
	$("#desk #user_ce").on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.user_ce();
	});

// 打开公告
	$("#desk #notice").on('mousedown', function(){
			return false;
		}).on('click', function(e){
			Home.create.notice();
		});
// 打开 用户管理
	$("#desk #user_manage").on('mousedown', function(){
			return false;
		}).on('click', function(e){
			Home.create.user_manage();
		});

// 打开Userce
	$("#desk #one_stop").on('mousedown', function(){
		return false;
	}).on('click', function(e){
		Home.create.one_stop();
	});
//	登录
	//-------------
	//弹出登录
		$(".nav_login").hover(function (){
			$(this).stop().animate({
				opacity: '1'
			}, 600);
		}, function () {
			$(this).stop().animate({
				opacity: '0.6'
			}, 1000);
		}).on('click', function () {
			alert('sss');
			$("body").append("<div id='mask'></div>");
			$("#mask").addClass("mask").fadeIn("slow");
			$("#LoginBox").fadeIn("slow");
		});
		//
		//按钮的透明度
		$("#loginbtn").hover(function () {
			$(this).stop().animate({
				opacity: '1'
			}, 600);
		}, function () {
			$(this).stop().animate({
				opacity: '0.8'
			}, 1000);
		});
		//文本框不允许为空---按钮触发
		$("#loginbtn").on('click', function () {
			var txtName = $("#txtName").val();
			var txtPwd = $("#txtPwd").val();
			if (txtName == "" || txtName == undefined || txtName == null) {
				if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
					$(".warning").css({ display: 'block' });
				}
				else {
					$("#warn").css({ display: 'block' });
					$("#warn2").css({ display: 'none' });
				}
			}
			else {
				if (txtPwd == "" || txtPwd == undefined || txtPwd == null) {
					$("#warn").css({ display: 'none' });
					$(".warn2").css({ display: 'block' });
				}
				else {
					$(".warning").css({ display: 'none' });
				}
			}
		});
		//文本框不允许为空---单个文本触发
		$("#txtName").on('blur', function () {
			var txtName = $("#txtName").val();
			if (txtName == "" || txtName == undefined || txtName == null) {
				$("#warn").css({ display: 'block' });
			}
			else {
				$("#warn").css({ display: 'none' });
			}
		});
		$("#txtName").on('focus', function () {
			$("#warn").css({ display: 'none' });
		});
		//
		$("#txtPwd").on('blur', function () {
			var txtName = $("#txtPwd").val();
			if (txtName == "" || txtName == undefined || txtName == null) {
				$("#warn2").css({ display: 'block' });
			}
			else {
				$("#warn2").css({ display: 'none' });
			}
		});
		$("#txtPwd").on('focus', function () {
			$("#warn2").css({ display: 'none' });
		});
		//关闭
		$(".close_btn").hover(function () { $(this).css({ color: 'black' }) }, function () { $(this).css({ color: '#999' }) }).on('click', function () {
			$("#LoginBox").fadeOut("fast");
			$("#mask").css({ display: 'none' });
		});


	//-------------
	// 注销
	$("#desk #logout").on('mousedown', function(){
			return false;
		}).on('click', function(e){
			var dialog = art.dialog({
			    title: '注销确认',
				content: '注销蓝鲸后需要重新登录，您确认注销?',
			    fixed: true,
			    id: 'logout',
			    icon: 'question',
			    okVal: '确定',
			    ok: function () {
			    	//退出登录
			    	Home.base.logout();
			    },
			    cancel: true
			});

		});
	// 注销
	$("#desk #logout_ied").on('mousedown', function(){
			return false;
		}).on('click', function(e){
			var dialog = art.dialog({
			    title: '注销确认',
				content: '注销蓝鲸后需要重新登录，您确认注销?',
			    fixed: true,
			    id: 'logout',
			    icon: 'question',
			    okVal: '确定',
			    ok: function () {
			    	//退出登录
			    	Home.base.logout_ied();
			    },
			    cancel: true
			});

		});
});


/*
 * 获取桌面app list，通过宣传链接打开app
 * 应用没有添加则跳转到应用市场应用详细页面
 */
$(function(){
	// TODO
	// 通过链接打开应用，如果没有添加该应用，则打开应用市场页面.
	var app_code = "",
		app_url = "",
		collection = "",
		referer = "",
		search_str = window.location.search,
		params = search_str.substring(1).split("&");
	for(var i=0; i<params.length; i++){
		var	param = params[i].split("=");
		// 默认打开某个app
		if(param[0]=="app"){
			app_code = params[i].replace("app=", "");
		}
		// 打开app的某个页面(如果为空，则打开app的首页). 注意，这里的url，如果是比较复杂的，则一定要进行utf-8编码(可以使用encodeURIComponent()进行编码)
		if(param[0]=="url"){
			app_url = decodeURIComponent(params[i].replace("url=", ""));
		}
		//合集应用链接
		if(i==0 && param[0]=="collection"){
			collection = params[i].replace("collection=", "");
		}
		if(i==1 && param[0]=='referer'){
			referer = params[i].replace("referer=", "")
		}
	}
	if(app_code){
		// 如果是系统应用（码头应用），则直接打开系统应用
		if(Home.api.is_tool_app(app_code)){
			if(app_code == "market"){
				//打开应用市场
				Home.window.create_market();
			}else if(app_code == "app_statistics"){
				//打开统计
				Home.window.create_app_statistics(app_url);
			}else if(app_code == "developer"){
				//打开开发者中心
				Home.window.create_developer(app_url);
			}else if(app_code == "about_Home"){
				//打开关于蓝鲸
				Home.create.about_Home(app_url);
			}else if(app_code == "notice"){
				//打开消息
				Home.create.notice(app_url);
			}else if(app_code == "user_ce"){
				//打开用户反馈
				Home.create.user_ce(app_url);
			}else if(app_code == "app_audit"){
				//打开App评审
				Home.create.app_audit(app_url);
			}else if(app_code == "user_center"){
				//打开个人中心
				Home.create.user_center(app_url);
			}else if(app_code == "user_manage"){
				// 用户管理
				Home.create.user_manage(app_url);
			}else if(app_code == "permission_center"){
				//统一权限管理
				Home.create.permission_center(app_url);
			}else if(app_code == "app_collection"){
				//应用合集
				Home.create.app_collection(app_url);
			}else if(app_code == 'union_manage'){
				Home.create.union_manage(app_url);
			}
		}else{
			// 打开该app（没有添加该应用则需要先给用户添加应用再打开）
			Home.api.open_app_by_desk(app_code, app_url);
		}
	}else if(collection && referer){
		app_url = Home.corefunc.get_bk_path() + '/app_collection/show_app_collection/?collection=' + collection + '&referer=' + referer;
		Home.create.app_collection(app_url, "collection");
	}
	// 添加提示信息
	//app_add_tips('');
	// 开发框架更新提示
	//developer_center_update('developer', 1);
});

//通过宣传链接打开应用
function open_app_by_desk(app_code, app_url){
	Home.api.open_app_by_desk(app_code, app_url);
}


/*
 * 其他位置通过app_code及链接打开应用
 * 应用没有添加则获取app信息时默认添加到desk1（修改为不添加到桌面直接打开）
 * app_code 应用编码
 * app_url 指定url   可选
 * refresh_tips true：弹出框刷新提醒   可选
 */
function open_app_by_other(app_code, app_url, refresh_tips){
	Home.api.open_app_by_other(app_code, app_url, refresh_tips);
}
