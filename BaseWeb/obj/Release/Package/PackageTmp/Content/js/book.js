jQuery(function () {

    //preload all the images in the book,
    //and then call the booklet plugin 
    __init_value = $(".b-load").html();
    _initBook(800, 500, function () { }, function () { },0,"","","");
    _isLarge = false;
});

var _domain = "<a rel=\"nofollow\" class=\"domain\" href=\"http://www.miitbeian.gov.cn/publish/query/indexFirst.action\" target=\"_blank\">苏ICP备14017560号</a>";
var _end = "<div id=\"end\">End</div>";
_speed = 400;
function _initBook(_width, _height, _before, _after, _startingPage, _empty_valye, _blank_value, _last_value) {

    var _mybook = jQuery('#mybook');
    var _bttn_next = jQuery('#next_page_button');
    var _bttn_prev = jQuery('#prev_page_button');
    var _loading = jQuery('#loading');
    var _mybook_images = _mybook.find('img');
    var cnt_images = _mybook_images.length;
    var loaded = 0;

    _mybook_images.each(function () {
        var _img = jQuery(this);
        var source = _img.attr('src');
        jQuery('<img/>').load(function () {
            ++loaded;
            if (loaded == cnt_images) {
                _loading.hide();
                _bttn_next.hide();
                _bttn_prev.hide();
                _mybook.show().booklet({
                    name: null,
                    empty_valye: _empty_valye,
                    blank_value: _blank_value,
                    last_value: _last_value, 
                    width: _width,                             // container width
                    height: _height,                             // container height
                    speed: _speed,                             // speed of the transition between pages
                    direction: 'LTR',                           // direction of the overall content organization, default LTR, left to right, can be RTL for languages which read right to left
                    startingPage: _startingPage,                               // index of the first page to be displayed
                    easing: 'easeInOutQuad',                 // easing method for complete transition
                    easeIn: 'easeInQuad',                    // easing method for first half of transition
                    easeOut: 'easeOutQuad',                   // easing method for second half of transition

                    closed: true,                           // start with the book "closed", will add empty pages to beginning and end of book
                    closedFrontTitle: "",                            // used with "closed", "menu" and "pageSelector", determines title of blank starting page
                    closedFrontChapter: null,                            // used with "closed", "menu" and "chapterSelector", determines chapter name of blank starting page
                    closedBackTitle: null,                            // used with "closed", "menu" and "pageSelector", determines chapter name of blank ending page
                    closedBackChapter: null,                            // used with "closed", "menu" and "chapterSelector", determines chapter name of blank ending page
                    covers: false,                           // used with  "closed", makes first and last pages into covers, without page numbers (if enabled)

                    pagePadding: 10,                              // padding for each page wrapper
                    pageNumbers: true,                            // display page numbers on each page

                    hovers: false,                            // enables preview pageturn hover animation, shows a small preview of previous or next page on hover
                    overlays: false,                            // enables navigation using a page sized overlay, when enabled links inside the content will not be clickable
                    tabs: true,                           // adds tabs along the top of the pages
                    tabWidth: 60,                              // set the width of the tabs
                    tabHeight: 20,                              // set the height of the tabs
                    arrows: false,                           // adds arrows overlayed over the book edges
                    cursor: 'pointer',                       // cursor css setting for side bar areas

                    hash: false,                           // enables navigation using a hash string, ex: #/page/1 for page 1, will affect all booklets with 'hash' enabled
                    keyboard: true,                            // enables navigation with arrow keys (left: previous, right: next)
                    next: _bttn_next,          			// selector for element to use as click trigger for next page
                    prev: _bttn_prev,          			// selector for element to use as click trigger for previous page

                    menu: null,                            // selector for element to use as the menu area, required for 'pageSelector'
                    pageSelector: false,                           // enables navigation with a dropdown menu of pages, requires 'menu'
                    chapterSelector: false,                           // enables navigation with a dropdown menu of chapters, determined by the "rel" attribute, requires 'menu'

                    shadows: true,                            // display shadows on page animations
                    shadowTopFwdWidth: 166,                             // shadow width for top forward anim
                    shadowTopBackWidth: 166,                             // shadow width for top back anim
                    shadowBtmWidth: 50,                              // shadow width for bottom shadow

                    before: _before,                    // callback invoked before each page turn animation
                    after: _after                     // callback invoked after each page turn animation
                });
                //Cufon.refresh();
            }
        }).attr('src', source);
    });
     

}


