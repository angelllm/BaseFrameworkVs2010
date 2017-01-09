
jQuery(function () {

    jQuery("#lblUrlTitle").text("商品类别选择");
    jQuery("#btnAdd").button();
    jQuery("#edit-win").tabs();
    jQuery("#btnSave").button().attr("disabled", "disabled").attr("aria-disabled", "true").addClass("ui-button-disabled").addClass("ui-state-disabled");
    var _prev_win = $(window.parent.document);
    _prev_win.find(".table-mm-content").css({ "overflow-y": "scroll" });
    _prev_win.find(".iframe").height("100%");
});

$(".edit-win ul li").live("click", function () {

    var $this = $(this);
    var _id = $this.attr("data");
    $this.addClass("hover").siblings().removeClass("hover").parent().next("ul").remove();

    $.ajax({
        type: "POST",
        url: "/Admin/GetProductType/",
        async: false,
        data: {
            id: _id
        },
        beforeSend: function () {

        },
        success: function (data) {
            if (data.length == 0) {
                $("#hfSelect").val(_id);
                $("#btnSave").removeAttr("disabled").removeAttr("aria-disabled").removeClass("ui-button-disabled").removeClass("ui-state-disabled");
                var _action = $("form").attr("data");
                $("form").attr("action", _action + _id);
            } else {
                $("#btnSave").attr("disabled", "disabled").attr("aria-disabled", "true").addClass("ui-button-disabled").addClass("ui-state-disabled");
                var uid = "ul_" + _id;
                if ($("#" + uid).html()) {
                    $("#" + uid).remove();
                } else {

                }
                var _html = "<ul id='" + uid + "'>";
                $.each(data, function (index, item) {
                    _html += "<li data='" + item.type_id + "'>" + item.type_name + "</li>";
                });
                _html += "</ul>";
                $(".row-item ul:last").after(_html);
            }
        },
        error: function (e) {
            console.log(e);
        }
    })
});
