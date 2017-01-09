/*
 * Copyright (c) wd1998.com, All Rights Reserved
 */

$(function(){
    $('.DivRecommendImage').click(function(){
        $(this).addClass('curr').siblings().removeClass('curr')

        $("#title").val($(this).attr("ftitle"));
        $("#url").val($(this).attr("furl"));
        $("#fragmentId").val($(this).attr("fid"));
        $("#fragment_img").attr("src", upload_path + $(this).attr("fpath"));
        $("#fileId").val($(this).attr("ffileid"));
        $("#filePath").val($(this).attr("fpath"));

        $("#fragment_tip").html('(该位置图片大小为'+$(this).attr("fwidth") + "x" + $(this).attr("fheight") +')');
    })

    $("#upload_file").uploadify({
        "id" : "upload_file",
        "swf" : js_path + "/uploadify/uploadify.swf",
        "uploader" : "../file/upload.json",
        "buttonText" : "",
        "buttonClass" : "fileinput",
        "height" : 28,
        "width" : 100,
        "fileTypeExts" : "*.jpg;*.png;*.gif",
        "fileObjName" : "upload_file",
        "fileSizeLimit" : "5120KB",
        // "auto" : false,
        // 上传成功
        onUploadSuccess : function(file, data, flag) {
            var files = $.parseJSON(data).fileList;
            $("#fragment_img").attr("src", upload_path + files[0].path);
            $("#fileId").val(files[0].id);
            $("#filePath").val(files[0].path);
        }
    });
    $("#upload_file-queue").hide();

    $("#submit_btn").on("click", function(){
        var fragmentId = $("#fragmentId").val();
        var fileId = $("#fileId").val();
        var title = $("#title").val();
        var url = $("#url").val();
        var path = $("#filePath").val();

        if (!fragmentId || fragmentId == "") {
            alert("请选择推荐区域");
            return;
        }
        $.ajax({
            url : "updateIndex.json",
            dataType : "json",
            type : "post",
            data : {
                fragmentId : fragmentId,
                fileId : fileId,
                title : title,
                url : url,
                path : path
            },
            success : function(result) {
                if (result.flag) {
                    alert("保存完成");
                    location.href="list.htm";
                } else {
                    alert("保存失败");
                }
            },
            error : function() {
                alert("保存失败");
            }
        })
    })
})