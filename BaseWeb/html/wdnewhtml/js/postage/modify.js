var projectPath=$('#project_path').val();

//增长行号
var rowId=parseInt($('#max_row_id').val());
var postageTemplate = JSON.parse($('#json_postage_template').val());
var checkIf = JSON.parse($('#check_if').val());

$(function(){
	
	for(var i=0;i<types.length;i++){
		if(! postageTemplate.findById(types[i])){
			var p = new postageType(types[i]);
			var pi = new postageItem(rowId,1,'','','','','','');
			var pip = new province(0,'全国') ;
			pip.cities = 'all';
			pi.destinations.push(pip);
			p.postageItems.push(pi);
			postageTemplate.push(p);
			rowId++;
		}
	}
	
	$('#province').change(function(){
		//城市生成
		$('#cityId').remove();
		var provinceId=$(this).val();
		$.get(projectPath+'/location/getCities.json?'+new Date().getTime(),{'provinceId':provinceId},function(data){
			var select='<select id="cityId" name="startingId">';
			for(var i=0;i<data.length;i++){
				select+='<option value="'+data[i].id+'">'+data[i].name+'</option>';
			}
			select+='</select>';
			$('#province').after(select);
		},"json");
		$('#city_message').text('');
	});
	
	$('#unitCheck input:radio').click(function(){
		//单位生成
		var unit=parseInt($(this).val());
		switch(unit){
			case 1:
				$('.unit').text('件');
				$('.unitName').text('件');	
				break;
			case 2:
				$('.unit').text('Kg');
				$('.unitName').text('重');
				break;
			case 3:
				$('.unit').text('Cm^3');
				$('.unitName').text('体积');
				break;
		}
	});
	
	$('#undertakeCheck input:radio').click(function(){
		//是否承担运费 选择显示
		var undertake=parseInt($(this).val());
		switch(undertake){
			case 1:
				$('#undertake_div').show();
				break;
			case 2:
				$('#undertake_div').hide();
				break;
		}
	});
	
	$('.type_choose').click(function(){
		//EMS、快递、平邮等选择显示
		if(this.checked){
			$(this).next('div.DivExpress').show();
		}else{
			$(this).next('div.DivExpress').hide();
		}
	});
	
	for(var i = 0 ; i < checkIf.length ; i++){
		if(checkIf[i].flag){
			$('.type_choose[value="'+checkIf[i].id+'"]').click();
		}
	}
	
	$('#closeDivlocation').click(function(){ 
		$('#province_check li span').removeClass('clickcityCheck');
		$('#location_check').hide();
		$('#location_check2').hide();
	})
	
	$('#province_check input[type="checkbox"]').click(function(){
		if(this.checked){
			var c=new province($(this).val(),$(this).next('label').text());
			c.cities='all';
			snapCities.push(c);
			snapPool.push(c);
		}else if(snapCities.findById($(this).val())){
			snapPool.remove(snapPool.findById($(this).val()));
			snapCities.remove(snapCities.findById($(this).val()));
		}
	});
	
	
});


function addPostageItem(type){
	$('.add_postageItem_div_'+type).show();
	var html='<tr data="'+rowId+'" typeVal="'+type+'">'
				+'<td>'
					+'<div class="mark1">未添加地区</div>'
					+'<span class="EditorArea" onclick="editDestination('+rowId+');">编辑</span>'
				+'</td>'
				+'<td>'
					+'<input type="text" onblur="editFirstCount(this,'+rowId+');" class="referData"/>'
				+'</td>'
				+'<td>'
					+'<input type="text" onblur="editClientFirstPrice(this,'+rowId+');" class="pr referData" />'
					+'<input type="text" onblur="editWholesalerFirstPrice(this,'+rowId+');" class="pr referData"/>'
				+'</td>'
				+'<td>'
					+'<input type="text" onblur="editSecondCount(this,'+rowId+');" class="referData"/>'
				+'</td>'
				+'<td>'
					+'<input type="text" onblur="editClientSecondPrice(this,'+rowId+');" class="pr referData"/>'
					+'<input type="text" onblur="editWholesalerSecondPrice(this,'+rowId+');" class="pr referData"/>'
				+'</td>'
				+'<td>'
					+'<span class="DelEditorArea" onclick="deletePostageItem('+rowId+')">删除</span>'
				+'</td>'
			+'</tr>';
	$('.add_postageItem_div_'+type).find('tbody').append(html);
	postageTemplate.findById(type).postageItems.push(new postageItem(rowId,0,'','','','','',''));
	rowId++;
}

