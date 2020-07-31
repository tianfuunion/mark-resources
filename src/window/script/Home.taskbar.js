/*
**  任务栏
*/
Home.taskbar = (function(){return{
/*
**  初始化
*/
init : function(){
//当浏览器窗口改变大小时，任务栏的显示也需进行刷新
	$(window).on('resize', function(){
		Home.taskbar.resize();
	});
	//绑定任务栏点击事件
	Home.taskbar.click();
	//绑定任务栏前进后退按钮事件
	Home.taskbar.pageClick();
	TEMP.taskbar = $('<div id="taskbar">'+
			'<a id="start-menu" title="开始菜单,需要重新设计！增加[显示桌面功能]！" href="javascript:;" onclick="Home.window.hideAll();"><img src="template/default/images/home/shortcut/tool_app/aboutus.png"></a>'+
			'<div id="task-inner"></div>'+
			'<div id="task-notice" class="y"></div>'+
		'</div>');
	$('#desktop').append(TEMP.taskbar);
		task_NoticeData = {
//		'id'	: options.id,
//		'icon' : options.icon,
		'id'	: 'notes',
		'icon'	: 'task_Notice',
		'describe': '通知',
	};
	$('#task-notice').append(task_NoticeTemp(task_NoticeData));

//	Fps,需要重写！！！，直接通过ajax ，获取应用数量，直接显示！
	task_NoticeFpsData = {
		'id'	: 'fps',
		'icon'	: 'icon138',
		'describe': 'FPS，应该直接显示数字！',
	};
	$('#task-notice').append(task_NoticeTemp(task_NoticeFpsData));
	Home.taskbar.click();
},

click : function(){
	$('#taskbar').on('click', 'a.task-item', function(){
		if($(this).hasClass('task-item-current')){
			Home.window.hide($(this).attr('appid'), $(this).attr('type'));
		}else{
			Home.window.show2top($(this).attr('appid'),$(this).attr('type'));
		}
	}).on('contextmenu', 'a.task-item', function(e){
		$('.popup-menu').hide();
		$('.quick_view_container').remove();
		var popupmenu = Home.popupMenu.task($(this));
		var l = $(window).width() - e.clientX < popupmenu.width() ? e.clientX - popupmenu.width() : e.clientX;
		var t = e.clientY - popupmenu.height();
		popupmenu.css({
			left : l,
			top : t
		}).show();
		return false;
	});
},
pageClick : function(){
	$('#task-next-btn').on('click', function(){
		if($(this).hasClass('disable') == false){
			var w = $('#task-bar').width(), realW = $('#task-inner .task-item').length * 114, showW = w - 112, overW = realW - showW;
			var marginL = parseInt($('#task-inner').css('margin-left')) - 114;
			if(marginL <= overW * -1){
				marginL = overW * -1;
				$('#task-next a').addClass('disable');
			}
			$('#task-pre a').removeClass('disable');
			$('#task-inner').animate({
				marginLeft : marginL
			}, 200);
		}
	});
	$('#task-pre-btn').on('click', function(){
		if($(this).hasClass('disable') == false){
			var marginL = parseInt($('#task-inner').css('margin-left')) + 114;
			if(marginL >= 0){
				marginL = 0;
				$('#task-pre a').addClass('disable');
			}
			$('#task-next a').removeClass('disable');
			$('#task-inner').animate({
				marginLeft : marginL
			}, 200);
		}
	});
},
resize : function(){
//	$('#task-inner').removeClass('fl');
//	if(Home.CONFIG.dockPos == 'left'){
//		$('#task-bar').css({
//			'left' : $('#dock-bar').width(),
//			'right' : 0
//		});
//	}else if(Home.CONFIG.dockPos == 'right'){
//		$('#task-bar').css({
//			'left' : 0,
//			'right' : $('#dock-bar').width()
//		});
//		$('#task-inner').addClass('fl');
//	}else{
//		$('#task-bar').css({
//			'left' : 0,
//			'right' : 0
//		});
//	}
	var w = $('#task-bar').width(), realW = $('#task-inner .task-item').length * 114, showW = w - 112;
	$('#task-inner').css('width', realW);
	if(realW >= showW){
		$('#task-next, #task-pre').show();
		$('#task-content').css('width', showW);
//		$('#task-inner').addClass('fl').stop(true, false).animate({
//			marginLeft : 0
//		}, 200);
		$('#task-inner').stop(true, false).animate({
			marginLeft : 0
		}, 200);
		$('#task-next a').removeClass('disable');
		$('#task-pre a').addClass('disable');
	}else{
		$('#task-next, #task-pre').hide();
		$('#task-content').css('width','100%');
		$('#task-inner').css({
			'margin-left' : 0,
			'margin-right' : 0
		});
	}
},

}})();