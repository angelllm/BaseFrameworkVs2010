'use strict';


import React from 'react';
import ReactDom from 'react-dom';


import WebHeader from './include/WebHeader';
import WebMinHeader from './include/WebMinHeader';
import WebMenu from './include/WebMenu';
import WebSlideBar from './include/WebSlideBar';
import WebFooterTool from './include/WebFooterTool';
import WebFooter from './include/webFooter';
import WebNotice from './include/WebNotice';

import routes from './routes'; 

import Fun from './service/Fun';

class App extends React.Component {
    category:[];
    constructor() { 
        super();  
        this.state={ 
            mobileMenu:false
        } 
        
    } 

    handleMenu(){
        this.setState({mobileMenu: !this.state.mobileMenu})
        //console.log("handleMenu is click")
    }

    componentDidMount(){
        
        var _this = this
        Fun.getViewData({method:"typeList"},function(res){
            _this.setState({
                category : res 
            })   
        })  
    }

    render() {
        return (

            <div>
                <WebHeader />
                <WebMinHeader handleMenu={this.handleMenu.bind(this)}/>
                <WebMenu name="webMenu" category={this.state.category} mobileMenu={this.state.mobileMenu} handleMenu={this.handleMenu.bind(this)}/>
                <WebSlideBar />
                {routes}
                <WebFooterTool />
                <WebFooter />
                <WebNotice />
            </div>
        )
    }


 

} 

ReactDom.render(<App/>,document.getElementById('app'));


