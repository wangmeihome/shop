import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import Home from '../pages/Home/home.vue'
import Login from '../pages/login/login.vue'
import CompleteInfo from '../pages/completeInfo/completeInfo.vue'
import Cart from '../pages/cart/cart.vue'
import goodDetails from '../pages/goods/goodDetails.vue'

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: Index,
      name:'index',
      redirect: '/home',
      children:[
        {path:'home',component:Home},
        {path:'goodDetails',name:'goodDetails',component:goodDetails}
      ]
    },
    {path:'/login',name:'login',component:Login},
    {path:'/completeInfo',name:'complete',component:CompleteInfo},
    {path:'/cart',name:'cart',component:Cart}
  ]
})
