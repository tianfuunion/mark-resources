/*
**  小挂件
*/
Home.widget = (function(){
	return {
//		create : function(id, obj){
//			//判断窗口是否已打开
//			var iswidgetopen = false, widgetid;
//			if(id === 0){
//				widgetid = typeof(obj.num) == 'undefined' || obj.num == '' ? Date.parse(new Date()) : obj.num;
//			}else{
//				widgetid = id;
//			}
//			$('#desktop.widget').each(function(){
//				if($(this).attr('widget') == widgetid){
//					iswidgetopen = true;
//				}
//			});
//			//如果没有打开，则进行创建
//			if(iswidgetopen == false){
//				function nextDo(options){
//					$('#desk').append(widgetWindowTemp({
//						'width' : options.width,
//						'height' : options.height,
//						'num' : options.num,
//						'url' : options.url
//					}));
//					var widget = '#widget_' + options.num + '_warp';
//					//绑定小挂件上各个按钮事件
//					Home.widget.handle($(widget));
//					//绑定小挂件移动
//					Home.widget.move($(widget));
//				}
//				if(id === 0){
//					var options = {
//						num : typeof(obj.num) == 'undefined' || obj.num == '' ? Date.parse(new Date()) : obj.num,
//						url : obj.url,
//						width : obj.width,
//						height : obj.height
//					};
//					nextDo(options);
//				}else{
//					ZENG.msgbox.show('小挂件正在加载中，请耐心等待...', 6, 100000);
//					$.getJSON(ajaxUrl + '?ac=getMyAppById&id=' + id, function(widget){
//						if(widget != null){
//							ZENG.msgbox._hide();
//							var options = {
//								num : widget['id'],
//								url : widget['url'],
//								width : widget['width'],
//								height : widget['height']
//							};
//							nextDo(options);
//						}else{
//							ZENG.msgbox.show('小挂件加载失败', 5, 2000);
//							return false;
//						}
//					});
//				}
//			}
//		},
		create : function(id, type){
			//判断窗口是否已打开
			var iswidgetopen = false, widgetid;
			$('#desktop.widget').each(function(){
				if($(this).attr('realid') == id){
					iswidgetopen = true;
				}
			});
			//如果没有打开，则进行创建
			if(iswidgetopen == false){
				function nextDo(options){
					if(Home.widget.checkCookie(id, type)){
						if($.cookie('widgetState')){
							widgetState = eval("(" + $.cookie('widgetState') + ")");
							$(widgetState).each(function(){
								if(this.id == options.id){
									options.top = this.top;
									options.left = this.left;
									options.type = this.type;
								}
							});
						}
					}else{
						Home.widget.addCookie(options.id, options.type, 0, 0);
					}
					$('#desk').append(widgetWindowTemp({
						'width' : options.width,
						'height' : options.height,
						'type' : options.type,
						'id' : 'w_' + options.type + '_' + options.id,
						'realid' : options.id,
						'top' : options.top == '' ? 0 : options.top,
						'left' : options.left == '' ? 0 : options.left,
						'url' : options.url
					}));
					var widgetId = '#w_' + options.type + '_' + options.id;
					//绑定小挂件上各个按钮事件
					Home.widget.handle($(widgetId));
					//绑定小挂件移动
					Home.widget.move($(widgetId));
				}
				ZENG.msgbox.show('小挂件正在加载中，请耐心等待...', 6, 100000);
				$.getJSON(ajaxUrl + '?ac=getMyAppById&id=' + id + '&type=' + type, function(widget){
					if(widget != null){
						ZENG.msgbox._hide();
						var options = {
							id : widget['id'],
							url : widget['url'],
							width : widget['width'],
							height : widget['height'],
							type : widget['type']
						};
						nextDo(options);
					}else{
						ZENG.msgbox.show('小挂件加载失败', 5, 2000);
						return false;
					}
				});
			}
		},
		//还原上次退出系统时widget的状态
		reduction : function(){
			if($.cookie('widgetState')){
				var widgetState = eval("(" + $.cookie('widgetState') + ")");
				console.log(widgetState);
				for(var i = 0; i < widgetState.length; i++){
					Home.widget.create(widgetState[i].id, widgetState[i].type);
				}
			}
		},
		//根据id验证是否存在cookie中
		checkCookie : function(id, type){
			var flag = false;
			if($.cookie('widgetState')){
				widgetState = eval("(" + $.cookie('widgetState') + ")");
				$(widgetState).each(function(){
					if(this.id == id && this.type == type){
						flag = true;
					}
				});
			}
			return flag;
		},
		/*
		**  以下三个方法：addCookie、updateCookie、removeCookie
		**  用于记录widget打开状态以及摆放位置
		**  实现用户二次登入系统时，还原上次widget的状态
		*/
		addCookie : function(id, type, top, left){
			if(!Home.widget.checkCookie(id, type)){
				var json = [];
				if($.cookie('widgetState')){
					var widgetState = eval("(" + $.cookie('widgetState') + ")"), len = 0;
					for(var i = 0; i < len; i++){
						json.push("{'id':'" + widgetState[i].id + "','type':'" + widgetState[i].type + "','top':'" + widgetState[i].top + "','left':'" + widgetState[i].left + "'}");
					}
				}
				json.push("{'id':'" + id + "','type':'" + type + "','top':'" + top + "','left':'" + left + "'}");
				$.cookie('widgetState', '[' + json.join(',') + ']', {expires : 95});
			}
		},
		updateCookie : function(id, type, top, left){
			if(Home.widget.checkCookie(id, type)){
				var widgetState = eval("(" + $.cookie('widgetState') + ")"), len = widgetState.length, json = [];
				for(var i = 0; i < len; i++){
					if(widgetState[i].id == id){
						json.push("{'id':'" + id + "','type':'" + type + "','top':'" + top + "','left':'" + left + "'}");
					}else{
						json.push("{'id':'" + widgetState[i].id + "','type':'" + widgetState[i].type + "','top':'" + widgetState[i].top + "','left':'" + widgetState[i].left + "'}");
					}
				}
				$.cookie('widgetState', '[' + json.join(',') + ']', {expires : 95});
			}
		},
		removeCookie : function(id, type){
			if(Home.widget.checkCookie(id, type)){
				var widgetState = eval("(" + $.cookie('widgetState') + ")"), len = widgetState.length, json = [];
				for(var i = 0; i < len; i++){
					if(widgetState[i].id != id){
						json.push("{'id':'" + widgetState[i].id + "','type':'" + widgetState[i].type + "','top':'" + widgetState[i].top + "','left':'" + widgetState[i].left + "'}");
					}
				}
				$.cookie('widgetState', '[' + json.join(',') + ']', {expires : 95});
			}
		},
		move : function(obj){
			obj.on('mousedown', '.move', function(e){
				var lay, x, y;
				x = e.clientX - obj.offset().left;
				y = e.clientY - obj.offset().top;
				//绑定鼠标移动事件
				$(document).on('mousemove', function(e){
					lay = Home.maskBox.desk();
					lay.show();
					_l = e.clientX - x;
					_t = e.clientY - y;
					_t = _t < 0 ? 0 : _t;
					obj.css({
						left : _l,
						top : _t
					});
				}).on('mouseup', function(){
					$(this).off('mousemove').off('mouseup');
					if(typeof(lay) !== 'undefined'){
						lay.hide();
					}
					Home.widget.updateCookie(obj.attr('realid'), obj.attr('type'), _t, _l);
				});
			});
		},
		close : function(id, type){
			var widgetId = '#w_' + type + '_' + id;
			$(widgetId).html('').remove();
			Home.widget.removeCookie(id, type);
		},
		handle : function(obj){
			obj.on('click', '.ha-close', function(){
				Home.widget.close(obj.attr('realid'), obj.attr('type'));
			})
		}
	}
})();


