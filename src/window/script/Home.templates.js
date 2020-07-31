// var template = require('template');

var testTemp = template.compile(
    '<div id="<%=id%>" state="show" class="move window-wrap window-this<% if(isflash){ %> window-wrap-flash<% } %>"  style="width:<%=width%>px;height:<%=height%>px;top:<%=top%>px;left:<%=left%>px;z-index:<%=zIndex%>">' +
    'id			: "<%=id%>"<br>' +
    'appid		: "<%=appid%>"<br>' +
    'realid		: "<%=realid%>"<br>' +
    'width		: "<%=width%>"<br>' +
    'height		: "<%=height%>"<br>' +
    'top		: "<%=top%>"<br>' +
    'left		: "<%=left%>"<br>' +
    'emptyW		: "<%=emptyW%>"<br>' +
    'emptyH		: "<%=emptyH%>"<br>' +
    'zIndex 	: "<%=zIndex%>"<br>' +
    'type 		: "<%=type%>"<br>' +
    'realid		: "<%=realid%>"<br>' +
    'title		: "<%=title%>"<br>' +
    'url		: "<%=url%>"<br>' +
    'icon		: "<%=icon%>"<br>' +
    'isresize	: "<%=isresize%>"<br>' +
    'istitlebar	: "<%=istitlebar%>"<br>' +
    'istitlebarFullscreen : "<%=istitlebarFullscreen%>"<br>' +
    'issetbar	: "<%=issetbar%>"<br>' +
    'isflash	: "<%=isflash%>"<br>' +
    '</div>'
);
//桌面图标
var appbtnTemp = template.compile(
//	'<li class="appbtn" type="<%=type%>" id="<%=id%>" realid="<%=realid%>" style="top:<%=top%>px;left:<%=left%>px">'+
//		'<div><img src="<%=icon%>" title="<%=title%>" alt="<%=title%>"></div>'+
//		'<span><%=title%></span>'+
//	'</li>'+
    '<li id="<%=id%>" realid="<%=realid%>" type="<%=type%>" describe="<%=describe%>">' +
    '<img src="<%=appimg%>" alt="<%=alt%>">' +
    '<p><%=title%></p></li>'
);


//桌面"添加应用"图标
var addbtnTemp = template.compile(
    '<li class="appbtn add" style="top:<%=top%>px;left:<%=left%>px">' +
    '<i class="addicon"></i>' +
    '<span>添加应用</span>' +
    '</li>'
);
//任务栏
/*
var taskTemp = template.compile(
	'<a id="<%=id%>" realid="<%=realid%>" type="<%=type%>" class="task-item task-item-current">'+
		'<div class="task-item-icon">'+
			'<img src="<%=icon%>">'+
		'</div>'+
		'<div class="task-item-txt"><%=title%></div>'+
	'</a>'
);
*/
var taskTemp = template.compile(
    '<a id="<%=id%>" appid="<%=appid%>" realid="<%=realid%>" type="<%=type%>" class="task-item task-item-current">' +
    '<img class="task-item-icon" src="<%=icon%>">' +
    '<spqn class="task-item-txt"><%=title%></span>' +
    '</a>'
);

//任务栏通知区域
var task_NoticeTemp = template.compile(
    '<a id="<%=id%>" class="icon <%=icon%>" title="<%=describe%>" href="javascript:;"></a>'
);

//工具类
var toolTemp = template.compile(
    '<div id="<%=id%>" appid="<%=appid%>" realid="<%=realid%>" type="<%=type%>" state="show" class="window-wrap window-this<% if(isflash){ %> window-wrap-flash<% } %>" style="width:<%=width%>px; height:<%=height%>px; top:<%=top%>px; left:<%=left%>px; z-index:<%=zIndex%>">' +
    '<div class="title-bar move">' +
    '<img class="title-icon" src="<%=icon%>"><span class="title"><%=title%></span>' +
    '<div class="title-handle">' +
    '<a class="ha-hide" btn="hide" href="javascript:;" title="最小化"><b class="hide-b"></b></a>' +
    '<a class="ha-close" btn="close" href="javascript:;" title="关闭">×</a>' +
    '</div>' +
    '</div>' +
    '<div class="window-loading"></div>' +
    '<div id="<%=realid%>" class="tool"></div>' +
    '</div>'
);

//小挂件
var widgetWindowTemp = template.compile(
    '<div id="<%=id%>" realid="<%=realid%>" type="<%=type%>" state="show" class="widget" style="z-index:1;width:<%=width%>px;height:<%=height%>px;top:<%=top%>px;left:<%=left%>px">' +
    '<div class="move"></div>' +
    '<a class="ha-close" href="javascript:;" title="关闭"></a>' +
    '<div class="frame">' +
    '<iframe src="<%=url%>" frameborder="0" allowtransparency="true"></iframe>' +
    '</div>' +
    '</div>'
);

