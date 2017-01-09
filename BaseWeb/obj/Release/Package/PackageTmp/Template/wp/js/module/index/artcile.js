
define(function (require) {
    function getArticleList(pageindex) {
   
        $.llm({
            url: "/wp/list/" + pageindex + "/",
            obj: ".excerpt",
            success: function (data) {
                ArticleModel.list = data;
            }
        });
    }

    function getTopList() {

        $.llm({
            url: "/wp/TopList/",
            obj: ".top",
            success: function (data) {
                ArticleModel.toplist = data;
            }
        });
    }


    function getListCount() {

        $.llm({
            url: "/wp/ListCount/",
            obj: ".pagination",
            success: function (data) {
                var count = parseInt(data.article_pv) / 10;
                var array = [];
                for (var i = 0; i < count; i++) {
                    array.push(i+1);
                }
                ArticleModel.listCount = array;
            }
        });
    }

    
    var ArticleModel = avalon.define({
        $id: "artcile",
        list: [],
        toplist: [],
        listCount: [],
        page: function (val) {
            getArticleList(val);
            $('body,html').animate({ scrollTop: 0 }, 200);
            return false;
        },
        init: function () {
            getArticleList(1);
            getTopList();
            getListCount();
        } 
    })
    ArticleModel.init();

    ArticleModel.$watch("list", function () {
        //
    }) 
});