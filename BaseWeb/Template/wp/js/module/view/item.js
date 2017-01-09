
define(function (require) {

    require("jq");


    function getModel() {
        $.getJSON("/wp/item/", function (data) {
            modeljson = data;
        })
        return modeljson;
    }
   

    var ArticleModel = avalon.define({
        $id: "artcile",
        
        init: function () {

        }


    });

   

});