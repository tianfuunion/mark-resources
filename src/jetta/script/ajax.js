//封装ajax
// 兼容xhr对象
function createXHR() {
	if(typeof XMLHttpRequest != "undefined") { // 非IE6浏览器
		return new XMLHttpRequest();
	} else if(typeof ActiveXObject != "undefined") { // IE6浏览器
		var version = [
			"MSXML2.XMLHttp.6.0",
			"MSXML2.XMLHttp.3.0",
			"MSXML2.XMLHttp",
		];
		for(var i = 0; i < version.length; i++) {
			try {
				return new ActiveXObject(version[i]);
			} catch(e) {
				//跳过
			}
		}
	} else {
		throw new Error("您的系统或浏览器不支持XHR对象！");
	}
}
// 封装ajax
function ajax(obj) {
	var xhr = createXHR();
	var data;
	obj.url = obj.url;
	if(obj.contentType=="application/x-www-form-urlencoded"){
		data="";
		for(item in obj.data){
			data+=item+"="+obj.data[item]+"&";
		}
		data=data.substring(0,data.length-1);
	}else{
		data = JSON.stringify(obj.data);
	}
	// 异步
	if(obj.async === true) {
		// 异步的时候需要触发onreadystatechange事件
		xhr.onreadystatechange = function() {
			// 执行完成
			if(xhr.readyState == 4) {
				callBack();
			}
		}
	}
	xhr.open(obj.type, obj.url, obj.async); // false是同步 true是异步 // "demo.php?rand="+Math.random()+"&name=ga&ga",
	if(obj.type === "post") {
		xhr.setRequestHeader("Content-Type", obj.contentType);
		if(obj.url.indexOf("/dealerservice/inpublic/")>-1){
			// 测试环境
			// xhr.setRequestHeader("x-microservice-name","api-gateway");
			// xhr.setRequestHeader("x-namespace-code","cdp-uat");
			
			// 生产环境
			xhr.setRequestHeader("x-microservice-name","api-gateway");
			xhr.setRequestHeader("x-namespace-code","production");
		}else{
			xhr.setRequestHeader("Did","EBO_WEB_iphonexs_"+deviceIdCon+"_v0.0.1_12");
		}
		xhr.send(data);
	} else {
		xhr.send(null);
	}
	// xhr.abort(); // 取消异步请求
	// 同步
	if(obj.async === false) {
		callBack();
	}
	// 返回数据
	function callBack() {
		// 判断是否返回正确
		if(xhr.status == 200) {
			obj.success(xhr.responseText);
		} else {
			// obj.Error("获取数据失败，错误代号为：" + xhr.status + "错误信息为：" + xhr.statusText);
		}
	}
}
//封装ajax_End