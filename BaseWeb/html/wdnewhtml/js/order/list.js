/**
 * @author chenfei
 * 管理员 订单列表
 */

var projectPath = $('#project_path').val();
var webPath = $('#web_path').val();
var integer_reg = /^[1-9][0-9]*$/;
var number_reg = /^([+-]?)[0-9]*\.?[0-9]+$/;

$(function(){
	//搜索
	$('#search_button').on('click',function(){
		
		var startDate = $('#u_startDate').val();
		var endDate = $('#u_endDate').val();
		
		
		if(startDate && endDate && (new Date(startDate.replace(/-/g,"/")) > new Date(endDate.replace(/-/g,"/")))){
			alert('起始时间不能大于终止时间');
			return;
		}else{
			$('#opera_product_name').val($('#u_product_name').val());
			$('#opera_start_time').val($('#u_startDate').val());
			$('#opera_end_time').val($('#u_endDate').val());
			$('#opera_status').val($('#u_status').val());
			$('#opera_order_sn').val($('#u_orderSn').val());
			$('#opera_seller_name').val($('#u_seller_name').val());
			$('#opera_buyer_name').val($('#u_buyer_name').val());
			//默认第一页
			$('#opera_page_no').val(1);
			
			$('#form1').attr('action',projectPath+"/order/list.htm").submit();
		}
	});
	
	//重置
	$('#reset_button').on('click',function(){
		$('#u_product_name').val('');
		$('#u_startDate').val('');
		$('#u_endDate').val('');
		$('#u_status').val('');
		$('#u_orderSn').val('');
		$('#u_seller_name').val('');
		$('#u_buyer_name').val('');
	});
	
	//页数跳转
	$('#jumpPageBtn').on('click',function(){
		var jumpPageNo = $('#jumpPageNo').val();
		var pageNo = $('#pageNo').val();
		var totalPage = $('#totalPage').val();
		
		if(! jumpPageNo){
			alert('请输入页数');
			return;
		}else if(! integer_reg.test(jumpPageNo)){
			alert('请输入正整数');
			return;
		}else if(parseInt(jumpPageNo) > parseInt(totalPage)){
			alert('超过最大页数');
			return;
		}else if(parseInt(jumpPageNo) != parseInt(pageNo)){
			gotoPage(jumpPageNo);
		}
	});
	
	//显示操作
	$(".modify-price").click(function () {
		var orderId = $(this).attr('order_id');
		var productPrice = $(this).attr('order_product_price');
		var postagePrice = $(this).attr('order_postage_price');
		var $this = $(this);
		
		$.post(projectPath+"/order/getDetail.json?"+new Date().getTime(),{'orderId':orderId},function(res){
			var jsonResult = {};
			var jsonParam =[];
			jsonResult.items = jsonParam;
			jsonResult.orderId = orderId;
			var content = '<div class="tbl-waper">' + 
								'<h3>订单原价<span>(不含运费):</span><font>'+parseFloat(productPrice).toFixed(2)+'</font></h3>'+
								'<table cellpadding="0" cellspacing="0" class="tmp-tbl">'+
									'<tr class="th">'+
										'<td width="40%">产品名称</td>'+
										'<td width="10%">单价(元)</td>'+
										'<td width="10%">数量</td>'+
										'<td width="25%" class="ques">'+
											'<span>涨价或折扣</span>'+
											'</td>'+
										'<td>邮费(元)</td> '+
										'</tr>'+
										'<tr>'+
			                				'<td colspan="4" >'+
			                					'<table cellpadding="0" cellspacing="0" class="tbl-item" style="width:94%">'+
			                						'<tbody>';
			for(var i = 0 ; i < res.length ; i ++){
				
				content += '<tr class="discount_item">'+
    							'<td width="40%">'+
    								'<label><a href="'+webPath+'/product/item.htm?id='+res[i].productId+'" target="_blank">'+res[i].productName+'</a></label>'+
    							'</td>'+
    							'<td width="10%">'+parseFloat(res[i].price).toFixed(2)+'</td>'+
    							'<td width="10%">'+res[i].count+'</td>'+
    							'<td width="18%">'+
    								'<input type="text" class="txt-input discount" value="" onblur="discount(this);" price="'+res[i].price+'"/>'+
    								'<span>折=</span>'+
    								'<input type="text" class="txt-input discount_result" value="'+res[i].discountAmt+'" order_id="'+res[i].id+'" total_amt="'+res[i].totalAmt+'" price="'+res[i].price+'" count="'+res[i].count+'" onblur="changePrice(this)"/>'+
    							'</td>'+
    						'</tr> ';
			}
			content +=  	'</tbody>'+
						'</table>'+
					'</td>'+
					'<td  class="vtat" width="10%" >'+
						'<p>买家支付邮费</p>'+
						'<input type="text" class="txt-modify postage_modify" value="'+parseFloat(postagePrice).toFixed(2)+'" />'+
					'</td>'+
				'</tr> '+
			'</table>'+
		'</div>';
			var dia = art.dialog({
	        	title: '订单价格修改',
	            content: content,
	            follow: $this[0],
	            ok: function () {
	            	$.each($('.discount_item .discount_result'),function(){
	            		var itemId = $(this).attr('order_id');
	            		var itemCount = $(this).val();
	            		var totalAmt = $(this).attr('total_amt');
	            		if(! number_reg.test(itemCount)){
	            			alert('请填写格式正确的价格');
	            			return false;
	            		}else{
	            			var jsonItem = {};
		            		jsonItem.id = itemId;
		            		jsonItem.discount = itemCount;
		            		jsonItem.totalAmt = totalAmt;
		            		jsonParam.push(jsonItem);
	            		}
	            	});
	            	var modifyPostage = $('.postage_modify').val();
	            	if(! number_reg.test(modifyPostage)){
	            		alert('请填写正确格式的邮费');
	            		return false;
	            	}else{
	            		jsonResult.postagePrice = modifyPostage;
	            	}
	            	$.post(projectPath+"/order/discount.json?"+new Date().getTime(),{'param':JSON.stringify(jsonResult)},function(res){
	            		if(res.flag){
	            			alert(res.msg);
	            			gotoPage($('#pageNo').val());
	            		}else{
	            			alert(res.msg);
	            			jsonResult.items = [];//清空
	            		}
	            	},"json");
	            	return false;
	             }
	             ,
	             okVal: '确认修改'
	         });
			
		},"json");
     });
	
	//显示 关闭理由窗口/标记窗口
    $(".close,.no-mark,.has-mark").click(function () {
         $(".model").hide();
         var model = $(this).next(".model");
         model.show().attr("data", 1).find("textarea").focus();
    });
    //关闭 关闭理由窗口/标记窗口
    $(".closetag").click(function () {
         $(".model").hide();
         //$(this).parent().attr("data", 0);
    });
    
    //提交 标记内容
    $('.btn-reason-sure').on('click',function(){
    	var content = $(this).parent().find('textarea').val();
    	var id = $(this).attr('data');
    	var $_this = $(this).parent();
    	if(!content){
    		alert('请输入标记内容');
    		return;
    	}else{
    		$_this.hide();
    		$.post(projectPath+"/order/remark.json?"+new Date().getTime(),{'id':id,'content':content},function(res){
    			if(res.flag){
					alert(res.msg);
					gotoPage($('#pageNo').val());
    			}else{
    				$_this.show();
    				alert('网络故障');
    			}
    		},"json");
    	}
    });
    
    //显示 确认发货窗口 -- 合并发货 算整个order的邮费
    $(".postage").click(function () {
    	 var orderId = $(this).attr('order_id');
    	 var realPostagePrice = $(this).attr('postage_price');
    	 var postageType = $(this).attr('postage_type');
         var $this = $(this);
         //计算邮费
         $.post(projectPath+'/order/countOrderPostage.json?'+new Date().getTime(),{'orderId':orderId},function(res){
        	 if(res.flag){
        		 var content = '<div class="tbl-postage">';
        		 var check_express = '<div><input type="radio" name="rdo_postage" value="-1" onclick="ableExpress(this);" {0}/><span>快递</span>&nbsp;<select onchange="changePostage(this);">';
                 var exists_express = false;
        		 $.each(res.express,function(key,value){
        			 if(value.expressCode == postageType){
        				 if(value.expressCode == 2 || value.expressCode == 3){
 	   						content += '<div><input type="radio" name="rdo_postage" value="'+value.expressCode+'" checked onclick="changePostage(this);" data="'+value.realPrice+'"/><span>'+value.name+'</span>'; 
 	   					 }else{
 	   						exists_express = true;
 	   						check_express = check_express.replace('{0}','checked');
 	   						check_express += '<option value='+value.expressCode+' data='+value.realPrice+'>'+value.name+'</option>';
 	   					 }
        			 }else{
        				 if(value.expressCode == 2 || value.expressCode == 3){
 	   						content += '<div><input type="radio" name="rdo_postage" value="'+value.expressCode+'" onclick="changePostage(this);" data="'+value.realPrice+'"/><span>'+value.name+'</span>'; 
 	   					}else{
 	   						exists_express = true;
 	   						check_express += '<option value='+value.expressCode+' data='+value.realPrice+'>'+value.name+'</option>';
 	   					}
        			 }
        		 });
        		 check_express += '</select></div>';
        		 if(exists_express){
        			 content += check_express;
        		 }
        		 content += '<div><font>快递单号:</font><font>邮费:</font><div class="clear"></div></div>'+
      						'<div><font><input type="text" id="postage_sn"/></font><font><input type="text" value="'+parseFloat(realPostagePrice).toFixed(2)+'" id="postage_price_real"/></font>'+
      						'<div class="clear"></div></div>'+
      					'</div>';
        		 var dia = art.dialog({
                     title: '发货处理',
                     content: content,
                     follow: $this[0],
                     ok: function () {
                    	 if(! $('#postage_sn').val()){
                    		 alert('请填写快递单号');
                    		 return false;
                    	 }else if(! number_reg.test($('#postage_price_real').val())){
                    		 alert('请填写正确格式的运费');
                    		 return false;
                    	 }else{
                    		
                    		var postageType = $('input[name="rdo_postage"]:checked').val() == -1 ? $('input[name="rdo_postage"]:checked').parent().find('select').val() : $('input[name="rdo_postage"]:checked').val();
                    		var postageSn = $('#postage_sn').val();
                    		realPostagePrice = $('#postage_price_real').val();
                    		
                    		$.post(projectPath+"/order/totalShip.json?"+new Date().getTime(),{'orderId':orderId,'postageType':postageType,'postageSn':postageSn,'realPostagePrice':realPostagePrice},function(res){
                    			if(res.flag){
                    				alert(res.msg);
                    				gotoPage($('#pageNo').val());
                    			}else{
                    				alert(res.msg);
                    			}
                    		},"json");
                    		return false;
                    	 }
                     }
                     ,
                     okVal: '确认发货'
                 });
        	 }else{
        		 alert('网络异常');
        	 }
         },"json");
     });
    
    //显示 确认发货窗口 -- 单独平台发货 以sellerId独立出一个新包 算
    $('.alone_postage').on('click',function(){
    	var orderId = $(this).attr('order_id');
    	var sellerId = $(this).attr('seller_id');
    	var postageType = $(this).attr('postage_type');
    	var $this = $(this);
    	
    	$.post(projectPath+'/order/countSellerPostage.json?'+new Date().getTime(),{'orderId':orderId,'sellerId':sellerId},function(res){
    		if(res.flag){
    			 var content = '<div class="tbl-postage">';
    			 var realPostagePrice = 0;
    			 var check_express = '<div><input type="radio" name="rdo_postage" value="-1" onclick="ableExpress(this);" {0}/><span>快递</span>&nbsp;<select onchange="changePostage(this);">';
    		     var exists_express = false;
    		     
    			 $.each(res.express,function(key,value){
    				 if(value.expressCode == postageType){
    					 realPostagePrice = value.realPrice;
    					 if(value.expressCode == 2 || value.expressCode == 3){
 	   						content += '<div><input type="radio" name="rdo_postage" value="'+value.expressCode+'" checked onclick="changePostage(this);" data="'+value.realPrice+'"/><span>'+value.name+'</span>'; 
 	   					 }else{
 	   						exists_express = true;
 	   						check_express = check_express.replace('{0}','checked');
 	   						check_express += '<option value='+value.expressCode+' data='+value.realPrice+'>'+value.name+'</option>';
 	   					 }
    				 }else{
    					 if(value.expressCode == 2 || value.expressCode == 3){
 	   						content += '<div><input type="radio" name="rdo_postage" value="'+value.expressCode+'" onclick="changePostage(this);" data="'+value.realPrice+'"/><span>'+value.name+'</span>'; 
 	   					}else{
 	   						exists_express = true;
 	   						check_express += '<option value='+value.expressCode+' data='+value.realPrice+'>'+value.name+'</option>';
 	   					}
    				 }
    			 });
    			 check_express += '</select></div>';
   				 if(exists_express){
 	   				content += check_express;
 	   			 }
    			 content += '<div><font>快递单号:</font><font>邮费:</font><div class="clear"></div></div>'+
					'<div><font><input type="text" id="postage_sn"/></font><font><input type="text" value="'+parseFloat(realPostagePrice).toFixed(2)+'" id="postage_price_real"/></font>'+
					'<div class="clear"></div></div>'+
				'</div>';
		 		 var dia = art.dialog({
		              title: '发货处理',
		              content: content,
		              follow: $this[0],
		              ok: function () {
		             	 if(! $('#postage_sn').val()){
		             		 alert('请填写快递单号');
		             		 return false;
		             	 }else if(! number_reg.test($('#postage_price_real').val())){
		             		 alert('请填写正确格式的运费');
		             		 return false;
		             	 }else{
		             		
		             		var postageType = $('input[name="rdo_postage"]:checked').val() == -1 ? $('input[name="rdo_postage"]:checked').parent().find('select').val() : $('input[name="rdo_postage"]:checked').val();
		             		var postageSn = $('#postage_sn').val();
		             		realPostagePrice = $('#postage_price_real').val();
		             		
		             		$.post(projectPath+"/order/aloneShip.json?"+new Date().getTime(),{'orderId':orderId,'sellerId':sellerId,'postageType':postageType,'postageSn':postageSn,'realPostagePrice':realPostagePrice},function(res){
		             			if(res.flag){
		             				alert(res.msg);
		             				gotoPage($('#pageNo').val());
		             			}else{
		             				alert(res.msg);
		             			}
		             		},"json");
		             		return false;
		             	 }
		              }
		              ,
		              okVal: '确认发货'
		          });
    		}else{
    			alert('网络异常');
    		}
    	},"json");
    });
    
    //卖家发货
    $('.seller_postage').on('click',function(){
    	if(window.confirm("确定转为卖家发货")){
    		var orderId = $(this).attr('order_id');
        	var sellerId = $(this).attr('seller_id');
        	var postageType = $(this).attr('postage_type');
        	
        	$.post(projectPath+'/order/sellerShip.json?'+new Date().getTime(),{'orderId':orderId,'sellerId':sellerId,'postageType':postageType},function(res){
        		if(res.flag){
        			alert(res.msg);
        			gotoPage($('#pageNo').val());
        		}else{
        			alert(res.msg);
        		}
        	},"json");
    	}
    });
    
    //全选
    $('.allCheck').on('click',function(){
    	if(this.checked){
    		$.each($('.itemCheck'),function(){
        		$(this).prop('checked',true);
        	});
    	}else{
    		$.each($('.itemCheck'),function(){
        		$(this).prop('checked',false);
        	});
    	}
    });
    
    //反选
    $('.reverseCheck').on('click',function(){
    	$.each($('.itemCheck'),function(index,value){
    		if(value.checked){
        		$(value).prop('checked',false);
        	}else{
        		$(value).prop('checked',true);
        	}
    	});
    });
    
    
    
});

