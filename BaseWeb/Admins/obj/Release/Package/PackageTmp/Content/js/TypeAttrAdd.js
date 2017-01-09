

$("#btnAdd,#btnAdd2,#btnSave").button();
$("#lblUrlTitle").text("分页属性管理");
$("#edit-win").tabs();


function mini(obj,id){

 var $this = $(obj);
  $.ajax({
        type: "POST",
        url: "/Admin/TypeAttrDefModify/",
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
        url: "/Admin/TypeAttrModify/",
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
                url: "/Admin/TypeAttrDel/",
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
            url: "/Admin/TypeAttrCopy/",
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
//_prev_win.find(".iframe").height($(document).height());
function setHeight2() {
    _prev_win.find(".iframe").height($("#temp-modify").height());
}
function setHeight() {
    //_prev_win.find(".iframe").height($(document).height()+100);
    _prev_win.find(".iframe").height($("#temp-modify").height());
}
//setHeight2();
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
    var attr_value = $this.prev();
    if ($.trim(attr_value.val()) == "") {
        art.dialog.tips('请填写属性值!');
        attr_value.focus();
    } else {


    $.ajax({
        type: "POST",
        url: "/Admin/TypeAttrDefValueAdd/",
        async: false,
        data: {
            id: $this.attr("data"),
            name: attr_value.val()
        },
        success: function (data) {

            var id = data;
            var html = $("#attr-item-temp").html();
            html = html.replace("{0}", attr_value.val())
                           .replace("{1}", id);
            console.log($("#split").html() == undefined);
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
            url: "/Admin/TypeAttrEdit/",
            async: false,
            data: {
                id: id
            },
            success: function (data) {

                $("#TypeAttrName").val(data.attr_name);
                $("#attr_type_id option[value='" + data.attr_type + "']").attr("selected", true);
                $("#attr_code_name").val(data.attr_code_name);
                var att_status = $("#attr_status").prop("checked") == true ? 1 : 0;
                if (data.attr_status == 0) {
                    if (att_status == 1) {
                        $("#c_attr_status").click();
                    }
                } else if (data.attr_status == 1) {

                    if (att_status == 0) {
                        $("#c_attr_status").click();
                    }
                 }
                isModify = true;
                gid = data.attr_id;
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
        url: "/Admin/TypeAttrDefValueDel/",
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
    
    var attr_name = $("#TypeAttrName");
    if ($.trim(attr_name.val()) == "") {
        art.dialog.tips('请填写属性名称!');
        attr_name.focus();
         
    } else {
        var att_status = $("#attr_status").prop("checked") == true ? 1 : 0;

        //console.log($("#attr_type_id").find("option:selected").val());
        var url = "/Admin/TypeAttrAddDo/";
        if (isModify) {
            url = "/Admin/TypeAttrEditDo/";
        }

        $.ajax({
            type: "POST",
            url: url,
            async: false,
            data: {
                type_id: $("#hfTypeId").val(),
                attr_type: $("#attr_type_id").find("option:selected").val(),
                attr_code_name: $("#attr_code_name").val(),
                att_status: att_status,
                attr_name: attr_name.val(),
                id: gid
            },
            beforeSend: function () {
                //console.log($("#txtId").val());
            },
            success: function (data) {
                //location.reload();
                //template
                if (isModify) {

                    isModify = false;
                    $("#attr_" + gid).prev().prev().val(attr_name.val());
                    art.dialog.tips('修改成功!');
                    //console.log($("#attr_" + gid).prev().prev());
                }
                else {
                    var tp = $("#attr-temp");
                    var html = tp.html();
                    html = html
                           .replace("{0}", attr_name.val())
                           .replace("{0}", attr_name.val())
                           .replace("{1}", data)
                           .replace("{1}", data)
                           .replace("{1}", data)
                           .replace("{1}", data)
                           .replace("{1}", data);

                    $("#attr-list").prepend(html);
                    art.dialog.tips('添加成功!');
                }

                attr_name.val("");
            },
            error: function (er) {
                //alert('error');
                //console.log(er);
            }
        })




    }
});
 