//	点击 Im-tab 加下划线
$('.im .tab li').click(function(){
	$(".im .tab li").removeClass("im .tab .this");
	$(this).addClass("im .tab .this");

//	$(this).siblings('');
	$(this).attr('type')

	$('.im .list').removeClass("show").addClass('none');
	$('.im .list.'+ $(this).attr('type')).removeClass("none").addClass('show');

});

$('.im .tab li[type="history"]').click(function(){
	alert('JQ');
});

//	切换分组名称前箭头以及打开分组列表,切换箭头及分组列表打开还有待优化。
$('.im .list .title').click(function(){
	$(this).children("i").toggleClass("arrow");
	$(this).parent().children("li").toggle();
});
/*
//	点击好友分组
$('.im .list .title').click(function(){
	if($('.im .list .title i').attr("class")=="arrow") {
		$(".im .list .title i").removeClass("arrow");
//		$(".im .list .title").parent().removeClass('show')
		$(".im .list .title").parent().removeClass('show')
	}else{
		$(".im .list .title i").addClass("arrow");
		$(".im .list .title").parent().addClass('show')
	}
});
*/

//	打开 Chat
$('.im .list ul lis').dblclick(function(){
//	layim-event="chat" data-type="friend" data-index="0" id="layim-friend100001"
	Home.create.chat($(this).attr('fid'));
});

  $('.tabs li').click(function(){
    $(this).addClass('tab li').siblings().removeClass('tab li')
  })
  $('.hui-txt').hover(function(){
    var aa = $(this).html()
    $('.hui-txt').attr('title',aa)
  })

  $('.im .list li').dblclick(function(){
  	Home.create.chat($(this).attr('fid'));

    $('.im').css('display','block').removeClass('mins')
//	$('.im .top .name').html($(this).find('span').html())
	$('.chat .tops .avatar img').attr('src',$(this).find('img').attr('src'))
	$('.chat .tops .you span').html($(this).find('span').html())

	$('.chat .you i').html($(this).find('.hui-name i').html())
	$('.chat .ner').html($(this).find('.hui-txt').html())
	$(".chat #text").trigger("focus")
	$('.my').remove()
  })


  $('.close').click(function(){
    $(this).parent().parent().parent().css('display','none')
  })
  $('.min').click(function(){
    $(this).parent().parent().parent().addClass('mins')
  })
  $('.qq .close').click(function(){
    $('.chat').css('display','none')
  })
  $('.chat .text').keydown(function(e){
    if(e.keyCode == 27){
	  $('.chat').css('display','none')
    }
  })

//	发送信息
function sendchat(){
	if($('.chat #text').val()!=''){
//		alert("发送内容不能为空,请输入内容")
//	}else if($('.chat #text').val()!=''){
		var avatar = $('.im .name span').html();
		var name = $('.im .name span').html();
		var ner = $('.chat #text').val();
		var ners = ner.replace(/\n/g,'<br>');
		var now=new Date();
		var t_div = now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+' '+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
		$('.chat .txt ul').append('<li class="my"><div class="chat-my"><span>'+name+'</span><i>'+t_div+'</i></div><div class="ner">'+ners+'</div></li>');
//	写入数据库，并提醒目标好友

		$(".chat .txt").scrollTop($(".chat .txt")[0].scrollHeight);
		$('.chat #text').val('').trigger("focus");
	}
}


/*
$(".chat #text").focus(function(){
	jQuery(document).keypress(function(e){
		if(e.ctrlKey && e.which == 13 || e.which == 10) {
alert('sss');
			sendchat();
		};
	};
});
*/

$('.chat .but .fasong').click(function(){
	sendchat();
})


//	关闭聊天窗口
$('.close-chat').click(function(){
	alert('请用其它方式关闭该窗口');
//	$('.chat').css('display','none')
})

//	可以是滚动条
$(".im .list").niceScroll({
	touchbehavior:false,cursorcolor:"#ccc",cursoropacitymax:1,cursorwidth:6,horizrailenabled:true,cursorborderradius:3,autohidemode:true,background:'none',cursorborder:'none'
});



