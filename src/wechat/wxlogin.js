$(document).ready(function() {
// wxlogin();
// loadjweixin();

/*  console.log('Hello, 如果你也喜欢，给我发邮件吧，我可能会注意到你！job@zongdongyang.cn');
	console.info('信息');
	console.error('错误');
	console.warn('警告');
*/
});

$('a[name="wxlogin"]').on('click',function(){
	wxlogin();
});

/* 1、编码 var str  = encodeURIComponent('中文');
   2、解码 var str  = decodeURIComponent(UrlEncode);
*/

// 步骤二：引入JS文件 * 已在footer中引入
function loadjweixin(){
	new_element=document.createElement("script");
	new_element.setAttribute("type","text/javascript");
	new_element.setAttribute("src","http://res.wx.qq.com/open/js/jweixin-1.4.0.js");// 在这里引入了a.js
	// new_element.setAttribute("src","http://res2.wx.qq.com/open/js/jweixin-1.4.0.js");// 在这里引入了a.js
	document.body.appendChild(new_element);
}
/**
// 步骤三：通过config接口注入权限验证配置 * 注意：
* 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
* 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
* 3. 常见问题及完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
*
* 开发中遇到问题详见文档“附录5-常见错误及解决办法”解决，如仍未能解决可通过以下渠道反馈：
* 邮箱地址：weixin-open@qq.com
* 邮件主题：【微信JS-SDK反馈】具体问题
* 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
*/
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	appId: '<{$sign.appId}>', // 必填，公众号的唯一标识
	timestamp: '<{$sign.timestamp}>',	// 必填，生成签名的时间戳
	nonceStr: '<{$sign.nonceStr}>',		// 必填，生成签名的随机串
	signature: '<{$sign.signature}>',	// 必填，签名
	jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'] // 必填，需要使用的JS接口列表
});

// 步骤四：通过ready接口处理成功验证
wx.ready(function(){
// 在这里调用 API
	console.info("config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后"+
				 "config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。"+
				 "对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。");

	alert("<{$sign.appid}>");

// 8.3 批量隐藏菜单项

  wx.hideMenuItems({
	menuList: [
	  'menuItem:readMode', // 阅读模式
	  'menuItem:share:timeline', // 分享到朋友圈
	  'menuItem:copyUrl' // 复制链接
	],
	success: function (res) {
	  alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
	},
	fail: function (res) {
	  // alert(JSON.stringify(res));
	}
  });

});

wx.error(function(res){
	console.error("config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。");
});

// wx.closeWindow();
// wx.hideAllNonBaseMenuItem();
// "基本类"按钮详见附录3

function wxlogin(){
	// https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60

	var uri = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID
			+ "&redirect_uri=" +  + REDIRECT_URI
			+ "&response_type=" + code
			+ "&scope=" + SCOPE
			+ "&state=123#wechat_redirect";

	parent.document.location.href = uri;

}

function login(){

	$.ajax({
			type	: "POST",
			cache	: false,
			dataType: "json",
			url		: "<{$pro}>/club/login/",
			data	: {
//				uid		: data_uid,
				wxid	: data_wxid,
				regtime : timestamp,
			},
			success: function(jsonstr){
				console.log(jsonstr);
				// var data = $.parseJSON(jsonstr);
				// var data = jsonstr;
				data_uid = jsonstr['data']['uid'];
				var data_gid = jsonstr['data']['gid'];

				switch(jsonstr['status']){
					case 200:
						if(is_empty(data_uid)){
							notice('注册失败,请稍后重新注册！');
							console.log('Status:200 => 注册失败,请稍后重新注册！' + " WXID:" + data_wxid + " UID:" + data_uid + " Reason:" + jsonstr["reason"]);
						}else if(!is_empty(data_gid) && parseInt(data_gid) >= 1000 && parseInt(data_gid) <= 10000){
							//TODO: 用户已经是会员，则跳转至用户凭证界面（会员组ID有待完善）
							console.log("Status:200 => 该用户已是会员 WXID:" + data_wxid + " UID:" + data_uid + " GID:" + data_gid);
							parent.document.location.href = "<{$pro}>/club/voucher/uid/" + data_uid + "/wxid/" + data_wxid + "/gid/" + data_gid;
						}else{
							console.log("Status:200 => 该用户已绑定过微信 WXID:" + data_wxid + " UID:" + data_uid + " Reason:" + jsonstr["reason"]);
							parent.document.location.href = "<{$pro}>/club/icard/uid/" + data_uid + "/wxid/" + data_wxid;
						}
					break;
					case 501:
						if(is_empty(data_uid)){
							notice('注册失败,请稍后重新注册！');
							console.log('Status:501 => 该微信ID未绑定过用户，现全新注册失败，请稍后重新注册！'+ jsonstr["reason"]);
						}else{
							console.log('Status:501 => 该微信ID未绑定过用户，现全新注册已经成功！现在跳转至协议页面'+ jsonstr["reason"]);
							parent.document.location.href = "<{$pro}>/club/agreement/uid/" + data_uid + "/wxid/" + data_wxid;
						}
						break;
					case "unregistered":
						notice("对不起，该用户未注册!");
						break;
					case "frozen":
						notice("对不起，该用户已被冻结!");
						break;
					case "fail":
						notice("对不起，用户名或密码错误!");
						break;
					case 404:
					// var data = $.parseJSON(jsonstr);
						notice('未查询到用户信息!');
						console.log('Status:404 => 未查询到用户信息 '+ jsonstr["reason"]);
						break;
					default:
						console.log('Default Null 注册失败,请稍后重新注册！'+ jsonstr["reason"]);
						notice('Default Null 注册失败,请稍后重新注册！'+ jsonstr["reason"]);
						break
				}
			},
			/*
			error: function(){
				console.log("Ajax.Error");
			},
*/
// 要求为Function类型的参数，请求失败时被调用的函数。该函数有3个参数，即XMLHttpRequest对象、错误信息、捕获的错误对象(可选)。ajax事件函数如下：
			error: function(XMLHttpRequest, textStatus, errorThrown){
			// 通常情况下textStatus和errorThrown只有其中一个包含信息
			// this;   //调用本次ajax请求时传递的options参数
				console.log("Ajax.Error：" + textStatus + " " + errorThrown);
				notice("Ajax.Error：" + textStatus + " " + errorThrown);
			},
		});
}

function redirect(data){
	if(is_empty(data)){
		parent.document.location.href = "<{$global.website.host}>/account.php/member";
//		parent.document.location.href = "/alice.php/club/insuranceInfo";
//		parent.document.location.href = "<{$pro}>";
	}else{
		parent.document.location.href = data;
//		parent.document.location.href = "<{$pro}>/" + data;
	}

}