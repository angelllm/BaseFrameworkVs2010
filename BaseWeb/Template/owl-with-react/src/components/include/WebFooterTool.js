'use strict';

import React from 'react';

export default class WebFooterTool extends React.Component {

    render() {
        return (  
            <div id="footer-btn" className="m_hide">
                <ul>
                    <li className="item">
                        <a href="#top" className="icon">
                            <i className="hand fa fa-chevron-up"></i>
                        </a>
                    </li>
                    <li className="item">
                        <a className="icon" href="javascript:void(0)">
                            <i className="fa fa-qrcode"></i>
                        </a>
                        <div className="show-box hide">
                            <div className="show-box-inner qr-box hide">
                                <img src="#" className="ajax_gif" />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}