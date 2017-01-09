npm config set registry “https://registry.npm.taobao.org”
安装
npm install  yo generator-reactpackage -g
//建立脚手架
yo reactpackage

npm run dev
npm run build


//react填坑
1.import WebHeader from './include/WebHeader';
导入的模板命名 需要 大写开头

'use strict';


import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import WebHeader from './include/WebHeader';
import WebMinHeader from './include/WebMinHeader';
import WebFooter from './include/webFooter';

class App extends React.Component {
     
    render() {
        return (
            <div>
                <WebHeader />
                <WebMinHeader />
                <WebFooter />
             </div>
        )
    }
}
 
 
//最终渲染
ReactDom.render(<App /> ,document.getElementById('app'));

不然 App的render 不会生成 WebHeader的html元素

2.在获取model实例后 在页面调用
{this.state.art.article_title}
不是单纯的
{art.article_title}
这个的art 100%是undefined


3.复用模板问题
老问题 文章详情页 不通ID切换时候 数据不变化 
因为模板复用的关系 componentDidMount 只有最初加载的时候调用一次后没有后文了

这时我们兼容hashchange事件 截取url字符串做查询就可以解决

    componentDidMount(){
        this.getList()
        var _this = this
        window.addEventListener('hashchange', function(to,from){
            let _urlsplit = to.newURL.split("#")[1]
            if (_urlsplit.indexOf("?_k") !== -1) return
            let _params = _urlsplit.split("?")
            let _url = _params[0].split("/")
            let _id = _url[2]
            _this.getList(_id)

        }, false);
    }


