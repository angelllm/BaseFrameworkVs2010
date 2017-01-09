
$(function () {


    $("#lblUrlTitle").text("会员添加");
    $("#btnAdd,#btnSave").button()
    var _prev_win = $(window.parent.document);
    _prev_win.find(".table-mm-content").css({ "overflow-y": "hide" });
    _prev_win.find(".iframe").height("100%");
    jQuery(".chosen-select").chosen();
    jQuery("#edit-win").tabs();

    $("#member_phone").keyup(function () {
        $("#member_pwd").val($(this).val().slice($(this).val().length - 4))
        $("#member_name").val($(this).val())
    })

    $("#btnSave").click(function () {
        var _this = $(this)
        var tel = $("#member_phone").val() //获取手机号
        var telReg = !!tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/)
        if (telReg) {

            $.ajax({
                type: "POST",
                url: "/Admin/DoMemberAdd/",
                //async: false,
                data: {
                    typeid: $("#ddlType").val(),
                    name: $("#member_name").val(),
                    phone: $("#member_phone").val(),
                    pwd: $("#member_pwd").val(),
                    status: $("#cbkStatus").prop("checked") ? 1 : 0
                },
                beforeSend: function () {
                    _this.attr("disabled", "disabled")
                },
                success: function (data) {
                    ok()
                    _this.removeAttr("disabled")
                },
                error: function (e) {
                    console.log(e)
                }
            })
        } else {
            alert("手机号码输入有误！！！") 
        }

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
          

        

           

               



         