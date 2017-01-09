
$(function () {

    $("#lblUrlTitle").text("商品添加");
    $("#btnAdd").button();
    $("#edit-win").tabs();
    $("#btnSub,#btnSave,#btnSaveContent").button();
    // init article_type val
    $("#article_type").val($(this).find("option:selected").val());

});



/*******sku********/
var __table_temp =
"<table cellpadding=\"0\" id=\"{id}\" cellspacing=\"0\" border=\"0\" class=\"table {class} {tc} {rows}\">" +
    "<tr>" +
        "<td class=\"table-first\" id=\"{first}\">{x}</td>" +
        "<td class=\"table-cell\" id=\"{cell}\"></td>" +
    "</tr>" +
"</table>";
var _table =
"<table id=\"{1}\" class=\"{class}\" data=\"{data}\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">" +
    "<tr>" +
        "<td class=\"table-first {x}\">{0}</td>" +
        "<td class=\"table-price\"><input type=\"text\" class=\"txt-price txts\" /></td>" +
        "<td class=\"table-count\"><input type=\"text\" class=\"txt-count txts\" /></td>" +
        "<td class=\"table-sn\"><input type=\"text\" class=\"txt-sn txts\" /></td>" +
        "<td class=\"table-set\"><div class=\"div-set\"><a class=\"set\">&nbsp;</a></div></td>" +
    "</tr>"
"</table>";

var __sku = $("#sku-color-size");
var _sku_length = $(".sku-param").length;
//.sku-param input[type='checkbox']").click start
$(".sku-param input[type='checkbox']").click(function () {

    var $this = $(this);
    var _check_id = $this.parent().attr("id");
    var _skuParam = $this.parent().parent().parent();
    var _skuParamIndex = _skuParam.attr("index");
    var _isAllChecked = true;
    //console.log(_skuParam.attr("index"));
    //color is checked
    $.each($(".sku-param"), function (param_index, param_item) {
        if ($(param_item).find("input[type='checkbox']:checked").length == 0) {
            _isAllChecked = false;
        }
    });
    if ($this.attr("checked") == "checked") {
        //init
        $this.next().hide().next().show();
        //color not checked
        if ($("#color-area").find("input[type='checkbox']:checked").length == 0) {
            //console.log(_isAllChecked);
        } else {
            //color-area input[type='checkbox']:checked start


            //_isAllChecked start
            if (_isAllChecked) {
                //select all append total table
                __sku.find(".nothing").hide();
                //each start
                $.each($("#color-area input[type='checkbox']:checked"), function (color_index, color_item) {

                    var _color_class = $(color_item).next("em").attr("class");
                    var _color_name = $(color_item).next("em").next("small").text();
                    var _id = $(color_item).parent().attr("id");

                    //__sku start
                    if (!__sku.find("#tbl_" + _id).html()) {
                        
                        //fill
                        __sku.append(
                            __table_temp.replace("{id}", "tbl_" + _id)
                                        .replace("{x}", "<em class=\"" + _color_class + "\"></em>" + _color_name)
                                        .replace("{first}", "first_" + _id)
                                        .replace("{cell}", "cell_" + _id)
                                        .replace("class=\"table", "class=\"rows")
                                        .replace("{class}", "")
                                        .replace("{tc}", "")
                                        .replace("{rows}", "")

                                        );
                        //
                        fill(_id);

                    } //__sku end
                    else {
                        if (color_index == 0) {
                            fillOne(_check_id);
                        }
                    }
                }); //each end 

            } //_isAllChecked end

        } //color-area input[type='checkbox']:checked end

    }
    //.sku-param input[type='checkbox']").click not select
    else {
        //init
        $this.next().show().next().hide();
        //
        var _parent_id = ".tc_" + $this.parent().attr("id");
        $(_parent_id).fadeOut(function () { $(_parent_id).remove(); });

        if (!_isAllChecked) {
            $(".table").fadeOut(function () { $(".table").remove(); });
            //console.log(".table");
        }

    }


});


