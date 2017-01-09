	function del_s(s,id_s){
			//confirm("确定要删除吗?");
    		$("#"+id_s).remove();
    		var id=$(s).prev().html();
    		$.get('delete_sku.htm',
    				{"id":id},
    				function(data){
    					//alert(data);
    				},'text');
    	}
	function listChild(id, categoryArray) {
	    		var list = [];
	    		for (var i=0;i<categoryArray.length;i++) {
	    			if (categoryArray[i].parentId == id) {
	    				var cate = categoryArray[i];
	    				cate.children = listChild(cate.id, categoryArray);
	    				list.push(cate);
	    			}
	    		}
	    		return list;
	    	}
	    	
    	
		$(function () {
					
			var type=1;
	    	
	    	var children = [];
	    	for (var i=0;i<categoryArray.length;i++){
	    		var cate = categoryArray[i];
	    		if (cate.parentId==0&&cate.parentId!="") {
	    			children.push(cate);
	    		}
	    	}
	    	var child;
	    	for(var i=0;i<children.length;i++){
	    		child=children[i];
	    		child.children=listChild(child.id,categoryArray);
	    	}
	    	//alert(JSON.stringify(children));
	    	
			$('#jstree2').jstree(
			{'plugins':["wholerow"], 'core' : {
				'data' : [
					{
						"text" : "类目",
						"children" : children
					}
				]
			}});
			
			$('.check_radio').click(function(){
				$("#value_s").val($(this).attr('id'));
				//$('input[name=type]').val($(this).attr('value'))
		});
			var k=1;
			var index=0;
			var j=0;
			var arr=["颜色","尺寸","型号"];
		$("#btn_form").click(function(){
				var type=$('input[name=type]').val();
				var order=$('input[name=order]').val();
				var value=$('input[name=value_id]').val();
				var categoryId=$("#txtSelectedValue").val();
				if(!isNaN(order)){
					$.get(
							'insert_sku.htm',
							{"type":type,"order":order,"value":value,"categoryId":categoryId},
							function(data){
									$('input[name=order]').val(eval($('input[name=order]').val())+100+"");
									var html="";
									if(k%2!=0){
											html+="<div class='grey_2' id='dedd_"+index+"'>";
										    k++;
									}
									else{
										    html+="<div class='white' id='dedd_"+index+"'>";
										    k++;
									}    
									        html+="<div class='wordcolor'>"+data.type+"</div>";
											html+="<div class='picturecolor'><span class="+data.cssClass+">"+data.value+"</span></div>";
											html+="<b>"+data.order+"</b>";
											html+="<b style='display:none'>"+data.id+"</b>";
											html+="<div class='picture' onclick='del_s(this,\"dedd_"+index+"\")'></div>";
											html+="</div>";
											index++;
									$("#div_s").append(html);
							},'json');
				}
				
		});		
				$("#p1_class").click(function(){
					            j=0;
								$('.background').removeClass().attr('class','background1');
								$(this).removeClass().attr('class','background');
								$("#color_type01").show();
								$("#color_type02").hide();
								$("#color_type03").hide();	
								$('input[name=type]').val(arr[j]);
				});
				$("#p2_class").click(function(){
					 j=1;
					$('.background').removeClass().attr('class','background1');
					$(this).removeClass().attr('class','background');
					$("#color_type02").show();
					$("#color_type01").hide();
					$("#color_type03").hide();
					$('input[name=type]').val(arr[j]);
				});
				$("#p3_class").click(function(){
					 j=2;
					$('.background').removeClass().attr('class','background1');
					$(this).removeClass().attr('class','background');
					$("#color_type03").show();
					$("#color_type01").hide();
					$("#color_type02").hide();
					$('input[name=type]').val(arr[j]);
				});
				
		});
		