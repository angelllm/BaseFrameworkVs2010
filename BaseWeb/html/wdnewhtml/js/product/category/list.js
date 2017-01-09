function chooseCategory(dom){
		var parentId=$(dom).children('input[type="hidden"]').val();
		var span='<span onclick="chooseCatelog(this);"><a href="#" style="text-decoration:none"><input type="hidden" value="'+parentId+'"/>'+$(dom).text()+'&gt;</a></span>';
		$('#catelog').append(span);
		showCategories(parentId);
	}
	function chooseCatelog(dom){
		$(dom).nextAll().remove();
		var parentId=$(dom).find('input[type="hidden"]').val();
		showCategories(parentId);
	}
	function showCategories(parentId){
		$.get('getCategories.json?'+new Date(),{'parentId':parentId},function(data){
			if(data.length!=0){
				var html='';
				for(var i=0;i<data.length;i++){
					html+='<span onclick="chooseCategory(this);">'
							+'<input type="hidden" value="'+data[i].id+'"/>'
							+data[i].name+'</span>&nbsp;';
				}
				$('#category_choose').html(html);
				$('#parameter_choose').html('');
				$('#param_default').html('');
			}else{
				showCategoryParameters(parentId);
			}
		},"json");
	}
	function showCategoryParameters(parentId){
		$.get('getParameters.json?'+new Date(),{'parentId':parentId},function(data){
			var html='<fieldset><legend>属性</legend>';
			for(var i=0;i<data.length;i++){
				html+='<span><input type="hidden" value="'+data[i].id+'"/>'
						+'<span onclick="showParamDefault(this);">'+data[i].name
						+'</span><input type="text" disabled value="'+data[i].orderBy+'" style="width:40px;"/>'
						+'<input type="button" value="删除" onclick="deleteParameter(this);"/>'
						+'<input type="button" value="修改" onclick="modifyParameter(this);"/></span>&nbsp;';
			}
			html+='</fieldset><input type="text"/><input type="text" style="width:40px;"/><input type="button" value="增加属性" onclick="saveParameter(this);"/>';
			$('#category_choose').html('');
			$('#parameter_choose').html(html);
			$('#parameter_choose span:first span:first').click();
		},"json");
	}
	function showParamDefault(dom){
		$(dom).addClass('checked');
		$(dom).parent('span').siblings().find('span').removeClass('checked');
		var parentId=$(dom).prev('input[type="hidden"]').val();
		$.get('getDefault.json?'+new Date(),{'parentId':parentId},function(data){
			var html='<fieldset><legend>默认值</legend>';
			for(var i=0;i<data.length;i++){
				html+='<span><input type="hidden" value="'+data[i].id+'"/>'
						+'<span>'+data[i].name+'</span>'
						+'<input type="button" value="删除" onclick="deleteDefault(this);"/>'
						+'<input type="button" value="修改" onclick="modifyDefault(this);"/>'
						+'</span>&nbsp;';
			}
			html+='</fieldset><input type="text"/><input type="button" value="增加默认值" onclick="saveDefault(this);"/>';
			$('#param_default').html(html);
		},"json");
	}
	function deleteParameter(dom){
		var r = window.confirm("确定要删除此属性及属性下的默认值？");
		if(r){
			var id=$(dom).parent('span').find('input[type="hidden"]').val();
			$.get('deleteParameter.json?'+new Date(),{'id':id},function(data){
				if(data){
					showMessage();
					$('#catelog span:last').click();
				}
			},"text");
		}
	}
	function modifyParameter(dom){
		var name=$(dom).parent('span').find('span').text();
		var orderBy=$(dom).parent('span').find('input[type="text"]').val();
		var id=$(dom).parent().find('input[type="hidden"]').val();
		var html='<input type="hidden" value="'+id+'"/>'
				+'<input type="text" value="'+name+'" style="width:60px;"/>'
				+'<input type="text" value="'+orderBy+'" style="width:40px;"/>'
				+'<input type="button" value="确定" onclick="defineModifyParam(this);"/>'
				+'<input type="button" value="取消" onclick="cancelModefyParam();"/>';
		$(dom).parent().html(html);
	}
	function defineModifyParam(dom){
		var id=$(dom).parent().find('input[type="hidden"]').val();
		var name=$(dom).parent().find('input[type="text"]').eq(0).val();
		var orderBy=$(dom).parent().find('input[type="text"]').eq(1).val();
		if(!name){
			$('#message span').text('名称不可为空');
			$('#message').show();
				window.setTimeout(function(){
					$('#message span').text('操作成功');
					$('#message').hide();
				},1000);
			$('#catelog span:last').click();
		}else{
			if(!orderBy){
				orderBy=0;
			}
			$.get('modifyParameter.json?'+new Date(),{'id':id,'name':name,'orderBy':orderBy},function(data){
				if(data){
					$('#catelog span:last').click();
					showMessage();
				}
			},"text");
		}
	}
	function cancelModefyParam(){
		$('#catelog span:last').click();
	}
	function saveParameter(dom){
		var parentId=$('#catelog span:last input[type="hidden"]').val();
		var name=$(dom).prev('input[type="text"]').prev('input[type="text"]').val();
		var orderBy=$(dom).prev('input[type="text"]').val();
		if(!name){
			$('#message span').text('名称不可为空');
			$('#message').show();
			window.setTimeout(function(){
				$('#message span').text('操作成功');
				$('#message').hide();
			},1000);
			return;
		}
		if(!orderBy){
			orderBy=0;
		}
		$.get('saveParameter.json',{'parentId':parentId,'name':name,'orderBy':orderBy},function(data){
			if(data){
				showMessage();
				$('#catelog span:last').click();
			}
		},"text");
	}
	function deleteDefault(dom){
		var r = window.confirm("确定要删除此默认值？");
		if(r){
			var id=$(dom).parent('span').find('input[type="hidden"]').val();
			$.get('deleteDefault.json?'+new Date(),{'id':id},function(data){
				if(data){
					showMessage();
					$('.checked').click();
				}
			},"json");
		}
	}
	function modifyDefault(dom){
		var name=$(dom).prev().prev('span').text();
		var id=$(dom).parent().find('input[type="hidden"]').val();
		var html='<input type="hidden" value="'+id+'"/>'
				+'<input type="text" value="'+name+'"/>'
				+'<input type="button" value="确定" onclick="defineModifyDefault(this);"/>'
				+'<input type="button" value="取消" onclick="cancelModefyDefault();"/>';
		$(dom).parent().html(html);
	}
	function defineModifyDefault(dom){
		var id=$(dom).parent().find('input[type="hidden"]').val();
		var name=$(dom).prev('input[type="text"]').val();
		if(!name){
			$('#message span').text('名称不可为空');
			$('#message').show();
				window.setTimeout(function(){
					$('#message span').text('操作成功');
					$('#message').hide();
				},1000);
			$('.checked').click();
		}else{
			$.get('modifyDefault.json?'+new Date(),{'id':id,'name':name},function(data){
				if(data){
					$('.checked').click();
					showMessage();
				}
			},"text");
		}
	}
	function cancelModefyDefault(){
		$('.checked').click();
	}
	function saveDefault(dom){
		var parentId=$('.checked').prev('input[type="hidden"]').val();
		var name=$(dom).prev('input[type="text"]').val();
		if(!name){
			$('#message span').text('名称不可为空');
			$('#message').show();
			window.setTimeout(function(){
				$('#message span').text('操作成功');
				$('#message').hide();
			},1000);
			return;
		}
		$.get('saveDefault.json?'+new Date(),{'parentId':parentId,'name':name},function(data){
			if(data){
				showMessage();
				$('.checked').click();
			}
		},"json");
	}
	function showMessage(){
		$('#message').show();
		window.setTimeout(function(){
			$('#message').hide();
		},1000);
	}