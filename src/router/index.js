import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import Home from '../pages/Home/home.vue'
import Login from '../pages/login/login.vue'
import CompleteInfo from '../pages/completeInfo/completeInfo.vue'
import Cart from '../pages/cart/cart.vue'
import goodDetails from '../pages/goods/goodDetails.vue'
import User from '../pages/user/user.vue'
import Order from '../pages/user/children/order.vue'
import AccountData from '../pages/user/children/accountData.vue'
import brandManagement from '../pages/user/children/brandManagement.vue'
import storeManagement from '../pages/user/children/storeManagement.vue'
import SaleService from '../pages/user/children/saleService.vue'
import oldForNew from '../pages/user/children/oldForNew.vue'

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
    {path:'/cart',name:'cart',component:Cart},
    {
      path:'/user',
      name:'user',
      component:User,
      redirect:'/user/order',
      children:[
        {path:'order',name:'订单列表',component:Order},
        {path:'accountData',name:'账号资料',component:AccountData},
        {path:'brandManagement',name:'品牌管理',component:brandManagement},
        {path:'storeManagement',name:'店铺管理',component:storeManagement},
        {path:'saleService',name:'售后服务',component:SaleService},
        {path:'oldForNew',name:'以旧换新',component:oldForNew}
      ]
    }
  ]
})
