﻿define(function (require, exports, module) {


    var vm = avalon.define({
        $id: 'box',
        width: document.body.clientWidth,
        init: function () {
            vm.initPage
            //头部菜单高亮
            $(".classic-menu-dropdown:eq(1)").addClass("active").find("li:eq(0)").addClass("active")
            //初始化参数
            var num = window.location.pathname.match(/\d+(\.\d+)?/g) //产生的是个数组 没有参数的时候是个null
            if (num && !isNaN(num[0])) {
                vm.options.w = num[0]
            }
        }
        ,
        //分页开始
        initPage: function (pagecount) {
            //分页初始化
            for (var i = 1; i < pagecount; i++) {
                vm.pages.push(i)
            }
        }
        ,
        loadones: true
        ,
        tabels: "#tab_1_1"
        ,
        totalcount: 0
        ,
        totalpagecount: 0
        ,
        newscount: 0
        ,
        typelist: []
        ,
        pages: []
        ,
        options: {
            pagesize: 10,
            pageindex: 1,
            w: ""
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
                url: "/admin/getTypeList/",
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
                    vm.typelist = []
                    vm.typelist = data
                    vm.newscount = data.length
                    var pagecount =
                    data[0].IsSigle % vm.options.pagesize == 0 ?
                    data[0].IsSigle / vm.options.pagesize :
                    (parseInt(data[0].IsSigle / vm.options.pagesize)) + 1
                    //vm.newscount = data[0].article_cid
                    //console.log(parseInt(data[0].IsSigle / vm.options.pagesize))
                    vm.totalcount = data[0].IsSigle //数据总数
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
            avalon.vmodels["page"].clearSelect()
        }
        //分页结束
        ,
        del: function (id) {

            dialog(function () { }, function () {

                $.ajax({
                    url: "/admin/delType/" + id + "/",
                    //async: true,
                    data: {
                    //id:id
                },
                type: "post",
                beforeSend: function () {
                    $(vm.tabels).hide().prev().removeClass("hide")
                },
                success: function (data) {
                    data = eval(data)[0]
                    if (data.msg == "ok") {
                        vm.getlist()
                    } else {
                        alert(data.msg, "删除操作");
                        vm.loadpage()
                    }

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