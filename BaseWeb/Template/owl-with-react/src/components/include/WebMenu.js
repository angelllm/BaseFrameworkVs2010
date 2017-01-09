'use strict';

import React from 'react';
import {a } from 'react-router'

export default class WebMenu extends React.Component {

    constructor() { 
        super();  
        this.state={ 
            toggleTag:true
        } 

    } 

    componentWillMount(){
        
    }

    componentDidMount(){
        //console.log(this.props.mobileMenu)
    }

    menuToggle(flag){
        var _val = flag == 1 ? true : false
        this.setState({toggleTag: _val}) 
    }

    render() {
        let _category = this.props.category || []
 
        let typelist = (
           
             _category.map(function(elem, index) {
                 return (
                    <li key={elem.type_id} className="menu-item menu-item-type-taxonomy menu-item-object-category menu-item-has-children"><a href={'#/category/'+elem.type_name}><i className="fa fa-code" aria-hidden="true"></i>{elem.type_name}</a></li>                        
                )
             }) 
           
        )
        return (  
            <nav id="m-menu" className={this.props.mobileMenu ? "m_show open" : "m_show"}>
                <div className="menu-tab clearfix">
                    <a onClick={this.menuToggle.bind(this,1)} href="javascript:void(0)" className={this.state.toggleTag ? "menu-tab-item fl current" : "menu-tab-item fl"}>菜单</a>
                    <a onClick={this.menuToggle.bind(this,0)} href="javascript:void(0)" className={!this.state.toggleTag ? "menu-tab-item fl current" : "menu-tab-item fl"}>分类</a>
                    <a onClick={this.props.handleMenu} href="javascript:void(0)" className="m-menu-close fl"><i className="fa fa-times" aria-hidden="true"></i></a>
                </div>
                <div className="menu-content">
                    <div className={this.state.toggleTag ? "menu-wrapper" : "menu-wrapper hide"}>
                        <ul className="menu-list clearfix">
                            <li className="menu-item menu-item-type-post_type menu-item-object-page"><a href="#/">首页</a></li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page"><a href="#/about/">关于我</a></li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page"><a href="#/category/">分类</a></li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page"><a href="http://www.llmztt.com/vue2/#/">Vue2版本</a></li>
                            <li className="menu-item menu-item-type-post_type menu-item-object-page"><a href="http://www.llmztt.com/react2/#/">React2版本</a></li>
                            <li className="menu-item menu-item-type-custom menu-item-object-custom"><a href="http://www.llmztt.com/angular2/#/">Angular2版本</a></li>
                        </ul>
                    </div>
                    <div className={!this.state.toggleTag ? "menu-wrapper" : "menu-wrapper hide"}>
                        <ul className="menu-list clearfix">
                            {typelist}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}