/*
**  BLUEKING小挂件
*/
BLUEKING.widget = (function(){
	return {
		init : function(){
			//挂件上各个按钮
			BLUEKING.widget.handle();
			//挂件移动
			BLUEKING.widget.move();
			//还原上次退出系统时widget的状态
			BLUEKING.widget.reduction();
			$('#desk').on('mouseover', '.widget', function(){
				$(this).children('.move').show();
			}).on('mouseout', '.widget', function(){
				$(this).children('.move').hide();
			});
		},
		/*
		**  创建挂件
		**  自定义挂件：BLUEKING.widget.createTemp({url,width,height,top,right});
		**       示例：BLUEKING.widget.createTemp({url:"http://www.baidu.com",width:800,height:400,top:100,right:100});
		*/
		createTemp : function(obj){
			var appid = obj.appid == null ? Date.parse(new Date()) : obj.appid;
			//判断窗口是否已打开
			var iswidgetopen = false;
			$('#desk .widget').each(function(){
				if($(this).attr('appid') == appid){
					iswidgetopen = true;
					return false;
				}
			});
			//如果没有打开，则进行创建
			if(!iswidgetopen){
				function nextDo(options){
					$('#desk').append(widgetWindowTemp({
						'width' : options.width,
						'height' : options.height,
						'type' : 'widgetTemp',
						'id' : 'w_' + options.appid,
						'appid' : options.appid,
						'realappid' : options.appid,
						'top' : options.top,
						'right' : options.right,
						'url' : options.url,
						'zIndex' : BLUEKING.CONFIG.widgetIndexid,
						'issetbar' : 0
					}));
					BLUEKING.CONFIG.widgetIndexid += 1;
				}
				nextDo({
					appid : appid,
					url : obj.url,
					width : obj.width,
					height : obj.height,
					top : obj.top == null ? 0 : obj.top,
					right : obj.right == null ? 0 : obj.right
				});
			}
		},
		create : function(appid, type){
			var type = type == null ? 'widget' : type;
			//判断窗口是否已打开
			var iswidgetopen = false;
			$('#desk .widget').each(function(){
				if($(this).attr('appid') == appid){
					iswidgetopen = true;
					return false;
				}
			});
			//如果没有打开，则进行创建
			if(!iswidgetopen && $('#d_' + appid).attr('opening') != 1){
				$('#d_' + appid).attr('opening', 1);
				function nextDo(options){
					var widgetId = '#w_' + options.appid;
					if(BLUEKING.widget.checkCookie(appid, type)){
						var widgetState = $.parseJSON($.cookie(cookie_prefix + 'widgetState' + BLUEKING.CONFIG.memberID));
						$(widgetState).each(function(){
							if(this.appid == options.appid && this.type == options.type){
								options.top = this.top;
								options.right = this.right;
							}
						});
					}else{
						BLUEKING.widget.addCookie(options.appid, options.type, 0, 0);
					}
					TEMP.widgetTemp = {
						'title' : options.title,
						'width' : options.width,
						'height' : options.height,
						'type' : options.type,
						'id' : 'w_' + options.appid,
						'appid' : options.appid,
						'realappid' : options.realappid == 0 ? options.appid : options.realappid,
						'top' : typeof(options.top) == 'undefined' ? 0 : options.top,
						'right' : typeof(options.right) == 'undefined' ? 0 : options.right,
						'url' : options.url,
						'zIndex' : BLUEKING.CONFIG.widgetIndexid,
						'issetbar' : 1
					};
					$('#desk').append(widgetWindowTemp(TEMP.widgetTemp));
					$(widgetId).data('info', TEMP.widgetTemp);
					BLUEKING.CONFIG.widgetIndexid += 1;
				}
				ZENG.msgbox.show(gettext('小挂件正在加载中，请耐心等待...'), 6, 100000);
				$.ajax({
					type : 'POST',
					url : ajaxUrl,
					data : 'ac=getMyAppById&id=' + appid + '&type=' + type,
					dataType : 'json'
				}).done(function(widget){
					ZENG.msgbox._hide();
					if(widget != null){
						if(widget['error'] == 'ERROR_NOT_FOUND'){
							ZENG.msgbox.show('小挂件不存在，建议删除', 5, 2000);
							BLUEKING.widget.removeCookie(appid, type);
						}else if(widget['error'] == 'ERROR_NOT_INSTALLED'){
							BLUEKING.window.createTemp({
								appid : 'hoorayos-yysc',
								title : '应用市场',
								url : 'sysapp/appmarket/index.php?id=' + $('#d_' + appid).attr('realappid'),
								width : 800,
								height : 484,
								isflash : false,
								refresh : true
							});
							BLUEKING.widget.removeCookie(appid, type);
						}else{
							nextDo({
								appid : widget['appid'],
								realappid : widget['realappid'],
								title : widget['name'],
								url : widget['url'],
								type : widget['type'],
								width : widget['width'],
								height : widget['height'],
								top : 0,
								right : 0
							});
						}
					}else{
						ZENG.msgbox.show('小挂件加载失败', 5, 2000);
					}
					$('#d_' + appid).attr('opening', 0);
				});
			}
		},
		//还原上次退出系统时widget的状态
		reduction : function(){
			var widgetState = $.parseJSON($.cookie(cookie_prefix + 'widgetState' + BLUEKING.CONFIG.memberID));
			$(widgetState).each(function(){
				BLUEKING.widget.create(this.appid, this.type);
			});
		},
		//根据id验证是否存在cookie中
		checkCookie : function(appid, type){
			var flag = false, widgetState = $.parseJSON($.cookie(cookie_prefix + 'widgetState' + BLUEKING.CONFIG.memberID));
			$(widgetState).each(function(){
				if(this.appid == appid && this.type == type){
					flag = true;
				}
			});
			return flag;
		},
		/*
		**  以下2个方法：addCookie、removeCookie
		**  用于记录widget打开状态以及摆放位置
		**  实现用户再次登入系统时，还原上次widget的状态
		*/
		addCookie : function(appid, type, top, right){
			if(type == 'widget' || type == 'pwidget'){
				var widgetState = $.parseJSON($.cookie(cookie_prefix + 'widgetState' + BLUEKING.CONFIG.memberID));
				//检查是否存在，如果存在则更新，反之则添加
				if(BLUEKING.widget.checkCookie(appid, type)){
					$(widgetState).each(function(){
						if(this.appid == appid && this.type == type){
							this.top = top;
							this.right = right;
						}
					});
				}else{
					if(widgetState == null){
						widgetState = [];
					}
					widgetState.push({
						appid : appid,
						type : type,
						top : top,
						right : right
					});
				}
				$.cookie(cookie_prefix + 'widgetState' + BLUEKING.CONFIG.memberID, $.toJSON(widgetState), {expires : 95});
			}
		},
		removeCookie : function(appid, type){
			if(type == 'widget' || type == 'pwidget'){
				if(BLUEKING.widget.checkCookie(appid, type)){
					var widgetState = $.parseJSON($.cookie(cookie_prefix + 'widgetState' + BLUEKING.CONFIG.memberID));
					$(widgetState).each(function(i){
						if(this.appid == appid && this.type == type){
							widgetState.splice(i, 1);
							return false;
						}
					});
					$.cookie(cookie_prefix + 'widgetState' + BLUEKING.CONFIG.memberID, $.toJSON(widgetState), {expires : 95});
				}
			}
		},
		move : function(){
			$('#desk').on('mousedown', '.widget .move', function(e){
				var obj = $(this).parents('.widget');
				BLUEKING.widget.show2top(obj.attr('appid'));
				var x = e.clientX - obj.offset().left;
				var y = e.clientY - obj.offset().top;
				var lay;
				var t;
				var r;
				//绑定鼠标移动事件
				$(document).on('mousemove', function(e){
					lay = BLUEKING.maskBox.desk();
					lay.show();
					t = e.clientY - y < 0 ? 0 : e.clientY - y;
					r = $(window).width() - obj.width() - (e.clientX - x);
					obj.css({
						top : t,
						right : r
					});
				}).on('mouseup', function(){
					$(this).off('mousemove').off('mouseup');
					if(typeof(lay) !== 'undefined'){
						lay.hide();
					}
					if(obj.attr('type') != 'widgetTemp'){
						BLUEKING.widget.addCookie(obj.attr('appid'), obj.attr('type'), t, r);
					}
				});
			});
		},
		close : function(appid){
			var widgetId = '#w_' + appid;
			BLUEKING.widget.removeCookie($(widgetId).attr('appid'), $(widgetId).attr('type'));
			$(widgetId).html('').remove();
		},
		show2top : function(appid){
			var widgetId = '#w_' + appid;
			$(widgetId).css('z-index', BLUEKING.CONFIG.widgetIndexid);
			BLUEKING.CONFIG.widgetIndexid += 1;
		},
		handle : function(){
			$('#desk').on('mousedown', '.widget a', function(e){
				e.preventDefault();
				e.stopPropagation();
			});
			$('#desk').on('click', '.widget .ha-close', function(e){
				var obj = $(this).parents('.widget');
				BLUEKING.widget.close(obj.attr('appid'));
			}).on('click', '.widget .ha-star', function(){
				var obj = $(this).parents('.widget');
				$.ajax({
					type : 'POST',
					url : ajaxUrl,
					data : 'ac=getAppStar&id=' + obj.data('info').realappid
				}).done(function(point){
					$.dialog({
						title : '给“' + obj.data('info').title + '”打分',
						width : 250,
						id : 'star',
						content : starDialogTemp({
							'realappid' : obj.data('info').realappid,
							'point' : Math.floor(point),
							'realpoint' : point * 20
						})
					});
				});
			}).on('click', '.widget .ha-share', function(){
				var obj = $(this).parents('.widget');
				$.dialog({
					title : '分享应用',
					width : 370,
					id : 'share',
					content : shareDialogTemp({
						'sinaweiboAppkey' : BLUEKING.CONFIG.sinaweiboAppkey == '' ? '1197457869' : BLUEKING.CONFIG.sinaweiboAppkey,
						'tweiboAppkey' : BLUEKING.CONFIG.tweiboAppkey == '' ? '801356816' : BLUEKING.CONFIG.tweiboAppkey,
						'title' : '我正在使用 %23HoorayOS%23 中的 %23' + obj.data('info').title + '%23 应用，很不错哦，推荐你也来试试！',
						'url' : BLUEKING.CONFIG.website + '?run=' + obj.data('info').realappid + '%26type=widget'
					})
				});
			});
		}
	}
})();