'use strict';

import React from 'react';
import WebArticle from './include/WebArticle';
import WebMinMenu from './include/WebMinMenu';

export default class WebContent extends React.Component {

    toTop(){
        window.scrollTo(0,0) 
    }

    render() {
        return (  
            <section id="content" name="content">
                <div className="container container-box">
                    <div className="content-inner">
                        <WebMinMenu />
                        <div className="posts clearfix">
                            <div className="ias-trigger ias-trigger-prev"><a></a></div>
                            <WebArticle />
                        </div>
                        <div className="post-nav">
                            <div className="post-nav-inside text-c clearfix">
                                <div className="post-nav-left"></div>
                                {/*<div className="post-nav-right"><a href="">下一页</a></div>*/}
                            </div>
                        </div>
                        <a href="javascript:;" onClick={this.toTop} className="post-top"></a>
                    </div>
                </div>
            </section>
        )
    }
}