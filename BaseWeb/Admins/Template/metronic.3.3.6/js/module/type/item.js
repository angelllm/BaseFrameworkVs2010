define(function (require, exports, module) {
    

    require("wid")
    require("/Content/js/ueditor/ueditor.config")
    require("/Content/js/ueditor/ueditor.all")
    //require("/content/js/uploadify/jquery.uploadify-3.1")
    require("module/type/type-form-validation.min")
    require("trans") 
    require("fl3")
    
    var vm = avalon.define({
        $id: 'box',
        filepath:"",
        isupload:false,
        status:1,
        init: function () {
            //头部菜单高亮
            $(".classic-menu-dropdown:eq(1)").addClass("active").find("li:eq(1)").addClass("active")
            avalon.ready(function() {
                //初始化编辑框
                var editor_a = new baidu.editor.ui.Editor({ initialFrameWidth: 600 });
                editor_a.render('type_content'); 
                //返回按钮提示
                //$(".portlet-title .btn-back").tooltip()
            }) 

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
                    vm.filepath = data.result
                    vm.isupload = true 
                   
                }
            })
           
        }


    })
    vm.init()

})