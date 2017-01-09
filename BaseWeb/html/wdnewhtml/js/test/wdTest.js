/*chenfei*/

//验证类
function testClass(name){
	this.key=name;
	this.value="";
	return this;
}
//验证数组
var testArray=[];
//根据testClass的name在testArray数组中查询
Array.prototype.findTestClass=function(name){
	for(i=0;i<this.length;i++){
		if(this[i].key==name){
			return this[i];
		}
	}
	return false;
}
//载入需要验证的条目
function loadTest(){
	for(i=0;i<arguments.length;i++){
		testArray.push(new testClass(arguments[i]));
	}
}
//初始化验证条目的值为true
function defaultTrueTest(){
	for(i=0;i<testArray.length;i++){
		testArray[i].value=true;
	}
}
//改变对应验证条目的结果
function changeTest(c,v){
	testArray.findTestClass(c).value=v;
}
//判断验证结果
function testResult(){
	for(i=0;i<testArray.length;i++){
		if(!testArray[i].value){
			return "";
		}
	}
	return true;
}
//判断单个的结果
function testOne(c){
	return testArray.findTestClass(c).value;
}