﻿

$("#btnAdd").button().click(function () {

    $(".swfupload").click();

});

    

    function ok() {

        art.dialog({
            title: '操作提示',
            id: "win_tip",
            icon: 'succeed',
            content: "操作成功!",
            resize: false,
            time: 1,
            lock: true

        });

    };

   
$("#lblUrlTitle").text("照片管理");
var typeid = $("#hfTypeId").val();

function InitUpload() {

    var target_img = "ImageShow";
    var target_val = "hfImage";
        
    //初始化上传控件
    $("#file_upload").uploadify({
        height: 30,
        swf: '/Content/js/uploadify/uploadify.swf',
        uploader: '/Ajax/AddPhoto/1/?typeid=' + typeid,
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
        multi: true,
        'onSelect': function (e, queueID, fileObj) {

        },
        'onUploadStart': function (file) {
            //动态传参数
        },
        onUploadSuccess: function (file, data, response) {
            var _split_path = data.split('|');

            var _temp =
                    "<div class=\"photowarpper\" style=\"display:none;\">" +
                        "<div class=\"photo\">" +
                            "<img src=\"" + _split_path[0] + "\" data=\"" + _split_path[1] + "\" />" +
                        "</div>" +
                        "<p><label></label></p>" +
                        "<i></i>" +
                        "<em>" +
                            "<div class=\"em-warpper\">" +
                                "<ul>" +
                                    "<li data=\"" + _split_path[1] + "\" data-title=\"\"><label><b class=\"edit\"></b>编辑</label></li>" +
                                    "<li data=\"" + _split_path[1] + "\" data-title=\"\"><label><b class=\"del\"></b>删除</label></li>" +
                                "</ul>" +
                            "</div>" +
                        "</em>" +
                    "</div>";

            $("#photoList").append($(_temp).fadeIn(500));
            console.log(_split_path[1]);
        },
        'onUploadError': function (file, errorCode, errorMsg, errorString) {

        }
        ,
        'onQueueComplete': function (queueData) {

        }
        ,
        'onClearQueue ': function (event, data) { }


    });


}

$(".tits").live("blur", function () {

    var _val = $(this).val();
    if (_val == "请输入图片描述") {
        return;
    }
    var _id = $(this).parent().prev().find("img").attr("data");
    $.ajax({
        type: "POST",
        url: "/Admin/PhotoEdit/",
        async: false,
        data: {
            id: _id,
            title: _val
        },
        beforeSend: function () {

        },
        success: function (data) {
           
        },
        error: function (er) {
            console.log(er);
        }
    })

});

function add(obj) {

    var tab = $("#temp-modify").html();
    var id = $(obj).attr("data");
    art.dialog({
        title: "添加分类",
        id: "win_" + id,
        content: tab,
        resize: false,
        init: function () {
            $("._edit-win").tabs();
        },
        ok: function () {

                     
            $.ajax({
                type: "POST",
                url: "/Admin/PhotoTypeAdd/",
                async: false,
                data: {

                    type_name: $("#txtName").val(),
                    type_image: $("#hfImage").val(),
                    type_order: $("#txtOrder").val(),
                    type_summary: $("#txtSummary").val(),
                    type_position: $("#ddlPosition option:selected").val()  

                },
                beforeSend: function () {

                },
                success: function (data) {
                    location.reload();
                },
                error: function (er) {
                    //alert('error');
                    //console.log(er);
                }
            })

        }

    });

}

function edit(obj) {

    var tab = $("#temp-modify").clone(true).html();
    //$("#temp-modify").remove();
    var id = $(obj).attr("data");
    art.dialog({
        title: $(obj).attr("data-title") + '修改',
        id: "win_" + id,
        content: tab,
        resize: false,
        init: function () {

            $("._edit-win").tabs();

            $.ajax({
                type: "POST",
                url: "/Admin/TypeEdit/",
                async: false,
                data: {
                    id: id
                },
                beforeSend: function () {

                },
                success: function (data) {

                    $("#txtId").val(data.type_id);
                    $("#txtName").val(data.type_name);
                    $("#hfImage").val(data.type_image);
                    $("#txtOrder").val(data.type_order);
                    $("#txtSummary").val(data.type_summary);
                    if (data.type_position != "0" || data.type_position != "") {
                        $("#ddlPosition option[value='" + data.type_position + "']").attr("selected", true);
                    }
                    if (data.type_image != "" && data.type_image != "null") {
                        $("#ImageShow").html("<img width=120 data='' style='margin:3px;padding:3px;border:1px solid #c1c1c1' src='" + data.type_image + "' /> <a class='imgdel'>删除<a>").fadeIn("2000");
                    } else { $("#ImageShow").html("<em style='color:#ff0000;'>尚未上传</em>"); }

                },
                error: function () {
                    alert('error');
                }
            })


        },
        ok: function () {

            $.ajax({
                type: "POST",
                url: "/Admin/PhotoTypeModify/",
                async: false,
                data: {
                    type_id: $("#txtId").val(),
                    type_name: $("#txtName").val(),
                    type_image: $("#hfImage").val(),
                    type_order: $("#txtOrder").val(),
                    type_summary: $("#txtSummary").val(),
                    type_position: $("#ddlPosition option:selected").val()
                },
                beforeSend: function () {
                    //console.log($("#txtId").val());
                },
                success: function (data) {
                    location.reload();
                },
                error: function (er) {
                    //alert('error');
                    //console.log(er);
                }
            })

        }

    });

}



$(".photowarpper em").live("click",function(){
    $(this).find(".em-warpper").show();
}).find("li").live("click",function(){
    
    var _index = $(this).index();
    if (_index == 0) {
        edit($(this));
        InitUpload();
    }
    else if (_index == 1) {

        var $this = $(this); 
        artDialog.confirm("确认删除么?", function () {

            $.ajax({
                type: "POST",
                url: "/Admin/TypeDel/",
                async: false,
                data: {
                    id: $this.attr("data")
                },
                beforeSend: function () {

                },
                success: function (data) {
                    $this.parent().parent().parent().parent().fadeOut("500");
                },
                error: function () {
                    console.log("error");
                }
            })

        });

    } 
});


InitUpload();