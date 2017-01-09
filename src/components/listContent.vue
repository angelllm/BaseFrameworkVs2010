<template>
    <article-list :list="list" :is-loading="true"></article-list>
</template>


<script>
import Vue              from 'vue' 
import configs          from 'assets/common'  
import moment           from 'moment' 
import ArticleList      from 'components/include/Article'
import Func             from 'assets/Func' 
 
export default {
  props:["base"],
  watch: {
    '$route' (to, from) { 
      this.list       = []
      this.setParams(to.params)
      this.getList()
    }
  }, 
  data: function() {
    return { 
      list:[],
      dataUrl:configs.webPath,
      params:{method:"getArticleLists",pagesize:100,pageindex:1,q:'',tag:''} 
    }
  },
  mounted: function() {
      this.setParams()
      this.getList(this.getParams())
     
      //console.log(this.getParams())
  },
  created: function() {
      
  },
  methods:{
     getList:function(){
        var _this = this
        Func.getViewWebData(this.dataUrl,this.params).then(function(data){
            data.forEach(function(item){
                item.article_time  = moment(item.article_time).format('YYYY-MM-DD h:mm:ss')
                item.article_image = configs.imageURl + item.article_image
                /*var _type = item.article_shut_title
                var _typehtml = []
                if (_type) {
                    $.each(_type.split(","),function(idx,it){
                        var _typeitem = it.split("|")
                        _typehtml.push("<span class=\"label label-default\"><i class=\"fa fa-tag\"></i> "+_typeitem[1]+"</span>")
                    })
                    item.article_type_name = _typehtml.join(" ")
                }*/
            }) 
            _this.list = data
            document.title = (_this.params.q == "" ? "文章列表" : (_this.params.q == "C" ? "C#" : _this.params.q) ) + "-" + _this.base.page_title
        })
     } ,
     
     getParams:function(){
        //console.log(this.$route.params)
        return this.$route.params//.tagName || this.$route.params.name || this.$route.params.archive 
     } ,
     setParams:function(p){
        var _pramas = p || this.getParams() 
        this.params.tag = ""
        this.params.q   = ""
        for (var key in _pramas) {
            this.params.tag = key
            this.params.q   = _pramas[key]
        }
        //console.log(this.params)
     } 
     ,
     nextPage:function(){

     } 
  } 
  ,
  components:{
    ArticleList
  }

}
</script> 

<style>

</style> 