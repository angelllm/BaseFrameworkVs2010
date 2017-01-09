define(function (require, exports, module) {
    
    var vms = avalon.define({
        $id: 'form',
        init: function () {
            avalon.ready(function() {
            	avalon.vmodels["box"].filepath = $("#hfImage").attr("data-bind")
            	avalon.vmodels["box"].status   = $("#type_status").attr("data-bind")
				avalon.vmodels["box"].isupload = $("#hfImage") == "" ? false : true

            });
        }
        

    })
    vms.init()

})