'use strict';

import React from 'react';

export default class WebMinHeader extends React.Component {
     
    render() {
        return (
            <header id="m-header" className="m_show">
			    <div className="m-header-inner colbox">
			        <a className="col m-back" href="javascript:history.go(-1)">
			            <i className="fa fa-chevron-left" aria-hidden="true"></i>
			        </a>
			        <a className="col m-logo" href="/" title="纠结的狮子座">
						纠结的狮子座			
			        </a>
			        <a onClick={this.props.handleMenu} className="col m-menu" href="javascript:void(0)">
			            <i className="fa fa-bars" aria-hidden="true"></i>
			        </a>
			    </div>
			</header>
        )
    }
}

 