$(".mode").click(function () {
    $(".b-prev,.b-next").remove();
    var _width = 1750, _height = 866;
    var _src, _source;
    if (_isLarge) {

        $(".book_wrapper").removeClass("big_book_wrapper");
        $("#loading").empty();
        _width = 800, _height = 500;
        _isLarge = false;
        $(".mode").removeClass("mode2");
        _src = "thumb";
        _source = "source";
    }
    else {

        $(".book_wrapper").addClass("big_book_wrapper");
        $("<link>")
        .attr({ rel: "stylesheet",
            type: "text/css",
            href: "../../Content/js/book/css/style2.css"
        })
        .appendTo($("#loading"));
        _isLarge = true;
        $(".mode").addClass("mode2");
        _src = "source";
        _source = "thumb";
    }
    //__init_value = $(".b-load").html();
    $(".b-load").empty().append(__init_value);
    $("section img").each(function (i, it) {
        var __src = $(it).attr("src");
        $(it).attr("src", __src.toString().replace(_source, _src));
    });

    _initBook(_width, _height, function () { }, function () { }, _loading, _catalog, _end, _end);
    _scrollFirst = setInterval(scrollFirst, 100);

});


$(".book").click(function () {

    var $this = $(this);
    var _wrap = $(".b-wrap");
    _catalog = "";
    $.ajax({
        type: "POST",
        url: "/Home/BookJiaTypeList/",
        async: false,
        data: {
            id: $this.attr("data")
        },
        beforeSend: function () {
            _wrap.empty().load("../../Template/web/AI/loading.xml");
        },
        success: function (data) {

            _loading = 0; //reset cur loading page
            if (data.length == 0) {
                _wrap.empty().load("../../Template/web/source.txt");
                //console.log("xxxxx");
            }
            else {

                var _temp = "";
                $.each(data, function (index, item) {

                    _catalog += "<h3><a data=\"" + (index + 1) + "\">" + item.article_title + "</a><em>" + (index + 1) + "</em></h3>";

                    var _image = "../../Content/images/nophoto.jpg";
                    //console.log("item.article_image:" + item.article_image);
                    if (item.article_image != "") {
                        _image = item.article_image;
                    }
                    _temp += "<div>" +
                                "<section id=\"sec_" + item.article_id + "\">" +
				                    "<img class=\"img\" src=\"" + _image + "\" onerror=\"this.src='../../Content/images/nophoto.jpg'\" alt=\"\"/>" +
				                    "<h1>" + item.article_title + "</h1>" +
				                    "<p>" + item.article_summary + "</p>" +
				                    "<a class=\"article\" data=\"" + item.article_id + "\">阅读</a>" +
				                    "<a class=\"demo\">下载本源码</a>" +
                                "</section>" +
                                "<article></article>" +
			                 "</div>";

                });

                $(".b-load").empty().append(_temp);
                var _width = 800, _height = 500;
                if (_isLarge) {
                    _width = 1750, _height = 866;
                }
                __init_value = _temp;
                _catalog = "<div class=\"pagefirst book_first\" id=\"book_first\"><h2>" + $this.attr("data-name") + "</h2>" + _catalog + _domain + "</div>";
                //c_1 = "<div class=\"pagefirst book_first\" id=\"book_last\"><h2>" + _catalog + _domain + "</div>";
                var _2 = "<div class=\"pagefirst\">" + $this.attr("data-name") + "</div>";

                _initBook(_width, _height, function () { }, function () { }, _loading, _catalog, _end, _end);
                _scrollFirst = setInterval(scrollFirst, 100);

            }


        },
        error: function () {

        }
    })

});

