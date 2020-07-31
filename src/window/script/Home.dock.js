/*
**  应用码头
*/
Home.dock = (function(){
	return {
init : function(){
			Home.dock.getPos(function(){
				Home.dock.setPos();
			});
			//绑定应用码头拖动事件
			Home.dock.move();
			var dockShowtopFunc;
			$('#dock-container').on('mouseenter', function(){
				dockShowtopFunc = setTimeout(function(){
					$('#dock-container').addClass('showtop');
				}, 300);
			}).on('mouseleave', function(){
				clearInterval(dockShowtopFunc);
				$(this).removeClass('showtop');
			});
			$('body').on('contextmenu', '#dock-container', function(e){
				Home.popupMenu.hide();
				Home.folderView.hide();
				//Home.searchbar.hide();
				Home.startmenu.hide();
				var popupmenu = Home.popupMenu.dock();
				var l = ($(window).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
				var t = ($(window).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
				popupmenu.css({
					left : l,
					top : t
				}).show();
				return false;
			});
			//绑定应用码头上各个按钮的点击事件
			//桌面设置
			$('#dock-bar .dock-tool-setting').on('mousedown', function(){
				return false;
			}).on('click',function(){
				Home.window.createTemp({
					appid : 'bk-zmsz',
					title : gettext('桌面设置'),
					url : urlPrefix + 'desk_setting/',
					width : 750,
					height : 520,
					isflash : false
				});
			});
			//主题设置
			$('#dock-bar .dock-tool-style').on('mousedown', function(){
				return false;
			}).on('click', function(){
				Home.window.createTemp({
					appid : 'bk-ztsz',
					title : gettext('主题设置'),
					url : urlPrefix + 'wallpaper/',
					width : 580,
					height : 520,
					isflash : false
				});
			});
			//全局视图
			$('#dock-bar .dock-tool-appmanage').on('mousedown', function(){
				return false;
			}).on('click',function(){
				Home.appmanage.set();
			});
			//搜索
			$('#dock-bar .dock-tool-search').on('mousedown', function(e){
				return false;
			}).on('click',function(e){
				e.stopPropagation();
				Home.searchbar.get();
			});
			//选择桌面
			$('#dock-bar .pagination').on('mousedown', function(){
				return false;
			}).on('click',function(){
				Home.dock.switchDesk($(this).attr('index'));
			});
			//开始菜单（头像，新手指导，关于蓝鲸）
			$('#dock-bar .dock-tool-start').on('mousedown', function(){
				return false;
			}).on('click', function(){
				Home.startmenu.show();
				return false;
			}).on('mouseover', function(){
				Home.MYDEFINE.tool_start = true;
				Home.startmenu.show();
				return false;
			}).on('mouseout', function(){
				Home.MYDEFINE.tool_start = false;
				setTimeout(function(){
					if(!Home.MYDEFINE.startmenu_state && !Home.MYDEFINE.tool_start){
						Home.startmenu.hide();
					}
				}, 200);
				return false;
			});
		},
		getPos : function(fun){
			$.ajax({
				type : 'POST',
				url : ajaxUrl,
				data : 'ac=getDockPos',
				success : function(i){
					Home.CONFIG.dockPos = i;
					Home.dock.setPos();
					if(typeof(fun) != 'undefined'){
						fun();
					}
				}
			});
		},
		setPos : function(){
			var desktop = $('#desk-' + Home.CONFIG.desk), desktops = $('#desktop .desktop-container');
			var desk_w = desktop.css('width', '100%').width(), desk_h = desktop.css('height', '100%').height();
			//清除dock位置样式
			$('#dock-container').removeClass('dock-top').removeClass('dock-left').removeClass('dock-right');
			$('#dock-bar').removeClass('top-bar').removeClass('left-bar').removeClass('right-bar').hide();
			if(Home.CONFIG.dockPos == 'top'){
				$('#dock-bar').addClass('top-bar').children('#dock-container').addClass('dock-top');
				desktops.css({
					'width' : desk_w,
					'height' : desk_h - 143,
					'left' : desk_w,
					'top' : 73
				});
				desktop.css({
					'left' : 0
				});
			}else if(Home.CONFIG.dockPos == 'left'){
				$('#dock-bar').addClass('left-bar').children('#dock-container').addClass('dock-left');
				desktops.css({
					'width' : desk_w - 73,
					'height' : desk_h - 70,
					'left' : desk_w + 73,
					'top' : 0
				});
				desktop.css({
					'left' : 73
				});
			}else if(Home.CONFIG.dockPos == 'right'){
				$('#dock-bar').addClass('right-bar').children('#dock-container').addClass('dock-right');
				desktops.css({
					'width' : desk_w - 73,
					'height' : desk_h - 70,
					'left' : desk_w,
					'top' : 0
				});
				desktop.css({
					'left' : 0
				});
			}
			$('#dock-bar').show();
			Home.taskbar.resize();
		},
		updatePos : function(pos, fun){
			$.ajax({
				type : 'POST',
				url : ajaxUrl,
				data : 'ac=setDockPos&dock=' + pos,
				success : function(){
					Home.CONFIG.dockPos = pos;
					if(typeof(fun) != 'undefined'){
						fun();
					}
				}
			});
		},
		move : function(){
			$('#dock-container').off('mousedown').on('mousedown',function(e){
				if(e.button == 0 || e.button == 1){
					var lay = Home.maskBox.dock(), location;
					$(document).on('mousemove', function(e){
						lay.show();
						if(e.clientY < lay.height() * 0.2){
							location = 'top';
						}else if(e.clientX < lay.width() * 0.5){
							location = 'left';
						}else{
							location = 'right';
						}
						$('.dock_drap_effect').removeClass('hover');
						$('.dock_drap_effect_' + location).addClass('hover');
					}).on('mouseup', function(){
						$(document).off('mousemove').off('mouseup');
						lay.hide();
						if(location != Home.CONFIG.dockPos && typeof(location) != 'undefined'){
							Home.dock.updatePos(location, function(){
								//更新码头位置
								Home.dock.setPos();
								//更新图标位置
								Home.deskTop.appresize();
								//更新滚动条
								Home.app.getScrollbar();
							});
						}
					});
				}
			});
		}
	}
})();