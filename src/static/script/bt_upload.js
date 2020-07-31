/* ! 宝塔文件上传组件 License  https://www.bt.cn  By 黄文良 <287962566@qq.com> */
var bt_upload_file = {
    f: null,
    total: 0,
    path: null,
    split_size: 1024 * 1024 * 2,
    _files: [],
    _error: 0,
    _start_time: 0,
    _t_start_time: 0,
    collback_to: null,
//    upload_url: '/files?action=upload',
//	upload_url: '/console.php/coss/file_action?action=upload',
	upload_url: '/api.php/objects/upload?action=upload',
    _loadT: null,
//	open: function(path,folderid, bucketid, is_exts, ps, collback_to) {
	open: function(path,folderid, appid, appsecret,is_exts, ps, collback_to) {

bt_upload_file.path = path.replace('//', '/');
bt_upload_file.folderid = Number(folderid);
// bt_upload_file.bucketid = Number(bucketid);

bt_upload_file.appid = Number(appid);
bt_upload_file.appsecret = appsecret;

        user_agent = navigator.userAgent.toLowerCase();
        var btn_dir = '';
        var accept_ext = '';
        if (!is_exts) {
            if (user_agent.indexOf('chrome') !== -1 || user_agent.indexOf('firefox') !== -1) {
                btn_dir =
                    '<input type="file" id="dir_input" onchange="bt_upload_file.list(this.files)" style="display:none;"  multiple="true" autocomplete="off" multiple webkitdirectory /><button type="button" style="margin-left: 10px;"  id="opt" onclick="$(\'#dir_input\').click()" autocomplete="off" title="支持的浏览器: Chrome、Firefox、Edge、有极速模式的国产浏览器">选择目录</button>'
            }
        } else {
            accept_ext = 'accept="' + is_exts + '"'
        }
        var other_ps = '';
        if (ps) {
            other_ps = ' --- <span style="color:red;">' + ps + '</span>'
        } else {
            other_ps = ' --- 支持断点续传'
        }
        if (collback_to) {
            bt_upload_file.collback_to = collback_to
        }
        bt_upload_file._loadT = layer.open({
            type: 1,
            title: '上传文件到[' + bt_upload_file.path + ']' + other_ps,
            area: ['550px', '500px'],
            shadeClose: false,
            closeBtn: 2,
            content: '<div class="fileUploadDiv"><input type="file" id="file_input" onchange="bt_upload_file.list(this.files)" multiple="true" autocomplete="off" ' + accept_ext + ' /><button type="button" id="opt" onclick="$(\'#file_input\').click()" autocomplete="off">选择文件</button>' + btn_dir + '<span id="totalProgress" style="position: absolute;top: 7px;right: 10px;"></span><span><button type="button" id="up" autocomplete="off" onclick="bt_upload_file.start(0)">开始上传</button><button type="button" id="filesClose" autocomplete="off" onClick="layer.close(bt_upload_file._loadT)" >关闭</button></span><ul id="up_box"></ul></div>'
		})
	},
	list: function (_files) {
		bt_upload_file._files = _files;
        var up_box = $("#up_box");
        $("#up_box").html('');
        var loadT = layer.msg('正在加载文件列表...', {
            time: 0,
            icon: 16,
            shade: 0.3
        });
        for (var i = 0; i < _files.length; i += 1) {
            var f_name = _files[i].name;
            if (_files[i].webkitRelativePath) {
                f_name = _files[i].webkitRelativePath
            }
            up_box.append('<li class="offset-' + i + '"><span class="filename" title="上传到: ' + bt_upload_file.path + '/' + f_name + '">' + f_name + '</span><span class="filesize">' + bt_upload_file.to_size(_files[i].size) + '</span><em>等待上传</em></li>')
        }
        layer.close(loadT)
    },
    to_size: function (a) {
        var d = [" B", " KB", " MB", " GB", " TB", " PB"];
        var e = 1024;
        for (var b = 0; b < d.length; b += 1) {
            if (a < e) {
                return (b === 0 ? a : a.toFixed(2)) + d[b]
            }
            a /= e
        }
    },
    start: function (i) {
        var len = bt_upload_file._files.length;
        if (len === 0) {
            layer.msg('请选择文件!', {
                icon: 2
            });
            return false
        }
        if (i === 0) {
            bt_upload_file._t_start_time = new Date()
        }
        $("#filesClose,#up,#opt").attr("disabled", "disabled");
        var total_time = bt_upload_file.diff_time(bt_upload_file._t_start_time, new Date());
        $("#totalProgress").html('<p>已上传(' + i + '/' + len + '),' + total_time + '</p> <progress value="' + i + '" max="' + len + '"></progress>');
        if (len <= i) {
            $("#totalProgress").html('<p>上传完成(' + i + '/' + len + '), ' + total_time + '</p> <progress value="' + i + '" max="' + len + '"></progress>');
            bt_upload_file._files = [];
            $("#filesClose,#up,#opt").removeAttr("disabled");
            if (bt_upload_file.collback_to) {
                bt_upload_file.collback_to(bt_upload_file.path)
            }
            return false
        }
        if (i > 10) {
            $("#up_box").scrollTop(35 * (i - 10) + 50)
        }
        bt_upload_file._start_time = new Date();
        bt_upload_file._error = 0;
        bt_upload_file.files = bt_upload_file._files[i];
        bt_upload_file.total = Math.ceil(bt_upload_file.files.size / bt_upload_file.split_size);
        bt_upload_file.upload(0, i)
    },
    upload: function (start, i) {
var startTime = new Date().getTime();

        var end = Math.min(bt_upload_file.files.size, start + bt_upload_file.split_size);
        var len = bt_upload_file._files.length;
        var path = bt_upload_file.path;
        if (bt_upload_file.files.webkitRelativePath) {
            path = bt_upload_file.path + '/' + bt_upload_file.files.webkitRelativePath.replace('/' + bt_upload_file.files.name, '')
        }
        var form = new FormData();
form.append("action", "upload");
form.append("folderid", bt_upload_file.folderid);
// form.append("bucketid", bt_upload_file.bucketid);

form.append("appid", bt_upload_file.appid);
form.append("appsecret", bt_upload_file.appsecret);

        form.append("path", path.replace('//', '/'));
        form.append("name", bt_upload_file.files.name);
        form.append("size", bt_upload_file.files.size);
        form.append("start", start);
//        form.append("blob", bt_upload_file.files.slice(start, end));
        form.append("file", bt_upload_file.files);

		console.info("start:"+start, "end:"+end, "I:"+i, bt_upload_file.files);

        $.ajax({
            url: bt_upload_file.upload_url,
            type: "POST",
            data: form,
//            async: true,
cache:false,
            processData: false,
            contentType: false,
            success: function (data) {
                if (typeof (data) === "string") {
					// console.log(data);

					console.info("<==================== Console Json Start ====================> Type:" + gettype(data));
					var resultJson = formatJson(data);
					console.info(resultJson);
					console.info("<==================== Console Json End ====================> RunTime:" + (new Date().getTime() - startTime));

					var data = $.parseJSON(data);
					switch(data['status']){
						case 100:
var progress = parseInt(data["processed"] / bt_upload_file.files.size * 100);
var total_time = bt_upload_file.diff_time(bt_upload_file._t_start_time, new Date());
$("#totalProgress").html('<p>已上传(' + i + '/' + len + '),' + total_time + '</p> <progress value="' + i + '" max="' + len + '"></progress>');
$("#up_box li em")[i].outerHTML = '<em style="color:green;">上传进度:' + progress + '%</em>';
$("#up_box li .filesize")[i].outerHTML = '<span class="filesize">' + bt_upload_file.to_size(data["processed"]) + '/' + bt_upload_file.to_size(bt_upload_file.files.size) + '</span>';
$("#up_box li em")[i].focus();
bt_upload_file.upload(data["processed"], i)
							break;
						case 200:
							console.log("状态码：" + data['status'] + " Reason：" + data['reason'] );
							if (data.status) {
								var f_time = bt_upload_file.diff_time(bt_upload_file._start_time, new Date());
								$("#up_box li em")[i].outerHTML = '<em style="color:green;">已完成(' + f_time +')</em>';
								$("#up_box li .filesize")[i].outerHTML = '<span class="filesize">' + bt_upload_file.to_size(bt_upload_file.files.size) + '/' + bt_upload_file.to_size(bt_upload_file.files.size) + '</span>'
							} else {
								$("#up_box li em")[i].outerHTML = '<em style="color:red;">' + data.msg + '</em>'
							}
							bt_upload_file.start(i + 1);
						break;
						case 404:
						default:
							$.toast(data['reason'], "text");
							console.log("状态码：" + data['status'] + " Reason：" + data['reason'] );
// 失败后重试5次
							if (bt_upload_file._error >= 1) {
								$("#up_box li em")[i].outerHTML = '<em style="color:red;">上传失败</em>';
								bt_upload_file.start(i + 1);
								return
							}
							bt_upload_file._error++;
							bt_upload_file.upload(start, i)
						break;
					}
                }else if (typeof (data) === "number") {
                    var progress = parseInt(data / bt_upload_file.files.size * 100);
                    var total_time = bt_upload_file.diff_time(bt_upload_file._t_start_time, new Date());
                    $("#totalProgress").html('<p>已上传(' + i + '/' + len + '),' + total_time + '</p> <progress value="' + i + '" max="' + len + '"></progress>');
                    $("#up_box li em")[i].outerHTML = '<em style="color:green;">上传进度:' + progress + '%</em>';
                    $("#up_box li .filesize")[i].outerHTML = '<span class="filesize">' + bt_upload_file.to_size(data) + '/' + bt_upload_file.to_size(bt_upload_file.files.size) + '</span>';
                    $("#up_box li em")[i].focus();
                    bt_upload_file.upload(data, i);
                } else {
                    if (data.status) {
                        var f_time = bt_upload_file.diff_time(bt_upload_file._start_time, new Date());
                        $("#up_box li em")[i].outerHTML = '<em style="color:green;">已完成(' + f_time +')</em>';
                        $("#up_box li .filesize")[i].outerHTML = '<span class="filesize">' + bt_upload_file.to_size(bt_upload_file.files.size) + '/' + bt_upload_file.to_size(bt_upload_file.files.size) + '</span>'
                    } else {
                        $("#up_box li em")[i].outerHTML = '<em style="color:red;">' + data.msg + '</em>'
                    }
                    bt_upload_file.start(i + 1)
                }
            },
            error: function (e) {
                if (bt_upload_file._error >= 2) {
                    $("#up_box li em")[i].outerHTML = '<em style="color:red;">上传错误</em>';
                    bt_upload_file.start(i + 1);
                    return
                }
                bt_upload_file._error++;
                bt_upload_file.upload(start, i)
            }
        })
    },
    diff_time: function (start_date, end_date) {
        var diff = end_date.getTime() - start_date.getTime();
        var minutes = Math.floor(diff / (60 * 1000));
        var leave3 = diff % (60 * 1000);
        var seconds = (leave3 / 1000).toFixed(2);
        var result = seconds + '秒';
        if (minutes > 0) {
            result = minutes + "分" + result
        }
        return result
    }
};