import React from 'react';
import { Router, Route, hashHistory,Redirect,IndexRoute } from 'react-router';

import WebContent from './WebContent'; //default content wrapper
import WebAboutContent from './WebAboutContent'; 
import WebViewContent from './WebViewContent'; 
import WebNotFound from './WebNotFound'; 

export default (

	<Router history={hashHistory}>
	    <Route path='/' component={WebContent}></Route>
	    <Route path='/about' component={WebAboutContent} />
	    <Route path='/view/:id' component={WebViewContent} /> 
	    <Route path='/tag/:tagName' component={WebContent} />
	    <Route path='/category/:name' component={WebContent} />
	    <Route path='*' component={WebNotFound} />
	</Router>

)