function deletePostageItem(id){
	var size=$('tr[data="'+id+'"]').parent('tbody').children('tr').length;
	var type=$('tr[data="'+id+'"]').attr('typeVal');
	if(size==2){
		$('.add_postageItem_div_'+type).hide();
	}
	$('tr[data="'+id+'"]').remove();
	postageTemplate.findById(type).postageItems.remove(postageTemplate.findById(type).postageItems.findById(id));
}

function editDestination(id){
	var type=$('tr[data="'+id+'"]').attr('typeVal');
	
	operaRowId=id;
	
	snapCities=new Array();
	snapCities.addDeepArray(postageTemplate.findById(type).postageItems.findById(id).destinations);
	
	snapPool=new Array();
	
	for(var i = 0;i < postageTemplate.findById(type).postageItems.length;i++){
		for(var j=0;j < postageTemplate.findById(type).postageItems[i].destinations.length ; j ++){
			if(snapPool.findById(postageTemplate.findById(type).postageItems[i].destinations[j].id)){
				snapPool.findById(postageTemplate.findById(type).postageItems[i].destinations[j].id).cities.addDeepArray(postageTemplate.findById(type).postageItems[i].destinations[j].cities);
			}else{
				snapPool.push($.extend(true,{},postageTemplate.findById(type).postageItems[i].destinations[j]));
			}
		}
	}
	var $_dom=$('tr[data="'+id+'"]').find('td').eq(0);
	var divcss={
			top:$_dom.offset().top+50+"px",
			left:$_dom.offset().left+"px"
			};
	var type=$('tr[data="'+id+'"]').attr('typeVal');
	$('#province_check input[type="checkbox"]').each(function(i){
		if(!snapPool.findById($(this).val())){
			//可选未选
			$(this).prop("checked",false);
			$(this).prop("disabled",false);
		}else if(snapCities.findById($(this).val()) && snapCities.findById($(this).val()).cities == "all"){
			//可选已选
			$(this).prop("checked",true);
			$(this).prop("disabled",false);
		}else{
			//不可选未选
			$(this).prop("checked",false);
			$(this).prop("disabled",true);
		}
	});
	$('#location_check').css(divcss).show();
}

function referProvince(){
	if($('#location_check2').is(":visible")){
		$('#choose_city_button').click();
	}
	var type=$('tr[data="'+operaRowId+'"]').attr('typeVal');
	postageTemplate.findById(type).postageItems.findById(operaRowId).destinations=snapCities;
	var destinationsName='';
	for(var i=0;i<snapCities.length;i++){
		if(! snapCities[i].cities){
			//为空 不做处理
		}else if(snapCities[i].cities == 'all'){
			destinationsName += snapCities[i].name+' ';
		}else{
			for(var j=0;j<snapCities[i].cities.length;j++){
				destinationsName += snapCities[i].cities[j].name + ' ';
			}
		}
	}
	if(! destinationsName){
		$('tr[data="'+operaRowId+'"]').find('div.mark1').html('未添加地区');
	}else{
		$('tr[data="'+operaRowId+'"]').find('div.mark1').html(destinationsName);
	}
	$('#location_check').hide();
}

function cityCheck(dom){
	$('#province_check li span').removeClass('clickcityCheck');
	$(dom).parent().addClass('clickcityCheck');
	var provinceId=$(dom).parent().find('input[type="checkbox"]').val();
	var provinceName=$(dom).parent().find('label').text();
	operaProvince=new province(provinceId,provinceName);
	$.get(projectPath+'/location/getCities.json?'+new Date().getTime(),{'provinceId':provinceId},function(data){
		var li='';
		for(var i=0;i<data.length;i++){
			li+='<li style="float:left;width:80px;font-size:12px">';
				if(snapCities.findById(provinceId) && (snapCities.findById(provinceId).cities == "all" || snapCities.findById(provinceId).cities.findById(data[i].id))){
					//已选可选
					li += '<input type="checkbox" value="'+data[i].id+'" checked/>';
				}else if(snapPool.findById(provinceId) && (snapPool.findById(provinceId).cities == "all" || snapPool.findById(provinceId).cities.findById(data[i].id)) ){
					//未选不可选
					li += '<input type="checkbox" value="'+data[i].id+'" disabled/>';
				}else{
					//可选未选
					li += '<input type="checkbox" value="'+data[i].id+'"/>';
				}
				li += '<span>'+data[i].name+'</span></li>'
		}
		$('#city_check').html(li);
		var divcss={
				top:$(dom).offset().top+10+"px",
				left:$(dom).offset().left-51+"px"
				};
		
		$('#location_check2').css(divcss).show();
		
	},"json");
}

