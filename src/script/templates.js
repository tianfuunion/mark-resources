//*****-----		新建&修改节点窗口

var addnodeDialogTemp = template.compile(
'<form id="addnode" name="addnode" method="post" action="javascript:;">'+
	'<div class="folderInput"><input type="text" class="folderName" id="folderName" name="title" placeholder="<%=title%>"></div>'+
	'<div class="folderText"><textarea type="text" class="folderNode" id="folderNode" name="note" placeholder="<%=note%>"></textarea></div>'+
	'<div class="folderNameError">节点名称不能只包含空字符!</div>'+
'</form>'
);