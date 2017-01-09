
define(function (require) {

    require("jq");

    function getNav() {

        $.llm({
            url: "/wp/NavList/",
            obj: ".navbar",
            success: function (data) {
                NavModel.nav = data;
                NavModel.menu = data;
            }
        });
    }

    var NavModel = avalon.define({
        $id: "headNav",
        nav: []
       ,
        menu: []
       ,
        init: function () {
            getNav()
        }

    });
    NavModel.init();
    
});