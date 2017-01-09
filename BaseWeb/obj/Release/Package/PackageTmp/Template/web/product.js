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
var _sku = $("#sku");
var __sku_color_ul = $(".sku-color dt ul");
var __sku_size_ul = $(".sku-size dt ul");
var __sku_temp = $("<dl class=\"sku-size\"><dd></dd><dt><ul></ul></dt></dl>");
var __sku_child_temp = $("<li><a><span></span></a></li>");
var sku_json = eval("(" + $("#hfSku").val() + ")");
var _total_count = 0;
var _sk1_append = __sku_temp.clone();
var _sk2_append = __sku_temp.clone();
var _sk3_append = __sku_temp.clone();
var sku1 = new Array();
var sku2 = new Array();
var sku3 = new Array();

$.each(sku_json.sku, function (index, item) {

    var _color_name = item.color_name;
    var _color_img = item.color_img;
    var _color_class = item.color_class;
    //var _size = item.size;
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
            setBuy();
        }

    });
    __sku_color_ul.append(_color_append);
    //sku inner start 

    if (item.sk1 != undefined) {
        //console.log(item.sk1);
        $.each(item.sk1, function (sk1_index, sk1_item) {

            //second sku 
            if (sk1_item.price != undefined) {
                if (index == 0) {
                    sku1.push(item.sku_area_name + "." + sk1_item.sku_name + "." + sk1_item.sku_data.split('.')[1]);
                }
                setCount(sk1_item.count);
                //console.log(sk1_item.price);
            } else {
                //parent index
                if (index == 0) {
                    sku1.push(item.sku_area_name + "." + sk1_item.sku_name + "." + sk1_item.sku_data.split('.')[1]);
                }
                if (sk1_item.sk2 != undefined) {

                    $.each(sk1_item.sk2, function (sk2_index, sk2_item) {
                        //third sku 
                        if (sk2_item.price != undefined) {
                            setCount(sk2_item.count);
                            if (sk1_index == 0 && index == 0) {
                                sku2.push(sk1_item.sku_area_name + "." + sk2_item.sku_name + "." + sk2_item.sku_data.split('.')[2]);
                            }
                            //console.log(sk2_item.price);
                        } else {

                            if (sk1_index == 0 && index == 0) {
                                sku2.push(sk1_item.sku_area_name + "." + sk2_item.sku_name + "." + sk2_item.sku_data.split('.')[2]);
                            }
                            if (sk2_item.sk3 != undefined) {
                                $.each(sk2_item.sk3, function (sk3_index, sk3_item) {
                                    setCount(sk3_item.count);
                                    //firth sku 
                                    if (sk3_item.price != undefined) {
                                        if (sk1_index == 0 && index == 0 && sk2_index == 0) {
                                            sku3.push(sk2_item.sku_area_name + "." + sk3_item.sku_name + "." + sk3_item.sku_data.split('.')[3]);
                                        }

                                    } else {
                                        //jsut firth sku
                                    }

                                });
                            }

                            //_sk2_append = "";
                        }

                    });

                }

            }

        });

    }

});


function sku() {

    this.start = function () {
       this.init();
    }
    this.init = function () {
        if (sku1.length != 0) this.set(sku1, _sk1_append);
        if (sku2.length != 0) this.set(sku2, _sk2_append);
        if (sku3.length != 0) this.set(sku3, _sk3_append);
    }
    this.set = function (sk,sk_append) {
        for (var i = 0; i < sk.length; i++) {
            var sku_array = sk[i].split('.');
            if (i == 0) sk_append.find("dd").text(sku_array[0]);
            sk_append.find("ul").append("<li data=\"" + sku_array[2] + "\"><a><label>" + sku_array[1] + "</label><i></i></a></li>");
        }
        _sku.append(sk_append);
    }
}

var sku = new sku();
sku.start();

function setNull() {
    $(".sku-price dt label").text($(".sku-price dt label").attr("data"));
    setEnabled();
}

function setEnabled() {
    $("#buy-area input").attr("disabled", "disabled");
}

function setPrice(price) {
    $(".sku-price dt label").text(price);
}

