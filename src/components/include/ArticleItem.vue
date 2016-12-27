<template>
   <div class="box">
     <!--view model-->
     <div class="posts fade out">
          <center v-if="!art.article_title" id="center" :class="{mt50:true}">  
              <img src="/assets/images/loading-dian.gif" alt="loading" />
              <p>正在加载...</p>
          </center>
          <article v-if="art.article_title" class="post type-post status-publish format-aside has-post-thumbnail hentry category-code tag-ajax post_format-post-format-aside">
            <div class="box-wrap">
                  <div class="box">
                        <header style=" margin-bottom: 0px;">
                          <h1 class="entry-title">
                            <router-link :style="'color:'+art.article_title_color"  :to="'/view/'+art.article_id+'/'" :title="art.article_title">
                              {{art.article_title}}
                            </router-link>
                          </h1>
                          <ul class="top_meta top-ul">
                            <li class="mate-cat">
                              <i class="fa fa-folder-open-o">
                              </i> 
                              {{art.article_type_name}}
                            </li>
                            <li class="mate-time">
                              <i class="fa fa-clock-o">
                              </i>
                              发表于{{art.article_guid}}前 ({{art.article_time}})
                            </li>
                            <li class="mate-view">
                              <i class="fa fa-eye">
                              </i>
                              {{art.article_pv}}次浏览
                            </li>
                            <li class="mate-com">
                              <i class="fa fa-comments-o">
                              </i>
                              <router-link :to="'/view/'+art.article_id+'/'" title="comments">
                                {{art.commite_count}}条评论 
                              </router-link>
                            </li>
                            <li>
                            </li>
                            <div class="clearfix"></div>
                          </ul>
                        </header>
                        <div class="post-content post-content-view">
                          <div class="audio-wrapper content">
                            <div class="post-copyright post-copyright-title ">
                             文章摘要
                            </div>
                            <blockquote v-html="art.article_content"></blockquote>
                            <div class="post-copyright post-copyright-title ">文章内容</div>

                            <audio v-if="art.article_ref_url!=''" :title="art.article_title"   width="100%" :src="art.article_ref_url" type="audio/mp3" controls="controls"></audio>
                            <br v-if="art.article_ref_url!=''" />
                             
                            <div class="box" v-for="c in clist">
                                <blockquote v-html="c.content_title"></blockquote>
                                <div v-html="c.content_content"></div>
                            </div>
                            
                            <br />
                            <br />
                          </div>
                        </div>
                        <!-- post content -->
                        <!-- 转载原创 -->
                        <div class="post-copyright">
                          转载原创文章请注明，转载自：
                          <router-link to="/" title="纠结的狮子座">纠结的狮子座</router-link>
                          »
                          <router-link :to="'/view/'+art.article_id+'/'" :title="art.article_title">
                            {{art.article_title}}
                          </router-link>
                        </div>
                        <!-- 相关文章 -->
                        <h3 class="related_title">
                          相关文章
                        </h3>
                        <ul class="related_img">
                          <li class="related_box" v-for="item in alist">
                              <div class="r_pic">
                                <router-link :to="'/view/'+item.article_id+'?r='+Math.random()"  :title="item.article_title" class="content-img">
                                    <img :src="'http://llmztt.com'+item.article_image" :alt="item.article_title" class="thumbnail ajax_gif">
                                </router-link>
                              </div>
                              <div class="r_title">
                                <router-link :to="'/view/'+item.article_id+'/'"  :title="item.article_title" class="content-img" rel="bookmark">
                                  {{item.article_title}}
                                </router-link>
                              </div>
                          </li> 
                          
                        </ul>
                        
                  </div>
                  <!--tag like-->
                  <ul class="bottom_meta">
                      <li class="meta_tabs" data-bind="art.article_tag">
                          <router-link :title="types.split('|')[1]" class="fa fa-bookmark " v-if="art.article_shut_title" :to="'/category/'+types.split('|')[1]" v-for="types in art.article_shut_title.split(',')">{{types.split("|")[1]}}</router-link>
                          <router-link v-for="tag in art.article_tag.split(',')" :to="'/tag/'+tag+'/'"  :title="tag" class="content-img" rel="bookmark">{{tag}}</router-link>
                      </li>
                      <!-- 喜欢按钮 -->
                      <li id="like_btn">
                        <a href="javascript:;"  v-on:click.once="addLike(art)" class="jm-post-like" title="Like"><i class="fa fa-heart-o"></i><em>{{art.article_like}}</em><em :class="art.article_is_bold ? 'like' : 'hide'">+1</em></a>                           
                      </li>
                      <div class="clearfix"></div>
                  </ul> 
            </div>

          </article>
          <!--prev next-->
          <div class="single post-nav ">
            <div class="post-nav-inside">
              <div class="post-nav-left overhide">
                <router-link v-if="prev.article_title" class="overhide" :title="prev.article_title" :to="'/view/'+prev.article_id+'/'" rel="prev">
                  {{prev.article_title}}
                </router-link>
              </div>
              <div class="post-nav-right overhide">
                <router-link v-if="next.article_title" class="overhide" :title="next.article_title" :to="'/view/'+next.article_id+'/'" rel="next">
                  {{next.article_title}}
                </router-link>
              </div>
            </div>
          </div> 
     </div>
     <!--respond-->
     <div id="comment-jump" class="comments">
        <div id="comments">
            <!--commitelist-->
            <h3 id="comments-title">{{commitelist.length}} 评论</h3>
            <div id="loading-comments"><span><i class="fa fa-spinner fa-pulse"></i>Loading...</span></div>
            <ol class="commentlist">
                <li v-for="(item,index) in commitelist" class="comment even thread-even depth-1 clearfix">
                  <span class="commentcount">
                     {{index+1}}楼
                  </span>
                  <div class="comment-block">
                    <div class="author-img content-img">
                      <img src='/assets/images/User-5S.png' class="avatar avatar-100" height="100" width="100">
                    </div>
                    <div class="comment-body">
                      <div class="comment-name">
                        <cite class="fn">
                          <a href="javascript:;" rel="external nofollow" class="url">
                             {{item.commite_uname}}
                          </a>
                        </cite>
                      </div>
                      <div class="comment-text">
                        <p>
                           {{item.commite_content}}
                        </p>
                      </div>
                      <div class="comment-info">
                        <span class="comment-date">
                          <a class="comment-time" href="javascript:;">
                            {{item.commite_time}}
                          </a>
                        </span>
                        <span class="comment-reply">
                          <a rel="nofollow" class="comment-reply-link" @click="reply(item.commite_id)" href="#respond" :aria-label="'回复给'+item.commite_uname">
                            回复
                          </a>
                        </span>
                        <span class="comment-edit">
                        </span>
                        <div class="clearfix">
                        </div>
                      </div>
                      <div class="clearfix">
                      </div>
                    </div>
                  </div>
                  <ul class="children">
                    
                    <li v-if="rep.commite_ref_id == item.commite_id" v-for="rep in item.List" class="comment byuser bypostauthor odd alt depth-2 clearfix" :id="'li-comment-'+item.commite_id">
                      <span class="commentcount">
                      </span>
                      <div class="comment-block">
                        <div class="author-img content-img">
                             <img v-if="rep.commite_uname=='Aliks'" src="/assets/images/user-def.png" class="avatar avatar-100" height="100" width="100">
                             <img v-if="rep.commite_uname!='Aliks'" src='/assets/images/User-5S.png' class="avatar avatar-100" height="100" width="100">
                        </div>
                        <div class="comment-body">
                          <div class="comment-name">
                            <cite class="fn">
                              {{rep.commite_uname}}
                            </cite>
                            
                            <span v-if="rep.commite_uname=='Aliks'" class="author">
                              (管理员)
                            </span> 
                            
                          </div>
                          <div class="comment-text">
                            <p>
                              {{rep.commite_content}}
                            </p>
                          </div>
                          <div class="comment-info">
                            <span class="comment-date">
                              <a class="comment-time" href="#comment-92">
                               {{rep.commite_time}}
                              </a>
                            </span>
                            <span class="comment-reply">
                              <a rel="nofollow" class="comment-reply-link" @click="reply(item.commite_id)" href="#respond"  :aria-label="'回复给'+rep.commite_uname">
                                回复
                              </a>
                            </span>
                            <span class="comment-edit">
                            </span>
                            <div class="clearfix">
                            </div>
                          </div>
                          <div class="clearfix">
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
               
                </li>
            </ol>
            <!--commite-->
            <div id="respond" class="comment-respond">
              <h3 id="reply-title" class="comment-reply-title">
                发表评论
                <small><div id="cancel-comment-reply-link"><i class="icon-remove-sign"></i></div></small>
              </h3>
              <form method="post" id="commentform" class="comment-form">
                
                <p class="comment-form-comment">
                  <textarea :value="form.content" v-model="form.content" id="comment" name="comment" cols="45" rows="8" aria-required="true"  required="required"></textarea>
                  <span :class="{'error':true, 'hide':!form.isContent}">请填写评论</span>
                </p>
                
                <input type="hidden" name="commite_ref_id" value="0" />

                <p class="comment-form-author">
                  <label for="commite_uname">姓名<span class="required">*</span></label>
          
                  <input id="commite_uname" name="commite_uname" type="text" v-model="form.name" :value="form.name" size="30" aria-required="true" required="required">
                  <span :class="{'error':true, 'hide':!form.isName}"> 请填写姓名</span>
                </p>
                <p class="comment-form-email">
                  <label for="commite_email">
                    电子邮件
                    <span class="required">
                      *
                    </span>
                  </label>
                  <input v-model="form.email" id="commite_email" name="commite_email" type="text" :value="form.email" size="30" aria-describedby="email-notes"
                  aria-required="true" required="required">
                  <span :class="{'error':true, 'hide':!form.isEmail}"> 请填写电子邮件</span>
                </p>
                <p class="comment-form-url">
                  <label for="commite_url">
                    站点
                  </label>
                  <input v-model="form.site" id="commite_url" name="commite_url" type="text" :value="form.site" size="30">
                </p>
                <div class="unlock">
                 
                </div>
                <p class="form-submit">
                  <input name="submit" type="button" id="submit" @click="submit" class="submit"  value="发表评论" >
                </p> 
                <p>
                  <div :class="{'hide':!form.isLoad}" id="loading"><i class="fa fa-spinner fa-pulse"></i>正在提交, 請稍候...</div>
                </p>
                <div id="loading-submit"><span><i class="fa fa-spinner fa-pulse"></i>Loading...</span></div>
              </form>
            </div>
            <div class="clearfix"></div>

            <div id="bulletin_box" :class="{'commit-info':true, 'hide':!form.isSub}" >
                <i class="fa fa-bell-o"></i>
                <div id="bulletin">
                    <ul class="bulletin_list">
                        <li>评论已提交，请等待审核！</li>
                    </ul> 
                </div>
            </div>
        </div>
     </div>
     
   </div>


