import Vue          from 'vue' 
import axios 		from 'axios'   

//Vue.use(VueResource) 

export default {

	getViewWebData:function(dataUrl,params){
		return
		( 
	        axios({
	    		url:dataUrl,
	    		method: 'GET', 
	    		params:params 
	    	})
	    	.then(function (response) {
			    return response
			})
			.catch(function (error) { 
				console.log(error)
			})  
		)
    },
    postViewWebData:function(dataUrl,params){
    	
    	axios({
    		url:dataUrl,
    		method: 'POST',
    		headers: {
    			'X-Requested-With': 'XMLHttpRequest',
    			'contentType': "application/x-www-form-urlencoded"
    		},
    		params:params,
    		data:params
    	})
    	.then(function (response) {
    		return response.data 
		})
		.catch(function (error) {
		    console.log(error);
		}) 

    }
}