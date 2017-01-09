function InitUpload() {

    var target_img = "ImageShow";
    var target_val = "hfImage";
        
    //初始化上传控件
    $("#file_upload").uploadify({
        height: 30,
        swf: '/Content/js/uploadify/uploadify.swf',
        uploader: '/Ajax/AddImage/3/',
        'cancel': '/Content/js/uploadify/uploadify-cancel.png',
        fileTypeExts: '*.jpg;*.png;*.gif;*.jpeg;',
        buttonText: '上传图片',
        method: 'post',
        fileTypeDesc: '请选择图片',
        fileSizeLimit: 1024 * 1024,
        queueID: 'qid',
        uploadLimit:1,
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


function InitEditor() {

    editor_a = new baidu.editor.ui.Editor({ initialFrameWidth: 600, initialFrameHeight: 320 });
    editor_a.render('txtContent'); 
}
 
function InitSelect(){
//$(".chosen-select").chosen();
}

$(function () {

    $(".imgdel").live("click", function () {
        //alert(1);
        $("#ImageShow").fadeOut(300, function () {
            $("#ImageShow").empty();
            $("#hfImage").val("");
        });
    });


    $("#lblUrlTitle").text("分类管理");
    $("#btnDict").button().click(function () { window.location.href = '/Admin/DictList/'; });
    $("#btnAdd").button().click(function () { add(); InitUpload(); InitEditor(); InitSelect(); });

    $("#submit").button();
    $("#reset").button().click(function () { window.location.href = '/Admin/TypeList/'; });

    $(".control-del").click(function () {

        var $this = $(this);
        if ($this.attr("role") == "llm" && !isHost) {

            art.dialog({
                title: '操作提示',
                id: "opte",
                icon: 'warning',
                content: "<p style='padding-top:20px'>当前分类[<font style='color:red;'>" + $this.attr("data-title") + "</font>]为系统设定,<font style='color:blue;'>不能删除</font>,请联系管理员!</p>",
                resize: false,
                lock: true

            });

        } else {

            artDialog.confirm("<p style='padding-top:20px'>确认删除么?</p>", function () {

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

                        $this.parent().parent().parent().parent().slideUp("500");
                    },
                    error: function () {
                        alert('error');
                    }
                })

            });
        }


    });


    $(".control-modify").click(function () {

        edit($(this));
        InitUpload(); InitEditor();
    });
    $(".control-attr").click(function () {
        window.location.href = "/Admin/TypeAttrAdd/" + $(this).attr("data");
    });
    $(".control-sku").click(function () {
        window.location.href = "/Admin/TypeSkuParamAdd/" + $(this).attr("data");
    });
    $(".tbl tr:not(:first)").dblclick(function () {

        edit($(this));
        InitUpload(); InitEditor();
    });



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

                       //console.log("txtName:" + $("#txtName").val());
                       //console.log("hfImage:" + $("#hfImage").val());

                       $.ajax({
                           type: "POST",
                           url: "/Admin/TypeAdd/",
                           async: false,
                           data: {

                               type_name: $("#txtName").val(),
                               type_parent: $("#ddlType option:selected").val(),
                               type_cid: $("#ddlDict option:selected").val(),
                               type_image: $("#hfImage").val(),
                               type_order: $("#txtOrder").val(),
                               type_summary: $("#txtSummary").val(),
                               type_detail: $("#txtDetail").val(),
                               type_position: $("#ddlPosition option:selected").val(),
                               type_code: $("#type_code").val(),
                               type_content: editor_a.getContent()

                           },
                           beforeSend: function () {

                               //                                art.dialog({
                               //                                    title: '正在执行操作...',
                               //                                    content: "<div class='loading'>正在执行操作,请稍后!</div>",
                               //                                    resize: false,
                               //                                    lock: true 
                               //                                });
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
               var flag = false;
               var curr_type = "";
               var $this = $(obj);
               //console.log($this);
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
                               curr_type = data.type_cid_name;
                               if (data.type_parent != "0") {
                                   $("#ddlType option[value='" + data.type_parent + "|" + data.type_parent_name + "']").attr("selected", true);
                               }
                               $("#ddlDict option[value='" + data.type_cid + "|" + data.type_cid_name + "|" + data.type_dict_code + "']").attr("selected", true);

                               if (data.type_role == "llm" && !isHost) {
                                   $("#ddlDict").attr("disabled", "disabled");
                               } else {

                               }
                               //console.log(data);
                               //console.log(data.type_dict_code); 
                               if (data.type_position != "0" || data.type_position != "") {
                                   $("#ddlPosition option[value='" + data.type_position + "']").attr("selected", true);
                               }
                               $("#hfImage").val(data.type_image);
                               $("#txtOrder").val(data.type_order);
                               $("#txtSummary").val(data.type_summary);
                               $("#txtDetail").val(data.type_detail);
                               $("#txtContent").val(data.type_content);
                               $("#type_code").val(data.type_code); 
                               //console.log(data.type_image);
                               if (data.type_image != "" && data.type_image != "null") {
                                   $("#ImageShow").html("<img data='' style='margin:3px;padding:3px;border:1px solid #c1c1c1;max-width:120px' src='" + data.type_image + "' /> <a class='imgdel'>删除<a>").fadeIn("2000");
                               } else { $("#ImageShow").html("<em style='color:#ff0000;'>尚未上传</em>"); }

                           },
                           error: function () {
                               alert('error');
                           }
                       })

                   },
                   ok: function () {
                       //is modify dict type
                       if (curr_type.toString() != $("#ddlDict option:selected").text()) {
                           flag = true;
                       } 
                       if ($.trim($this.attr("role")) == "true" && flag && !isHost) {

                           art.dialog({
                               title: '操作提示',
                               id: "opte",
                               icon: 'warning',
                               content: "<p style='padding-top:20px'>当前分类[<font style='color:red;'>" + $this.attr("data-title") + "</font>]为系统设定,<font style='color:blue;'>不能修改分类类型</font>,请联系管理员!</p>",
                               resize: false,
                               lock: true

                           });

                       } else {

                           $.ajax({
                               type: "POST",
                               url: "/Admin/TypeModify/",
                               async: false,
                               data: {
                                   type_id: $("#txtId").val(),
                                   type_name: $("#txtName").val(),
                                   type_parent: $("#ddlType option:selected").val(),
                                   type_cid: $("#ddlDict option:selected").val(),
                                   type_image: $("#hfImage").val(),
                                   type_order: $("#txtOrder").val(),
                                   type_summary: $("#txtSummary").val(),
                                   type_detail: $("#txtDetail").val(),
                                   type_code: $("#type_code").val(),
                                   type_position: $("#ddlPosition option:selected").val(),
                                   type_content: editor_a.getContent()

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
                   }

               });

           }



           
 $(".switch input[type=checkbox]").change(function () {

        var $this = $(this);
       
        $.ajax({
            type: "POST",
            url: "/Admin/TypeStatus/",
            async: false,
            data: {
                id: $this.attr("data"), 
            },
            beforeSend: function () {

            },
            success: function (data) {

                ok();
            },
            error: function () {
                alert('error');
            }
        })

    });
               



         