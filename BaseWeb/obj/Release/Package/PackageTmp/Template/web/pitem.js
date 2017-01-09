//imagelist
var _imagelist = eval("(" + $("#hfImageList").val() + ")");
$.each(_imagelist.list, function (index, item) {
    var _src = item.src, _title = item.title, _order = item.order;
    var _img = $("<img />");
    _img.attr("src", _src).attr("title", _title == "请输入标题说明" ? "" : _title);
    _img.bind("click", function () {
        $(".large img").attr("src", _src.replace("thumb", "normal"));
        _img.after("<i></i>").parent().addClass("img-select").siblings().removeClass("img-select").find("i").remove();
    });
    var _a = $("<a />");
    _img.appendTo(_a);
    $(".small-list").append(_a);
});
//--imagelist end

//##color size sku
//color size sku
var __sku_color_ul = $(".sku-color dt ul");
var __sku_size_ul = $(".sku-size dt ul");
var __sku_size_temp = $("<li><a><span></span></a></li>");
var sku_json = eval("(" + $("#hfSku").val() + ")");

$.each(sku_json.sku, function (index, item) {

    var _color_name = item.color_name;
    var _color_img = item.color_img;
    var _color_class = item.color_class;
    var _size = item.size;
    var _color_id = item.color_id;
    var _color_append = $("<li><a><label>" + _color_name + "<i></i></label></a></li>");
    if (_color_img != "") {
        _color_append = $("<li><a><img src=\"\" /><i></i></a></li>");
        _color_append.find("img").attr("src", _color_img).attr("title", _color_name);
    }
    _color_append.attr("data", _color_id);
    _color_append.bind("click", function () {
        if (_color_img != "") {
            $(".large img").attr("src", _color_img.replace("thumb", "normal"));
        }
        var __select_class = "tb-select";
        var _select = _color_append.find("a");
        if (_select.hasClass(__select_class)) {
            _select.removeClass(__select_class);
            setNull();
        } else {
            _select.addClass(__select_class).parent().siblings().find("a").removeClass(__select_class);
            if (__sku_size_ul.find("a").hasClass(__select_class)) {
                var __color_id = _color_id;
                var __size_id = __sku_size_ul.find("." + __select_class).parent().attr("data");
                for (var i = 0; i < list.length; i++) {
                    if (list[i].indexOf(__color_id + "." + __size_id) != -1) {
                        var split = list[i].split(".");
                        setPrice(split[split.length - 2]);
                        //var __store = split[3];
                    }
                }
            } else {
                setNull();
            }
        }

    });
    __sku_color_ul.append(_color_append);

    $.each(_size, function (ind, it) {

        var __sku_size_temp = "";
        var _size_id = it.size_id;
        var _size_data = it.size_data;
        var _size_color = it.size_color;
        var _price = it.price;
        var _size_name = it.size_name;
        var _id = it.id;
        var _count = it.count;

        if (index == 0) {
            __sku_size_temp = $("<li><a><span></span><i></i></a></li>");
            __sku_size_temp.find("span").text(_size_name);
            __sku_size_temp.attr("data", _size_data);
            var __select_class = "tb-select";
            var __color_select = __sku_color_ul.find(__select_class);
            __sku_size_temp.bind("click", function () {
                var _select = __sku_size_temp.find("a");
                if (_select.hasClass(__select_class)) {
                    _select.removeClass(__select_class);
                    setNull();
                } else {
                    _select.addClass(__select_class).parent().siblings().find("a").removeClass(__select_class);
                    if (__sku_color_ul.find("li").find("a").hasClass(__select_class)) {
                        var __color_id = __sku_color_ul.find("." + __select_class).parent().attr("data");
                        var __size_id = _size_data;
                        for (var i = 0; i < list.length; i++) {
                            if (list[i].indexOf(__color_id + "." + __size_id) != -1) {
                                var split = list[i].split(".");
                                setPrice(split[split.length - 2]);
                                //var __store = split[3];
                            }
                        }
                    } else {
                        setNull();
                    }
                }
            });
            __sku_size_ul.append(__sku_size_temp);
        }
    });

});

function setNull() {
    $(".sku-price dt label").text( $(".sku-price dt label").attr("data"));
}

function setPrice(price) {
    $(".sku-price dt label").text(price);
}


//##--color size sku end