//分页跳转
function gotoPage(page, totalPage, rows){
	$('#opera_page_no').val(page);
	$('#form1').attr('action',projectPath+"/order/list.htm").submit();
}

//关闭交易
function closeOrder(dom){
	var orderId = $(dom).next().val();
	var remark = $(dom).prev('textarea').val();
	if(! remark){
		alert('请填写关闭理由');
		return;
	}else{
		$.post(projectPath+'/order/close.json?'+new Date().getTime(),{'orderId':orderId,'remark':remark},function(res){
			if(res.flag){
				alert(res.msg);
				gotoPage($('#pageNo').val());
			}else{
				alert(res.msg);
			}
		},"json");
	}
}

//切换显示邮费
function changePostage(dom){
	var code = $(dom).val();
	if(code == 2 || code == 3){
		$('#postage_price_real').val(parseFloat($(dom).attr('data')).toFixed(2));
	}else{
		$('#postage_price_real').val(parseFloat($(dom).find('option[value="'+code+'"]').attr('data')).toFixed(2));
	}
}

function ableExpress(dom){
	var $select = $(dom).parent().find('select');
	var option_value = $select.val();
	$('#postage_price_real').val(parseFloat($select.find('option[value="'+option_value+'"]').attr('data')).toFixed(2));
}

//计算折扣
function discount(dom){
	var dis = $(dom).val();
	//给与初始赋值
	if(! dis){
	}else if(! number_reg.test(dis) || ! (parseFloat(dis) > 0 && (parseFloat(dis) <= 10))){
		alert("请输入大于0并小于10的数字");
	}else{
		var $discountResult = $(dom).parent().find('.discount_result');
		var count = parseFloat($discountResult.attr('count'));
		var price = parseFloat($discountResult.attr('price'));
		$discountResult.val(dis*price/10-price);
		$discountResult.attr('total_amt',dis*price/10*count.toFixed(2));
	}
}

//直接输入价格
function changePrice(dom){
	var discount = $(dom).val();
	
	if(! discount){
		alert("请输入价格");
		return;
	}else if(! number_reg.test(discount) || ! parseFloat(discount) > 0){
		alert("请输入大于0的数字");
		return;
	}else{
		var price = parseFloat($(dom).attr('price'));
		var count = parseFloat($(dom).attr('count'));
		$(dom).attr('total_amt',(price-discount)*count.toFixed(2));
	}
}


