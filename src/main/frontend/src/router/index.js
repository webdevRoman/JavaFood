import Vue from 'vue'
import VueRouter from 'vue-router'

import Store from '../store/index'
// import Home from '../views/Home.vue'
// import Account from '../views/Account.vue'
// import SignIn from '../views/SignIn.vue'
// import SignUp from '../views/SignUp.vue'
// import Admin from '../views/Admin.vue'
// import Page404 from '../views/404.vue'

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
    // component: Account,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/company',
    name: 'company',
    component: () => import('../views/Company.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue'),
    // component: SignIn,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue'),
    // component: SignUp,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    // component: Admin,
    beforeEnter: ifAuthenticatedAdmin
  },
  {
    path: '*',
    component: () => import('../views/404.vue')
    // component: Page404
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
