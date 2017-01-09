<template>
     <div :class="{posts:true ,fadeInDown:true , animated:true,show:isShow }">
        <article class="post ">
            <div class="box-wrap aligncenter">
               <br v-for="i in 4">
               <h1>404</h1>
               <h6>page not found</h6>   
               <br>
               <router-link to="/">Home</router-link>
               &nbsp;&nbsp;
               <router-link to="/about">About</router-link>
               &nbsp;&nbsp;
               <a href="http://www.llmztt.com/vue2/#/" target="_blank">Vers.Vue2</a>
               &nbsp;&nbsp;
               <a href="http://www.llmztt.com/angular2/#/" target="_blank">Vers.Angular2</a>
               &nbsp;&nbsp;
               <a href="http://www.llmztt.com/react2/#/" target="_blank">Vers.React2</a>
               <br v-for="i in 25">
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
      document.title = "404 -" + _this.base.page_title
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