var _catalog = "";
$(".booktypelist").click(function () {

    var $this = $(this);
    _catalog = "";
    var _wrap = $(".b-wrap");
    $.ajax({
        type: "POST",
        url: "/Home/BookTypeList/",
        async: false,
        data: {
            id: $this.attr("data")
        },
        beforeSend: function () {

            _wrap.empty().load("../../Template/web/AI/loading.xml");
        },
        success: function (data) {

            _loading = 0; //reset cur loading page
            if (data.length == 0) {
                _wrap.empty().not(".b-page-empty").load("../../Template/web/source.txt");
                //$(".b-page-empty").html($this.find("span").html());
            }
            else {

                var _temp = "";

                $.each(data, function (index, item) {
                    _catalog += "<h3><a data=\"" + (index + 1) + "\">" + item.article_title + "</a><em>" + (index + 1) + "</em></h3>";
                    _temp += "<div>" +
                                "<section id=\"sec_" + item.article_id + "\">" +
				                    "<img class=\"img\" src=\"../../Content/images/nophoto.jpg\" onerror=\"this.src='../../Content/images/nophoto.jpg'\" alt=\"\"/>" +
				                    "<h1>" + item.article_title + "</h1>" +
				                    "<p>" + item.article_summary + "</p>" +
				                    "<a class=\"article\" data=\"" + item.article_id + "\">阅读</a>" +
				                    "<a class=\"demo\">下载本源码</a>" +
                                "</section>" +
                                "<article></article>" +
			                 "</div>";

                });

                $(".b-load").empty().append(_temp);
                var _width = 800, _height = 500;
                if (_isLarge) {
                    _width = 1750, _height = 866;
                }
                __init_value = _temp;
                _catalog = "<div class=\"pagefirst book_first\" id=\"book_first\"><h2>" + $this.attr("data-name") + "</h2>" + _catalog + _domain + "</div>";
                //c_1 = "<div class=\"pagefirst book_first\" id=\"book_last\">" + _catalog + _domain + "</div>";
                var _2 = "<div class=\"pagefirst\">" + $this.attr("data-name") + "</div>";

                _initBook(_width, _height, function () { }, function () { }, _loading, _catalog, _end, _end);
                _scrollFirst = setInterval(scrollFirst, 100);

            }

        },
        error: function () {

        }
    })

});

function scrollFirst() {
    if ($("#book_first")[0]!="undefined") {
        scrollHide($(".book_first"));
        //console.log($("#book_first")[0]);
        clearInterval(_scrollFirst);
    }
    
}

$(".close").click(function () {
    $(".book_wrapper ").slideToggle(500);
});

$(".book").click(function () {
    $(".book_wrapper ").slideToggle(500);
});

$(".article").live("click", function () {

    var $this = $(this);
    if ($(".big_book_wrapper").html() == undefined) {
        //_isLarge = false;
        //$(".mode").click();
    }

    var id = $this.parent().attr("id");
    var _obj = $("#" + id);
    _obj.slideUp(200);

    $.ajax({
        type: "POST",
        url: "/Home/ContentList/",
        async: true,
        data: {
            id: $this.attr("data")
        },
        beforeSend: function () {
            $(".tip").fadeIn(500);
        },
        success: function (data) {
            $(".tip").fadeOut(500);
            var _html = "";
            $.each(data, function (index, it) {
                _html += "<details open><summary>" + it.content_title + "</summary><h1 class=\"art-title\">" + it.content_title + "</h1>" + it.content_content + "</details>";
            });
            _obj.next().empty().append(_html);
            _html = "";
            scrollHide(_obj.next());
        },
        error: function () {

        }
    })



});

function scrollHide(obj) {
    obj.mCustomScrollbar({
        autoHideScrollbar: true,
        theme: "light-thin"
    });
}

$("#book_first a").live("click", function () {
    var length = parseInt($(this).attr("data"));
     _fs = setInterval("fs(" + length + ")", 900); 
});
m = 1;
function fs(length) {

    if (length == 1) return;
    if (length % 2 == 0) length = (length / 2) + 1;
    else length = length / 2;
    if (m >= length) {
        clearInterval(_fs);
        m = 1;
    } else {
        $(".b-next").click();
        m++;
    }
}
