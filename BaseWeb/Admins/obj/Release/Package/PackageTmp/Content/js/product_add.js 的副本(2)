
jQuery(function () {

    jQuery("#lblUrlTitle").text("商品添加");
    jQuery("#btnAdd").button();
    jQuery("#edit-win").tabs();
    jQuery("#btnSub,#btnSave,#btnSaveContent").button();
    // init article_type val
    jQuery("#article_type").val(jQuery(this).find("option:selected").val());
   
});

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
    //size
    var _size_arr = new Array();
    $.each($("#size-area input[type='checkbox']:checked"), function (pin, pi) {
        _size_arr.push($(pi).next().text());
    });
    $("#product_size").val(_size_arr);
    //sku
    var _json = "{sku:[";
    var _price_json = "{price:[";
    var _color_arr = new Array();
    $.each($("#sku-color-size .table"), function (index, item) {

        var _cur_table_item = $(item);
        var _cur_table_item_td_first = _cur_table_item.find("td:eq(0)");
        var _cur_table_item_td_second_table = _cur_table_item.find("td:eq(1)").find("table");
        var _color = _cur_table_item_td_first.text();
        var _color_class = _cur_table_item_td_first.find("em").attr("class");
        var _color_img_warpper = $("#color-image").find("." + _color_class).parent().next();
        var _color_img = "";
        var _color_id = $("#color-area ." + _color_class).parent().attr("data");
        if (_color_img_warpper.text() != "暂无图片") {
            _color_img = _color_img_warpper.find("img").attr("src");
        }
        _json += "{'color_name':'" + _color + "',";
        _json += "'color_img':'" + _color_img + "',";
        _json += "'color_id':'" + _color_id + "',";
        _json += "'color_class':'" + _color_class + "',size:[";
        $.each(_cur_table_item_td_second_table.find("tr"), function (ind, it) {

            var _cur_tr = $(it);
            var _size = _cur_tr.find("td:eq(0)").text();
            var _size_class = _cur_tr.find("td:eq(0)").attr("class");
            var _price = _cur_tr.find("td:eq(1)").find("input").val();
            var _count = _cur_tr.find("td:eq(2)").find("input").val();
            var _sn = _cur_tr.find("td:eq(3)").find("input").val();
            _json += "{'size_name':'" + _size + "',";
            _json += "'size_id':'" + _cur_tr.parent().parent().attr("id") + "',";
            _json += "'size_data':'" + _cur_tr.find("td:eq(0)").attr("class") + "',";
            _json += "'size_color':'" + _color_id + "." + _cur_tr.find("td:eq(0)").attr("class") + "." + _price + "." + _count + "',";
            _json += "'size_class':'" + _size_class + "',";
            _json += "'price':'" + _price + "',";
            _json += "'count':'" + _count + "',";
            _json += "'sn':'" + _sn + "'";
            _json += "},";

            _price_json += "{'color_id':'" + _color_id + "',";
            _price_json += "'size_id':'" + _cur_tr.parent().parent().attr("id") + "',";
            _price_json += "'size_data':'" + _cur_tr.find("td:eq(0)").attr("class") + "',";
            _price_json += "'size_color':'" + _color_id + "." + _cur_tr.find("td:eq(0)").attr("class") + "',";
            _price_json += "'price':'" + _price + "',";
            _price_json += "'size_name':'" + _size + "',";
            _price_json += "'id':'" + _color_id + "." + _cur_tr.parent().parent().attr("id") + "." + _price + "." + _count + "',";
            _price_json += "'count':'" + _count + "'";
            _price_json += "},";

        });
        _json = _json.substring(0, _json.lastIndexOf(','));
        _json += "]},";

    });
    _json = _json.substring(0, _json.lastIndexOf(','));
    _json += "]}";
    _price_json = _price_json.substring(0, _price_json.lastIndexOf(','));
    _price_json += "]}";
    $("#product_price_sku").val(_price_json);
    $("#product_sku").val(_json);
     
    //param
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
    //console.log(_image_list);
    //return false;
    $('#product-add-form').ajaxForm
    (
        {
            type: 'post',
            beforeSubmit: function () {

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

    //return false;

});




jQuery(function () {

    jQuery('#product_status').live('click', function (evt, params) {

        jQuery(this).val(jQuery(this).val() == "1" ? "0" : "1");
        jQuery(this).next().val(jQuery(this).val());
    });


    jQuery(function () {

        jQuery('#colorpickerHolder2').ColorPicker({
            flat: true,
            color: jQuery("#product_name_color").val() == "0" ? "#ff0000" : jQuery("#product_name_color").val(),
            onSubmit: function (hsb, hex, rgb) {
                jQuery('#colorSelector2 div').css('backgroundColor', '#' + hex);
            }
        });
        jQuery('#colorpickerHolder2>div').css('position', 'absolute');
        var widt = false;
        jQuery('#colorSelector2').bind('click', function () {
            jQuery('#colorpickerHolder2').stop().animate({ height: widt ? 0 : 173 }, 500);
            widt = !widt;
        });

    });
    jQuery("#color-panel").attr("style", "background-color:#" + (jQuery("#product_name_color").val() == "0" ? "000" : jQuery("#product_name_color").val()));

})


var _prev_win = $(window.parent.document);
_prev_win.find(".table-mm-content").css({ "overflow-y": "scroll" });
_prev_win.find(".iframe").height(1065);

$("#color-area input[type='checkbox']").click(function () {

    var _this = $(this).parent();
    var _color_bg = _this.find("em").attr("class");
    var _color_area = $("#color-image");
    //选中
    if ($(this).attr("checked") == "checked") {


        var _color_temp = "<dl id=\"{2}\">" +
                             "<dd><em class=\"{0}\"></em>{1}</dd><dd>暂无图片</dd><dt><input type=\"button\" class=\"uplodBut\" value=\"设定图片\"></dt>" +
                          "</dl>";

        var _color_value = _this.find(".color-txt").val();
        if ($("#size-area input[type='checkbox']:checked").length != 0) {

            if ($("#sku-color-size table").length == 0) {

                var _temp = "<table cellpadding=\"0\" id=\"{id}\" cellspacing=\"0\" border=\"0\" class=\"table\">" +
                                "<tr>" +
                                    "<td><em class=\"{1}\"></em>{2}</td>" +
                                    "<td>{0}</td>" +
                                "</tr>" +
                            "</table>";

                var _table = "<table id=\"{1}\" data=\"{data}\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">" +
                                "<tr>" +
                                    "<td class=\"{x}\">{0}</td>" +
                                    "<td><input type=\"text\" class=\"txt-price\" /></td>" +
                                    "<td><input type=\"text\" class=\"txt-count\" /></td>" +
                                    "<td><input type=\"text\" class=\"txt-sn\" /></td>" +
                                    "<td><div class=\"div-set\"><a class=\"set\">&nbsp;</a></div></td>" +
                                "</tr>"
                "</table>";

                var _table_value = "";
                $.each($("#color-area input[type='checkbox']:checked"), function (index, item) {
                    var _append = "";
                    var _color_select = $(item).parent();
                    var _color_bg = _color_select.find("em").attr("class").toString();
                    var _color_value = _color_select.find(".color-txt").val();

                    if (!$("#sku-color-size .table td em").hasClass(_color_bg)) {

                        $.each($("#size-area input[type='checkbox']:checked"), function (i, it) {
                            _table_value += _table.replace("{0}", $(it).parent().find(".size-txt").val())
                                                  .replace("{x}", $(it).parent().attr("data"))
                                                  .replace("{data}", _color_select.attr("data") + "." + $(it).parent().attr("data"))
                                                  .replace("{1}", _color_bg + "_table_" + $(it).parent().attr("id"));

                        });
                        _append += _temp.replace("{0}", _table_value)
                                        .replace("{1}", _color_bg)
                                        //.replace("{id}", "tbl_" + $(it).parent().attr("data"))
                                        .replace("{2}", _color_value);
                        _table_value = "";
                        $("#sku-color-size").find(".nothing").hide().parent().append(_append);
                    }

                });


            } else {

                var __val = $("#sku-color-size table:eq(0)").html();
                var _temp_em_class = $(__val).find("em").attr("class")
                var _add_color_name = $(__val).find("td:eq(0)").text();
                //console.log(__val);
                __val = __val.replace(_add_color_name, _color_value);
                var __id = $("#sku-color-size table:eq(0)").attr("id");
                //console.log(__id);
                //__val.attr("id", "tbl_" + _this.attr("data"));
                $.each($(__val).find("table"), function (tid, tables) {
                    __val = __val.replace(_temp_em_class, _color_bg);
                    __val = __val.replace(_temp_em_class, _color_bg);
                });

                $("#sku-color-size").append("<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table\">" + __val + "</table>");
            }
        }
        _this.find(".color-txt").show().end().find("small").hide();
        _color_value = _color_temp.replace("{0}", _color_bg).replace("{1}", _color_value).replace("{2}", "dl_" + _this.attr("id"));
        _color_area.find(".nothing").hide().parent().append(_color_value);

    }
    else {//取消选中
        if ($("#size-area input[type='checkbox']:checked").length != 0) {
            //_color_bg
            $.each($("#sku-color-size .table"), function (tid, tables) {
                if ($(tables).find("td:eq(0) em").attr("class") == _color_bg) {
                    $(tables).fadeOut(200, function () {
                        $(tables).remove();
                    });
                }
            });
        }

        if ($("#color-area").find("input[type='checkbox']:checked").length == 0) {
            _color_area.find(".nothing").fadeIn(200);
            $("#sku-color-size").find(".nothing").fadeIn(200);
        }
        $(this).parent().find(".color-txt").hide().end().find("small").show();
        var __cur_dl = $("#dl_" + _this.attr("id"));
        __cur_dl.fadeOut(200, function () { __cur_dl.remove(); });
        //console.log("#dl_" + _this.attr("id")); 
    }
});

$("#size-area input[type='checkbox']").click(function () {

    var _this = $(this).parent();
    var _temp = "<table cellpadding=\"0\" id=\"{id}\" cellspacing=\"0\" border=\"0\" class=\"table\">" +
                        "<tr>" +
                            "<td><em class=\"{1}\"></em>{2}</td>" +
                            "<td>{0}</td>" +
                        "</tr>" +
                    "</table>";

    var _table = "<table id=\"{1}\" data=\"{data}\"  cellpadding=\"0\" cellspacing=\"0\" border=\"0\">" +
                    "<tr>" +
                        "<td class=\"{x}\">{0}</td>" +
                        "<td><input type=\"text\" class=\"txt-price\" /></td>" +
                        "<td><input type=\"text\" class=\"txt-count\" /></td>" +
                        "<td><input type=\"text\" class=\"txt-sn\" /></td>" +
                        "<td><div class=\"div-set\"><a class=\"set\">&nbsp;</a></div></td>" +
                    "</tr>"
    "</table>";


    if ($(this).attr("checked") == "checked") {

        $(this).parent().find(".size-txt").show().end().find("small").hide();

        if ($("#color-area input[type='checkbox']:checked").length > 0) {

            var _table_value = "";
            $.each($("#color-area input[type='checkbox']:checked"), function (index, item) {
                var _append = "";
                var _color_select = $(item).parent();
                var _color_bg = _color_select.find("em").attr("class").toString();
                var _color_value = _color_select.find(".color-txt").val();
                //console.log($("#sku-color-size .table td em").hasClass(_color_bg.toString()));
                //console.log(_color_bg);
                if ($("#sku-color-size .table td em").hasClass(_color_bg)) {

                    _table_value = "";
                    var _cur_tr = $("#sku-color-size .table td ").find("." + _color_bg);
                    $.each($("#size-area input[type='checkbox']:checked"), function (i, it) {

                        var _cur_size_value = $(it).parent().find(".size-txt").val();
                        var _cur_size_id = _color_bg + "_table_" + $(it).parent().attr("id");

                        if (_cur_tr.parent().parent().find("td:eq(1)").find("#" + _cur_size_id).html() == undefined) {
                            _table_value += _table.replace("{0}", _cur_size_value)
                                                  .replace("{x}", _this.attr("data"))
                                                  .replace("{data}", _color_select.attr("data") + "." + _this.attr("data"))
                                                  .replace("{1}", _cur_size_id);
                        } else {

                        }
                    });
                    _cur_tr.parent().parent().find("td:eq(1)").append(_table_value);

                } else {

                    $.each($("#size-area input[type='checkbox']:checked"), function (i, it) {
                        _table_value += _table.replace("{0}", $(it).parent().find(".size-txt").val())
                                              .replace("{x}", _this.attr("data"))
                                              .replace("{data}", _color_select.attr("data") + "." + _this.attr("data"))
                                              .replace("{1}", _color_bg + "_table_" + $(it).parent().attr("id"));
                    });
                    _append += _temp.replace("{0}", _table_value)
                                    .replace("{1}", _color_bg)
                                    .replace("{x}", _this.attr("data"))
                                    //.replace("{id}", "tbl_" + _this.attr("data"))
                                    .replace("{2}", _color_value);
                    _table_value = "";
                    console.log(_this.attr("data"));
                    $("#sku-color-size").find(".nothing").hide().parent().append(_append);
                }
            });
        }

    } else {

        $(this).parent().find(".size-txt").hide().end().find("small").show();
        if ($("#size-area input[type='checkbox']:checked").length == 0) {

            $("#sku-color-size .table").fadeOut(200, function () {
                $("#sku-color-size .nothing").fadeIn(200);
                $("#sku-color-size .table").remove();
            });

        } else {

            var _size_id = $(this).parent().attr("id");
            $.each($("#color-area input[type='checkbox']:checked"), function (index, item) {

                var _color_select = $(item).parent();
                var _color_bg = _color_select.find("em").attr("class").toString();
                var _cur_size_id = _color_bg + "_table_" + _size_id;
                var _cur_size = $("#" + _cur_size_id);
                _cur_size.fadeOut(200, function () { _cur_size.remove(); });

            });
        }

    }
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

    var _class_name = $(this).parent().attr("data");
    $("." + _class_name).text($(this).val());
    $(this).prev("small").text($(this).val());
});

$(".table .set").live("click", function () {

    var __table = $(this).parent().parent().parent().parent().parent();
    var _set = "<div class=\"set-area\" id=\"{0}\">" +
                    "<h2>批量操作</h2>" +
                    "<ul>" +
                         "<li>" +
                            "<p>价格:</p>" +
                            "<p><input type=\"radio\" name=\"rblPrice\" />同颜色价格相同</p>" +
                            "<p><input type=\"radio\" name=\"rblPrice\" />同尺码价格相同</p>" +
                         "</li>" +
                         "<li>" +
                            "<p>数量:</p>" +
                            "<p><input type=\"radio\" name=\"rblCount\" />同颜色分类数量相同</p>" +
                            "<p><input type=\"radio\" name=\"rblCount\" />同尺码数量相同</p>" +
                         "</li>" +
                         "<div class=\"clear\"></div>" +
                    "</ul>" +
                    "<center><input id=\"btnSet\" type=\"button\" value=\" 设 置 \" /><input id=\"btnChance\" type=\"button\" value=\" 取 消 \" /></center>" +
               "</div>";
    $(".set-area").remove();
    var __set_area_id = __table.attr("id");
    //console.log(__table.find("table").attr("id"));
    _set = _set.replace("{0}", "set_" + __set_area_id);
    //console.log("--->" + "set_" + __set_area_id);
    $(this).after(_set);
    var __thistable = $(this).parent().parent().parent().parent().parent();
    var _is_set_count = false, _is_set_guid = false;
    if ($.trim(__thistable.find(".txt-count").val()) != "") {
        _is_set_count = true;
    }
    if ($.trim(__thistable.find(".txt-price").val()) != "") {
        _is_set_guid = true;
    }
    if (!_is_set_count) {
        $("input[name='rblCount']").attr("disabled", "disabled");
    } else {
        $("input[name='rblCount']").removeAttr("disabled");
    }

    if (!_is_set_guid) {
        $("input[name='rblPrice']").attr("disabled", "disabled");
    } else {
        $("input[name='rblPrice']").removeAttr("disabled");
    }
    //console.log(_is_set_count);
    //console.log($(this).parentsUntil(".table"));
});

$(".table .txt-count").live("blur", function () {

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
});


$(".table .txt-price").live("blur", function () {

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
});



$("#btnSet").live("click", function () {

    var __id = $(this).parent().parent().attr("id");
    var __cur_table = $("#" + __id.replace("set_", ""));
    //console.log(__id.replace("set_", ""));
    var __cur_parent = __cur_table.parent();
    if ($("input[name='rblCount']:eq(0)").attr("checked") == "checked" && typeof ($("input[name='rblCount']").attr("disabled")) == "undefined") {
        var __cur_txt_count_val = __cur_table.find(".txt-count").val();
        __cur_parent.find(".txt-count").val(__cur_txt_count_val);
    }
    else if ($("input[name='rblCount']:eq(1)").attr("checked") == "checked" && typeof ($("input[name='rblCount']").attr("disabled")) == "undefined") {
        var __cur_txt_count_val = __cur_table.find(".txt-count").val();
        var __cur_td_class = __cur_table.find("td:eq(0)").attr("class");
        //console.log(__cur_td_class);
        //console.log(__cur_table.find("td:eq(0)"));
        $("." + __cur_td_class).next().next().find("input").val(__cur_txt_count_val);
    }
    else if ($("input[name='rblPrice']:eq(0)").attr("checked") == "checked" && typeof ($("input[name='rblPrice']").attr("disabled")) == "undefined") {
        var __cur_txt_count_val = __cur_table.find(".txt-price").val();
        __cur_parent.find(".txt-price").val(__cur_txt_count_val);
    }
    else if ($("input[name='rblPrice']:eq(1)").attr("checked") == "checked" && typeof ($("input[name='rblPrice']").attr("disabled")) == "undefined") {
        var __cur_txt_count_val = __cur_table.find(".txt-price").val();
        var __cur_td_class = __cur_table.find("td:eq(0)").attr("class");
        //console.log(__cur_td_class);
        //console.log(__cur_table.find("td:eq(0)"));
        $("." + __cur_td_class).next().find("input").val(__cur_txt_count_val);
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
    $(this).parent().append("<img style='position:absolute;right:-190px;top:0px;z-index:99' src='" + $(this).attr("src")+ "' />")
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

