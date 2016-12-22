<template>
	<aside class="widget cs_widget_comment">
        <h3 class="widget-title"><span>最新评论</span></h3>
        <div v-if="commiteList.length == 0" class="aligncenter"><img src="/assets/images/loading-dian.gif" alt=""></div>
        <div class="textwidget" id="comment-list">
            <ul>
                <li v-for="c in commiteList">
                    <img src="/assets/images/User-5S.png" class="avatar" height="64" width="64"> 
                    <p class="s_r">
                        <a class="pjax simptip-smooth simptip-movable simptip-position-top" :href="'/view/'+c.commite_article_id+'/'" :data-tooltip="c.commite_uname + ':' + c.commite_content">
                            <span class="s_name">{{c.commite_uname}}:</span>
                            <span class="s_desc">{{c.commite_content}}</span>
                        </a>
                    </p>
                </li>
            </ul>
        </div>
        <div class="clearfix"></div>
    </aside>  
</template>


<script>
import Vue      from "vue" 
import configs  from 'assets/common' 
import Func     from 'assets/Func' 

export default {
  data () {
    return {
       dataUrl : configs.webPath,
       params:{method:"getCommitelist"},
       commiteList:[] 
    }
  },
  mounted: function() {
      var _this = this
      Func.getViewWebData(this.dataUrl,this.params).then(function(data){
          _this.commiteList = data
      }) 
  },
  created: function() {
      
  },
  methods:{
    
  } 

}
</script>
 
<style scoped>
 
</style>