//小挂件
var widgetTemp = template.compile(
    '<div id="<%=id%>" appid="<%=appid%>" realid="<%=realid%>" timeid="<%=timeid%>" type="<%=type%>" state="show" class="widget" style="width:<%=width%>px; height:<%=height%>px; top:<%=top%>px; left:<%=left%>px; z-index:<%=zIndex%>">' +
    '<div class="move"></div>' +
    '<div class="title-handle">' +
    '<a class="ha-close" btn="close" href="javascript:;" title="关闭">×</a>' +
    '</div>' +
    '<div class="window-loading"></div>' +
    '<div id="<%=realid%>" class="card move"></div>' +
    '</div>'
);

//卡片窗口
var cardTemp = template.compile(
    '<div id="<%=id%>" appid="<%=appid%>" realid="<%=realid%>" timeid="<%=timeid%>" type="<%=type%>" state="show" class="window-wrap window-this<% if(isflash){ %> window-wrap-flash<% } %>" style="max-width:<%=maxwidth%>%;width:<%=width%>px;height:<%=height%>px;top:<%=top%>px;left:<%=left%>px;z-index:<%=zIndex%>">' +
    '<div class="title-handle">' +
    '<a class="ha-hide" btn="hide" href="javascript:;" title="最小化"><b class="hide-b"></b></a>' +
    '<a class="ha-close" btn="close" href="javascript:;" title="关闭">×</a>' +
    '</div>' +
    '<% if(isflash){ %>' +
    '<div class="window-mask"><div class="maskbg"></div><div>运行中，点击恢复显示 :)</div></div>' +
    '<% }else{ %>' +
    '<div class="window-mask window-mask-noflash"></div>' +
    '<% } %>' +
    '<div class="window-loading"></div>' +
    '<div id="<%=realid%>" class="card move"></div>' +
    '</div>'
);
//Window窗口
var windowTemp = template.compile(
    '<div id="<%=id%>" appid="<%=appid%>" realid="<%=realid%>" type="<%=type%>" state="show" class="window-wrap window-this<% if(isflash){ %> window-wrap-flash<% } %>" style="width:<%=width%>px; height:<%=height%>px; min-width:<%=min-width%>px; min-height:<%=min-height%>px; max-width:<%=max-width%>px; max-height:<%=max-height%>px; top:<%=top%>px; left:<%=left%>px; z-index:<%=zIndex%>">' +
    '<div class="title-bar move">' +
    '<img class="title-icon" src="<%=icon%>"><span class="title"><%=title%></span>' +
    '<div class="title-handle">' +
    '<a class="ha-hide" btn="hide" href="javascript:;" title="最小化"><b class="hide-b"></b></a>' +
    '<% if(istitlebar){ %>' +
    '<a class="ha-max" btn="max" href="javascript:;" title="最大化"><b class="max-b"></b></a>' +
    '<a class="ha-revert" btn="revert" href="javascript:;" title="还原" style="display:none"><b class="revert-b"></b><b class="revert-t"></b></a>' +
    '<% } %>' +
    '<a class="ha-close" btn="close" href="javascript:;" title="关闭">×</a>' +
    '</div>' +
    '</div>' +
    '<% if(isflash){ %>' +
    '<div class="window-mask"><div class="maskbg"></div><div>运行中，点击恢复显示 :)</div></div>' +
    '<% }else{ %>' +
    '<div class="window-mask window-mask-noflash"></div>' +
    '<% } %>' +
    '<div class="window-loading"></div>' +
    '<div id="<%=realid%>" class="window"></div>' +
    '<% if(isstatebar){ %>' +
    '<div class="state-bar">' +
    '<div class="z"></div>' +
    '<div class="y">' +
    '<% if(isstar){ %>' +
    '<a class="btn star icon icon177" title="评分"></a>' +
    '<% } %>' +
    '<% if(ishelp){ %>' +
    '<a class="btn help icon icon105" title="帮助"></a>' +
    '<% } %>' +
    '<% if(refresh){ %>' +
    '<a class="btn refresh icon icon158" title="刷新"></a>' +
    '<% } %>' +
    '</div>' +
    '</div>' +
    '<% } %>' +
    '<% if(isresize){ %>' +
    '<div class="window-resize window-resize-t" resize="t"></div>' +
    '<div class="window-resize window-resize-r" resize="r"></div>' +
    '<div class="window-resize window-resize-b" resize="b"></div>' +
    '<div class="window-resize window-resize-l" resize="l"></div>' +
    '<div class="window-resize window-resize-rt" resize="rt"></div>' +
    '<div class="window-resize window-resize-rb" resize="rb"></div>' +
    '<div class="window-resize window-resize-lt" resize="lt"></div>' +
    '<div class="window-resize window-resize-lb" resize="lb"></div>' +
    '<% } %>' +
    '</div>'
);
//	App窗口
var appTemp = template.compile(
    '<div id="<%=id%>" appid="<%=appid%>" realid="<%=realid%>" type="<%=type%>" state="show" class="window-wrap window-this<% if(isflash){ %> window-wrap-flash<% } %>" style="max-width:<%=max-width%>%;width:<%=width%>px;height:<%=height%>px;min-width:<%=min-width%>px;min-height:<%=min-height%>px;top:<%=top%>px;left:<%=left%>px;z-index:<%=zIndex%>">' +
    '<div class="title-bar move">' +
    '<img class="title-icon" src="<%=icon%>"><span class="title"><%=title%></span>' +
    '<% if(issetbar){ %>' +
    '<div class="set-bar">' +
    '<% if(issetstar){ %>' +
    '<a class="btn star icon icon177" title="评分"></a>' +
    '<% } %>' +
    '<% if(issethelp){ %>' +
    '<a class="btn help icon icon105" title="帮助"></a>' +
    '<% } %>' +
    '<% if(issetrefresh){ %>' +
    '<a class="btn refresh icon icon158" title="刷新"></a>' +
    '<% } %>' +
    '</div>' +
    '<% } %>' +
    '<div class="title-handle">' +
    '<a class="ha-hide" btn="hide" href="javascript:;" title="最小化"><b class="hide-b"></b></a>' +
    '<% if(istitlebar){ %>' +
    '<a class="ha-max" btn="max" href="javascript:;" title="最大化"><b class="max-b"></b></a>' +
    '<a class="ha-revert" btn="revert" href="javascript:;" title="还原" style="display:none"><b class="revert-b"></b><b class="revert-t"></b></a>' +
    '<% } %>' +
    '<% if(istitlebarFullscreen){ %>' +
    '<a class="ha-fullscreen" btn="fullscreen" href="javascript:;" title="全屏">+</a>' +
    '<% } %>' +
    '<a class="ha-close" btn="close" href="javascript:;" title="关闭">×</a>' +
    '</div></div>' +
    '<% if(isflash){ %>' +
    '<div class="window-mask"><div class="maskbg"></div><div>运行中，点击恢复显示 :)</div></div>' +
    '<% }else{ %>' +
    '<div class="window-mask window-mask-noflash"></div>' +
    '<% } %>' +
    '<div class="window-loading"></div>' +
    '<div id="<%=realid%>" class="app"></div>' +
    '<% if(isresize){ %>' +
    '<div class="window-resize window-resize-t" resize="t"></div>' +
    '<div class="window-resize window-resize-r" resize="r"></div>' +
    '<div class="window-resize window-resize-b" resize="b"></div>' +
    '<div class="window-resize window-resize-l" resize="l"></div>' +
    '<div class="window-resize window-resize-rt" resize="rt"></div>' +
    '<div class="window-resize window-resize-rb" resize="rb"></div>' +
    '<div class="window-resize window-resize-lt" resize="lt"></div>' +
    '<div class="window-resize window-resize-lb" resize="lb"></div>' +
    '<% } %>' +
    '</div></div>'
);
//文件夹窗口
var folderWindowTemp = template.compile(
    '<div id="<%=id%>" realid="<%=realid%>" type="<%=type%>" state="show" class="folder-window window-wrap window-this" style="max-width:<%=max-width%>%;width:<%=width%>px;height:<%=height%>px;top:<%=top%>px;left:<%=left%>px;z-index:<%=zIndex%>">' +
    '<div style="height:100%">' +
    '<div class="title-bar">' +
    '<img class="title-icon" src="<%=icon%>"><span class="title"><%=title%></span>' +
    '</div>' +
    '<div class="title-handle">' +
    '<a class="ha-hide" btn="hide" href="javascript:;" title="最小化"><b class="hide-b"></b></a>' +
    '<% if(istitlebar){ %>' +
    '<a class="ha-max" btn="max" href="javascript:;" title="最大化"><b class="max-b"></b></a>' +
    '<a class="ha-revert" btn="revert" href="javascript:;" title="还原" style="display:none"><b class="revert-b"></b><b class="revert-t"></b></a>' +
    '<% } %>' +
    '<a class="ha-close" btn="close" href="javascript:;" title="关闭">×</a>' +
    '</div>' +
    '<div class="window-frame">' +
    '<div class="window-mask window-mask-noflash"></div><div class="window-loading"></div>' +
    '<div class="folder_body"></div>' +
    '</div>' +
    '<div class="set-bar"><div class="fr">' +
    '<a class="btn refresh"><i class="icon icon158"></i><span class="btn-con">刷新</span></a>' +
    '</div></div>' +
    '</div>' +
    '<% if(isresize){ %>' +
    '<div class="window-resize window-resize-t" resize="t"></div>' +
    '<div class="window-resize window-resize-r" resize="r"></div>' +
    '<div class="window-resize window-resize-b" resize="b"></div>' +
    '<div class="window-resize window-resize-l" resize="l"></div>' +
    '<div class="window-resize window-resize-rt" resize="rt"></div>' +
    '<div class="window-resize window-resize-rb" resize="rb"></div>' +
    '<div class="window-resize window-resize-lt" resize="lt"></div>' +
    '<div class="window-resize window-resize-lb" resize="lb"></div>' +
    '<% } %>' +
    '</div>'
);
//块窗口
var blockTemp = template.compile(
    '<div id="<%=id%>" appid="<%=appid%>" realid="<%=realid%>" type="<%=type%>" state="show" class="window-wrap window-this<% if(isflash){ %> window-wrap-flash<% } %>" style="max-width:<%=max-width%>%;width:<%=width%>px;height:<%=height%>px;top:<%=top%>px;left:<%=left%>px;z-index:<%=zIndex%>">' +
    '<div class="title-bar move">' +
    '<img class="title-icon" src="<%=icon%>">' +
    '<span class="title"><%=title%></span>' +
    '<div class="title-handle">' +
    '<a class="ha-hide" btn="hide" href="javascript:;" title="最小化"><b class="hide-b"></b></a>' +
    '<% if(istitlebar){ %>' +
    '<a class="ha-max" btn="max" href="javascript:;" title="最大化"><b class="max-b"></b></a>' +
    '<a class="ha-revert" btn="revert" href="javascript:;" title="还原" style="display:none"><b class="revert-b"></b><b class="revert-t"></b></a>' +
    '<% } %>' +
    '<% if(istitlebarFullscreen){ %>' +
    '<a class="ha-fullscreen" btn="fullscreen" href="javascript:;" title="全屏">+</a>' +
    '<% } %>' +
    '<a class="ha-close" btn="close" href="javascript:;" title="关闭">×</a>' +
    '</div>' +
    '</div>' +
    '<% if(isflash){ %>' +
    '<div class="window-mask"><div class="maskbg"></div><div>运行中，点击恢复显示 :)</div></div>' +
    '<% }else{ %>' +
    '<div class="window-mask window-mask-noflash"></div>' +
    '<% } %>' +
    '<div class="window-loading"></div>' +
    '<div id="<%=realid%>" class="block"></div>' +
    //		'<div class="set-bar"><div class="fr">'+
    //			'<% if(issetbar){ %>'+
    //				'<a class="btn star"><i class="icon icon177"></i><span class="btn-con">评分</span></a>'+
    //				'<a class="btn help"><i class="icon icon105"></i><span class="btn-con">帮助</span></a>'+
    //			'<% } %>'+
    //			'<a class="btn refresh"><i class="icon icon158"></i><span class="btn-con">刷新</span></a>'+
    //		'</div></div>'+

    //	'<% if(isresize){ %>'+
    //		'<div class="window-resize window-resize-t" resize="t"></div>'+
    //		'<div class="window-resize window-resize-r" resize="r"></div>'+
    //		'<div class="window-resize window-resize-b" resize="b"></div>'+
    //		'<div class="window-resize window-resize-l" resize="l"></div>'+
    //		'<div class="window-resize window-resize-rt" resize="rt"></div>'+
    //		'<div class="window-resize window-resize-rb" resize="rb"></div>'+
    //		'<div class="window-resize window-resize-lt" resize="lt"></div>'+
    //		'<div class="window-resize window-resize-lb" resize="lb"></div>'+
    //	'<% } %>'+
    '</div>'
);
//文件夹预览
var folderViewTemp = template.compile(
    '<div id="<%=id%>" realid="<%=realid%>" state="show" class="quick_view_wrap" style="top:<%=top%>px;left:<%=left%>px">' +
    '<div class="perfect_nine_box">' +
    '<div class="perfect_nine_t">' +
    '<div class="perfect_nine_t_m"></div>' +
    '</div>' +
    '<span class="perfect_nine_t_l"></span>' +
    '<span class="perfect_nine_t_r"></span>' +
    '<div class="perfect_nine_middle">' +
    '<span class="perfect_nine_m_l">' +
    '<div class="perfect_nine_m_l_t" style="top:0;height:<%=mlt%>px"></div>' +
    '<div class="perfect_nine_m_l_m" style="top:<%=mlt%>px;height:20px;display:<% if(mlm){ %>block<% }else{ %>none<% } %>"></div>' +
    '<div class="perfect_nine_m_l_b" style="top:<% if(mlm){ %><%=mlt+20%><% }else{ %><%=mlt%><% } %>px;height:<%=mlb%>px"></div>' +
    '</span>' +
    '<span class="perfect_nine_m_r">' +
    '<div class="perfect_nine_m_r_t" style="top:0;height:<%=mrt%>px"></div>' +
    '<div class="perfect_nine_m_r_m" style="top:<%=mrt%>px;height:20px;display:<% if(mrm){ %>block<% }else{ %>none<% } %>"></div>' +
    '<div class="perfect_nine_m_r_b" style="top:<% if(mrm){ %><%=mrt+20%><% }else{ %><%=mrt%><% } %>px;height:<%=mrb%>px"></div>' +
    '</span>' +
    '<div class="perfect_nine_context">' +
    '<div class="quick_view_wrap_control">' +
    '<a href="javascript:;" class="quick_view_wrap_open">打开</a>' +
    '</div>' +
    '<div class="quick_view_wrap_list folder-window" id="quick_view_wrap_list_<%=realid%>" realid="<%=realid%>">' +
    '<div class="quick_view_wrap_list_in" id="quick_view_wrap_list_in_<%=realid%>" style="height:<%=height%>px">' +
    '<%=apps%>' +
    '</div>' +
    '<div class="scrollBar"></div>' +
    '<div class="scrollBar_bgc"></div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="perfect_nine_b">' +
    '<div class="perfect_nine_b_m"></div>' +
    '</div>' +
    '<span class="perfect_nine_b_l"></span>' +
    '<span class="perfect_nine_b_r"></span>' +
    '</div>' +
    '</div>'
);


