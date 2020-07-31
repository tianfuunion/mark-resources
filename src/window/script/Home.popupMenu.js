/*
**  右键菜单
*/

Home.popupMenu = (function(){return{
init : function(){
//绑定body点击事件，主要目的就是为了强制隐藏右键菜单
	$('body').on('click', function(){
		$('.popup-menu').hide();
		$('.quick_view_container').remove();
	}).on('contextmenu', function(e){
		$(".popup-menu").hide();
		$('.quick_view_container').remove();
		var popupmenu = Home.popupMenu.desk();
		var l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
		var t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
		popupmenu.css({
			left : l,
			top : t
		}).show();
		return false;
	});

	$('.popup-menu').on('contextmenu', function(){
		return false;
	});
//动态控制多级菜单的显示位置
	$('body').on('mouseenter', '.popup-menu li', function(){
		if($(this).children('.popup-menu').length == 1){
			$(this).children('a').addClass('focus');
			$(this).children('.popup-menu').show();
			if($(this).parents('.popup-menu').offset().left + $(this).parents('.popup-menu').width() * 2 + 10 < $(window).width()){
				$(this).children('.popup-menu').css({
					left : $(this).parents('.popup-menu').width() - 5,
					top : 0
				});
			}else{
				$(this).children('.popup-menu').css({
					left : -1 * $(this).parents('.popup-menu').width(),
					top : 0
				});
			}
			if($(this).children('.popup-menu').offset().top + $(this).children('.popup-menu').height() + 10 > $(window).height()){
				$(this).children('.popup-menu').css({
					top : $(window).height() - $(this).children('.popup-menu').height() - $(this).children('.popup-menu').offset().top - 10
				});
			}
		}
	}).on('mouseleave', '.popup-menu li', function(){
		$(this).children('a').removeClass('focus');
		$(this).children('.popup-menu').hide();
	});
},

//	应用图标右键
app : function(obj){
	$('.popup-menu').hide();
	if(!TEMP.popupMenuApp){
		TEMP.popupMenuApp = $('<div class="popup-menu app-menu" style="z-index:9990;display:none"><ul>'+
			'<li style="border-bottom:1px solid #F0F0F0"><a menu="open" href="javascript:;">打开</a></li>'+
			'<li style="border-bottom:1px solid #F0F0F0"><a menu="share" href="javascript:;">分享</a></li>'+
			'<li><a menu="move" href="javascript:;">移动应用到<b class="arrow">»</b></a>'+
				'<div class="popup-menu" style="display:none"><ul>'+
					'<li><a menu="moveto" desk="1" href="javascript:;">桌面1</a></li>'+
					'<li><a menu="moveto" desk="2" href="javascript:;">桌面2</a></li>'+
					'<li><a menu="moveto" desk="3" href="javascript:;">桌面3</a></li>'+
					'<li><a menu="moveto" desk="4" href="javascript:;">桌面4</a></li>'+
					'<li><a menu="moveto" desk="5" href="javascript:;">桌面5</a></li></ul></div></li>'+
			'<li><b class="uninstall"></b><a menu="del" href="javascript:;">卸载应用</a></li>'+
			'<li><a menu="property" href="javascript:;">属性</a></li>'+
			'</ul></div>'
		);
		$('body').append(TEMP.popupMenuApp);
	}
	$('.app-menu a[menu="moveto"]').removeClass('disabled');
	if(obj.parent().hasClass('desktop-container')){
		$('.app-menu a[menu="moveto"]').each(function(){
			if($(this).attr('desk') == Home.CONFIG.desk){
				$(this).addClass('disabled');
			}
		});
	}
	//绑定事件
	$('.app-menu li').off('mouseover').off('mouseout').on('mouseover', function(){
		if($(this).children('a').attr('menu') == 'move'){
			$(this).children('a').addClass('focus');
			if($(document).width() - $('.app-menu').offset().left > 250){
				$(this).children('div').css({
					left : 122,
					top : -2
				});
			}else{
				$(this).children('div').css({
					left : -126,
					top : -2
				});
			}
			$(this).children('div').show();
		}
	}).on('mouseout', function(){
		$(this).children('a').removeClass('focus');
		$(this).children('div').hide();
	});
	$('.app-menu a[menu="moveto"]').off('click').on('click', function(){
		var desk = $(this).attr('desk');
		$.ajax({
			type : 'POST',
			url : ajaxUrl,
			data : 'ac=moveMyApp&id=' + obj.attr('realid') + '&type=' + obj.attr('type') + '&todesk=' + desk,
			success : function(){
				$('#desk-' + desk + ' li.add').before(obj);
				Home.deskTop.appresize();
				Home.app.getScrollbar();
			}
		});
		$('.popup-menu').hide();
	});
	$('.app-menu a[menu="open"]').off('click').on('click', function(){
		Home.window.create(obj.attr('realid'), obj.attr('type'));
		$('.task-menu').hide();
	});
	$('.app-menu a[menu="share"]').off('click').on('click', function(){
		Home.create.share();
//		Home.window.create(obj.attr('realid'), obj.attr('type'));
		$('.task-menu').hide();
	});
	$('.app-menu a[menu="property"]').off('click').on('click', function(){
//		Home.window.create(obj.attr('realid'), obj.attr('type'));
		Home.create.get_tips('打开属性');
		$('.task-menu').hide();
	});
	$('.app-menu a[menu="del"]').off('click').on('click', function(){
		Home.app.remove(obj.attr('realid'), obj.attr('type'), function(){
			obj.find('img, span').show().animate({
				opacity : 'toggle',
				width : 0,
				height : 0
			}, 500, function(){
				obj.remove();
				Home.deskTop.resize(250);
			});
		});
		$('.popup-menu').hide();
	});
	return TEMP.popupMenuApp;
},

// 私人应用
papp : function(obj){
	$('.popup-menu').hide();
	if(!TEMP.popupMenuApp){
		TEMP.popupMenuApp = $('<div class="popup-menu papp-menu" style="z-index:9990;display:none"><ul>'+
			'<li style="border-bottom:1px solid #F0F0F0"><a menu="open" href="javascript:;">打开应用</a></li>'+
			'<li><a menu="move" href="javascript:;">移动应用到<b class="arrow">»</b></a>'+
				'<div class="popup-menu" style="display:none"><ul>'+
					'<li><a menu="moveto" desk="1" href="javascript:;">桌面1</a></li>'+
					'<li><a menu="moveto" desk="2" href="javascript:;">桌面2</a></li>'+
					'<li><a menu="moveto" desk="3" href="javascript:;">桌面3</a></li>'+
					'<li><a menu="moveto" desk="4" href="javascript:;">桌面4</a></li>'+
					'<li><a menu="moveto" desk="5" href="javascript:;">桌面5</a></li></ul></div></li>'+
			'<li><b class="edit"></b><a menu="edit" href="javascript:;">编辑</a></li>'+
			'<li><b class="del"></b><a menu="del" href="javascript:;">删除应用</a></li>'+
			'</ul></div>'
		);
		$('body').append(TEMP.popupMenuApp);
		$('.papp-menu').on('contextmenu', function(){
			return false;
		});
	}
	$('.papp-menu a[menu="moveto"]').removeClass('disabled');
	if(obj.parent().hasClass('desktop-container')){
		$('.papp-menu a[menu="moveto"]').each(function(){
			if($(this).attr('desk') == Home.CONFIG.desk){
				$(this).addClass('disabled');
			}
		});
	}
//绑定事件
	$('.papp-menu li').off('mouseover').off('mouseout').on('mouseover', function(){
		if($(this).children('a').attr('menu') == 'move'){
			$(this).children('a').addClass('focus');
			if($(document).width() - $('.papp-menu').offset().left > 250){
				$(this).children('div').css({
					left : 122,
					top : -2
				});
			}else{
				$(this).children('div').css({
					left : -126,
					top : -2
				});
			}
			$(this).children('div').show();
		}
	}).on('mouseout', function(){
		$(this).children('a').removeClass('focus');
		$(this).children('div').hide();
	});
	$('.papp-menu a[menu="moveto"]').off('click').on('click', function(){
		var desk = $(this).attr('desk');
		$.ajax({
			type : 'POST',
			url : ajaxUrl,
			data : 'ac=moveMyApp&id=' + obj.attr('realid') + '&type=' + obj.attr('type') + '&todesk=' + desk,
			success : function(){
				$('#desk-' + desk + ' li.add').before(obj);
				Home.deskTop.appresize();
				Home.app.getScrollbar();
			}
		});
		$('.popup-menu').hide();
	});
	$('.papp-menu a[menu="open"]').off('click').on('click', function(){
		switch(obj.attr('type')){
			case 'papp':
				Home.window.create(obj.attr('realid'), obj.attr('type'));
				break;
			case 'pwidget':
				Home.widget.create(obj.attr('realid'), obj.attr('type'));
				break;
		}
		$('.popup-menu').hide();
	});
	$('.papp-menu a[menu="edit"]').off('click').on('click', function(){
		function nextDo(options){
			$.dialog({
				id : 'addfolder',
				title : '编辑私人应用“' + options.title + '”',
				padding : 0,
				content : editPappDialogTemp({
					'id' : options.id,
					'name' : options.title,
					'url' : options.url,
					'width' : options.width,
					'height' : options.height
				}),
				ok : function(){
					var name = $('#addpappName').val(),
						url = $('#addpappUrl').val(),
						width = $('#addpappWidth').val(),
						height = $('#addpappHeight').val();
					if(name != '' && url != '' && width != '' && height != ''){
						$.ajax({
							type : 'POST',
							url : ajaxUrl,
							data : 'ac=updatePapp&name=' + name + '&url=' + url + '&width=' + width + '&height=' + height + '&id=' + options.id,
							success : function(pappid){
								Home.app.get();
							}
						});
					}else{
						alert('信息填写不完整');
					}
				},
				cancel : true
			});
		}
		ZENG.msgbox.show('数据读取中，请耐心等待...', 6, 100000);
		$.getJSON(ajaxUrl + '?ac=getMyAppById&id=' + obj.attr('realid') + '&type=' + obj.attr('type'), function(app){
			if(app != null){
				ZENG.msgbox._hide();
				switch(app['type']){
					case 'papp':
					case 'pwidget':
						nextDo({
							id : app['id'],
							title : app['name'],
							url : app['url'],
							width : app['width'],
							height : app['height'],
						});
						break;
				}
			}else{
				ZENG.msgbox.show('数据拉取失败', 5, 2000);
				return false;
			}
		});
		$('.popup-menu').hide();
	});
	$('.papp-menu a[menu="del"]').off('click').on('click', function(){
		Home.app.remove(obj.attr('realid'), obj.attr('type'), function(){
			obj.find('img, span').show().animate({
				opacity : 'toggle',
				width : 0,
				height : 0
			}, 500, function(){
				obj.remove();
				Home.deskTop.resize(250);
			});
		});
		$('.popup-menu').hide();
	});
	return TEMP.popupMenuApp;
},

//	文件夹右键
folder : function(obj){
	$('.popup-menu').hide();
	if(!TEMP.popupMenuFolder){
		TEMP.popupMenuFolder = $('<div class="popup-menu folder-menu" style="z-index:9990;display:none"><ul>'+
			'<li><a menu="view" href="javascript:;">预览</a></li>'+
			'<li style="border-bottom:1px solid #F0F0F0"><a menu="open" href="javascript:;">打开</a></li>'+
			'<li><b class="edit"></b><a menu="rename" href="javascript:;">重命名</a></li>'+
			'<li><b class="del"></b><a menu="del" href="javascript:;">删除</a></li>'+
			'</ul></div>');
		$('body').append(TEMP.popupMenuFolder);
		$('.folder-menu').on('contextmenu', function(){
			return false;
		});
	}
	//绑定事件
	$('.folder-menu a[menu="view"]').off('click').on('click', function(){
		Home.folderView.init(obj);
		$('.popup-menu').hide();
	});
	$('.folder-menu a[menu="open"]').off('click').on('click', function(){
		Home.window.create(obj.attr('realid'), obj.attr('type'));
		$('.popup-menu').hide();
	});
	$('.folder-menu a[menu="del"]').off('click').on('click', function(){
		$('.popup-menu').hide();
		if(confirm('确定要将文件“ '+obj.attr('title')+' ”移入回收站吗？')){
			Home.app.delfile(obj.attr('fid'));

//			Home.app.remove(obj.attr('fid'), function(){
//				obj.find('img, p').show().animate({
//					opacity : 'toggle',
//					width : 0,
//					height : 0
//				}, 500, function(){
//					obj.remove();
//					Home.deskTop.resize();
//				});
//			});
			Home.app.remove(obj.attr('realid'), obj.attr('type'), function(){
				obj.find('img, span').show().animate({
					opacity : 'toggle',
					width : 0,
					height : 0
				}, 500, function(){
					obj.remove();
					Home.deskTop.resize(250);
				});
			});
		}
	});
	$('.folder-menu a[menu="rename"]').off('click').on('click', function(){
		dialog({
			id : 'addfolder',
			title : '重命名“' + obj.find('p').text() + '”文件夹',
			padding : 0,
			content : editFolderDialogTemp({
				'name' : obj.find('p').text(),
				'src' : obj.find('img').attr('src')
			}),
			ok : function(){
				if($('#folderName').val() != ''){
					$.ajax({
						type : 'POST',
						url : 'home.php/cloud/updateFolder',
//						data : 'ac=updateFolder&name=' + $('#folderName').val() + '&icon=' + $('.folderSelector img').attr('src') + '&id=' + obj.attr('realid'),
//						data : 'home.php/cloud/updateFolder&name=' + $('#folderName').val() + '&icon=' + $('.folderSelector img').attr('src') + '&id=' + obj.attr('realid'),
						data : ({
							fid  : obj.attr('fid'),
							title: $('#folderName').val(),
							icon : $('.folderSelector img').attr('src'),
						}),
						success : function(msg){
							alert(msg);
//							Home.app.get();
						}
					});
				}else{
					$('.folderNameError').show();
					return false;
				}
			},
//			cancel : true
		}).show();
		$('.folderSelector').off('click').on('click', function(){
			$('.fcDropdown').show();
		});
		$('.fcDropdown_item').off('click').on('click', function(){
			$('.folderSelector img').attr('src', $(this).children('img').attr('src')).attr('idx', $(this).children('img').attr('idx'));
			$('.fcDropdown').hide();
		});
		$('.popup-menu').hide();
	});
	return TEMP.popupMenuFolder;
},

//	文件右键
file : function(obj){
	$('.popup-menu').hide();
	Home.window.show2under();
	if(!TEMP.popupMenuFile){
		TEMP.popupMenuFile = $(
			'<div class="popup-menu file-menu"><ul>'+
				'<li style="border-bottom:1px solid #F0F0F0"><a menu="open" href="javascript:;">打开</a></li>'+
				'<li style="border-bottom:1px solid #F0F0F0"><a menu="download" href="javascript:;">下载</a></li>'+
				'<li><a menu="share" href="javascript:;">分享<b class="arrow">»</b></a>'+
					'<div class="popup-menu" style="display:none"><ul>'+
						'<li><a menu="moveto" desk="1" href="javascript:;">我的好友</a></li>'+
						'<li><a menu="moveto" desk="2" href="javascript:;">QQ好友</a></li>'+
						'<li><a menu="moveto" desk="2" href="javascript:;">QQ空间</a></li>'+
						'<li><a menu="moveto" desk="2" href="javascript:;">微信好友</a></li>'+
						'<li><a menu="moveto" desk="2" href="javascript:;">朋友圈</a></li>'+
						'<li><a menu="moveto" desk="2" href="javascript:;">QQ好友</a></li>'+
						'<li><a menu="moveto" desk="2" href="javascript:;">二维码</a></li>'+
					'</ul></div></li>'+
				'<li><b class="edit"></b><a menu="rename" href="javascript:;">重命名</a></li>'+
				'<li><a menu="del" href="javascript:;"><b class="del"></b>删除</a></li>'+
				'<li><a menu="report" href="javascript:;"><b class="themes"></b>举报</a></li>'+
			'</ul></div>'
		);
		$('body').append(TEMP.popupMenuFile);
	}
	//绑定事件
	//打开文件
	$('.file-menu a[menu="open"]').off('click').on('click', function(){
//		downloadFile(obj.attr('title'),obj.attr('name'));
//		Home.app.open(obj);
		alert(obj);
		$('.popup-menu').hide();
	});

	$('.file-menu li').off('mouseover').off('mouseout').on('mouseover', function(){
		if($(this).children('a').attr('menu') == 'share'){
			$(this).children('a').addClass('focus');
			if($(document).width() - $('.file-menu').offset().left > 250){
				$(this).children('div').css({
					left : 122,
					top : -2
				});
			}else{
				$(this).children('div').css({
					left : -126,
					top : -2
				});
			}
			$(this).children('div').show();
		}
	}).on('mouseout', function(){
		$(this).children('a').removeClass('focus');
		$(this).children('div').hide();
	});
	$('.file-menu a[menu="download"]').off('click').on('click', function(){
		$('.popup-menu').hide();
		alert('可以尝试点击右键下载，变成A 标签，例： <a href="http://firweb.fir.im/rio.zip"></a>');
//		downloadFile(obj.attr('title'),obj.attr('name'),obj.attr('title'));
		downloadFile(obj.attr('title'),obj.attr('name'));

	});
	$('.file-menu a[menu="del"]').off('click').on('click', function(){
		$('.popup-menu').hide();
		if(confirm('确定要将“ '+obj.attr('title')+' ”移入回收站吗？')){
			Home.app.delfile(obj.attr('fid'));

			Home.app.remove(obj.attr('fid'), function(){
				obj.find('img, p').show().animate({
					opacity : 'toggle',
					width : 0,
					height : 0
				}, 500, function(){
					obj.remove();
					Home.deskTop.resize();
				});
			});
		}
	});
	$('.file-menu a[menu="rename"]').off('click').on('click', function(){
		dialog({
			id : 'addfolder',
			title : '重命名“' + obj.find('p').text() + '”文件',
			padding : 0,
			content : editFolderDialogTemp({
				'name' : obj.find('p').text(),
				'src' : obj.find('img').attr('src')
			}),
			ok : function(){
				if($('#folderName').val() != ''){
					$.ajax({
						type : 'POST',
						url : 'home.php/cloud/updateFolder',
//						data : 'ac=updateFolder&name=' + $('#folderName').val() + '&icon=' + $('.folderSelector img').attr('src') + '&id=' + obj.attr('realid'),
//						data : 'home.php/cloud/updateFolder&name=' + $('#folderName').val() + '&icon=' + $('.folderSelector img').attr('src') + '&id=' + obj.attr('realid'),
						data : ({
							fid  : obj.attr('fid'),
							title: $('#folderName').val(),
							icon : $('.folderSelector img').attr('src'),
						}),
						success : function(msg){
							alert(msg);
//							Home.app.get();
						}
					});
				}else{
					$('.folderNameError').show();
					return false;
				}
			},
//			cancel : true
		}).show();
		$('.folderSelector').off('click').on('click', function(){
			$('.fcDropdown').show();
		});
		$('.fcDropdown_item').off('click').on('click', function(){
			$('.folderSelector img').attr('src', $(this).children('img').attr('src')).attr('idx', $(this).children('img').attr('idx'));
			$('.fcDropdown').hide();
		});
		$('.popup-menu').hide();
	});
	$('.file-menu a[menu="report"]').off('click').on('click', function(){
		$('.popup-menu').hide();
		alert('举报');
	});
	return TEMP.popupMenuFile;
},

//	任务栏右键
task : function(obj){
	if(!TEMP.popupMenuTask){
		TEMP.popupMenuTask = $(
			'<div class="popup-menu task-menu"><ul>'+
				'<li><a menu="revert" href="javascript:;">还原</a></li>'+
				'<li><a menu="hide" href="javascript:;">最小化</a></li>'+
				'<li style="border-top:1px solid #F0F0F0"><a menu="close" href="javascript:;">关闭</a></li>'+
			'</ul></div>'
		);
		$('body').append(TEMP.popupMenuTask);
	}
	//切换还原&最小化
	if($('#w_' + obj.attr('appid')).attr('state') == 'show'){
		$('.task-menu a[menu="hide"]').parent().show();
		$('.task-menu a[menu="revert"]').parent().hide();
	}else{
		$('.task-menu a[menu="hide"]').parent().hide();
		$('.task-menu a[menu="revert"]').parent().show();
	}
	//绑定事件
	$('.task-menu a[menu="revert"]').off('click').on('click', function(){
		Home.window.show2top(obj.attr('appid'), obj.attr('type'));
		$('.popup-menu').hide();
	});
	$('.task-menu a[menu="hide"]').off('click').on('click', function(){
		Home.window.hide(obj.attr('appid'), obj.attr('type'));
		$('.popup-menu').hide();
	});
	$('.task-menu a[menu="close"]').off('click').on('click', function(){
		Home.window.close(obj.attr('appid'));
		$('.popup-menu').hide();
	});
	return TEMP.popupMenuTask;
},

//	桌面右键
desk : function(){
	if(!TEMP.popupMenuDesk){
		TEMP.popupMenuDesk = $(
			'<div class="popup-menu desk-menu" style="z-index:9990;display:none"><ul>'+
				'<li><a menu="hideall" href="javascript:;">显示桌面</a></li>'+
				'<li><a menu="Fullscreen" href="javascript:;">全屏显示</a></li>'+
				'<li style="border-bottom:1px solid #F0F0F0"><a href="javascript:;">图标设置<b class="arrow">»</b></a>'+
					'<div class="popup-menu" style="display:none"><ul>'+
						'<li><b class="hook"></b><a menu="size" orderby="l" href="javascript:;">大图标</a></li>'+
						'<li><b class="hook"></b><a menu="size" orderby="m" href="javascript:;">中图标</a></li>'+
						'<li><b class="hook"></b><a menu="size" orderby="s" href="javascript:;">小图标</a></li>'+
				'</ul></div></li>'+
				'<li><b class="refresh"></b><a menu="refresh" href="javascript:;">刷新</a></li>'+
				'<li><a menu="rewallpaper" href="javascript:;">更换背景</a></li>'+
				'<li style="border-bottom:1px solid #F0F0F0"><a menu="closeall" href="javascript:;">关闭所有应用</a></li>'+
				'<li><a href="javascript:;">新建<b class="arrow">»</b></a>'+
					'<div class="popup-menu" style="display:none"><ul>'+
						'<li><b class="folder"></b><a menu="addfolder" href="javascript:;">新建文件夹</a></li>'+
						'<li><b class="edit text"></b><a menu="addtxt" href="javascript:;">文本文档</a></li>'+
						'<li><b class="hook doc"></b><a menu="adddoc" href="javascript:;">word 文档</a></li>'+
						'<li><b class="xls"></b><a menu="addxls" href="javascript:;">Excel 文档</a></li>'+
						'<li><b class="hook ppt"></b><a menu="addppt" href="javascript:;">PPT 文档</a></li>'+
						'<li><b class="customapp"></b><a menu="addpapp" href="javascript:;">新建私人应用</a></li>'+
					'</ul></div></li>'+
				'<li style="border-bottom:1px solid #F0F0F0"><b class="upload"></b><a menu="uploadfile" href="javascript:;">上传文件</a></li>'+
				'<li><b class="themes"></b><a menu="themes" href="javascript:;">主题设置</a></li>'+
//				'<li><b class="setting"></b><a menu="desksetting" href="javascript:;">桌面设置</a></li>'+
				'<li><b class="setting"></b><a menu="setting" href="javascript:;">系统设置</a></li>'+
				'<li><a menu="logout" href="javascript:;">注销</a></li>'+
			'</ul></div>'
		);
		$('body').append(TEMP.popupMenuDesk);
		$('.desk-menu').on('contextmenu', function(){
			return false;
		});
		//绑定事件
		$('.desk-menu li').off('mouseover').off('mouseout').off('ondragstart').off('ondrag').on('mouseover', function(){
			if($(this).children('a').next() != ''){
				$(this).children('a').addClass('focus');
				if($(document).width() - $('.desk-menu').offset().left > 250){
					$(this).children('div').css({
						left : 122,
						top : -2
					});
				}else{
					$(this).children('div').css({
						left : -126,
						top : -2
					});
				}
				$(this).children('div').show();
			}
		}).on('mouseout', function(){
			$(this).children('a').removeClass('focus');
			$(this).children('div').hide();
		}).on('ondragstart',function(){
			return false;
		}).on('ondrag',function(){
			return false;
		});

//	切换桌面图标大中小
		$('.desk-menu a[menu="size"]').off('click').on('click', function(){
			var sml = $(this).attr('size');
			if(Home.CONFIG.appiSize != sml){
				Home.app.updateiSize(sml, function(){
					Home.deskTop.appresize();
					Home.app.getScrollbar();
				});
			}
			$('.popup-menu').hide();
		});

		$('.desk-menu a[menu="refresh"]').on('click', function(){
		//	Home.app.get();
			history.go()
			$('.popup-menu').hide();
		});
		$('.desk-menu a[menu="hideall"]').on('click', function(){
			Home.window.hideAll();
			$('.popup-menu').hide();
		});
		$('.desk-menu a[menu="Fullscreen"]').on('click', function(){
			launchFullScreen(document.documentElement);
			$('.popup-menu').hide();
		});
		$('.desk-menu a[menu="rewallpaper"]').on('click', function(){
			Home.wallpaper.rewallpaper();
			$('.popup-menu').hide();
		});
		$('.desk-menu a[menu="closeall"]').on('click', function(){
			Home.window.closeAll();
			$('.popup-menu').hide();
		});
		$('.desk-menu a[menu="addfolder"]').on('click', function(){
			$.dialog({
				id : 'addfolder',
				title : '新建文件夹',
				padding : 0,
				content : editFolderDialogTemp({
					'name' : '新建文件夹',
					'src' : 'img/ui/folder_default.png'
				}),
				ok : function(){
					if($('#folderName').val() != ''){
						$.ajax({
							type : 'POST',
							url : ajaxUrl,
							data : 'ac=addFolder&name=' + $('#folderName').val() + '&icon=' + $('.folderSelector img').attr('src'),
							success : function(folderid){
								$.ajax({
									type : 'POST',
									url : ajaxUrl,
									data : 'ac=addMyApp&id=' + folderid + '&type=folder&desk=' + Home.CONFIG.desk,
									success : function(){
										Home.app.get();
									}
								});
							}
						});
					}else{
						$('.folderNameError').show();
						return false;
					}
				},
				cancel : true
			});
			$('.folderSelector').off('click').on('click', function(){
				$('.fcDropdown').show();
			});
			$('.fcDropdown_item').off('click').on('click', function(){
				$('.folderSelector img').attr('src', $(this).children('img').attr('src')).attr('idx', $(this).children('img').attr('idx'));
				$('.fcDropdown').hide();
			});
			$('.popup-menu').hide();
		});
		$('.desk-menu a[menu="addpapp"]').on('click', function(){
			$.dialog({
				id : 'addpapp',
				title : '新建私人应用',
				padding : 0,
				content : editPappDialogTemp({
					'width' : 600,
					'height' : 400,
					'type' : 'papp',
					'isresize' : 1
				}),
				ok : function(){
					var name = $('#addpappName').val(),
						url = $('#addpappUrl').val(),
						width = $('#addpappWidth').val(),
						height = $('#addpappHeight').val(),
						type = $('#addpapp input[name="addpappType"]:checked').val(),
						isresize = $('#addpapp input[name="addpappIsresize"]:checked').val();
					if(name != '' && url != '' && width != '' && height != ''){
						$.ajax({
							type : 'POST',
							url : ajaxUrl,
							data : 'ac=addPapp&name=' + name + '&url=' + url + '&width=' + width + '&height=' + height + '&type=' + type + '&isresize=' + isresize,
							success : function(pappid){
								$.ajax({
									type : 'POST',
									url : ajaxUrl,
									data : 'ac=addMyApp&id=' + pappid + '&type=' + type + '&desk=' + Home.CONFIG.desk,
									success : function(){
										Home.app.get();
									}
								});
							}
						});
					}else{
						alert('信息填写不完整');
					}
				},
				cancel : true
			});
			$('#addpapp input[name="addpappType"]').off('change').on('change', function(){
				if($(this).val() == 'papp'){
					$('#addpapp tbody tr').eq(4).fadeIn();
				}else{
					$('#addpapp tbody tr').eq(4).fadeOut();
				}
			});
			$('.popup-menu').hide();
		});
		$('.desk-menu a[menu="uploadfile"]').on('click', function(){
			Home.uploader.nexstar($(this).attr('sid'));
			$('.popup-menu').hide();
		});
		$('.desk-menu a[menu="themes"]').on('click', function(){
			Home.create.themes();
			$('.popup-menu').hide();
		});
//		$('.desk-menu a[menu="desksetting"]').on('click', function(){
//			Home.create.desksetting();
//			$('.popup-menu').hide();
//		});
		$('.desk-menu a[menu="setting"]').on('click', function(){
			Home.create.setting();
			$('.popup-menu').hide();
		});
		$('.desk-menu a[menu="logout"]').on('click', function(){
			Home.base.logout();
			$('.popup-menu').hide();
		});

		$('.desk-menu a[menu="orderby"]').each(function(){
			$(this).prev().hide();
			if($(this).attr('orderby') == Home.CONFIG.appXY){
				$(this).prev().show();
			}
			$('.popup-menu').hide();
		});
	}

	return TEMP.popupMenuDesk;
},


}})();