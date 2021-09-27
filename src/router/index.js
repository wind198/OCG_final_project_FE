import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/payment-success',
        name: 'paymentSuccess',
        component: () => import('../views/PaymentSuccess.vue'),
      },



    ]
  },
  {
    path: '/page/:pageID',
    name: 'page',
    component: () => import('../views/Page.vue')
  },
  {
    path: '/collection/:collectionID',
    name: 'collection',
    component: () => import('../views/Collection.vue')
    , children: [
      {
        path: '',
        component: () => import('../views/Category.vue')
      },
      {
        path: ':categoryID',
        name: 'category',
        component: () => import('../views/Category.vue')
      }
      ,
    ]
  },
  {
    path: '/product/:productID',
    name: 'product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/ShoppingCart.vue'),
    children: [
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../views/Checkout.vue')
      },
    ]
  },
  {

    path: '/analysis',
    name: 'analysis',
    component: () => import('../views/Analysis.vue'),
    children: [
      {
        path: 'order-management',
        name: 'orderManagement',
        component: () => import('../views/OrderManagement.vue')
      },
    ]
  },
  {

    path: '/:pathMatch(.*)',
    name: 'notFound',
    component: () => import('../views/NotFound.vue')

  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
