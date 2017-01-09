define(function (require, exports, module) {
    
    //火狐中不支持Flash 把uploadify替换成fileupload插件
    //以后的版本都弃用uploadify 以后浏览器都不会支持flash
    require("wid")
    require("/Content/js/ueditor/ueditor.config")
    require("/Content/js/ueditor/ueditor.all")
    //require("/content/js/uploadify/jquery.uploadify-3.1")
    require("module/member/member-form-validation.min")
    require("trans") 
    require("fl3")

    var vm = avalon.define({
        $id: 'box',
        filepath:"",
        isupload:false,
        filepath_zhengshu:"",
        zhengshu_arr:[],
        isupload_zhengshu:false,
        imglist:[],
        status:1,
        init: function () {
            //头部菜单高亮
            $(".classic-menu-dropdown:eq(3)").addClass("active").find("li:eq(1)").addClass("active").find("li:eq(1)").addClass("active")
            avalon.ready(function() {
                //初始化编辑框
                var editor_a = new baidu.editor.ui.Editor({ initialFrameWidth: 600 });
                editor_a.render('gongzuojingli'); 
            
            });
            //初始化上传控件
            //vm.InitUpload()
            //vm.InitZhengShuUpload()
            //初始化时间
            vm.initDate()
            vm.initDateDay(vm.birdthday[0].monthtxt - 1)

        }
        ,
        IsPinYear: function (year){ 
            return(0 == year%4 && (year%100 !=0 || year%400 == 0))
        } 
        ,
        initDate: function (){ 

           var date = new Date()
           var y = date.getFullYear()
           vm.birdthday[0].yeartxt  = $("#year").val() || y
           vm.birdthday[0].monthtxt = $("#month").val() || date.getMonth() + 1
           vm.birdthday[0].daytxt   = $("#day").val() || date.getDate()
           vm.birdthday[0].year     = []
           vm.birdthday[0].month    = []
           vm.birdthday[0].day      = []
           for (var i = (y-70); i < (y+30); i++) //以今年为准，前30年，后30年  
           {  
               vm.birdthday[0].year.push(i)
           }  
           for (var i = 1; i < 13; i++)  
           {  
               vm.birdthday[0].month.push(i)
           }  
        } 
        ,
        initDateDay: function (date){ 
            MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            var n = MonHead[date]
           /* console.log(n)
            console.log(date.getMonth())*/
            if (date == 1 && vm.IsPinYear(vm.birdthday[0].yeartxt)) n++
            for (var i=1; i<(n+1); i++)  {
                 vm.birdthday[0].day.push(i)
            } 
        } 
         
        ,
        birdthday:[{
            year:[],
            month:[],
            day:[],
            yeartxt:"年",
            monthtxt:"月",
            daytxt:"日"
        }]
        ,
        questionlist:[
            {'id':1,'question':'你最喜欢的食物'},
            {'id':2,'question':'你的宠物名字'},
            {'id':3,'question':'你的车牌号码'},
            {'id':4,'question':'你的伴侣姓名'},
            {'id':5,'question':'你最要好的同学的名字'},
            {'id':6,'question':'你最想做的事情'}
        ]
        ,
        selectYear: function () {
            vm.birdthday[0].yeartxt  = $(this).text() 
            vm.birdthday[0].day      = []
            vm.initDateDay(vm.birdthday[0].monthtxt - 1)
        }
        ,
        selectMonth: function () {
            vm.birdthday[0].monthtxt = $(this).text()
            vm.birdthday[0].day      = []
            vm.birdthday[0].daytxt   = 1
            vm.initDateDay(vm.birdthday[0].monthtxt - 1)
        }
        ,
        selectDay: function () {
            vm.birdthday[0].daytxt = $(this).text()
        }
        ,
        clearFile: function () {
            vm.filepath = ""
            vm.isupload = false
        }
        ,
        clearZhengshu: function () {
            vm.imglist = []
            vm.zhengshu_arr = []
            vm.filepath_zhengshu = ""
            vm.isupload_zhengshu = false
        }

        ,
        changeStatus: function () {
            vm.status = vm.status == 1 ? 0 : 1
        }
       
        ,
        upload: function (obj) {
            $("#upload input[type='file']").click()
            $('#upload').fileupload({
                always: function (e, data) {
                    if (obj == 1) {
                        vm.filepath = data.result
                        vm.isupload = true 
                    }else if (obj == 2) {
                        vm.zhengshu_arr.push(data.result)
                        vm.filepath_zhengshu = vm.zhengshu_arr.join("|")
                        vm.imglist .push( "<div class=\"fileinput-new thumbnail imglistwapper zhengshu fl\"><img ondblclick='delimg(this)' src='"+data.result+"' /></div>")
                        vm.isupload_zhengshu = true 
                    }
                    
                }
            })
           
        }


    })

    vm.init()

    delimg = function (obj){
        var _this = $(obj)
        var _p = _this.parent().parent()
        var _src = _this.attr("src")
        _p.fadeOut('slow',function(){
            _p.remove()
            var _img_index , _zhengshu_index
            $.each(vm.imglist,function(index, el) {
                if (el.indexOf(_src) > 0 ) {
                    _img_index = index
                }
            });
            $.each(vm.zhengshu_arr,function(index, el) {
                if (el == _src ) {
                    _zhengshu_index = index
                }
            });
            //splice 方法移除array的值 
            //第一参数和第二参数相同 移除当前下标的元素
            //当下标为0时 第二参数需要设置为1 意思是从0开始移除一个元素
            vm.imglist.splice(_img_index,_img_index == 0 ? 1 : _img_index)
            vm.zhengshu_arr.splice(_zhengshu_index,_zhengshu_index == 0 ? 1 : _zhengshu_index)
            vm.filepath_zhengshu = vm.zhengshu_arr.join("|")

        });
        
    }

   
})