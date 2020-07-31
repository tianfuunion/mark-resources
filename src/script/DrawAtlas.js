//获取canvas画布
	var canvas=document.getElementById('atlas');
//	canvas.height = total_height;
//	canvas.width = total_width;
	var cxt=canvas.getContext('2d');

//	alert(canvas.width +'_'+ canvas.height);

//	棋盘纵横线倍数
	var multiple = 40;
	var company_x = 40;
	var company_y = 40;
	var chessboard_start_x = 40;
	var chessboard_start_y = 40;
	var chessboard_end_x = 760;
	var chessboard_end_y = 760;


//	尺寸
	var level = 25;			//	等级，可以用作圆形的级别大小，
	var round_radius = 25;	//	圆形的半径，此参数随后根据绽放的级别动态变化，zoom
	var zoom_level = 1;		//	缩放级别暂定为1

//	棋子半径
//	var piece_radius = 9;
	var piece_radius = multiple*0.45;

//	总棋子
	var piece_all = [];

	var lib = [];
	lib.num = 8;
	lib.level = 25;


//画棋盘
var drawBoard = function(){
    cxt.clearRect(0, 0, canvas.width, canvas.height);		//每次重画棋盘之前清除canvas

    cxt.beginPath();


//	绘制圆形
	for(var i = 0 ; i < lib.num ; i ++ ){
		var star_x = canvas.width/2;
		var star_y = canvas.height/2;
		cxt.fillStyle="black";
		cxt.beginPath();

//	----------
//	圆点坐标：(x0,y0)
//	半径：r
//	角度：a0
	var angle = 360/lib.num;

//	则圆上任一点为：（x,y）
x   =   star_x + round_radius * Math.cos((angle*i) * Math.PI /180)*10;
y   =   star_y + round_radius * Math.sin((angle*i) * Math.PI /180)*10;

//	-----------
//		cxt.arc(star_x+(40*i), star_y+(20*i), round_radius, 0, Math.PI*2, false);				//	绘制中心圆
//		cxt.arc(star_x,star_y, round_radius, 0, Math.PI*2, false);				//	绘制中心圆
		cxt.arc(x,y, round_radius, 0, Math.PI*2, false);				//	绘制中心圆

		cxt.lineWidth = 1;
		cxt.moveTo(star_x,star_y);
		cxt.lineTo(x,y);

		cxt.stroke();
		cxt.fill();

	}


/*
//	绘制横线
    for(var i = 0 ; i < 19 ; i++){
        var start_company_x = chessboard_start_x;
        var start_company_y = chessboard_start_y + company_y*i;
        var end_company_x = chessboard_end_x;
        var end_company_y = chessboard_start_y + company_y*i;
        cxt.lineWidth = 1;
		cxt.moveTo(start_company_x,start_company_y);
		cxt.lineTo(end_company_x,end_company_y);
		cxt.fillText(String.fromCharCode((65+i)),start_company_x-10, start_company_y+3);
    }

    //描绘竖线
    for(var j = 0 ; j < 19 ; j++){
        var start_company_x = chessboard_start_x + company_x*j;
        var start_company_y = chessboard_start_y;
        var end_company_x = chessboard_start_x + company_x*j;
        var end_company_y = chessboard_end_y;
		cxt.moveTo(start_company_x,start_company_y);
		cxt.lineTo(end_company_x,end_company_y);
		cxt.textAlign = "center";
		cxt.fillText(j+1,start_company_x, start_company_y-5);

    }
*/
//    cxt.stroke();
/*
    //画九星
    for(var i = 0 ; i < 3 ; i ++ ){
        var star_y = chessboard_start_y + company_y*(i*6+3);
        for(var j = 0 ; j < 3 ; j++){
            var star_x = chessboard_start_x + company_y*(j*6+3);
            cxt.fillStyle="black";
            cxt.beginPath();
            cxt.arc(star_x, star_y, 6, 0, Math.PI*2, false);
            cxt.stroke();
            cxt.fill();
        }
    }
*/

}






//	鼠标坐标
/*
function mousePosition(ev){
	if(ev.pageX || ev.pageY){
	//firefox、chrome等浏览器
		return {x:ev.pageX,y:ev.pageY};
	}
	return {
		// IE浏览器
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop - document.body.clientTop
	};
}

document.onmousemove = function(ev){
	ev = ev || window.event;
	var mousePos = mousePosition(ev);
	document.getElementById('x').innerHTML = mousePos.x;
	document.getElementById('y').innerHTML = mousePos.y;


	document.getElementById('t').innerHTML = canvas.getBoundingClientRect().top+20;
	document.getElementById('z').innerHTML = canvas.getBoundingClientRect().left+20;


//	画黑子
	var start_x = 10*company_x + chessboard_start_x;//点击的x坐标起始位置
	var start_y = 10*company_y + chessboard_start_y;//点击的y坐标起始位置

	cxt.fillStyle= "white";
	cxt.beginPath();

	var mousex = mousePos.x-95;

	if(mousex%20 <10 ){
		mousex = mousex - mousex%20;
	}else{
		mousex = mousex + mousex%20;

	}
	var mousey = mousePos.y-240;
	if(mousey%20 <10 ){
		mousey = mousey - mousey%20;
	}else{
		mousey = mousey + mousey%20;

	}
     var M=Math.random();

//	cxt.arc(start_x, start_y, piece_radius, 0, Math.PI*2, false);
//	cxt.arc(mousex, mousey, piece_radius, 0, Math.PI*2, false);
	cxt.closePath();
    cxt.strokeStyle="rgba(143,9,9,"+M+")";
    cxt.line;
	cxt.stroke();
	cxt.fill();

};
*/

//	勾股定理
	function gougu(a,b){
	    return(Math.sqrt( Math.pow(a,2) + Math.pow(b,2)));
	}

//	根据用户ID获取图谱信息-=》获取图谱ID、各节点信息

//	绘制图谱
	function DrawMap(){	}



//根据鼠标画线-=》失败品

/*
window.onload = function(){
	var canvas=document.getElementById('#atlas');
	var cxt=canvas.getContext('2d');

	cxt.onmousedown = function(ev){
		var ev = ev || window.event;

		cxt.moveTo(ev.clientX - canvas.offsetLeft , ev.clientY - canvas.offsetTop);

		document.onmousemove = function(ev){
			var ev = ev || window.event;
			cxt.lineTo(ev.clientX - canvas.offsetLeft , ev.clientY - canvas.offsetTop);
			cxt.stroke();
		};
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;

		};

	};
};


var myDate = new Date();//获取系统当前时间
获取特定格式的时间：

复制代码
 1 myDate.getYear(); //获取当前年份(2位)
 2 myDate.getFullYear(); //获取完整的年份(4位,1970-????)
 3 myDate.getMonth(); //获取当前月份(0-11,0代表1月)
 4 myDate.getDate(); //获取当前日(1-31)
 5 myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
 6 myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
 7 myDate.getHours(); //获取当前小时数(0-23)
 8 myDate.getMinutes(); //获取当前分钟数(0-59)
 9 myDate.getSeconds(); //获取当前秒数(0-59)
10 myDate.getMilliseconds(); //获取当前毫秒数(0-999)
11 myDate.toLocaleDateString(); //获取当前日期
12 var mytime=myDate.toLocaleTimeString(); //获取当前时间
13 myDate.toLocaleString( ); //获取日期与时间


*/