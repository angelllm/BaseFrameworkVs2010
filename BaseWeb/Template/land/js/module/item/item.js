define(function (require, exports, module) {

    require("vendor/plug/jquery.form")
    require("/Content/js/ueditor/third-party/SyntaxHighlighter/shCore")
    
    var vm = avalon.define({
        $id: 'item',
        init: function () {

            SyntaxHighlighter.all()
            
            var options = {
                success: function (data) {
                    $("#loading-submit").fadeOut()
                    $(".commit-info").show()
                    setTimeout(function(){
                    	$(".commit-info").fadeOut()
                    },3000)
                }
                ,
                beforeSubmit:function(){
                	$("#loading-submit").show()
                }
                ,
                clearForm:true
            }

            // ajaxForm
            $("#commentform").ajaxForm(options) 

            // ajaxSubmit
            $("#submit").on("click",function () {
            	var _comment = $("#comment")
            	var _commite_uname = $("#commite_uname")
            	var _commite_email = $("#commite_email")
            	var _flag = true
            	if ($.trim(_comment.val())=="") {
            		_flag = false
            		_comment.next().show()
            		setTimeout(function(){
            			_comment.next().hide()
            		},2000)
            	}
            	if ($.trim(_commite_uname.val())=="") {
            		_flag = false
            		_commite_uname.next().show()
            		setTimeout(function(){
            			_commite_uname.next().hide()
            		},2000)
            	}
            	if ($.trim(_commite_email.val())=="") {
            		_flag = false
            		_commite_email.next().show()
            		setTimeout(function(){
            			_commite_email.next().hide()
            		},2000)
            	}
            	if (_flag ) {
                	$("#commentform").ajaxSubmit(options) 
            	}


            })

            
            
         
        }
        
        


    })

    vm.init()


})