'use strict';

import React from 'react';

export default class WebNotice extends React.Component {

    render() {
        return (  
            <div className="notice clearfix open close hide">
                <div className="notice-img fl">
                    <img src="./assets/images/screenshot.png" alt="" className="ajax_gif" />
                </div>
                <div className="notice-txt fl">
                    <h5 className="ofh notice-title ofh">
                            title
                    </h5>
                    <div className="notice-content wb">
                        content
                    </div>
                    <div className="notice-btn">
                        <a href="#">阅读更多</a>
                        <a href="javascript:void(0)" className="notice-close">关闭</a>
                    </div>
                </div>
            </div>
        )
    }
}