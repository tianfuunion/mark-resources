/**
 * Mark Engine Verify Library
 *
 * 问题:网页Input 数据校验太繁琐，各页面均有需要验证的数据。
 * 在input 标签上写上需要验证的数据类型，通过适当时机校验数据，并给予提示
 *
 1.onfocus  当input 获取到焦点时触发
 2.onblur  当input失去焦点时触发，注意:这个事件触发的前提是已经获取了焦点再失去焦点的时候会触发相应的js
 3.onchange 当input失去焦点并且它的value值发生变化时触发
 4.onkeydown 在 input中有键按住的时候执行一些代码
 5.onkeyup 在input中有键抬起的时候触发的事件，在此事件触发之前一定触发了onkeydown事件
 6.onclick  主要是用于 input type=button，当被点击时触发此事件
 7.onselect  当input里的内容文本被选中后执行一段，只要选择了就会触发，不是非得全部选中
 8.oninput  当input的value值发生变化时就会触发，不用等到失去焦点（与onchange的区别）

 以上事件可以直接放到input的属性里，例如:<input type="text" onfocus="a();" onblur="b()" onchange="c();" onkeydown="d();" />，
 也可以通过js给input dom元素添加相应的事件，如:document.getElementByTagName("input").onfocus = function();
 */

var Mark = Mark || {};
Mark.Verify = Mark.Verify || function () {
};

/**
 * JS 实现数字转换为大写中文金额
 *
 */
function moneytoupper(money) {
    // 汉字的数字
    var cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    // 基本单位
    var cnIntRadice = ['', '拾', '佰', '仟'];
    // 对应整数部分扩展单位
    var cnIntUnits = ['', '万', '亿', '兆'];
    // 对应小数部分单位
    var cnDecUnits = ['角', '分', '毫', '厘'];
    // 整数金额时后面跟的字符
    var cnInteger = '整';
    // 整型完以后的单位
    var cnIntLast = '元';
    // 最大处理的数字
    var maxNum = 999999999999999.9999;
    // 金额整数部分
    var integerNum;
    // 金额小数部分
    var decimalNum;
    // 输出的中文金额字符串
    var chineseStr = '';
    // 分离金额后用的数组，预定义
    var parts;
    if (money === '') {
        return '';
    }
    money = parseFloat(money);
    if (money >= maxNum) {
        // 超出最大处理数字
        return '';
    }
    if (money === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
    }
    // 转换为字符串
    money = money.toString();
    if (money.indexOf('.') === -1) {
        integerNum = money;
        decimalNum = '';
    } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
    }
    // 获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n === 0) {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    chineseStr += cnNums[0];
                }
                // 归零
                zeroCount = 0;
                chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m === 0 && zeroCount < 4) {
                chineseStr += cnIntUnits[q];
            }
        }
        chineseStr += cnIntLast;
    }
    // 小数部分
    if (decimalNum !== '') {
        var decLen = decimalNum.length;
        for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n !== '0') {  // 剔除0
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            } else {
                chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (chineseStr === '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum === '') {
        chineseStr += cnInteger;
    }
    return chineseStr;
}

