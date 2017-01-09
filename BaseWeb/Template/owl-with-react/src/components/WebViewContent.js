'use strict';

import React from 'react';
import { Router, Route,Link } from 'react-router'
import Fun from './service/Fun';
import WebMinMenu from './include/WebMinMenu';
import moment from 'moment';

export default class WebViewContent extends React.Component {

    constructor() { 
        super();  
        this.state={ 
            id:0,
            art:[], 
            artContent:[], 
            nearlist:[],
            clist:[]
        } 
        
    } 

    componentWillMount(){
        var _this = this 
        _this.setState({
            id : _this.props.params.id
        })  
    }

    componentDidMount(){
        
        var _this = this
        Fun.getViewData(_this.getParams(),function(res){
            _this.setState({
                art : res[0],
                artContent : res[1],
                nearlist : res[2],
                clist : res[4]
            }) 
            window.scrollTo(0,0) 
        })  

        window.addEventListener('hashchange', function(to,from){
            let _urlsplit = to.newURL.split("#")[1]
            if (_urlsplit.indexOf("?_k") !== -1) return
            let _params = _urlsplit.split("?")
            let _url = _params[0].split("/")
            let _id = _url[2]
            Fun.getViewData(_this.getParams(_id),function(res){
                _this.setState({
                    art : res[0],
                    artContent : res[1],
                    nearlist : res[2],
                    clist : res[4]
                }) 
                window.scrollTo(0,0) 
                _this.initHightlighter()
            })  

        }, false);

        _this.initHightlighter()
    }

    initHightlighter(){
        setTimeout(function(){
           SyntaxHighlighter.highlight()
        },2000) 
    }

    getParams(id){
        return {method : "getItem","id" : id || this.state.id}
    }

    getArticleDate(time,format){
        return moment(time).format(format)  
    }

    getTags(data){
        if (typeof(data) == "undefined") {
            return
        }
        let tags = []
        data.split(",").map(function(elm, idx) {
            if (elm!="") {
                tags.push('<a href="#/tag/'+ elm +'" rel="tag">' + elm + '</a>')
            }
        })
        return tags.join("")
    }

    componentWillUpdate(){
        //setState后会调用
    } 

