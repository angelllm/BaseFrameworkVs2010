/**
 * @author chenfei
 */
var projectPath = $('#project_path').val();
var jsPath = $('#js_path').val();
var image_path = $('#image_path').val();

$(function () {
    $(".person").hide();
    $("#cbkCompany").click(function () {
        $(".person").hide();
        $(".company").show();
    });
    $("#cbkPerson").click(function () {
        $(".person").show();
        $(".company").hide();
    });
    //加载验证镜像
    loadGroup('basic','company','person');
    
    loadItem('basic','name','email','cellphone','password','bankAccountName','bankAccountId','bankName','bankAddress');
    loadItem('company','companyName','companyRegId','companyAddress','companyOrganizationCodeCertificate','companyRegImage');
    loadItem('person','trueName','idCardNumber','identityImage1');
    //验证
    var basic =['name','email','cellphone','password','bankAccountName','bankAccountId','bankName','bankAddress'];
    $.each(basic,function(index,item){
    	var $_dom = $('input[name="'+item+'"]');
    	var remark =$_dom.prev('label').text().replace(/(\s|：|:)/g,"");
    	$_dom.blur(function(){
    		if(!$_dom.val()){
    			$_dom.next('span').text(remark+'不可为空');
    			changeItemValue('basic',item,false);
    			return;
    		}else if(item == 'name'|| item == 'email' || item == 'cellphone' || item == 'password'){
    			var param = $_dom.val();
    			if(item == 'name' && ! WD.regular.userName.test(param)){
    				
    				$_dom.next('span').text('用户名格式不正确');
    				changeItemValue('basic',item,false);
    				return;
    				
    			}else if(item == 'email' && ! WD.regular.email.test(param)){
    				
    				$_dom.next('span').text('邮箱格式不正确');
    				changeItemValue('basic',item,false);
    				return;
    				
    			}else if(item == 'cellphone' && ! WD.regular.mobile.test(param)){
    				
    				$_dom.next('span').text('手机格式不正确');
    				changeItemValue('basic',item,false);
    				return;
    				
    			}else if(item == 'password'){
    				
    				if(!WD.regular.pwd.test(param)){
    					
    					$_dom.next('span').text('密码格式不正确');
        				changeItemValue('basic',item,false);
        				return;
        				
    				}else{
    					
    					$_dom.next('span').text('');
        				changeItemValue('basic',item,true);
        				return;
        				
    				}
    			}else{
    				
    				$.get(projectPath+'/manage/checkItem.json?'+new Date().getTime(),{'checkItem':item,'param':param},function(res){
        				if(res.flag){
        					
        					$_dom.next('span').text('');
        					changeItemValue('basic',item,true);
        					return;
        					
        				}else{
        					
        					$_dom.next('span').text(remark+'不可重复');
        					changeItemValue('basic',item,false);
        					return;
        					
        				}
        			},"json");
    			}
    		}else{
    			
    			$_dom.next('span').text('');
    			changeItemValue('basic',item,true);
    			return;
    			
    		}
    	});
    });
    var company = ['companyName','companyRegId','companyAddress','companyOrganizationCodeCertificate'];
    $.each(company,function(index,item){
    	var $_dom = $('input[name="'+item+'"]');
    	var remark = $_dom.prev('label').text().replace(/(\s|：)/g,"");
    	$_dom.blur(function(){
    		if(!$_dom.val()){
    			$_dom.next('span').text(remark+'不可为空');
    			changeItemValue('company',item,false);
    			return;
    		}else{
    			$_dom.next('span').text('');
    			changeItemValue('company',item,true);
    			return;
    		}
    	});
    });
    var person =['trueName','idCardNumber'];
    $.each(person,function(index,item){
    	var $_dom = $('input[name="'+item+'"]');
    	var remark = $_dom.prev('label').text().replace(/(\s|：)/g,"");
    	$_dom.blur(function(){
    		if(!$_dom.val()){
    			$_dom.next('span').text(remark+'不可为空');
    			changeItemValue('person',item,false);
    			return;
    		}else{
    			$_dom.next('span').text('');
    			changeItemValue('person',item,true);
    			return;
    		}
    	});
    });
    
    $("#file_business_license").uploadify({
		"id" : "file_business_license",
		"swf" : jsPath + "/uploadify/uploadify.swf",
		"uploader" : projectPath+"/file/upload.json",
		"buttonText" : " 上&nbsp;传&nbsp;文&nbsp;件 ",
		"buttonClass" : "ScanBut",
		"fileTypeExts" : "*.jpg;*.png;*.gif",
		"fileObjName" : "upload_file",
		"fileSizeLimit" : "1000KB",
		"width" : 70,
		onUploadSuccess : function(file, data, flag) {
			$('input[name="companyRegImage"]').val($.parseJSON(data).fileList[0].path);
			changeItemValue('company','companyRegImage',true);
		}
	});
    $("#file_business_license-queue").hide();
    
    $("#file_id_number").uploadify({
		"id" : "file_id_number",
		"swf" : jsPath + "/uploadify/uploadify.swf",
		"uploader" : projectPath+"/file/upload.json",
		"buttonText" : " 上&nbsp;传&nbsp;文&nbsp;件 ",
		"buttonClass" : "ScanBut",
		"fileTypeExts" : "*.jpg;*.png;*.gif",
		"fileObjName" : "upload_file",
		"fileSizeLimit" : "1000KB",
		"width" : 70,
		onUploadSuccess : function(file, data, flag) {
			$('input[name="identityImage1"]').val($.parseJSON(data).fileList[0].path);
			changeItemValue('person','identityImage1',true);
		}
	});
    $("#file_id_number-queue").hide();
    
    $('#service').on('click',function(){
    	if(this.checked){
    		$('input[name="service"]').val(1);
    	}else{
    		$('input[name="service"]').val(0);
    	}
    });
    
    $('#subForm').on('click',function(){
    	var select = false;
    	$.each($('input[name="categories"]'),function(index,value){
    		if(value.checked){
    			select =true;
    		}
    	});
    	if(select){
	    	WD_FORM.submit.post(function(){
	        	var flag = true;
	        	if($('#cbkCompany')[0].checked){
	        		if(! testResult('basic','company')){
	        			alert('公司信息输入有误');
	        			flag = false;
	        		}
	        	}
	        	if($('#cbkPerson')[0].checked){
	        		if(! testResult('basic','person')){
	        			alert('个人信息输入有误');
	        			flag = false;
	        		}
	        	}
	        	return flag;
	        },
	        projectPath + '/manage/add.json?'+new Date().getTime(),
	        function(res){
	        	if(res.flag){
	    			WD.ui.alert(res.msg, function(){
	    			window.location.href = projectPath+"/manage/add.htm";
	    			}, 2000);
	    		}
	        },
	        "json"
	        );
    	}else{
    		alert('至少选择一种经营范围');
    	}
    });
});