//	文件下载
//	var fileDownloadTemp = template.compile('<iframe src="filedownload.php?appid=<%=fid%>" frameborder="0" style="display:none"></iframe>');
//	var DownloadTemp = template.compile('<a href="/data/dofiles/<%=fid%>/<%=name%>" download="<%=title%>"></a>');
var DownloadTemp = template.compile('<a href="/data/dofiles/<%=fid%>/<%=name%>" style="display:none"></a>');


//	搜索结果列表
//	var suggestTemp = template.compile(
//		'<li class="resultList" appid="<%=appid%>" appcode="<%=code%>" type="<%=type%>">'+
//			'<a href="javascript:;"><div><%=name%></div></a>'+
//		'</li>'
//	);

//	新建&修改文件夹窗口

var editFolderDialogTemp = template.compile(
    '<div id="addfolder">' +
    '<a class="folderSelector"><img src="<%=src%>"></a>' +
    '<div class="folderNameTxt">请输入文件夹名称：</div>' +
    '<div class="folderInput"><input type="text" class="folderName" id="folderName" value="<%=name%>"></div>' +
    '<div class="folderNameError">文件夹名称不能只包含空字符</div>' +
    '<div class="fcDropdown">' +
    '<a class="fcDropdown_item" title="默认"><img class="fcDropdown_img" src="template/default/images/home/ui/expicon/folder_default.png"></a>' +
    '<a class="fcDropdown_item" title="文本"><img class="fcDropdown_img" src="template/default/images/home/ui/expicon/folder_doc.png"></a>' +
    '<a class="fcDropdown_item" title="游戏"><img class="fcDropdown_img" src="template/default/images/home/ui/expicon/folder_game.png"></a>' +
    '<a class="fcDropdown_item" title="生活"><img class="fcDropdown_img" src="template/default/images/home/ui/expicon/folder_life.png"></a>' +
    '<a class="fcDropdown_item" title="音乐"><img class="fcDropdown_img" src="template/default/images/home/ui/expicon/folder_music.png"></a>' +
    '<a class="fcDropdown_item" title="工具"><img class="fcDropdown_img" src="template/default/images/home/ui/expicon/folder_tool.png"></a>' +
    '<a class="fcDropdown_item" title="视频"><img class="fcDropdown_img" src="template/default/images/home/ui/expicon/folder_video.png"></a>' +
    '</div>' +
    '</div>'
);


