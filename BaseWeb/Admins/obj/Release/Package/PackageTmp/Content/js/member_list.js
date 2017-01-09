
$(function () {


    $("#lblUrlTitle").text("会员管理");
    var _prev_win = $(window.parent.document);
    _prev_win.find(".table-mm-content").css({ "overflow-y": "hide" });
    _prev_win.find(".iframe").height("100%");

    $(".control-del").click(function () {

        var $this = $(this);
        artDialog.confirm("确认删除么?", function () {

            $.ajax({
                type: "POST",
                url: "/Admin/MemberDel/",
                async: false,
                data: {
                    id: $this.attr("data")
                },
                beforeSend: function () {

                },
                success: function (data) {
                    if (data=="ok") {
                        $this.parent().parent().parent().parent().slideUp("500");
                    }else{
                        art.dialog({
                            title: '操作提示',
                            id: "o_tip",
                            icon: 'succeed',
                            content: data,
                            resize: false,
                            time: 3,
                            lock: true
                        });
                    }
                    
                },
                error: function () {
                    alert('error');
                }
            })

        });
    });

     $(".switch input[type=checkbox]").change(function () {

        var $this = $(this);
       
        $.ajax({
            type: "POST",
            url: "/Admin/MemberStatus/",
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
          

        

           

               



         