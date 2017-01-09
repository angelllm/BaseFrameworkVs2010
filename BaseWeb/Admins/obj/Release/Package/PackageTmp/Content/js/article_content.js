
jQuery(function () {

    jQuery("#lblUrlTitle").text("文章内容添加/修改");
    jQuery("#btnAdd").button();

    $("#accordion").accordion();
    $(".modify,.delete").button();
    $("#btnAddArticle").button();
    $("#edit-win").tabs();
    $("#btnSub").button();

    $("#right-containter .nav h1").css("width", "260px");
    var _prev_win = $(window.parent.document);
    //_prev_win.find("#tosroll").click();
    _prev_win.find(".table-mm-content").css({ "overflow-y": "scroll" });
    //console.log($(document).height());
    _prev_win.find(".iframe").height($(document).height());


});

 

 
 var obj = new Array();
            for (var i = 0; i < 50; i++) {
                obj.push("ue_" + (++i));
            }
            //alert(obj);
            var list = new Array();
            list.push("txtContent");
            var title = new Array();

            var option = {};
            $(function () {
                $.each($(".editor-self"), function (index, item) {
                    var _id = $(item).attr("id");
                    list.push(_id);
                    option = { textarea: _id };
                    editor = new UE.ui.Editor(option);
                    obj[++index] = editor;
                    editor.render($(item)[0]);
                    option = {};

                });

                $.each($(".editor-title"), function (index, item) {
                    var _id = $(item).attr("id");
                    title.push(_id);
                });

                $("#hfTitle").val(title);
                $("#hfList").val(list);
            });

            function getTip(content) {

                art.dialog({
                    title: '输入提示',
                    id: "win_tip",
                    icon: 'warning',
                    content: content,
                    resize: false,
                    time: 1,
                    //follow: $this[0],
                    lock: true

                });
            }

            function add_article_content(title, c, aid) {


                $.ajax({
                    type: "POST",
                    url: "/Admin/ArticleContentAdd/",
                    async: false,
                    data: {
                        title: title,
                        c: c,
                        aid: aid
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

            }


            function sub(val) {

                var add_content = editor_a.getContent();
                var add_title = $("#txt_title").val();
                if ($.trim(add_title) == "") {

                    getTip("请填写标题!");
                    return;
                }
                if ($.trim(add_content) == "") {

                    getTip("请填写内容!");
                    return;
                }

                add_article_content(add_title, add_content, val);
              
            }



            function orderby(cur_obj,id){
                
                var num = 0;
                try {
                        num = parseInt($(cur_obj).val());
                    } catch (e) {
                        num=1;
                    }

                    if (num==parseInt($(cur_obj).attr("data"))) {
                        return;
                    }


                $.ajax({
                    type: "POST",
                    url: "/Admin/ArticleContentOrderModify/",
                    async: false,
                    data: {
                        id: id,
                        order: num
                        
                    },
                    beforeSend: function () {


                    },
                    success: function (data) {

                        getTip("修改排序成功!");

                    },
                    error: function () {
                        alert('error');
                    }
                })


       
                
            }

            function modify(index,id) {
              
                var modify_c = obj[index].getContent();
                var modify_title = $("#tit_" + index).val();

                $.ajax({
                    type: "POST",
                    url: "/Admin/ArticleContentModify/",
                    async: false,
                    data: {
                        id: id,
                        title: modify_title,
                        c: modify_c
                    },
                    beforeSend: function () {


                    },
                    success: function (data) {

                        getTip("更新成功!");

                    },
                    error: function () {
                        alert('error');
                    }
                })


            }



            function delete_content(id) {

                art.dialog.confirm('删除确认','你确认删除操作？', function () {

                    $.ajax({
                        type: "POST",
                        url: "/Admin/ArticleContentDelete/",
                        async: false,
                        data: {
                            id: id
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



                }, function () {

                });



            }

 