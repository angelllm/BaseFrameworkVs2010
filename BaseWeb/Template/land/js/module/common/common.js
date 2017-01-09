define(function (require, exports, module) {


    require("pjax")
    require("rain")
    require("music")

    var vm = avalon.define({
        $id: 'page',
        banner:undefined,
        bannerindex:1,
        bannerlist:[],
        init: function () {
            vm.createFilter()
            vm.initPjax()
            vm.mobileNav()
            vm.scrollPostion()
            vm.initBanner(3)
            vm.rain(vm.bannerlist[0])
            vm.loopRain()
        }
        ,
        initBanner:function(count){
            for (var i = 0; i < count; i++) {
                vm.bannerlist.push('/Template/land/images/banner-' + i + '.jpg')
            }
        }
        ,
        loopRain:function(){

            setTimeout(function(){
                if (vm.bannerlist.length == vm.bannerindex) {
                    vm.bannerindex = 0
                }
                $("#banner").html("")
                $("canvas").remove()
                try
                {
                    vm.rain(vm.bannerlist[vm.bannerindex])
                    vm.loopRain(vm.bannerindex++)
                }
                catch(err)
                {
                   
                }
                
            }, vm.bannerindex * 60000)
        }
        ,
        rain:function(src){

            var _image = new Image()
            _image.style.opacity = 0
            //_image.style.height = "200px"
            _image.onload = function() {
                var engine = new RainyDay({
                    image: this
                })
                engine.rain([ [3, 2, 2] ], 100)
                //engine.rain([ [1, 2, 8000] ]);
                engine.rain([ [3, 3, 0.88], [5, 5, 0.9], [6, 2, 1] ], 100);
            }
            _image.src = src
            var _banner = document.getElementById('banner')
            _banner.appendChild (_image)
            vm.banner = _image
        }
        ,
        scrollPostion:function(){

            var _menu_link_top = $(".menu_link").offset().top
            var _cs_widget_comment_top = $(".cs_widget_comment").offset().top
            var _cs_widget_comment_height = $(".cs_widget_comment").height()
            var _widget_tag_cloud_width = 230 //$(".widget_tag_cloud").width()
            $(window).scroll(function(){

                if (_menu_link_top + 100 < $(window).scrollTop()) {
                    $(".leftbar").css({
                        'position':'fixed',
                        'top':'45px'
                    })
                }else{
                    $(".leftbar").removeAttr('style')
                }

                if (_cs_widget_comment_top + _cs_widget_comment_height < $(window).scrollTop()) {
                    $(".widget_tag_cloud").css({
                        'position':'fixed',
                        'top':'55px',
                        //'z-index':'9999',
                        'width':_widget_tag_cloud_width+'px'
                    })
                }else{
                    $(".widget_tag_cloud").removeAttr('style')
                }

                if ($(window).scrollTop() > 100) {
                    $(".foot_btn").fadeIn('slow', function() {
                        
                    });
                }
                else {
                    $(".foot_btn").fadeOut('slow', function() {
                        
                    });
                }
               
            })
        }
        ,
        mobileNav:function(){
            $(".mobile-nav").find("a").on("click",function(){
                $(".mobile-nav").hide()
            })
        }
        ,
        initPjax: function () {
            $.pjax({
                selector: ".pjax", //pjax只触发有href属性的  以及不处理新弹出窗口的,以及不处理样式为item类型的代码高亮A标签
                container: '#content', //内容替换的容器
                //show: 'fade',  //展现的动画，支持默认和fade, 可以自定义动画方式，这里为自定义的function即可。
                cache: false,  //是否使用缓存
                storage: true,  //是否使用本地存储
                titleSuffix: '-llm小屋for纠结的狮子座', //标题后缀
                beforeSend: function () {
                   
                },
                filter: function () {
               
                    if ($(this).parent().hasClass('menu-item')) {
                        avalon.vmodels["box"].loadones = true
                        avalon.vmodels["box"].options  =  {pagesize: 10,pageindex: 1,w:""}
                    }
                  
                },
                callback: function () {
                    
                }
            })
        }
        ,
        createFilter: function () {

            avalon.filters.splitTag = function (str) {
                if (str == null || str == "") { return "" }
                var _split = str.split(',')
                var _str = ""
                for (var i = 0; i < _split.length; i++) {
                    _str += "<a class=\"pjax\" href=\"/land/list-0-0-0-" + _split[i] + "/\" rel=\"tag\">" + _split[i] + "</a>"
                }
                return _str
            }
        }
        ,
        showmore:function(){
            $(this).parent().fadeOut(300).next().fadeIn(300)
        }
        ,
        navigation:function(){
            $("nav[role=\"navigation\"].mobile-nav").toggle("fast")
        }
        ,
        addLive: function (id) {
            var _this = $(this)
            if (_this.data('data-live')) {
                return 
            }
            $.ajax({
                url: "/land/addLive/",
                data: {
                    id: id
                },
                type: "post",
                beforeSend: function () {
                    //console.log(_this.text())
                },
                success: function (data) {
                    var _like = parseInt(_this.text())
                    _this.html('<i class="fa fa-heart-o"></i> '+(_like+1))
                    _this.data('data-live',"live")
                },
                error: function (e) {
                    
                }
            })
        }
        ,
        reply: function (id) {
            $("input[name='commite_ref_id']").val(id)
        }
        ,
        loginshow: function () {

            if ($(this).attr("data-bind")==0) {
                $(".login_bg").slideDown(300)
                $(this).attr("data-bind",1)
            }
            else if ($(this).attr("data-bind")==1) {
                $(".login_bg").slideUp(300)
                $(this).attr("data-bind",0)
            }
        }
        ,
        gototop:function(){
            $("body,html").animate({scrollTop:0}, 200)
        }
        ,
        login: function () {
            var _uname = $("#user_login")
            var _upwd = $("#user_pass")
            var _error = $("#login-error")
            var _submit = $(this)
            var _flag =  true
            _error.empty()
            if ($.trim(_uname.val()) == "") {
                _error.html("\u8bf7\u586b\u5199\u7528\u6237\u540d")
                _uname.focus()
                _flag = false
            }
            else if ($.trim(_upwd.val()) == "") {
                _error.html("\u8bf7\u8f93\u5165\u5bc6\u7801")
                _upwd.focus()
                _flag = false
            }
            if (!_flag) { return false}

            $.ajax({
                url: "/land/login/",
                data: {
                    uname: _uname.val(),
                    upwd:_upwd.val()
                },
                type: "post",
                beforeSend: function () {
                    _submit.attr("disabled","disabled")
                },
                success: function (data) {
                   data = eval(data)[0]
                   if (data.code == 0) {
                       _error.html(data.msg) 
                   }else if(data.code == 1) {
                       $(".login_bg").slideUp(300)
                       _uname.val("")
                       _upwd.val("")
                        _submit.parents(".member_login").find("a").eq(0).
                        addClass('hideall').next().removeClass('hideall').
                        find("img").attr("src",data.uface).next().html(data.uname)
                   }
                   _submit.removeAttr("disabled")
                },
                error: function (e) {
                    _submit.removeAttr("disabled")
                }
            })
        }
        ,
        loginout:function(){
            var _this = $(this)
            $.ajax({
                url: "/land/loginout/",
                data: {
                   
                },
                type: "post",
                beforeSend: function () {
                    
                },
                success: function (data) {
                   _this.addClass('hideall').prev().removeClass('hideall')
                },
                error: function (e) {
                    
                }
            })
        }
        ,
        search:function(){
            
            var _input  = $("input[name='s']")
            if (event.keyCode === 13) {
                $("#from").attr("href","/land/list-0-0-0-"+_input.val() +"/").click()
                $(this).val("").blur()
            }
            //e.preventDefault() //阻止表单提交
             
        }
    })

    vm.init()

    $(window).resize(function(){
        vm.scrollPostion() //reset tag wrapper position
    })


   


})