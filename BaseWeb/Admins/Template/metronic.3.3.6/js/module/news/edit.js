var obj = new Array();
define(function (require, exports, module) {

    var vms = avalon.define({
        $id: 'form',
        init: function () {
            avalon.ready(function () {
                avalon.vmodels["box"].filepath = $("#hfImage").attr("data-bind")
                avalon.vmodels["box"].status = $("#article_status").attr("data-bind")
                avalon.vmodels["box"].istop = $("#article_is_top").attr("data-bind") == "False" ? 0 : 1
                var editor_b = new baidu.editor.ui.Editor({ initialFrameWidth: '100%' });
                editor_b.render('article_page_content');
                //初始化分页编辑框

                for (var i = 1; i < 50; i++) {
                    obj.push("txt-" + (++i));
                }
                $.each($("textarea[name='article_list_content']"), function (index, item) {
                    var _id = $(item).attr("id");
                    obj[index] = new baidu.editor.ui.Editor({ initialFrameWidth: '100%' });
                    obj[index].render(_id);
                });

            });
        },
        changeSelect: function () {
            console.log("fuck change!!!")
        },
        initCheckBoxChecked: function () {
            var _article_type_list = $("input[name='article_type_list']").val()
            var _typelist = _article_type_list.split(",")
            $.each(_typelist, function (idx,it) {
                var _split = it.split("|")
                var _id    = _split[0],
                    _name  = _split[1],
                    _elem  = $("#ipt-" + _id)
                _elem.click()
                if (_elem.parents("ul").prev("label")[0]) {
                    _elem.parents("ul").prev("label").find("input").prop("checked",true)
                }
            })

        }


    })
    vms.init()
    vms.initCheckBoxChecked()
})