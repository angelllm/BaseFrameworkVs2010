define(function (require, exports, module) {
    
    require("wid")
    require("fl3")
    require("trans") 
    //require("/content/js/uploadify/jquery.uploadify-3.1")
    require("module/banner/banner-form-validation.min")
    var vm = avalon.define({
        $id: 'box',
        filepath:"",
        isupload:false,
        status:1,
        init: function () {
            //头部菜单高亮
            $(".classic-menu-dropdown:eq(2)").addClass("active").find("li.dropdown-submenu:eq(1)").addClass("active").find("li:eq(1)").addClass("active")

        }
        ,
        clearFile: function () {
            vm.filepath = ""
            vm.isupload = false
        }
        ,
        changeStatus: function () {
            vm.status = vm.status == 1 ? 0 : 1
        }
        ,
        upload: function () {
            $("#upload input[type='file']").click()
            $('#upload').fileupload({
                always: function (e, data) {
                    vm.filepath = data.result.replace("thumb","source")
                    vm.isupload = true 
                   
                }
            })
           
        }


    })
    vm.init()

})