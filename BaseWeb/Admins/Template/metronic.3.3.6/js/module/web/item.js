define(function (require, exports, module) {
    
    require("/Content/js/ueditor/ueditor.config")
    require("/Content/js/ueditor/ueditor.all")
    require("/content/js/uploadify/jquery.uploadify-3.1")
    require("module/web/web-form-validation.min")
    var vm = avalon.define({
        $id: 'box',
        filepath:"",
        isupload:false,
        status:1,
        init: function () {
            //头部菜单高亮
            $(".classic-menu-dropdown:eq(2)").addClass("active").find("li:eq(0)").addClass("active")
            avalon.ready(function() {
                //初始化编辑框
                var editor_content = new baidu.editor.ui.Editor({ initialFrameWidth: 600 });
                editor_content.render('page_content'); 
                //
                var editor_footer = new baidu.editor.ui.Editor({ initialFrameWidth: 600 });
                editor_footer.render('page_footer'); 
                //
                var editor_contact = new baidu.editor.ui.Editor({ initialFrameWidth: 600 });
                editor_contact.render('page_contact'); 
                //返回按钮提示
                //$(".portlet-title .btn-back").tooltip()
            });
            //初始化上传控件
            vm.InitUpload()

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
        InitUpload:function () {

            var target_img = "ImageShow";
            var target_val = "hfImage";

            //初始化上传控件
            $("#file_upload").uploadify({
                height: 30,
                swf: '/Content/js/uploadify/uploadify.swf',
                uploader: '/Ajax/AddImage/1/',
                cancel: '/Content/js/uploadify/uploadify-cancel.png',
                fileTypeExts: '*.jpg;*.png;*.gif;*.jpeg;',
                buttonText: '选择图片',
                /*buttonImage: '/admins/Template/metronic.3.3.6/images/file-bg.gif',*/
                buttonClass: 'pull-left', 
                method: 'post',
                fileTypeDesc: '请选择图片',
                fileSizeLimit: 1024 * 1024,
                queueID: 'qid',
                rollover: true,
                auto: true,
                removeCompleted: true,
                width: 82,
                height:34,

                multi: false,
                'onSelect': function (e, queueID, fileObj) {

                },
                'onUploadStart': function (file) {
                    //动态传参数


                },

                onUploadSuccess: function (file, data, response) {

                    if (data.indexOf('错误提示') > -1) {
                        alert(data)
                    }
                    else {
                        vm.filepath = data
                        vm.isupload = true 
                    }
                },
                'onUploadError': function (file, errorCode, errorMsg, errorString) {
                    //当单个文件上传出错时触发
                    //alert('文件：' + file.name + ' 上传失败: ' + errorString);
                }
                        ,
                'onQueueComplete': function (queueData) {

                }
                        ,
                'onClearQueue ': function (event, data) { }


            });


        }


    })
    vm.init()

})