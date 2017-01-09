
//color size sku
var sku_json = eval("(" + $("#product_sku").val() + ")");
var _color_temp = 
"<dl id=\"{2}\">" +
    "<dd><em class=\"{0}\"></em>{1}</dd><dd>{3}</dd><dt><input type=\"button\" class=\"uplodBut\" value=\"设定图片\"></dt>" +
"</dl>";

var _temp =
"<table cellpadding=\"0\" id=\"{id}\" cellspacing=\"0\" border=\"0\" class=\"table\">" +
    "<tr>" +
        "<td><em class=\"{1}\"></em>{2}</td>" +
        "<td>{0}</td>" +
    "</tr>" +
"</table>";

var _table =
"<table id=\"{1}\" data=\"{data}\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">" +
    "<tr>" +
        "<td class=\"{x}\">{0}</td>" +
        "<td><input type=\"text\" class=\"txt-price\" value=\"{2}\" /></td>" +
        "<td><input type=\"text\" class=\"txt-count\" value=\"{3}\" /></td>" +
        "<td><input type=\"text\" class=\"txt-sn\" value=\"{4}\" /></td>" +
        "<td><div class=\"div-set\"><a class=\"set\">&nbsp;</a></div></td>" +
    "</tr></table>";

var _color_img_temp = "<div class=\"img-warpper\"><img height=\"17\" src=\"{1}\"><a></a></div>"

var _temp_html = "";
var _table_html = "";
var _color_temp_html = "";
$.each(sku_json.sku, function (index, item) {

    var _color_name = item.color_name;
    var _color_img = item.color_img;
    var _color_class = item.color_class;
    var _size = item.size;

    $.each(_size, function (ind, it) {
        var _size_name = it.size_name;
        var _size_class = it.size_class;
        var _size_id = it.size_id;
        var _price = it.price;
        var _count = it.count;
        var _sn = it.sn;
        _table_html += _table.replace("{0}", _size_name)
                             .replace("{x}", _size_class)
                             .replace("{2}", _price)
                             .replace("{3}", _count)
                             .replace("{4}", _sn)
                             .replace("{data}", it.size_color)
                             .replace("{1}", _size_id);
        var _checked_size_id = _size_id.replace(_color_class + "_table_", "");
        $("#" + _checked_size_id).find("input[type='checkbox']").attr("checked", "checked").next().text(_size_name).hide().next().val(_size_name).show();

    });
    _temp_html += _temp.replace("{0}", _table_html)
                       .replace("{1}", _color_class)
                       .replace("{2}", _color_name);

    _table_html = "";
    _color_temp_html += _color_temp.replace("{0}", _color_class)
                                   .replace("{1}", _color_name)
                                   .replace("{2}", "dl_" + $("#color-area ." + _color_class).parent().attr("id"))
                                   .replace("{3}", _color_img == "" ? "暂无图片" : _color_img_temp.replace("{0}", _color_img.replace("thumb", "normal")).replace("{1}", _color_img));

    $("#color-area ." + _color_class).prev().attr("checked", "checked").end().next().text(_color_name).hide().next().show().val(_color_name);

});
$("#sku-color-size").find(".nothing").fadeOut(200).after(_temp_html);
$("#color-image").find(".nothing").fadeOut(200).after(_color_temp_html);

//imagelist
var _imagelist = eval("(" + $("#product_image").val() + ")");
$.each(_imagelist.list, function (index, item) {
    var _src = item.src, _title = item.title, _order = item.order;
    $("#image-list .image-list-warpper").eq(_order).find(".image-upload").hide().next().show().append("<img src=\"" + _src + "\"><a></a><div class=\"image-list-item-title\" placeholder=\"\" contenteditable=\"true\">" + _title + "</div>");
});

//param
var _param = eval("(" + $("#product_param").val() + ")");
var __isChoon = 1, __isChoonLength = _param.param.length;
$.each(_param.param, function (index, item) {
    var _param_name = item.param_name, _param_id = item.param_id, _param_value = item.param_value, _obj_id = item.obj_id;
    $("#" + _obj_id + " option[value='" + _param_id + "']").attr("selected", true);
    __isChoon++;
    if (__isChoon == __isChoonLength) {
        jQuery(".chosen-select").chosen();
    }
});




