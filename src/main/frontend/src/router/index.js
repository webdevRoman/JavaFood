import Vue from 'vue'
import VueRouter from 'vue-router'

import Store from '../store/index'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  Store.dispatch('CHECK_AUTHORIZED')
    .then(
      resp => next('/'),
      err => next()
    )
}
const ifAuthenticated = (to, from, next) => {
  Store.dispatch('CHECK_AUTHORIZED')
    .then(
      resp => next(),
      err => next('/signin')
    )
}
const ifAuthenticatedAdmin = (to, from, next) => {
  Store.dispatch('CHECK_AUTHORIZED_ADMIN')
    .then(
      resp => next(),
      err => next('/signin')
    )
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
    // component: Home,
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/Account.vue'),
    beforeEnter: ifAuthenticated
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue'),
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    beforeEnter: ifAuthenticatedAdmin
  },
  {
    path: '*',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
