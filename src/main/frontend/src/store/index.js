import Vue from 'vue'
import Vuex from 'vuex'
import generalModule from './general'
import dishesModule from './dishes'
import userModule from './user'
import validationModule from './validation'
import companyModule from './company'
import ordersModule from './adminOrders'
import usersAdminModule from './adminUsers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    generalModule,
    dishesModule,
    userModule,
    validationModule,
    companyModule,
    ordersModule,
    usersAdminModule
  }
})