//新建&修改私人应用窗口
var editPappDialogTemp = template.compile(
    '<table id="addpapp" cellspacing="10">' +
    '<colgroup>' +
    '<col style="width:80px">' +
    '<col>' +
    '</colgroup>' +
    '<tr>' +
    '<td class="tar">名称：</td>' +
    '<td><input type="text" id="addpappName" style="width:80px" value="<%=name%>"></td>' +
    '</tr>' +
    '<tr>' +
    '<td class="tar">地址：</td>' +
    '<td><input type="text" id="addpappUrl" value="<%=url%>"></td>' +
    '</tr>' +
    '<tr>' +
    '<td class="tar">尺寸：</td>' +
    '<td>' +
    '宽 <input type="text" id="addpappWidth" style="width:40px" value="<%=width%>"> px　' +
    '高 <input type="text" id="addpappHeight" style="width:40px" value="<%=height%>"> px' +
    '</td>' +
    '</tr>' +
    '<% if(id == null){ %>' +
    '<tr>' +
    '<td class="tar">类型：</td>' +
    '<td>' +
    '<label><input type="radio" name="addpappType" value="papp" <% if(type == "papp"){ %>checked<% } %>> APP　</label>' +
    '<label><input type="radio" name="addpappType" value="pwidget" <% if(type == "pwidget"){ %>checked<% } %>> Widget　</label>' +
    '</td>' +
    '</tr>' +
    '<tr <% if(type == "pwidget"){ %>style="display:none"<% } %>>' +
    '<td class="tar">是否可拉伸：</td>' +
    '<td>' +
    '<label><input type="radio" name="addpappIsresize" value="1" <% if(isresize == 1){ %>checked<% } %>> 是　</label>' +
    '<label><input type="radio" name="addpappIsresize" value="0" <% if(isresize != 1){ %>checked<% } %>> 否　</label>' +
    '</td>' +
    '</tr>' +
    '<% } %>' +
    '</table>'
);
//应用评分
var starDialogTemp = template.compile(
    '<div id="star">' +
    '<div class="grade-box">' +
    '<div class="star-num"><%=point%></div>' +
    '<div class="star-box">' +
    '<div>打分：</div>' +
    '<i style="width:<%=realpoint%>%"></i>' +
    '<ul>' +
    '<li class="grade-1" num="1"><a href="javascript:;"><em>很不好用</em></a></li>' +
    '<li class="grade-2" num="2"><a href="javascript:;"><em>体验一般般</em></a></li>' +
    '<li class="grade-3" num="3"><a href="javascript:;"><em>比较好用</em></a></li>' +
    '<li class="grade-4" num="4"><a href="javascript:;"><em>很好用</em></a></li>' +
    '<li class="grade-5" num="5"><a href="javascript:;"><em>棒极了，推荐</em></a></li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '</div>'
);
//上传文件窗口
var uploadFileDialogTemp = template.compile(
    '<div id="uploadfilebtnbox">' +
    '请选择文件<input type="file" name="xfile[]" id="uploadfilebtn" multiple="multiple">' +
    '</div>' +
    '<div id="uploadfile"><%=list%></div>'
);
var uploadFileDialogListTemp = template.compile(
    '<% for(var i = 0; i < list.length; i++){ %>' +
    '<div class="filelist">' +
    '<div class="name" title="<%=list[i].name%>"><div style="width:10000px"><%=list[i].name%></div></div>' +
    '<div class="size"><%=list[i].size%></div>' +
    '<div class="do">[&nbsp;<a href="javascript:;" class="del">删</a>&nbsp;]</div>' +
    '<div class="progress"></div>' +
    '</div>' +
    '<% } %>'
);

