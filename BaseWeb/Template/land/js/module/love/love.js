define(function (require, exports, module) {

    require("http://oss.rainman.me/rainman.me/js/sakura/jquery-sakura.js")
    var vm = avalon.define({
        $id: 'love',
        init: function () {

            $(function () {
                $('body').sakura();
            })

            $(window).load(function () {
                $('body').sakura();
            })

            var _audio = $("audio")[0]
            _audio.play()
        }

    })

    vm.init()


})