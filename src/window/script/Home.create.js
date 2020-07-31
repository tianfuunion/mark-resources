/*
 *	基于 Home.window.createTemp(); 方法创建的应用
 *
 */

Home.create = (function(){return{
get_tips: function(tips){
	var host_now = window.location.host;
	if(host_now == '127.0.0.1' || host_now == 'localhost'){
		host_now = 'www.zongdongyang.cn/home.php';
	}
//填充提示信息
	var tips = tips ? tips : "温馨提示：此功能不支持在此使用，如需体验，请跳转至<a target='_blank' href='http://"+host_now+"'><font style='color:red;font-weight:bold;'>"+host_now+"</font></a>！";
	dialog({
	    title: "温馨提示",
	    width: 340,
	    icon: 'warning',
	    lock: true,
	    content: tips
	}).show();
},

//	主题设置
themes : function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			appid:'setthemes',
			id : 'setthemes',
			title : '主题设置',
			url : "/home.php/index/themes",
			icon : images_path + 'shortcut/tool_app/default_icon.png',
			width : 580,
			height : 520,
			isresize : false,
			isflash : false
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	桌面设置	-->		考虑删除
desksetting : function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			appid:'desksetting',
			id : 'desksetting',
			title : '桌面设置',
			url : '/home.php/index/desksetting',
			width : 750,
			height : 450,
			isresize : false,
			isflash : false
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	系统设置
setting: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			appid:'setting',
			id : 'setting',
			title : '系统设置',
			url : '/home.php/index/setting',
			width : 700,
			height : 540,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	更换头像
avatar: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			appid:'setavatar',
			id : 'setavatar',
			title : '更换头像',
			url : '/home.php/user/avatar',
			width : 600,	//480
			height : 460,	//490
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	用户设置
setbasic: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			appid:'setbasic',
			id : 'sebasic',
			title : '个性设置',
			url : 'home.php/user/setbasic',
			width : 700,
			height: 540,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	Donate 捐赠
donate: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			appid:'donate',
			id : 'donate',
			title : '公益捐赠',
			url : 'home.php/index/donate',
			width : 800,
			height: 500,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	Debug
debug: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'widget',
			appid:'debug',
			id : 'debug',
			title : '公益捐赠',
			url : 'home.php/index/debug',
			width : 400,
			height: 400,
			top:0,
			left:0,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	Share 分享
share: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'card',
			appid:'share',
			id : 'share',
			title : '分享',
			url : 'home.php/index/share',
			width : 500,
			height: 250,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	个人中心--》卡片式
user: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'card',
			id : 'user',
			app_code: 'user',
			title : '个人中心',
			url : 'home.php/user',
			maxwidth:'100',
			width : 460,
			height: 610,
			icon : images_path + 'shortcut/tool_app/user_center.png',
			isresize : '1',
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	我的云盘
cloud: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'window',
			id	 : 'cloud',
			app_code: 'cloud',
			title : '我的云盘',
			url	  : 'home.php/cloud',
			maxwidth:'100%',
			width : 921,
			height: 560,
			isresize : true,
			//isopenmax: true,
			icon : images_path + 'shortcut/tool_app/aboutus.png',
			isflash : false,
			isstatebar : true,
			isstar : true,
			ishelp : true,
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},

//	传输精灵
nexstar: function(app_url){
	try{
		parent.Home.window.createTemp({
			type  : 'nexstar',
			appid : 'nexstar',
			id	  : 'nexstar',
			title : '传输精灵',
			url   : 'home.php/cloud/nexstar',
			width : 800,
			height: 500,
			icon  : images_path + 'shortcut/tool_app/nexstar.png',
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	进度条
progress: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'tool',
			appid:'progress',
			id : 'progress',
			title : '正在上传',
			url : 'home.php/cloud/progress',
			width : 460,
			height : 170,
			icon : images_path + 'shortcut/tool_app/union_manage.png',
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	回收站
recycle: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'window',
			id : 'recycle',
			app_code: 'recycle',
			title : '回收站',
			url : 'home.php/recycle',
			maxwidth:'100%',
			width : 800,
			height : 500,
			isresize : true,
//			isopenmax: true,
			icon : images_path + 'shortcut/tool_app/union_manage.png',
			isflash : false,
			refresh : false
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},
//	打开我的好友
imchat: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'card',
			id : 'imchat',
			app_code: 'imchat',
			title : '我的好友',
			url : 'home.php/imchat',
			maxwidth:'100%',
			width : 280,
			height: 580,
			isresize : false,
//			isopenmax: true,
			icon : images_path + 'shortcut/tool_app/user_manage.png',
//			isflash : false,
			refresh : false
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	打开聊天窗口
chat: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'card',
			id : 'chat',
			app_code: 'chat',
			title : '我的信息',
			url : 'home.php/imchat/chat',
			maxwidth:'100%',
			width : 586,
			height : 546,
			icon : images_path + 'shortcut/tool_app/user_center.png',
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	打开我的信息
message: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			id : 'message',
			app_code: 'message',
			title : '我的信息',
			url : 'home.php/message',
			maxwidth:'100%',
			width : 586,
			height : 510,
			icon : images_path + 'shortcut/tool_app/user_center.png',
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	打开应用中心
app: function(app_id){
	Home.window.createTemp({
		type : 'block',
		id   : 'app',
		app_code : 'app',
		title : '应用中心',
		url   : 'home.php/app',
		maxwidth:'100%',
		width : 1000,
		height: 560,
		icon : images_path + 'shortcut/tool_app/market.png',
		isflash : false,
		//isresize: true,
		refresh : false //需要强制刷新
	});
},

//	开发者中心
developer: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			id : 'developer',
			app_code: 'developer',
			title : '开发者中心',
			url : 'home.php/developer',
			maxwidth:'100%',
			width : 1000,
			height : 560,
			isresize : true,
			//isopenmax: true,
			icon : images_path + 'shortcut/tool_app/developer.png',
			isstar : true,
			ishelp : true,
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},


//	创建APP
createapp: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			id : 'createapp',
			app_code: 'createapp',
			title : '创建应用',
			url : 'home.php/developer/createapp',
			maxwidth:'100%',
			width : 1000,
			height : 560,
			isresize : true,
			//isopenmax: true,
			icon : images_path + 'shortcut/tool_app/developer.png',
			isstar : true,
			ishelp : true,
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},

//	Admin
admin: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'window',
			id : 'admin',
			app_code: 'admin',
			title : '管理后台',
			url : 'home.php/admin',
			maxwidth:'100%',
			width : 1000,
			height : 560,
			isresize : true,
			//isopenmax: true,
			icon : images_path + 'shortcut/tool_app/admin.png',
			isstar : true,
			ishelp : true,
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},
//	记事本notepad--》卡片式
notepad: function(obj){
	try{
		parent.Home.window.createTemp({
			type : 'window',
			id : 'notepad',
			app_code: 'notepad',
			url : 'home.php/app/notepad',
			title: $(obj).attr('title') ? $(obj).attr('title') : '记事本',
			content:$(obj).attr('name') ? $(obj).attr('name') : '这里输入内容',
			maxwidth:'100%',
			width : 700,
			height : 500,
			isresize : true,
		}, obj);
	}catch(err){
		Home.create.get_tips();
	}
},
//	我的视频 Video--》卡片式
video: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'window',
			id : 'video',
			app_code: 'video',
			title : '我的视频',
			url : 'home.php/app/video',
			maxwidth:'100%',
			width : 630,
			height : 460,
			isresize : true,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	我的音乐 Music--》卡片式
music: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			id : 'music',
			app_code: 'music',
			title : '我的音乐',
			url : 'home.php/app/music/fid/'+app_url.attr('fid')+'/sid/'+ app_url.attr('sid')+'/name/'+ app_url.attr('name'),
			maxwidth:'100%',
			width : 700,
			height : 500,
			isresize : true,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	我的图片 picture --》卡片式
picture: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'window',
			id : 'picture',
			app_code: 'picture',
			title : '我的图片',
			url : 'home.php/app/picture/fid/'+app_url.attr('fid')+'/sid/'+ app_url.attr('sid')+'/name/'+ app_url.attr('name'),
			maxwidth:'100%',
			width : 800,
			height : 500,
			isresize : true,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	我的文档 Word --》卡片式
word: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			id : 'word',
			app_code: 'word',
			title : '我的文档',
			url : 'home.php/app/word',
			maxwidth:'100%',
			width : 800,
			height : 500,
			isresize : true,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	我的表格 Excel --》卡片式
excel: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			id : 'excel',
			app_code: 'excel',
			title : '我的表格',
			url : 'home.php/app/excel',
			maxwidth:'100%',
			width : 700,
			height : 400,
			isresize : true,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},
//	我的文档 PDF --》卡片式
pdf: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			id : 'pdf',
			app_code: 'pdf',
			title : '我的PDF',
			url : 'home.php/app/pdf',
			maxwidth:'100%',
			width : 700,
			height : 400,
			isresize : true,
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	Cam
cam: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'window',
			id : 'cam',
			app_code: 'cam',
			title : 'Cam',
			url : 'home.php/cam',
			maxwidth:'100%',
			width : 900,
			height : 560,
			isresize : true,
			//isopenmax: true,
//			icon : images_path + 'shortcut/tool_app/webcam.png',
			isstar : true,
			ishelp : true,
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},

