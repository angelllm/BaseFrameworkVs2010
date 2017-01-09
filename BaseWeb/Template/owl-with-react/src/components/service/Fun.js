import 'whatwg-fetch';

export default   {

	getViewData: function(params,callback){
 		 
	     let _params = [],url,fetchurl
	     url = params.url || "http://www.llmztt.com/Api/Result"
	     for(let keys in params) if (keys !== "url") _params.push(keys+"="+params[keys] )
	     fetchurl = url + "?" + _params.join("&")
		 let fetchcall = fetch(fetchurl)
	     fetchcall
	     .then(function(response) {
			 response.json().then(function(res){
				callback(res)
			 })
	      })
	     .catch(function(ex) {
	         console.log('parsing failed', ex)
	     })   
	     
	}
}