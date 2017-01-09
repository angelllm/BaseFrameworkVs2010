
$(function () {

    $("#btnAdd").button().click(function () { add(); });
    $("#btnType").button().click(function () { window.location.href = '/Admin/TypeList/'; });


    $("#lblUrlTitle").text("字典管理");

    $(".control-del").click(function () {

        var $this = $(this);
        artDialog.confirm("确认删除么?", function () {

            $.ajax({
                type: "POST",
                url: "/Admin/DictDel/",
                async: false,
                data: {
                    id: $this.attr("data")
                },
                beforeSend: function () {

                },
                success: function (data) {

                    window.location.reload();
                },
                error: function () {
                    alert('error');
                }
            })

        });




    });


    $(".control-modify").click(function () {

        edit($(this));
    });
    $(".tbl tr:not(:first)").dblclick(function () {

        edit($(this));
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

               var tab = $("#temp-modify").clone(true).html();
               var id = $(obj).attr("data");



               art.dialog({
                   title: '字典参数添加',
                   id: "win_" + id,
                   content: tab,
                   resize: false,
                   init: function () { 
                       $("#edit-win").tabs(); 
                   },
                   ok: function () {
                       var tid;
                       if ($("#ddlType option").length == 1) {
                           tid = 0;
                       } else {
                           tid = $("#ddlType option:selected").val()
                           //console.log(tid);
                       }
                      
                       $.ajax({
                           type: "POST",
                           url: "/Admin/AddDcit/",
                           async: false,
                           data: {

                               dict_name: $("#txtName").val(),
                               dict_code: $("#txtCode").val(),
                               dict_pid: tid

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
                           error: function () {
                               alert('error');
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

                       $(".edit-win2").tabs();

                       $.ajax({
                           type: "POST",
                           url: "/Admin/DictEdit/" + id,
                           async: false,
                           data: {

                       },
                       beforeSend: function () {


                       },
                       success: function (data) {

                           $("#txtId").val(data.dict_id);
                           $("#txtName").val(data.dict_name);
                           $("#txtCode").val(data.dict_code);
                           
                           if (data.dict_pid != 0) {

                               $("#ddlType option[value='" + data.dict_pid + "']").attr("selected", true);
                              
                           }

                       },
                       error: function () {
                           alert('error');
                       }
                   })


               },
               ok: function () {

                   $.ajax({
                       type: "POST",
                       url: "/admin/DictModify/",
                       async: false,
                       data: {
                           id: id,
                           dict_name: $("#txtName").val(),
                           dict_pid: $("#ddlType option:selected").val(),
                           dict_code: $("#txtCode").val()
                       },
                       beforeSend: function () {

                           //                               art.dialog({
                           //                                   title: '正在执行操作...',
                           //                                   content: "<div class='loading'>正在执行操作,请稍后!</div>",
                           //                                   resize: false,
                           //                                   lock: true
                           //                               });
                       },
                       success: function (data) {

                           location.reload();
                       },
                       error: function () {
                           alert('error');
                       }
                   })

               }

           });

           }
