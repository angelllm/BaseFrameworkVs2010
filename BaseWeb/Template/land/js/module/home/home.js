define(function (require, exports, module) {

    

    var vm = avalon.define({
        $id: 'box',
        list:[],
        toplist:[],
        flag:true,
        displaytype:1,
        clickme:0,
        content:"",
        loadones:true,
        totalpagecount:0,
        totalcount: 0,
        pages: []
        ,
        //分页开始  
        initPage: function (pagecount) {
            //分页初始化
            vm.pages = []
            for (var i = 0; i < pagecount; i++) {
                vm.pages.push(i)
            }
        }
        ,
        initLoading: function () {
            vm.loadones = true
        }
        ,
        init: function () {

            vm.getlist()
            vm.gettoplist()
            vm.initTip() 
            
        }
        ,
        simpleInit: function () {
            vm.getlist()
            vm.initTip() 
            //console.log(vm.options.w)
        }
        ,
        MusicInit: function () {
            
            vm.options = { pagesize: 10, pageindex: 1, w: "music"}
            vm.getlist()
            vm.initTip() 
            //console.log(vm.options.w)
        }
        ,
        initParama: function () {
           var _url = $("#uri").val()
           var num = _url.match(/\d+(\.\d+)?/g) 
           //console.log(num)
           if (num && !isNaN(num[0]) && num.length == 1) {
               vm.options.w = num[0]
           }else{
               vm.options.w = _url == "/land/list/" ? "" : _url
           }
           //_url = _url.substring(_url.indexOf("/land/list")+"/land/list".length)
           //console.log(_url)
        }
        ,
        options: {
            pagesize: 10,
            pageindex: 1,
            w:""
        }
        ,
        initTip:function(){
            $(".simptip-smooth.simptip-movable").each(function(index,item){
                if ($(item).width() > 420) {
                    $(item).removeClass('simptip-position-right').addClass('simptip-position-bottom')
                }
            })
        }
        ,
        givepagecss: function (obj) {
            $(obj).addClass("current").siblings().removeClass("current")
            $("body,html").animate({scrollTop:0}, 200)
            return false
        }
        ,
        show:function(){
            $("center").hide()
            $(".fadeInDown").fadeIn(300)
            $(".ias-trigger-next,.nav-inside").show()
        }
        ,
        getlist: function (opt,befcall,callback) {
            //防止到最小页数或最大页数后还能被执行查询
            if (opt) {
                if (opt.pageindex <= 0 || opt.pageindex > vm.totalpagecount) {
                    return
                }
            }
            //合并配置
            vm.options = $.extend(vm.options, opt)
            //ajax请求开始 
            $.ajax({
                url: "/land/getlist/",
                async: true,
                data: vm.options, 
                type: "post",
                beforeSend: function () {
                    if (befcall) {
                        befcall()
                    }

                },
                success: function (data) {
                    
                    if (data.length <= 0) {
                        vm.list = []
                        //vm.loadpage()
                        return
                    }
                    //vm.list = []
                    vm.list = data
                    //console.log(data)
                    vm.newscount = data.length
                    var pagecount =
                    data[0].article_cid % vm.options.pagesize == 0 ?
                    data[0].article_cid / vm.options.pagesize :
                    (parseInt(data[0].article_cid / vm.options.pagesize)) + 1
                    //vm.newscount = data[0].article_cid
                    //console.log(data[0].article_cid )
                    if (vm.loadones) {
                        vm.initPage(pagecount)
                        vm.loadones = false
                        vm.totalpagecount = pagecount //配置总页数
                    }
                    //$(vm.tabels).show(500).prev().addClass("hide")
                    vm.initTip()

                    if (callback) {
                        if (avalon.isFunction(callback)) {
                            callback()
                        } else {
                            //$(".pagination li").removeClass("active").eq(callback).addClass("active")
                        }
                    }
                    
             
                },
                error: function (e) {
                    //console.log(e)
                }
            })
        }
        ,
        gettoplist: function () {
            
            //ajax请求开始 
            $.ajax({
                url: "/land/getTopList/",
                data: {
                    pagesize: 3,
                    pageindex: 1,
                    q: ""
                },
                type: "post",
                beforeSend: function () {
                    
                },
                success: function (data) {
                    vm.toplist = []
                    vm.toplist = data 
                },
                error: function (e) {
                    //console.log(e)
                }
            })
        }
        ,
        nextPage:function(){
            if (!vm.flag ) return
            if (vm.clickme >= vm.totalpagecount ) {
                //没有更多了
                $(this).find("a").text("^-^没有了")
                return
            }
  
            var _this = $(this)
            vm.clickme ++;
            vm.content = "" 
            vm.content = $("#content .posts").clone() //复制所有文章
                                             .addClass('clone') //移除append上去的Html,避免重复append内容从而避免不必要的阅读障碍
            var _st = $("body").scrollTop()
            var _pageindex = vm.options.pageindex + 1
            vm.getlist({pageindex:_pageindex},function(){
                vm.flag = false
                _this.addClass("loading").children('a').text("\u6b63\u5728\u52a0\u8f7d...")
                $("#content .clone").remove()
              
            },function(){
                vm.flag = true
                if (vm.displaytype == 1) {
                    $("#app").after(vm.content );
                    $("body,html").animate({scrollTop:$(".posts.clone").last().next().offset().top - 100}, 300)
                    _this.removeClass("loading").children('a').text("\u52a0\u8f7d\u66f4\u591a")
                }
            })
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


    })
      
    module.exports = {
        init: vm.init,
        simpleInit:vm.simpleInit,
        initParama:vm.initParama,
        initLoading:vm.initLoading
    } 
    /*var HelloBox = React.createElement('h1',null,'HelloBox');
    var cc = React.createElement('div', null, HelloBox );
    React.render(
        cc,
        document.getElementById('app')
    );*/
    

})