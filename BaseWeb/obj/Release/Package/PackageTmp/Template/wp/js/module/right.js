
define(function (require) {

    require("jq");
  
    function getTagList() {
        $.llm({
            url: "/wp/TagList/",
            obj: ".d_tags",
            success: function (data) {
                rightModel.tag = data;
            }
        });
    }
    function getCommiteList() {
        $.llm({
            url: "/wp/CommiteList/",
            obj: ".commite",
            success: function (data) {
                rightModel.commite = data;
            }
        });
    }
    function getLikeList() {
        $.llm({
            url: "/wp/LikeList/",
            obj: ".like",
            success: function (data) {
                rightModel.like = data;
            }
        });
      
    }
   
    var rightModel = avalon.define({
        $id: "aside",
        tag: [] ,
        commite: [],
        like: [],
        init: function () {
            getTagList();
            getCommiteList();
            getLikeList();
        }

    });

    rightModel.init();
    
});