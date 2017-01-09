var index=2;
function delete_btn(s){
	$(s).remove();
}

function select_t(s){
    if($(s).val()=="select"){
		$(s).parent().next().find("input").attr('placeholder',"1=男装|2=女装|3=内衣");
	}else{
		$(s).parent().next().find("input").removeAttr('placeholder');
	}
}
$(function(){
	$("select[name=type]").change(function(){
		if($(this).val()==1){
			$("#p1").hide();
			$("#p2").show();
		}else{
			$("#p2").hide();
			$("#p1").show();
		}
	});

	$("#add_btn").click(function(){
		var obj="<div id='add_div"+index+"'>" +
				"<fieldset>" +
				"<p><span>名称:</span><input type='text' name='paramName"+index+"' /></p>"+
				"<p><span>code:</span><input type='text' name='paramCode"+index+"'/></p>"+
				"<p><span>类型:</span>"+
				   "<select name='paramType"+index+"' onchange='select_t(this);'>"+
					"<option value='text'>字符串</option>"+
					"<option value='date'>日期</option>"+
					"<option value='select'>下拉列表</option>"+
                 " </select>"+
				"</p>"+
				"<p><span>值:</span><input type='text' name='paramValue"+index+"' /></p>"+
				"<p><span>排序:</span><input type='text' name='paramSort"+index+"' value='"+index+"' readonly/></p>"+
				"<p align='right'><input  type='button' value='删除' onclick='delete_btn(add_div"+index+")'/></p>"+
				"</fieldset>"+
				"</div>";
		     index++;
			$("#param_div").append(obj);			
	});
	$("#present_btn").click(function(){
		$("input[name=index]").val(index);
		$("#form_id").attr('action','add.htm').submit();
		alert("提交报表成功");
	});
	
	$("#list_btn").click(function(){
		window.location.href="list.htm";
	});
	
	
})