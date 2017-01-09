define(function (require, exports, module) {
    require.async([
        "btm",
        "app",
        "bootbox",
        "dropdown",
        "toastr",
        "date-picker",
        "counterup",
        "waypoints",
        "slimscroll",
        "blockui",
        "uniform",
        "switch",
        "full",
        "validate",
        "wysihtml5",
        "bwysihtml5",
        "markdown",
        "bmarkdown",
        "layout",
        "sidebar"
    ])

    var vm = avalon.define({
        $id: 'page',
        init: function (pagecount) {
            vm.initPage

        }
        ,
        //全选开始
        data: [{ checked: false }, { checked: false }, { checked: false }, { checked: false }, { checked: false }, { checked: false }, { checked: false }, { checked: false }, { checked: false }, { checked: false}],
        selectArr: [],
        allchecked: false,
        checkAll: function () {
            var bool = this.checked
            vm.data.forEach(function (el) {
                el.checked = bool
            })
            vm.setSelectVal()
        },
        checkOne: function () {

            var _this = this
            if (!this.checked) {
                vm.allchecked = false
            } else {
                vm.allchecked = vm.data.every(function (el) {
                    return el.checked
                })
            }
            vm.setSelectVal()
        }
        ,
        clearSelect: function () {

            vm.data.forEach(function (el) {
                el.checked = false
            })
        }
        ,
        setSelectVal: function () {
            vm.selectArr = []
            $(".check-item:checked").each(function (index, item) {
                vm.selectArr.push(item.getAttribute("data-id"))
            })
            return vm.selectArr.join(",")
        }
        ,
        request:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
            var r = window.location.search.substr(1).match(reg)
            if (r != null) return decodeURIComponent(r[2]) 
            return null
        }
        ,
        delMath: function (url) {
            if (vm.setSelectVal() == "") {
                alert()
            } else {
                toastr.clear()
                dialog("确认删除所选数据吗？", "批量操作提示", null, function () {
                    $.ajax({
                        url: url,
                        async: true,
                        data: {
                            id: vm.setSelectVal()
                        },
                        type: "post",
                        beforeSend: function () {
                            $(vm.tabels).hide().prev().removeClass("hide")
                        },
                        success: function (data) {
                            vm.clearSelect()
                            avalon.vmodels["box"].getlist(avalon.vmodels["box"].options, function () {
                                var _totalcount = avalon.vmodels["box"].totalcount //获取总数据量
                                $(".widget-thumb-body-stat").eq(0).text(_totalcount).attr("data-value", _totalcount)
                            }) //更新列表
                            avalon.vmodels["box"].loadones = true  //初始化分页
                            
                        },
                        error: function (e) {
                            //console.log(e)
                        }
                    });
                })
            }
        }
        //全选结束
        ,
        selectType: function () {

            var _txt = $(this).find("option:selected")
            var _val = _txt.text().replace('├', '').replace("─", "").replace("─", "").replace("─", "").replace("─", "")
            $(this).prev().val(_txt.val() + "|" + _val)
            //console.log($(this).parent().val())
        }
        ,
        selectTypeAdv: function () {
            avalon.vmodels["page"].selectType()
            var _txt = $(this).find("option:selected")
            var _val = _txt.text().replace('├', '').replace("─", "").replace("─", "").replace("─", "").replace("─", "")
            $(this).prev().val(_txt.val() + "|" + _val)
            $("input[name='type_dict_code']").val(_txt.attr("data-bind"))
        }
        ,
        refresh: function () {
            vm.clearSelect()
            avalon.vmodels["box"].getlist()
        }

    })

    avalon.ready(function () { });



})


function dialog(msg,title,scall,mcall){

    bootbox.dialog({
        message:avalon.isFunction(msg) ?  "确认删除吗？":msg ,
        title: avalon.isFunction(title) ? "操作提示" :title,
        buttons: {
            success: {
                label: "取消",
                className: "green",
                callback: function () {
                    avalon.isFunction(msg) ? msg() :
                    avalon.isFunction(scall) ? scall() : avalon.noop() 
                }
            }
            ,
            main: {
                label: "确定",
                className: "blue",
                callback: function () {
                    avalon.isFunction(title) ? title() :
                    avalon.isFunction(mcall) ? mcall() : avalon.noop() 
                }
            }
        }
    })

} 



function alert(msg,title){
   
   toastr.options = {
      "closeButton": true,
      "debug": false,
      "positionClass": "toast-top-center",
      "onclick": null,
      "showDuration": "1000",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
   toastr.clear()
   toastr.error(msg || "请选择需要删除的数据！", title || "操作提示")
} 