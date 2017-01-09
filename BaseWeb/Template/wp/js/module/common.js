
define(function (require) {

    require("jq"); 
    
    var web = avalon.define({
        $id: "web",
        aside: "/template/wp/include/right.htm",
        header: "/template/wp/include/header.htm",
        footer: "/template/wp/include/footer.htm"
    });
     

    //set ajax setup
    $.ajaxSetup({
        //async: false
    });
     
    var ljax = $.llm =  function llmAjax(opt) {
        var obj = opt.obj || "[loading=\"init\"]";
        var url = opt.url;
        var async = opt.async || true;
        var data = opt.data || [];
        var dataType = opt.dataType || "json";
        var beforeSend = opt.beforeSend ||
                            function () {
                                //$(obj).before($("<div class='loading' />"))
                            };
        var complete = opt.complete || 
                            function () {
                                $(obj).fadeIn(300).eq(0).prev($(".loading")).hide();
                            };
        var success = opt.success || $.noop();
                        
        var error = opt.error || $.noop;

        //console.log(obj);

        $.ajax({
            url: url,
            async: async,
            data: data,
            dataType: dataType,
            beforeSend: beforeSend,
            complete: complete,
            success: success,
            error: error
        });
    }

    require("nav");
    require("right");
});