/*
**  图标
*/
Home.app = (function(){
	return {

//	初始化桌面应用
init : function(){
	//绑定'应用市场'点击事件
	$('#desk').on('click', 'li.add', function(e){
		Home.window.create_add_menu(e);
	});
	//绑定应用拖动事件
	Home.app.move();
	//绑定滚动条拖动事件
	Home.app.moveScrollbar();
	//绑定应用右击事件
//	$('body').on('contextmenu', '.appbtn:not(.add)', function(e){
	$('body').on('contextmenu', '#desk ul li', function(e){
//		Home.popupMenu.hide();
		var popupmenu;
		switch($(this).attr('type')){
			case 'app':
			case 'widget':
				popupmenu = Home.popupMenu.app($(this));
				break;
			case 'papp':
			case 'pwidget':
				popupmenu = Home.popupMenu.papp($(this));
				break;
			case 'folder':
				popupmenu = Home.popupMenu.folder($(this));
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
	$('body').on('contextmenu', '.appbtn_dock', function(e){
		Home.popupMenu.hide();
		Home.folderView.hide();
		//Home.searchbar.hide();
		Home.startmenu.hide();
		var popupmenu = Home.popupMenu.desk();
		var l = ($(window).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
		var t = ($(window).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
		popupmenu.css({
			left : l,
			top : t
		}).show();
		return false;
	});
//应用窗口上的评分、分享按钮事件
//	$('body').on('click', '#star ul li', function(){
//		var num = $(this).attr('num');
//		if(!isNaN(num) && /^[1-5]$/.test(num)){
//			$.ajax({
//				type : 'POST',
//				url : ajaxUrl,
//				data : 'ac=updateAppStar&id=' + $('#star').attr('realappid') + '&starnum=' + num
//			}).done(function(responseText){
//				$.dialog.list['star'].close();
//				if(responseText){
//					ZENG.msgbox.show("打分成功！", 4, 2000);
//				}else{
//					ZENG.msgbox.show("你已经打过分了！", 1, 2000);
//				}
//			});
//		}
//	}).on('click', '#share a', function(){
//		$.dialog.list['share'].close();
//	});

//获取桌面应用数据
//	Home.app.getXY(function(){
//		Home.app.get();
//	});
},

		/*
		**  获得图标尺寸，s：小号 m:中号 l大号
		*/
		getiSize : function(func){
			$.ajax({
				type : 'POST',
				url : ajaxUrl,
				data : 'ac=getAppsml'
			}).done(function(s){
				Home.CONFIG.appisize = s;
				if(typeof(func) == 'function'){
					func();
				}
			});
		},
		/*
		**  更新图标排列方式
		*/
		updateiSize : function(s, func){
			$.ajax({
				type : 'POST',
				url : ajaxUrl,
				data : 'ac=setAppiSize&appiSize=' + s
			}).done(function(){
				Home.CONFIG.appiSize = s;
				if(typeof(func) == 'function'){
					func();
				}
			});
		},
		/*
		**  获取图标
		*/
		get : function(){

			//获取json数组并循环输出每个图标
			$.getJSON(ajaxUrl + '?ac=getMyApp', function(sc){
				//加载应用码头图标
/*				if(sc['dock'] != null){
					var dock_append = '', temp = {};
					for(var i = 0; i < sc['dock'].length; i++){
						dock_append += appbtnTemp({
							'top' : dockGrid[i]['startY'],
							'left' : dockGrid[i]['startX'],
							'title' : sc['dock'][i]['name'],
							'type' : sc['dock'][i]['type'],
							'id' : 'd_' + sc['dock'][i]['type'] + '_' + sc['dock'][i]['id'],
							'realid' : sc['dock'][i]['id'],
							'imgsrc' : sc['dock'][i]['icon']
						});
					}
					$('#dock-bar .dock-applist').html('').append(dock_append);
				}	*/
				//加载桌面图标
/*				for(var j = 1; j <= 5; j++){
					var desk_append = '', temp = {};
					if(sc['desk' + j] != null){
						for(var i = 0; i < sc['desk' + j].length; i++){
							desk_append += appbtnTemp({
								'top' : grid[i]['startY'] + 7,
								'left' : grid[i]['startX'] + 16,
								'title' : sc['desk' + j][i]['name'],
								'type' : sc['desk' + j][i]['type'],
								'id' : 'd_' + sc['desk' + j][i]['type'] + '_' + sc['desk' + j][i]['id'],
								'realid' : sc['desk' + j][i]['id'],
								'imgsrc' : sc['desk' + j][i]['icon']
							});
						}
					}
					desk_append += addbtnTemp({
						'top' : grid[i]['startY'] + 7,
						'left' : grid[i]['startX'] + 16
					});
					$('#desk-' + j + ' li').remove();
					$('#desk-' + j).append(desk_append);
					i = 0;
				}	*/
				//绑定'应用市场'图标点击事件
				$('#desk').off('click').on('click', 'li.add', function(){
					Home.window.createTemp({
						id : 'yysc',
						title : '应用市场',
						url : 'sysapp/appmarket/index.php',
						width : 800,
						height : 484,
						isresize : false,
						isflash : false
					});
				});
				//绑定图标拖动事件
				Home.app.move();
				//绑定应用码头拖动事件
				Home.dock.move();
				//加载滚动条
				Home.app.getScrollbar();
				//绑定滚动条拖动事件
				Home.app.moveScrollbar();
				//绑定图标右击事件
				$('#desk').on('contextmenu', '.appbtn:not(.add)', function(e){
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
						case 'folder':
							var popupmenu = Home.popupMenu.folder($(this));
							break;
					}
					var l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
					var t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
					popupmenu.css({
						left : l,
						top : t
					}).show();
					return false;
				});
			});
		},
		/*
		**  添加应用
		*/
		add : function(id, type, fun){
			$.ajax({
				type : 'POST',
				url : ajaxUrl,
				data : 'ac=addMyApp&id=' + id  + '&type=' + type + '&desk=' + Home.CONFIG.desk,
				success : function(){
					if(typeof(fun) !== 'undefined'){
						fun();
					}
				}
			});
		},
		/*
		**  删除应用
		*/
		remove : function(id, type, fun){
			$.ajax({
				type : 'POST',
				url  : 'home.php/cloud/delmyapp',
				data: {
					id   : id,
					type : type,

				},
//				data : 'ac=delMyApp&id=' + id + '&type=' + type,
				success : function(){
					if(type == 'widget'){
						Home.widget.removeCookie(id, type);
					}
//					if(typeof(fun) !== 'undefined'){
//						fun();
//					}
				}
			});
		},
		/*
		**  图标拖动、打开
		**  这块代码略多，主要处理了9种情况下的拖动，分别是：
		**  桌面拖动到应用码头、桌面拖动到文件夹内、当前桌面上拖动(排序)
		**  应用码头拖动到桌面、应用码头拖动到文件夹内、应用码头上拖动(排序)
		**  文件夹内拖动到桌面、文件夹内拖动到应用码头、不同文件夹之间拖动
		*/
		move : function(){
			//应用码头图标拖动
			$('#dock-bar .dock-applist').off('mousedown', 'li').on('mousedown', 'li', function(e){
				e.preventDefault();
				e.stopPropagation();
				if(e.button == 0 || e.button == 1){
					var oldobj = $(this), x, y, cx, cy, dx, dy, lay, obj = $('<li id="shortcut_shadow">' + oldobj.html() + '</li>');
					dx = cx = e.clientX;
					dy = cy = e.clientY;
					x = dx - oldobj.offset().left;
					y = dy - oldobj.offset().top;
					//绑定鼠标移动事件
					$(document).on('mousemove', function(e){
						$('body').append(obj);
						lay = Home.maskBox.desk();
						lay.show();
						cx = e.clientX <= 0 ? 0 : e.clientX >= $(document).width() ? $(document).width() : e.clientX;
						cy = e.clientY <= 0 ? 0 : e.clientY >= $(document).height() ? $(document).height() : e.clientY;
						_l = cx - x;
						_t = cy - y;
						if(dx != cx || dy != cy){
							obj.css({
								left : _l,
								top : _t
							}).show();
						}
					}).on('mouseup', function(){
						$(document).off('mousemove').off('mouseup');
						obj.remove();
						if(typeof(lay) !== 'undefined'){
							lay.hide();
						}
						//判断是否移动图标，如果没有则判断为click事件
						if(dx == cx && dy == cy){
							switch(oldobj.attr('type')){
								case 'app':
								case 'papp':
									Home.window.create(oldobj.attr('realid'), oldobj.attr('type'));
									break;
								case 'widget':
								case 'pwidget':
									Home.widget.create(oldobj.attr('realid'), oldobj.attr('type'));
									break;
								case 'folder':
									Home.folderView.init(oldobj);
									break;
							}
							return false;
						}
						var folderId = Home.grid.searchFolderGrid(cx, cy);
						if(folderId != null){
							if(oldobj.hasClass('folder') == false){
								$.ajax({
									type : 'POST',
									url : ajaxUrl,
									data : 'ac=updateMyApp&movetype=dock-folder&id=' + oldobj.attr('realid') + '&type=' + oldobj.attr('type') + '&from=' + oldobj.index() + '&to=' + folderId + '&desk=' + Home.CONFIG.desk,
									success : function(){
										oldobj.remove();
										Home.deskTop.appresize();
										//如果文件夹预览面板为显示状态，则进行更新
										if($('#qv_' + folderId).length != 0){
											Home.folderView.init($('#d_folder_' + folderId));
										}
										//如果文件夹窗口为显示状态，则进行更新
										if($('#w_folder_' + folderId).length != 0){
											Home.window.updateFolder(folderId, 'folder');
										}
									}
								});
							}
						}else{
							var icon, icon2;
							var iconIndex = $('#desk-' + Home.CONFIG.desk + ' li.appbtn:not(.add)').length == 0 ? -1 : $('#desk-' + Home.CONFIG.desk + ' li').index(oldobj);
							var iconIndex2 = $('#dock-bar .dock-applist').html() == '' ? -1 : $('#dock-bar .dock-applist li').index(oldobj);

							var dock_w2 = Home.CONFIG.dockPos == 'left' ? 0 : Home.CONFIG.dockPos == 'top' ? ($(window).width() - $('#dock-bar .dock-applist').width() - 20) / 2 : $(window).width() - $('#dock-bar .dock-applist').width();
							var dock_h2 = Home.CONFIG.dockPos == 'top' ? 0 : ($(window).height() - $('#dock-bar .dock-applist').height() - 20) / 2;
							icon2 = Home.grid.searchDockAppGrid(cx - dock_w2, cy - dock_h2);
							if(icon2 != null && icon2 != oldobj.index()){
								$.ajax({
									type : 'POST',
									url : ajaxUrl,
									data : 'ac=updateMyApp&movetype=dock-dock&id=' + oldobj.attr('realid') + '&type=' + oldobj.attr('type') + '&from=' + oldobj.index() + '&to=' + icon2 + '&desk=' + Home.CONFIG.desk,
									success : function(){
										if(icon2 < iconIndex2){
											$('#dock-bar .dock-applist li:eq(' + icon2 + ')').before(oldobj);
										}else if(icon2 > iconIndex2){
											$('#dock-bar .dock-applist li:eq(' + icon2 + ')').after(oldobj);
										}
										Home.deskTop.appresize();
									}
								});
							}else{
								var dock_w = Home.CONFIG.dockPos == 'left' ? 73 : 0;
								var dock_h = Home.CONFIG.dockPos == 'top' ? 73 : 0;
								icon = Home.grid.searchAppGrid(cx - dock_w, cy - dock_h);
								if(icon != null){
									$.ajax({
										type : 'POST',
										url : ajaxUrl,
										data : 'ac=updateMyApp&movetype=dock-desk&id=' + oldobj.attr('realid') + '&type=' + oldobj.attr('type') + '&from=' + oldobj.index() + '&to=' + (icon + 1) + '&desk=' + Home.CONFIG.desk,
										success : function(){
											if(icon < iconIndex){
												$('#desk-' + Home.CONFIG.desk + ' li:not(.add):eq(' + icon + ')').before(oldobj);
											}else if(icon > iconIndex){
												$('#desk-' + Home.CONFIG.desk + ' li:not(.add):eq(' + icon + ')').after(oldobj);
											}else{
												if(iconIndex == -1){
													$('#desk-' + Home.CONFIG.desk + ' li.add').before(oldobj);
												}
											}
											Home.deskTop.appresize();
										}
									});
								}
							}
						}
					});
				}
				return false;
			});
			//桌面图标拖动
			$('#desktop.desktop-container').off('mousedown', 'li:not(.add)').on('mousedown', 'li:not(.add)', function(e){
				e.preventDefault();
				e.stopPropagation();
				if(e.button == 0 || e.button == 1){
					var oldobj = $(this), x, y, cx, cy, dx, dy, lay, obj = $('<li id="shortcut_shadow">' + oldobj.html() + '</li>');
					dx = cx = e.clientX;
					dy = cy = e.clientY;
					x = dx - oldobj.offset().left;
					y = dy - oldobj.offset().top;
					//绑定鼠标移动事件
					$(document).on('mousemove', function(e){
						$('body').append(obj);
						lay = Home.maskBox.desk();
						lay.show();
						cx = e.clientX <= 0 ? 0 : e.clientX >= $(document).width() ? $(document).width() : e.clientX;
						cy = e.clientY <= 0 ? 0 : e.clientY >= $(document).height() ? $(document).height() : e.clientY;
						_l = cx - x;
						_t = cy - y;
						if(dx != cx || dy != cy){
							obj.css({
								left : _l,
								top : _t
							}).show();
						}
					}).on('mouseup', function(){
						$(document).off('mousemove').off('mouseup');
						obj.remove();
						if(typeof(lay) !== 'undefined'){
							lay.hide();
						}
						//判断是否移动图标，如果没有则判断为click事件
						if(dx == cx && dy == cy){
							switch(oldobj.attr('type')){
								case 'app':
								case 'papp':
									Home.window.create(oldobj.attr('realid'), oldobj.attr('type'));
									break;
								case 'widget':
								case 'pwidget':
									Home.widget.create(oldobj.attr('realid'), oldobj.attr('type'));
									break;
								case 'folder':
									Home.folderView.init(oldobj);
									break;
							}
							return false;
						}
						var folderId = Home.grid.searchFolderGrid(cx, cy);
						if(folderId != null){
							if(oldobj.attr('type') != 'folder'){
								$.ajax({
									type : 'POST',
									url : ajaxUrl,
									data : 'ac=updateMyApp&movetype=desk-folder&id=' + oldobj.attr('realid') + '&type=' + oldobj.attr('type') + '&from=' + (oldobj.index() - 2) + '&to=' + folderId + '&desk=' + Home.CONFIG.desk,
									success : function(){
										oldobj.remove();
										Home.deskTop.appresize();
										//如果文件夹预览面板为显示状态，则进行更新
										if($('#qv_' + folderId).length != 0){
											Home.folderView.init($('#d_folder_' + folderId));
										}
										//如果文件夹窗口为显示状态，则进行更新
										if($('#w_folder_' + folderId).length != 0){
											Home.window.updateFolder(folderId, 'folder');
										}
									}
								});
							}
						}else{
							var icon, icon2;
							var iconIndex = $('#desk-' + Home.CONFIG.desk + ' li.appbtn:not(.add)').length == 0 ? -1 : $('#desk-' + Home.CONFIG.desk + ' li').index(oldobj);
							var iconIndex2 = $('#dock-bar .dock-applist').html() == '' ? -1 : $('#dock-bar .dock-applist li').index(oldobj);

							var dock_w2 = Home.CONFIG.dockPos == 'left' ? 0 : Home.CONFIG.dockPos == 'top' ? ($(window).width() - $('#dock-bar .dock-applist').width() - 20) / 2 : $(window).width() - $('#dock-bar .dock-applist').width();
							var dock_h2 = Home.CONFIG.dockPos == 'top' ? 0 : ($(window).height()-$('#dock-bar .dock-applist').height() - 20) / 2;
							icon2 = Home.grid.searchDockAppGrid(cx - dock_w2, cy - dock_h2);
							if(icon2 != null){
								$.ajax({
									type : 'POST',
									url : ajaxUrl,
									data : 'ac=updateMyApp&movetype=desk-dock&id=' + oldobj.attr('realid') + '&type=' + oldobj.attr('type') + '&from=' + (oldobj.index() - 2) + '&to=' + (icon2 + 1) + '&desk=' + Home.CONFIG.desk,
									success : function(){
										if(icon2 < iconIndex2){
											$('#dock-bar .dock-applist li:eq(' + icon2 + ')').before(oldobj);
										}else if(icon2 > iconIndex2){
											$('#dock-bar .dock-applist li:eq(' + icon2 + ')').after(oldobj);
										}else{
											if(iconIndex2 == -1){
												$('#dock-bar .dock-applist').append(oldobj);
											}
										}
										if($('#dock-bar .dock-applist li').length > 7){
											$('#desk-' + Home.CONFIG.desk + ' li.add').before($('#dock-bar .dock-applist li').last());
										}
										Home.deskTop.appresize();
									}
								});
							}else{
								var dock_w = Home.CONFIG.dockPos == 'left' ? 73 : 0;
								var dock_h = Home.CONFIG.dockPos == 'top' ? 73 : 0;
								icon = Home.grid.searchAppGrid(cx - dock_w, cy - dock_h);
								if(icon != null && icon != (oldobj.index() - 2)){
									$.ajax({
										type : 'POST',
										url : ajaxUrl,
										data : 'ac=updateMyApp&movetype=desk-desk&id=' + oldobj.attr('realid') + '&type=' + oldobj.attr('type') + '&from=' + (oldobj.index() - 2) + '&to=' + icon + '&desk=' + Home.CONFIG.desk,
										success : function(){
											if(icon < iconIndex){
												$('#desk-' + Home.CONFIG.desk + ' li:not(.add):eq(' + icon + ')').before(oldobj);
											}else if(icon > iconIndex){
												$('#desk-' + Home.CONFIG.desk + ' li:not(.add):eq(' + icon + ')').after(oldobj);
											}else{
												if(iconIndex == -1){
													$('#desk-' + Home.CONFIG.desk + ' li.add').before(oldobj);
												}
											}
											Home.deskTop.appresize();
										}
									});
								}
							}
						}
					});
				}
			});
			//文件夹内图标拖动
			$('.folder_body, .quick_view_container').off('mousedown', 'li').on('mousedown', 'li', function(e){
				e.preventDefault();
				e.stopPropagation();
				if(e.button == 0 || e.button == 1){
					var oldobj = $(this), x, y, cx, cy, dx, dy, lay, obj = $('<li id="shortcut_shadow">' + oldobj.html() + '</li>');
					dx = cx = e.clientX;
					dy = cy = e.clientY;
					x = dx - oldobj.offset().left;
					y = dy - oldobj.offset().top;
					//绑定鼠标移动事件
					$(document).on('mousemove', function(e){
						$('body').append(obj);
						lay = Home.maskBox.desk();
						lay.show();
						cx = e.clientX <= 0 ? 0 : e.clientX >= $(document).width() ? $(document).width() : e.clientX;
						cy = e.clientY <= 0 ? 0 : e.clientY >= $(document).height() ? $(document).height() : e.clientY;
						_l = cx - x;
						_t = cy - y;
						if(dx != cx || dy != cy){
							obj.css({
								left : _l,
								top : _t
							}).show();
						}
					}).on('mouseup', function(){
						$(document).off('mousemove').off('mouseup');
						obj.remove();
						if(typeof(lay) !== 'undefined'){
							lay.hide();
						}
						//判断是否移动图标，如果没有则判断为click事件
						if(dx == cx && dy == cy){
							switch(oldobj.attr('type')){
								case 'app':
								case 'papp':
									Home.window.create(oldobj.attr('realid'), oldobj.attr('type'));
									break;
								case 'widget':
								case 'pwidget':
									Home.widget.create(oldobj.attr('realid'), oldobj.attr('type'));
									break;
							}
							return false;
						}
						var folderId = Home.grid.searchFolderGrid(cx, cy);
						if(folderId != null){
							if(oldobj.parents('.folder-window').attr('realid') != folderId){
								$.ajax({
									type : 'POST',
									url : ajaxUrl,
									data : 'ac=updateMyApp&movetype=folder-folder&id=' + oldobj.attr('realid') + '&type=' + oldobj.attr('type') + '&from=' + oldobj.parents('.folder-window').attr('realid') + '&to=' + folderId + '&desk=' + Home.CONFIG.desk,
									success : function(){
										oldobj.remove();
										Home.deskTop.appresize();
										//如果文件夹预览面板为显示状态，则进行更新
										if($('#qv_' + folderId).length != 0){
											Home.folderView.init($('#d_folder_' + folderId));
										}
										//如果文件夹窗口为显示状态，则进行更新
										if($('#w_folder_' + folderId).length != 0){
											Home.window.updateFolder(folderId, 'folder');
										}
									}
								});
							}
						}else{
							var icon, icon2;
							var iconIndex = $('#desk-' + Home.CONFIG.desk + ' li.appbtn:not(.add)').length == 0 ? -1 : $('#desk-' + Home.CONFIG.desk + ' li').index(oldobj);
							var iconIndex2 = $('#dock-bar .dock-applist').html() == '' ? -1 : $('#dock-bar .dock-applist li').index(oldobj);

							var dock_w2 = Home.CONFIG.dockPos == 'left' ? 0 : Home.CONFIG.dockPos == 'top' ? ($(window).width() - $('#dock-bar .dock-applist').width() - 20) / 2 : $(window).width() - $('#dock-bar .dock-applist').width();
							var dock_h2 = Home.CONFIG.dockPos == 'top' ? 0 : ($(window).height() - $('#dock-bar .dock-applist').height() - 20) / 2;
							icon2 = Home.grid.searchDockAppGrid(cx - dock_w2, cy - dock_h2);
							if(icon2 != null){
								$.ajax({
									type : 'POST',
									url : ajaxUrl,
									data : 'ac=updateMyApp&movetype=folder-dock&id=' + oldobj.attr('realid') + '&type=' + oldobj.attr('type') + '&from=' + oldobj.parents('.folder-window').attr('realid') + '&to=' + (icon2 + 1) + '&desk=' + Home.CONFIG.desk,
									success : function(){
										var folderId = oldobj.parents('.folder-window').attr('realid');
										if(icon2 < iconIndex2){
											$('#dock-bar .dock-applist li.appbtn:not(.add):eq(' + icon2 + ')').before(oldobj);
										}else if(icon2 > iconIndex2){
											$('#dock-bar .dock-applist li.appbtn:not(.add):eq(' + icon2 + ')').after(oldobj);
										}else{
											if(iconIndex2 == -1){
												$('#dock-bar .dock-applist').append(oldobj);
											}
										}
										if($('#dock-bar .dock-applist li').length > 7){
											$('#desk-' + Home.CONFIG.desk + ' li.add').before($('#dock-bar .dock-applist li').last());
										}
										Home.deskTop.appresize();
										//如果文件夹预览面板为显示状态，则进行更新
										if($('#qv_' + folderId).length != 0){
											Home.folderView.init($('#d_folder_' + folderId));
										}
										//如果文件夹窗口为显示状态，则进行更新
										if($('#w_folder_' + folderId).length != 0){
											Home.window.updateFolder(folderId, 'folder');
										}
									}
								});
							}else{
								var dock_w = Home.CONFIG.dockPos == 'left' ? 73 : 0;
								var dock_h = Home.CONFIG.dockPos == 'top' ? 73 : 0;
								icon = Home.grid.searchAppGrid(cx - dock_w, cy - dock_h);
								if(icon != null){
									$.ajax({
										type : 'POST',
										url : ajaxUrl,
										data : 'ac=updateMyApp&movetype=folder-desk&id=' + oldobj.attr('realid') + '&type=' + oldobj.attr('type') + '&from=' + oldobj.parents('.folder-window').attr('realid') + '&to=' + (icon + 1) + '&desk=' + Home.CONFIG.desk,
										success : function(){
											var folderId = oldobj.parents('.folder-window').attr('realid');
											if(icon < iconIndex){
												$('#desk-' + Home.CONFIG.desk + ' li.appbtn:not(.add):eq(' + icon + ')').before(oldobj);
											}else if(icon > iconIndex){
												$('#desk-' + Home.CONFIG.desk + ' li.appbtn:not(.add):eq(' + icon + ')').after(oldobj);
											}else{
												if(iconIndex == -1){
													$('#desk-' + Home.CONFIG.desk + ' li.add').before(oldobj);
												}
											}
											Home.deskTop.appresize();
											//如果文件夹预览面板为显示状态，则进行更新
											if($('#qv_' + folderId).length != 0){
												Home.folderView.init($('#d_folder_' + folderId));
											}
											//如果文件夹窗口为显示状态，则进行更新
											if($('#w_folder_' + folderId).length != 0){
												Home.window.updateFolder(folderId, 'folder');
											}
										}
									});
								}
							}
						}
					});
				}
			});
		},
		/*
		**  加载滚动条
		*/
		getScrollbar : function(){
			setTimeout(function(){
				$('#desktop.desktop-container').each(function(){
					var desk = $(this), scrollbar = desk.children('.scrollbar');
					//先清空所有附加样式
					scrollbar.hide();
					desk.scrollLeft(0).scrollTop(0);
					/*
					**  判断图标排列方式
					**  横向排列超出屏幕则出现纵向滚动条，纵向排列超出屏幕则出现横向滚动条
					*/
					if(Home.CONFIG.appXY == 'x'){
						/*
						**  获得桌面图标定位好后的实际高度
						**  因为显示的高度是固定的，而实际的高度是根据图标个数会变化
						*/
						var deskH = parseInt(desk.children('.add').css('top')) + 108;
						/*
						**  计算滚动条高度
						**  高度公式（图标纵向排列计算滚动条宽度以此类推）：
						**  滚动条实际高度 = 桌面显示高度 / 桌面实际高度 * 滚动条总高度(桌面显示高度)
						**  如果“桌面显示高度 / 桌面实际高度 >= 1”说明图标个数未能超出桌面，则不需要出现滚动条
						*/
						if(desk.height() / deskH < 1){
							desk.children('.scrollbar-y').height(desk.height() / deskH * desk.height()).css('top',0).show();
						}
					}else{
						var deskW = parseInt(desk.children('.add').css('left')) + 106;
						if(desk.width() / deskW < 1){
							desk.children('.scrollbar-x').width(desk.width() / deskW * desk.width()).css('left',0).show();
						}
					}
				});
			},500);
		},
		/*
		**  移动滚动条
		*/
		moveScrollbar : function(){
			/*
			**  手动拖动
			*/
			$('.scrollbar').on('mousedown', function(e){
				var x, y, cx, cy, deskrealw, deskrealh, movew, moveh;
				var scrollbar = $(this), desk = scrollbar.parent('.desktop-container');
				deskrealw = parseInt(desk.children('.add').css('left')) + 106;
				deskrealh = parseInt(desk.children('.add').css('top')) + 108;
				movew = desk.width() - scrollbar.width();
				moveh = desk.height() - scrollbar.height();
				if(scrollbar.hasClass('scrollbar-x')){
					x = e.clientX - scrollbar.offset().left;
				}else{
					y = e.clientY - scrollbar.offset().top;
				}
				$(document).on('mousemove', function(e){
					if(scrollbar.hasClass('scrollbar-x')){
						if(Home.CONFIG.dockPos == 'left'){
							cx = e.clientX - x - 73 < 0 ? 0 : e.clientX - x - 73 > movew ? movew : e.clientX - x - 73;
						}else{
							cx = e.clientX - x < 0 ? 0 : e.clientX - x > movew ? movew : e.clientX - x;
						}
						scrollbar.css('left', cx / desk.width() * deskrealw + cx);
						desk.scrollLeft(cx / desk.width() * deskrealw);
					}else{
						if(Home.CONFIG.dockPos == 'top'){
							cy = e.clientY - y - 73 < 0 ? 0 : e.clientY - y - 73 > moveh ? moveh : e.clientY - y - 73;
						}else{
							cy = e.clientY - y < 0 ? 0 : e.clientY - y > moveh ? moveh : e.clientY - y;
						}
						scrollbar.css('top', cy / desk.height() * deskrealh + cy);
						desk.scrollTop(cy / desk.height() * deskrealh);
					}
				}).on('mouseup', function(){
					$(this).off('mousemove').off('mouseup');
				});
			});
			/*
			**  鼠标滚轮
			**  只支持纵向滚动条
			*/
			$('#desktop.desktop-container').each(function(i){
				$('#desk-' + (i + 1)).on('mousewheel', function(event, delta){
					var desk = $(this), deskrealh = parseInt(desk.children('.add').css('top')) + 108, scrollupdown;
					/*
					**  delta == -1   往下
					**  delta == 1    往上
					**  chrome下鼠标滚轮每滚动一格，页面滑动距离是200px，所以下面也用这个值来模拟每次滑动的距离
					*/
					if(delta < 0){
						scrollupdown = desk.scrollTop() + 200 > deskrealh - desk.height() ? deskrealh - desk.height() : desk.scrollTop() + 200;
					}else{
						scrollupdown = desk.scrollTop() - 200 < 0 ? 0 : desk.scrollTop() - 200;
					}
					desk.stop(false, true).animate({scrollTop:scrollupdown},300);
					desk.children('.scrollbar-y').stop(false, true).animate({
						top : scrollupdown / deskrealh * desk.height() + scrollupdown
					}, 300);
				});
			});
		},

//为不同类型的文件指定各自的应用
open: function(obj){
	switch(obj.attr('type')){
		case '0':
		$('#'+$('#cloud').parent().attr('id')).load('home.php/cloud/index/fid/'+obj.attr('fid')+'/sid/'+obj.attr('sid'));
//			Home.app.openfolder(obj);
			break;
		case '10':
		case '18':
		case '20':
		case '21':
		case '22':
		case '23':
		case '24':
		case '25':
		case '26':
		case '27':
		case '28':
		case '29':
			Home.app.notepad(obj);
			break;
		case '11':
		case '12':
			Home.app.word(obj);
			break;
		case '13':
		case '14':
			Home.app.excel(obj);
			break;
			case '15':
			case '16':
			Home.app.ppt(obj);
			break;
		case '17':
			Home.app.pdf(obj);
			break;
		case '50':
		case '51':
		case '52':
		case '53':
		case '54':
		case '55':
		case '56':
		case '59':
		case '57':
		case '58':
			Home.app.video(obj);
			break;
		case '40':
		case '41':
		case '42':
		case '43':
		case '44':
		case '45':
			Home.app.music(obj);
			break;
		case '30':
		case '31':
		case '32':
		case '33':
		case '34':
		case '35':
		case '36':
		case '37':
			Home.app.picture(obj);
			break;
		case 'nexstar':
			Home.uploader.nexstar(obj.attr('sid'));
			break;
		default:
			Home.create.get_tips('未知文件，无法打开！');
	}
},
notepad: function(obj){
	Home.create.notepad(obj);
},
word: function(obj){
	Home.create.word(obj);
},
excel: function(obj){
	Home.create.excel(obj);
},
ppt: function(obj){
	Home.create.ppt(obj);
},
video: function(obj){
	Home.create.video();

},

music: function(obj){
	Home.create.music(obj);

},

picture: function(obj){
	Home.create.picture(obj);
},
pdf: function(obj){
	Home.create.pdf(obj);
},
openfolder: function(obj){
	$.ajax({
		type: "GET",
		url: "home.php/cloud",
			data: {
			sid	: $(obj).attr('sid'),
			fid	: $(obj).attr('fid'),
			uid	: $(obj).attr('uid'),
		},
		success: function(msg){
				alert(msg);

//			$('#'+$('#cloud').parent().attr('id')).load('home.php/cloud/index/sid/' + $(obj).attr('sid') + '/fid/'+$(obj).attr('fid'));
			$('#'+$('#cloud').parent().attr('id')).html(msg);
		},
	});
},
//	**********

dataDeleteByAppid : function(appid){
	$(Home.VAR.dock).each(function(i){
		if(this.appid == appid){
			Home.VAR.dock.splice(i, 1);
			return false;
		}
	});
	for(var i = 1; i <= 5; i++){
		var desk = eval('Home.VAR.desk' + i);
		$(desk).each(function(j){
			if(this.appid == appid){
				desk.splice(j, 1);
				if(this.type == 'folder'){
					$(Home.VAR.folder).each(function(k){
						if(this.appid == appid){
							Home.VAR.folder.splice(k, 1);
							return false;
						}
					});
				}
				return false;
			}
		});
	}
	$(Home.VAR.folder).each(function(i){
		$(this.apps).each(function(j){
			if(this.appid == appid){
				Home.VAR.folder[i].apps.splice(j, 1);
				return false;
			}
		});
	});
},
delfile : function(fid){
	$.ajax({
		type : 'POST',
		url  : 'home.php/cloud/delfile',
		data: {
			fid : fid,
		},
		success: function(msg){
//			alert(msg);
		},
	});
},


}})();