//	传输精灵
var nexstarTemp = template.compile(
    '<div id="<%=id%>" appid="<%=appid%>" realid="<%=realid%>" type="<%=type%>" state="show" class="window-wrap window-this" style="max-width:<%=max-width%>%;width:<%=width%>px; height:<%=height%>px; min-width:<%=min-width%>px; min-height:<%=min-height%>px; max-width:<%=max-width%>px; max-height:<%=max-height%>px; top:<%=top%>px; left:<%=left%>px; z-index:<%=zIndex%>">' +
    '<div class="title-bar move">' +
    '<img class="title-icon" src="<%=icon%>"><span class="title"><%=title%></span>' +
    '<div class="title-handle">' +
    '<a class="ha-hide" btn="hide" href="javascript:;" title="最小化"><b class="hide-b"></b></a>' +
    '<a class="ha-max" btn="max" href="javascript:;" title="最大化"><b class="max-b"></b></a>' +
    '<a class="ha-revert" btn="revert" href="javascript:;" title="还原" style="display:none"><b class="revert-b"></b><b class="revert-t"></b></a>' +
    '<a class="ha-close" btn="close" href="javascript:;" title="关闭">×</a>' +
    '</div>' +
    '</div>' +
    '<div class="window-loading"></div>' +
    '<div id="nexstar"><div id="ctrl">' +
    '<div class="space z" title="还需要增加扩容功能，此功能最好显示在云盘里边，已用空间的圆角尚未完善，算法">' +
    '<progress class="pro" value="50" max="100"></progress>' +
    '<p class="quota">总空间：<span class="used">100.00G</span> / <span class="total">2000.00G</span></p></div>' +
    '<button type="button">清空已上传</button>' +
    '<button type="button">全部继续</button>' +
    '<button type="button">全部暂停</button>' +
    '<button type="button">选择文件<input id="uploadfilebtn" name="file[]" type="file" multiple="multiple"></button>' +
    '<button type="button" onclick="Home.uploader.upload()">开始上传</button>' +
    '</div>' +
    '<ul id="uploadlist"><%=list%></ul></div>' +
    '<div class="window-resize window-resize-t" resize="t"></div>' +
    '<div class="window-resize window-resize-r" resize="r"></div>' +
    '<div class="window-resize window-resize-b" resize="b"></div>' +
    '<div class="window-resize window-resize-l" resize="l"></div>' +
    '<div class="window-resize window-resize-rt" resize="rt"></div>' +
    '<div class="window-resize window-resize-rb" resize="rb"></div>' +
    '<div class="window-resize window-resize-lt" resize="lt"></div>' +
    '<div class="window-resize window-resize-lb" resize="lb"></div>' +
    '</div>'
);

