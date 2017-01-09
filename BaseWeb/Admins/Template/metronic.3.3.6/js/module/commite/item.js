define(function (require, exports, module) {

    require("wid")
    require("/Content/js/ueditor/ueditor.config")
    require("/Content/js/ueditor/ueditor.all")
    require("module/news/form-validation.min")
    require("trans")
    require("fl3")


    var vm = avalon.define({
        $id: 'box',
        filepath: "",
        isupload: false,
        status: 1,
        istop: 0,
        tag: [],
        init: function () {
            //头部菜单高亮
            $(".classic-menu-dropdown:eq(0)").addClass("active").find("li:eq(1)").addClass("active")
            avalon.ready(function () {
                //初始化编辑框
                var editor_a = new baidu.editor.ui.Editor({ initialFrameWidth: 600 });
                editor_a.render('commite_content');
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
        changeTop: function () {
            vm.istop = vm.istop == 0 ? 1 : 0
        }
        ,
        showTags: function () {
            $(".tag-wapper").toggle("fast")
        }
        ,
        addTag: function () {
            var _this = $(this)
            var _tagname = $("#txtTag").val()
            $.ajax({
                url: "/admin/addTag/",
                //async: true,
                data: {
                    tagname: _tagname
                },
                type: "post",
                beforeSend: function () {
                    
                },
                success: function (data) {
                    var _temp = '<a href="javascript:;"class="btn default "><span  ms-on-click="appendTag">{0}</span><i ms-on-click="delTag({1})" class="fa fa-close"></i></a>'
                    $("a.btn.default").first().before(_temp.replace("{0}", _tagname).replace("{1}", data))
                    $("#txtTag").val("")
                    _this.prev().click()
                    avalon.scan(document.getElementById("tab_6_3"), avalon.vmodels["box"])
                },
                error: function (e) {

                }
            })
        }
        ,
        delTag: function (id) {
            var _this = $(this)
            var _parent = _this.parent()
            dialog("确认删除吗？", "删除操作", function () { }, function () {
                _parent.fadeOut(function () {
                    _parent.remove()
                    //ajax del tag
                    $.ajax({
                        url: "/admin/delTag/",
                        //async: true,
                        data: {
                            id: id
                        },
                        type: "post",
                        beforeSend: function () {

                        },
                        success: function (data) {
                             
                        },
                        error: function (e) {

                        }
                    })

                })
            })
        }
        ,
        appendTag: function () {
            $(".bootstrap-tagsinput input").focus().val($(this).text()).blur()
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

    $(function () {
        $(".bootstrap-tagsinput input").blur(function () {
            vm.tag = []
            $.each($(this).parent().find("span.tag"), function (index, item) {
                vm.tag.push($(item).text())
            })
            $("input[name='article_tag']").val(vm.tag.join(','))
        })
    })
})