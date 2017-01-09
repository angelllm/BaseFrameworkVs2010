
//color size sku
 
var sku_json = eval("(" + $("#product_sku").val() + ")");
var _color_temp = 
"<dl id=\"{2}\">" +
    "<dd><em class=\"{0}\"></em>{1}</dd><dd>{3}</dd><dt><input type=\"button\" class=\"uplodBut\" value=\"设定图片\"></dt>" +
"</dl>";

var __table_temp =
"<table cellpadding=\"0\" id=\"{id}\" cellspacing=\"0\" border=\"0\" class=\"{class}\">" +
    "<tr>" +
        "<td class=\"table-first\" id=\"{first}\">{x}</td>" +
        "<td class=\"table-cell\" id=\"{cell}\">{table}</td>" +
    "</tr>" +
"</table>";

var _table =
"<table id=\"{1}\" class=\"{class}\" data=\"{data}\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">" +
    "<tr>" +
        "<td class=\"{x}\">{0}</td>" +
        "<td class=\"table-price\"><input type=\"text\" value=\"{price}\" class=\"txt-price txts\" /></td>" +
        "<td class=\"table-count\"><input type=\"text\" value=\"{count}\" class=\"txt-count txts\" /></td>" +
        "<td class=\"table-sn\"><input type=\"text\" value=\"{sn}\" class=\"txt-sn txts\" /></td>" +
        "<td class=\"table-set\"><div class=\"div-set\"><a class=\"set\">&nbsp;</a></div></td>" +
    "</tr></table>";

var _color_img_temp = "<div class=\"img-warpper\"><img height=\"17\" src=\"{1}\"><a></a></div>"

var _temp_html = "";
var _table_html = "";
var _table_html2 = "";
var _table_html3 = "";
var _color_temp_html = "";
$.each(sku_json.sku, function (index, item) {

    var _color_name = item.color_name;
    var _color_img = item.color_img;
    var _color_class = item.color_class;
    var _color_id = item.color_id;
    var _row_id = item.row_id;
    var _row_class = item.row_class;
    var _td_first_id = item.td_first_id;
    var _td_first_class = item.td_first_class;
    var _td_cell_id = item.td_cell_id;
    var _td_cell_class = item.td_cell_class;
    var _sk1 = item.sk1;

    $.each(_sk1, function (index, item) {

        var _sku_name = item.sku_name;
        var _sku_id = item.sku_id;
        var _sku_class = item.sku_class;
        var _sku_cell_id = item.sku_cell_id;
        var _sku_cell_class = item.sku_cell_class;
        var _tbl_id = item.tbl_id;
        var _tbl_class = item.tbl_class;
        var _sku_data = item.sku_data;
        var _sk2 = item.sk2;
        $("#" + _tbl_id.replace("tbl_", "")).find("input[type='checkbox']").attr("checked", "checked").next().text(_sku_name).hide().next().val(_sku_name).show();

        $.each(_sk2, function (index, item) {

            var _sku_name = item.sku_name;
            var _sku_id = item.sku_id;
            var _sku_class = item.sku_class;
            var _tbl_id = item.tbl_id;
            var _tbl_class = item.tbl_class;
            var _sku_data = item.sku_data;
            var _price = item.price;
            var _count = item.count;
            var _sn = item.sn;

            _table_html2 += _table
                       .replace("{x}", _sku_class)
                       .replace("{first}", _sku_id)
                       .replace("{class}", _tbl_class)
                       .replace("{0}", _sku_name)
                       .replace("{price}", _price)
                       .replace("{count}", _count)
                       .replace("{sn}", _sn)
                       .replace("{data}", _tbl_id.replace("tbl_", ""))
                       .replace("{1}", _sku_id);

            $("#" + _tbl_id.replace("tbl_", "")).find("input[type='checkbox']").attr("checked", "checked").next().text(_sku_name).hide().next().val(_sku_name).show();

        });

        _table_html += __table_temp
                       .replace("{table}", _table_html2)
                       .replace("{x}", _sku_name)
                       .replace("{first}", _sku_id)
                       .replace("{cell}", _sku_cell_id)
                       .replace("{class}", _tbl_class)
                       .replace("{id}", _tbl_id);

        _table_html2 = "";
    });

    _temp_html += __table_temp
                       .replace("{table}", _table_html)
                       .replace("{x}", "<em class=\"" + _color_class + "\"></em>" + _color_name)
                       .replace("{first}", _td_first_id)
                       .replace("{cell}", _td_cell_id)
                       .replace("{class}", _row_class)
                       .replace("{id}", _row_id);

    _color_temp_html += _color_temp.replace("{0}", _color_class)
                                   .replace("{1}", _color_name)
                                   .replace("{2}", "dl_" + $("#color-area ." + _color_class).parent().attr("id"))
                                   .replace("{3}", _color_img == "" ? "暂无图片" : _color_img_temp.replace("{0}", _color_img.replace("thumb", "normal")).replace("{1}", _color_img));
    //reset table inner
    _table_html = "";

    $("#color-area ." + _color_class).prev().attr("checked", "checked").end().next().text(_color_name).hide().next().show().val(_color_name);

});

$("#sku-color-size").find(".nothing").fadeOut(200).after(_temp_html);
$("#color-image").find(".nothing").fadeOut(200).after(_color_temp_html);

//imagelist
if ($("#product_image").val() != "") {
    var _imagelist = eval("(" + $("#product_image").val() + ")");
    $.each(_imagelist.list, function (index, item) {
        var _src = item.src, _title = item.title, _order = item.order;
        $("#image-list .image-list-warpper").eq(_order).find(".image-upload").hide().next().show().append("<img src=\"" + _src + "\"><a></a><div class=\"image-list-item-title\" placeholder=\"\" contenteditable=\"true\">" + _title + "</div>");
    });
}
//param
if ($("#product_param").val() != "" &&  $("#product_param").val() != "]}") {
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
}