//	CRM
crm: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'window',
			id : 'cam',
			app_code: 'crm',
			title : 'CRM',
			url : 'home.php/crm',
			maxwidth:'100%',
			width : 900,
			height : 560,
			isresize : true,
			//isopenmax: true,
//			icon : images_path + 'shortcut/tool_app/webcam.png',
			isstar : true,
			ishelp : true,
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},

//	Baby
baby: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'card',
			id : 'baby',
			app_code: 'baby',
			title : 'Baby',
			url : 'home.php/baby',
			width : 300,
			height : 350,
			isresize : true,
			//isopenmax: true,
//			icon : images_path + 'shortcut/tool_app/webcam.png',
			isstar : true,
			ishelp : true,
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},


//	Show
show : function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			id : 'Show',
			app_code: 'Show',
			title : 'Show',
			url : 'home.php/app/show',
			width : 1000,
			height : 900,
			icon : images_path + 'shortcut/tool_app/user_center.png',
			isresize : true,
			istitlebar : false,
			istitlebarFullscreen : false,
			issetbar : true,
			isflash : false,
			issetstar : true,	//	是否显示评分按钮
			issethelp : true,	//	是否显示帮助按钮
			issetrefresh : true, // 是否显示刷新按钮
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	China Go
chinago : function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'app',
			id : 'go',
			app_code: 'go',
			title : 'China Go',
			url : 'home.php/app/chinago',
			width : 800,
			height : 600,
			icon : images_path + 'shortcut/tool_app/user_center.png',
			isresize : true,
			istitlebar : false,
			istitlebarFullscreen : false,
			issetbar : true,
			isflash : false,
			issetstar : true,	//	是否显示评分按钮
			issethelp : true,	//	是否显示帮助按钮
			issetrefresh : true, // 是否显示刷新按钮
		}, app_url);
	}catch(err){
		Home.create.get_tips();
	}
},