//	传输精灵列表
var nexstarListTemp = template.compile(
    '<% for(var i = 0; i < list.length; i++){ %>' +
    '<li>' +
    '<i class="exticon w40 z"><img class="w40" src="template/default/images/home/ui/expicon/file_default.png"></i>' +
    '<div class="degree">' +
    '<p>' +
    '<span class="z"><%=list[i].name%> （<%=list[i].type%>） -- <%=list[i].icon%> -- <%=list[i].ext%></span>' +
    '<span class="y"><text></text><%=list[i].size%></span>' +
    '</p>' +
    '<progress class="pro" value="" max="100"</progress>' +
    '</div>' +
    '<div class="do y">' +
    '<i type="button" class="icon icon10" title="上传"></i>' +
    '<i type="button" class="icon icon48" title="删除"></i>' +
    '</div>' +
    '</li>' +
    '<% } %>'
);

//新手帮助提示
var helpTemp = template.compile(
    '<div id="help">' +
    '<a href="javascript:;" class="close" title="关闭新手帮助">×</a>' +
    '<div id="step1" class="step" step="1" style="position:relative;left:50%;top:50%;margin-left:-160px;margin-top:-60px;width:280px;height:100px">' +
    '<p style="text-align:center">' +
    '<span class="h2">欢迎使用HoorayOS</span>' +
    '<br>下面我会简单介绍下如何使用，以便你快速上手<br>' +
    '<a href="javascript:;" class="next">下一步</a>' +
    '</p>' +
    '</div>' +
    '<div id="step2" class="step" step="2" style="top:90px;left:140px;width:250px">' +
    '<b class="jt jt_left" style="left:-40px;top:20px"></b>' +
    '<p>' +
    '<span class="h1">①</span><span class="h2">桌面</span>' +
    '<br>可以在应用中心添加自己需要的应用到桌面<br>' +
    '<a href="javascript:;" class="next">下一步</a>' +
    '</p>' +
    '</div>' +
    '<div id="step3" class="step" step="3" style="top:90px;left:550px;width:250px">' +
    '<b class="jt jt_top" style="top:-40px;left:30px"></b>' +
    '<p>' +
    '<span class="h1">②</span><span class="h2">应用码头</span>' +
    '<br>可以将桌面图标拖放到这<br>' +
    '<a href="javascript:;" class="next">下一步</a>' +
    '</p>' +
    '</div>' +
    '<div id="step4" class="step" step="4" style="top:130px;left:550px;width:250px">' +
    '<b class="jt jt_top" style="top:-40px;left:30px"></b>' +
    '<p>' +
    '<span class="h1">③</span><span class="h2">翻页导航</span>' +
    '<br>可以快速切换当前桌面<br>' +
    '<a href="javascript:;" class="next">下一步</a>' +
    '</p>' +
    '</div>' +
    '<div id="step5" class="step" step="5" style="bottom:50px;left:550px;width:250px">' +
    '<b class="jt jt_bottom" style="bottom:-40px;left:30px"></b>' +
    '<p>' +
    '<span class="h1">④</span><span class="h2">任务栏</span>' +
    '<br>这个就不用我介绍了吧 =)<br>' +
    '<a href="javascript:;" class="over">&nbsp;完&nbsp;成&nbsp;</a>' +
    '</p>' +
    '</div>' +
    '</div>'
);