function fillOne(color_id) {

    var _parent = $("#" + color_id).parent().parent();
    var _index = _parent.attr("index");
    var _name = $("#" + color_id).find("small").text();
    var _id = _parent.attr("id");
    var _sku_table = $("." + _id);

    var _tbl = _sku_table.eq(0).clone(true);
    var _copy_table_id = _tbl.attr("id");
    var _copy_table_class = _tbl.attr("class");
    var _copy_table_class_list = _copy_table_class.split(' ');
    _tbl.attr("id", "tbl_" + color_id);
    if (_copy_table_class_list.length > 3) {
        _tbl.attr("class", _copy_table_class_list[0] + " " + _copy_table_class_list[1] + " tc_" + color_id + " " + _copy_table_class_list[3]);
    }
    else if (_copy_table_class_list.length == 3) {
        _tbl.attr("class", _copy_table_class_list[0] + " tc_" + color_id + " " + _copy_table_class_list[2]);
    }
    else {
        _tbl.attr("class", +" tc_" + color_id + " " + _copy_table_class_list[0]);
    }
    _tbl.find(".table-first").eq(0).attr("id", "first_" + color_id).html(_name)
    _tbl.find(".table-cell").eq(0).attr("id", "cell_" + color_id);
    
    _sku_table.parent().append(_tbl[0]);
}

function fill(color_id) {
    var _append_id = "cell_" + color_id;
    var fill_content = "";
    $.each($("#sku-area-1 input[type='checkbox']:checked"), function (checkbox_index, checkbox_item) {
        var _checkbox_item_name = $(checkbox_item).next().text();
        var _id = $(checkbox_item).parent().attr("id");
        fill_content += _table
                        .replace("{id}", "tbl_" + 1 + "_" + _id)
                        .replace("{class}","sku-area-1 tc_" + _id + " row2")
                        .replace("{1}", "tbl_" + _id)
                        .replace("{x}", "cell_" + _id)
                        .replace("{0}", _checkbox_item_name)
                        .replace("{data}", _id);

    });
    $("#" + _append_id).append(fill_content);
    return fill_content;
}
 

$("#color-area input[type='checkbox']").click(function () {

    var _this = $(this).parent();
    var _color_bg = _this.find("em").attr("class");
    var _color_name = $(this).next().next().text();
    var _color_area = $("#color-image");
    //选中
    if ($(this).attr("checked") == "checked") {
        var _tbl_id = "tbl_" + _this.attr("id");
        var _color_temp = "<dl id=\"{2}\">" +
                             "<dd><em class=\"{0}\"></em>{1}</dd><dd>暂无图片</dd><dt><input type=\"button\" class=\"uplodBut\" value=\"设定图片\"></dt>" +
                          "</dl>";
        //color area
        var _color_value = _this.find(".color-txt").val();
        _color_value = _color_temp.replace("{0}", _color_bg).replace("{1}", _color_value).replace("{2}", "dl_" + _this.attr("id"));
        _color_area.find(".nothing").hide().parent().append(_color_value);
        //sku add
        var _add_table = $(".rows").eq(0).clone(true);
        _add_table.attr("id", _tbl_id).find(".table-first").eq(0).attr("id", "first_" + _tbl_id)
        .next().attr("id", "cell_" + _tbl_id)
        _add_table.find(".table-first").eq(0).html("<em class=\"" + _color_bg + "\"></em>" + _color_name)
        _add_table.find(".table-cell").eq(0).attr("id", "cell_" + _tbl_id);
        //console.log(_add_table[0]);
        if ($(".rows").html()) {
            __sku.append(_add_table[0]);
        }
        _this.find(".color-txt").show().end().find("small").hide();
    }
    else {//取消选中
        $("#tbl_" + _this.attr("id")).fadeOut(function () { $("#tbl_" + _this.attr("id")).remove(); });
        var __cur_dl = $("#dl_" + _this.attr("id"));
        __cur_dl.fadeOut(200, function () { __cur_dl.remove(); });
        _this.find(".color-txt").hide().end().find("small").show();
    }
});


