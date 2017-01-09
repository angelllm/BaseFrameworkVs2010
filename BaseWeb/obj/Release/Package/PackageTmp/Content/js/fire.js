
isDrop = false;
function setFire() {
    var img = jQuery('.fire img');
    img.attr("src", img.attr("data"));
}
function returnFire() {
    var img = jQuery('.fire img');
    img.attr("src", img.attr("data-source"));
}

$(".w-item").draggable(
    {
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
            if (isDrop) {
                $(this).fadeOut(800);
                isDrop = false;
            }
        },
        cursor: 'drophover',
        hoverClass: 'drophover'
    }

);

$(".fire").droppable({
    drop: function (event, ui) {
        //console.log($(this));
        setFire();
        isDrop = true;
        setInterval(returnFire, 1000 * 60);
    }
});

