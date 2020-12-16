import Vue from 'vue'
import Router from 'vue-router'
import shop from '@/components/shop'
import detail from '@/components/detail'
import cart from '@/components/cart'
import search from '@/components/search'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      redirect: '/shop'
    },
    {
      path: '/shop',
      name: 'shop',
      component: shop
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
