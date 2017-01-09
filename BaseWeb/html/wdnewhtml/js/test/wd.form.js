/**
 * @author chenfei
 * 提交框架
 */
var _WD_FROM = 'WD_FORM';
(function(wd_form,window){
	
	var _wd_form = window[wd_form];
	
	if(!_wd_form){
		_wd_form = {};
	}
	
	_wd_form.submit ={
			
		param : function() {
			
		    	var dataParam = {};
		    	
		    	$.each($('input,select,textarea'),function(i,v){
		    		var name = $(v).attr('name');
		    		if (!!name) {
		    			var type = $(v).attr('type');
		        		var value = $(v).val();
		    			switch (type) {
		    			case "radio" :
		    				if (v.checked){
		    					dataParam[name] = value;
		    				}
		    				break;
		    			case "checkbox" :
		    				if (v.checked) {
		    					if (!!dataParam[name]) {
		    						dataParam[name].push(value);
		    					} else {
		    						dataParam[name] = [value];
		    					}
		    				}
		    				break;
		    			default :
		    				dataParam[name] = value;
		    			}
		    		}
		    	});
		    	return dataParam;
		    },
		post : function(check,url,callback,dataType){
			if(check && callback && check()){
				$.post(url,this.param(),callback,dataType);
			}
		}
	}
	
	window[wd_form] = _wd_form; 
    
})(_WD_FROM,window);