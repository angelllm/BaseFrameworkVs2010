<template>
  <div class="box">
      <!--header-->
      <web-header />
      <!--banner-->
      <web-banner />
      <!--container-->
      <web-container :type-list="typeList" :base="base" /> 
      <!-- footer -->
      <web-footer :type-list="typeList" />
  </div>
</template>

<script>
import Vue          from 'vue' 
import WebHeader    from 'components/include/Header' 
import WebBanner    from 'components/include/Banner'
import WebContainer from 'components/Container' 
import WebFooter    from 'components/include/Footer' 
import configs      from 'assets/common' 
import Func         from 'assets/Func' 
 

export default {
  
  data: function() {
    return { 
       dataUrl : configs.webPath,
       typeList:[],
       base:{},
       params1:{method:"typeLists"},
       params2:{method:"getBase"},
    }
  },
  mounted: function() {
    var _this = this
    Func.getViewWebData(this.dataUrl,this.params1).then(function(data){
        _this.typeList = data
    })
    Func.getViewWebData(this.dataUrl,this.params2).then(function(data){
        _this.base = data
        var _sourcetitle = document.title
        document.title = data.page_title || _sourcetitle
        document.getElementsByTagName('meta')[1].content = data.page_keywords
        document.getElementsByTagName('meta')[2].content = data.page_description
    })

  },
  computed: function() {
      
  },
  methods:{
    
  },
  components: { WebHeader,WebBanner,WebFooter,WebContainer}
}  
</script>

<style>

</style>
