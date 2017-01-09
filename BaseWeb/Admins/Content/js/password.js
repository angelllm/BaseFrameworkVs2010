
jQuery(function () {


    jQuery("#lblUrlTitle").text("密码修改");
    jQuery("#btnAdd,#btnSave").button();
    jQuery("#edit-win").tabs();



    jQuery("#btnSave").click(function () {

        var flag = true;

        if ($.trim($("#admin_old_pwd").val()) == "") {
            getTip("请输入原始密码");
            flag = false;
        }
        else if ($.trim($("#admin_pwd").val()) == "") {
            getTip("请输入新密码");
            flag = false;
        }
        else if ($.trim($("#admin_pwd2").val()) == "") {
            getTip("请再次输入新密码");
            flag = false;
        }
        else if ($("#admin_pwd2").val() != $("#admin_pwd").val()) {
            getTip("请两次输入密码不一致");
            flag = false;
        } else {

            $.ajax({
                type: "POST",
                url: "/Admin/OldPassword/",
                async: false,
                data: {
                    p: $("#admin_old_pwd").val()
                },
                beforeSend: function () {

                },
                success: function (data) {

                    if (data == "no") {
                        getTip("原始密码错误");
                        flag = false;
                    } else {

                    }
                },
                error: function () {
                    alert('error');
                }
            })
        }

        if (!flag) {
            return false;
        }

        $('#ajax-form').ajaxForm
            (
                {
                    type: 'post',
                    beforeSubmit: function () {

                        art.dialog({
                            title: '操作提示',
                            id: "o_tip",
                            icon: 'succeed',
                            content: "正在操作,请稍候...",
                            resize: false,
                            //time: 1,
                            lock: true
                        });
                    },
                    success: function (data) {

                        console.log(data);
                        //    window.location.href = "/Admin/Password/";
                        //console.log(data);
                        //console.log("success");
                        //$("#product-add-form").resetForm();
                    },
                    error: function (XmlHttpRequest, textStatus, errorThrown) {
                        //console.log(errorThrown);
                    }
                }
            );

        return flag;
    });

});
function getTip(content) {

    art.dialog({
        title: '修改验证',
        id: "win_tips", 
        content: content, 
        time: 1  

    });
}