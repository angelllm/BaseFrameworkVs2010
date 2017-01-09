import Vue          from 'vue'
import VueRouter    from 'vue-router' 
Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    if (to.matched.some(m => m.meta.scrollToTop)) {
       return { x: 0, y: 0 }
    }
  }
}

  
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  scrollBehavior, 
  routes: [
    {
      path: '/',
      component: (resolve) => require(['components/indexComponent'], resolve),
      meta: { scrollToTop: true }
    },
    {
      path: '/git',
      component: (resolve) => require(['components/gitComponent'], resolve),
      meta: { scrollToTop: true }
    }
  ]
})  

export default router  