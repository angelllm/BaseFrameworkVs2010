
jQuery(function () {

    
    $("#ddlType option[value='" + $("#hfBind").val() + "']").attr("selected", true);
    //ddl();
    jQuery(".chosen-select").chosen();
    jQuery("#lblUrlTitle").text("页面设置");
    jQuery("#btnAdd,#btnSave").button();
    jQuery("#edit-win").tabs();
    jQuery("#page_type_id").val(jQuery('#ddlType').find("option:selected").val());
    $("#page_name").val(jQuery('#ddlType').find("option:selected").text());
    InitUpload();

    jQuery('#cbkStatus').live('click', function (evt, params) {
        jQuery(this).val(jQuery(this).val() == "1" ? "0" : "1");
        jQuery(this).next().val(jQuery(this).val());
    });
    jQuery('#cbkIsTarget').live('click', function (evt, params) {
        jQuery(this).val(jQuery(this).val() == "1" ? "0" : "1");
        jQuery(this).next().val(jQuery(this).val());
    });
    jQuery('#ddlType').change(function (evt, params) {
        jQuery("#page_type_id").val(jQuery(this).find("option:selected").val());
        $("#page_name").val(jQuery('#ddlType').find("option:selected").text());
        //ddl();
    });

    function ddl() {
        //        if (jQuery('#ddlType').find("option:selected").val() == "42|0") {
        //            $("#tabs-1 .edit-win").eq(1).hide().next().show();
        //            $("#ui-id-2,#ui-id-3").hide();
        //        } else {
        //            $("#tabs-1 .edit-win").eq(1).show().next().hide();
        //            $("#ui-id-2,#ui-id-3").show();
        //        }
    }

    jQuery("#btnSave").click(function () {
        var flag = true;
        var check_type = $("#page_type_id").val();
        var _check_allow = check_type.split('|')[1];
        if (_check_allow == "0") {

            $.ajax({
                type: "POST",
                url: "/Admin/PageCheck/",
                async: false,
                data: {
                    id: check_type.split('|')[0]
                },
                beforeSend: function () {
                },
                success: function (data) {
                    if (data == "ok") {
                        flag = true;
                    } else {
                        flag = false;
                        artDialog.tips("<p >当前分类[<span style='color:#ff0000;'>" + $("#ddlType option:selected").text() + "</span>] 不可多次添加,只允许一条记录!</p>", 3);
                    }
                },
                error: function () {
                    alert('error');
                }
            })

        } else {

            $('#ajax-form').ajaxForm
            (
                {
                    type: 'post',
                    beforeSubmit: function () {

                        art.dialog({
                            title: '操作提示',
                            id: "o_tip",
                            icon: 'succeed',
                            content: "正在操作,请稍候...",
                            resize: false,
                            //time: 1,
                            lock: true
                        });
                    },
                    success: function (data) {
                        window.location.href = "/Admin/PageAdd/" + $("#hfTid").val();
                        //console.log(data);
                        //console.log("success");
                        //$("#product-add-form").resetForm();
                    },
                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                        //console.log(errorThrown);
                    }
                }
            );

        }

        return flag;
    });

});

$(".imgdel").live("click", function () {
    $("#ImageShow").fadeOut(300, function () {
        $("#ImageShow").empty();
        $("#hfImage").val("");
    });
});

function InitUpload() {

    var target_img = "ImageShow";
    var target_val = "hfImage";

    //初始化上传控件
    $("#file_upload").uploadify({
        height: 30,
        swf: '/Content/js/uploadify/uploadify.swf',
        uploader: '/Ajax/AddImage/1/',
        'cancel': '/Content/js/uploadify/uploadify-cancel.png',
        fileTypeExts: '*.jpg;*.png;*.gif;*.jpeg;',
        buttonText: '上传图片',
        method: 'post',
        fileTypeDesc: '请选择图片',
        fileSizeLimit: 1024 * 1024,
        queueID: 'qid',
        rollover: true,
        auto: true,
        removeCompleted: true,
        width: 120,
        uploadLimit: 1,
        multi: false,
        'onSelect': function (e, queueID, fileObj) {

        },
        'onUploadStart': function (file) {
            //动态传参数
        },

        onUploadSuccess: function (file, data, response) {

            if (data.indexOf('错误提示') > -1) {
                alert(data);
            }
            else {
                $("#" + target_img).empty().html("<img  data='' style='margin:3px;padding:3px;border:1px solid #c1c1c1;max-width:120px' src='" + data + "' /> <a class='imgdel'>删除<a>").fadeIn("2000");
                $("#" + target_val).val(data);
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
//
$("#hfUrl").val("/Admin/PageList/?t=" + $("$hfTypeId").val());