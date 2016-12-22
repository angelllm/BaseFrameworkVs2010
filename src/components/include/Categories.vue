<template>
	<aside class="widget widget_categories">
        <h3 class="widget-title"><span>分类目录</span></h3>		
        <div v-if="typeList.length == 0" class="aligncenter"><img src="/assets/images/loading-dian.gif" alt=""></div>
        <ul>
            <li v-for="type in typeList" class="cat-item"><router-link :to="'/category/'+type.type_name+'/'" >{{type.type_name}}</router-link> ({{type.article_count}})</li>
        </ul>
        <div class="clearfix"></div>
    </aside>
</template>

<script>
import Vue from "vue"

export default {
  props: ["typeList"], 
  data () {
    return {
       
    }
  },
  mounted: function() {
    
  },
  created: function() {
      
  },
  methods:{
  
  } 

}
</script>
 
<style scoped>
 
</style>