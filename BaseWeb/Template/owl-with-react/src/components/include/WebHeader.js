'use strict';

import React from 'react';

export default class WebHeader extends React.Component {

    render() {
        return (  
            <header id="header" className="m_hide">
                <div className="topbar">
                    <div className="container container-box clearfix">
                        <div className="fl clearfix">
                            <a href="#/" className="with-tooltip logo-txt" data-tooltip="纠结的狮子座">纠结的狮子座</a>
                        </div>
                        <div className="fr clearfix m_hide">
                            <div className="search fl">
                                <form method="get" id="searchform" action="/">
                                    <input type="text" className="search-form-input text" name="s"  placeholder="查找..." /> 
                                </form>
                            </div>
                            <div className="login fl">
                                <a href="#" className="with-tooltip login-btn" data-tooltip="登陆">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </a>
                            </div>
                             
                        </div>
                    </div>
                </div>
                <nav className="topmenu">
                    <div className="container clearfix">
                        <div className="menu-wrapper">
                            <ul className="menu-list clearfix">
                                <li className="menu-item menu-item-type-post_type menu-item-object-page nth1"><a href="#/">首页</a></li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page nth2"><a href="#/about/">关于我</a></li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page nth3"><a href="#/category/">分类</a></li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page nth4"><a href="#/nothing/">摆设</a></li>
                                <li className="menu-item menu-item-type-post_type menu-item-object-page nth5"><a href="#/thinks/">思绪</a></li>
                                <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children nth6">
                                    <a href="#">ArticleType</a>
                                    <ul className="sub-menu">
                                        <li className="menu-item menu-item-type-custom menu-item-object-custom"><a href="#/category/React">React</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="logo">
                    <a href="#/" title="纠结的狮子座"></a>
                </div>
            </header>
        )
    }
}