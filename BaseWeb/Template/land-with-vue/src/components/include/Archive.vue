<template>
	<aside class="widget widget_archive">
      <h3 class="widget-title"><span>文章归档</span></h3>  
      <div v-if="archivesList.length == 0" class="aligncenter"><img src="/assets/images/loading-dian.gif" alt=""></div>
      <ul> 
        <li v-for="arc in archivesList"><router-link :to="'/archive/'+arc.year+'-'+arc.month+'-0/'">{{arc.year}}年{{arc.month}}月</router-link>&nbsp;({{arc.count}})</li>
      </ul>
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
       params:{method:"getArchive"},
       archivesList:[]
    }
  },
  mounted: function() {
    var _this = this
    Func.getViewWebData(this.dataUrl,this.params).then(function(data){
        _this.archivesList = data
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