function referCity(){
	var isAll=true;
	if(! snapCities.findById(operaProvince.id)){
		snapCities.push($.extend(true,{},operaProvince));
	}else{
		snapCities.findById(operaProvince.id).cities=new Array();
	}
	$('#city_check input[type="checkbox"]').each(function(i){
		if(this.checked){
			snapCities.findById(operaProvince.id).cities.push(new city($(this).val(),$(this).next('span').text()));
		}else{
			isAll=false;
		}
	});
	if(isAll){
		$('#province_check').find('input[type="checkbox"][value="'+operaProvince.id+'"]').prop('checked',true);
		snapCities.findById(operaProvince.id).cities="all";
	}else{
		$('#province_check').find('input[type="checkbox"][value="'+operaProvince.id+'"]').prop('checked',false);
		if(snapCities.findById(operaProvince.id).cities.length == 0){
			snapCities.remove(snapCities.findById(operaProvince.id));
		}
	} 
	$('#province_check li span').removeClass('clickcityCheck');
	$('#location_check2').hide();
}

function editFirstCount(dom,id){
	var type=$('tr[data="'+id+'"]').attr('typeVal');
	var firstCount=$(dom).val();
	if(isNaN(firstCount)){
		alert("请输入正确的数字");
	}else{
		postageTemplate.findById(type).postageItems.findById(id).firstCount = firstCount;
	}
}
function editClientFirstPrice(dom,id){
	var type=$('tr[data="'+id+'"]').attr('typeVal');
	var clientFirstPrice=$(dom).val();
	if(isNaN(clientFirstPrice)){
		alert("请输入正确的数字");
	}else{
		postageTemplate.findById(type).postageItems.findById(id).clientFirstPrice = clientFirstPrice;
	}
}
function editWholesalerFirstPrice(dom,id){
	var type=$('tr[data="'+id+'"]').attr('typeVal');
	var wholesalerFirstPrice=$(dom).val();
	if(isNaN(wholesalerFirstPrice)){
		alert("请输入正确的数字")
	}else{
		postageTemplate.findById(type).postageItems.findById(id).wholesalerFirstPrice = wholesalerFirstPrice;
	}
}
function editSecondCount(dom,id){
	var type=$('tr[data="'+id+'"]').attr('typeVal');
	var secondCount=$(dom).val();
	if(isNaN(secondCount)){
		alert("请输入正确的数字");
	}else{
		postageTemplate.findById(type).postageItems.findById(id).secondCount = secondCount;
	}
}
function editClientSecondPrice(dom,id){
	var type=$('tr[data="'+id+'"]').attr('typeVal');
	var clientSecondPrice=$(dom).val();
	if(isNaN(clientSecondPrice)){
		alert("请输入正确的数字");
	}else{
		postageTemplate.findById(type).postageItems.findById(id).clientSecondPrice = clientSecondPrice;
	}
}
function editWholesalerSecondPrice(dom,id){
	var type=$('tr[data="'+id+'"]').attr('typeVal');
	var wholesalerSecondPrice=$(dom).val();
	if(isNaN(wholesalerSecondPrice)){
		alert("请输入正确的数字");
	}else{
		postageTemplate.findById(type).postageItems.findById(id).wholesalerSecondPrice = wholesalerSecondPrice;
	}
}
function referForm(){
	/**
	 * 此处验证是暂时的， 没有找到效率遍历 postageTemplate的方法
	 */
	//模板名称
	if(! $('#template_name').val()){
		alert("请输入正确的模板名称");
		return;
	}
	//起始城市
	if(! $('#cityId').val()){
		alert("请选择城市");
		return;
	}
	//文本输入
	var pass = true;
	$('.type_choose').each(function(i){
		if(this.checked){
			$(this).next('div').find('.referData').each(function(){
				var referData = $(this).val();
				if(!referData || isNaN(referData) ){
					pass = false;
					alert("请正确输入参数");
					return false;
				}
			});
			$(this).next('div').find('.mark1').each(function(){
				var mark = $(this).text();
				if(mark == '未添加地区'){
					pass = false;
					alert("请编辑城市");
					return false;
				}
			});
			if(! pass ){
				return false;
			}
		}
	});
	if(pass){
		//去除未勾选
		$('.type_choose').each(function(i){
			if(! this.checked){
				var type=$(this).val();
				postageTemplate.remove(postageTemplate.findById(type));
			}
		});
		//赋值
		$('#postageItems').val(JSON.stringify(postageTemplate));
		//提交
		$('#form1').attr('action',projectPath+"/postage/modify.htm").submit();
	}
}
