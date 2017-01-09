


$(".icon").each(function (index, item) {

    $(item).bind("dblclick", function () {

        var $this = $(item);
        var _id = $this.attr("id");
        var _name = $this.attr("name");
        var _icon = $this.attr("icon");
        var _width = parseInt($this.attr("init_w"));
        var _height = parseInt($this.attr("init_h"));
        var _resize = $this.attr("resize") == "True" ? true : false;


        $('#Window_' + _id).AeroWindow({
            WindowIDTAG: "Window_" + _id,
            WindowIcon: _icon,
            WindowTitle: _name,
            WindowPositionTop: 'center',
            WindowPositionLeft: 'center',
            WindowWidth: _width,
            WindowHeight: _height,
            WindowAnimationSpeed: 300,
            WindowAnimation: 'easeOutCubic',
            WindowResizable: _resize,
            WindowDraggable: true,
            WindowMinimize: true,
            WindowStatus: 'regular', 
            WindowMaximize: true,
            WindowClosable: true
        });

    });


 });



//$(".icon").bind("dblclick", function () {

//    var $this = $(this);
//    var _id = $this.attr("id");
//    var _name = $this.attr("name");
//    var _icon = $this.attr("icon");
//    var _width = parseInt($this.attr("init_w"));
//    var _height = parseInt($this.attr("init_h"));
//    var _resize = $this.attr("resize") == "True" ? true : false;


//    $('#Window_' + _id).AeroWindow({
//        WindowIDTAG: "Window_" + _id,
//        WindowIcon: _icon,
//        WindowTitle: _name,
//        WindowPositionTop: 'center',
//        WindowPositionLeft: 'center',
//        WindowWidth: _width,
//        WindowHeight: _height,
//        WindowAnimationSpeed: 300,
//        WindowAnimation: 'easeOutCubic',
//        WindowResizable: _resize,
//        WindowDraggable: true,
//        WindowMinimize: true,
//        WindowMaximize: true,
//        WindowClosable: true
//    });

//});





function setPostion(id, x, y) {


    $.ajax({
        type: "POST",
        url: "/Icon/IconOrder/",
        async: true,
        data: {
            id: id,
            x: x,
            y: y 
        },
        beforeSend: function () {
            // alert('start');
        },
        success: function (data) {
            // alert(data);

        },
        error: function () {
            alert('error');
        }
    })

}




$(".icon").draggable(
{
    containment: 'window',
    helper: "clone",
    revert: false,
    opacity: 0.40,
    refreshPositions: true,
    //snap: 'span' ,
    stop: function (event, ui) {
        var _x = ui.helper.position().left;
        var _y = ui.helper.position().top;
        var _id = ui.helper.attr("id");
        $(this).css({ left: _x + "px", top: _y + "px" });
        setPostion(_id, _x, _y);
    }
}

).selectable();


function getTime() {

    var d = new Date();
    var m = d.getMinutes();
    $("#show-time").html(d.getHours() + ":" + (m < 10 ? "0" + m : m));
    $("#show-time-info").html(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "<p>星期" + d.getDay() + "</p>");
    setTimeout(getTime, 1000);

}
getTime();

$("#show-time").hover(function () { $("#show-time-info").fadeIn(200); }, function () { $("#show-time-info").fadeOut(200); });

$("#windows").click(function () {

    // $("#menu").toggle();
    //window.location.href = "/admin/manage/";

});



//$("body").not(".icon,.item").click(function () {
//    console.log("body click");
//    $(".icon").removeClass("icon-hover");

//});
//$(".icon").click(function () {

//    $(".icon").removeClass("icon-hover");
//    $(this).addClass("icon-hover");
//    hideMenu();
//    console.log("icon click");
//});

//function hideMenu() { $("#menu").hide(); }