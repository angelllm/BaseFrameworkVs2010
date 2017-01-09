// JavaScript Document
$(function () {
    $('.Adminnav h4').click(function () {
        $(this).find('i').toggleClass('clickcolumn');
        $(this).next('.column').stop().slideToggle('hide');
    });

    $('.divselect,.divselectcact').click(function () {
        $(this).find('.selectlist').stop().slideToggle('show');
    })

    $('.floorname span').click(function () {
        $(this).addClass('clickfn').siblings().removeClass('clickfn');
        $(".floor_product_list").removeClass("curr-show").hide().eq($(this).index()).show().addClass("curr-show");
    })

    $('.add_product').click(function () {
        $('.layer,.addpc').fadeIn(500);
        isModify = false;
    })

    $('.layer').find('.close').click(function () {
        $('.layer,.addpc').fadeOut(500);
        sort();
    });
})


$(function () {

    $(document).on("click", ".addbut", function () {

        //current class as oneplc object
        var _parent = $(this).parent();
        var _img = _parent.find("img");
        //is modify pro info
        if (isModify) {

            if ($obj) {
                //current modify object parent container
                var _parent_layer = $obj.parent();
                var _parent_layer_img = _parent_layer.find("img");
                _parent_layer_img.attr("src", _img.attr("src"));
                //ajax for add product info
                //do something
                //end
            }

        } else {
            //add new pro info
            $(".curr-show .add_product").before($("#pro-tmpl").html().replace("{0}", _img.attr("src")));
            //ajax for add product info
            //do something
            //end
        }
        //sort();
    });


    $(document).on("click", ".myadd", function () {

        var _name = $("#myname").val();
        var _link = $("#mylink").val();
        var _img_upload_link = $("#hfImage").val(); //upload img path

        //is modify pro info
        if (isModify) {

            if ($obj) {
                //current modify object parent container
                var _parent_layer = $obj.parent();
                var _parent_layer_img = _parent_layer.find("img");
                _parent_layer_img.attr("src", _img_upload_link);
                //ajax for add product info
                //do something
                //end
            }

        } else {
            //add new pro info
            $(".curr-show .add_product").before($("#pro-tmpl").html().replace("{0}", _img_upload_link));
            //ajax for add product info
            //do something
            //end
        }
        //sort();
    });

    $(document).on("click", ".update_pro", function () {

        isModify = true;
        $('.layer,.addpc').fadeIn(500);
        $obj = $(this);

    });

    $(document).on("click", ".delecticon", function () {

        var $this = $(this);
        artDialog.confirm("确认删除吗?", function () {

            $this.parent().fadeOut(500);
            //do something
        });

    });


});

sort();


function sort() {


    $(".floor_product_list").sortable({
        opacity: 0.6,
        revert: true,
        cursor: 'move',
        handle: '.product_img',
        update: function (ev, ui) {
            //ajax do something sort this order
            //console.log(ui.item);
        },
        start: function () { }
    });
    // console.log("this is sort");
}