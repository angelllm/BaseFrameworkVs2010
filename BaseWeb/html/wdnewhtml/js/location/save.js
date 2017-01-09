$(function(){
	$('#closeDivlocation').click(function(){ 
		$('#province_check li span').removeClass('clickcityCheck');
		$('#location_check').hide();
		$('#location_check2').hide();
	})
	//省份列表点击事件
	$('#province').click(function(){
		//移除城市列表
		$('#cityId').remove();
		//根据省份id发送ajax请求，加载城市列表
		var provinceId=$(this).val();
		$.get('getCities.json?'+new Date().getTime(),{'provinceId':provinceId},function(data){
			var select='<select id="cityId" name="startLocationId">';
			for(var i=0;i<data.cities.length;i++){
				select+='<option value="'+data.cities[i].cityId+'">'+data.cities[i].cityName+'</option>';
			}
			select+='</select>';
			$('#province').after(select);
		},"json");
		//移除无选择提示
		$('#city_message').text('');
	});
	$('#unitCheck input:radio').click(function(){
		//单位生成
		var type=parseInt($(this).val());
		switch(type){
			case 1:$('#unit').val('件');
			break;
			case 2:$('#unit').val('Kg');
			break;
			case 3:$('#unit').val('Cm^3');
			break;
		}
		$('.unit').text($('#unit').val());
	});
	$('#typeCheck input:checkbox').click(
		//EMS、快递、平邮等选择显示
		function(){
			if(this.checked){
				$(this).parent().children('div').show();
			}else{
				$(this).parent().children('div').hide();
			}
		}
	);
	//根据配置参数加载初始配置
	for(var i=0;i<type.length;i++){
		items[type[i]]=new Array();
		var ids=new Array();
		var item1=new item(row_id,ids,1,1,0,1,0);
		$('.default_item input[type="hidden"]').eq(i).val(row_id);
			items[type[i]].push(item1);
			row_id++;
		}
	});
	//行号唯一
	var row_id=0;
	//配置参数、type_加上type_id 
	var type=['type_0','type_1','type_2'];
	//增加一行给指定城市添加邮费
	function addPostage(dom){
		//显示表头
	$(dom).parent('div').prev().show();
	//得到type_id对应的配置参数
	var type='type_'+$(dom).parent('div').parent('div').prev('input').val();
	//行号
	row_id++;
	var html='<tr>'
				+'<td>'
					+'<input type="hidden" value="'+row_id+'"/>'
					+'<div class="mark1">未添加地区</div>'
					+'<span class="EditorArea" onclick="editPostage(this);">编辑</span>'
				+'</td>'
				+'<td>'
					+'<input type="text" value="1" onblur="editFirstCount(this);"/>'
				+'</td>'
				+'<td>'
					+'<input type="text" onblur="editFirstPrice(this);" class="pr" /><input type="text" onblur="editFirstPrice(this);" " class="pr"/>'
				+'</td>'
				+'<td>'
					+'<input type="text" value="1" onblur="editSecondCount(this);"/>'
				+'</td>'
				+'<td>'
					+'<input type="text" onblur="editSecondPrice(this);" class="pr"/><input type="text" onblur="editSecondPrice(this);" class="pr"/>'
				+'</td>'
				+'<td>'
					+'<span class="DelEditorArea" onclick="deletePostage(this)">删除</span>'
				+'</td>'
			+'</tr>';
	$(dom).parent('div').prev().children('table').find('tbody').append(html);
	//初始化此行的城市数组
		var ids=new Array();
		var i=new item(row_id,ids,0,1,0,1,0);
		items[type].push(i);
	}
	//删除行
	function deletePostage(dom){
		//等到此type_id对应参数下行的数目，当行数为2时，隐藏表头
	var size=$(dom).parent('td').parent('tr').parent('tbody').children('tr').length;
	if(size==2){
		$(dom).parent('td').parent('tr').parent('tbody').parent('table').parent('div').hide();
	}
	//先求值，再删
	var rowId=$(dom).parent('td').parent('tr').children(':first').children('input:hidden').val();
	//先删除配置中元素，再移除显示的行
	var type='type_'+$(dom).parent('td').parent('tr').parent('tbody').parent('table').parent('div').parent('div').prev('input').val();
	items[type].remove(items[type].findItem(rowId));
	$(dom).parent('td').parent('tr').remove();
		
	}
	function editPostage(dom){
		//定位当前选择的行，给定class标示
	$('.mark1').removeClass('mark2');
	$(dom).prev().addClass('mark2');
	//显示省份选择框，并加以判断
	var divcss={
		top:$(dom).offset().top+40+"px",
		left:$(dom).offset().left-220+"px"
		};
	var rowId=$(dom).prev().prev('input').val();
	var type='type_'+$(dom).parent('td').parent('tr').parent('tbody').parent('table').parent('div').parent('div').prev('input').val();
	$('#province_check input').each(function(i){
		//初始化选择
		$(this).attr("checked",false);
		$(this).attr("disabled",false);
		if(items[type].findItem(rowId).ids.findCity($(this).val())){
			if(items[type].findItem(rowId).ids.findCity($(this).val()).ids.length==0){
				$(this).prop("checked",true);
				$(this).prop("disabled",false);
			}else{
				$(this).prop("disabled",true);
			}
		}else if(totalCitiesByType(type).findCity($(this).val())){
			$(this).prop("disabled",true);
		}
	});
	$('#location_check').css(divcss).show();
	//给当前行设置定位参数
	$('#row_id_choose').val(rowId);
	$('#type_choose').val(type);
		cities=new Array();
	}
	function referProvince(dom){
		$('#province_check li span').removeClass('clickcityCheck');
		//根据选择修改提交参数
	//如果打开城市选择框，在点击省份确定时，默认先点击城市确认
	if(!$('#location_check2').is(':hidden')){
		$('#choose_city_button').click();
	}
	//等到当前行定位参数
	var rowId=$('#row_id_choose').val();
	var type=$('#type_choose').val();
	
	
	for(var i=0;i<items[type].findItem(rowId).ids.length;i++){
		if(items[type].findItem(rowId).ids[i].ids.length==0){
			items[type].findItem(rowId).ids.splice(i,1);
		}
	}
	$('#province_check input').each(function(i){
		if(this.checked){
			var newIds=new Array();
			var pId=$(this).val();
			var c=new cityPool(pId,newIds);
			items[type].findItem(rowId).ids.push(c);
		}
	});
	for(var j=0;j<cities.length;j++){
		if(items[type].findItem(rowId).ids.findCity(cities[j].id)){
			if(cities[j].ids){
				items[type].findItem(rowId).ids.findCity(cities[j].id).ids=cities[j].ids;
			}else{
				items[type].findItem(rowId).ids.remove(items[type].findItem(rowId).ids.findCity(cities[j].id));
			}
		}else{
			if(cities[j].ids){
				items[type].findItem(rowId).ids.push(cities[j]);
			}
		}
	}
	$(dom).parent().hide();
	//显示选择的城市名
	var cityIds=new Array();
	for(var i=0;i<items[type].findItem(rowId).ids.length;i++){
		if(items[type].findItem(rowId).ids[i].ids.length!=0){
			cityIds.addArray(items[type].findItem(rowId).ids[i].ids);
		}else{
			cityIds.push(items[type].findItem(rowId).ids[i].id);
		}
	}
	if(cityIds.length!=0){
		$.get('getCityName.json?'+new Date().getTime(),{'cityIds':cityIds.join(',')},function(data){
			$('.mark2').text(data);
		},'text');
	}else{
		$('.mark2').text('未添加城市');
		}
	}
	function cityCheck(dom){
		//根据点击省份的id生成城市选择框并加以判断
	$('#province_check li span').removeClass('clickcityCheck');
	$(dom).parent().addClass('clickcityCheck');
	var provinceId=$(dom).prev().val();
	var rowId=$('#row_id_choose').val();
	var type=$('#type_choose').val();
	
	$.get('getCities.json?'+new Date().getTime(),{'provinceId':provinceId},function(data){
		var li='';
		for(var i=0;i<data.cities.length;i++){
			li+='<li style="float:left;width:80px;font-size:15px">'
				+'<input type="checkbox" value="'+data.cities[i].cityId+'"/>'
				+'<span>'+data.cities[i].cityName+'</span></li>'
		}
		$('#city_check').html(li);
		$('#city_check input').each(function(i){
		//初始化
			$(this).attr("checked",false);
			$(this).attr("disabled",false);
			if(items[type].findItem(rowId).ids.findCity(provinceId)&&items[type].findItem(rowId).ids.findCity(provinceId).ids.length==0){
				$(this).prop("checked",true);
				$(this).prop("disabled",false);
			}else if(items[type].findItem(rowId).ids.findCity(provinceId)){
				if(items[type].findItem(rowId).ids.findCity(provinceId).ids.in_array($(this).val())){
					$(this).prop("checked",true);
					$(this).prop("disabled",false);
				}else if(totalCitiesByType(type).findCity(provinceId).ids.in_array($(this).val())){
					$(this).prop("disabled",true);
				}
			}else if(totalCitiesByType(type).findCity(provinceId)&&totalCitiesByType(type).findCity(provinceId).ids.in_array($(this).val())){
				$(this).prop("disabled",true);
			}else if(totalCitiesByType(type).findCity(provinceId)&&totalCitiesByType(type).findCity(provinceId).ids.length==0){
				$(this).prop("disabled",true);
			}
		});
	},"json");
	var divcss={
		top:$(dom).offset().top+10+"px",
		left:$(dom).offset().left-51+"px"
		};
	$('#location_check2').css(divcss).show();
	$('#province_id_choose').val(provinceId);
	}
	function referCity(dom){
		$('#province_check li span').removeClass('clickcityCheck');
		var provinceId=$('#province_id_choose').val();
	var ids=new Array();
	var all=true;
	$('#city_check input').each(function(i){
		if(this.checked){
			ids.push($(this).val());
		}else{
			all='';
		}
	});
	$(dom).parent().hide();
	if(cities.length!=0&&cities.findCity(provinceId)){
		if(ids.length!=0&&!all){
			cities.findCity(provinceId).ids=ids;
		}else if(ids.length!=0){
			cities.findCity(provinceId).ids=new Array();
		}else{
			cities.findCity(provinceId).ids='';
		}
	}else{
		if(ids.length!=0&&!all){
			var i=new cityPool(provinceId,ids);
			cities.push(i);
		}else if(ids.length!=0){
			var i=new cityPool(provinceId,new Array());
			cities.push(i);
		}else{
			var i=new cityPool(provinceId,'');
				cities.push(i);
			}
		}
	alert(JSON.stringify(cities));
	}
	function item(rowId,ids,isDefault,firstCount,firstPrice,secondCount,secondPrice){
		this.rowId=rowId;
		this.ids=ids;
		this.isDefault=isDefault;
		this.firstCount=firstCount;
		this.firstPrice=firstPrice;
		this.secondCount=secondCount;
		this.secondPrice=secondPrice;
		return this;
	}
	function cityPool(id,ids){
		this.id=id;
		this.ids=ids;
		return this;
	}
	function totalCitiesByType(param){
		var t=new Array();
			for(var i=0;i<items[param].length;i++){
				for(var j=0;j<items[param][i].ids.length;j++){
					if(t.findCity(items[param][i].ids[j].id)){
						var ids_=new Array();
						ids_.addArray(t.findCity(items[param][i].ids[j].id).ids);
						ids_.addArray(items[param][i].ids[j].ids);
						t.findCity(items[param][i].ids[j].id).ids=ids_;
					}else{
						var i_=items[param][i].ids[j].id;
						var ids_=items[param][i].ids[j].ids;
						t.push(new cityPool(i_,ids_));
					}
				}
			}
		return t;
	}
	function editFirstCount(dom){
		var type='type_'+$(dom).parent('td').parent('tr').parent('tbody').parent('table').parent('div').parent('div').prev('input').val();
	var rowId=$(dom).parent('td').parent('tr').find(':first').find(':first').val();
		items[type].findItem(rowId).firstCount=$(dom).val();
	}
	function editFirstPrice(dom){
		var type='type_'+$(dom).parent('td').parent('tr').parent('tbody').parent('table').parent('div').parent('div').prev('input').val();
	var rowId=$(dom).parent('td').parent('tr').find(':first').find(':first').val();
		items[type].findItem(rowId).firstPrice=$(dom).val();
	}
	function editSecondCount(dom){
		var type='type_'+$(dom).parent('td').parent('tr').parent('tbody').parent('table').parent('div').parent('div').prev('input').val();
	var rowId=$(dom).parent('td').parent('tr').find(':first').find(':first').val();
		items[type].findItem(rowId).secondCount=$(dom).val();
	}
	function editSecondPrice(dom){
		var type='type_'+$(dom).parent('td').parent('tr').parent('tbody').parent('table').parent('div').parent('div').prev('input').val();
	var rowId=$(dom).parent('td').parent('tr').find(':first').find(':first').val();
		items[type].findItem(rowId).secondPrice=$(dom).val();
		
	}
	function editDefaultFirstCount(dom){
		var type='type_'+$(dom).parent('div').parent('div').prev('input').val();
	var rowId=$(dom).parent('div').find('input[type="hidden"]').val();
		items[type].findItem(rowId).firstCount=$(dom).val();
	}
	function editDefaultFirstPrice(dom){
		var type='type_'+$(dom).parent('div').parent('div').prev('input').val();
	var rowId=$(dom).parent('div').find('input[type="hidden"]').val();
		items[type].findItem(rowId).firstPrice=$(dom).val();
	}
	function editDefaultSecondCount(dom){
		var type='type_'+$(dom).parent('div').parent('div').prev('input').val();
	var rowId=$(dom).parent('div').find('input[type="hidden"]').val();
		items[type].findItem(rowId).secondCount=$(dom).val();
	}
	function editDefaultSecondPrice(dom){
		var type='type_'+$(dom).parent('div').parent('div').prev('input').val();
	var rowId=$(dom).parent('div').find('input[type="hidden"]').val();
		items[type].findItem(rowId).secondPrice=$(dom).val();
	}
	//生成提交数据
	function referForm(){
		alert(JSON.stringify(items));
		$('.type_choose').each(function(i){
		if(!this.checked){
			var type='type_'+$(this).val();
			items[type]=undefined;
		}
	});
	var itemsJson=JSON.stringify(items);
	//alert(JSON.stringify(totalCitiesByType('type_0')));
	//alert(itemsJson);
	$('#postageItems').val(itemsJson);
	var url='save.htm';
	$('#form1').attr('action',url).submit();
	}
	//自定义数组函数
	var items={}
	var cities=new Array();
	//判断数组中是是否包含某元素
	Array.prototype.in_array=function(e){
		for(i=0;i<this.length&&this[i] !=e;i++);
		return !(i==this.length);
	}
	//根据rowId找到对应的元素
	Array.prototype.findItem=function(rowId){
		for(i=0;i<this.length;i++){
			if(this[i].rowId==rowId){
				return this[i];
			}
		}
		return false;
	}
	//根据rowId判断数组中是否包含该元素
	Array.prototype.in_myArray=function(rowId){
		for(i=0;i<this.length&&this[i].rowId !=rowId;i++);
		return !(i==this.length)
	}
	//查询元素在数组中的下标
	Array.prototype.indexOf = function(val) {
	    for (var i = 0; i < this.length; i++) {
	        if (this[i] == val) return i;
	    }
	    return -1;
	}
	//根据元素下标移除元素
	Array.prototype.remove = function(val) {
	    var index = this.indexOf(val);
	    if (index > -1) {
	        this.splice(index, 1);
	    }
	    return this;
	}
	//给指定数组更加数组中的元素
	Array.prototype.addArray = function(array) {
		for(i=0;i<array.length;i++){
			this.push(array[i]);
		}
		return this;
	}
	//根据id找到对应的元素
	Array.prototype.findCity = function(id) {
		for(i=0;i<this.length;i++){
			if(this[i].id==id){
				return this[i];
			}
		}
		return false;
	}