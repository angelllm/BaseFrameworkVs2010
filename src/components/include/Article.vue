<template>
    <div class="box">
        <center v-if="isLoading" id="center" :class="{mt50:true,hide:list.length > 0}">  
            <img src="/assets/images/loading-dian.gif" alt="loading" />
            <p>正在加载...</p>
        </center>
        <div :class="{ fadeInDown: true, animated: true , 'show': list.length > 0}" v-for="art in list">
            <article class="post type-post status-publish format-aside has-post-thumbnail sticky hentry post_format-post-format-aside">
                <div v-if="art.article_is_top == 1" class="simptip-smooth simptip-movable simptip-position-top post-sticky" data-tooltip="被置顶的文章"></div>
                <div class="box-wrap">
                    <div class="box">
                        <header>
                            <h2 class="entry-title">
                                <router-link :style="'color:'+art.article_title_color" :to="'/view/'+art.article_id+'/'" :data-tooltip="art.article_title" :css-color="art.article_title_color" class="simptip-smooth simptip-movable simptip-position-right">{{art.article_title}}</router-link>
                            </h2>
                        </header>       
                        <a class="featured-image pjax" :href="'/land/view/'+art.article_id+'/'" :title="art.article_title">
                            <img width="150" height="150"  :src="art.article_image==null?'/Template/wp/images/no-image.jpg':art.article_image" class="attachment-thumbnail size-thumbnail wp-post-image" />                 
                        </a>    
                        <div class="post-content">
                            <ul class="top_meta">
                                <li class="mate-cat"><i class="fa fa-folder-open-o"></i><a :href="'/list-0-'+art.article_type+'-0-0/'" rel="category tag">{{art.article_type_name}}</a></li>
                                <li class="mate-time"><i class="fa fa-clock-o"></i>发表于{{art.article_guid}}前 ({{art.article_time }})</li>
                                <li class="mate-view"><i class="fa fa-eye"></i>{{art.article_pv}}次浏览</li>
                                <li class="mate-com"><i class="fa fa-comments-o"></i><a class="pjax" :href="'/view/'+art.article_id+'/'" title="comments">{{art.commite_count}}条评论</a></li>                        
                                <li></li>                                   
                                <div class="clearfix"></div>
                            </ul>       
                            <div class="audio-wrapper content">
                              <div v-html="art.article_content"></div> 
                              <div class="read_more"><a :href="'/view/'+art.article_id+'/'">阅读更多</a></div>
                            </div>
                        </div>
                        <!-- post content -->   
                        <div class="clearfix"></div>
                       
                        <div class="audio-wrapper">
                            <audio :title="art.article_title" v-if="art.article_ref_url!=''" width="100%" :src="art.article_ref_url" type="audio/mp3" controls="controls"></audio>
                        </div>
                       
                    </div>
                    <!-- box -->
                    <!-- 文章mate -->   
                    <ul class="bottom_meta">
                        <li class="meta_tabs">
                            <router-link v-for="tag in art.article_tag.split(',')" :to="'/tag/'+tag+'/'"  :title="tag" class="content-img" rel="bookmark">{{tag}}</router-link> 
                        </li>
                        <!-- 喜欢按钮 --> 
                        <li id="like_btn">
                            <a href="javascript:;" @click="addLive(art.article_id)" class="jm-post-like" title="Like"><i class="fa fa-heart-o"></i>&nbsp;{{art.article_like}}</a>                           
                        </li>   
                        <div class="clearfix"></div>
                    </ul>    
                    <div class="clearfix"></div>
                </div>
            </article>      
        </div>
        <div v-if="isLoading" class="ias-trigger ias-trigger-next" @click="nextPage"><a>加载更多</a></div>
    </div>
</template>

<script>
import Vue         from 'vue' 
import configs     from 'assets/common'  
 
 
export default {
  props:["list","isLoading"],  
  data: function() {
    return { 
      path: configs.path, 
     
    }
  },
  mounted: function() {
     
  },
  created: function() {
      
  },
  methods:{
    addLive:function(id){
        console.log("click addlive:"+id)
    }
    ,
    nextPage:function(id){
        console.log("click nextPage:"+id)
    }
  } 

}
</script> 
 
<style>
.show{display: block!important;}
.hide{display: none!important;}
.mt50{margin-top: 50px;}
</style> 