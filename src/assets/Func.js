import Vue          from 'vue' 
import VueResource  from 'vue-resource'

Vue.use(VueResource) 

export default {

	getViewWebData:function(dataUrl,params){
        var _this = this
        return new Promise(function (resolve, reject) {    
            Vue.http.get(dataUrl,{params:params} )
            .then(function(response) {
                resolve(response.data)
               
            }, function(response) {
                console.log('fail ' + response.status + "," + response.statusText)
            })
            .catch(function(response) {
                console.log(response)
            })
            .finally(function(){

            }) 
        })

    },
    postViewWebData:function(dataUrl,params){
        var _this = this
        return new Promise(function (resolve, reject) {    
            Vue.http.post(dataUrl,{body:params}, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                },
                emulateJSON: true
            })
            .then(function(response) {
                resolve(response.data) 
            }, function(response) {
                console.log('fail ' + response.status + "," + response.statusText)
            })
            .catch(function(response) {
                console.log(response)
            })
            .finally(function(){

            }) 
        })

    }
}