    render() {
        
        let content =  
        (
            this.state.artContent.map(function(elem,index) {
                var _content = elem.content_content
                var _url = "http://www.llmztt.com"
                _content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,src) {
                    if (src.indexOf(_url) == -1 && src.indexOf(_url.replace("www.","")) == -1) {
                        elem.content_content = _content.replace().replace(src,_url + src)
                    }
                  
                })
               
                return (
                    <div key={elem.content_id.toString()}>        
                        <header className="post-title clearfix wb">
                            {elem.content_title}
                        </header>                        
                        <div dangerouslySetInnerHTML={{__html:elem.content_content}}></div>
                    </div>
                )         
            })
        )  

        let nearList =
        (
            this.state.nearlist.map(function(elem,index) {
                return (
                    <li key={elem.article_id.toString()} className="related_box">
                        <div className="r_pic">
                            <Link href={"#/view/"+elem.article_id} title={elem.article_title}>
                                <img src={"http://www.llmztt.com"+elem.article_image} alt={elem.article_title} className="thumbnail" />
                            </Link>
                        </div>
                        <div className="r_title"><Link className="wb" href={"#/view/"+elem.article_id} title={elem.article_title} rel="bookmark">{elem.article_title}</Link></div>
                    </li>  
                )         
            })
        )

        let article = 
        (
            <article className="single-post post-54 post type-post status-publish format-aside hentry category-wordpress tag-cue tag-wordpress tag-14 post_format-post-format-aside">
                <div className="post-tool m_hide">
                    <div className="post-date">
                        <span className="date-month">{this.getArticleDate(this.state.art.article_time,"MM")}月</span>
                        <span className="date-day">{this.getArticleDate(this.state.art.article_time,"DD")}</span>
                        <span className="date-year">{this.getArticleDate(this.state.art.article_time,"YYYY")}</span>
                    </div>
                    <div className="post-view">
                        <a href={"#/view/"+this.state.art.article_id}>
                            <i className="fa fa-eye"></i><span className="view-num">{this.state.art.article_pv}</span>
                        </a>
                    </div>
                </div>
                <div className="post-wrap">
                    <h3 className="clearfix wb text-center">
                        {this.state.art.article_title}
                    </h3>
                    <div className="post-inner colbox">
                        <div className="post-right col">
                            <div className="post-content post-content-2 wb clearfix">
                                {content}
                            </div>
                        </div>
                    </div>  
                    <div className="post-copyright m_hide">
                        <div className="post-copyright-inner">
                            <div className="post-copyright">
                               转载原创文章请注明，转载自：
                               <a href="#/" className="router-link-active" title="纠结的狮子座">纠结的狮子座</a>
                               &nbsp;» &nbsp;
                               <a href={"#/view/"+this.state.art.article_id} className="router-link-active" title={this.state.art.article_title}>
                                 {this.state.art.article_title}
                               </a>
                            </div> 
                        </div>
                    </div>

                    <div className="post-related m_hide">
                        <ul className="related_box clearfix">
                            {nearList}
                        </ul>
                    </div>
                    <ul className="post-meta clearfix">
                        <li className="mate-cat fl clearfix"><i className="fa fa-bookmark"></i><a href={"#/category/" + this.state.art.article_type_name} rel="category tag">{this.state.art.article_type_name}</a></li>
                        <li className="meta-tabs fl clearfix m_hide">
                            <i className="fa fa-tags"></i>
                            <span dangerouslySetInnerHTML={{__html:this.getTags(this.state.art.article_tag)}}></span>
                        </li>
                        <li className="meta-like fr mr0"><a href="javascript:;" className="jm-post-like" title="Like"><i className="fa fa-heart-o"></i>{this.state.art.article_like}</a></li>
                        <li className="mate-com fr"><i className="fa fa-comments-o"></i><span className="mate-num">{this.state.art.commite_count}</span></li>
                    </ul>
                </div>
            </article>
        )
        let _this = this
        let commiteList =
        (
            this.state.clist.map(function(elem,index) {

                return (
                    <li key={elem.commite_id.toString()} className="comment odd {/*even*/} alt thread-odd thread-alt depth-1 clearfix">
                        <div className="comment-block">
                            <div className="comment-header clearfix">
                                <span className="author-img fl">
                                    <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-echo="https://secure.gravatar.com/avatar/3bbb47d7cd6b0396f5d0568a0e1d361b?s=100" className="avatar avatar-100" height="100" width="100" />        
                                </span>
                                <span className="author-name fl">{elem.commite_uname}</span>
                                <span className="comment-count fr">{index+1}楼</span>
                            </div>
                            <div className="comment-body wb clearfix">
                                <p>{elem.commite_content}</p>
                            </div>
                            <div className="comment-bottom clearfix">
                                <span className="comment-date">
                                    <a className="comment-time" href={"#/view/"+elem.commite_article_id}>
                                     {_this.getArticleDate(elem.commite_time,"YYYY-MM-DD HH:MM:SS")}
                                    </a>
                                </span> 
                                <span className="comment-reply">
                                    <a rel="nofollow" className="comment-reply-link" href="javascript:;"   aria-label={"回复给"+elem.commite_uname}>回复</a>        
                                </span> 
                                <span className="comment-edit"></span>
                            </div>
                        </div>
                    </li>
                )         
            })
        )


        return (  
             
             
            <section id="content" name="content">
                <div className="container container-box">
                    <div className="content-inner">
                        <WebMinMenu />
                        <div className="posts">
                            {article}
                            <div id="comment-jump" className="comments">
                                <div id="comments" className="clearfix">
                                    <h3 id="comments-title">{this.state.clist.length}条评论</h3>
                                    <div id="loading-comments" className="hide"><span><i className="fa fa-spinner fa-pulse"></i> Loading...</span></div>
                                    <ul className="commentlist comdot">
                                        {commiteList}  
                                        <div className="clearfix"></div>
                                    </ul>

                                    {/*<nav id="comment-nav-below" className="posts-nav" role="navigation">
                                        <div className="nav-inside">
                                            <a className="page-numbers" href="comment-page-1/#comments">1</a>
                                            <span className="page-numbers dots">…</span>
                                            <a className="page-numbers" href="comment-page-5/#comments">5</a>
                                            <a className="page-numbers" href="comment-page-6/#comments">6</a>
                                            <span className="page-numbers current">7</span> 
                                        </div>
                                    </nav>*/}
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <style>
                @import 'http://www.llmztt.com/Content/js/ueditor/third-party/SyntaxHighlighter/shCoreDefault.css';
                </style>
            </section>

        )
    }
}