<template>
     <div :class="{posts:true ,fadeInDown:true , animated:true,show:isShow }">
        <article class="post ">
                <div class="box-wrap">
                  <div class="box">
                       <div class="slider slider-music">
                          <div id="dj">
                            <div class="needle" id="needle1"></div>
                            <div class="vinyl" id="vinyl1"></div>
                          </div>
                          <p>没有音乐哦！</p>
                      </div>
                      <br>
                      <div class="post-copyright post-copyright-title ">
                       暂无内容，敬请期待！
                      </div>
                      <br>
                   
                  </div>
                      
                  <div class="clearfix"></div>
                </div>
        </article>     
     </div>
</template>


<script>
import Vue              from 'vue' 
import configs          from 'assets/common'   
 
export default {
  props:["base"],  
  data: function() {
    return { 
       isShow : false
    }
  },
  mounted: function() {
      var _this = this
      setTimeout(function(){
        _this.isShow = true
      },1000)
      document.title = "音乐-" + _this.base.page_title
  },
  created: function() {
      
  },
  methods:{
      
  } 
  ,
  components:{
     
  }

}
</script> 

<style>
@import '/assets/themes/music.css';
.show{display: block!important;}
</style> 