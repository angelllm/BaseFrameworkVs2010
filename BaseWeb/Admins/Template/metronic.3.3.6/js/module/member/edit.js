define(function (require, exports, module) {
    
    var vms = avalon.define({
        $id: 'form',
        zhaohuiid:0,
        init: function () {
            avalon.ready(function() {
            	avalon.vmodels["box"].filepath = $("#hfImage").attr("data-bind")
            	avalon.vmodels["box"].status   = $("#page_status").attr("data-bind")
				avalon.vmodels["box"].isupload = $("#hfImage") == "" ? false : true

                var _birdthday = $("#birdthday").attr("data-bind").split('-')
                avalon.vmodels["box"].birdthday[0].yeartxt = _birdthday[0]
                avalon.vmodels["box"].birdthday[0].monthtxt = _birdthday[1]
                avalon.vmodels["box"].birdthday[0].daytxt = _birdthday[2]

                var _zhengshu = $("#zhengshu").attr("data-bind").split('|')
                //console.log(_zhengshu)
                if (_zhengshu.length>0 && _zhengshu[0]!="") {
                    $.each(_zhengshu,function(index,el){
                        avalon.vmodels["box"].zhengshu_arr.push(el)
                        avalon.vmodels["box"].filepath_zhengshu = avalon.vmodels["box"].zhengshu_arr.join("|")
                        avalon.vmodels["box"].imglist .push( "<div class=\"fileinput-new thumbnail imglistwapper zhengshu fl\"><img ondblclick='delimg(this)' src='"+el+"' /></div>")
                        avalon.vmodels["box"].isupload_zhengshu = true 
                    })
                }   
                vms.zhaohuiid = $("#member_zhaohui").attr("data-bind")

            });
        }
        

    })
    vms.init()

})