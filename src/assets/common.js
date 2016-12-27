import configs  from '../../config/dev.env' 
import Vue      from 'vue'
import $        from 'assets/plug/jquery-1.9.1.min'

var vm = new Vue({
	el: '#app',
	data: {
		path: getPath()
	},
	created:function(){
		this.$nextTick(function(){
			this.scrollPostion()
		}) 
	} 
	,
	methods:{
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

                if (_cs_widget_comment_top + _cs_widget_comment_height + 200 < $(window).scrollTop()) {
                    $(".widget_tag_cloud").css({
                        'position':'fixed',
                        'top':'55px',
                        'z-index':'9999',
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
	}
})

 
function getPath(){
	return configs.NODE_ENV === '"development"' ? "" : "/Template/land-with-vue3/src"
}

module.exports = {
	path: getPath(),
    /*webPath:"http://www.llmztt.com/Api/Result",
    webPost:"http://www.llmztt.com/Api/Post",*/
    webPath:"http://localhost:9999/Api/Result",
    webPost:"http://localhost:9999/Api/Post",
    imageURl:"http://www.llmztt.com"
}