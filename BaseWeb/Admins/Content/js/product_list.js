 

$(function () {



    $("#btnAdd").button().click(function () { window.location.href = '/Admin/ProductTypeSelect/'; });

    $(".control-del").click(function () {
     
        var $this = $(this);
        artDialog.confirm("确认删除么?", function () {

            $.ajax({
                type: "POST",
                url: "/Admin/ProductDel/",
                async: false,
                data: {
                    id: $this.attr("data")
                },
                beforeSend: function () {

                },
                success: function (data) {

                    window.location.reload();
                },
                error: function () {
                    alert('error');
                }
            })
        
         });

    });


    $(".control-stop").click(function () {

        var $this = $(this); 
        $.ajax({
            type: "POST",
            url: "/Admin/ProductStop/",
            async: false,
            data: {
                id: $this.attr("data") 
            },
            beforeSend: function () {

            },
            success: function (data) {

                ok();
            },
            error: function () {
                alert('error');
            }
        })

    });

    $(".switch input[type=checkbox]").change(function () {

        var $this = $(this);
       
        $.ajax({
            type: "POST",
            url: "/Admin/ProductStatus/",
            async: false,
            data: {
                id: $this.attr("data"), 
            },
            beforeSend: function () {

            },
            success: function (data) {

                ok();
            },
            error: function () {
                alert('error');
            }
        })

    });


    $(".control-modify").click(function () {
        window.location.href = '/Admin/ProductEdit/'+$(this).attr("data");
    });

    $(".tbl tr:not(:first)").dblclick(function () {
        window.location.href = '/Admin/ProductEdit/'+$(this).attr("data");
    });



});

    function ok() {

        art.dialog({
            title: '操作提示',
            id: "win_tip",
            icon: 'succeed',
            content: "操作成功!",
            resize: false,
            time: 1,
            lock: true

        });

    };


    $(".edit-win").tabs();
    $("#lblUrlTitle").text("商品管理");

    $("#btnAdd").button();




