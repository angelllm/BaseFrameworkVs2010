define(function (require, exports, module) {
    

    var vm = avalon.define({
        $id: 'box',
        width: document.body.clientWidth,
        init: function () {
            vm.initPage
            //头部菜单高亮
            $(".classic-menu-dropdown:eq(3)").addClass("active").find("li:eq(0)").addClass("active")
            //初始化参数
            var num = window.location.pathname.match(/\d+(\.\d+)?/g) //产生的是个数组 没有参数的时候是个null
            if (num && !isNaN(num[0])) {
                vm.options.w = num[0]
            }
        }
        ,
        //分页开始
        initPage:function(pagecount){
            //分页初始化
            for (var i = 1; i < pagecount; i++) {
                vm.pages.push(i)
            }
        }
        ,
        loadones:true
        ,
        tabels: "#tab_1_1"
        ,
        totalpagecount: 0
        ,
        newscount:0
        ,
        list: []
        ,
        pages: []
        ,
        options: {
            pagesize: 10,
            pageindex: 1,
            w:""
        }
        ,
        getlist: function (opt,callback) {
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
                url: "/admin/getmemberlist/",
                //async: true,
                data: vm.options, 
                type: "post",
                beforeSend: function () {
                    $(vm.tabels).hide().prev().removeClass("hide")
                },
                success: function (data) {

                    if (data.length <= 0) {
                        vm.list = []
                        vm.loadpage()
                        return
                    }
                    //过滤时间
                    $.each(data,function(index,item){
                        var _datestr = item.member_time.toString().replace("/Date(","").replace(")/","") +"+0800"
                        var date = new Date(parseFloat(_datestr))
                        item.member_time =  date.format("yy-MM-dd hh:mm:ss")
                    })

                    vm.list = []
                    vm.list = data
                    vm.newscount = data.length
                    var pagecount =
                    data[0].member_baby_age % vm.options.pagesize == 0 ?
                    data[0].member_baby_age / vm.options.pagesize :
                    (parseInt(data[0].member_baby_age / vm.options.pagesize)) + 1
                    //vm.newscount = data[0].article_cid
                    //console.log(parseInt(data[0].page_pv / vm.options.pagesize))
                    if (vm.loadones) {
                        vm.initPage(pagecount)
                        vm.loadones = false
                        vm.totalpagecount = pagecount //配置总页数
                    }
                    $(vm.tabels).show(500).prev().addClass("hide")
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
        ,
        loadpage: function () {
            $(vm.tabels).show(500).prev().addClass("hide")
        }
        //分页结束
        ,
        del: function (id) {
           
            dialog(function(){},function(){

                $.ajax({
                    url: "/admin/delPage/"+id +"/",
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

    Date.prototype.format = function(format){ 
        var o = { 
        "M+" : this.getMonth()+1, //month 
        "d+" : this.getDate(), //day 
        "h+" : this.getHours(), //hour 
        "m+" : this.getMinutes(), //minute 
        "s+" : this.getSeconds(), //second 
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter 
        "S" : this.getMilliseconds() //millisecond 
        } 
  
        if(/(y+)/.test(format)) { 
            format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        } 
  
        for(var k in o) { 
            if(new RegExp("("+ k +")").test(format)) { 
                format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
            } 
        } 
        return format; 
    } 

})