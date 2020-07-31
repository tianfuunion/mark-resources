var app = new Vue({
	el: "#app",
	data: {
		popShow: false,
		checkOn: false,
		form: {
			userName:"",
			mobile:"",
			verificationCode:"",
			vehicleSeriesCode:config.vs5Car.code,
			vehicleSeriesName:config.vs5Car.name,
			dealerCode:"",
			channelType:"自营平台",
			subChannelType:"自营平台-其他"
		},
		isShow: false, //用户协议
		province:"",
		city:"",
		codeTips:"获取验证码",
		timeNum:60,
		dealerList:[],
		delProvince:"",
		delProvinceList:[],
		delCity:"",
		delCityList:[]
	},
	methods: {
		// 提交
		submit: function() {
			var _this=this;
			// 表单验证
			if(!this.form.dealerCode){
				this.$message.error('请选择经销商');
				return false;
			}
			if(!this.form.userName){
				this.$message.error('请输入您的姓名');
				return false;
			}
			if(!methods.phoneVerify(this.form.mobile)){
				this.$message.error('请检查您的手机号是否正确');
				return false;
			}
			if(!this.form.verificationCode){
				this.$message.error('请输入验证码');
				return false;
			}
			if(!this.checkOn){
				this.$message.error('请先阅读并同意《试驾隐私条款》');
				return false;
			}
			// 请求接口
			methods.loadingShow();
			methods.ajax({
				"type":"post",
				"url":"/vehicle-market/inpublic/order/createOrder?token=Bearer "+config.token.at,
				"data":this.form,
				"autonomy":function(res){
					if(res.status){
						_this.$message({
							message: '试驾预约成功',
							type: 'success'
						});
						setTimeout(function(){
							history.go(-1);
						},2000)
					}
				}
			})
		},
		// 获取验证码
		getCode:function(){
			if(this.timeNum!=60){
				return false;
			}
			var _this=this;
			if(!methods.phoneVerify(this.form.mobile)){
				this.$message.error('请检查您的手机号是否正确');
				return false;
			}

			// 接口成功后执行
			this.timeNum--;
			// 请求接口
			methods.loadingShow();
			methods.ajax({
				"type":"post",
				"url":"/user/user/getVerificationCodeWithLimit?deviceId="+deviceIdCon+"&deviceType=iphonexs",
				"contentType":"application/x-www-form-urlencoded",
				"data":{
					mobile:this.form.mobile,
					group:"EBO"
				},
				"autonomy":function(res){
					if(res.status=="SUCCEED"){
						_this.codeTips="60秒后重试";
						var timeOut=setInterval(function(){
							_this.timeNum--;
							_this.codeTips=_this.timeNum+"秒后重试";
							if(_this.timeNum==0){
								_this.timeNum=60;
								_this.codeTips="获取验证码";
								clearInterval(timeOut)
							}
						},1000)
					}else{
						_this.timeNum=60;
						_this.$message.error("获取验证码失败，请稍后重试");
					}
				}
			})
		},
		//百度地图获取定位
		getBMap() {
			var _this=this;
		    if (sessionStorage.getItem("cityInfo")) {
				_this.province=JSON.parse(sessionStorage.getItem("cityInfo")).province;
				_this.city=JSON.parse(sessionStorage.getItem("cityInfo")).city;
		    } else {
		        //获取经纬度
		        var geolocation = new BMap.Geolocation();
		        geolocation.getCurrentPosition(function (r) {
		            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
						var localInfo = {
						    "province": r.address.province,
						    "city": r.address.city,
						    "lng": r.point.lng,
						    "lat": r.point.lat
						};
						sessionStorage.setItem("cityInfo", JSON.stringify(localInfo));
						_this.province=localInfo.province;
						_this.city=localInfo.city;
		            }
		        }, {
		            enableHighAccuracy: true
		        })
		    }
		},
		// 获取省份
		getProvince:function(id){
			var _this=this;
			methods.ajax({
				"type":"post",
				"url":"/dealerservice/inpublic/v1/selectProvinceCity",
				"data":{
					"tenantId":"3"
				},
				"autonomy":function(res){
					if(res.returnStatus=="SUCCESS"){
						_this.delProvinceList=res.list;
						_this.delProvince=res.list[0].provinceCode;
					}else{
						_this.$message.error("省份信息获取失败");
					}
				}
			})
		},
		// 获取城市
		getCity:function(id){
			var _this=this;
			methods.ajax({
				"type":"post",
				"url":"/dealerservice/inpublic/v1/selectProvinceCity",
				"data":{
					"tenantId":"3",
					"provinceCode":id
				},
				"autonomy":function(res){
					if(res.returnStatus=="SUCCESS"){
						_this.delCityList=res.list;
						_this.delCity=res.list[0].cityCode;
					}else{
						_this.$message.error("城市信息获取失败");
					}
				}
			})
		},
		// 获取经销商
		getDel:function(id){
			var _this=this;
			methods.ajax({
				"type":"post",
				"url":"/dealerservice/inpublic/v1/querydealerinfo",
				"data":{
					"tenantId":"3",
					"cityCode":id
				},
				"autonomy":function(res){
					if(res.returnStatus=="SUCCESS"){
						_this.dealerList=res.list;
						_this.form.dealerCode=res.list[0].salesCode;
					}else{
						_this.$message.error("经销商信息获取失败");
					}
				}
			})
		},
	},
	created: function() {
		// 获取经纬度
//		this.getBMap();
		// 判断用户是否登录
		// if (!config.token.at) {
		// 	this.$confirm('您需要先进行登录，是否前往登录？', '提示', {
		// 		confirmButtonText: '确定',
		// 		cancelButtonText: '取消',
		// 		type: 'warning',
		// 		center: true
		// 	}).then(() => {
		// 		// 跳转至登录
		// 		methods.toLogin();
		// 	}).catch(() => {
		// 		history.go(-1);
		// 	});
		// }else{
		// 	methods.ajax({
		// 		"type":"post",
		// 		"url":"/user/api/v1/refresh",
		// 		"data":{
		// 			"grant_type":"rt",
		// 			"assertion":config.token.rt,
		// 			"client_id":deviceIdCon,
		// 			"scope":"openid profile ebo",
		// 		},
		// 		"autonomy":function(res){
		// 			if(res.code!="200"){
		// 				app.$confirm('您需要先进行登录，是否前往登录？', '提示', {
		// 					confirmButtonText: '确定',
		// 					cancelButtonText: '取消',
		// 					type: 'warning',
		// 					center: true
		// 				}).then(() => {
		// 					// 跳转至登录
		// 					methods.toLogin();
		// 				}).catch(() => {
		// 					history.go(-1);
		// 				});
		// 			}else{
		// 				localStorage.setItem("tokenAt",res.data.access_token);
		// 				localStorage.setItem("tokenRt",res.data.refresh_token);
		// 				config.token.at=res.data.access_token;
		// 				config.token.rt=res.data.refresh_token;
		// 			}
		// 		}
		// 	})
		// }
		// 获取省份
		this.getProvince();
	},
	watch:{
		delProvince:function(value){
			this.getCity(value)
		},
		delCity:function(value){
			this.getDel(value)
		}
	}
})