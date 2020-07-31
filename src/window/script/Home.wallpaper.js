/*
**  壁纸
*/
Home.wallpaper = (function(){return{

//	初始化
init : function(){
	Home.wallpaper.get(function(){
		Home.wallpaper.set();
	});
},

/*
**	获得壁纸
**	通过ajax到后端获取壁纸信息，同时设置壁纸
*/
get : function(callback){
	$.ajax({
		type : 'POST',
//		url : urlPrefix + 'get_wallpaper/',
		url : urlPrefix + 'home.php/index/getthemes/',
		success : function(msg){
			var w = msg.split('<{|}>');
			Home.CONFIG.wallpaperState = parseInt(w[0]);
			switch(Home.CONFIG.wallpaperState){
				case 1:
				case 2:
//					Home.CONFIG.wallpaper = w[1];
					Home.CONFIG.wallpaper = 'template/default/images/wallpaper/wallpaper' + w[0] + '.png';
					Home.CONFIG.wallpaperType = w[2];
					Home.CONFIG.wallpaperWidth = parseInt(w[3]);
					Home.CONFIG.wallpaperHeight = parseInt(w[4]);
					break;
				case 3:
					Home.CONFIG.wallpaper = w[1];
					break;
			}
			callback && callback();
		}
	});
},

/*
**	设置壁纸
**	平铺和居中可直接用css样式background解决
**	而填充、适应和拉伸则需要进行模拟
*/
set : function(isreload){
	/*
	**  判断壁纸是否需要重新载入
	**  比如当浏览器尺寸改变时，只需更新壁纸，而无需重新载入
	*/
	var isreload = typeof(isreload) == 'undefined' ? true : isreload;
	if(isreload){
		var times = 500;
		//IE下不加动画
		try{
			if($.browser.msie){
				var times = 0;
			}
		}catch(err){}
		$('#zoomWallpaperGrid').attr('id', 'zoomWallpaperGrid-ready2remove').css('zIndex', -11);
		setTimeout(function(){
			$('#zoomWallpaperGrid-ready2remove').remove();
			$('#zoomWallpaperGrid').removeClass('radi');
		}, times);
	}
	var w = $(window).width(), h = $(window).height();
	switch(Home.CONFIG.wallpaperState){
		case 1:
		case 2:
			var date = new Date().getTime(); //防止缓存
			var _wallpaper_user = Home.CONFIG.wallpaper + "?v=" + date;
			switch(Home.CONFIG.wallpaperType){
				//平铺
				case 'pingpu':
					if(isreload){
						$('body').append('<div id="zoomWallpaperGrid" class="radi" style="position:absolute; z-index:-10; top:0; left:0; height:100%; width:100%; background:#fff000 url(' + _wallpaper_user + ') repeat"></div>');
					}
					break;
				//居中
				case 'juzhong':
					if(isreload){
						$('body').append('<div id="zoomWallpaperGrid" class="radi" style="position:absolute;z-index:-10;top:0;left:0;height:100%;width:100%;background:#503E96 url(' + _wallpaper_user + ') no-repeat 50% 50%"></div>');
					}
					break;
				//填充
				case 'tianchong':
					var t = (h - Home.CONFIG.wallpaperHeight) / 2, l = (w - Home.CONFIG.wallpaperWidth) / 2;
					if(isreload){
						$('body').append('<div id="zoomWallpaperGrid" class="radi" style="position:absolute; z-index:-10;left:0; top:0; overflow:hidden; height:' + h + 'px; width:' + w + 'px; background:#fff"><img id="zoomWallpaper" src="' + _wallpaper_user + '" style="position:absolute; height:' + Home.CONFIG.wallpaperHeight + 'px;width:' + Home.CONFIG.wallpaperWidth + 'px;top:' + t + 'px; left:' + l + 'px"><div style="position:absolute; height:' + h + 'px;width:' + w + 'px; background:#fff; opacity:0; filter:alpha(opacity=0)"></div></div>');
					}else{
						$('#zoomWallpaperGrid, #zoomWallpaperGrid div').css({
							height : h + 'px',
							width : w + 'px'
						});
						$('#zoomWallpaper').css({
							top : t + 'px',
							left : l + 'px'
						});
					}
					break;
				//适应
				case 'shiying':
					var imgH, imgW, t, l;
					if(Home.CONFIG.wallpaperHeight / Home.CONFIG.wallpaperWidth > h / w){
						imgH = h;
						imgW = Home.CONFIG.wallpaperWidth * (h / Home.CONFIG.wallpaperHeight);
						t = 0;
						l = (w - imgW) / 2;
					}else if(Home.CONFIG.wallpaperHeight / Home.CONFIG.wallpaperWidth < h / w){
						imgW = w;
						imgH = Home.CONFIG.wallpaperHeight * (w / Home.CONFIG.wallpaperWidth);
						l = 0;
						t = (h - imgH) / 2;
					}else{
						imgH = Home.CONFIG.wallpaperHeight;
						imgW = Home.CONFIG.wallpaperWidth;
						t = l = 0;
					}
					if(isreload){
						$('body').append('<div id="zoomWallpaperGrid" class="radi" style="position:absolute; z-index:-10; left:0; top:0; overflow:hidden; height:' + h + 'px; width:' + w + 'px; background:#fff"><img id="zoomWallpaper" src="' + _wallpaper_user + '" style="position:absolute; height:' + imgH + 'px;width:' + imgW + 'px; top:' + t + 'px; left:' + l + 'px"><div style="position:absolute; height:' + h + 'px;width:' + w + 'px;background:#fff; opacity:0; filter:alpha(opacity=0)"></div></div>');
					}else{
						$('#zoomWallpaperGrid, #zoomWallpaperGrid div').css({
							height : h + 'px',
							width : w + 'px'
						});
						$('#zoomWallpaper').css({
							height : imgH + 'px',
							width : imgW + 'px',
							top : t + 'px',
							left : l + 'px'
						});
					}
					break;
				//拉伸
				case 'lashen':
					if(isreload){
						$('body').append('<div id="zoomWallpaperGrid" class="radi" style="position:absolute; z-index:-10; left:0; top:0; overflow:hidden; height:' + h + 'px;width:' + w + 'px; background:#fff"><img id="zoomWallpaper" src="' + _wallpaper_user + '" style="position:absolute;height:' + h + 'px;width:' + w + 'px;top:0;left:0"><div style="position:absolute;height:' + h + 'px;width:' + w + 'px;background:#fff;opacity:0;filter:alpha(opacity=0)"></div></div>');
					}else{
						$('#zoomWallpaperGrid').css({
							height : h + 'px',
							width : w + 'px'
						}).children('#zoomWallpaper, div').css({
							height : h + 'px',
							width : w + 'px'
						});
					}
					break;
			}
			break;
		case 3:
			if(isreload){
					$('body').append('<div id="zoomWallpaperGrid" class="radi" style="position:absolute; z-index:-10; top:0; left:0; height:100%; width:100%; overflow:hidden"><div></div><iframe id="iframeWallpaper" frameborder="no" border="0" scrolling="no" class="iframeWallpaper" style="position:absolute;left:0;top:0;overflow:hidden;width:100%;height:100%" src="' + _wallpaper_user + '"></iframe></div>');
			}
			break;
	}
},

/*
**	更新壁纸
**	通过ajax到后端进行更新，同时获得壁纸
*/
update : function(wallpaperstate, wallpapertype, wallpaper){
	$.ajax({
		type : 'POST',
		url : urlPrefix + 'set_wallpaper/',
		data : 'wpstate=' + wallpaperstate + '&wptype=' + wallpapertype + '&wp=' + wallpaper,
		success : function(){
			Home.wallpaper.get(function(){
				Home.wallpaper.set();
			});
		}
	});
},

/*
**切换桌面背景
*/
rewallpaper : function(){
//	随机数函数
	function RandomNum(Min,Max){
		var Range = Max - Min;
		var Rand = Math.random();
		var num = Min + Math.round(Rand * Range);
		return num;
	}
//	16进制
//		document.body.style.background="#"+ RandomNum(0,999999);
//	rgb模式
//		document.body.style.background=RandomNum(0,255)+","+RandomNum(0,255)+","+RandomNum(0,255);
		var cor = RandomNum(0,255)+","+RandomNum(0,255)+","+RandomNum(0,255);
		document.body.style.background="rgb("+cor+")";
},
//	定时切换背景
//	setInterval(Home.wallpaper.rewallpaper(),1000);

}})();
