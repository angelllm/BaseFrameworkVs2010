<template>
    <div class="box">
        <article-list :list="topList" :is-loading="true"></article-list>
        <article-list :list="list" :is-loading="false"></article-list>
    </div>
</template>


<script>
import Vue              from 'vue' 
import configs          from 'assets/common'  
import moment           from 'moment' 
import ArticleList      from 'components/include/Article'
import Func             from 'assets/Func' 
 
export default {
  props:["base"],
  data: function() {
    return { 
      dataUrl:configs.webPath,
      list:[],
      topList:[],
      params1:{method:"getArticleList",pagesize:100,pageindex:1,w:''},
      params2:{method:"getTopArticleList",pagesize:100,pageindex:1,w:''}  
    }
  },
  mounted: function() {
      var _this = this
      Func.getViewWebData(this.dataUrl,this.params1).then(function(data){
          data.forEach(function(item){
              item.article_time  = moment(item.article_time).format('YYYY-MM-DD h:mm:ss')
              item.article_image = configs.imageURl + item.article_image
          }) 
          _this.list = data
      })
      Func.getViewWebData(this.dataUrl,this.params2).then(function(data){
          data.forEach(function(item){
              item.article_time  = moment(item.article_time).format('YYYY-MM-DD h:mm:ss')
              item.article_image = configs.imageURl + item.article_image
          }) 
          _this.topList = data
      })
      document.title =  _this.base.page_title
  },
  created: function() {
      
  },
  methods:{
      
  } ,
  components:{
    ArticleList
  }

}
</script> 
 
<style>
 
</style> 