//	Window	窗口
window: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'window',
			id : 'Window',
			app_code: 'Window',
			title : 'Window',
			url : 'home.php/clouds',
			width : 600,
			height : 500,
			isresize : true,
			//isopenmax: true,
			icon : images_path + 'shortcut/tool_app/aboutus.png',
			isflash : false,
			isstatebar : true,
			isstar : true,
			ishelp : true,
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},
//	Card	窗口
card: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'card',
			id : 'card',
			app_code: 'card',
			title : 'Card',
			url : 'home.php/clouds',
			maxwidth:'100',
			width : 600,
			height : 500,
			isresize : true,
			//isopenmax: true,
			icon : images_path + 'shortcut/tool_app/aboutus.png',
			isflash : false,
			isstatebar : true,
			isstar : true,
			ishelp : true,
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},

//	Block	窗口
block: function(app_url){
	try{
		parent.Home.window.createTemp({
			type : 'block',
			id : 'block',
			app_code: 'block',
			title : 'Block',
			url : 'home.php/clouds',
			width : 600,
			height : 500,
			isresize : true,
			//isopenmax: true,
			icon : images_path + 'shortcut/tool_app/aboutus.png',
			isflash : false,
			isstatebar : true,
			isstar : true,
			ishelp : true,
		}, app_url);
	}catch(err){
		alert("错误描述：" + err.message + "\n\n");
		Home.create.get_tips();
	}
},


}})();
