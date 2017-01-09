define(function (require) {
    var TIMEOUT = $.noop()
    require("jq")
    
    var vm = avalon.define({
        $id: 'love',
        isInitMap:false,
        isinitVideo:false,
        mergeImgList:[],
        config: {
            
                timeout:
                {
                    startToHomeDelayTime:2000,
                    smipDefTime: 1000,
                    animateTagTime: 2000,
                    PhotoListTime:5000,
                    Step2Time:4000
                }
                , 
                location : 
                {
                  
                    china : 
                    {
                        lat : 37.550339,
                        lng : 104.114129
                    }
                    ,
                    home : 
                    {
                        lat : 31.565703,
                        lng : 120.710925
                    }
                    ,
                    wife : 
                    {
                        lat : 31.561776,
                        lng : 120.693107
                    }

                }
             
                ,
                 
                zoom:
                {
                    startZoom:5,
                    maxZoom:19,
                    minZoom:8,
                    defZoom:12,
                    bigZoom:15,
                    normalZoom:10
                }
                
                ,
                imgSet:[{
                    width:600,
                    heihgt:500
                }]

        },
        txt: '',
        replaceAll:function(str){
            return str.replace(/[~'!<>@#$%^&*()-+=/.:]/g, "_")
        }
        ,
        init: function () {
            vm.loading()
            var _imglist = require("vendor/loading/imglist.js")
            vm.preLoadImages(_imglist,vm.start())
           
        }
        ,
        loading:function(){

            require("full")
            require("textillate")
            require("lettering")
            require("animate")
            require("spark")
            require("mode")
            require("notify")
            require("classie")
            require("ns-css")
        }
        ,
        reset: function () {
            clearTimeout(TIMEOUT)
            map.closeInfoWindow()
            map.clearOverlays()
            map.reset();
        }
        ,
        start:function() {
         
            $(function () {
         
                $("#loading").fadeOut(1000, function () {
                    $("#welcome").fadeIn(1000)
                })
            })

        }
        ,
        preLoadImages:function(imagesList, callback) {

            var images = []
            var callback = callback || function () { }
            var _i = 0
            var _append = ""
            $.each(imagesList,function(i,url){

                var _img = new Image()
                _img.src = url 
                //*****************************
                //图片自动获取高度宽度
                //知识点：
                //在此方法中
                //1.当each的时候执行_img.onload方法
                //  由于图片大小和网络影响在each到index = 5的时候
                //  也许还在onload index = 2时候的图片
                //  然而each才不叼你有么有onload完毕，先执行完each再说
                //  当每执行完一个onload的时候把当前图片push到数组中去的
                //  时候会发现，图片的顺序和imagesList中的顺序是不一样的
                //  原因上面说过了图片大小和顺序决定的，图片越大越是在后面
                //  因为他的onload耗时比较长 push的晚，所以舍弃push数组的方式
                //2.使用图片路径生成图片标签 嗯，怎么说呢，应该是说图片数据节点
                //  比如{'img-1':{width:600,heihgt:500}}
                //  生成的就是img-1这个节点名称
                //  '/images/init/3.jpg'生成后就是_images_init_3_jpg 主方法vm.replaceAll 
                //3.使用字符串生成json数据主方法 (new Function("","return "+_append))();
                //4.获取json节点然后和当前加载的图片列表做匹配，再push到新的数组中，这样图片就会顺序播放 主方法：for(var key in vm.mergeImgList[0]){} 
                //这样就能实现图片自动预加载然后获取宽度高度用于之后的自动匹配宽度和高度
                //这个实现自己能力有限搞了好久好久。。最终成功了，呼~~~~
                _img.onload = function(){ 

                    var _width = this.width
                    var _height = this.height
                    var _defWidth = vm.config.imgSet[0].width //预设值的宽度[600] max-width
                    var _defHeight = vm.config.imgSet[0].height //预设值的宽度[500] max-height
                    //重置图片大小 最大宽度600 小于600的按照原图比例显示
                    //
                    var _newHiehgt ,_newWidth
                    if (_width <= _defWidth) {
                        _newWidth = _width
                        _newHiehgt = _height
                    }else if (_width > _defWidth){
                       _newWidth = _defWidth
                       _newHiehgt = _defWidth * _height / _width
                    }
                    else if (_height > _defWidth){ 
                       _newHiehgt = _defHeight
                       _newWidth = _width * _defHeight / _height
                    }
                   
                    //添加图片初始化数据
                    //根据url找对应图片的width,height
                    url = vm.replaceAll(url)
                    //console.log(url)
                    if (_i == 0) {
                        _append+='{'
                    }
                    //串联当前图片对象的属性
                    _append += url+':'+'{'+'width:'+_newWidth+','+'height:'+_newHiehgt+''+'},' 

                    if (_i === imagesList.length - 1 ) {
                        _append = _append.substring(0,_append.lastIndexOf(','))+"}"
                        //转换为json对象
                        var _eval  =(new Function("","return "+_append))()
                        //console.log(_eval)
                        vm.mergeImgList.push(_eval)
                        callback()
                        //console.dir(vm.mergeImgList)
                        return false
                    }
                    _i++
                }

               

            })

          
        } 
        ,
        videolist: [
            { name: "\u5982\u679c\u6709\u6765\u751f", src: '/file/ruguoyoulaisheng.mp3' },
            { name: "\u6211\u4eec\u597d\u50cf\u5728\u54ea\u89c1\u8fc7", src: '/file/womenhaoxiangzainajianguo.mp3' },
            { name: "\u77dc\u6301", src: '/file/jinchi.mp3' },
            { name: "Valder Fields", src: '/file/ValderFields.mp3' },
            { name: "\u6cb9\u753b\u91cc\u7684\u60c5\u4eba\u8282", src: '/file/youhualideqingrenjie.mp3' }
        ]
        ,
        play: function (i) {
            //是否已经播放完毕
            //$("#video-box video").get(0).ended 
            $("#video-box video").attr("src", vm.videolist[i].src)
                                 .attr("title", vm.videolist[i].name)
                                 .get(0).play()
        
        }
        ,
        notify: function (content,fun) {
            /*notify*/
            var notification = new NotificationFx({
                message:content ,
                layout: 'growl',
                effect: 'scale',
                type: 'error',
                onClose: fun 
            });
            notification.show();
        }
        ,
        showmap: function (i) {
            return false
            if (!vm.isInitMap) {
                vm.initMap()
                vm.isInitMap = true
            }
           
            vm.showMusicNav()
            //$(".dangao").hide()
            $("#music-list li").removeClass("cur")
            $(this).addClass("cur")
            if (i == 0) {
                window.location.href="love.html"
            }
            else if (i == 1) {
                //$("#map").fadeIn(1000)
                vm.step()
                vm.play(1) 
            }
            else if (i == 2) {
                //$("#map").fadeIn(1000)
                vm.step2()
                vm.play(2)
            }
            else if (i == 3) {
                //$("#map").fadeIn(1000)
                vm.step3()
                vm.play(3)
            }
            else if (i == 4) {
                vm.step4()
                vm.play(4)
            }
        }
        ,
        pass: function (e) {
            if (e.keyCode == 13) {
                
                var _password = "\u0030"
                if ($(this).val() == _password) {
                     //screenfull && screenfull.request()
                     vm.step()
                     $("#welcome").hide()
                     return
                    vm.play(1)//开幕曲
                    $("#music-list").fadeIn(1000)
                    screenfull && screenfull.request()
                    $("#todoapp").fadeOut(1000, function () {
                        $(".self").fadeIn(1000, function () {
                            
                            $(".self").sparkleh({
                                color: "rainbow",
                                count: 200,
                                overlap: 10
                            })
                            
                            $('#zimu').fadeIn(500)
                            //rollIn flipInX bounceInDown
                            $('#zimu .one').textillate({ in: { effect: 'flipInX', speed: 500 } });
                           
                            TIMEOUT = setTimeout(function () {
                                $('.self').fadeOut(3000, function () {
                                    $('.self2').fadeIn(2000, function () {
                                        $(".self canvas").appendTo($("#welcome"))
                                        TIMEOUT = setTimeout(function () { 
                                            $("#music-list").find("li:eq(0)").hide().end().fadeIn(3000, function () {
                                                vm.step()
                                                //vm.initMap()
                                                //vm.step4()
                                            })

                                        }, 8000)
                                    })
                                })
                            }, 10000)
                           
                        })
                    }) 

                } else {
                    vm.notify('<p>\u554a\u54e6\uff0c\u597d\u50cf\u54ea\u91cc\u4e0d\u5bf9\u54e6</p>', function () { })
                }
            }
        }
        ,
        initMap:function() {
            //$("animate,#map").stop()
            map = new BMap.Map("map");
            map.setMapType(BMAP_HYBRID_MAP); //卫星图
            //map.setMapType(BMAP_NORMAL_MAP);//普通图
            var _home = vm.config.location.home
            map.centerAndZoom(new BMap.Point(_home.lng, _home.lat), vm.config.zoom.startZoom);
            map.clearOverlays();
            map.reset();
        }
        ,
       
        zoomTo:function(zoom, time, callback, point) {

            var time     = time || 1000;
            var callback = callback || function() {};
            var loop     = '';
            function loopZoom() {
                var curZoom  = map.getZoom();
                if( curZoom == zoom ) {
                    clearTimeout(loop);
                    callback();
                    return false;
                }
                var plus    = curZoom > zoom ? -1 : 1;
                var toZoom  = curZoom + plus;
                map.setZoom(toZoom);
                if( point ) {
                    map.setCenter(point);
                }
                var center = map.getCenter();
                TIMEOUT = setTimeout(loopZoom, time);
            }
            loopZoom();
        }
        ,
        loopWin: function (loopList, time, callback) {
            var i = 0;
            var len = loopList.length;
            var callback = callback || function () { };
            var timeout = '';

            function loopWinInner() {
                if (i == len) {
                    clearTimeout(timeout);
                    TIMEOUT = setTimeout(callback, 1000);
                    return false;
                }

                var opts = {
                    title: loopList[i].title,
                    maxWidth: 1920,
                    height: 0
                }
                var infoWindow = new BMap.InfoWindow(loopList[i].content, opts);
                map.openInfoWindow(infoWindow, new BMap.Point(loopList[i].point.lng, loopList[i].point.lat));
                infoWindow.redraw();
                i++;
                if (loopList[i]) {
                   
                } else {
                    //time = vm.config.timeout.smipDefTime;
                }
                TIMEOUT = setTimeout(loopWinInner, time);
            }

            loopWinInner();
        }
      
        ,
        setAnimation:function(tag){
            var marker = new BMap.Marker(tag);
            map.addOverlay(marker);
            marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        }
        ,
        panAndSetC:function(_point){
             map.panTo(new BMap.Point(_point.lng, _point.lat));
             map.setCenter(new BMap.Point(_point.lng, _point.lat));
        }
        ,
        loopInfo:function(options,callback){
                //imgListJsUrl,points,title,zoom,callback
                options = options[0]
                var _loopjson = options.imgListJsUrl
                var _point =  options.points
                var _title = options.title
                var _url = options.url
                var _isSetAnimate = options.isSetAnimate
                var _isStartPan = options.isStartPan //是否一开始聚焦
                var _isClearWIN = options.isClearWIN //是否清除显示的图片
                var _isClearLayer = options.isClearLayer //是否清除标注
                var _isShowOne = options.isShowOne //是否清除标注
                //return
                if (_isStartPan) {
                    map.panTo(new BMap.Point(_point.lng, _point.lat));
                    map.setCenter(new BMap.Point(_point.lng, _point.lat));
                }
                vm.zoomTo(options.zoom, vm.config.timeout.smipDefTime, function () {
                        if (!_isStartPan) {
                            map.panTo(new BMap.Point(_point.lng, _point.lat));
                            map.setCenter(new BMap.Point(_point.lng, _point.lat));
                        }
                        if (_isSetAnimate) {
                            vm.setAnimation(_point)//设置标志
                        }
                        if (_isClearWIN) {
                            map.closeInfoWindow()
                        }
                        if (_isClearLayer) {
                            map.clearOverlays()
                        }
                        TIMEOUT = setTimeout(function () {
                            //var _homelist = require("vendor/loading/home.js")
                            var between = [] 
                            $.each(_loopjson,function(i,url){

                                 var _tag = vm.replaceAll(url) //生成数组标签用于取值
                                 var _mergeImgList = vm.mergeImgList[0]
                                 //mergeImgList:初始化的所有图片资源集合
                                 //已图片地址/和.替换成_所组成的tag配置结合
                                 //格式：
                                 //'_images_init_home_jpg':{'width':"600",'heihgt':"360"}
                                 for(var key in _mergeImgList){ 
                                    if (key == _tag) {
                                        //初始化计算完成的图片的宽度和高度
                                        var _width =  _mergeImgList[_tag].width
                                        var _height = _mergeImgList[_tag].height
                                        //需要显示的图片
                                        var _newimg = "<img src='" + url + "' width = '" + _width + " ' height='" + _height + "' />"
                                        between.push (
                                            {
                                                title:_title.length <= 1  ? _title[0]: _title[_i],
                                                content:  _newimg,
                                                url:url,
                                                point:_point
                                            }
                                        ) 
                                        break
                                    } 
                                    
                                 }

                                /*if (_isShowOne) {
                                    return 
                                }*/

                            })

                            vm.loopWin(between, vm.config.timeout.PhotoListTime, function () {
                                callback()
                                //vm.mergeImgList = []//清空数据等待下次使用
                                //marker.remove()
                                //TIMEOUT = setTimeout(move2, 1000)
                                //move2()
                            });  
                       
                        
                        }, 1000) 
                    
                },_point);


        }
        ,
        zoomToAndInitImg:function(options,callback){
                //imgListJsUrl,points,title,zoom,callback
                options = options[0]
                var _loopjson = options.imgListJsUrl
                var _point =  options.points
                var _title = options.title
                var _url = options.url
                var _isSetAnimate = options.isSetAnimate
                var _isStartPan = options.isStartPan //是否一开始聚焦
                var _isClearWIN = options.isClearWIN //是否清除显示的图片
                var _isClearLayer = options.isClearLayer //是否清除标注
                var between = [] 
                if (_isStartPan) {
                    map.panTo(new BMap.Point(_point.lng, _point.lat));
                    map.setCenter(new BMap.Point(_point.lng, _point.lat));
                }
                vm.zoomTo(options.zoom, vm.config.timeout.smipDefTime, function () {
                        if (!_isStartPan) {
                            map.panTo(new BMap.Point(_point.lng, _point.lat));
                            map.setCenter(new BMap.Point(_point.lng, _point.lat));
                        }
                        if (_isSetAnimate) {
                            vm.setAnimation(_point)//设置标志
                        }
                        if (_isClearWIN) {
                            map.closeInfoWindow()
                        }
                        if (_isClearLayer) {
                            map.clearOverlays()
                        }
                      
                        
                        $.each(_loopjson,function(i,url){

                             var _tag = vm.replaceAll(url) //生成数组标签用于取值
                             var _mergeImgList = vm.mergeImgList[0]
                             //mergeImgList:初始化的所有图片资源集合
                             //已图片地址/和.替换成_所组成的tag配置结合
                             //格式：
                             //'_images_init_home_jpg':{'width':"600",'heihgt':"360"}
                             for(var key in _mergeImgList){ 
                                if (key == _tag) {
                                    //初始化计算完成的图片的宽度和高度
                                    var _width =  _mergeImgList[_tag].width
                                    var _height = _mergeImgList[_tag].height
                                    //需要显示的图片
                                    var _newimg = "<img src='" + url + "' width = '" + _width + " ' height='" + _height + "' />"
                                    between.push (
                                        {
                                            title:_title.length <= 1  ? _title[0]: _title[_i],
                                            content:  _newimg,
                                            url:url,
                                            point:_point
                                        }
                                    ) 
                                    break
                                } 
                                
                             }

                        })
                       
                        callback(between)
                  
                },_point);

        }
        ,
        rebuildImg:function(_loopjson,_title,_point){
            var between = []
            $.each(_loopjson,function(i,url){

                var _tag = vm.replaceAll(url) //生成数组标签用于取值
                var _mergeImgList = vm.mergeImgList[0]
                 //mergeImgList:初始化的所有图片资源集合
                 //已图片地址/和.替换成_所组成的tag配置结合
                 //格式：
                 //'_images_init_home_jpg':{'width':"600",'heihgt':"360"}
                for(var key in _mergeImgList){ 
                    if (key == _tag) {
                        //初始化计算完成的图片的宽度和高度
                        var _width =  _mergeImgList[_tag].width
                        var _height = _mergeImgList[_tag].height
                        //需要显示的图片
                        var _newimg = "<img src='" + url + "' width = '" + _width + " ' height='" + _height + "' />"
                        between.push (
                            {
                                title:_title.length <= 1  ? _title[0]: _title[_i],
                                content:  _newimg,
                                url:url,
                                point:_point
                            }
                        ) 
                        break
                    } 
                    
                }


            })
            return between
        }
        ,
        showImg:function(options,isSingle,callback){
            var _between = []
            _between = options
            if (isSingle) {
                _between = []
                _between.push(options[0])
            }
            vm.loopWin(_between, vm.config.timeout.PhotoListTime, function () {
                //console.log("callback")
                callback()
                //console.log("callback ---after")
            });  
        }
        ,
        addOverlay:function(pointA,pointB){

            var pointA = new BMap.Point(pointA.lng,pointA.lat); 
            var pointB = new BMap.Point(pointB.lng,pointB.lat); 
            var polyline = new BMap.Polyline([pointA,pointB], {strokeColor:"blue", strokeWeight:6, strokeOpacity:0.5});  //定义折线
            map.addOverlay(polyline);     //
            return map.getDistance(pointA,pointB).toFixed(2)
        }
        ,
        stopAny:function(){
            clearTimeout(TIMEOUT)
        }
        ,
        //第一个 
        step: function () {
           
            vm.initMap()  
            //延时加载第一步
            TIMEOUT =  setTimeout(moveHome,vm.config.timeout.startToHomeDelayTime)
            //我家
            function moveHome (){

               var _title = ['\u6211\u4eec\u7684\u5bb6\u002d\u957f\u745e\u65b0\u6751']
               var _list = require("vendor/loading/home-step.js")
               var _point = vm.config.location.home
               var _between = vm.rebuildImg(_list,_title,_point)
               vm.zoomTo(vm.config.zoom.maxZoom, vm.config.timeout.smipDefTime, function () {
                    vm.setAnimation(_point)
                    TIMEOUT = setTimeout(function(){
                        vm.loopWin(_between, vm.config.timeout.PhotoListTime, function () {
                            TIMEOUT = setTimeout(function(){
                                moveWife()
                            },vm.config.timeout.animateTagTime)
                        });  
                    },vm.config.timeout.animateTagTime)
                    

                },vm.config.location.home);
              
               
            }

            //媳妇家
            function moveWife(){
   
                map.closeInfoWindow()
                map.clearOverlays()
                var _title = ['\u6211\u4eec\u7684\u5bb6\u002d\u957f\u745e\u65b0\u6751']
                var _list = require("vendor/loading/wife-step.js")
                var _point = vm.config.location.wife
                var _between = vm.rebuildImg(_list,_title,_point)

                vm.zoomTo(vm.config.zoom.bigZoom, vm.config.timeout.smipDefTime, function () {
                    vm.panAndSetC(_point)
                    vm.zoomTo(vm.config.zoom.maxZoom, vm.config.timeout.smipDefTime, function () {
                         vm.setAnimation(_point)
                         TIMEOUT = setTimeout(function(){
                            vm.loopWin(_between, vm.config.timeout.PhotoListTime, function () {
                                lineTo()
                            });  
                         },vm.config.timeout.animateTagTime)

                    },_point);

                });
                /*vm.zoomTo(12, vm.config.timeout.smipDefTime, function () {
                    
                    map.closeInfoWindow()
                    map.clearOverlays()
                    var _option = [
                        {
                            imgListJsUrl: _list,
                            points:vm.config.location.wife,
                            title:_title,
                            zoom:19,
                            line:true,
                            isSetAnimate:true,
                            _isClearWIN:false,
                            _isClearLayer:false,
                            isStartPan:true
                        }
                    ]
                    vm.zoomToAndInitImg(_option,function(data){ 
                        vm.showImg(data,true,function(){
                           lineTo()
                        })
                    })
                   

                },vm.config.location.wife);*/


            }

            //我家和媳妇家连线
            function lineTo(){

                map.closeInfoWindow()
                map.clearOverlays()
                var _point = vm.config.location.home
                vm.zoomTo(vm.config.zoom.bigZoom + 1, vm.config.timeout.smipDefTime, function () {
                    
                    vm.panAndSetC(_point)
                    vm.setAnimation(_point)
                    var _point2 = vm.config.location.wife
                    TIMEOUT = setTimeout(function(){
                        vm.panAndSetC(_point2)
                        vm.setAnimation(_point2)
                       
                        TIMEOUT = setTimeout(function(){

                              var juli =  vm.addOverlay(_point,_point2)
                              //
                              TIMEOUT = setTimeout(
                                function(){
                                    var _title = ['\u6211\u4eec\u4e4b\u95f4\u7684\u8ddd\u79bb--> <span style="color:#c40000">'+ juli +'</span> \u7c73 \u5c0f\u7ea2\u53ea\u9700\u4e09\u5206\u949f']
                                    var _list = require("vendor/loading/wife-lianxian.js")
                                    var _between = vm.rebuildImg(_list,_title,_point2)
                                    vm.loopWin(_between, vm.config.timeout.PhotoListTime, function () {
                                        
                                    });  

                                },vm.config.timeout.animateTagTime)
                              //
                            
                        },vm.config.timeout.animateTagTime)


                    },vm.config.timeout.animateTagTime)
                    //
                });

            }


            function function_name(argument) {
                // body...
            }


        }


    })
    
    vm.init();

});