!(function () {
    window.addEventListener("pageshow", function () {
        // console.log("Mark.Verify 页面加载了");

        // console.log(document.querySelector("body"));

        // var flag = false;
        // 检测form 是否开启了数据校验
        flag = $("form").data("verify");
        if (flag == 'true') {
            console.log("已开启数据校验", flag);
            $('form [type="submit"]').attr('disabled', false);
            $('form [type="submit"]').attr('disabled', '');
            $('form [type="submit"]').removeAttr("disabled");
            $('form [type="submit"]').removeClass('disabled');

            // 当校验未通过时则把提交按钮设置为禁用
            // $('form [type="submit"]').attr('disabled',true);
            // $('form [type="submit"]').attr('disabled','disabled');
            // $('form [type="submit"]').prop('disabled','disabled');
            // $('form [type="submit"]').addClass('disabled');
        } else {
            // console.log("未开启数据校验" + flag);
        }

        // Input 增加清除功能 Start
        // 待完善
        // <i class="iconfont icon icon-cancel icon-points icon-medium text-default line-height-inherit" data-action="clear" data-label="endtime"></i>
        $("input[data-clear='true']").focus(function () {
            $(this).parent().children(".input_clear").show();
        });
        $("input[data-clear='true']").blur(function () {
            if ($(this).val() == '') {
                $(this).parent().children(".input_clear").hide();
            }
        });

        $("[data-action='clear']").click(function () {
            $($(this).data("label")).val();
            $(this).parent().find("input[data-clear='true']").val('');
            $(this).hide();
        });
        // Input 增加清除功能 End

        /**
         * 监听Input Number 最大值与最小值
         *
         */
        $(".mk-form[data-verify='true'] input[type='number']").bind("input propertychange", function () {
            var value = Number($(this).val());
            var max_val = Number($(this).attr("max-value"));
            var min_val = Number($(this).attr("min-value"));
            var float_val = Number($(this).attr("float-value"));

            if (!is_empty(max_val) && value > max_val) {
                $(this).val(max_val);
            } else if (!is_empty(min_val) && value < min_val) {
                $(this).val(min_val);
            }

            if (!is_empty(float_val) && value < float_val) {
                var float_value = (value + "").split(".");
                if (float_value && float_value[1]) {
                    $(this).val(float_value[0] + "." + float_value[1].substr(0, float_val));
                } else {
                    // console.info("当前没有小数点");
                    // TODO：小数点无法保证唯一性
                }
            }

            console.info("Max:" + max_val + " Min:" + min_val + " Float:" + float_val + " Now:" + value);
        });

        /**
         *  textarea值改变事件的监听
         * <textarea name="description" class="weui-textarea" autoHeight="true" rows="4" maxlength="200"></textarea>
         * <div class="weui-textarea-counter"><span data-total="description"></span>/200</div>
         *
         * autoHeight="true" ：高度自适应
         * maxlength="200" ：字数限制（中文算一个）
         *
         * data-total="description"：统计textarea字数
         */
        $(".mk-form[data-verify='true'] textarea").bind("input propertychange", function () {
            $.fn.autoHeight = function () {
                function autoHeight(elem) {
                    elem.style.height = 'auto';
                    elem.scrollTop = 0;  // 防抖动
                    elem.style.height = elem.scrollHeight + 'px';
                }

                this.each(function () {
                    autoHeight(this);
                    $(this).on('keyup', function () {
                        autoHeight(this);
                    });
                });
            };
            if (this.getAttribute("autoHeight")) {
                $(this).autoHeight();
            }

            this.addEventListener('onkeydown', function () {
                if (this.maxlength > 0 && this.value.length > this.maxlength) {
                    this.value = this.value.substring(0, this.maxlength);
                }
                $("[data-total='" + this.name + "']").text(this.value.length);
                $("[data-total='" + this.id + "']").text(this.value.length);
            });

            this.addEventListener('onkeyup', function () {
                if (this.maxlength > 0 && this.value.length > this.maxlength) {
                    this.value = this.value.substring(0, this.maxlength);
                }
                $("[data-total='" + this.name + "']").text(this.value.length);
                $("[data-total='" + this.id + "']").text(this.value.length);
                console.info("ThisID", this.id);
            });
            this.addEventListener('onchange', function () {
                if (this.maxlength > 0 && this.value.length > this.maxlength) {
                    this.value = this.value.substring(0, this.maxlength);
                }
                $("[data-total='" + this.name + "']").text(this.value.length);
                $("[data-total='" + this.id + "']").text(this.value.length);
            });

            this.addEventListener('input', function () {
                if (this.maxlength > 0 && this.value.length > this.maxlength) {
                    this.value = this.value.substring(0, this.maxlength);
                }
                $("[data-total='" + this.name + "']").text(this.value.length);
                $("[data-total='" + this.id + "']").text(this.value.length);
            });

            this.addEventListener('propertychange', function () { // 兼容IE
                if (this.maxlength > 0 && this.value.length > this.maxlength) {
                    this.value = this.value.substring(0, this.maxlength);
                }
                $("[data-total='" + this.name + "']").text(this.value.length);
                $("[data-total='" + this.id + "']").text(this.value.length);
            });

        });

        $(".mk-form[data-verify='true'] input").bind("input propertychange", function () {
            $.fn.autoHeight = function () {
                function autoHeight(elem) {
                    elem.style.height = 'auto';
                    elem.scrollTop = 0;  // 防抖动
                    elem.style.height = elem.scrollHeight + 'px';
                }

                this.each(function () {
                    autoHeight(this);
                    $(this).on('keyup', function () {
                        autoHeight(this);
                    });
                });
            };
            if (this.getAttribute("autoHeight")) {
                $(this).autoHeight();
            }

            this.addEventListener('onkeydown', function () {
                if (this.maxlength > 0 && this.value.length > this.maxlength) {
                    this.value = this.value.substring(0, this.maxlength);
                }
                $("[data-total='" + this.name + "']").text(this.value.length);
                $("[data-total='" + this.id + "']").text(this.value.length);
            });

            this.addEventListener('onkeyup', function () {
                if (this.maxlength > 0 && this.value.length > this.maxlength) {
                    this.value = this.value.substring(0, this.maxlength);
                }
                $("[data-total='" + this.name + "']").text(this.value.length);
                $("[data-total='" + this.id + "']").text(this.value.length);
                console.info("ThisID", this.id);
            });
            this.addEventListener('onchange', function () {
                if (this.maxlength > 0 && this.value.length > this.maxlength) {
                    this.value = this.value.substring(0, this.maxlength);
                }
                $("[data-total='" + this.name + "']").text(this.value.length);
                $("[data-total='" + this.id + "']").text(this.value.length);
            });

            this.addEventListener('input', function () {
                if (this.maxlength > 0 && this.value.length > this.maxlength) {
                    this.value = this.value.substring(0, this.maxlength);
                }
                $("[data-total='" + this.name + "']").text(this.value.length);
                $("[data-total='" + this.id + "']").text(this.value.length);
            });

            this.addEventListener('propertychange', function () { // 兼容IE
                if (this.maxlength > 0 && this.value.length > this.maxlength) {
                    this.value = this.value.substring(0, this.maxlength);
                }
                $("[data-total='" + this.name + "']").text(this.value.length);
                $("[data-total='" + this.id + "']").text(this.value.length);
            }, {capture: true});

        });


        /**
         * 遍历Input Image 预览
         */
        $(document).find("input[type='file']").each(function (index, e) {
            var preview = $(this).data("preview");
            // console.log("Index:"+index+' Name:'+$(this).attr("name") +" Preview:"+ preview+" Type:" + this.type+" Accept:" +this.accept +" Reg:"+ (/image/).test(this.accept));

            if ((/image/).test(this.accept) && preview) {
                $(this).on("change", function () {
                    previews(this);
                });
            } else if ((/video/).test(this.accept) && preview) {
                $(this).on("change", function () {
                    previews(this);
                });
            } else if ((/audio/).test(this.accept) && preview) {
                $(this).on("change", function () {
                    previews(this);
                });
            } else {
                $(this).on("change", function () {
                    previews(this);
                });
            }
        });


        /**
         * 新多图上传预览

         * 随后可加入视频文件的缩略图
         * 其它文件可加入文件后缀ICO
         */
        function previews(input) {
            console.time("multiple");
            // 获取文件
            var files = input.files;
            if (files.length === 0) {
                return;
            }
            var form = form || $(input).parents("form").attr("id") || $(this).attr("form");
            window[form.toString()] = window[form.toString()] || new FormData();

            // console.log(gettype(form), form, input.name, "Multiple:"+input.multiple, window[form.toString()]);

            // 限制数量失败
            // for(var i=0; i <= (!is_empty(this.maxlength) ? parseInt(this.maxlength) : files.length); i++){
            for (var i = 0, len = files.length; i < len; i++) {
                var file = files[i];

                console.log("Name:" + file.name, "Type:" + file.type, "Size:" + file.size / 1024 + "KB");

                // 判断文件是否为图片
                if (/image\/\w+/.test(file.type)) {
                    // 判断浏览器是否支持FileReader接口
                    if (window.FileReader || typeof FileReader != 'undefined') {
                        var reader = new FileReader();
                        // 将文件以Data URL形式进行读入页面
                        reader.readAsBinaryString(file);
                        // 读取完成
                        reader.onload = function (e) {
                            // 把上传的图片显示出来，获取图片dom,为图片赋值
                            $('img[name="' + input.name + '"]').attr('src', "data:" + file.type + ";base64," + window.btoa(this.result));

                            // 把当前input的Name设置为变量
                            // eval(input.name) = true;
                            // window[input.name] = true;
                            // console.error(e);
                            // console.log(input.name, file, first_pic + " Target:" + this.result);
                            // console.log(input.name, input.multiple,"Name:" + file.name + " Type:"+file.type + " Size:" + file.size / 1024 + "KB");

                            if (input.multiple) {
                                // $(this).parent().next().find(".Validform_checktip").remove();
                                // $($(input).parent("div").find(".weui-uploader__files")).append('<li class="weui-uploader__file" style="background-image:url(<{$tpl.images}>/weui/pic_160.png)"></li>');
                                $(".weui-uploader__files").append('<li class="weui-uploader__file" style="background-image:url(' + "data:" + file.type + ";base64," + window.btoa(this.result) + ')"></li>');
                            }
                        };
                        reader.onerror = function (event) {
                            // reader.abort();
                            console.error("FileReader::Error()", event);
                        };
                    } else {
                        // 使选择控件不可操作
                        input.setAttribute("disabled", "disabled");
                        $.toast("你的浏览器不支持FileReader接口！您的设备不支持图片预览功能，如需该功能请升级您的设备！", "text");
                    }
                }
                if (form) {
                    if (input.multiple) {
                        window[form.toString()].append(input.name + '[]', file, file.name);
                    } else {
                        window[form.toString()].append(input.name, file);
                    }

                    try {
                        if (typeof previewsCallback === "function") {
                            previewsCallback(input);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    console.error("当前input没有所属的form标签", form);
                }
            }

            console.timeEnd("multiple");
        }

    });

})();


// var result=document.getElementById("result");
// var file=document.getElementById("file");
// 判断浏览器是否支持FileReader接口
if (typeof FileReader == 'undefined') {
    // result.InnerHTML="<p>你的浏览器不支持FileReader接口！</p>";
    console.log("你的浏览器不支持FileReader接口！");

    // 使选择控件不可操作
    // file.setAttribute("disabled","disabled");
}

function readAsDataURL() {
    // 检验是否为图像文件
    var file = document.getElementById("file").files[0];
    if (!/image\/\w+/.test(file.type)) {
        alert("看清楚，这个需要图片！");
        return false;
    }
    var reader = new FileReader();
    // 将文件以Data URL形式读入页面
    reader.readAsDataURL(file);
    reader.onload = function (e) {
        var result = document.getElementById("result");
        // 显示文件
        result.innerHTML = '<img src="' + this.result + '" alt="" />';
    }
}

function readAsBinaryString() {
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    // 将文件以二进制形式读入页面
    reader.readAsBinaryString(file);
    reader.onload = function (f) {
        var result = document.getElementById("result");
        // 显示文件
        result.innerHTML = this.result;
    }
}

function readAsText() {
    var file = document.getElementById("file").files[0];
    var reader = new FileReader();
    // 将文件以文本形式读入页面
    reader.readAsText(file);
    reader.onload = function (f) {
        var result = document.getElementById("result");
        // 显示文件
        result.innerHTML = this.result;
    }
}

// 为Input得到失去焦点进的底部边框变化
$('.form-box input[type=text]').focus(function () {
    $(this).parent().addClass('high-border-bottom');
}).blur(function () {
    $(this).parent().removeClass('high-border-bottom');
});

$('.form-box input[type=tel]').focus(function () {
    $(this).parent().addClass('high-border-bottom');
}).blur(function () {
    $(this).parent().removeClass('high-border-bottom');
});

$('.form-box input[type=number]').focus(function () {
    $(this).parent().addClass('high-border-bottom');
}).blur(function () {
    $(this).parent().removeClass('high-border-bottom');
});

$('.form-box input[type=email]').focus(function () {
    $(this).parent().addClass('high-border-bottom');
}).blur(function () {
    $(this).parent().removeClass('high-border-bottom');
});

// JS input type=date 日期的提示清除
$("input[type='date']").on("input", function () {
    if ($(this).val().length > 0) {
        $(this).addClass("full");
    } else {
        $(this).removeClass("full");
    }
}).blur(function () {
    $(this).removeAttr
});


/**==================== jQuery实现的全选、反选和不选功能（Start） ====================**/
!(function () {
    'use strict';

    $(function () {

        $('[data-toggle]').click(function () {
            // console.info(this);
            switch ($(this).data('toggle')) {
                case "inherit":
                    if (this.tagName.toLowerCase() == "input" && $(this).attr("type") == "checkbox") {
                        $("input[type='checkbox']").attr("checked", !$(this).attr("checked"));
                        console.info($("input[type='checkbox']"));
                        console.info(!$(this).attr("checked"));
                    } else {
                        console.info('请使用 <input type="checkbox" data-toggle>标签');
                    }
                    break;
                case "reverse":  // 反选
                case "toggle":   // 切换：全选或全不选
                    console.info("reverse:反选 toggle:切换::" + this.checked);
                    $("input[type='checkbox'][data-select='true'][name='" + $(this).data("item") + "']").each(function (i) {
                        $(this).prop("checked", !this.checked);
                    });
                    break;
                case "selectall":  // 全选
                case "allselect":  // 全选
                    console.info("selectall:全选");
                    $("input[type='checkbox'][data-select='true']").each(function (i) {
                        $(this).prop("checked", true);
                    });
                    break;
                case "unselect":  // 全不选
                    console.info("unselect:全不选");
                    $("input[type='checkbox'][data-select='true']").each(function (i) {
                        $(this).prop("checked", false);
                    });
                    break;
                case "odd":
                    $("input[type='checkbox'][data-select='true']").each(function (i) {
                        $("input[type='checkbox']:odd").attr("checked", true);
                    });
                    break;
                case "even":
                    $("input[type='checkbox']:even").attr("checked", true);
                    break;
                case "checkbox":  // 设置全选复选框
                    // allchk();
                    break;
                case "getValue":  // 获取选中选项的值
                    var result = [];
                    $("input[type='checkbox'][data-select='true']:checked").each(function (i) {
                        result[i] = new Array($(this).val());
                    });
                    var vals = result.join(',');
                    console.info(vals);
                    return vals;
                case "required":  // 至少选择一个*有待优化
                    var result = [];
                    $("input[type='checkbox'][data-select='true']:checked").each(function (i) {
                        result.push($(this).val());
                    });

                    return !is_empty(result);
                default:
                    break;
            }
        });

        function allchk() {
            var chknum = $("input:checkbox").size(); // 选项总个数
            var chk = 0;
            $("input:checkbox").each(function () {
                if ($(this).attr("checked") === true) {
                    chk++;
                }
            });
            if (chknum === chk) { // 全选
                $('[data-toggle="selectall"]').attr("checked", true);
            } else { // 不全选
                $('[data-toggle="selectall"]').attr("checked", false);
            }
        }


        /**
         * 单选按钮自动切换样式
         */
        $(".mk-form[data-verify='true'] input[type='radio']").on("click", function () {
            $(this).parents("[mk-role='label']").siblings("[mk-role='label']").removeClass("checked");
            // $(this).parents("label").toggleClass("checked");
            $(this).parents("[mk-role='label']").addClass("checked");
        });

        /******************* Table To Excel *************************** ****/

        Mark.getExplorer = function () {
            var explorer = window.navigator.userAgent;
            // ie
            if (explorer.indexOf("MSIE") >= 0) {
                return 'ie';
            } else if (explorer.indexOf("Firefox") >= 0) {  // firefox
                return 'Firefox';
            } else if (explorer.indexOf("Chrome") >= 0) {  // Chrome
                return 'Chrome';
            } else if (explorer.indexOf("Opera") >= 0) {  // Operad
                return 'Opera';
            } else if (explorer.indexOf("Safari") >= 0) { // Safari
                return 'Safari';
            }
        };
        var idTmr;

        Mark.table2excel = function (tableid, name) { // 整个表格拷贝到EXCEL中
            if (Mark.getExplorer() === 'ie') {
                var curTbl = document.getElementById(tableid);
                var oXL = new ActiveXObject("Excel.Application");

                // 创建AX对象excel
                var oWB = oXL.Workbooks.Add();
                // 获取workbook对象
                var xlsheet = oWB.Worksheets(1);
                // 激活当前sheet
                var sel = document.body.createTextRange();
                sel.moveToElementText(curTbl);
                // 把表格中的内容移到TextRange中
                sel.select();
                // 全选TextRange中内容
                sel.execCommand("Copy");
                // 复制TextRange中内容
                xlsheet.Paste();
                // 粘贴到活动的EXCEL中
                oXL.Visible = true;
                // 设置excel可见属性

                try {
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
                } catch (e) {
                    print("Nested catch caught " + e);
                } finally {
                    oWB.SaveAs(fname);

                    oWB.Close(savechanges = false);
                    // xls.visible = false;
                    oXL.Quit();
                    oXL = null;
                    // 结束excel进程，退出完成
                    // window.setInterval("Cleanup();",1);
                    idTmr = window.setInterval("Mark.Cleanup();", 1);
                }
            } else {
                Mark.tableToExcel(tableid, name)
            }
        };

        Mark.Cleanup = function () {
            window.clearInterval(idTmr);
            CollectGarbage();
        };

        Mark.tableToExcel = (function () {
            var uri = 'data:application/vnd.ms-excel;base64,',
                // 格式化导出表格的样式
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
                    + '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
                    + '</x:ExcelWorkbook></xml><![endif]-->' +
                    ' <style type="text/css">' +
                    '.excelTable  {border-collapse:collapse; border:thin solid #999;}' +
                    '.excelTable  th { padding:20px; text-align: center; border: thin solid #999;background-color: #E6E6E6;}' +
                    '.excelTable  td{border:thin solid #999;padding:2px 5px;text-align: center;}</style>' +
                    '</head><body ><table class="excelTable">{table}</table></body></html>',
                base64 = function (s) {
                    return window.btoa(unescape(encodeURIComponent(s)))
                },
                format = function (s, c) {
                    return s.replace(/{(\w+)}/g, function (m, p) {
                        return c[p];
                    });
                };
            return function (table, name) {
                if (name.length === 0) {
                    name = '导出Excel信息';
                }
                if (!table.nodeType) {
                    table = document.getElementById(table);
                }
                var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
                // window.location.href = uri + base64(format(template, ctx))
                var downloadLink = document.createElement("A");
                downloadLink.href = uri + base64(format(template, ctx));
                // downloadLink.download = name + '_' + formatTime(new Date(new Date().getTime()),'yyyy-mm-dd hh:ii:ss')+'.xls';
                downloadLink.download = name + '_' + new Date(new Date().getTime() + 8 * 3600 * 1000).toJSON().substr(0, 19).replace('T', ' ') + '.xls';

                downloadLink.target = '_blank';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
        })();

        /**
         * 扩展String对象,添加查找字符串出现的次数
         *
         * @param str str 要测试的字符串
         * @returns {number}
         */
        String.prototype.findCount = function (str) {
            return this.split(str).length - 1;
        };

        /**
         * 复制字符串
         *
         * @param str 要复制的字符串
         * @param num 要复制的次数
         * @returns {string} 复制后的字符串
         */
        function copy(str, num) {
            var tmp = '';
            for (var i = 0; i < num; i++) {
                tmp += str;
            }
            return tmp;
        }

        /******************************/


    });

}());

/**==================== jQuery实现的全选、反选和不选功能（End） ====================**/