//set
$(".row2 .set").live("click", function () {
    //console.log("xxx");
    var __table = $(this).parent().parent().parent().parent().parent();
    //console.log(__table[0]);
    $(".set-area").remove();
    var __set_area_id = __table.attr("id");
    //console.log(__set_area_id);
    //console.log(__table.find("table").attr("id"));
    var _set_value = _set.replace("{0}", "set_" + __set_area_id);
    //console.log("--->" + "set_" + __set_area_id);
    $(this).after(_set_value);
    //console.log(_set_value);
    var __thistable = $(this).parent().parent().parent().parent().parent();
    var _is_set_count = false, _is_set_price = false;
    if ($.trim(__thistable.find(".txt-count").val()) != "") {
        _is_set_count = true;
    }
    if ($.trim(__thistable.find(".txt-price").val()) != "") {
        _is_set_price = true;
    }
    if (!_is_set_count) {
        $("input[name='rblCount']").attr("disabled", "disabled");
    } else {
        $("input[name='rblCount']").removeAttr("disabled");
    }

    if (!_is_set_price) {
        $("input[name='rblPrice']").attr("disabled", "disabled");
    } else {
        $("input[name='rblPrice']").removeAttr("disabled");
    }
    _globaSet = __table;
});


$(".row2 .txt-count").live("blur", function () {

    var __table = $(this).parent().parent().parent().parent();
    var _set_id = "set_" + __table.attr("id");
    if ($("#" + _set_id).html() != undefined) {

        if ($.trim($(this).val()) == "") {

            var _is_set_count = false, _is_set_guid = false;
            if ($.trim(__table.find(".txt-count").val()) != "") {
                _is_set_count = true;
            }
            if (!_is_set_count) {
                $("input[name='rblCount']").attr("disabled", "disabled");
            } else {
                $("input[name='rblCount']").removeAttr("disabled");
            }

        } else {

            $("input[name='rblCount']").removeAttr("disabled");
            if (isNaN($(this).val())) {
                $(this).val("");
            }
        }
        //console.log("not undefined");
    } else {

        if (isNaN($(this).val())) {
            $(this).val("");
        }
    }
    if ($(this).hasClass("error")) {
        $(this).removeClass("error");
    }
    //console.log(_set_id); 
}).live("change", function () {
    if ($(this).hasClass("error")) {
        $(this).removeClass("error");
    }
});


$(".row2 .txt-price").live("blur", function () {

    var __table = $(this).parent().parent().parent().parent();
    var _set_id = "set_" + __table.attr("id");
    if ($("#" + _set_id).html() != undefined) {
        if ($.trim($(this).val()) == "") {
            var _is_set_guid = false;
            if ($.trim(__table.find(".txt-price").val()) != "") {
                _is_set_guid = true;
            }
            if (!_is_set_guid) {
                $("input[name='rblPrice']").attr("disabled", "disabled");
            } else {
                $("input[name='rblPrice']").removeAttr("disabled");
            }
        } else {
            $("input[name='rblPrice']").removeAttr("disabled");
            if (isNaN($(this).val())) {
                $(this).val("");
            }
        }
        //console.log("not undefined");
    } else {

        if (isNaN($(this).val())) {
            $(this).val("");
        }
    }
    if ($(this).hasClass("error")) {
        $(this).removeClass("error");
    }
    //console.log(_set_id);
}).live("change", function () {
    if ($(this).hasClass("error")) {
        $(this).removeClass("error");
    }
});



$("input[name='rblCount']").live("click", function () {
    $("input[name='rblPrice']").removeAttr("checked");
});

$("input[name='rblPrice']").live("click", function () {
    $("input[name='rblCount']").removeAttr("checked");
});

$("#btnChance").live("click", function () {
    $(".set-area").fadeOut(200, function () { $(".set-area").remove() });
});


$(".uplodBut").live("click", function () {
    $("#drop input").click();
    __set_type = 1;
    __set_image_obj = $(this).parent().parent().attr("id")
});


