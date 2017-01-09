'use strict';

import React from 'react';
import { Router, Route ,Link} from 'react-router';
import Fun from '../service/Fun';
import moment from 'moment';



export default class WebArticle extends React.Component {
     
    constructor() { 
        super();  
        this.state={ 
            articleList:[] 
        } 
    } 

    splitWinUrl(){
        return window.location.href.split("#")[1].split("?")[0].replace("/","").split("/")
    }

    componentDidMount(){
        var _this = this
        var _params = _this.getParams() 
        
        Fun.getViewData(_params,function(res){
            _this.setState({
                articleList : res
            }) 
        }) 
        
        window.addEventListener('hashchange', function(to,from){
            _this.getListAgain(to)    
        }, false) 
    }

    getListAgain(to){

        var _this = this
        let _urlsplit = to.newURL.split("#")[1]
        if (_urlsplit.indexOf("?_k") !== -1) return
        
        var _params = _this.getParams()  
              
        Fun.getViewData(_params,function(res){
            /*var _urlcheck = window.location.hash.split("?")
            if (_urlcheck[0] == "#/" || _urlcheck[0].indexOf("tag") !== -1 || _urlcheck[0].indexOf("category") !== -1 ) {*/
            _this.setState({
                articleList : res
            }) 

        }) 

    }

    componentWillUnmount(){
        var _this = this
        window.removeEventListener('hashchange', function(to,from){
            _this.getListAgain(to)          
        }, false)
        console.log("componentWillUnmount...")
    }

    getParams(){
      
        var _params = {method:"getArticleList","pagesize":100,"pageindex":1,"q":'',"tag":''}
        var _urlstr = this.splitWinUrl()
        _params.q = _urlstr[1]
        if (_urlstr[0] === "category") {
            _params.tag = "name"
        }else if (_urlstr[0] === "tag") {
            _params.tag = "tagname"
        } 
        return _params
    }
    
    getTags(data){

        let tags = []
        data.map(function(elm, idx) {
            if (elm!="") {
                tags.push('<a href="#/tag/'+ elm +'" rel="tag">' + elm + '</a>')
            }
        })
        return tags.join("")
    }

    getArticleDate(time,format){
        return moment(time).format(format)  
    }



    render() {

          let isTop = (
            <div className="post-sticky with-tooltip m_hide" data-tooltip="置顶文章"></div>
          )

          let list =  this.state.articleList.map((art,index)=>{    
             return (
                <article key={art.article_id.toString()} className="index-post post type-post status-publish format-standard has-post-thumbnail sticky hentry category-wordpress tag-pluto tag-wordpress">
                    <div className="post-tool m_hide">
                        <div className="post-date">
                            <span className="date-month">{this.getArticleDate(art.article_time,"MM")}月</span>
                            <span className="date-day">{this.getArticleDate(art.article_time,"DD")}</span>
                            <span className="date-year">{this.getArticleDate(art.article_time,"YYYY")}</span>
                        </div>
                        <div className="post-view">
                            <Link href={"#/view/"+art.article_id}>
                                <i className="fa fa-eye"></i><span className="view-num">{art.article_pv}</span>
                            </Link>
                        </div>
                    </div>
                    <div className="post-wrap">
                        <header className="post-title clearfix wb">
                            <div className="fl">
                                <Link className="" href={"#/view/"+art.article_id} title={art.article_title}>{art.article_title}</Link>
                            </div>
                        </header>
                        <div className="post-inner colbox">
                            <div className="post-left col m_hide">
                                <div className="post-featured">
                                    <a href={"#/view/" + art.article_id} title={art.article_title}>
                                        <img width="300" height="300" src={"http://www.llmztt.com/" + art.article_image} className="attachment-thumbnail size-thumbnail wp-post-image ajax_gif" alt="screenshot" /> 
                                    </a>
                                </div>
                                {art.article_is_top ? isTop : ""}  
                            </div>
                            <div className="post-right col">
                                <div className="post-content wb clearfix">
                                    <div dangerouslySetInnerHTML={{__html:art.article_content}}></div>
                                    <div className="read_more m_hide"><a href={"#/view/" + art.article_id}>阅读更多</a></div>
                                </div>
                            </div>
                        </div>
                        <ul className="post-meta clearfix">
                            <li className="mate-cat fl clearfix"><i className="fa fa-bookmark"></i><Link href={"#/category/" + art.article_type_name} rel="category tag">{art.article_type_name}</Link></li>
                            <li className="meta-tabs fl clearfix m_hide">
                                <i className="fa fa-tags"></i>
                                <span dangerouslySetInnerHTML={{__html:this.getTags(art.article_tag.split(","))}}></span>
                            </li>
                            <li className="meta-like fr mr0"><a href="javascript:;" className="jm-post-like" title="Like"><i className="fa fa-heart-o"></i>{art.article_like}</a></li>
                            <li className="mate-com fr"><i className="fa fa-comments-o"></i><span className="mate-num">{art.commite_count}</span></li>
                        </ul>
                    </div>
                </article> 
             )
          })

          return (     
            <div>    
                {list}
                {/*<div className="ias-trigger ias-trigger-next"><a>加载更多</a></div>*/}
            </div>
         )


    }


}