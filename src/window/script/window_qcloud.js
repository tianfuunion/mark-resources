/*
**  应用窗口
*/
BLUEKING.window = (function(){
	return {
		init : function(){
			//窗口上各个按钮
			BLUEKING.window.handle();
			//窗口移动
			BLUEKING.window.move();
			//窗口拉伸
			BLUEKING.window.resize();
			//绑定窗口遮罩层点击事件
			$('#desk').on('click', '.window-container .window-mask, .window-container .folder_body', function(){
				BLUEKING.window.show2top($(this).parents('.window-container').attr('appid'), true);
			});
			//屏蔽窗口右键
			$('#desk').on('contextmenu', '.window-container', function(){
				return false;
			});
			//绑定文件夹内应用点击事件
			$('#desk').on('click', '.folder_body li', function(){
				return false;
			}).on('contextmenu', '.folder_body .appbtn', function(e){
				$('.popup-menu').hide();
				$('.quick_view_container').remove();
				switch($(this).attr('type')){
					case 'app':
					case 'widget':
						var popupmenu = BLUEKING.popupMenu.app($(this));
						break;
					case 'papp':
					case 'pwidget':
						var popupmenu = BLUEKING.popupMenu.papp($(this));
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
		**  自定义窗口：BLUEKING.window.createTemp({title,url,width,height,resize,isflash});
		**      后面参数依次为：标题、地址、宽、高、是否可拉伸、是否打开默认最大化、是否为flash
		**      示例：BLUEKING.window.createTemp({title:"百度",url:"http://www.baidu.com",width:800,height:400,isresize:false,isopenmax:false,isflash:false});
		*/
		createTemp : function(obj, app_url){
			var type = 'app', appid = obj.appid == null ? Date.parse(new Date()) : obj.appid;
			//判断窗口是否已打开
			var iswindowopen = false;
			$('#task-content-inner a.task-item').each(function(){
				if($(this).attr('appid') == appid){
					iswindowopen = true;
					BLUEKING.window.show2top($(this).attr('appid'));
					return false;
				}
			});
			//如果没有打开，则进行创建
			if(!iswindowopen){
				function nextDo(options){
					var windowId = '#w_' + options.appid;
					//新增任务栏
					$('#task-content-inner').prepend(taskTemp({
						'type' : options.type,
						'id' : 't_' + options.appid,
						'appid' : options.appid,
						'title' : options.title,
						'imgsrc' : options.imgsrc
					}));
					BLUEKING.taskbar.resize();
					// 如果需要打开某个具体的页面，则url改变
					var _url = options.url;
					if(app_url){
						_url = app_url;
					}
					// TODO
					//判断是否用当前浏览器窗口最大值打开app
					var win_width = options.width;			//app设置的宽度
					var win_height = options.height;		//app设置的高度
					var win_width_short = $(window).width() - options.width;	//window宽度 与 app设置的宽度差
					var win_height_short = $(window).height() - options.height;	//window高度 与 app设置的高度差
					//app不是最大化打开且是可以缩放的情况下
					if(options.isresize == true && options.isopenmax == false){
						if(win_width_short < 0){
							win_width = $(window).width();
						}
						if(win_height_short < 0){
							win_height = $(window).height();
						}
					}
					//新增窗口
					TEMP.windowTemp = {
						'top' : win_height_short / 2 <= 0 ? 0 : win_height_short / 2,
						'left' : win_width_short / 2 <= 0 ? 0 : win_width_short / 2,
						'emptyW' : win_width_short,
						'emptyH' : win_height_short,
						'width' : win_width,
						'height' : win_height,
						'zIndex' : BLUEKING.CONFIG.windowIndexid,
						'type' : options.type,
						'id' : 'w_' + options.appid,
						'appid' : options.appid,
						'realappid' : options.appid,
						'title' : options.title,
						'url' : _url,
						'imgsrc' : options.imgsrc,
						'isresize' : options.isresize,
						'isopenmax' : options.isopenmax,
						'istitlebar' : options.isresize,
						'istitlebarFullscreen' : options.isresize ? window.fullScreenApi.supportsFullScreen == true ? true : false : false,
						'issetbar' : options.issetbar,
						'isflash' : options.isflash
					};
					$('#desk').append(windowTemp(TEMP.windowTemp));
					$(windowId).data('info', TEMP.windowTemp);
					BLUEKING.CONFIG.windowIndexid += 1;
					BLUEKING.window.setPos(false);
					//iframe加载完毕后，隐藏loading遮罩层
					$(windowId + ' iframe').load(function(){
						$(windowId + ' .window-frame').children('div').eq(1).fadeOut();
					});
					BLUEKING.window.show2top(options.appid);
				}
				nextDo({
					type : type,
					appid : appid,
					imgsrc : obj.imgsrc ? obj.imgsrc : staticUrl + 'img/ui/default_icon.png',
					title : obj.title,
					url : obj.url,
					width : obj.width,
					height : obj.height,
					isresize : typeof(obj.isresize) == 'undefined' ? false : obj.isresize,
					isopenmax : typeof(obj.isopenmax) == 'undefined' ? false : obj.isopenmax,
					issetbar : false,
					isflash : typeof(obj.isflash) == 'undefined' ? true : obj.isflash
				});
			}else{
				//如果是跳转url
				if(app_url){
					var windowId = '#w_' + appid;
					$(windowId).find('iframe').attr('src', app_url);
					if(app_url == "/app_collection/"){
						$(windowId).css({'width':obj.width});
						$(windowId).css({'height':obj.height});
						//判断是否用当前浏览器窗口最大值打开app
						var win_width = obj.width;			//app设置的宽度
						var win_height = obj.height;		//app设置的高度
						var win_width_short = $(window).width() - obj.width;	//window宽度 与 app设置的宽度差
						var win_height_short = $(window).height() - obj.height;	//window高度 与 app设置的高度差
						//app不是最大化打开且是可以缩放的情况下
						if(obj.isresize == true && obj.isopenmax == false){
							if(win_width_short < 0){
								win_width = $(window).width();
							}
							if(win_height_short < 0){
								win_height = $(window).height();
							}
						}
						var windowdata = $(windowId).data('info');
						windowdata['emptyW'] = win_width_short;
						windowdata['emptyH'] = win_height_short;
						windowdata['width'] = win_width;
						windowdata['height'] = win_height;
					}
				}else{
					//如果设置强制刷新
					if(obj.refresh){
						var windowId = '#w_' + appid;
						$(windowId).find('iframe').attr('src', obj.url);
					}else{
						//应用市场跳转链接
						if(obj.appid == 'bk-yysc' && (obj.url.indexOf('?id=') >= 0 || obj.url.indexOf('?searchkey=') >= 0)){
							var windowId = '#w_' + appid;
							$(windowId).find('iframe').attr('src', obj.url);
						}
					}
				}
			}
		},
		/*
		**  创建窗口
		**  系统窗口：BLUEKING.window.create(appid, [type]);
		**      示例：BLUEKING.window.create(12);
		*/
		create : function(appid, app_url, appcode, isnotadd){
			//判断窗口是否已打开
			var iswindowopen = false;
			$('#task-content-inner a.task-item').each(function(){
				if($(this).attr('appid') == appid){
					iswindowopen = true;
					BLUEKING.window.show2top(appid);
					return false;
				}
			});
			//如果没有打开，则进行创建
			if(!iswindowopen && $('#d_' + appid).attr('opening') != 1){
				$('#d_' + appid).attr('opening', 1);
				function nextDo(options){
					var windowId = '#w_' + options.appid;
					//判断是否用当前浏览器窗口最大值打开app
					var win_width = options.width;	 //app设置的宽度
					var win_height = options.height; //app设置的高度
					var win_width_short = $(window).width() - options.width;	//window宽度 与 app设置的宽度差
					var win_height_short = $(window).height() - options.height;	//window高度 与 app设置的高度差
					//app不是最大化打开且是可以缩放的情况下
					if(options.isopenmax == false){
						if(win_width_short < 0){
							win_width = $(window).width();
						}
						if(win_height_short < 0){
							win_height = $(window).height();
						}
					}
					// window top & left
					var top = win_height_short / 2 <= 0 ? 0 : win_height_short / 2;
					var left = win_width_short / 2 <= 0 ? 0 : win_width_short / 2;
					switch(options.type){
						case 'app':
						case 'papp':
							//新增任务栏
							$('#task-content-inner').prepend(taskTemp({
								'type' : options.type,
								'id' : 't_' + options.appid,
								'appid' : options.appid,
								'title' : options.title,
								'imgsrc' : options.imgsrc,
								'app_code': options.app_code
							}));
							BLUEKING.taskbar.resize();
							// 如果需要打开某个具体的页面，则url改变
							var _url = options.url;

							if(parseInt(options.app_type) == 2){
								// 判断域名是否为蓝鲸域名
								var p = new Poly9.URLParser(_url);
								app_host = p.getHost();
								if((app_host.match(/^(o.ied.com|open.oa.com|o.oa.com)$/i))){
									var app_host_pattern = new RegExp(app_host);
									var cur_domain = window.location.host;
									_url = _url.replace(app_host_pattern, cur_domain)
								}
							}

							if(app_url){
								var re_url = new RegExp('^http:', 'gi');
								if(parseInt(options.app_type) == 2 || (parseInt(options.app_type) == 0 && re_url.test(_url) == true)){//第三方应用
									_url = app_url;
								}else{
                                    _url = app_url;
									// 判断app_url格式
									var re_url = new RegExp('^\/s\/'+options.app_code+'\/', 'gi')
									// url不是/s/app_code/开头测判断
									if(re_url.test(_url) == false){
										var _re_h = /^\//gi;
										//以'/'开头
										if(_re_h.test(_url) == true){
											_url = BLUEKING.corefunc.get_app_url(options.app_code) + app_url;
										}else{
                                            _url = BLUEKING.corefunc.get_app_url(options.app_code)+ '/' + app_url;
										}
										// 结尾加上'/'
										var _re_l = /\/$/gi;
										if(_re_l.test(_url) == false){
											_url = _url + '/';
										}
									}
								}
							}
							// app_code 在指定队列中时，跳转到系统提示页面
							if($.inArray(options.app_code, BLUEKING.CONFIG.TIPS_APPCODE)>=0){
								_url = urlPrefix + "tips/" + options.app_code + "/" + "?next=" + encodeURIComponent(_url);
							}else{
								// 如果应用有更新，则跳转至更新信息页面
								if(options.is_tips == 1){
									_url = urlPrefix + "update/features/" + options.app_code + "/" + "?next=" + encodeURIComponent(_url);
								}
							}
							//新增窗口
							TEMP.windowTemp = {
								'top' : top,
								'left' : left,
								'emptyW' : win_width_short,
								'emptyH' : win_height_short,
								'width' : win_width,
								'height' : win_height,
								'zIndex' : BLUEKING.CONFIG.windowIndexid,
								'type' : options.type,
								'id' : 'w_' + options.appid,
								'appid' : options.appid,
								'realappid' : options.realappid,
								'title' : options.title,
								'url' : _url,
								'imgsrc' : options.imgsrc,
								'isresize' : options.isresize == 1 ? true : false,
								'isopenmax' : options.isresize == 1 ? options.isopenmax == 1 ? true : false : false,
								'istitlebar' : options.isresize == 1 ? true : false,
								'istitlebarFullscreen' : options.isresize == 1 ? window.fullScreenApi.supportsFullScreen == true ? true : false : false,
								'issetbar' : options.issetbar == 1 ? true : false,
								'isflash' : options.isflash == 1 ? true : false
							};
							$('#desk').append(windowTemp(TEMP.windowTemp));
							$(windowId).data('info', TEMP.windowTemp);
							BLUEKING.CONFIG.windowIndexid += 1;
							BLUEKING.window.setPos(false);
							//iframe加载完毕后，隐藏loading遮罩层
							$(windowId + ' iframe').load(function(){
								$(windowId + ' .window-frame').children('div').fadeOut();
							});
							BLUEKING.window.show2top(options.appid);
							// 记录app使用信息
							app_record_by_user(options.realappid);
							break;
						case 'folder':
							//新增任务栏
							$('#task-content-inner').prepend(taskTemp({
								'type' : options.type,
								'id' : 't_' + options.appid,
								'appid' : options.appid,
								'app_code': '',
								'title' : options.title,
								'imgsrc' : options.imgsrc
							}));
							BLUEKING.taskbar.resize();
							//新增窗口
							TEMP.folderWindowTemp = {
								'top' : top,
								'left' : left,
								'emptyW' : $(window).width() - options.width,
								'emptyH' : $(window).height() - options.height,
								'width' : options.width,
								'height' : options.height,
								'zIndex' : BLUEKING.CONFIG.windowIndexid,
								'type' : options.type,
								'id' : 'w_' + options.appid,
								'appid' : options.appid,
								'title' : options.title,
								'imgsrc' : options.imgsrc
							};
							$('#desk').append(folderWindowTemp(TEMP.folderWindowTemp));
							$(windowId).data('info', TEMP.folderWindowTemp);
							BLUEKING.CONFIG.windowIndexid += 1;
							BLUEKING.window.setPos(false);
							//载入文件夹内容
							var sc = '';
							$(BLUEKING.VAR.folder).each(function(){
								if(this.appid == options.appid){
									sc = this.apps;
									return false;
								}
							});
							if(sc != ''){
								var folder_append = '';
								$(sc).each(function(){
									if(this.title != ''){
										var _audit_title = this.name + '（' + this.title +'）';
									}else{
										var _audit_title = this.name;
									}
									folder_append += appbtnTemp({
										'title' : _audit_title,
										'name' : this.name,
										'type' : this.type,
										'id' : 'd_' + this.appid,
										'appid' : this.appid,
										'ad_pic': this.ad_pic,
										'code' : this.app_code,
										'imgsrc' : this.icon,
										'isoutline': this.isoutline
									});
								});
								$(windowId).find('.folder_body').append(folder_append);
							}
							BLUEKING.window.show2top(options.appid);
							break;
					}
				}
				ZENG.msgbox.show('应用正在加载中，请耐心等待...', 6, 100000);
				//判断app打开方式，没有添加则使用appcode查找app信息，打开了则使用appid（用户ID）查找
				if((typeof(appid)=='number' || appid.match('^[0-9]+$')) && !isnotadd){
					var get_app_url = urlPrefix + 'get_my_app_by_id/' + appid + '/';
				}else{
					var get_app_url = urlPrefix + 'get_my_app_by_code/' + appid + '/';
				}
//				$.ajax({
//					type : 'POST',
//					url : ajaxUrl,
//					data : 'ac=getMyAppById&id=' + appid + '&type=' + type,
//					dataType : 'json'
//				}).done(function(app){
//					ZENG.msgbox._hide();
//					if(app != null){
//						if(app['error'] == 'ERROR_NOT_FOUND'){
//							ZENG.msgbox.show('应用不存在，建议删除', 5, 2000);
//						}else if(app['error'] == 'ERROR_NOT_INSTALLED'){
//							BLUEKING.window.createTemp({
//								appid : 'hoorayos-yysc',
//								title : '应用市场',
//								url : 'sysapp/appmarket/index.php?id=' + $('#d_' + appid).attr('realappid'),
//								width : 800,
//								height : 484,
//								isflash : false,
//								refresh : true
//							});
//						}else{
//							nextDo({
//								type : app['type'],
//								appid : app['appid'],
//								realappid : app['realappid'],
//								title : app['name'],
//								imgsrc : app['icon'],
//								url : app['url'],
//								width : app['width'],
//								height : app['height'],
//								isresize : app['isresize'],
//								isopenmax : app['isopenmax'],
//								issetbar : app['issetbar'],
//								isflash : app['isflash']
//							});
//						}
//					}else{
//						ZENG.msgbox.show('数据拉取失败', 5, 2000);
//					}
//					$('#d_' + appid).attr('opening', 0);
//				});
				$.getJSON(get_app_url, function(app){
					if(app != null){
						if(app['error'] == 'E100'){
							if(app['type'] == 'folder'){
								ZENG.msgbox.show('文件夹不存在，建议删除', 5, 2000);
							}else{
								ZENG.msgbox.show('应用不存在，建议卸载', 5, 2000);
							}
						}else if(app['error']=='E501' || app['error']=='E502' || app['error']=='E503'){
							ZENG.msgbox.show('应用加载失败，请重试', 5, 2000);
						}else if(app['error']=='E400'){
							//appid（用户appid）存在则使用，不存在则用code
							if(app['appid']){
								var _appid = app['appid'];
							}else{
								var _appid = app['app_code'];
							}
							ZENG.msgbox.show('您没有操作该应用的权限，正在为您卸载该应用...', 5, 2000);
							BLUEKING.app.remove(_appid, function(){
//								ZENG.msgbox.show('卸载成功', 1, 1000);
								BLUEKING.app.get();
							});
						}else{
							//appid（用户appid）存在则使用，不存在则用code
							if(app['appid']){
								var _appid = app['appid'];
							}else{
								var _appid = app['app_code'];
							}
							if(app['is_outline']==1){
								ZENG.msgbox.show('应用已经下架，正在为您卸载该应用...', 5, 2000);
								BLUEKING.app.remove(_appid, function(){
//									ZENG.msgbox.show('卸载成功', 1, 1000);
									BLUEKING.app.get();
								});
							}else{
								ZENG.msgbox._hide();
								nextDo({
									type : app['type'],
									id : _appid,
									appid : _appid,
									realappid : app['realappid'],
									title : app['name'],
									imgsrc : app['icon'],
									url : app['url'],
									width : app['width']=='' ? 890 : app['width'], 		//应用的默认宽度为 890
									height : app['height']=='' ? 550 : app['height'],	//应用的默认高度为 550
									isresize : app['isresize'],
									isopenmax : app['isopenmax'],
									issetbar : app['issetbar'],
									isflash : app['isflash'],
									app_code : app['app_code'],
									app_type : app['app_type'],
									is_tips: app['is_tips']
								});
							}
						}
					}else{
						ZENG.msgbox.show('数据拉取失败', 5, 2000);
					}
					$('#d_' + appid).attr('opening', 0);
				});
			}else{
				//app已经打开，带url，强制刷新
				var window_app = '#w_' + appid;
				if(app_url){
					$(window_app).find('iframe').attr('src', app_url);
				}else{ //没有带url，传参选择是否弹出刷新提示
					if(appcode){
						//判断应用是否在首页
						var app_iframe_src = $(window_app).find('iframe').attr('src');
						var re1 = BLUEKING.corefunc.get_app_url(appcode);
						var re2 = BLUEKING.corefunc.get_app_url(appcode);
						if(re1 != app_iframe_src && re2 != app_iframe_src){
							//app不在首页，则提示是否刷新到首页
							art.dialog({
								title: "温馨提示",
								width: 340,
								icon: 'warning',
								lock: true,
								content: '该应用已经打开，是否刷新到应用首页？',
								okVal: '刷新',
								ok: function(){
									$(window_app).find('iframe').attr('src', BLUEKING.corefunc.get_app_url(appcode));
								},
								cancelVal:'不刷新',
								cancel: function(){}
							});
						}
					}
				}
			}
		},
		setPos : function(isAnimate){
			isAnimate = isAnimate == null ? true : isAnimate;
			$('#desk .window-container').each(function(){
				var windowdata = $(this).data('info');
				var currentW = $(window).width() - $(this).width();
				var currentH = $(window).height() - $(this).height();
				var left = 0;
				var top = 0;
				if(windowdata['emptyW'] != 0){
					left = windowdata['left'] / windowdata['emptyW'] * currentW >= currentW ? currentW : windowdata['left'] / windowdata['emptyW'] * currentW;
				}
				left = left <= 0 ? 0 : left;
				if(windowdata['emptyH'] != 0){
					top = windowdata['top'] / windowdata['emptyH'] * currentH >= currentH ? currentH : windowdata['top'] / windowdata['emptyH'] * currentH;
				}
				top = top <= 0 ? 0 : top;
				if($(this).attr('state') != 'hide'){
					$(this).stop(true, false).animate({
						'left' : left,
						'top' : top
					}, isAnimate ? 500 : 0, function(){
						windowdata['left'] = left;
						windowdata['top'] = top;
						windowdata['emptyW'] = $(window).width() - $(this).width();
						windowdata['emptyH'] = $(window).height() - $(this).height();
					});
				}else{
					windowdata['left'] = left;
					windowdata['top'] = top;
					windowdata['emptyW'] = $(window).width() - $(this).width();
					windowdata['emptyH'] = $(window).height() - $(this).height();
				}
			});
		},
		close : function(appid){
			var windowId = '#w_' + appid, taskId = '#t_' + appid;
			$(windowId).removeData('info').html('').remove();
			$('#task-content-inner ' + taskId).html('').remove();
			$('#task-content-inner').css('width', $('#task-content-inner .task-item').length * 114);
			$('#task-bar, #nav-bar').removeClass('min-zIndex');
			BLUEKING.taskbar.resize();
		},
		closeAll : function(){
			$('#desk .window-container').each(function(){
				BLUEKING.window.close($(this).attr('appid'));
			});
		},
		hide : function(appid){
			var windowId = '#w_' + appid, taskId = '#t_' + appid;
			$(windowId).css('left', -10000).attr('state', 'hide');
			$('#task-content-inner ' + taskId).removeClass('task-item-current');
			if($(windowId).attr('ismax') == 1){
				$('#task-bar, #nav-bar').removeClass('min-zIndex');
			}
		},
		hideAll : function(){
			$('#task-content-inner a.task-item').removeClass('task-item-current');
			$('#desk-' + BLUEKING.CONFIG.desk).nextAll('div.window-container').css('left', -10000).attr('state', 'hide');
		},
		max : function(appid){
			BLUEKING.window.show2top(appid);
			var windowId = '#w_' + appid, taskId = '#t_' + appid;
			$(windowId + ' .title-handle .ha-max').hide().next(".ha-revert").show();
			$(windowId).addClass('window-maximize').attr('ismax',1).animate({
				width : '100%',
				height : '100%',
				top : 0,
				left : 0
			}, 200);
			$('#task-bar, #nav-bar').addClass('min-zIndex');
		},
		revert : function(appid){
			BLUEKING.window.show2top(appid);
			var windowId = '#w_' + appid, taskId = '#t_' + appid;
			$(windowId + ' .title-handle .ha-revert').hide().prev('.ha-max').show();
			var obj = $(windowId), windowdata = obj.data('info');
			obj.removeClass('window-maximize').attr('ismax',0).animate({
				width : windowdata['width'],
				height : windowdata['height'],
				left : windowdata['left'],
				top : windowdata['top']
			}, 500);
			$('#task-bar, #nav-bar').removeClass('min-zIndex');
		},
		refresh : function(appid){
			BLUEKING.window.show2top(appid);
			var windowId = '#w_' + appid, taskId = '#t_' + appid;
			//判断是应用窗口，还是文件夹窗口
			if($(windowId + '_iframe').length != 0){
				$(windowId + '_iframe').attr('src', $(windowId + '_iframe').attr('org_src'));
			}else{
				BLUEKING.window.updateFolder(appid);
			}
		},
		refresh_current:function(appid){
			BLUEKING.window.show2top(appid);
			var windowId = '#w_' + appid, taskId = '#t_' + appid;
			//判断是应用窗口，还是文件夹窗口
			if($(windowId + '_iframe').length != 0){
				$(windowId + '_iframe').attr('src', document.getElementById('w_' + appid + '_iframe').contentWindow.location.href);
			}else{
				BLUEKING.window.updateFolder(appid);
			}
		},
		show2top : function(appid, isAnimate){
			isAnimate = isAnimate == null ? false : isAnimate;
			var windowId = '#w_' + appid, taskId = '#t_' + appid;
			var windowdata = $(windowId).data('info');
			var arr = [];
			function show(){
				BLUEKING.window.show2under();
				//改变当前任务栏样式
				$('#task-content-inner ' + taskId).addClass('task-item-current');
				if($(windowId).attr('ismax') == 1){
					$('#task-bar, #nav-bar').addClass('min-zIndex');
				}
				//改变当前窗口样式
				$(windowId).addClass('window-current').css({
					'z-index' : BLUEKING.CONFIG.windowIndexid,
					'left' : windowdata['left'],
					'top' : windowdata['top']
				}).attr('state', 'show');
				//如果窗口最小化前是最大化状态的，则坐标位置设为0
				if($(windowId).attr('ismax') == 1){
					$(windowId).css({
						'left' : 0,
						'top' : 0
					});
				}
				//改变当前窗口遮罩层样式
				$(windowId + ' .window-mask').hide();
				//改变当前iframe显示
				$(windowId + ' iframe').show();
				BLUEKING.CONFIG.windowIndexid += 1;
			}
			if(isAnimate){
				var baseStartX = $(windowId).offset().left, baseEndX = baseStartX + $(windowId).width();
				var baseStartY = $(windowId).offset().top, baseEndY = baseStartY + $(windowId).height();
				var baseCenterX = baseStartX + ($(windowId).width() / 2), baseCenterY = baseStartY + ($(windowId).height() / 2);
				var baseZIndex = parseInt($(windowId).css('zIndex'));
				$('#desk .window-container:not(' + windowId + ')').each(function(){
					var thisStartX = $(this).offset().left, thisEndX = thisStartX + $(this).width();
					var thisStartY = $(this).offset().top, thisEndY = thisStartY + $(this).height();
					var thisCenterX = thisStartX + ($(this).width() / 2), thisCenterY = thisStartY + ($(this).height() / 2);
					var thisZIndex = parseInt($(this).css('zIndex'));
					var flag = '';
					if(thisZIndex > baseZIndex){
						//  常规情况，只要有一个角处于区域内，则可以判断窗口有覆盖
						//   _______            _______        _______    _______
						//  |    ___|___    ___|       |   ___|___    |  |       |___
						//  |   |       |  |   |       |  |       |   |  |       |   |
						//  |___|       |  |   |_______|  |       |___|  |_______|   |
						//      |_______|  |_______|      |_______|          |_______|
						if(
							(thisStartX >= baseStartX && thisStartX <= baseEndX && thisStartY >= baseStartY && thisStartY <= baseEndY)
							||
							(thisStartX >= baseStartX && thisStartX <= baseEndX && thisEndY >= baseStartY && thisEndY <= baseEndY)
							||
							(thisEndX >= baseStartX && thisEndX <= baseEndX && thisStartY >= baseStartY && thisStartY <= baseEndY)
							||
							(thisEndX >= baseStartX && thisEndX <= baseEndX && thisEndY >= baseStartY && thisEndY <= baseEndY)
						){
							flag = 'x';
						}
						//  非常规情况
						//       _______    _______          _____
						//   ___|       |  |       |___    _|     |___
						//  |   |       |  |       |   |  | |     |   |
						//  |___|       |  |       |___|  |_|     |___|
						//      |_______|  |_______|        |_____|
						if(
							(thisStartX >= baseStartX && thisStartX <= baseEndX && thisStartY < baseStartY && thisEndY > baseEndY)
							||
							(thisEndX >= baseStartX && thisEndX <= baseEndX && thisStartY < baseStartY && thisEndY > baseEndY)
						){
							flag = 'x';
						}
						//      _____       ___________      _____
						//   __|_____|__   |           |   _|_____|___
						//  |           |  |           |  |           |
						//  |           |  |___________|  |___________|
						//  |___________|     |_____|       |_____|
						if(
							(thisStartY >= baseStartY && thisStartY <= baseEndY && thisStartX < baseStartX && thisEndX > baseEndX)
							||
							(thisEndY >= baseStartY && thisEndY <= baseEndY && thisStartX < baseStartX && thisEndX > baseEndX)
						){
							flag = 'y';
						}
						//  两个角处于区域内，另外两种情况不用处理，因为这两种情况下，被移动的窗口是需要进行上下滑动，而非左右
						//      _____       ___________
						//   __|     |__   |   _____   |
						//  |  |     |  |  |  |     |  |
						//  |  |_____|  |  |__|     |__|
						//  |___________|     |_____|
						if(
							(thisStartX >= baseStartX && thisStartX <= baseEndX && thisEndY >= baseStartY && thisEndY <= baseEndY)
							&&
							(thisEndX >= baseStartX && thisEndX <= baseEndX && thisEndY >= baseStartY && thisEndY <= baseEndY)
							||
							(thisStartX >= baseStartX && thisStartX <= baseEndX && thisStartY >= baseStartY && thisStartY <= baseEndY)
							&&
							(thisEndX >= baseStartX && thisEndX <= baseEndX && thisStartY >= baseStartY && thisStartY <= baseEndY)
						){
							flag = 'y';
						}
					}
					if(flag != ''){
						var direction, distance;
						if(flag == 'x'){
							if(thisCenterX > baseCenterX){
								direction = 'right';
								distance = baseEndX - thisStartX + 30;
							}else{
								direction = 'left';
								distance = thisEndX - baseStartX + 30;
							}
						}else{
							if(thisCenterY > baseCenterY){
								direction = 'bottom';
								distance = baseEndY - thisStartY + 30;
							}else{
								direction = 'top';
								distance = thisEndY - baseStartY + 30;
							}
						}
						arr.push({
							id : $(this).attr('id'),
							direction : direction, //移动方向
							distance : distance //移动距离
						});
					}
				});
				//开始移动
				var delayTime = 0;
				for(var i = 0; i < arr.length; i++){
					var baseLeft = $('#' + arr[i].id).offset().left, baseTop = $('#' + arr[i].id).offset().top;
					if(arr[i].direction == 'left'){
						$('#' + arr[i].id).delay(delayTime).animate({
							left : baseLeft - arr[i].distance
						}, 300).animate({
							left : baseLeft
						}, 300);
					}else if(arr[i].direction == 'right'){
						$('#' + arr[i].id).delay(delayTime).animate({
							left : baseLeft + arr[i].distance
						}, 300).animate({
							left : baseLeft
						}, 300);
					}else if(arr[i].direction == 'top'){
						$('#' + arr[i].id).delay(delayTime).animate({
							top : baseTop - arr[i].distance
						}, 300).animate({
							top : baseTop
						}, 300);
					}else if(arr[i].direction == 'bottom'){
						$('#' + arr[i].id).delay(delayTime).animate({
							top : baseTop + arr[i].distance
						}, 300).animate({
							top : baseTop
						}, 300);
					}
					delayTime += 100;
				}
				setTimeout(show, delayTime + 100);
			}else{
				show();
			}
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
		updateFolder : function(appid){
			var windowId = '#w_' + appid, taskId = '#t_' + appid;
			var sc = '';
			$(BLUEKING.VAR.folder).each(function(){
				if(this.appid == appid){
					sc = this.apps;
					return false;
				}
			});
			if(sc != null){
				var folder_append = '';
				for(var i = 0; i < sc.length; i++){
					if(sc[i]['title'] != ''){
						var _audit_title = sc[i]['title'] + '（' + this.title +'）';
					}else{
						var _audit_title = sc[i]['title'];
					}
					folder_append += appbtnTemp({
						'top' : 0,
						'left' : 0,
						'title' : _audit_title,
						'name' : sc[i]['name'],
						'type' : sc[i]['type'],
						'id' : 'd_' + sc[i]['appid'],
						'appid' : sc[i]['appid'],
						'ad_pic': sc[i]['ad_pic'],
						'code': sc[i]['app_code'],
						'imgsrc' : sc[i]['icon'],
						'isoutline': sc[i]['isoutline']
					});
				}
				$(windowId).find('.folder_body').html('').append(folder_append).on('contextmenu', '.appbtn', function(e){
					$('.popup-menu').hide();
					$('.quick_view_container').remove();
					TEMP.AppRight = BLUEKING.popupMenu.app($(this));
					var l = ($(window).width() - e.clientX) < TEMP.AppRight.width() ? (e.clientX - TEMP.AppRight.width()) : e.clientX;
					var t = ($(window).height() - e.clientY) < TEMP.AppRight.height() ? (e.clientY - TEMP.AppRight.height()) : e.clientY;
					TEMP.AppRight.css({
						left : l,
						top : t
					}).show();
					return false;
				});
			}
		},
		handle : function(){
			$('#desk').on('mousedown', '.window-container .title-bar .title-handle a', function(e){
				e.preventDefault();
				e.stopPropagation();
			});
			$('#desk').on('dblclick', '.window-container .title-bar', function(e){
				var obj = $(this).parents('.window-container');
				//判断当前窗口是否已经是最大化
				if(obj.find('.ha-max').is(':hidden')){
					obj.find('.ha-revert').click();
				}else{
					obj.find('.ha-max').click();
				}
			}).on('click', '.window-container .ha-hide', function(){
				var obj = $(this).parents('.window-container');
				BLUEKING.window.hide(obj.attr('appid'));
			}).on('click', '.window-container .ha-max', function(){
				var obj = $(this).parents('.window-container');
				BLUEKING.window.max(obj.attr('appid'));
			}).on('click', '.window-container .ha-revert', function(){
				var obj = $(this).parents('.window-container');
				BLUEKING.window.revert(obj.attr('appid'));
			}).on('click', '.window-container .ha-fullscreen', function(){
				var obj = $(this).parents('.window-container');
				window.fullScreenApi.requestFullScreen(document.getElementById(obj.find('iframe').attr('id')));
			}).on('click', '.window-container .ha-close', function(){
				var obj = $(this).parents('.window-container');
				BLUEKING.window.close(obj.attr('appid'));
			}).on('click', '.window-container .refresh', function(){
				var obj = $(this).parents('.window-container');
				BLUEKING.window.refresh(obj.attr('appid'));
			}).on('click', '.window-container .refresh_current', function(){
				var obj = $(this).parents('.window-container');
				BLUEKING.window.refresh_current(obj.attr('appid'));
			}).on('click', '.window-container .detail', function(){
				var obj = $(this).parents('.window-container');
				if(obj.attr('realappid') !== 0){
					BLUEKING.window.create_market(obj.attr('realappid'));
				}else{
					ZENG.msgbox.show('对不起，该应用没有任何详细介绍', 1, 2000);
				}
			}).on('click', '.window-container .star', function(){
				var obj = $(this).parents('.window-container');
				$.ajax({
					type : 'POST',
					url : urlPrefix + 'get_app_star/' + obj.data('info').realappid + '/',
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
						$('#star ul').data('appid', obj.data('info').realappid);
					}
				});
				$('body').off('click').on('click', '#star ul li', function(){
					var num = $(this).attr('num');
					var appid = $(this).parent('ul').data('appid');
					if(!isNaN(num) && /^[1-5]$/.test(num)){
						$.ajax({
							type : 'POST',
							url : urlPrefix + 'update_app_star/' + appid + '/',
							data : 'starnum=' + num,
							success : function(msg){
								art.dialog.list['star'].close();
								if(msg==1){
									ZENG.msgbox.show("打分成功！", 4, 2000);
								}else if(msg==2){
									ZENG.msgbox.show("你已经打过分了！", 1, 2000);
								}else{
									ZENG.msgbox.show("打分出错！", 1, 2000);
								}
							}
						});
					}
				});
			}).on('click', '.window-container .user_ce', function(){
				var obj = $(this).parents('.window-container');
				var str = "editor" + new Date().getTime();
				$.dialog({
					title: "问题反馈",
					id: "user_ce",
					width:600,
					content:userCeDialogTemp({'editor': str}),
				});
				// var editor = UM.getEditor(str);
				// editor.focus(true);
				$("#"+str).focus();
				$('body').off('click').on('click', "#submit_feedback", function(){
					console.log($("#submit_feedback").hasClass('disabled'))
					if ($("#submit_feedback").hasClass('disabled')){
						return;
					}
					var editor_content = $("#"+str).val();
					if (editor_content ==""){
						ZENG.msgbox.show("反馈内容不能为空，请填写反馈内容！", 1, 2000);
						return;
					}
					$("#submit_feedback").addClass('disabled');
					$.ajax({
						type: 'POST',
						url: urlPrefix + 'user_question_feedback/' + obj.data('info').realappid + '/',
						data: {'feedback_content': editor_content},
						success: function(msg){
							if(msg == 1){
								ZENG.msgbox.show("反馈成功！", 4, 1000);
								art.dialog.list['user_ce'].close();
							}else if(msg == 2){
								ZENG.msgbox.show("反馈失败，内容不能为空！", 1, 2000);
							}else {
								ZENG.msgbox.show("提交反馈出错！", 1, 2000);
							}
							$("#submit_feedback").removeClass('disabled');
						}
					});
				});
			}).on('contextmenu', '.window-container', function(){
				$('.popup-menu').hide();
				$('.quick_view_container').remove();
				return false;
			});
		},
		move : function(){
			$('#desk').on('mousedown', '.window-container .title-bar', function(e){
				var obj = $(this).parents('.window-container');
				if(obj.attr('ismax') == 1){
					return false;
				}
				BLUEKING.window.show2top(obj.attr('appid'));
				var windowdata = obj.data('info');
				var x = e.clientX - obj.offset().left;
				var y = e.clientY - obj.offset().top;
				var lay;
				//绑定鼠标移动事件
				$(document).on('mousemove', function(e){
					lay = BLUEKING.maskBox.desk();
					lay.show();
					//强制把右上角还原按钮隐藏，最大化按钮显示
					obj.find('.ha-revert').hide().prev('.ha-max').show();
					obj.css({
						width : windowdata['width'],
						height : windowdata['height'],
						left : e.clientX - x,
						top : e.clientY - y <= 10 ? 0 : e.clientY - y >= lay.height()-30 ? lay.height()-30 : e.clientY - y
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
			$('#desk').on('mousedown', '.window-container .window-resize', function(e){
				var obj = $(this).parents('.window-container');
				var resizeobj = $(this);
				var lay;
				var x = e.clientX;
				var y = e.clientY;
				var w = obj.width();
				var h = obj.height();
				$(document).on('mousemove', function(e){
					lay = BLUEKING.maskBox.desk();
					lay.show();
					//当拖动到屏幕边缘时，自动贴屏
					var _x = e.clientX <= 10 ? 0 : e.clientX >= (lay.width() - 12) ? (lay.width() - 2) : e.clientX;
					var _y = e.clientY <= 10 ? 0 : e.clientY >= (lay.height() - 12) ? lay.height() : e.clientY;
					switch(resizeobj.attr('resize')){
						case 't':
							h + y - _y > BLUEKING.CONFIG.windowMinHeight ? obj.css({
								height : h + y - _y,
								top : _y
							}) : obj.css({
								height : BLUEKING.CONFIG.windowMinHeight
							});
							break;
						case 'r':
							w - x + _x > BLUEKING.CONFIG.windowMinWidth ? obj.css({
								width : w - x + _x
							}) : obj.css({
								width : BLUEKING.CONFIG.windowMinWidth
							});
							break;
						case 'b':
							h - y + _y > BLUEKING.CONFIG.windowMinHeight ? obj.css({
								height : h - y + _y
							}) : obj.css({
								height : BLUEKING.CONFIG.windowMinHeight
							});
							break;
						case 'l':
							w + x - _x > BLUEKING.CONFIG.windowMinWidth ? obj.css({
								width : w + x - _x,
								left : _x
							}) : obj.css({
								width : BLUEKING.CONFIG.windowMinWidth
							});
							break;
						case 'rt':
							h + y - _y > BLUEKING.CONFIG.windowMinHeight ? obj.css({
								height : h + y - _y,
								top : _y
							}) : obj.css({
								height : BLUEKING.CONFIG.windowMinHeight
							});
							w - x + _x > BLUEKING.CONFIG.windowMinWidth ? obj.css({
								width : w - x + _x
							}) : obj.css({
								width : BLUEKING.CONFIG.windowMinWidth
							});
							break;
						case 'rb':
							w - x + _x > BLUEKING.CONFIG.windowMinWidth ? obj.css({
								width : w - x + _x
							}) : obj.css({
								width : BLUEKING.CONFIG.windowMinWidth
							});
							h - y + _y > BLUEKING.CONFIG.windowMinHeight ? obj.css({
								height : h - y + _y
							}) : obj.css({
								height : BLUEKING.CONFIG.windowMinHeight
							});
							break;
						case 'lt':
							w + x - _x > BLUEKING.CONFIG.windowMinWidth ? obj.css({
								width : w + x - _x,
								left : _x
							}) : obj.css({
								width : BLUEKING.CONFIG.windowMinWidth
							});
							h + y - _y > BLUEKING.CONFIG.windowMinHeight ? obj.css({
								height : h + y - _y,
								top : _y
							}) : obj.css({
								height : BLUEKING.CONFIG.windowMinHeight
							});
							break;
						case 'lb':
							w + x - _x > BLUEKING.CONFIG.windowMinWidth ? obj.css({
								width : w + x - _x,
								left : _x
							}) : obj.css({
								width : BLUEKING.CONFIG.windowMinWidth
							});
							h - y + _y > BLUEKING.CONFIG.windowMinHeight ? obj.css({
								height : h - y + _y
							}) : obj.css({
								height : BLUEKING.CONFIG.windowMinHeight
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
			var url = urlPrefix + 'market/';
			if(app_id){
				url += '?id=' + app_id;
			}
			BLUEKING.window.createTemp({
				appid : 'bk-yysc',
				app_code : 'app_market',
				title : '应用市场',
				url : url,
				width : 1010,
				height : 623,
				imgsrc : staticUrl + 'img/shortcut/tool_app/market.png',
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
			BLUEKING.window.createTemp({
				appid : 'bk-yysc',
				app_code : 'app_market',
				title : '应用市场',
				url : url,
				width : 1010,
				height : 623,
				imgsrc : staticUrl + 'img/shortcut/tool_app/market.png',
				isflash : false,
				//isresize: true,
				refresh : false //需要强制刷新
			});
		},
		create_app_statistics : function(app_url){
			BLUEKING.window.createTemp({
				appid : 'bk-tj',
				app_code: 'app_statistics',
				title : '统计',
				url : BLUEKING.corefunc.get_bk_path() + '/app_statistics/',
				width : 1345,
				height : 721,
				isresize : true,
				imgsrc : staticUrl + 'img/shortcut/tool_app/app_statistics.png',
				isflash : false,
				refresh : false
			}, app_url);
		},
		create_app_admin : function(appid, title, app_url){
			BLUEKING.window.createTemp({
				appid : appid,
				app_code: appid,
				title : title,
				url : app_url,
				width : 990,
				height : 566,
				imgsrc : staticUrl + 'img/shortcut/tool_app/developer_tool.png',
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
				if( !$(event.target).is("#desk li.appbtn.add") && !$(event.target).parents().is("#desk li.appbtn.add")){ //!$(event.target).is("#desk_add_menu") && !$(event.target).parents().is("#desk_add_menu") &&
					$("#desk_add_menu").hide();
				}
			});
		}
	}
})();
