import Vue          from 'vue'
import VueRouter    from 'vue-router' 
Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    // new navigation.
    // scroll to anchor
    if (to.hash) {
      //return { anchor: true }
    }
    // explicitly control scroll position
    // check if any matched route config has meta that requires scrolling to top
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
      component: (resolve) => require(['components/defContent'], resolve),
      meta: { scrollToTop: true }
    },
    {
      path: '/list',
      component: (resolve) => require(['components/listContent'], resolve),
      meta: { scrollToTop: true }
    },
    {
      path: '/about',
      component: (resolve) => require(['components/AboutContent'], resolve),
      meta: { scrollToTop: true }
    },
    {
      path: '/music',
      component: (resolve) => require(['components/MusicContent'], resolve),
      meta: { scrollToTop: true }
    },
    {
      path: '/view/:id',
      component: (resolve) => require(['components/include/ArticleItem'], resolve),
      meta: { scrollToTop: true }
    },
    {
      path: '/tag/:tagName',
      component: (resolve) => require(['components/listContent'], resolve),
      meta: { scrollToTop: true }
    },
    {
      path: '/category/:name',
      component: (resolve) => require(['components/listContent'], resolve),
      meta: { scrollToTop: true }
    },
    {
      path: '/archive/:archive',
      component: (resolve) => require(['components/listContent'], resolve),
      meta: { scrollToTop: true }
    }
  ]
})  

export default router  