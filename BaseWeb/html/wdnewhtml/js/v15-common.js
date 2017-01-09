$(".menu-item").on("mouseover", function () {
    tipanimate($(this).find(".j-tip"), 35, 1,false);
});
$(".menu-item").on("mouseout", function () {
    tipanimate($(this).find(".j-tip"), 70, 0, true);
});

$(".j-user-def").on("click", function () {
    //islogin
    var flag = false;
    //do samething to change flag value
    //do....
    //
    if (!flag) {
        showlogin();
    } else {
        //show login info
    }
});

$(".menu-c").not($(".menu-c").slice(3,5)).on("click", function () {

    var $this = $(this);
    var _index = parseInt($this.attr("data-bind")); 
    
    if ($this.hasClass("fade")) {
        $(".slideBar-shop-c").eq(_index).fadeOut();
        $this.removeClass("fade");
        $("#j-sidebar-hide").hide();
    } else {
        $(".fade").removeClass("fade");
        $(".slideBar-shop-c").eq(_index).fadeIn().end().not($(".slideBar-shop-c").eq(_index)).fadeOut();
        $this.addClass("fade");
        $("#j-sidebar-hide").show();
        switch (_index) {
            case 0: _loading(); setScroll($("#slideBar-shop-list .shop-c")); break;
            case 1: _loading(); setScroll($("#slideBar-coll-list .shop-c")); break;
            case 2: _loading(); setScroll($("#slideBar-his-list .shop-c")); break;
            default:;

        }
    }
});

function _loading() {
    //ajax loading and set value
};

$(".coll-del").on("click", function () {

    var $this = $(this);
    var $parent = $this.parent().parent();
    var $length = $parent.parent().find("a").length;
    $parent.fadeOut(function () { $parent.remove(); });
    if ($length == 1) {
        $parent.parent().parent().fadeOut();
    }  
});


function tipanimate(obj, right, opacity,ishide) {
    if (ishide) {
        obj.stop().animate({ right: right + "px", opacity: opacity }, 300, function () { obj.hide(); });
    } else {
        obj.stop().show().animate({ right: right + "px", opacity: opacity }, 300);
    }
    
}

function showlogin() {
    $("#login-zm").fadeIn();
}


$(".item-pro-control").on("mouseover", function () {
    $(this).find(".item-pro-count").hide().next().show();
}).on("mouseout", function () {
    $(this).find(".item-pro-count").show().next().hide();
});
$(".item-pro-del").on("click", function () {
    $(this).parent().parent().parent().parent().fadeOut(400);
});

function setScroll(obj) {
    if (!obj.find(".mCustomScrollBox").html()) {
        obj.mCustomScrollbar({
            autoHideScrollbar: true,
            mouseWheelPixels: 340,
            theme: "light-thin"
        });
    }
}

$("#j-top").on("click", function () {
    $('body,html').animate({ scrollTop: 0 }, 200); return false; 
});

$("#j-feedback").on("click", function () {
    $(this).addClass("fade");
    $("#j-feedback-box").fadeIn();
});

$(".e-feedback-close").on("click", function () {
    $("#j-feedback").removeClass("fade");
    $("#j-feedback-box").fadeOut();
});

$("#j-sidebar-hide").on("click", function () {
    $(".slideBar-shop-c").fadeOut();
    $(this).hide();
    $(".fade").removeClass("fade");
});
 
$(".scrollLoading").scrollLoading();

$(".menu-wapper li").hover(function () {
    $(this).toggleClass($(this).attr("data-bind") + " menu-icon");
});

$(".login-close").on("click", function () {
    $("#login-zm").fadeOut();
});


var _i_index = 0;
function switchKW() {
    var _input = $(".search-input");
    if (_input.val()) {
        var _i_value = _input.attr("data-bind").split(' ');
        _input.attr("placeholder", _i_value[_i_index]);
        _i_index = _i_index == _i_value.length ? 0 : _i_index + 1;
    } else {
        clearInterval(_search_fun);
    } 
}

switchKW();
var _search_fun = setInterval(switchKW, 6000);
