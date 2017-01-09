define(function (require, exports, module) {



    var vm = avalon.define({
        $id: 'box',
        width: document.body.clientWidth,
        init: function () {

        }
        ,
        login: function () {
            var tel = $(this).parent().find("input.txt:eq(0)").val(); //获取手机号
            var telReg = !!tel.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
            if (telReg) {

                $.ajax({
                    url: "/shop/doLogin/",
                    //async: true,
                    data: {
                        name: $(".form input:eq(0)").val(),
                        pwd: $(".form input:eq(1)").val()
                    },
                    beforeSend: function () {
                        $(".zm").show()
                    },
                    success: function (data) {
                        console.log(data)
                        if (isNaN(data)) {
                            alert("用户名或密码错误")
                            $(".zm").hide()
                        } else {
                            window.location.href = "/shop/user/" + data + "/"
                        }
                    },
                    error: function () { }
                });

            } else {
                alert("请正确输入手机号码")
            }
        }

    })
    vm.init()




})