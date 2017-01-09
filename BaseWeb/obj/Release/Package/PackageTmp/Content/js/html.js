$("#tool-menu ul li").click(function () {
    var $this = $(this);
    $(".m-list").hide();
    $this.find(".m-list").show();
});


$(".m-list:eq(0) dd").click(function () {
    var $this = $(this);
    var _class = "";
    if ($this.index() == 0) {
        _class = "pser50";
    }
    else if ($this.index() == 1) {
        _class = "pser33";
    }
    else if ($this.index() == 2) {
        _class = "pser25";
    } 

    var _coll = $('<div class="coll ' + _class + '" />');
    var _title = $('<div class="r-title"><h6></h6></div>');
    _title.appendTo(_coll);
    $("body").prepend(_coll);
   
    initDraable(_coll,"");

});


$(".m-list:eq(1) dd").click(function () {
    var $this = $(this);
    var _class = "";
    if ($this.index() == 0) {
        _class = "full";
    }
    else if ($this.index() == 1) {
        _class = "w1198";
    }
    else if ($this.index() == 2) {
        _class = "w1000";
    }
    else if ($this.index() == 3) {
        _class = "w980";
    }

    var _rows = $('<div class="rows ' + _class + '" />');
    var _title = $('<div class="r-title"><h6></h6></div>');
    _title.appendTo(_rows);
    $("body").prepend(_rows);
    _rows.droppable({
        drop: function (event, ui) {
            //$(this).addClass("ui-state-highlight"); 
            $(this).append(ui.helper[0]); 
        }
    });
    initDraable(_rows,"rows");

});


function initDraable(obj,types) {

    var options =
        {
            //containment: 'window',
            opacity: 0.60,
            handle: '.r-title',
            stop: function (event, ui) {
                var _x = ui.helper.position().left;
                var _y = ui.helper.position().top;
                //obj.css({ left: _x + "px", top: _y + "px" });
            }
        };
    var handler = "all";
    if (types == "rows") {
        options = $.extend({ axis: "y" }, options);
        handler = "s";
    }  
   
    obj.draggable(options).resizable({
        handles: handler,
        resize: function (event, ui) {
            if (types == "rows") {
                $(this).css("position", "relative");
            } 
        }
    }).sortable({ revert: true });
}