$(".image-upload").live("click", function () {
    $("#drop input").click();
    __set_type = 2;
    __set_image_obj = $(this).attr("id")
});

$(".image-list-item a").live("click", function () {
    var $this = $(this);
    $this.parent().fadeOut(200, function () {
        $this.parent().prev().fadeIn(200)
        $this.parent().empty();
    });
});

$(".img-warpper a").live("click", function () {
    $(this).prev().fadeOut(200, function () { $(this).parent().parent().html("暂无图片") });
});

$(".img-warpper img").live("mouseover", function () {
    $(this).parent().append("<img style='position:absolute;right:-190px;top:0px;z-index:99' src='" + $(this).attr("src") + "' />")
}).live("mouseout", function () {
    $(this).next("a").next("img").remove()
});

$(".image-list-item-title").live("click", function () {
    $(this).focus();
});


var UnicodeUtil =
     {
         ToUnicode: function (str) {
             return escape(str).replace(/%/g, "\\").toLowerCase();
         },
         UnUnicode: function (str) {
             return unescape(str.replace(/\\/g, "%"));
         }
     }

$("#image-list").sortable({
    opacity: 0.6,
    revert: true,
    cursor: 'move',
    handle: ".image-list-icon",
    update: function (ev, ui) {
        if ($.trim(ui.item.text()) == UnicodeUtil.UnUnicode("\u4e3b\u56fe")) {
            ui.item.find(".image-upload").text(UnicodeUtil.UnUnicode("\u8be6\u60c5\u56fe"));
            $("#image-list .image-list-warpper:eq(0) .image-upload").text("\u4e3b\u56fe");
        }
    },
    start: function () { }
});

$(".color-txt").blur(function () {

    var _em = $(this).prev().prev().attr("class");
    var _copy_em = $("#sku-color-size").find("em." + _em + "").clone(true),
    _copy_color_em = $("#color-image").find("em." + _em + "").clone(true);
    $("#sku-color-size").find("em." + _em + "").parent().empty().append(_copy_em).append($(this).val());
    $("#color-image").find("em." + _em + "").parent().empty().append(_copy_color_em).append($(this).val());
    $(this).prev("small").text($(this).val());
});

