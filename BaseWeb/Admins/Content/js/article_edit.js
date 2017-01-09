
jQuery(function () {

    jQuery("#lblUrlTitle").text("文章修改");
    jQuery("#btnAdd").button();
    jQuery("#edit-win").tabs();
    jQuery("#btnSave,#btnContent").button();
    InitUpload();

});

$(".imgdel").live("click", function () {
    //alert(1);
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

                $("#" + target_img).empty().html("<img width=120 data='' style='margin:3px;padding:3px;border:1px solid #c1c1c1' src='" + data + "' /> <a class='imgdel'>删除<a>").fadeIn("2000");
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

jQuery(".chosen-select").chosen();

jQuery(function () {

    jQuery('#ddlType').on('change', function (evt, params) {
        jQuery("#article_type").val(jQuery(this).find("option:selected").val());
    });

     

    jQuery('.switch input:checkbox').not(jQuery("#article_status")).on('click', function (evt, params) {
        jQuery(this).val(jQuery(this).val().toLowerCase() == "true" ? "false" : "true");
        //jQuery(this).val(jQuery(this).val().toLowerCase() == "true" ? "false" : "true");
        //jQuery(this).next().val(jQuery(this).val());
    });

    jQuery('#article_status').on('click', function (evt, params) {

        jQuery(this).val(jQuery(this).val() == "1" ? "0" : "1");
        jQuery(this).next().val(jQuery(this).val());
    });


    jQuery(function () {

        jQuery('#colorpickerHolder2').ColorPicker({
            flat: true,
            color: jQuery("#article_title_color").val() == "0" ? "#ff0000" : jQuery("#article_title_color").val(),
            onSubmit: function (hsb, hex, rgb) {
                jQuery('#colorSelector2 div').css('backgroundColor', '#' + hex);
            }
        });
        jQuery('#colorpickerHolder2>div').css('position', 'absolute');
        var widt = false;
        jQuery('#colorSelector2').bind('click', function () {
            jQuery('#colorpickerHolder2').stop().animate({ height: widt ? 0 : 173 }, 500);
            widt = !widt;
        });

    });
    jQuery("#color-panel").attr("style", "background-color:#" + (jQuery("#article_title_color").val() == "0" ? "ff0000" : jQuery("#article_title_color").val()));

})