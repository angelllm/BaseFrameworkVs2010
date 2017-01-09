
jQuery(function () {


    $("#ddlType option[value='" + $("#hfBind").val() + "']").attr("selected", true);
   
    jQuery(".chosen-select").chosen();
    jQuery("#lblUrlTitle").text("页面设置");
    jQuery("#btnAdd,#btnSave").button();
    jQuery("#edit-win").tabs();
   
    InitUpload();

    jQuery('#cbkStatus').live('click', function (evt, params) {
       
        jQuery("#page_status").val($.trim(jQuery("#page_status").val()) == "1" ? "0" : "1");
        
    });
    jQuery('#cbkIsTarget').live('click', function (evt, params) {
        jQuery("#page_url_type").val($.trim(jQuery("#page_url_type").val()  ) == "1" ? "0" : "1");
       // jQuery(this).next().val(jQuery(this).val());
    });
    jQuery('#ddlType').change(function (evt, params) {
        jQuery("#page_type_id").val(jQuery(this).find("option:selected").val());
        $("#page_name").val(jQuery('#ddlType').find("option:selected").text());
        
    });
 

    jQuery("#btnSave").click(function () {
        var flag = true;
        art.dialog({
            title: '操作提示',
            id: "o_tip",
            icon: 'face-smile',
            content: "正在操作,请稍候...",
            resize: false,
            padding: "20px",
            //time: 1,
            lock: true
        });
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
        uploadLimit:1,
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
$(".ui-tip-close").click(function () {
    $(".ui-waper").slideUp(200);
});
$(".input-tip").click(function () {
    $(".ui-waper").slideDown(200);
});