define(function (require, exports, module) {
    
    var vms = avalon.define({
        $id: 'form',
        bannerpath:"",
        init: function () {
            avalon.ready(function() {
            	avalon.vmodels["box"].filepath = $("#hfImage").attr("data-bind")
                vms.bannerpath = avalon.vmodels["box"].filepath .replace("thumb","source")
            	avalon.vmodels["box"].status   = $("#page_status").attr("data-bind")
				avalon.vmodels["box"].isupload = $("#hfImage") == "" ? false : true

            });
        }
        

    })
    vms.init()

})