;!(function(){
	'use strict';

/**
 * 多级联动选择器
 * 1、声明式视图：编写基本框架，
 <pre>
 <div data-toggle="multipicker" data-level="3" title="多级联动"></div>


 $("#distpicker2").distpicker({
   province:"---- 所在省 ----",
   city:"---- 所在市 ----",
   district:"---- 所在区 ----"
 });

 </pre>
 */

// $.fn.multipicker = function(params) {};
var opt;

// $.fn.multipicker = function (options,option,jsonData) {
$.fn.multipicker = function (option,jsonData) {
	console.time("multipicker");
	console.info(this,$(this).data("level"));
	console.info(gettype(option),gettype(jsonData));
	console.info(option["title"], jsonData);

var select_dom = '<select name="first" required value="" class="form-control mk-select" -data-am-selected="{searchBox: 1}">';
for(var i=0,len=option.length;i<len;i++){
	console.info(option[i]);
	select_dom+='<option value="'+jsonData[i]["buildingid"]+'">'+jsonData[i]["name"]+'</option>';
}
select_dom+='</select>';
$(this).append(select_dom);


$('[name="first"]').change(selectchange($(this)));


if(Array.isArray(option)){
	console.info("Options：数据非数组 isArray True");
}else{
	console.info("Options：数据非数组");
}

console.timeEnd("multipicker");

};
/**
 * Select Charge事件
 *
 1、当前节点变化事件时，更新下一节点的内容

 */
function selectchange(that){
	console.info(that,that.data("level"));
/*
	$('#selCountry').children().not(':eq(0)').remove();
	iNum2 = $(this).children('option:selected').index();
	var aaCountry = aCountry[iNum1-1][iNum2-1];
	for(var k=0;k<aaCountry.length;k++){
		$('#selCountry').append('<option>'+aaCountry[k]+'</option>');
	}
*/
}

window.addEventListener("pageshow",function () {
 // console.log(document.querySelector('body'));

// 联动布局
var multipicker = $("[data-toggle='multipicker']");

//联动级别
var multilevel = multipicker.attr('[data-level]');

if(multipicker == true){
	console.info("已开启多级联动选择", multipicker);
 }else{
//	console.log("未开启多级联动选择");
 }


 });


} ());


(function($) {
    var opt;

    $.fn.jqprint = function (options) {
        opt = $.extend({}, $.fn.jqprint.defaults, options);

        var $element = (this instanceof jQuery) ? this : $(this);

        if (opt.operaSupport && $.browser.opera) {
            var tab = window.open("","jqPrint-preview");
            tab.document.open();

            var doc = tab.document;
        }else{
            var $iframe = $("<iframe  />");

            if (!opt.debug) { $iframe.css({ position: "absolute", width: "0px", height: "0px", left: "-600px", top: "-600px" }); }

            $iframe.appendTo("body");
            var doc = $iframe[0].contentWindow.document;
        }

        if (opt.importCSS){
            if ($("link[media=print]").length > 0)
            {
                $("link[media=print]").each( function() {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' media='print' />");
                });
            }
            else
            {
                $("link").each( function() {
                    doc.write("<link type='text/css' rel='stylesheet' href='" + $(this).attr("href") + "' />");
                });
            }
        }

        if (opt.printContainer) { doc.write($element.outer()); }
        else { $element.each( function() { doc.write($(this).html()); }); }

        doc.close();

        (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).focus();
        setTimeout( function() { (opt.operaSupport && $.browser.opera ? tab : $iframe[0].contentWindow).print(); if (tab) { tab.close(); } }, 1000);
    }

    $.fn.jqprint.defaults = {
		debug: false,
		importCSS: true,
		printContainer: true,
		operaSupport: true
	};

    // Thanks to 9__, found at http://users.livejournal.com/9__/380664.html
    jQuery.fn.outer = function() {
      return $($('<div></div>').html(this.clone())).html();
    }
})(jQuery);