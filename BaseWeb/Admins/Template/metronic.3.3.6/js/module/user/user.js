define(function (require, exports, module) {

    require("touch")
    require("event")
    require("seen")

    var vm = avalon.define({
        $id: 'box',
        width: document.body.clientWidth,
        init: function () {

        }
        ,
        free: function () {
            var $this = $(this)
            $.ajax({
                url: "/shop/free/",
                data: {

                },
                beforeSend: function () {
                    $(".zm").show()
                },
                success: function (data) {
                    if (data == "ok") {
                        $(".zm").hide()
                    } else {
                        if (data == "no") {
                            window.location.href = "/shop/login/"
                        } else {
                            alert(data)
                            $(".zm").hide()
                            $this.remove()
                            window.location.href = window.location.href
                        }
                    }
                },
                error: function () { $(".zm").hide() }
            });
        }
        ,
        usefree: function () {
            var $this = $(this)
            $.ajax({
                url: "/shop/usefree/",
                data: {

                },
                beforeSend: function () {
                    $(".zm").show()
                },
                success: function (data) {
                    if (data == "ok") {
                        $(".zm").hide()
                    } else {
                        if (data == "no") {
                            window.location.href = "/shop/login/"
                        } else {
                            alert(data)
                            $(".zm").hide()
                            $this.remove()
                        }
                    }
                },
                error: function () { $(".zm").hide() }
            });
        }


        
    })
    vm.init()


})