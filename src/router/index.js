import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
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
        name: 'allCategory',
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
