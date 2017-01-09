'use strict';

import React from 'react';

export default class WebNotFound extends React.Component {

    render() {
        return (  
            <section id="content" name="content">
                <div className="container container-box">
                    <div className="content-inner">
                          <div className="posts">
                             <h1 className="text-center page-404">404</h1>
                             <h1 className="text-center">not found </h1>
                          </div> 
                    </div>
                </div>
            </section>
        )
    }
}