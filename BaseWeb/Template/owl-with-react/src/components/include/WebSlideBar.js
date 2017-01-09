'use strict';

import React from 'react';

export default class WebSlideBar extends React.Component {

    render() {
        return (  
            <aside id="sidebar" className="m_hide {/*open*/}">
                <div className="sideinner">
                    <div className="sidebar-content">
                        <aside className="widget">
                            <div className="profile-avatar">
                                <div className="profile-avatar-inner">
                                    <img src="http://llmztt.com/assets/images/head.jpg" alt="" className="ajax_gif" />
                                </div>
                            </div>
                            <div className="profile-name">
                                <div className="profile-name-inner">
                                    @明叔 </div>
                            </div>
                            <div className="profile-content">
                                一个什么都想做，但什么都没成功纠结的狮子座，会程序、会前端、会android,会微信开发、会切图，不会PS，会吃，不会玩，会聊，不会泡妹子，幻想着写书、流浪、冒险、养两只猫、过闲云野鹤的日子...
                            </div>
                            <ul className="profile-social clearfix">
                                <li><a href="javascript:void(0)" className="with-tooltip" data-tooltip="一个不玩微博的前端" target="_black"><i className="fa fa-weibo"></i></a></li>
                                <li><a href="javascript:void(0)" className="with-tooltip" data-tooltip="QQ：574589608"><i className="fa fa-qq"></i></a></li>
                                <li><a href="javascript:void(0)" className="with-tooltip" data-tooltip="这个暂时没有"><i className="fa fa-weixin"></i></a></li>
                                <li><a href="javascript:void(0)" className="with-tooltip" data-tooltip="这个有但先放着" target="_black"><i className="fa fa-github"></i></a></li>
                                <li><a href="javascript:void(0)" className="with-tooltip" data-tooltip="这个真没有" target="_black"><i className="fa fa-dribbble"></i></a></li>
                            </ul>
                        </aside>
                        <aside className="widget cs_widget_comment">
                            <h5 className="widget-title"><span>最新评论</span></h5>
                            <div className="textwidget" id="comment-list">
                                <ul>
                                    <li className="colbox">
                                        <p className="col avatar-box"><img src="#" className="avatar avatar-64 ajax_gif" height="64" width="64" /></p>
                                        <p className="col comment_box"><a className="with-tooltip" href="/wordpress-plugin-cue/#comment-2254" data-tooltip="《wordpress音乐插件Cue修改版》上的评论"><span className="s_name">Peven:</span><span className="s_desc">支持一下</span></a></p>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                        <aside className="widget widget_categories">
                            <h5 className="widget-title"><span>分类目录</span></h5>
                            <ul>
                                <li className="cat-item"><a href="/category/wordpress/">wordpress</a> (14)
                                </li>
                            </ul>
                        </aside>
                        <aside className="widget widget_tag_cloud">
                            <h5 className="widget-title"><span>标签</span></h5>
                            <div className="tagcloud">
                                <a href="/tag/owl/" className="tag-link-28 tag-link-position-2 with-tooltip"  data-tooltip="2个话题">owl</a>
                            </div>
                        </aside>
                        <aside className="widget widget_blogstat">
                            <h5 className="widget-title"><span>博客统计</span></h5>
                            <ul>
                                <li>日志总数：18 篇</li>
                                <li>评论数目：445 条</li>
                                <li>建站日期：2013-01-27</li>
                                <li>运行天数：1416 天</li>
                                <li>标签总数：57 个</li>
                                <li>最后更新：2016-11-17</li>
                            </ul>
                        </aside>
                    </div>
                </div>
                <div className="sidectrl">
                    <div className="sidebar-ctrl">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </aside>
        )
    }
}