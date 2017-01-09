define(function (require, exports, module) {

    require("wid")
    require("/Content/js/ueditor/ueditor.config")
    require("/Content/js/ueditor/ueditor.all")
    //require("/Content/js/ueditor/lang/zh-cn/zh-cn")
    //require("/content/js/uploadify/jquery.uploadify-3.1")
    require("module/news/form-validation.min")
    require("trans")
    require("fl3")
    require("vendor/plug/bootstrap-tagsinput.min")
    require("vendor/plug/jquery.minicolors.min")
    require("vendor/plug/components-color-pickers.min")

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
                editor_a.render('article_content');
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
        modifyContent: function (id, objindex) {
            var _this = $(this)
            $.ajax({
                url: "/admin/modfiyContent/",
                //async: true,
                data: {
                    id: id,
                    c: obj[objindex - 1].getContent()
                },
                type: "post",
                beforeSend: function () {

                },
                success: function (data) {
                    alert("修改成功！", "更新操作提示")
                },
                error: function (e) {

                }
            })
        }
        ,
        delContent: function (id, wapper) {

            dialog("确认删除吗？", "删除操作", function () { }, function () {


                $.ajax({
                    url: "/admin/delContent/",
                    //async: true,
                    data: {
                        id: id
                    },
                    type: "post",
                    beforeSend: function () {

                    },
                    success: function (data) {
                        alert("删除成功！", "删除操作提示")
                        $("#" + wapper).fadeOut(300)
                    },
                    error: function (e) {

                    }
                })


            })

        }
        ,
        orderContent: function (id) {
            var _this = $(this)
            $.ajax({
                url: "/admin/orderContent/",
                //async: true,
                data: {
                    id: id,
                    order: _this.val()
                },
                type: "post",
                beforeSend: function () {

                },
                success: function (data) {
                    alert("排序成功！", "排序操作提示")
                },
                error: function (e) {

                }
            })
        }
        ,
        modifyContentTitle: function (id) {
            var _this = $(this)
            $.ajax({
                url: "/admin/modifyContentTitle/",
                //async: true,
                data: {
                    id: id,
                    title: _this.val()
                },
                type: "post",
                beforeSend: function () {

                },
                success: function (data) {
                    alert("修改标题成功！", "修改标题操作提示")
                    _this.parents("h4").find("a:eq(0)").html(_this.val())
                },
                error: function (e) {

                }
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

        },
        selectParent: function () {
            var _this = $(this)
            var _parant = _this.parents(".list-unstyled")
            var _siblingsChild = _this.parent().parent().siblings("li").find("input[type='checkbox']")
            var _siblingsChildCheckedLength = 0
            $.each(_siblingsChild, function (idx, item) {
                if ($(item).prop("checked")) _siblingsChildCheckedLength++
            })
            var _flag = true
            if (!_this.prop("checked") && _siblingsChildCheckedLength == 0) {
                _flag = false
            } else {
                _flag = true
            }
            _parant.prev().find("input[type='checkbox']").prop("checked", _flag)
            vm.compatibleArticleType()
            vm.pushTypeList()
        },
        selectSelfAndChild: function () {
            var _this = $(this)
            var _checkboxs = _this.parent().next().find("input[type='checkbox']")
            if (_checkboxs.length != 0) {
                $.each(_checkboxs, function (idx, item) {
                    $(item).prop("checked", _this.prop("checked"))
                })
            }

            //
            vm.compatibleArticleType()
            vm.pushTypeList()
            
            //console.log(vm.typelist.length)
        },
        compatibleArticleType: function () {
            var _article_type = $("input[name='article_type']")
            var _typeListWrapper = $("#typelist")
            var _checkedLength = _typeListWrapper.find("input[type='checkbox']:checked").length
            if (_checkedLength == 0) {
                _article_type.val(_article_type.attr("data-def"))
            } else {
                var _first = _typeListWrapper.find("input[type='checkbox']:checked").eq(0)
                _article_type.val(_first.val() + "|" + _first.parent().text().trim())
            }
        },
        typelist: [],
        pushTypeList: function () {
            vm.typelist = []
            var _article_type_list = $("input[name='article_type_list']")
            
            var categories = $("input[name=\"categories\"]")
            $.each(categories, function (idx, it) {

                if ($(it).prop("checked")) {
                    var _next = $(it).parent().next()
                    if (_next.find("input[name=\"categories[]\"]")[0]) {
                        $.each(_next.find("input[name=\"categories[]\"]:checked"), function (index, item) {
                            vm.typelist.push($(item).val() + "|" + $(item).parent().text().trim())
                        })
                    }
                    else {
                        vm.typelist.push($(it).val() + "|" + $(it).parent().text().trim())
                    }
 
                }
            })

            _article_type_list.val(vm.typelist.join(","))
            //console.log(vm.typelist.join(","))
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