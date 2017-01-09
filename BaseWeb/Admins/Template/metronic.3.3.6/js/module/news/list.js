define(function (require, exports, module) {


    var vm = avalon.define({
        $id: 'box',
        width: document.body.clientWidth,
        init: function () {
            vm.initPage
            //头部菜单高亮
            $(".classic-menu-dropdown:eq(0)").addClass("active").find("li:eq(0)").addClass("active")
            //取、设置查询参数(值传递的时候用decodeURIComponent) 
            vm.options.q = avalon.vmodels["page"].request("q")
        }
        ,
        //分页开始  
        initPage: function (pagecount) {
            //分页初始化
            vm.pages = []
            for (var i = 1; i < pagecount; i++) {
                vm.pages.push(i)
            }
        }
        ,
        loadones: true
        ,
        totalcount: 0
        ,
        tabels: "#tab_1_1"
        ,
        totalpagecount: 0
        ,
        newslist: []
        ,
        pages: []
        ,
        options: {
            pagesize: 10,
            pageindex: 1,
            q: ""
        }
        ,
        loadpage: function () {
            $(vm.tabels).show(500).prev().addClass("hide")
        }
        ,
        getlist: function (opt, callback) {
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
                url: "/admin/getNewsList/",
                //async: true,
                data: vm.options,
                type: "post",
                beforeSend: function () {
                    $(vm.tabels).hide().prev().removeClass("hide")
                },
                success: function (data) {
                    if (data.length <= 0) {
                        vm.loadpage()
                        return
                    }
                    $.each(data,function(index,item){
                        var _type = item.article_shut_title
                        var _typehtml = []
                        if (_type) {
                            $.each(_type.split(","),function(idx,it){
                                var _typeitem = it.split("|")
                                _typehtml.push("<span class=\"label label-default\"><i class=\"fa fa-tag\"></i> "+_typeitem[1]+"</span>")
                            })
                            item.article_type_name = _typehtml.join(" ")
                        }
                        //console.log(_type)
                    })
                    vm.newslist = []
                    vm.newslist = data
                    vm.newscount = data.length
                    var pagecount =
                    data[0].article_cid % vm.options.pagesize == 0 ?
                    data[0].article_cid / vm.options.pagesize :
                    (parseInt(data[0].article_cid / vm.options.pagesize)) + 1
                    vm.totalcount = data[0].article_cid //数据总数
                    //console.log(vm.totalcount)
                    if (vm.loadones) {
                        vm.initPage(pagecount)
                        vm.loadones = false
                        vm.totalpagecount = pagecount //配置总页数
                    }
                    vm.loadpage()
                    if (callback) {
                        if (avalon.isFunction(callback)) {
                            callback()
                        } else {
                            $(".pagination li").removeClass("active").eq(callback).addClass("active")
                        }
                    }

                },
                error: function (e) {
                    //console.log(e)
                }
            });
        }
        ,
        givepagecss: function (obj) {
            $(obj).addClass("active").siblings().removeClass("active")
        }
        //分页结束
        ,
        del: function (id) {

            dialog(function () { }, function () {

                $.ajax({
                    url: "/admin/delNews/" + id + "/",
                    //async: true,
                    data: {
                    //id:id
                },
                type: "post",
                beforeSend: function () {
                    $(vm.tabels).hide().prev().removeClass("hide")
                },
                success: function (data) {
                    vm.getlist()
                },
                error: function (e) {
                    //console.log(e)
                }
            })
        })

    }


})
vm.init()
vm.getlist()

})