$(".size-txt").blur(function () {
    var _class_name = $(this).parent().attr("id");
    var $this = $(this);
    $.each($(".tc_" + _class_name), function (index, item) {
        $(item).find(".table-first:eq(0)").text($this.val());
    });
    $(this).prev("small").text($(this).val());
});
//set price count
$("#btnSet").live("click", function () {

    var __id = $(this).parent().parent().attr("id");
    var _tableid = "#" + __id.replace("set_", "");
    var __cur_table = $("#" + __id.replace("set_", ""));
    var __cur_txt_count_val = _globaSet.find(".txt-count").val();
    var __cur_txt_price_val = _globaSet.find(".txt-price").val();
    //console.log(__id.replace("set_", ""));
    var __cur_parent = __cur_table.parent();
    if ($("input[name='rblCount']:eq(0)").attr("checked") == "checked" && typeof ($("input[name='rblCount']").attr("disabled")) == "undefined") {
        _globaSet.parent().parent().parent().find(".txt-count").val(__cur_txt_count_val);
    }
    else if ($("input[name='rblCount']:eq(1)").attr("checked") == "checked" && typeof ($("input[name='rblCount']").attr("disabled")) == "undefined") {
        var set_area_class = $(".tc_" + _globaSet.attr("id").replace("tbl_", ""));
        set_area_class.find(".txt-count").val(__cur_txt_count_val);
    }
    else if ($("input[name='rblPrice']:eq(0)").attr("checked") == "checked" && typeof ($("input[name='rblPrice']").attr("disabled")) == "undefined") {
        _globaSet.parent().parent().parent().find(".txt-price").val(__cur_txt_price_val);
    }
    else if ($("input[name='rblPrice']:eq(1)").attr("checked") == "checked" && typeof ($("input[name='rblPrice']").attr("disabled")) == "undefined") {
         var set_area_class = $(".tc_" + _globaSet.attr("id").replace("tbl_", ""));
        set_area_class.find(".txt-price").val(__cur_txt_price_val);
    }
    
});
//sku
$("#btnSave").click(function () {

    var _error = "", indexs = 1;
    if ($.trim($("#product_name").val()) == "") {
        _error += indexs + ".请输入商品名称!<br>";
        indexs++;
    }
    //is has select color and size
    //console.log($("#color-image .nothing").css("display") );
    if ($("#color-image .nothing").css("display") == "block" &&
        $("#sku-color-size .nothing").css("display") == "block") {
        _error += indexs + ".请选择颜色和尺寸!";
        indexs++;
    } else {
        var _empty_price_list = new Array();
        $.each($(".txt-price"), function (index, item) {
            if ($.trim($(item).val()) == "") {
                _empty_price_list.push($(item));
                $(item).addClass("error");
            }
        });
        var _empty_count_list = new Array();
        $.each($(".txt-count"), function (index, item) {
            if ($.trim($(item).val()) == "") {
                _empty_count_list.push($(item));
                $(item).addClass("error");
            }
        });
        if (_empty_price_list.length != 0) {
            _error += indexs + ".请输入正确的价格";
        }
        if (_empty_count_list.length != 0) {
            if (_error != "") {
                _error += "和对应的数量"
            }
        }
    }

    if (_error != "") {
        artDialog.tips("<p style='color:#ff0000;'>" + _error + "</p>");
        return false;
    }
    //price
    var _price_arr = new Array();
    $.each($("#sku-color-size .txt-price"), function (pin, pi) {
        _price_arr.push($(pi).val());
    });
    _price_arr.sort(function (a, b) {
        return a - b;
    });
    var _min_price = _price_arr[0];
    var _max_price = _price_arr[_price_arr.length - 1];
    $("#product_price").val(_min_price + "|" + _max_price);
    //param
    if ($("#tabs-3 select").length > 0) {
        _param = "{'param':[";
        $.each($("#tabs-3 select"), function (index, item) {

            var $item = $(item);
            var _select = $item.find("option:selected");
            _param += "{'param_name':'" + $item.attr("data") + "','param_id':'" + _select.val() + "','obj_id':'" + $item.attr("id") + "','param_value':'" + _select.text() + "'";
            _param += "},";
        });
        _param = _param.substring(0, _param.lastIndexOf(','));
        _param += "]}";
        $("#product_param").val(_param);
    }
    //store
    var _total_store = 0;
    $.each($("#sku-color-size .txt-count"), function (index, item) {
        var $item = $(item);
        _total_store += parseInt($item.val());
    });
    $("#product_store").val(_total_store);
    //image list
    var _image_list = "";
    if ($("#image-list .image-list-warpper .image-list-item img").length > 0) {
        _image_list = "{'list':[";
        $.each($("#image-list .image-list-warpper"), function (index, item) {

            var $item = $(item);
            if ($item.find(".image-list-item-title").html()) {
                var _img = $item.find(".image-list-item img");
                _image_list += "{'src':'" + _img.attr("src") + "','title':'" + _img.next().next().text() + "','order':'" + $item.index() + "'";
                _image_list += "},";
            }

        });
        _image_list = _image_list.substring(0, _image_list.lastIndexOf(','));
        _image_list += "]}";
    }
    $("#product_image").val(_image_list);

    //sku
    var _json = "{sku:[";
    var _price_json = "{";
    $.each($("#sku-color-size .rows"), function (rows_index, rows_item) {

        var _rows_item = $(rows_item);
        var _rows_item_table_first = $(rows_item).find(".table-first:eq(0)");
        var _rows_item_table_cell = $(rows_item).find(".table-cell:eq(0)");
        var _color_name = _rows_item_table_first.text();
        var _color_class = _rows_item_table_first.find("em").attr("class");
        var _row_class = $(rows_item).attr("class")
        var _row_id = $(rows_item).attr("id")
        var _row_table_first_class = _rows_item_table_first.attr("class");
        var _row_table_first_id = _rows_item_table_first.attr("id");
        var _row_table_cell_class = _rows_item_table_cell.attr("class");
        var _row_table_cell_id = _rows_item_table_cell.attr("id");
        var _color_img_warpper = $("#color-image").find("." + _color_class).parent().next();
        var _color_img = "";
        var _color_id = $("#color-area ." + _color_class).parent().attr("id");
        if (_color_img_warpper.text() != "暂无图片") {
            _color_img = _color_img_warpper.find("img").attr("src");
        }

        _json += "{'color_name':'" + _color_name + "',";
        _json += "'color_img':'" + _color_img + "',";
        _json += "'color_id':'" + _color_id + "',";
        _json += "'color_class':'" + _color_class + "',";
        _json += "'row_id':'" + _row_id + "',";
        _json += "'row_class':'" + _row_class + "',";
        _json += "'td_first_id':'" + _row_table_first_id + "',";
        _json += "'td_first_class':'" + _row_table_first_class + "',";
        _json += "'td_cell_id':'" + _row_table_cell_id + "',";
        _json += "'td_cell_class':'" + _row_table_cell_class + "',";
        _json += "'sku_area_name':'" + $(".sku-nav li:eq(1)").text() + "',";
        _json += "'color_class':'" + _color_class + "',sk1:[";

        $.each(_rows_item_table_cell.find(".sku-area-1"), function (sk2_rows_index, sk2_rows_item) {
            var _sk2_rows_item = $(sk2_rows_item);
            var _row_id = _sk2_rows_item.attr("id");
            var sk2_rows_item_table_first = _sk2_rows_item.find(".table-first:eq(0)");
            var _sku2_name = sk2_rows_item_table_first.text();
            var _sku2_data = _color_id + "." + _row_id.replace("tbl_", "");
            var _price = _sk2_rows_item.find(".table-price .txt-price").val();
            var _count = _sk2_rows_item.find(".table-count .txt-count").val();
            var _sn = _sk2_rows_item.find(".table-sn .txt-sn").val();
            _json += "{'sku_name':'" + _sku2_name + "',";

            _json += "'tbl_id':'" + _sk2_rows_item.attr("id") + "',";
            _json += "'tbl_class':'" + _sk2_rows_item.attr("class") + "',";
            _json += "'sku_id':'" + _row_id + "',";
            _json += "'sku_class':'" + sk2_rows_item_table_first.attr("class") + "',";
            _json += "'price':'" + _price + "',";
            _json += "'count':'" + _count + "',";
            _json += "'sn':'" + _sn + "',";
            _json += "'data':'" + _sku2_data + "',";
            _json += "'sku_data':'" + _sku2_data + "." + _price + "." + _count + "'";
            _json += "},";
            _price_json += "'" + _sku2_data + "':[{'price':'" + _price + "','count':'" + _count + "'}],"

        });
        _json = _json.substring(0, _json.lastIndexOf(','));
        _json += "]},";
    });

    _json = _json.substring(0, _json.lastIndexOf(','));
    _json += "]}";
    _price_json = _price_json.substring(0, _price_json.lastIndexOf(','));
    _price_json += "}";
    $("#product_sku").val(_json);
    $("#product_price_sku").val(_price_json);

    $('#product-add-form').ajaxForm
    (
        {
            type: 'post',
            beforeSubmit: function () {
                //console.log("loading...");
                art.dialog({
                    title: '操作提示',
                    id: "o_tip",
                    icon: 'succeed',
                    content: "正在操作,请稍候...",
                    resize: false,
                    //time: 1,
                    lock: true

                });
            },
            success: function (data) {
                window.location.href = "/Admin/ProductManage/";
                //console.log(data);
                //console.log("success");
                //$("#product-add-form").resetForm();
            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                //console.log(errorThrown);
            }
        }
    );

});