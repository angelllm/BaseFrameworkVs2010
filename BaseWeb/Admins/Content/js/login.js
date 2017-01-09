

$("#txtPwd").focus();
$("#login").click(function () {
    login();
});


$("#txtPwd").keyup(function () {

    if (window.event.keyCode == 13) {
        login();
    }
});



function login() {


    $.ajax({
        type: "POST",
        url: "/Admin/Login/?ReturnUrl=" + $("#hfUrl").val(),
        async: false,
        data: {
            u: $("#txtLoginName").val(),
            p: $("#txtPwd").val(),
            ReturnUrl: $("#hfUrl").val()
        },
        beforeSend: function () {

            getTip("正在登录,请稍候!");

        },
        success: function (data) {
            //console.log(data)
            if (data == "no") {
                getTip("用户或密码有误!");
            } else {
                window.location.href = data;
            }
        },
        error: function () {
            alert('error');
        }
    })

}
function getTip(content) {

    art.dialog({
        title: '登录验证',
        id: "win_tip",
        icon: 'warning',
        content: content,
        resize: false,
        time: 1,
        //follow: $this[0],
        lock: true

    });
}