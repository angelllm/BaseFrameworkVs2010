
$(function () {


    $("#lblUrlTitle").text("会员管理");
    $("#btnAdd,#newcenter").button()
    var _prev_win = $(window.parent.document);
    _prev_win.find(".table-mm-content").css({ "overflow-y": "hide" });
    _prev_win.find(".iframe").height("100%");

    function getTime (day){
        re = /(\d{4})(?:-(\d{1,2})(?:-(\d{1,2}))?)?(?:\s+(\d{1,2}):(\d{1,2}):(\d{1,2}))?/.exec(day);
        return new Date(re[1],(re[2]||1)-1,re[3]||1,re[4]||0,re[5]||0,re[6]||0);
    }
    function   formatDate(_now)   {     
        var  now = new Date(_now)
        var   year=now.getYear();     
        var   month=now.getMonth()+1;     
        var   date=now.getDate();     
        var   hour=now.getHours();     
        var   minute=now.getMinutes();     
        var   second=now.getSeconds();     
        return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;     
    }     
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
   
    $(".tbl tbody tr").each(function(index,item){
        var _this = $(item)
        var _td = _this.find("td")
        var _id = _this.attr("data")
        $.ajax({
                type: "POST",
                url: "/Admin/MemberCard/",
                //async: false,
                data: {
                    id: _id
                },
                beforeSend: function () {

                },
                success: function (data) {
                     
                     _td.eq(2).text(data.card_name)
                     _td.eq(3).text("￥" + data.card_price)
                     _td.eq(4).text(data.card_total_count)
                     _td.eq(5).text(data.card_total_count - data.card_ative_count)
                     _td.eq(7).text(data.card_count )
                     //Date(1418632495523)/此格式的时间单位转换成常规时间单位
                     var _datestr = data.card_start_time.replace("/Date(","").replace(")/","") +"+0800"
                     var date=new Date(parseFloat(_datestr))
                     _td.eq(8).text(date.format("yyyy-MM-dd hh:mm:ss"))
                     //end
                     _td.eq(9).text(data.card_end_time == null ? "无期限" : function(){
                        var _endstr = data.card_end_time.replace("/Date(","").replace(")/","") +"+0800"
                        var _date=new Date(parseFloat(_endstr))
                        return _date.format("yyyy-MM-dd hh:mm:ss")
                     })
                },
                error: function () {
                    alert('error');
                }
            })

    });

    $(".control-del").click(function () {

        var $this = $(this);
        artDialog.confirm("确认删除么?", function () {

            $.ajax({
                type: "POST",
                url: "/Admin/MemberDel/",
                async: false,
                data: {
                    id: $this.attr("data")
                },
                beforeSend: function () {

                },
                success: function (data) {
                    if (data=="ok") {
                        $this.parent().parent().parent().parent().slideUp("500");
                    }else{
                        art.dialog({
                            title: '操作提示',
                            id: "o_tip",
                            icon: 'succeed',
                            content: data,
                            resize: false,
                            time: 3,
                            lock: true
                        });
                    }
                    
                },
                error: function () {
                    alert('error');
                }
            })

        });
    });

     $(".switch input[type=checkbox]").change(function () {

        var $this = $(this);
       
        $.ajax({
            type: "POST",
            url: "/Admin/MemberStatus/",
            async: false,
            data: {
                id: $this.attr("data"), 
            },
            beforeSend: function () {

            },
            success: function (data) {

                ok();
            },
            error: function () {
                alert('error');
            }
        })

    });


  
});

function ok() {

    art.dialog({
        title: '操作提示',
        id: "win_tip",
        icon: 'succeed',
        content: "操作成功!",
        resize: false,
        time: 1,
        lock: true

    });

};
          

        

           

               



         