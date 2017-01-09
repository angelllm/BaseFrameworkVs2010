

$("#btnAdd,#btnAdd2,#btnSave").button();
$("#lblUrlTitle").text("SKU属性管理");
$("#edit-win").tabs();


function mini(obj,id){

 var $this = $(obj);
  $.ajax({
        type: "POST",
        url: "/Admin/TypeSkuParamListModify/",
        async: false,
        data: {
            id: id,
            name:$this.val()
        },
        beforeSend: function () {
            art.dialog.tips('正在操作,请稍候!');
        },
        success: function (data) {
          art.dialog.tips('更新成功!');
        },
        error: function () {
            alert('error');
        }
    })

}



function minModify(obj){

 var $this = $(obj);
 if ($this.attr("data2") ==$.trim($this.val())) {
    return;
 }
 
  $.ajax({
        type: "POST",
        url: "/Admin/TypeSkuParamModify/",
        async: false,
        data: {
            id: $this.attr("data"),
            name:$this.val()
        },
        beforeSend: function () {
            art.dialog.tips('正在操作,请稍候!');
        },
        success: function (data) {

          art.dialog.tips('更新成功!');
          $this.attr($.trim($this.val()));
        },
        error: function () {
            alert('error');
        }
    })

}


$(".dels").click(function(){
    var $this = $(this);
    artDialog.confirm("确认删除么?", function () {
            $.ajax({
                type: "POST",
                url: "/Admin/TypeSkuParamDel/",
                async: false,
                data: {
                    id: $this.next().attr("data")
                },
                beforeSend: function () {
                    art.dialog.tips('正在操作,请稍候!');
                },
                success: function (data) {

                    $this.parent().fadeOut();
                },
                error: function () {
                    alert('error');
                }
            })

        }); 
});

$(".type-copy").click(function(){
    
    var $this = $(this);
     artDialog.confirm("确认复制当前选中的所有属性和属性值吗?", function () {
        $.ajax({
            type: "POST",
            url: "/Admin/TypeSkuParamCopy/",
            async: false,
            data: {
                id: $this.attr("data"),
                curid: $this.attr("curr-data"),
            },
             beforeSend: function () {
                art.dialog.tips('属性正在复制中,请稍候!');
            },
            success: function (data) { 
               window.location.reload(); 
            },
            error: function (er) {
                console.log(er);
            }
        })

      });
});


var _prev_win = $(window.parent.document);
_prev_win.find(".table-mm-content").css({ "overflow-y": "scroll" });
function setHeight2() {
    _prev_win.find(".iframe").height($("#temp-modify").height());
}
function setHeight() {
    _prev_win.find(".iframe").height($("#temp-modify").height());
}
function dropToogle(obj) {

    var $this = $(obj);
    var attr = $this.parent().find(".attr-def-value");
    if (attr.css("display") == "block") {
        attr.slideUp();
    } else attr.slideDown();
}

function attrShowAdd(obj) {

    var $this = $(obj);
    $this.hide().next().show().find("input").focus();
}

function save(obj) {

    var $this = $(obj);
    var $id = $this.attr("data");
    var attr_value = $this.prev();
    if ($.trim(attr_value.val()) == "") {
        art.dialog.tips('请填写SKU属性值!');
        attr_value.focus();
    } else {
    
    $.ajax({
        type: "POST",
        url: "/Admin/TypeSkuParamListAdd/",
        async: false,
        data: {
            id: $id,
            name: attr_value.val()
        },
        success: function (data) {
            console.log("id:"+data);
            var html = $("#attr-item-temp").html();
            html = html.replace("{0}", attr_value.val())
                       .replace("{1}",data)
                       .replace("{2}",data);
            //console.log($("#split").html() == undefined);
            if ($this.parent().parent().find("#split").html() == undefined) {
                html += "<div id=\"split\" style=\"border-top:1px solid #d9d8d8\"></div>";
            }
            //clear value 
            $this.parent().hide().prev().show().parent().prepend(html);
            //setHeight();
            art.dialog.tips('请填写属性值[' + attr_value.val() + ']成功!');
            attr_value.val("");
            //console.log(data.attr_type);
        },
        error: function (er) {
            //console.log(er);
        }
    }) 

    }
}

function modify(obj) {

        var $this = $(obj);
        var id = $this.attr("data");

        $.ajax({
            type: "POST",
            url: "/Admin/TypeSkuParamEdit/",
            async: false,
            data: {
                id: id
            },
            success: function (data) {

                $("#TypeAttrName").val(data.param_name);
                $("#param_type option[value='" + data.param_type + "']").attr("selected", true);
                $("#param_code_name").val(data.param_code_name);
                var param_status = $("#param_status").prop("checked") == true ? 1 : 0;
                if (data.param_status == 0) {
                    if (param_status == 1) {
                        $("#c_attr_status").click();
                    }
                } else if (data.param_status == 1) {

                    if (param_status == 0) {
                        $("#c_attr_status").click();
                    }
                 }
                isModify = true;
                gid = data.param_id;
                //console.log(data.attr_type);
            },
            error: function (er) {
                //console.log(er);
            }
        }) 
    
}


function del(obj,id) {
    
    var $this = $(obj);
    $.ajax({
        type: "POST",
        url: "/Admin/TypeSkuParamListDel/",
        async: false,
        data: {
            id: id,
        },
        success: function (data) {
            $this.parent().fadeOut();
            art.dialog.tips('删除成功!');
            //console.log(data.attr_type);
        },
        error: function (er) {
            console.log(er);
        }
    })

}
isModify = false;gid = 0;
$("#attr-add").click(function () {
    
    var param_name = $("#TypeAttrName");
    if ($.trim(param_name.val()) == "") {
        art.dialog.tips('请填写SKU属性名称!');
        param_name.focus();
    } else {
        var param_status = $("#param_status").prop("checked") == true ? 1 : 0;
        var url = "/Admin/TypeSkuAddDo/";
        if (isModify) {
            url = "/Admin/TypeSkuParamEditDo/";
        }
        $.ajax({
            type: "POST",
            url: url,
            async: false,
            data: {
                param_product_type_id: $("#hfTypeId").val(),
                param_type: $("#param_type").find("option:selected").val(),
                param_code_name: $("#param_code_name").val(),
                param_status: param_status,
                param_name: param_name.val(),
                id: gid
            },
            beforeSend: function () {
               
            },
            success: function (data) {
                //template
                if (isModify) {
                    isModify = false;
                    $("#attr_" + gid).prev().prev().val(param_name.val());
                    art.dialog.tips('修改成功!');
                }
                else {
                    var tp = $("#attr-temp");
                    var html = tp.html();
                    html = html
                           .replace("{0}", param_name.val())
                           .replace("{0}", param_name.val())
                           .replace("{1}", data)
                           .replace("{1}", data)
                           .replace("{1}", data)
                           .replace("{1}", data)
                           .replace("{1}", data);
                    $("#attr-list").prepend(html);
                    art.dialog.tips('添加成功!');
                }
                param_name.val("");
            },
            error: function (er) {
                //console.log(er);
            }
        })

    }
});
 