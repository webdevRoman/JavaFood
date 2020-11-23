import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue'
import SignIn from '../views/SignIn.vue'
import Password from '../views/Password.vue'
import SignUp from '../views/SignUp.vue'
import EmailConfirmation from '../views/EmailConfirmation.vue'
import PasswordConfirmation from '../views/PasswordConfirmation.vue'
import Admin from '../views/Admin.vue'
import Page404 from '../views/404.vue'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  Store.dispatch('CHECK_AUTHORIZED')
  .then(
    resp => { next('/') },
    err => { next() }
  )
  // .catch(() => {
  //   next()
  // })
}
const ifAuthenticated = (to, from, next) => {
  Store.dispatch('CHECK_AUTHORIZED')
  .then(
    resp => { next() },
    err => { next('/signin') }
  )
  // .catch(() => {
  //   next('/signin')
  // })
}
const ifAuthenticatedAdmin = (to, from, next) => {
  Store.dispatch('CHECK_AUTHORIZED_ADMIN')
  .then(
    resp => { next() },
    err => { next('/signin') }
  )
  // .catch(() => {
  //   next('/signin')
  // })
}
// const ifNotAuthenticated = (to, from, next) => {
//   if (!Store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/')
// }
// const ifAuthenticated = (to, from, next) => {
//   if (Store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/signin')
// }

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    // meta: { authRequired: true }
    beforeEnter: ifAuthenticated
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    // meta: { authRequired: true }
    beforeEnter: ifAuthenticated
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/password',
    name: 'password',
    component: Password,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/email-confirmation',
    name: 'email-confirmation',
    component: EmailConfirmation,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/password-confirmation',
    name: 'password-confirmation',
    component: PasswordConfirmation,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    beforeEnter: ifAuthenticatedAdmin
  },
  {
    path: '*',
    component: Page404
  },
  // {
  //   path: '/backend',
  //   component: Page404
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(route => route.meta.authRequired)) {
//     if (Store.getters.isAuthenticated)
//       next()
//     else
//       next('/signin')
//   }
// })

export default router
