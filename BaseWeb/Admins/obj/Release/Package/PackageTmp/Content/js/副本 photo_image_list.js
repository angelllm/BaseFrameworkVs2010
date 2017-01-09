
__set_type = 3;

$("#btnAdd").button().click(function () {
    $("#drop input").click();
});
$("#lblUrlTitle").text("照片管理");
    

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

   
   