/**
 * 商品列表项目
 * 'src="<%=uploads%>/market/product/<%=list[i].facade%>"'+
 */
var product_list = template.compile(
    '<% for(var i = 0; i < list.length; i++){ %>' +
    '<a class="product-item list-item" href="<%=host%>/market.php/details/index?id=<%=list[i].productid%>" data-id="<%=list[i].productid%>" data-price="<%=list[i].price%>" data-solds="<%=list[i].pageview%>"  data-time="<%=list[i].releasetime%>" data-target="_blank">' +
    '<div class="image-wrapper inline-block">' +
    '<img class="product-img lazyload lazy radius5 w100 h100" lazyload="true" src="<%=coss%>/api.php/bucket/get?object=<%=list[i].facade%>&x-coss-process=style/product_list_image_format">' +
    '</div>' +
    '<div class="product-info inline-block">' +
    '<div class="product-title ellipsis2"><%=list[i].title%></div>' +
    '<div class="pricepart">' +
    '<span class="product-price w45 inline-block">￥<b class="price"><%=list[i].price/100%></b></span>' +
    '<span class="product-attach w45 inline-block"><%=list[i].pageview%>人关注</span>' +
    '</div>' +
    '<div class="product-store"></div>' +
    '<div class="product-service"></div>' +

    '</div>' +
    '</a>' +
    '<% } %>'
);

