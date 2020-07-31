var AJAXURL="https://vs5.jetta.faw-vw.com";

// 公共参数信息
var config={
	token:{
		at:localStorage.getItem("tokenAt")?localStorage.getItem("tokenAt"):"", //用户登录的token，判断用户是否登录,
		rt:localStorage.getItem("tokenRt")?localStorage.getItem("tokenRt"):"",
	},
	// appkey:"9616414493",  //测试环境
	// secretkey:"bae35be9e98d8d193ab5f63fb321b54e", //测试环境

	appkey:"8367671858", //生产环境
	secretkey:"d1af888ce0414a42c666896c6d554f65", //生产环境
	vs5Car:{
		code:"0L", //车系code
		name:"VS5" ,//车系名称
	},
}

// 生成uuid
var createUUID = (function (uuidRegEx, uuidReplacer) {
	return function () {
		return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
	};
})(/[xy]/g, function (c) {
	var r = Math.random() * 16 | 0,
		v = c == "x" ? r : (r & 3 | 8);
	return v.toString(16);
});

var loading;

// 设备唯一标识
var deviceIdCon;
if(localStorage.getItem("deviceIdCon")){
	deviceIdCon=localStorage.getItem("deviceIdCon");
}else{
	deviceIdCon=createUUID();
	localStorage.setItem("deviceIdCon",deviceIdCon);
}

var methods = {
	// ajax
    ajax: function (ajaxConfig) {
		var isDel=false;
		// 生成签名
		var route=ajaxConfig.url.substring(1);
		var signt=new Date().getTime();
		// 获取手机验证码接口添加time_stamp参数
		if(ajaxConfig.url.indexOf("/getVerificationCodeWithLimit")>-1){
			signt=signt+"&time_stamp="+signt;
		}
		// 判断是否是经销商接口
		if(ajaxConfig.url.indexOf("/dealerservice/inpublic/")>-1){
			isDel=true;
		}
		route=route+(route.indexOf("?")>-1?"&":"?")+"appkey="+config.appkey+"&"+(isDel?"signTimestamp":"signt")+"="+signt+"&nonce="+createUUID();
		var param=route.substring(0,route.indexOf("?"))+"_"+route.substring(route.indexOf("?")+1).split("&").sort().join("_")+"_"+config.secretkey;
		var sign=hex_md5(encodeURIComponent(param));
		route=route+"&"+(isDel?"digitalSign":"sign")+"="+sign;
        ajax({
            "type": ajaxConfig.type?ajaxConfig.type:"post",
            "url": AJAXURL +"/"+route,
            "data": ajaxConfig.data?ajaxConfig.data:{},
			"async":true,
			"contentType":ajaxConfig.contentType?ajaxConfig.contentType:"application/json",
            "success": function (res) {
				try{
					methods.loadingHide();
				}catch(e){
					//TODO handle the exception
				}
				var resInfo=JSON.parse(res);
				if(ajaxConfig.autonomy){
					ajaxConfig.autonomy(resInfo);
				}else{
					if(resInfo.status=="SUCCEED"){
						//返回状态处理
						if(ajaxConfig.success){
							ajaxConfig.success(resInfo);
						}
					}else{
						app.$message.error("发生了错误，请稍后重试");
					}
				}
            }
        });
    },
	 //获取浏览器url参数
	getQueryString: function (name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	},
	//验证手机号
	phoneVerify: function (phone) {
	    if (/^1\d{10}$/.test(phone)) {
	        return true;
	    } else {
	        return false;
	    }
	},
	//身份证号验证
	idCardVerify: function (idCard) {
	    if (/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(idCard)) {
	        return true;
	    } else {
	        return false;
	    }
	},
	toLogin:function(){
		location.replace("../login/index.html?callbackUrl="+encodeURIComponent(location.href));
	},
	// 显示loading动画
	loadingShow:function(){
		loading = app.$loading({
		  lock: true,
		});
	},
	loadingHide:function(){
		loading.close();
	},
	// 密码规格验证
	pwdVerify: function (pwd) {
	    if (/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z0-9]{6,20}$/.test(pwd)) {
	        return true;
	    } else {
	        return false;
	    }
	},
}

// 解决微信输入
window.onload=function(){
	var inputObj=document.querySelectorAll("input,select");
	for(var i=0; i<inputObj.length; i++){
		inputObj[i].onblur=function(){
			var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			window.scroll(0,scrollTop-0);
		}
	}
}