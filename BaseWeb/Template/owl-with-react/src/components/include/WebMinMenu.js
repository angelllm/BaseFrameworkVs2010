
'use strict';

import React from 'react';
 
export default class WebMinMenu extends React.Component {
     
    render() {
        return (
            <nav className="mianmenu m_hide">
                <div className="menu-wrapper">
                    <ul className="menu-list header-item clearfix">
                        <li className="menu-item menu-item-type-taxonomy menu-item-object-category"><a href="#/"><i className="fa fa-flag" aria-hidden="true"></i>首页</a></li>
                        <li className="menu-item menu-item-type-taxonomy menu-item-object-category"><a href="#/about"><i className="fa fa-coffee" aria-hidden="true"></i>关于我</a></li>
                        <li className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children"><a href="#/category"><i className="fa fa-code" aria-hidden="true"></i>分类</a>
                            <ul className="sub-menu">
                                <li className="menu-item menu-item-type-custom menu-item-object-custom"><a href="#/category/React">React</a></li>
                            </ul>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        )
    }
}