/**
 * 商品列表项目 2.0
 * 'src="<%=uploads%>/market/product/<%=list[i].facade%>"'+
 */
var productList = template.compile(
    '<% for(var i = 0; i < list.length; i++){ %>' +
    '<a class="product-item list-item" href="<%=host%>/market.php/details/index?id=<%=list[i].productid%>" data-id="<%=list[i].productid%>" data-price="<%=list[i].price%>" data-solds="<%=list[i].pageview%>"  data-time="<%=list[i].releasetime%>" data-target="_blank">' +
    '<div class="image-wrapper inline-block">' +
    '<img class="product-img lazyload lazy radius5 w100 h100" lazyload="true" src="<%=coss%>?object=<%=list[i].facade%>&x-coss-process=style/product_list_image_format">' +
    '</div>' +
    '<div class="product-info inline-block">' +
    '<div class="product-title ellipsis2"><%=list[i].title%></div>' +
    '<div class="pricepart">' +
    '<span class="product-price w45 inline-block">￥<b class="price"><%=list[i].price/100%></b></span>' +
    '<span class="product-attach w45 inline-block"><%=list[i].pageview%>人关注</span>' +
    '</div>' +
    '<div class="product-store"></div>' +
    '<div class="product-service"></div>' +

    '</div>' +
    '</a>' +
    '<% } %>'
);

// 投票排行榜列表
var voting_list = template.compile(
    '<% for(var i = 0; i < list.length; i++){ %>' +
    '<a href="<%=host%>/club.php/voting/details/poid/<%=list[i].poid%>" class="weui-media-box weui-media-box_appmsg ranking-item" target="_blank">' +
    '<span class="pd center -border -radius50 ranking-serial bolder"><%=i+1+limit%></span>' +
    '<div class="weui-media-box__hd">' +

    '<img class="weui-media-box__thumb h100 border radius50 lazyload" lazyload="true"' +
    '<% if(list[i].pic_cover){ %>' +
    'src="<%=uploads%>/voting/cover/<%=list[i].pic_cover%>"' +
    '<% }else if(list[i].avatar){ %>' +
    'src="<%=uploads%>/avatar/<%=list[i].avatar%>"' +
    '<% } %>' +
    '">' +
    '</div>' +
    '<div class="weui-media-box__bd">' +
    '<h4 class="weui-media-box__title"><%=list[i].song%></h4>' +
    '<p class="weui-media-box__desc">[<%=list[i].poid%>号] <%=list[i].name%></p>' +
    '</div>' +
    '<div class="weui-media-box__ft"><%=list[i].voter.length %> 票</div>' +
    '</a>' +
    '<%}%>'
);

// 网格视图
var gridview = template.compile(
    '<% for(var i = 0; i < list.length; i++){ %>' +
    '<a class="product-item list-item" href="<%=host%>/club.php/voting/details?poid=<%=list[i].poid%>" data-poid="<%=list[i].poid%>">' +

    '<div class="image-wrapper inline-block">' +
    '<img class="product-img lazyload lazy radius5 w100 h100" lazyload="true"' +
    'src="<%=uploads%>/voting/cover/<%=list[i].pic_cover%>"' +
    'alt="<%=list[i].name%>">' +
    '</div>' +

    '<div class="product-info inline-block">' +

    '<div class="product-title ellipsis2"><%=list[i].name%></div>' +
    '<div class="pricepart">' +
    '<span class="product-price w45 inline-block">￥<b class="price"><%=list[i].price/100%></b></span>' +
    '<span class="product-attach w45 inline-block"><%=list[i].verifytime%> <%=list[i].pageview%>人访问</span>' +
    '</div>' +
    '<div class="product-store"></div>' +
    '<div class="product-service"></div>' +

    '</div>' +
    '</a>' +
    '<% } %>'
);
