import Vue 			    from 'vue'
import App 			    from './App'
import Router 		  from 'assets/Router' 
 
new Vue({
  router:Router,
  template: '<App/>',
  data:{},
  components: { App }
}).$mount('#app')
 