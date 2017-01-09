//数据下载
function downloadData(id){
	var h=getH();
	$.post(
	   "downloadData.htm",
	   {"id":id,"h":h},
	   function(data){
		   var path=$("#download_path").val()+data.path;
		   window.open(path);
	   },'json'
	);
}
//获取参数h
function getH(){
	var arr=$(".allparam");
	var h="";
	if(arr.length>0){
		for(var i=0;i<arr.length;i++){
			h=h+arr[i].value+",";
		}
	}
	return h;
}
//运行报表
function make_report(reportId){
	var id=reportId;
	var h=getH();
	$.post(
			"makeEcharts.htm",
			{"id":reportId,"h":h},
			function(date){
				if($("#reportType").val()==2){
					var columns=$("#reportColumns").val();
				    var arrColumns=columns.split(",");
				    var table="<hr/><table border='1'  width='450px' height='300spx' align='enter'  cellpadding='0' cellspacing='0'><tr>";
				    for(var i=0;i<arrColumns.length;i++){
				    	table=table+"<th>"+arrColumns[i]+"</th>";
				    }
				    table=table+"</tr>";
					for(var i=0;i<date.length;i++){
						table=table+"<tr>";
						for(var j=0;j<arrColumns.length;j++){
							table=table+"<td>"+date[i][arrColumns[j]]+"</td>";
						}
						table=table+"</tr>";						
					}
					table=table+"</table>";
					$("#dataReport").html(table).show();
				}else{
					//折线数组(d)
					  var Count=[];
					  //x轴数组(x)
					  var alldate=[];
					  //y轴数组(v)
					  var seriesObj=[];
					 ok: for(var i=0;i<date.length;i++){
						  if(Count.length==0){
							  Count[0]=date[i].d;
						  }else{
							  for(var j=0;j<Count.length;j++){
								  if(Count[j]==date[i].d){
									  continue ok;
								  }  
							  }
							  Count.push(date[i].d);
						  }
					  }
					  aa:  for(var i=0;i<date.length;i++){
						  if(alldate.length==0){
							  alldate[0]=date[i].x;
						  }else{
							  for(var j=0;j<alldate.length;j++){
								  if(alldate[j]==date[i].x){
									  continue aa;
								  }  
							  }
							  alldate.push(date[i].x);
						  }
					  }
					  for(var i=0;i<Count.length;i++){
						  var option= {
						            name:Count[i],
						            type:'line', 
						           // smooth:true,
						            itemStyle: {
						                normal: {
						                    lineStyle: {
						                        shadowColor : 'rgba(0,0,0,0.4)',
						                        shadowBlur: 5,
						                        shadowOffsetX: 3,
						                        shadowOffsetY: 3
						                    }
						                }
						            },
						            data:[]				        
						        };
						bb:  for(var j=0;j<alldate.length;j++){
							 for(var z=0;z<date.length;z++){
								 if(date[z].d==Count[i]&&date[z].x==alldate[j]){
									 option.data.push(date[z].v);
									 continue bb;
								 }
							 }
							 option.data.push(0);
						  }
						  seriesObj.push(option);
					  }
					   require.config({
					        paths:{ 
					            echarts :$("#js_path").val()+'/jquery/echarts',
					            'echarts/chart/bar' : $("#js_path").val()+'/jquery/echarts-map',
					            'echarts/chart/line': $("#js_path").val()+'/jquery/echarts-map',
					            'echarts/chart/map' : $("#js_path").val()+'/jquery/echarts-map'
					        }
					    });
					    require(
					        [
					            'echarts',
					            'echarts/chart/bar',
					            'echarts/chart/line',
					            'echarts/chart/map'
					        ],
					        function(ec) {
						
					            var myChart = ec.init(document.getElementById('main'));
					            myChart.setOption({
					    title : {
					        text: $("#reportName").val(),
					        subtext: ''
					    },
					    tooltip : {
					        trigger: 'axis'
					    },
					    legend: {
					        data:Count
					    },
					    toolbox: {
					        show : true,
					        feature : {
					            mark : {show: true},
					            dataView : {show: true, readOnly: false},
					            magicType : {show: true, type: ['line', 'bar']},
					            restore : {show: true},
					            saveAsImage : {show: true}
					        }
					    },
					    calculable : false,
					    xAxis : [
					        {
					            type : 'category',
					            boundaryGap : false,
					            data : alldate
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            axisLabel : {
					                formatter: '{value} '+$("#reportY").val()
					            },
					            splitArea : {show : true}
					        }
					    ],
					    series : seriesObj
					});
				  }
					    );
					    $("#main").show();
				}
			},'json'
	);

}