var __select_class = "tb-select";
$(".sku-size li").click(function () {
    var $this = $(this);
    if ($this.find("a").hasClass(__select_class)) {
        $this.find("a").removeClass(__select_class);
        setNull();
    } else {
        $this.find("a").addClass(__select_class).parent().siblings().find("a").removeClass(__select_class);
        setBuy();
    }
});

function isParam() {
    var flag = true;
    $.each($(".sku-size"), function () {
        if (!$(this).find("li a").hasClass(__select_class)) flag = false;
    });
    return flag;
}

function isColor() {
    var flag = true;
    if (!$(".sku-color").find("li a").hasClass(__select_class)) flag = false;
    return flag;
}

function setCount(count) {
    _total_count = parseInt(_total_count) + parseInt(count);
}

function _setCount(_total_count) {
    $("#sku-count .sku-count label span").text(_total_count);
}
_setCount(_total_count);

function getStore() {
    return parseInt($("#sku-count .sku-count label span").text());
}

function setBuy() {
    if (isParam() && isColor()) {
        //set disabled
        $("#buy-area input").removeAttr("disabled");
        //set price
        var sku_path = $(".sku-color ." + __select_class).parent().attr("data") + ".";
        $.each($(".sku-size"), function () {
            sku_path += $(this).find("." + __select_class).parent().attr("data") + ".";
        });
        sku_path = sku_path.substring(0, sku_path.lastIndexOf('.'));
        var _price_count_split = getKeyValue(sku_path).split('|');
        //set price and count
        setPrice(_price_count_split[0]);
        _setCount(_price_count_split[1]);
        if (_price_count_split[1] == 0) {
            setEnabled();
        }
    }
}

var _price_json = eval("(" + $("#hfPrice").val() + ")");
function getKeyValue(key) {
    var _out = "";
    for (var p in _price_json) {
        if (_price_json.hasOwnProperty(p)) {
            if (p == key) {
                _out = _price_json[p][0].price + "|" + _price_json[p][0].count;
                break;
            }
        }
    }
    return _out;
}

function getProSku() {

    var pro_sku = "{";
    pro_sku += "'title':'" + _sku.find("h2").text() + "',";
    pro_sku += "'price':'" + $(".sku-price").find("label").text() + "',";
    pro_sku += "'color_name':'" + $(".sku-color").find(".tb-select img").attr("title") + "',";
    pro_sku += "'count':'" + $("#txtCount").val() + "',";
    $.each($(".sku-size"), function (index, item) {
        pro_sku += "'sk" + (index + 1) + "':'" + $(item).find("dd").text() + "." + $(item).find(".tb-select label").text() + "',";
    });
    pro_sku = pro_sku.substring(0, pro_sku.lastIndexOf(','));
    pro_sku += "}"
    console.log(pro_sku);
}

$("#btnBuy").click(function () {
    getProSku();
    console.log("buy loading...");
});

$("#btnCart").click(function () {
    getProSku();
    console.log("cart loading...");
});

$(".iconfont:eq(0)").click(function () {
    var count = $(this).next();
    if (parseInt(count.val()) <= 1) {
        count.val(1);
    } else {
        count.val(parseInt(count.val()) - 1);
    }
    if (parseInt(count.val()) <= 1) { $(".iconfont:eq(0)").addClass("tb-disable"); }

});

$(".iconfont:eq(1)").click(function () {
    var count = $(this).prev();
    if (getStore() == 0) {
        //no store

    } else if (getStore() == parseInt(count.val())) {
        //store fill
    }
     else {
        count.val(parseInt(count.val()) + 1);
    }
    if ($(".iconfont:eq(0)").hasClass("tb-disable")) {
        $(".iconfont:eq(0)").removeClass("tb-disable");
    }

});

$(".txtCount").change(function () {
    checkCount(this);

}).blur(function () {
    checkCount(this);
});


function checkCount(obj) {

    var count = $(obj);
    if (isNaN(count.val())) {
        count.val(0);
    }
    else if (parseInt(count.val()) <= 0) {
        count.val(0);
    } else {
        count.val(parseInt(count.val()));
    }

}

//##--color size sku end