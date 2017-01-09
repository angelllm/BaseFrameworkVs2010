<template>
    <article-list :list="list" :is-loading="true"></article-list>
</template>


<script>
import Vue              from 'vue' 
import configs          from 'assets/common'  
import moment           from 'moment' 
import ArticleList      from 'components/include/Article'
import Func             from 'assets/Func' 
//import axios            from 'axios'    
 
export default {
  props:["base"],
  data: function() {
    return { 
      dataUrl:configs.webPath,
      list:[],
      topList:[],
      params1:{method:"getArticleLists",pagesize:100,pageindex:1,w:''},
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

      /*
      //axios get
      axios({
          url:_this.dataUrl,
          method: 'GET', 
          params:_this.params1 
      })
      .then(function (response) {
          console.log(response.data) 
          response.data.forEach(function(item){
              item.article_time  = moment(item.article_time).format('YYYY-MM-DD h:mm:ss')
              item.article_image = configs.imageURl + item.article_image
          }) 
          _this.list = response.data
      })
      .catch(function (error) { 
          console.log(error)
      }) */ 
      
      var _sourcetitle = document.title
      document.title =  _this.base.page_title || _sourcetitle
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