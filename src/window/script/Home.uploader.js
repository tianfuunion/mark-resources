Home.uploader = (function(){
var fileList = [];
return {
init : function(){
//拖动上传文件
	if(window.FileReader){
		var oDragWrap = document.body;
		//拖进
		oDragWrap.addEventListener('dragenter', function(e){
			e.preventDefault();
		}, false);
		//拖离
		oDragWrap.addEventListener('dragleave', function(e){
			e.preventDefault();
		}, false);
		//拖来拖去，一定要注意dragover事件一定要清除默认事件，不然会无法触发后面的drop事件
		oDragWrap.addEventListener('dragover', function(e){
			e.preventDefault();
		}, false);
		//扔
		oDragWrap.addEventListener('drop', function(e){
			e.preventDefault();
			Home.uploader.nexstar();
			getFiles(e);
			Home.uploader.nexstar();
		}, false);
	}

	//普通上传
	$('body').on('change', '#uploadfilebtn', function(e){
		getFiles(e);
		Home.uploader.nexstar();
	});

	//普通上传	-->	云盘上传正在使用该方法
	$('body').on('change', '#cloud .files input:file', function(e){
		getFiles(e);
		Home.uploader.upload();
//		Home.uploader.nexstar();
	});

	//绑定删除事件
	$('body').on('click', '#uploadfile .del', function(){
		var list = $(this).parents('.filelist');
		var count = list.index();
		list.slideUp('slow', function(){
			$(this).remove();
		});
		//数据删除
		var tempList = [];
		for(var i = 0; i < fileList.length; i++){
			if(i != count){
				tempList.push(fileList[i]);
			}
		}
		fileList = tempList;
		refreshFiles();
		Home.uploader.nexstar();
	});

	var getFiles = function(e){
		var files = e.target.files || e.dataTransfer.files;
		if(files.length != 0){
			var content = [];
			for(var i = 0; i < files.length; i++){
				if(files[i]['size'] > (upmaxsize*1024*1024)){
//					content.push("\""+files[i]['name']+"\" 文件过大，请上传小于"+upmaxsize+" MB的文件！")
//					content.push(files[i]['name']+" 文件过大，请上传小于"+upmaxsize+" MB的文件！Tips()")
					notify(images + 'cloud/send_error.gif','文件过大，请上传小于'+upmaxsize+' MB的文件！',files[i]['name']);
				}else{
					fileList.push(files[i]);
				}
			}
			if(content != ''){
				contentHtml = content.join('<br>');
				dialog({
					padding : 10,
					content : contentHtml
				}).show();
			}
		}
		refreshFiles();
	}
	var refreshFiles = function(){
		for(var i = 0; i < fileList.length; i++){
			fileList[i]['index'] = i;
		}
		console.log(fileList);
	}
},
//	获取上传文件对话框
nexstar : function(sid){
	var tempData = [];
	for(var i = 0; i < fileList.length; i++){
		tempData.push({
			name : fileList[i].name,
			type : fileList[i].type,
			size : fileList[i].size < 1048576 ? Math.round(fileList[i].size/1024)+' KB' : Math.round(fileList[i].size/1048576*100)/100+' MB',
			sid  : sid,
		});
	}
	var filelist = nexstarListTemp({
		list : tempData
	});
	//创建上传文件对话框，如果已打开则更新上传列表
	if($('#uploadlist').length > 0){
		$('#uploadlist').html(filelist);
	}else{
		Home.create.nexstar();
	}
},
upload : function(){
//	检测是否是拖拽文件到页面的操作
	if(fileList.length != 0){
		for(var i = 0, file; file = fileList[i]; i++){
			(function(file){
				var fd = new FormData();
				fd.append('file', file);
				var xhr = new XMLHttpRequest();
				if(xhr.upload){
					xhr.upload.addEventListener('progress', function(e){
						if(e.lengthComputable){
							$('#uploadlist li:eq(' + file.index + ') .degree text').html('[&nbsp;正在上传&nbsp;]');
							var loaded = Math.ceil(e.loaded / e.total * 100);
							$('#uploadlist li:eq(' + file.index + ') .degree .pro').val(loaded);
						}
					}, false);
					xhr.addEventListener('load', function(e){
						if(xhr.readyState == 4 && xhr.status == 200){
							var result = jQuery.parseJSON(e.target.responseText);
							if(result.error == null){
								notify(images + 'cloud/send_ok.gif','上传提醒','上传成功 √ 1 '+result.success);
//								$('#uploadlist li:eq(' + file.index + ') .degree text').html('[&nbsp;上传成功&nbsp;√&nbsp;]'+result.success);

							}else if(result.success != null){
								notify(images + 'cloud/send_ok.gif','上传提醒','上传成功 √ 2 '+result.success);
//								$('#uploadlist li:eq(' + file.index + ') .degree text').html('[&nbsp;上传成功&nbsp;√&nbsp;]'+result.success);
							}else{
								notify(images + 'cloud/send_error.gif','上传提醒','上传失败 × '+result.error);
//								$('#uploadlist li:eq(' + file.index + ') .degree span.y').html('[&nbsp;上传失败&nbsp;×&nbsp;]'+result.error);
							}
						}
					}, false);
					xhr.open('post', 'home.php/cloud/uploader', true);
					xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
					xhr.send(fd);
				}
			})(file);
		}
		fileList = [];
	}

},
filetype : function(){
//检测文件类型


},
}
})();