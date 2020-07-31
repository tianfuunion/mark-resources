/*
**  应用窗口
*/
Home.window = (function(){return{
init : function(){
	//窗口上各个按钮
//	Home.window.handle();
	//窗口移动
//	Home.window.move();
	//窗口拉伸
	Home.window.resize();
	//绑定窗口遮罩层点击事件
	$('#desktop').on('click', '.window-container .window-mask, .window-container .folder_body', function(){
		Home.window.show2top($(this).parents('.window-container').attr('appid'), true);
	});
	//屏蔽窗口右键
//	$('#desktop').on('contextmenu', '.window-container', function(){
//		return false;
//	});
	//绑定文件夹内应用点击事件
	$('#desktop').on('click', '.folder_body li', function(){
		return false;
	}).on('contextmenu', '.folder_body .appbtn', function(e){
		$('.popup-menu').hide();
		$('.quick_view_container').remove();
		switch($(this).attr('type')){
			case 'app':
			case 'widget':
				var popupmenu = Home.popupMenu.app($(this));
				break;
			case 'papp':
			case 'pwidget':
				var popupmenu = Home.popupMenu.papp($(this));
				break;
		}
		var l = ($(window).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
		var t = ($(window).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
		popupmenu.css({
			left : l,
			top : t
		}).show();
		return false;
	});
},
/*
**  创建窗口
**  自定义窗口：Home.window.createTemp({title,url,width,height,resize});
**	因为是自定义窗口，所以id就写0，不能省略
**	后面参数依次为：标题、地址、宽、高、是否可拉伸、是否为flash
**	示例：Home.window.createTemp({title:"百度",url:"http://www.baidu.com",width:800,height:400,isresize:false,isflash:false});
*/
createTemp : function(obj){
	$('.popup-menu').hide();
	$('.quick_view_wrap').remove();
//	var type = 'app', id = typeof(obj.id) == 'undefined' || obj.id == '' ? Date.parse(new Date()) : obj.id;
//判断窗口是否已打开	-->		如果随后加入比如：挂件，程序隐藏至托盘，等情况此判断方法将失效，可考虑在窗口标签中加入状态标签，
	var iswindowopen = false;
	$('#task-inner a.task-item').each(function(){
		if($(this).attr('appid') == obj.id && $(this).attr('type') == obj.type){
			iswindowopen = true;
			Home.window.show2top(obj.id, obj.type);
		}
	});

//如果没有打开，则进行创建
	if(iswindowopen == false){
		function nextDo(options){
			var windowId = '#w_'+ options.id;
			//新增任务栏
			$('#task-inner').prepend(taskTemp({
				'type'	: options.type,
				'id'	: 't_' + options.id,
				'appid'	: options.id,
				'realid': obj.id + '_' + Date.parse(new Date()),
				'title'	: options.title,
				'icon'	: options.icon
			}));
			$('#task-inner').css('width', $('#task-inner .task-item').length * 114);
			Home.taskbar.resize();
			//新增窗口
			createData = {
				'id'			: "w_" + options.id,
				'appid'			: options.id,				//	应用ID
				'realid'		: options.id + '_' + Date.parse(new Date()),
				'app_code'		: options.app_code,
				'timeid'		: Date.parse(new Date()),
				'type'			: options.type,
				'appui'			: options.appui,			//	界面类型 User interface card	block	window	: '',
				'adaptive'		: options.adaptive,			//	适应平台 Adaptive platform'	: 'pc phone pad auto',
				'name'			: options.name,				//	应用名称
				'title'			: options.title,			//	应用标题
				'keywords'		: options.keywords,			//	关键词
				'description'	: options.description,		//	应用描述
				'content'		: options.content,			//	文件内容

				'width'			: options.width,
				'height'		: options.height,
				'minwidth'		: options.maxwidth,
				'minheight'	: options.minheight,
				'maxwidth'		: options.maxwidth,
				'maxheight'	: options.maxheight,
				'top'			: (height - options.height)/2  <= 0 ? 0 : (height - options.height)/2,
				'left'			: (width - options.width)/2  <= 0 ? 0 : (width - options.width)/2,
				'emptyW'		: $(window).width() - options.width,
				'emptyH'		: $(window).height() - options.height,
				'zIndex'		: Home.CONFIG.createIndexid,
				'url'			: options.url,
				'icon'			: options.icon,

				'titlebar'		: options.titlebar,		//	标题栏
				'menubar'		: options.menubar,		//	菜单栏
				'addressbar'	: options.adressbar,	//	地址栏
				'searchbar'		: options.searchbar,	//	搜索栏
				'statebar'		: options.statebar,		//	状态栏

				'isresize'		: options.isresize == 1 ? true : false,	//	变换大小
				'istitlebar'	: options.isresize == 1 ? true : false,
				'Fullscreen'	: options.isresize == 1 ? window.fullScreenApi.supportsFullScreen == true ? true : false : false,	//	全屏
				'issetbar'		: options.issetbar == 1 ? true : false,
				'isflash'		: options.isflash == 1 ? true : false,		//	Flash

				'isstar'		: options.isstar,		//	评分按钮
				'ishelp'		: options.ishelp,		//	帮助按钮
				'refresh'		: options.refresh,		//	刷新按钮
			};
//创建窗口
//			$('#desktop').append(windowTemp(TEMP.windowTemp));
			switch(options.type){
				case 'tool':
					$('#desktop').append(toolTemp(createData));
					break;
				case 'card':
					$('#desktop').append(cardTemp(createData));
					break;
				case 'block':
					$('#desktop').append(blockTemp(createData));
				  break;
				case 'window':
					$('#desktop').append(windowTemp(createData));
				  break;
				case 'app':
					$('#desktop').append(appTemp(createData));
					break;
				case 'test':
					$('#desktop').append(testTemp(createData));
					break;
				case 'widget':
					$('#desktop').append(widgetTemp(createData));
					break;
				case 'nexstar':
//					$('#desktop').append(uploadTemp(createData));
					$('#desktop').append(nexstarTemp(createData));
					break;
				default:
					create_window.get_tips('尚未定义创建类型！');
			}
//	加载内容
			$('#'+createData.realid).load(createData.url);
			$(windowId).data('info', createData);
			Home.CONFIG.createIndexid += 1;
		//iframe加载完毕后
		//iframe加载完毕后，隐藏loading遮罩层
//			$(windowId).load(function(){
//				$(windowId).children('div').eq(3).fadeOut();
//			});
//			$(windowId).find('iframe').on('load', function(){
//			$(windowId).find('div').on("load", function(){
//			$(windowId).find('#'+createData.ids).on('load', function(){
			//绑定窗口拉伸事件
			if(options.isresize){
				Home.window.resize($(windowId));
			}
			//隐藏loading
//				$(windowId + ' .window-frame').children('div').eq(1).fadeOut();
//				$(windowId).children('div').eq(3).fadeOut();
//				$(windowId + ' .window-loading').fadeOut();
				$('.window-loading').fadeOut();
//			});
		//绑定窗口上各个按钮事件
			Home.window.handle($(windowId));
		//绑定窗口移动
			Home.window.move($(windowId));
		//绑定窗口遮罩层点击事件
			$('.window-mask').off('click').on('click', function(){
				Home.window.show2top($(this).parents('.window-wrap').attr('appid'), $(this).parents('.window-wrap').attr('type'));
			});
			Home.window.show2top(options.id, options.type);
		}
		nextDo({
			type		: obj.type,
			id			: typeof(obj.id) == 'undefined' || obj.id == '' ? Date.parse(new Date()) : obj.id,
			appid		: obj.appid,
			realid		: obj.realid,
			title		: obj.title,
			width		: obj.width,
			height		: obj.height,
			min_width	: obj.max-width,
			min_height	: obj.min-height,
			max_width	: obj.max-width,
			max_height	: obj.max-height,
			url			: obj.url,
			icon		: obj.icon ? obj.icon : images_path + 'ui/default_icon.png',

			isresize	: typeof(obj.isresize) == 'undefined' ? false : obj.isresize,
			isopenmax	: typeof(obj.isopenmax) == 'undefined' ? false : obj.isopenmax,
			istitlebar	: obj.isresize == 1 ? true : false,
			Fullscreen	: obj.isresize == 1 ? window.fullScreenApi.supportsFullScreen == true ? true : false : false,

			issetbar	: obj.issetbar,
			isflash		: typeof(obj.isflash) == 'undefined' || obj.id == '' ? false : obj.isflash,

			titlebar	: obj.titlebar,		//	标题栏
			menubar		: obj.menubar,		//	菜单栏
			addressbar	: obj.adressbar,	//	地址栏
			searchbar	: obj.searchbar,	//	搜索栏
			statebar	: obj.statebar,		//	状态栏

			isstar		: obj.isstar,		//	评分按钮
			ishelp		: obj.ishelp,		//	帮助按钮
			refresh		: obj.refresh,		//	刷新按钮
		});
	}
},
/*
**  创建窗口
**  系统窗口：Home.window.create(id, type);
**      示例：Home.window.create(12, 'app');
*/
create : function(id, type){
	$('.popup-menu').hide();
	$('.quick_view_wrap').remove();
	//判断窗口是否已打开
	var iswindowopen = false;
	$('#task-inner a.task-item').each(function(){
		if($(this).attr('realid') == id && $(this).attr('type') == type){
			iswindowopen = true;
			Home.window.show2top(id, type);
		}
	});
	//如果没有打开，则进行创建
	if(iswindowopen == false){
		function nextDo(options){
			var windowId = '#w_' + options.type + '_' + options.id;
			var top = ($(window).height() - options.height) / 2 <= 0 ? 0 : ($(window).height() - options.height) / 2;
			var left = ($(window).width() - options.width) / 2 <= 0 ? 0 : ($(window).width() - options.width) / 2;
			switch(options.type){
				case 'app':
				case 'papp':
			//新增任务栏
					$('#task-inner').prepend(taskTemp({
						'type' : options.type,
						'id' : 't_' + options.type + '_' + options.id,
						'realid' : options.id,
						'title' : options.title,
						'icon' : options.icon
					}));
					$('#task-inner').css('width', $('#task-inner .task-item').length * 114);
					Home.taskbar.resize();
					//新增窗口
					TEMP.windowTemp = {
						'width' : options.width,
						'min-width': options.max-width,
						'max-width': options.max-width,
						'height' : options.height,
						'min-height': options.min-height,
						'max-height': options.max-height,
						'top' : top,
						'left' : left,
						'emptyW' : $(window).width() - options.width,
						'emptyH' : $(window).height() - options.height,
						'zIndex' : Home.CONFIG.createIndexid,
						'type' : options.type,
						'id' : 'w_' + options.type + '_' + options.id,
						'realid' : options.id,
						'title' : options.title,
						'url' : options.url,
						'icon' : options.icon,
						'isresize' : options.isresize == 1 ? true : false,
						'istitlebar' : options.isresize == 1 ? true : false,
						'istitlebarFullscreen' : options.isresize == 1 ? window.fullScreenApi.supportsFullScreen == true ? true : false : false,
						'issetbar' : options.issetbar == 1 ? true : false,
						'isflash' : options.isflash == 1 ? true : false
					};
					$('#desktop').append(windowTemp(TEMP.windowTemp));
					$(windowId).data('info', TEMP.windowTemp);
					Home.CONFIG.createIndexid += 1;
					//iframe加载完毕后
					$(windowId + ' iframe').on('load', function(){
						if(options.isresize){
							//绑定窗口拉伸事件
							Home.window.resize($(windowId));
						}
						//隐藏loading
						$(windowId + ' .window-frame').children('div').eq(1).fadeOut();
					});
					$(windowId).on('contextmenu',function(){
						return false;
					});
					//绑定窗口上各个按钮事件
					Home.window.handle($(windowId));
					//绑定窗口移动
					Home.window.move($(windowId));
					//绑定窗口遮罩层点击事件
					$('.window-mask').off('click').on('click', function(){
						Home.window.show2top($(this).parents('.window-wrap').attr('appid'), $(this).parents('.window-wrap').attr('type'));
					});
					Home.window.show2top(options.id, options.type);
				break;
				case 'folder':
					//新增任务栏
					$('#task-inner').prepend(taskTemp({
						'type' : options.type,
						'id' : 't_' + options.type + '_' + options.id,
						'realid' : options.id,
						'title' : options.title,
						'icon' : options.icon
					}));
					$('#task-inner').css('width', $('#task-inner .task-item').length * 114);
					Home.taskbar.resize();
					//新增窗口
					TEMP.folderWindowTemp = {
						'width' : options.width,
						'height' : options.height,
						'top' : top,
						'left' : left,
						'emptyW' : $(window).width() - options.width,
						'emptyH' : $(window).height() - options.height,
						'zIndex' : Home.CONFIG.createIndexid,
						'type' : options.type,
						'id' : 'w_' + options.type + '_' + options.id,
						'realid' : options.id,
						'title' : options.title,
						'icon' : options.icon
					};
					$('#desktop').append(folderWindowTemp(TEMP.folderWindowTemp));
					$(windowId).data('info', TEMP.folderWindowTemp);
					Home.CONFIG.createIndexid += 1;
					//载入文件夹内容
					$.getJSON(ajaxUrl + '?ac=getMyFolderApp&folderid=' + options.id, function(sc){
						if(sc != null){
							for(var i = 0; i < sc.length; i++){
								switch(sc[i]['type']){
									case 'app':
									case 'widget':
										$(windowId).find('.folder_body').append(appbtnTemp({
											'top' : 0,
											'left' : 0,
											'title' : sc[i]['name'],
											'type' : sc[i]['type'],
											'id' : 'd_' + sc[i]['type'] + '_' + sc[i]['id'],
											'realid' : sc[i]['id'],
											'imgsrc' : sc[i]['icon']
										}));
										break;
									case 'folder':
										$(windowId).find('.folder_body').append(appbtnTemp({
											'top' : 0,
											'left' : 0,
											'title' : sc[i]['name'],
											'type' : sc[i]['type'],
											'id' : 'd_' + sc[i]['type'] + '_' + sc[i]['id'],
											'realid' : sc[i]['id'],
											'imgsrc' : sc[i]['icon']
										}));
										break;
								}
							}
							Home.app.move();
						}
						appEvent();
					});
					function appEvent(){
						$(windowId).on('contextmenu', function(){
							return false;
						});
						//绑定文件夹内图标右击事件
						$(windowId + ' .folder_body').on('contextmenu', '.appbtn', function(e){
							$('.popup-menu').hide();
							$('.quick_view_wrap').remove();
							var popupmenu = Home.popupMenu.app($(this));
							var l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
							var t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
							popupmenu.css({
								left : l,
								top : t
							}).show();
							return false;
						});
						//绑定窗口缩放事件
						Home.window.resize($(windowId));
						//隐藏loading
						$(windowId + ' .window-frame').children('div').eq(1).fadeOut();
						//绑定窗口上各个按钮事件
						Home.window.handle($(windowId));
						//绑定窗口移动
						Home.window.move($(windowId));
						//绑定窗口遮罩层点击事件
						$('.window-mask').off('click').on('click', function(){
							Home.window.show2top($(this).parents('.window-wrap').attr('appid'), $(this).parents('.window-wrap').attr('type'));
						});
						Home.window.show2top(options.id, options.type);
					}
					break;
				}
			}
			ZENG.msgbox.show('应用正在加载中，请耐心等待...', 6, 100000);
				$.getJSON(ajaxUrl + '?ac=getMyAppById&id=' + id + '&type=' + type, function(app){
					if(app != null){
						ZENG.msgbox._hide();
						switch(app['type']){
							case 'app':
							case 'papp':
							case 'widget':
							case 'pwidget':
								nextDo({
									type : app['type'],
									id : app['id'],
									title : app['name'],
									imgsrc : app['icon'],
									url : app['url'],
									width : app['width'],
									height : app['height'],
									isresize : app['isresize'],
									issetbar : app['issetbar'],
									isflash : app['isflash']
								});
								break;
							case 'folder':
								nextDo({
									type : app['type'],
									id : app['id'],
									title : app['name'],
									imgsrc : app['icon'],
									width : app['width'],
									height : app['height']
								});
								break;
						}
					}else{
						ZENG.msgbox.show('数据拉取失败', 5, 2000);
						return false;
					}
				});
			}
},
close : function(appid){
	var windowId = '#w_' + appid, taskId = '#t_' + appid;
	$(windowId).removeData('info').html('').remove();
	$('#task-inner ' + taskId).html('').remove();
	$('#task-inner').css('width', $('#task-inner .task-item').length * 114);
	$('#task-bar, #nav-bar').removeClass('min-zIndex');
	Home.taskbar.resize();
},

closeAll : function(){
	$('#desktop .window-wrap').each(function(){
		Home.window.close($(this).attr('appid'), $(this).attr('type'));
	});
},
hide : function(appid,type){
	Home.window.show2top(appid, type);
	var windowId = '#w_'+ appid, taskId = '#t_' + appid;
//	$(windowId).css('left', -10000).attr('state', 'hide');
	$(windowId).css('visibility', 'hidden').attr('state','hide');
	$('#task-inner ' + taskId).removeClass('task-item-current');
	if($(windowId).attr('ismax') == 1){
		$('#task-bar, #nav-bar').removeClass('min-zIndex');
	}
},
hideAll : function(){
	$('#task-inner a.task-item').removeClass('task-item-current');
	$('#desktop div').nextAll('.window-wrap').css('visibility', 'hidden').attr('state', 'hide');
},
max : function(appid,type){
	Home.window.show2top(appid, type);
	var windowId = '#w_' + appid, taskId = '#t_' + appid;
	$(windowId + ' .title-handle .ha-max').hide().next(".ha-revert").show();
	$(windowId).attr('ismax',1).animate({
		width : '100%',
		height : '100%',
		top : 0,
		left : 0
	}, 200);
	$('#task-bar, #nav-bar').addClass('min-zIndex');
},
revert : function(appid, type){
	Home.window.show2top(appid, type);
	var windowId = '#w_' + appid, taskId = '#t_'+ appid;
	$(windowId + ' .title-handle .ha-revert').hide().prev('.ha-max').show();
	var obj = $(windowId), windowdata = obj.data('info');
	obj.attr('ismax',0).animate({
		width : windowdata['width'],
		height : windowdata['height'],
		left : windowdata['left'],
		top : windowdata['top']
	}, 500);
	$('#task-bar, #nav-bar').removeClass('min-zIndex');
},
refresh : function(appid,type){
	Home.window.show2top(appid, type);
	var windowId = '#w_' + appid, taskId = '#t_'+ appid;
	//判断是应用窗口，还是文件夹窗口
	if($(windowId + '_iframe').length != 0){
		$(windowId + '_iframe').attr('src', $(windowId + '_iframe').attr('src'));
	}else{
		Home.window.updateFolder(appid, type);
	}
},
show2top : function(appid, type){
	var windowId = '#w_' + appid, taskId = '#t_' + appid;
	//改变任务栏样式
	$('#task-inner a.task-item').removeClass('task-item-current');
	$('#task-inner ' + taskId).addClass('task-item-current');
	if($(windowId).attr('ismax') == 1){
		$('#task-bar, #nav-bar').addClass('min-zIndex');
	}
	//改变窗口样式
	$('#desktop.window-wrap .window-wrap').removeClass('window-current');
	$(windowId).addClass('window-current').css({
		'z-index' : Home.CONFIG.createIndexid,
		'visibility' : 'visible'
	}).attr('state','show');
	//改变窗口遮罩层样式
	$('#desktop .window-wrap .window-mask').show();
	$(windowId + ' .window-mask').hide();
	//改变iframe显示
	$('#desktop.window-wrap-flash iframe').hide();
	$(windowId).show();
	Home.CONFIG.createIndexid += 1;
},

show2under : function(){
	//改变任务栏样式
	$('#task-content-inner a.task-item').removeClass('task-item-current');
	//改变窗口样式
	$('#desk .window-container').removeClass('window-current');
	//改变窗口遮罩层样式
	$('#desk .window-container .window-mask').show();
	//改变iframe显示
	$('#desk .window-container-flash iframe').hide();
},

updateFolder : function(appid, type){
	Home.window.show2top(appid, type);
	var windowId = '#w_'+ appid, taskId = '#t_' + appid;
	$.getJSON(ajaxUrl + '?ac=getMyFolderApp&folderid=' + appid, function(sc){
		if(sc != null){
			var folder_append = '';
			for(var i = 0; i < sc.length; i++){
				switch(sc[i]['type']){
					case 'app':
					case 'widget':
						folder_append += appbtnTemp({
							'top' : 0,
							'left' : 0,
							'title' : sc[i]['name'],
							'type' : sc[i]['type'],
							'id' : 'd_' + sc[i]['type'] + '_' + sc[i]['appid'],
							'realid' : sc[i]['appid'],
							'imgsrc' : sc[i]['icon']
						});
						break;
				}
			}
			$(windowId).find('.folder_body').html('').append(folder_append).on('contextmenu', '.shortcut', function(e){
				$('.popup-menu').hide();
				$('.quick_view_wrap').remove();
				TEMP.AppRight = Home.popupMenu.app($(this));
				var l = ($(document).width() - e.clientX) < TEMP.AppRight.width() ? (e.clientX - TEMP.AppRight.width()) : e.clientX;
				var t = ($(document).height() - e.clientY) < TEMP.AppRight.height() ? (e.clientY - TEMP.AppRight.height()) : e.clientY;
				TEMP.AppRight.css({
					left : l,
					top : t
				}).show();
				return false;
			});
			Home.app.move();
		}
	});
},
handle : function(obj){
	obj.on('dblclick', '.title-bar', function(e){
		//判断当前窗口是否已经是最大化
		if(obj.find('.ha-max').is(':hidden')){
			obj.find('.ha-revert').click();
		}else{
			obj.find('.ha-max').click();
		}
	}).on('click','.ha-hide', function(){
		Home.window.hide(obj.attr('appid'),obj.attr('type'));
	}).on('click','.ha-max', function(){
		Home.window.max(obj.attr('appid'),obj.attr('type'));
	}).on('click', '.ha-revert', function(){
		Home.window.revert(obj.attr('appid'),obj.attr('type'));
	}).on('click', '.ha-fullscreen', function(){
		launchFullscreen(document.getElementById(obj.attr('id')));
		$('#w_'+obj.attr('appid')).css({ width:'100%',height:'100%',top:'0px',left:'0px' });
		Home.create.get_tips('窗口式的不能有全屏，只有block,card,式的使用全屏模式才有效果!<br>This,Home.window.js/handle()/-line575;');
	}).on('click', '.ha-close', function(){
		Home.window.close(obj.attr('appid'),obj.attr('type'));
	}).on('click', '.refresh', function(){
		Home.window.refresh(obj.attr('appid'),obj.attr('type'));
	}).on('click', '.help', function(){
		var help = art.dialog({
			title : '帮助',
			follow : this,
			width : 196
		});
		$.ajax({
			type : 'POST',
			url : ajaxUrl,
			data : 'ac=getAppRemark&id=' + obj.data('info').realid,
			success : function(msg){
				help.content(msg);
			}
		});
	}).on('click', '.star', function(){
		$.ajax({
			type : 'POST',
			url : ajaxUrl,
			data : 'ac=getAppStar&id=' + obj.data('info').realid,
			success : function(point){
				$.dialog({
					title : '给“' + obj.data('info').title + '”打分',
					width : 250,
					id : 'star',
					content : starDialogTemp({
						'point' : Math.floor(point),
						'realpoint' : point * 20
				})
				});
				$('#star ul').data('id', obj.data('info').realid);
			}
		});
		$('body').off('click').on('click', '#star ul li', function(){
			var num = $(this).attr('num');
			var id = $(this).parent('ul').data('id');
			if(!isNaN(num) && /^[1-5]$/.test(num)){
				$.ajax({
					type : 'POST',
					url : ajaxUrl,
					data : 'ac=updateAppStar&id=' + id + '&starnum=' + num,
					success : function(msg){
						art.dialog.list['star'].close();
						if(msg){
							ZENG.msgbox.show("打分成功！", 4, 2000);
						}else{
							ZENG.msgbox.show("你已经打过分了！", 1, 2000);
						}
					}
				});
			}
		});
	}).on('contextmenu', '.window-wrap', function(){
		$('.popup-menu').hide();
		$('.quick_view_wrap').remove();
		return false;
	});
},
move : function(obj){
	obj.on('mousedown', '.move', function(e){
		if(obj.attr('ismax') == 1){
			return false;
		}
		Home.window.show2top(obj.attr('appid'), obj.attr('type'));
		var windowdata = obj.data('info'), lay, x, y;
		x = e.clientX - obj.offset().left;
		y = e.clientY - obj.offset().top;
		//绑定鼠标移动事件
		$(document).on('mousemove', function(e){
			lay = Home.maskBox.desk();
			lay.show();
			//强制把右上角还原按钮隐藏，最大化按钮显示
			obj.find('.ha-revert').hide().prev('.ha-max').show();
			_l = e.clientX - x;
			_t = e.clientY - y;
			_w = windowdata['width'];
			_h = windowdata['height'];
			//窗口贴屏幕顶部10px内 || 底部60px内
			_t = _t <= 10 ? 0 : _t >= lay.height()-30 ? lay.height()-30 : _t;
			obj.css({
				width : _w,
				height : _h,
				left : _l,
				top : _t
			});
			obj.data('info').left = obj.offset().left;
			obj.data('info').top = obj.offset().top;
		}).on('mouseup', function(){
			$(this).off('mousemove').off('mouseup');
			if(typeof(lay) !== 'undefined'){
				lay.hide();
			}
		});
	});
},

resize : function(obj){
	$('#desktop div.window-resize').on('mousedown', function(e){
		//增加背景遮罩层
		var resizeobj = $(this), lay, x = e.clientX, y = e.clientY, w = obj.width(), h = obj.height();
		$(document).on('mousemove', function(e){
			lay = Home.maskBox.desk();
			lay.show();
			_x = e.clientX;
			_y = e.clientY;
			//当拖动到屏幕边缘时，自动贴屏
			_x = _x <= 10 ? 0 : _x >= (lay.width()-12) ? (lay.width()-2) : _x;
			_y = _y <= 10 ? 0 : _y >= (lay.height()-12) ? lay.height() : _y;
			switch(resizeobj.attr('resize')){
				case 't':
					h + y - _y > Home.CONFIG.windowMinHeight ? obj.css({
						height : h + y - _y,
						top : _y
					}) : obj.css({
						height : Home.CONFIG.windowMinHeight
					});
					break;
				case 'r':
					w - x + _x > Home.CONFIG.windowMinWidth ? obj.css({
						width : w - x + _x
					}) : obj.css({
						width : Home.CONFIG.windowMinWidth
					});
					break;
				case 'b':
					h - y + _y > Home.CONFIG.windowMinHeight ? obj.css({
						height : h - y + _y
					}) : obj.css({
						height : Home.CONFIG.windowMinHeight
					});
					break;
				case 'l':
					w + x - _x > Home.CONFIG.windowMinWidth ? obj.css({
						width : w + x - _x,
						left : _x
					}) : obj.css({
						width : Home.CONFIG.windowMinWidth
					});
					break;
				case 'rt':
					h + y - _y > Home.CONFIG.windowMinHeight ? obj.css({
						height : h + y - _y,
						top : _y
					}) : obj.css({
						height : Home.CONFIG.windowMinHeight
					});
					w - x + _x > Home.CONFIG.windowMinWidth ? obj.css({
						width : w - x + _x
					}) : obj.css({
						width : Home.CONFIG.windowMinWidth
					});
					break;
				case 'rb':
					w - x + _x > Home.CONFIG.windowMinWidth ? obj.css({
						width : w - x + _x
					}) : obj.css({
						width : Home.CONFIG.windowMinWidth
					});
					h - y + _y > Home.CONFIG.windowMinHeight ? obj.css({
						height : h - y + _y
					}) : obj.css({
						height : Home.CONFIG.windowMinHeight
					});
					break;
				case 'lt':
					w + x - _x > Home.CONFIG.windowMinWidth ? obj.css({
						width : w + x - _x,
						left : _x
					}) : obj.css({
						width : Home.CONFIG.windowMinWidth
					});
					h + y - _y > Home.CONFIG.windowMinHeight ? obj.css({
						height : h + y - _y,
						top : _y
					}) : obj.css({
						height : Home.CONFIG.windowMinHeight
					});
					break;
				case 'lb':
					w + x - _x > Home.CONFIG.windowMinWidth ? obj.css({
						width : w + x - _x,
						left : _x
					}) : obj.css({
						width : Home.CONFIG.windowMinWidth
					});
					h - y + _y > Home.CONFIG.windowMinHeight ? obj.css({
						height : h - y + _y
					}) : obj.css({
						height : Home.CONFIG.windowMinHeight
					});
					break;
			}
		}).on('mouseup',function(){
			if(typeof(lay) !== 'undefined'){
				lay.hide();
			}
			obj.data('info').width = obj.width();
			obj.data('info').height = obj.height();
			obj.data('info').left = obj.offset().left;
			obj.data('info').top = obj.offset().top;
			obj.data('info').emptyW = $(window).width() - obj.width();
			obj.data('info').emptyH = $(window).height() - obj.height();
			$(this).off('mousemove').off('mouseup');
		});
	});
},


// 基于上面的函数封装的其他方法
		create_market : function(app_id){
//			var url = urlPrefix + 'market/';
			var url = '/home.php/app/';
			if(app_id){
				url += '?id=' + app_id;
			}
			Home.window.createTemp({
				type : 'block',
				id : 'app_store',
				app_code : 'app_market',
				title : '应用商店',
				url : url,
				width : 1000,
				height : 560,
				icon : images_path + 'shortcut/tool_app/market.png',
				isflash : false,
				//isresize: true,
				refresh : false //需要强制刷新
			});
		},
		create_market_search : function(searchkey){
			var url = urlPrefix + 'market/';
			if(searchkey){
				url += '?searchkey=' + searchkey;
			}
			Home.window.createTemp({
				appid : 'app_market',
				app_code : 'app_market',
				title : '应用市场',
				url : url,
				width : 1010,
				height : 623,
				icon : images_path + 'shortcut/tool_app/market.png',
				isflash : false,
				//isresize: true,
				refresh : false //需要强制刷新
			});
		},
		create_app_statistics : function(app_url){
			Home.window.createTemp({
				appid : 'bk-tj',
				app_code: 'app_statistics',
				title : '统计',
				url : Home.corefunc.get_bk_path() + '/app_statistics/',
				width : 1345,
				height : 721,
				isresize : true,
				icon : staticUrl + 'img/shortcut/tool_app/app_statistics.png',
				isflash : false,
				refresh : false
			}, app_url);
		},
		create_app_admin : function(appid, title, app_url){
			Home.window.createTemp({
				appid : appid,
				app_code: appid,
				title : title,
				url : app_url,
				width : 990,
				height : 566,
				icon : staticUrl + 'img/shortcut/tool_app/developer_tool.png',
				isflash : false,
				refresh : true,
				isresize: true
			}, app_url);
		},
		create_add_menu : function(e){
			// 弹出菜单
			$("#desk_add_menu").css({
				left: e.pageX,
				top: e.pageY
			}).show();
			// 点击任何地方，可以收起菜单
			$(document).click(function(event){
				if( !$(event.target).is("#desktop li.appbtn.add") && !$(event.target).parents().is("#desktop li.appbtn.add")){ //!$(event.target).is("#desk_add_menu") && !$(event.target).parents().is("#desk_add_menu") &&
					$("#desk_add_menu").hide();
				}
			});
		}
}
})();