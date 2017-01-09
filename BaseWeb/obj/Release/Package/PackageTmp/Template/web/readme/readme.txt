##获取总配置 
##html 静态化路径配置
##tmp 静态化模板页面
##prev 模板路径
$json.config("prev") 
##获取类型数据 
##type_code--> logo banner friendlink footer base news notice inner marke 
##type_dict_code--> page article
#foreach($config in $tjson.tconfig("logo"))
   $config.type_name
#end
##获取页面设置 syspage
##根据type_id 获取 pagelist
#foreach($config in $tjson.tconfig("logo"))
    #foreach($c in $pjson.pconfig($config.type_id))
     $c.page_name
    #end 
#end