/*
**  一个不属于其他模块的模块
*/
Home.base = (function(){return{

//	系统初始化
init : function(){
	//配置artDialog全局默认参数
	(function(config){
		config['lock'] = true;
		config['fixed'] = true;
		config['resize'] = false;
		config['background'] = '#000';
		config['opacity'] = 0.5;
	})(dialog.defaults);
	//更新当前用户ID
	Home.CONFIG.memberID = $.cookie(cookie_prefix + 'memberID');

	//阻止弹出浏览器默认右键菜单	-->		在初始化右键菜单有此功能，这里可以考虑删除！
//	$('body').on('contextmenu', function(){
//		$(".popup-menu").hide();
//		$('.quick_view_container').remove();
//		return false;
//	});

//	Home.zoom.init();				//用于判断网页是否缩放
//	Home.deskTop.init();			//桌面(容器)初始化
//	Home.wallpaper.init();			//初始化壁纸
//	Home.searchbar.init();			//初始化搜索栏
//	Home.startmenu.init();			//初始化开始菜单
	Home.taskbar.init();			//初始化任务栏
//	Home.dock.init();				//初始化dock
	Home.app.init();				//初始化桌面应用
//	Home.widget.init();				//初始化widget模块
	Home.window.init();				//初始化窗口模块
//	Home.folderView.init();			//初始化文件夹预览
//	Home.appmanage.init();			//初始化全局视图
//	Home.popupMenu.init();			//初始化右键菜单
//	Home.lock.init();				//初始化锁屏
//	Home.hotkey.init();				//初始化快捷键
//	Home.uploadFile.init();			//文件上传
	Home.uploader.init();			//文件上传2
//	if(!$.browser.msie){ window.onbeforeunload = Util.confirmExit; }	//	增加离开页面确认窗口，IE下有bug，暂时屏蔽
	Home.base.run();				//页面加载后运行
//	Home.widget.reduction();		//还原widget
//	Home.base.help();				//加载新手帮助
//	Home.base.help_first();
//	Home.base.getSkin(function(skin){Home.base.setSkin(skin)});

//	Home.create.crm();
},

logout : function(){
	$.ajax({
		type : 'POST',
		url : ajaxUrl,
		data : 'ac=logout',
		success : function(){
			location.href = 'login.php';
		}
	});
},

resize : function(){
	$(window).on('resize', function(){
		Home.deskTop.resize(200);
	});
},

getSkin : function(){
	$.ajax({
		type : 'POST',
		url : ajaxUrl,
		data : 'ac=getSkin',
		success : function(skin){
			$('#window-skin').remove();
			var link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = 'img/skins/' + skin + '.css?' + version;
			link.id = 'window-skin';
			$('body').append(link);
		}
	});
},

help : function(){
	if($.cookie('isLoginFirst') == null){
		$.cookie('isLoginFirst', '1', {expires : 95});
		if(!$.browser.msie || ($.browser.msie && $.browser.version < 9)){
			$('body').append(helpTemp);
			//IE6,7,8基本就告别新手帮助了
			$('#step1').show();
			$('.close').on('click', function(){
				$('#help').remove();
			});
			$('.next').on('click', function(){
				var obj = $(this).parents('.step');
				var step = obj.attr('step');
				obj.hide();
				$('#step' + (parseInt(step) + 1)).show();
			});
			$('.over').on('click', function(){
				$('#help').remove();
			});
		}
	}
},
run : function(){
//	var url = location.search;
//	var request = new Object();
//	if(url.indexOf("?") != -1){
//		var str = url.substr(1);
//		strs = str.split("&");
//		for(var i = 0; i < strs.length; i++){
//			request[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
//		}
//	}
//	if(typeof(request['run']) != 'undefined' && typeof(request['type']) != 'undefined'){
//		$.ajax({
//			type : 'POST',
//			url : ajaxUrl,
//			data : 'ac=getAppidByRealappid&id=' + request['run']
//		}).done(function(appid){
//			if(request['type'] == 'app'){
//				Home.window.create(appid);
//			}else{
//				//判断挂件是否存在cookie中，因为如果存在则自动会启动
//				if(!Home.widget.checkCookie(appid, request['type'])){
//					Home.widget.create(appid);
//				}
//			}
//		});
//	}
},

}})();