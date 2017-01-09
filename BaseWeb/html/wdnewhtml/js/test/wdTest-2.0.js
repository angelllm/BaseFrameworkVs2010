/**
* <editor> chenfei
* 把需要验证的条目 模拟成json格式
*/
//需要验证的项 模拟类 key-value
function testItem(name){
	this.name=name;
	this.value=false;
	return this;
}
//需要验证的作用域 模拟类
function testGroup(name){
	this.name=name;
	this.group=new Array();
	return this;
}
//存放验证数据的数组
var testArray=[];
//加载需要验证的作用域
function loadGroup(){
	for(i=0;i<arguments.length;i++){
		testArray.push(new testGroup(arguments[i]));
	}
}
//加载需要验证的项 
function loadItem(){
	//第一个参数是作用域
	for(i=1;i<arguments.length;i++){
		testArray.findTest(arguments[0]).group.push(new testItem(arguments[i]));
	}
}
//根据数组中元素的name进行查找
Array.prototype.findTest=function(name){
	for(_i=0;_i<this.length;_i++){
		if(this[_i].name==name){
			return this[_i];
		}
	}
	return false;
}
//改变项的值
function changeItemValue(g,n,v){
	testArray.findTest(g).group.findTest(n).value=v;
}
//验证结果
function testResult(){
	if(arguments.length==0){
		for(i=0;i<testArray.length;i++){
			for(j=0;j<testArray[i].group.length;j++){
				if(!testArray[i].group[j].value){
					return false;
				}
			}
		}
		return true;
	}else{
		for(i=0;i<arguments.length;i++){
			for(j=0;j<testArray.findTest(arguments[i]).group.length;j++){
				if(!testArray.findTest(arguments[i]).group[j].value){
					return false;
				}
			}
		}
		return true;
	}
}