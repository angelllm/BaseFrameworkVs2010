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
				$('#tagList').html('');
			}else{
				showTags(parentId);
			}
		},"json");
	}
	function showTags(parentId){
		$.get('getTags.json?'+new Date(),{'parentId':parentId},function(data){
			var html='<fieldset><legend>默认标签</legend>';
			for(var i=0;i<data.length;i++){
				html+='<span><input type="hidden" value="'+data[i].id+'"/>'
						+'<span>'+data[i].name
						+'</span>&nbsp;<span style="color:red;">'+data[i].orderBy
						+'</span>&nbsp;<input type="button" value="删除" onclick="deleteTag(this);"/>'
						+'<input type="button" value="修改" onclick="modifyTag(this);"/></span>&nbsp;';
			}
			html+='</fieldset>名称<input type="text"/>排序<input type="text" style="width:40px;"/><input type="button" value="增加标签" onclick="saveTag(this);"/>';
			$('#category_choose').html('');
			$('#tagList').html(html);
		},"json");
	}
	function deleteTag(dom){
		var r = window.confirm("确定要删除此标签？");
		if(r){
			var id=$(dom).parent('span').find('input[type="hidden"]').val();
			$.get('deleteTag.json?'+new Date(),{'id':id},function(data){
				if(data){
					showMessage();
					$('#catelog span:last').click();
				}
			},"text");
		}
	}
	function modifyTag(dom){
		var name=$(dom).parent('span').find('span').eq(0).text();
		var orderBy=$(dom).parent('span').find('span').eq(1).text();
		var id=$(dom).parent('span').find('input[type="hidden"]').val();
		var html='<input type="hidden" value="'+id+'"/>'
				+'名称<input type="text" value="'+name+'" style="width:60px;"/>'
				+'排序<input type="text" value="'+orderBy+'" style="width:40px;"/>'
				+'<input type="button" value="确定" onclick="defineModifyTag(this);"/>'
				+'<input type="button" value="取消" onclick="cancelModefyTag();"/>';
		$(dom).parent().html(html);
	}
	function defineModifyTag(dom){
		var name=$(dom).parent().find('input[type="text"]').eq(0).val();
		var orderBy=$(dom).parent().find('input[type="text"]').eq(1).val();
		var id=$(dom).parent().find('input[type="hidden"]').val();
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
			$.get('modifyTag.json?'+new Date(),{'id':id,'name':name,'orderBy':orderBy},function(data){
				if(data){
					$('#catelog span:last').click();
					showMessage();
				}
			},"text");
		}
	}
	function cancelModefyTag(){
		$('#catelog span:last').click();
	}
	function saveTag(dom){
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
		$.get('saveTag.json',{'parentId':parentId,'name':name,'orderBy':orderBy},function(data){
			if(data){
				showMessage();
				$('#catelog span:last').click();
			}
		},"text");
	}
	function showMessage(){
		$('#message').show();
		window.setTimeout(function(){
			$('#message').hide();
		},1000);
	}