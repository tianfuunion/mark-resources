//	阻止弹出浏览器默认右键菜单-=》修改右键菜单！
	$('#atlas').on('click', function(){
		$('.popup-menu').hide();
	}).on('contextmenu', function(e){
		$(".popup-menu").hide();
		var popupmenu = Home.popupMenus.desk();

		var l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
		var t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
		popupmenu.css({
			left : l,
			top : t
		}).show();
		return false;
	});

	$('.popup-menu').on('contextmenu', function(){
//		return false;
	});

/*
**  图谱平台右键
*/

Home.popupMenus = (function(){return{

desk : function(){
	if(!TEMP.popupMenuDesk){
		TEMP.popupMenuDesk = $(
			'<div class="popup-menu desk-menu" style="z-index:9990;display:none"><ul>'+
				'<li><a menu="Fullscreen" href="javascript:;"><b class="folder"></b>全屏显示</a></li>'+
				'<li><a menu="refresh" href="javascript:;"><b class="refresh"></b>&nbsp;&nbsp;刷&nbsp;&nbsp;&nbsp;新</a></li>'+
				'<li><a menu="addnode" href="javascript:;"><b class="themes"></b>新建节点</a></li>'+
				'<li><a menu="rename" href="javascript:;"><b class="edit"></b>&nbsp;重&nbsp;命&nbsp;名</a></li>'+
				'<li><a menu="setting" href="javascript:;"><b class="setting"></b>设置节点</a></li>'+
				'<li><a menu="del" href="javascript:;"><b class="del"></b>删除节点</a></li>'+
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
//	全屏显示
		$('.desk-menu a[menu="Fullscreen"]').on('click', function(){
			launchFullScreen(document.documentElement);
			$('.popup-menu').hide();
		});
//	刷新
		$('.desk-menu a[menu="refresh"]').on('click', function(){
			history.go()
			$('.popup-menu').hide();
		});

//	创建子节点	Create	AddNode
		$('.desk-menu a[menu="addnode"]').on('click', function(){
			dialog({
				id : 'addnode',
				padding : 0,
				content : addnodeDialogTemp({
					'title' : '请输入节点名称！',
					'note' : '请输入节点备注！',
				}),
				ok : function(){
					if($('#addnode input[name="title"]').val() != ''){
						$.ajax({
							type : 'POST',
							url : "home.php/app/nodeinsert",
							data: {
								sid		: $(this).attr('data-id'),
								title	: $('#addnode input[name="title"]').val(),
								note	: $('#addnode textarea[name="note"]').val(),
							},
							success : function(msg){
								alert(msg);
							}
						});
					}else{
						$('.folderNameError').show();
						return false;
					}
				},
				cancel : true
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

		$('.desk-menu a[menu="addpapp"]').on('click', function(){
			dialog({
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

		$('.desk-menu a[menu="setting"]').on('click', function(){
			alert('Setting');
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

	}

	return TEMP.popupMenuDesk;
},

}})();