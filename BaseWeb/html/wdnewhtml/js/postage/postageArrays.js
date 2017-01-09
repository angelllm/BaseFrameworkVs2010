//定义省份 模拟类
function province(id,name){
	this.id=id;
	this.name=name;
	this.cities=new Array();
	return this;
}
//定义城市 模拟类
function city(id,name){
	this.id=id;
	this.name=name;
	return this;
}

//定义邮费详细条目 模拟类
function postageItem(id,isDefault,firstCount,clientFirstPrice,wholesalerFirstPrice,secondCount,clientSecondPrice,wholesalerSecondPrice){
	this.id=id;
	this.isDefault=isDefault;
	//存放省份
	this.destinations=new Array();
	this.firstCount=firstCount;
	this.clientFirstPrice=clientFirstPrice;
	this.wholesalerFirstPrice=wholesalerFirstPrice;
	this.secondCount=secondCount;
	this.clientSecondPrice=clientSecondPrice;
	this.wholesalerSecondPrice=wholesalerSecondPrice;
	return this;
}

//定义邮费类型 模拟类
function postageType(id){
	this.id=id;
	this.postageItems=new Array();
	return this;
}



//邮费类型的基本配置 增加类型需要改变
var types=$('#mode_ids').val().split('');

//定位id
var operaRowId='';
var operaProvince='';
//存放临时数据
var snapCities=[];
var snapPool=[];

Array.prototype.findById=function(id){
	for(var _i=0;_i<this.length;_i++){
		if(this[_i].id==id){
			return this[_i];
		}
	}
	return false;
}

Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
}

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
    return this;
}

Array.prototype.addDeepArray = function(array) {
	for(var _i=0;_i<array.length;_i++){
		this.push($.extend(true,{},array[_i]));
	}
	return this;
}
