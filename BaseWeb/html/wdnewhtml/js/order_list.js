



$(function () {

 
                            $(".modify-price").click(function () {


                                var $this = $(this);

                                var content = '<div class="tbl-waper">' +
                                                '<h3>订单原价<span>(不含运费):</span><font>2541.00</font></h3>'+
                                                '<table cellpadding="0" cellspacing="0" class="tmp-tbl">'+
                                                    '<tr class="th">'+
                                                        '<td width="40%">产品名称</td>'+
                                                        '<td width="10%">单价(元)</td>'+
                                                        '<td width="10%">数量</td>'+
                                                        '<td width="25%" class="ques">'+
                                                            '<span>涨价或折扣</span>'+
                                                            '<a href="javascript:void(0)"></a>'+
                                                            '<div class="ques-tip">'+
                                                                '<label>负数代表优惠折扣</label>'+
                                                                '<span href="javascript:void(0)"></span>'+
                                                                '<div class="clear"></div>'+
                                                            '</div>'+
                                                            '</td>'+
                                                        '<td width="15%">邮费(元)</td> '+
                                                    '</tr>'+
                                                    '<tr>'+
                                                        '<td colspan="4" >'+
                                                            '<table cellpadding="0" cellspacing="0" class="tbl-item">'+
                            
                                                                '<tr>'+
                                                                    '<td width="45%">'+
                                                                        '<label><a href="">artDialog</a></label>'+
                                                                    '</td>'+
                                                                    '<td width="15%">289.00</td>'+
                                                                    '<td width="10%">2</td>'+
                                                                    '<td>'+
                                                                        '<input type="text" class="txt-input" />'+
                                                                        '<span>折=</span>'+
                                                                        '<input type="text" class="txt-input" />'+
                                                                    '</td>'+
                              
                                                                '</tr> '+
                                                                '<tr>'+
                                                                    '<td width="45%">'+
                                                                        '<label>artDialog</label>'+
                                                                    '</td>'+
                                                                    '<td width="15%">289.00</td>'+
                                                                    '<td width="10%">2</td>'+
                                                                    '<td>'+
                                                                        '<input type="text" class="txt-input" />'+
                                                                        '<span>折=</span>'+
                                                                        '<input type="text" class="txt-input" />'+
                                                                    '</td>'+
                                                                '</tr> '+
                                                                '<tr>'+
                                                                    '<td width="45%">'+
                                                                        '<label>artDialog</label>'+
                                                                    '</td>'+
                                                                    '<td width="15%">289.00</td>'+
                                                                    '<td width="10%">2</td>'+
                                                                    '<td>'+
                                                                        '<input type="text" class="txt-input" />'+
                                                                        '<span>折=</span>'+
                                                                        '<input type="text" class="txt-input" />'+
                                                                    '</td>'+
                              
                                                                '</tr> '+
                                                                '<tr>'+
                                                                    '<td width="45%">'+
                                                                        '<label>artDialog</label>'+
                                                                    '</td>'+
                                                                    '<td width="15%">289.00</td>'+
                                                                    '<td width="10%">2</td>'+
                                                                    '<td width="20%" style="text-align:center" >'+
                                                                        '<input type="text" class="txt-input" />'+
                                                                        '<span>折=</span>'+
                                                                        '<input type="text" class="txt-input" />'+
                                                                    '</td>'+
                              
                                                                '</tr> '+
                             
                                                            '</table>'+
                                                        '</td>'+
                                                        '<td  class="vtat" >'+
                                                            '<p>买家支付邮费</p>'+
                                                            '<input type="text" class="txt-modify" value="25.00"  />'+
                                                        '</td>'+
                                                    '</tr> '+
                                                '</table>'+
                                            '</div>';
                                var dia = art.dialog({
                                    title: '订单价格修改',
                                    content: content,
                                    follow: $this[0],
                                    ok: function () {

                                        var flag = true;
                                        //确认按钮触发事件 进行表单验证 当flag=false 时候 对话框不会关闭


                                        return flag;

                                    }
                                    ,
                                    okVal: '确认修改'
                                });

                            });



                            $(".close,.no-mark").click(function () {

                                $(".model").hide();
                                var model = $(this).next(".model");
                                model.show().attr("data", 1).find("textarea").focus();

                            });
                            $(".closetag").click(function () {

                                $(".model").hide();
                                //$(this).parent().attr("data", 0);
                            });


                            $(".postage").click(function () {

                                var $this = $(this);

                                var content = ' <div class="tbl-postage">'+
                                                    '<div><input type="radio" name="rdo_postage" /><span>快递</span><span><select><option>--请选择--</option></select></span></div>'+
                                                    '<div><input type="radio" name="rdo_postage" /><span>EMS</span></div>'+
                                                    '<div><input type="radio" name="rdo_postage" /><span>平邮</span></div>'+
                                                    '<div><font>快递单号:</font><font>邮费:</font><div class="clear"></div></div>'+
                                                    '<div><font><input type="text" /></font><font><input type="text" /></font>'+
                                                    '<div class="clear"></div></div>'+
                                                '</div>';
                                var dia = art.dialog({
                                    title: '发货处理',
                                    content: content,
                                    follow: $this[0],
                                    ok: function () {

                                        var flag = true;
                                        //确认按钮触发事件 进行表单验证 当flag=false 时候 对话框不会关闭

                                        alert("发货?发你妹啊!");
                                        return flag;

                                    }
                                    ,
                                    okVal: '确认发货'
                                });

                            });


 

});

 