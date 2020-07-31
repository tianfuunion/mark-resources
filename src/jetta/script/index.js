var app=new Vue({
	el:"#app",
	data:{
		openShow:false,
		switchIndex:1,
		carList:[],
		vehModelMsg:[],
		carId:"",
		isWx:false
	},
	methods:{
		getVehModelMsg:function(carCode){
			var _this=this;
			methods.ajax({
				"type":"post",
				"url":"/vehicle-market/inpublic/vehicle/getVehModelMsg",
				"data":{
					searchList:[
						{
							"vehicleSeriesCode":config.vs5Car.code,
							"vehicleModelCode":carCode,
						}
					]
				},
				"success":function(res){
					_this.vehModelMsg=res.data[0].vehicleAttrs;
				}
			})
		}
	},
	created:function(){
		var _this=this;
		// 获取车型列表
		methods.ajax({
			"type":"get",
			"url":"/vehicle-market/inpublic/vehicle/getVehModelList?vehicleSeriesCode="+config.vs5Car.code,
			"success":function(res){
				_this.carList=res.data;
				_this.carId=res.data[0].vehicleModelCode;
			}
		})
		// 判断微信环境
		var userAgentInfo = navigator.userAgent.toLowerCase();
		if (userAgentInfo.match(/MicroMessenger/i) == 'micromessenger') {
			this.isWx=true;
		}
	},
	watch:{
		carId:function(value){
			this.getVehModelMsg(value);
		}
	}
})