<template>
  <div class="box">
    <div class="foot_btn">
      <ul>
        <li class="mate-gotop">
          <a href="javascript:;" @click="gototop" class="scrolltotop" title="回到顶部"><i class="fa fa-chevron-up"></i></a>
        </li> 
        <li class="mate-qrcode">
          <a style="" title="二维码" href="javascript:void(0)" id="r-wx">
          <i class="fa fa-qrcode"></i>
            <div id="fi-wx-show" style="display: none;">
              <img src="#">
            </div>
          </a>
        </li>
      </ul>
    </div>
      
    <footer id="footer">
        <section id="drawer">
          <div id="drawer-inside" class="container clearfix columns3">

            <div id="meta-2" class="widget widget_meta">
              <h2 class="widgettitle">近期文章</h2>
              <ul>
                  <li v-for="art in nearList">
                      <router-link :to="'/view/'+art.article_id+'/'" :style="{color:art.article_title_color}">{{art.article_title}}</router-link>
                  </li> 
              </ul>
            </div>

            <div id="recent-posts-2" class="widget widget_recent_entries">
              <h2 class="widgettitle">
                分类目录
              </h2>
              <ul>
                  <div style="width:130px;float:left;">
                      <li v-if="index < 7" v-for="(type ,index ) in typeList" class="cat-item"><router-link :to="'/category/'+type.type_name+'/'">{{type.type_name}} </router-link> ({{type.article_count}})</li>
                  </div>
                  <div style="width:130px;float:left;">
                      <li v-if="index >= 7" v-for="(type ,index ) in typeList" class="cat-item"><router-link :to="'/category/'+type.type_name+'/'">{{type.type_name}} </router-link> ({{type.article_count}})</li>
                  </div>
              </ul> 
            </div>

            <div id="categories-4" class="widget widget_categories" style="width:120px;">
              <h2 class="widgettitle">功能</h2>
              <ul>
                <li>
                  <a href="javascript:;" on-click="loginshow" data-bind="0">登录</a>
                </li>
                <li>
                  <router-link to="/list/">文章</router-link>
                </li>
                <li>
                  <router-link to="/about/">关于</router-link>
                </li> 
              </ul> 
            </div>

            <div id="categories-5" class="widget widget_categories" style="width:150px;">
              <h2 class="widgettitle">友情链接</h2>
              <ul>
                  <li v-for="link in linkList">
                      <a :href="link.page_url" target="_blank">{{link.page_name}}</a>
                  </li> 
              </ul>
            </div>

          </div>
        </section>
        <div id="copyright">
          <div class="copyright">
            <p>2016 All Rights Reserved. Power by llm &nbsp;<a href="http://zhw-island.com/" target="_blank"> Theme by Island</a></p>
          </div>
        </div>
    </footer>
  </div>
</template>


<script>
import Vue      from "vue" 
import configs  from 'assets/common' 
import Func     from 'assets/Func' 

export default {
  props:["typeList"],
  data () {
    return {
       dataUrl : configs.webPath,
       params1:{method:"getNearlist"},
       params2:{method:"getLinklist"},
       nearList:[],
       linkList:[]
    }
  },
  mounted: function() {
      var _this = this
      Func.getViewWebData(this.dataUrl,this.params1).then(function(data){
          _this.nearList = data
      }) 
      Func.getViewWebData(this.dataUrl,this.params2).then(function(data){
          _this.linkList = data
      }) 
  },
  created: function() {
      
  },
  methods:{
    
    gototop:function(){
        $("body,html").animate({scrollTop:0}, 200)
    }
    
  } 
      
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