</template>
 
<script>
import Vue          from 'vue'   
import configs      from 'assets/common' 
import moment       from 'moment' 
import Func         from 'assets/Func' 
import axios        from 'axios'   

export default {
  props:["base"],
  //当复用模板的时候
  //组件的生命周期钩子不会再被调用
  //所以监控路由变化
  //获取当前参数 重新获取数据
  watch: {
    '$route' (to, from) { 
      //清空数据
      this.art         = ""
      this.clist       = []
      this.alist       = []
      this.prev        = []
      this.next        = []
      this.commitelist = []
      //重新获取数据
      this.getItem(to.params.id)
      //重新加载代码高亮
      this.initHightlighter()
    }
  },
  data: function() {
    return { 
       art:"",
       clist:[],
       alist:[],
       prev:[],
       next:[],
       title:"",
       commitelist:[],
       dataUrl:configs.webPath,
       params:{method:"getItem",id:this.$route.params.id},
       form:{
          name:"",
          email:"",
          site:"",
          content:"",
          isContent:false,
          isName:false,
          isEmail:false,
          isSub:false,
          isLoad:false
       }
    }
  },
  mounted: function() {
      this.getItem()

  },
  created: function() {
      this.initHightlighter()
  },
  methods:{
      
      addLike:function(art){
        if (art.article_is_bold) {
            return
        }
        Func.getViewWebData(configs.webPath,{method:"addLike",id:art.article_id}).then(function(data){
            art.article_like ++
            art.article_is_bold = true
        }) 
      }
      ,
      reply:function(id){
         //console.log(id)
      },
      getItem:function(id){
          var _this = this
          this.params.id = id == null ? this.params.id : id 
          Func.getViewWebData(this.dataUrl,this.params).then(function(data){
              if (data[0]) { 
                  _this.art               = data[0]
                  document.title          = _this.art.article_title + "-" + _this.base.page_title 
                  _this.art.article_time  = moment(_this.art.article_time).format('YYYY-MM-DD h:mm:ss')
                  //contentlist
                  var _contentlist        = data[1],
                      _url                = configs.imageURl 
                  _contentlist.forEach(function(item){
                      var _content = item.content_content
                      _content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,src) {
                          if (src.indexOf(_url) == -1 && src.indexOf(_url.replace("www.","")) == -1) {
                             item.content_content = _content.replace().replace(src,_url + src)
                          }
                      })
                  })
                  _this.clist             = _contentlist 
                  //
                  _this.alist             = data[2]
                  _this.prev              = data[3].length == 0 ? [] : data[3][0]
                  _this.next              = data[3].length == 1 ? data[3][0] : data[3][1]
                  _this.prev              = _this.prev == _this.next ? [] : _this.prev  
                  var _data               = data[4]
                  _data.forEach(function(item){
                      item.commite_time   = moment(item.commite_time).format('YYYY-MM-DD h:mm:ss')
                  }) 
                  _this.commitelist       = _data 
              }else{
                 _this.$router.push("/")
              }
          }) 
      },
      initHightlighter:function(){
         setTimeout(function(){
            SyntaxHighlighter.highlight()
         },2000) 
      },
      submit:function(event){

         event.target.removeAttribute("disabled") 
         this.form.isContent = false
         this.form.isName = false
         this.form.isEmail = false
         this.form.isLoad = true
         this.form.isSub = false
         
         if (this.form.content == "" || this.form.content.length < 6) {
            this.form.isContent = true
         }
         else if (this.form.name == "" ) {
            this.form.isName = true
         }
         else if (this.form.email == "") {
            this.form.isEmail = true
         }else{
            var _this = this
            event.target.disabled = true 
            axios({
              url:configs.webPath,
              method: 'POST',
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'contentType': "application/x-www-form-urlencoded"
              },
              params:Object.assign({method:"addCommit",id:this.art.article_id},this.form)
            })
            .then(function (response) {
                _this.form.isSub = true
                _this.form.isLoad = false
                event.target.removeAttribute("disabled")
                for(var key in _this.form){
                    if ( typeof(_this.form[key]) === "string")
                       _this.form[key] = ""
                }
            })
            .catch(function (error) {
                _this.form.isSub = false
                _this.form.isLoad = false
                event.target.removeAttribute("disabled")
                console.log(error);
            })  
         }
 
      }
  } 

}


</script> 

<style>
 @import 'http://www.llmztt.com/Content/js/ueditor/third-party/SyntaxHighlighter/shCoreDefault.css';
 .top-ul{font-size: 12px;display: block;  padding: 0 20px;margin: 0!important;padding-left: 20px!important;}
</style> 