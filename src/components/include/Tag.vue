<template>
	<aside  class="widget widget_tag_cloud">
        <h3 class="widget-title"><span>标签</span></h3>
        <div v-if="tagList.length == 0" class="aligncenter"><img src="/assets/images/loading-dian.gif" alt=""></div>
        <div class="tagcloud" >
            <router-link v-for="tag in tagList" class="pjax" :to="'/tag/'+tag.tag_name+'/'" :title='tag.tag_name' style='font-size: 13px;'>{{tag.tag_name}}</router-link>
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
       params:{method:"getTaglist"},
       tagList:[]
    }
  },
  mounted: function() {
      var _this = this
      Func.getViewWebData(this.dataUrl,this.params).then(function(data){
          _this.tagList = data
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