import Vue 			    from 'vue'
import App 			    from './App'
import Router 		  from 'assets/Router' 
 
new Vue({
  router:Router,
  template: '<App/>',
  data:{},
  components: { App }
}).$mount('#app')


/*Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

Vue.directive('keywords', {
  inserted: function (el, binding) {
    document.getElementsByTagName('meta')[1].content = el.dataset.keywords
  }
})

Vue.directive('description', {
  inserted: function (el, binding) {
    document.getElementsByTagName('meta')[2].content = el.dataset.description
  }
})*/