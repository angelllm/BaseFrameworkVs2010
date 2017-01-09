<template>
    <aside class="widget widget_blogstat">
        <h3 class="widget-title">
        <span>博客统计</span></h3> 
        <div v-if="!wb.article_count" class="aligncenter"><img src="/assets/images/loading-dian.gif" alt=""></div> 
        <ul v-if="wb.article_count">
            <li>日志总数：{{wb.article_count}} 篇</li>
            <li>评论数目：{{wb.commite_count}} 条</li>
            <li>建站日期：{{wb.web_time}}</li>
            <li>运行天数：{{wb.web_daycount}} 天</li>
            <li>标签总数：{{wb.tag_count}} 个</li>
            <li>最后更新：{{wb.last_updatetime}}</li>
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
       params:{method:"getBlogstat"},
       wb:{}
    }
  },
  mounted: function() {
    var _this = this
    Func.getViewWebData(this.dataUrl,this.params).then(function(data){
        _this.wb = data
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